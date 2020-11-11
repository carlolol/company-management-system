<template lang="pug">
  v-container(
    class="fill-height"
    fluid
  )
    v-row(
      align="center"
      justify="center"
    )
      v-col(
        cols="12"
        sm="8"
        md="3"
      )
        v-card.elevation-12
          v-toolbar(
            color="primary"
            dark
            flat
          )
            v-toolbar-title Login
          v-card-text
            v-form
              v-text-field(
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              )
              v-text-field(
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              )
          v-card-actions
            v-spacer
            v-btn(color="primary") Login
</template>

<script>
export default {
	name: 'login',
	data() {
		return { email: '', password: '' };
	},
	methods: {
	}
};
</script>