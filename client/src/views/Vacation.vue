<template>
  <div class="container">
    {{ user }}
  </div>
</template>

<script>
export default {
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
}
</script>
