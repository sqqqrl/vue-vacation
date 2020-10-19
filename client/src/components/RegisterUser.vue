<template>
  <div>
    <form @submit.prevent="register">
      <label for="name">
        Name:
      </label>
      <input v-model="username" type="text" name="name" value>
      <label for="email">
        Email:
      </label>
      <input v-model="email" type="email" name="email" value>

      <label for="password">
        Password:
      </label>
      <input v-model="password" type="password" name value>
      <p v-if="error">
        {{ error }}
      </p>

      <button type="submit" name="button">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    register () {
      this.$store
        .dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => this.$store.dispatch('isNewUser', true))
        .catch(err => this.error = err.response.data.message)
    }
  }
}
</script>
