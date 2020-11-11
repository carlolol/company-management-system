<template lang="pug">
  v-container(
    fluid
    class="fill-height"
  )
    v-row
      v-col(cols="12")
        v-row(justify="center")
          v-col(
            cols="12"
            sm="6"
            md="5"
            lg="3"
          )
            v-card(raised)
              v-card-title Companies
              v-card-text
                h3 {{ companyCount }}
        v-row(justify="center")
          v-col(
            cols="12"
            sm="6"
            md="5"
            lg="3"
          )
            v-card(raised)
              v-card-title Departments
              v-card-text
                h3 {{ departmentCount }}
        v-row(justify="center")
          v-col(
            cols="12"
            sm="6"
            md="5"
            lg="3"
          )
            v-card(raised)
              v-card-title Employees
              v-card-text
                h3 {{ employeeCount }}
</template>

<script>
export default {
  name: 'dashboard',
  data: () => ({ }),
  computed: {
    companyCount () {
      return this.$store.getters['company/companyCount'];
    },
    departmentCount () {
      return this.$store.getters['department/departmentCount'];
    },
    employeeCount () {
      return this.$store.getters['employee/employeeCount'];
    },
  }
}
</script>
