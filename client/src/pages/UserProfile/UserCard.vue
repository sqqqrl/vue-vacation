<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">{{ $currentUser.username }}</h4>
        
      <router-link
        to="edit"
      >
        <md-button class="md-round md-success">Edit</md-button>
      </router-link>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {};
  }
};
</script>
<style></style>
