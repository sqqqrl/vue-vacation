<template>
  <form @submit.prevent="login">
    <label for="email">
      Email:
    </label>
    <input v-model="email" type="email" name="email">
    <label for="password">
      Password:
    </label>
    <input v-model="password" type="password" @keyup.enter="makeLogin">
    <p v-if="error">
      {{ error }}
    </p>
    <button @keyup.enter="makeLogin">
      Login
    </button>
  </form>
</template>

<script>
import { AuthService } from '@/services/auth.service'

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
    async makeLogin () {
      try {
        await AuthService.makeLogin({ email: this.email, password: this.password })
        this.error = ''
        await this.$store.dispatch('user/getCurrent')
        await this.$router.push('profile')
      } catch (error) {
        this.error = error.status === 404 ? 'User with same email not found' : error.message
      }
    }
  }
}
</script>
