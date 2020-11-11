<template lang="pug">
  v-app-bar(
    app
    dark
    color="primary"
  )
    div.d-flex.align-center
      span Company Management System
    v-spacer
    div(v-if="isLoggedIn").d-flex.align-center
      v-btn(fab outlined)
        v-avatar(
          color="primary"
          size="48"
        ) User Name
</template>

<script>
export default {
	name: 'navbar',
	data() {
		return {
			isLoggedIn: false,
		};
	},
	created() {
	},
	methods: {
  }
};
</script>
