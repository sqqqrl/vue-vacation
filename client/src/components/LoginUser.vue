<template>
  <form @submit.prevent="login">
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
      Login
    </button>
  </form>
</template>

<script>
export default {
  name: 'LoginUser',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(status => {
        this.$router.push({ name: 'dashboard' })
      })
      .catch(err => {
        this.error = err.response.data.message;
      })
    }
  }
}
</script>
