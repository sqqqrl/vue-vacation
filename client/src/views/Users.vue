<template>
  <div class="container">
    <div v-if="!error">
      <ul>
        <li v-for="(user, i) in users" :key="i">{{user.username}}</li>
      </ul>
    </div>
    <span v-else>{{error.message}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null
    }
  },

  asyncComputed: {
    users: function() {
      return this.$store.dispatch('getAllUsers')
        .catch(err => this.error = err.response.data)
    }
  }
};
</script>
