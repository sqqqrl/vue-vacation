<template>
  <div class="container">
    <div>
      <ul>
        <li v-for="(user, i) in users" :key="i">{{user.username}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  asyncComputed: {
    users: function() {
      return this.$store.dispatch('getAllUsers');
    }
  }
};
</script>
