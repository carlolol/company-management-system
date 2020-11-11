<template lang="pug">
  v-app
    v-app-bar(
      app
      dark
      color="primary"
    )
      div.d-flex.align-center
        span Company Management System
    v-main
      hello-world
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
