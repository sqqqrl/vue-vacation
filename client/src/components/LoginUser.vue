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
    <p v-if="status">
      {{ status }}
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
      status: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(status => {
        this.status = status
      })
      .catch(err => {
        console.error(err);
      })
    }
  }
}
</script>
