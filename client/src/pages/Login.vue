<template>
  <div class="container">
    <div class="col-4">
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
      <button @click="makeLogin">
        Login
    </button>
    </div>
    
  </div>
</template>

<script>
import { AuthService } from '@/services/auth.service'

export default {
  name: 'LoginUser',
  data () {
    return {
      email: 'mkpmkp@drydr.kigh',
      password: '123',
      error: ''
    }
  },
  methods: {
    async makeLogin () {
      try {
        await AuthService.makeLogin({ email: this.email, password: this.password })
        this.error = ''
        await this.$store.dispatch('user/getCurrent')
        // await this.$router.push('profile')
      } catch (error) {
        this.error = error.status === 404 ? 'User with same email not found' : error.message
      }
    }
  }
}
</script>
