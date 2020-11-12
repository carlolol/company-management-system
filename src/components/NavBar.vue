<template lang="pug">
  div
    v-app-bar(
      app
      dark
      color="primary"
    )
      v-app-bar-nav-icon(@click.stop="showSideBar = !showSideBar")
      h2 {{ pageName }}
      v-spacer
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
            v-avatar(color="primary") {{ loggedInUser.username }}
        v-list
          v-list-item(@click="onClickLogout")
            v-list-item-title Logout
    v-navigation-drawer(
      v-model="showSideBar"
      :clipped="!$isSmallAndDown"
      :app="!$isSmallAndDown"
      :fixed="$isSmallAndDown"
      :temporary="$isSmallAndDown"
    )
      v-list(nav)
        v-list-item-group
          v-list-item(
            v-for="(navigation, i) in navigations"
            :key="i"
            :to="navigation.path"
          )
            v-list-item-title {{ navigation.name }}
</template>

<script>
import navigations from '@/constants/navigations';

export default {
	name: 'navbar',
	data: () => ({
    showSideBar: false,
    navigations,
	}),
	created () {
  },
  computed: {
    loggedInUser () {
      return this.$store.getters['auth/user'];
    },
    pageName () {
      return (this.$route.meta || {}).name || ''; 
    }
  },
	methods: {
    async onClickLogout () {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
