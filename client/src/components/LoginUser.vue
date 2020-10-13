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
    <p v-if="status.code !== 200">
      {{ status.msg }}
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
      status: {
        code: 200,
        msg: ''
      }
    }
  },
  methods: {
    login () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .catch(( err ) => {
          this.status = err
        })
    }
  }
}
</script>
