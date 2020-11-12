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
          :items="companies"
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
                  ) New Company
                v-card
                  v-card-title
                    span(class="headline") {{ formTitle }}
                  v-card-text
                    v-form(
                      v-model="valid"
                      ref="form"
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
                            v-text-field(
                              v-model="editedItem.location"
                              label="Location"
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
                      text
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
  name: 'company',
  data: () => ({
    dialog: false,
    valid: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Location', value: 'location' },
      { text: 'Description', value: 'description' },
      { text: '', value: 'actions', sortable: false, align: 'end' },
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      location: '',
      description: '',
    },
    defaultItem: {
      id: '',
      name: '',
      location: '',
      description: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Company' : 'Edit Company';
    },
    companies () {
      return this.$store.state.company.companies;
    }
  },

  watch: {
    dialog (val) {
      val || this.close();
    },
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.companies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem (item) {
      confirm('Are you sure you want to delete this company?')
        && await this.$store.dispatch('company/deleteCompany', item);
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
        this.$store.dispatch(`company/${action}Company`, this.editedItem);
        this.close();
      }
    },
  },
}
</script>
