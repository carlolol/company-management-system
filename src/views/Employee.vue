<template lang="pug">
  v-container(fluid)
    v-row(justify="center")
      v-col(
        cols="12"
        sm="12"
      )
        v-data-table(
          :headers="headers"
          :items="employees"
          sort-by="uuid"
          class="elevation-1"
        )
          template(#top)
            v-toolbar(
              flat
              color="white"
            )
              v-spacer
              v-dialog(
                v-model="dialog"
                scrollable
                max-width="500px"
              )
                template(#activator="{ on, attrs }")
                  v-btn(
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  ) New Employee
                v-card
                  v-card-title
                    span(class="headline") {{ formTitle }}
                  v-card-text
                    v-form(
                      ref="form"
                      v-model="valid"
                      @keydown.native.enter.prevent="save"
                    )
                      v-container
                        v-row
                          v-col(cols="12")
                            v-text-field(
                              v-model="editedItem.firstName"
                              required
                              label="First Name"
                              :rules="[ v => !!v || 'First Name is required' ]"
                            )
                          v-col(cols="12")
                            v-text-field(
                              v-model="editedItem.lastName"
                              required
                              label="Last Name"
                              :rules="[ v => !!v || 'Last Name is required' ]"
                            )
                          v-col(cols="12")
                            v-autocomplete(
                              v-model="editedItem.companyId"
                              required
                              label="Company"
                              item-text="name"
                              item-value="id"
                              :items="companies"
                              :rules="[ v => !!v || 'Company is required' ]"
                            )
                          v-col(cols="12")
                            v-autocomplete(
                              v-model="editedItem.departmentId"
                              label="Department"
                              item-text="name"
                              item-value="id"
                              :items="departments"
                              :disabled="!editedItem.companyId"
                            )
                          v-col(cols="12")
                            v-select(
                              v-model="editedItem.sex"
                              required
                              label="Sex"
                              :items="sex"
                              :rules="[ v => !!v || 'Sex is required' ]"
                            )
                          v-col(cols="12")
                            v-menu(
                              v-model="showDateMenu"
                              offset-y
                              min-width="290px"
                              transition="scale-transition"
                              :close-on-content-click="false"
                            )
                              template(#activator="{ on, attrs }")
                                v-text-field(
                                  v-on="on"
                                  v-bind="attrs"
                                  v-model="editedItem.birthDate"
                                  readonly
                                  required
                                  label="Birthdate"
                                  append-icon="mdi-calendar"
                                  :rules="[ v => !!v || 'Birthdate is required' ]"
                                  @click:append="showDateMenu = true"
                                )
                              v-date-picker(
                                v-model="editedItem.birthDate"
                                @input="showDateMenu = false"
                              )
                          v-col(cols="12")
                            v-select(
                              v-model="editedItem.civilStatus"
                              label="Civil Status"
                              :items="civilStatus"
                            )
                          v-col(cols="12")
                            v-text-field(
                              v-model="editedItem.jobPosition"
                              label="Job Position"
                            )
                  v-card-actions
                    v-spacer
                    v-btn(
                      depressed
                      color="blue darken-1 white--text"
                      :disabled="!valid"
                      @click="save"
                    ) Save
                    v-btn(
                      dark
                      text
                      color="blue darken-1"
                      @click="close"
                    ) Close

          template(#item.sex="{ item }") {{ properCase(item.sex) }}
          template(#item.civilStatus="{ item }") {{ properCase(item.civilStatus) }}
          template(#item.actions="{ item }")
            v-icon(
              small
              class="mr-2"
              color="warning"
              @click="editItem(item)"
            ) mdi-pencil
            v-icon(
              small
              color="error"
              @click="deleteItem(item)"
            ) mdi-delete
          template(#no-data)
            span.mx-auto #[i No results found]
</template>

<script>
export default {
  name: 'employee',
  data: () => ({
    valid: false,
    dialog: false,
    showDateMenu: false,
    headers: [
      { text: 'ID', value: 'uuid' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'First Name', value: 'firstName' },
      { text: 'Company Name', value: 'companyDetails.name' },
      { text: 'Department Name', value: 'departmentDetails.name' },
      { text: 'Sex', value: 'sex' },
      { text: 'Birthdate', value: 'birthDate' },
      { text: 'Civil Status', value: 'civilStatus' },
      { text: 'Job Position', value: 'jobPosition' },
      { text: '', value: 'actions', sortable: false, align: 'end' },
    ],
    editedIndex: -1,
    editedItem: {
      uuid: '',
      companyId: '',
      departmentId: '',
      firstName: '',
      lastName: '',
      sex: '',
      birthDate: '',
      civilStatus: '',
      jobPosition: '',
    },
    defaultItem: {
      uuid: '',
      companyId: '',
      departmentId: '',
      firstName: '',
      lastName: '',
      sex: '',
      birthDate: '',
      civilStatus: '',
      jobPosition: '',
    },
    sex: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
      { text: 'Any', value: 'any' },
    ],
    civilStatus: [
      { text: 'Single', value: 'single' },
      { text: 'Married', value: 'married' },
      { text: 'Widowed', value: 'widowed' },
      { text: 'Divorced', value: 'divorced' },
      { text: 'Separated', value: 'separated' },
    ],
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee';
    },
    employees () {
      return this.$store.getters['employee/getEmployeesWithCompleteDetails'];
    },
    companies () {
      return this.$store.state.company.companies;
    },
    departments () {
      if (!this.editedItem.companyId) return [];
      return this.$store.getters['department/getDepartmentsByCompanyId'](this.editedItem.companyId);
    },
    selectedCompanyId () {
      return this.editedItem.companyId;
    }
  },

  watch: {
    dialog (val) {
      val || this.close();
    },
    selectedCompanyId (val, oldVal) {
      if (!oldVal) return;
      if (val === oldVal) return;
      this.$set(this.editedItem, 'departmentId', '');
    },
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.employees.findIndex(employee => employee.uuid === item.uuid);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem (item) {
      confirm('Are you sure you want to delete this employee?')
        && await this.$store.dispatch('employee/deleteEmployee', item);
    },

    close () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.resetValidation();
      })
    },

    save () {
      if (this.valid) {
        const action = ~this.editedIndex ? 'update' : 'create';

        if (action === 'update') {
          delete this.editedItem.companyDetails;
          delete this.editedItem.departmentDetails;
        }

        this.$store.dispatch(`employee/${action}Employee`, this.editedItem);
        this.close();
      }
    },

    properCase (text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }

  },
}
</script>
