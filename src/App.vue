<template lang="pug">
  v-app#app
    nav-bar(v-if="isAuthenticated")
    v-main
      router-view
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: () => ({
    
  }),
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>