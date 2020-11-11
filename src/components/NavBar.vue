<template lang="pug">
  v-app-bar(
    app
    dark
    color="primary"
  )
    div.d-flex.align-center
      span Company Management System
    v-spacer
    div(v-if="isAuthenticated").d-flex.align-center
      v-menu(
        offset-y
        open-on-hover
      )
        template(#activator="{ on, attrs }")
          v-btn(
            v-on="on"
            v-bind="attrs"
            fab
            outlined
          )
            v-avatar(
              color="primary"
            ) {{ loggedInUser.username }}
        v-list
          v-list-item(@click="onClickLogout")
            v-list-item-title Logout
</template>

<script>
export default {
	name: 'navbar',
	data: () => ({

	}),
	created () {
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated'];
    },
    loggedInUser () {
      return this.$store.getters['auth/user'];
    },
  },
	methods: {
    async onClickLogout () {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
