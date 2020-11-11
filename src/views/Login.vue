<template lang="pug">
  v-container(
    fluid
    class="fill-height"
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
        h1 Welcome
        v-card.elevation-12
          v-toolbar(
            color="primary"
            dark
            flat
          )
            v-toolbar-title Login
          v-card-text
            v-form(
              v-model="valid"
              @keydown.native.enter="onClickLogin"
            )
              v-text-field(
                v-model="username"
                required
                type="text"
                label="Username"
                prepend-icon="mdi-account"
                :rules="[ v => !!v || 'Username is required' ]"
              )
              v-text-field(
                v-model="password"
                required
                type="password"
                label="Password"
                prepend-icon="mdi-lock"
                :rules="[ v => !!v || 'Password is required' ]"
              )
          v-card-actions
            v-spacer
            v-btn(
              color="primary"
              :disabled="!valid"
              @click.stop="onClickLogin"
            ) Login
</template>

<script>
export default {
	name: 'login',
	data: () => ({
    username: '', 
    password: '',
    valid: false,
	}),
	methods: {
    async onClickLogin () {
      if (this.valid) {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password : this.password,
        });
        this.$router.push('/');
      }
    }
	}
};
</script>