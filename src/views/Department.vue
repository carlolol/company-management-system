<template lang="pug">
  v-container(fluid)
    v-row(justify="center")
      v-col(
        cols="12"
        sm="10"
        md="8"
      )
        v-data-table(
          :headers="headers"
          :items="departments"
          sort-by="id"
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
                max-width="500px"
              )
                template(#activator="{ on, attrs }")
                  v-btn(
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  ) New Department
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
                              v-model="editedItem.name"
                              required
                              label="Name"
                              :rules="[ v => !!v || 'Name is required' ]"
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
                            v-textarea(
                              v-model="editedItem.description"
                              label="Description"
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
  name: 'department',
  data: () => ({
    valid: false,
    dialog: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Company Name', value: 'companyDetails.name' },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: '', value: 'actions', sortable: false, align: 'end' },
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      companyId: '',
      name: '',
      description: '',
    },
    defaultItem: {
      id: '',
      companyId: '',
      name: '',
      description: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Department' : 'Edit Department';
    },
    departments () {
      return this.$store.getters['department/getDepartmentsWithCompanyDetails'];
    },
    companies () {
      return this.$store.state.company.companies;
    },
  },

  watch: {
    dialog (val) {
      val || this.close();
    },
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.departments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem (item) {
      confirm('Are you sure you want to delete this department?')
        && await this.$store.dispatch('department/deleteDepartment', item);
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
        this.$store.dispatch(`department/${action}Department`, this.editedItem);
        this.close();
      }
    },

    customFilter (item, queryText, itemText) {
      const name = itemText.toLowerCase();
      const searchText = queryText.toLowerCase();

      return ~name.indexOf(searchText);
    },

  },
}
</script>
