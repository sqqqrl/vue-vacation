<template>
  <div class="content">
    <div class="md-layout">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";

export default {
  components: {
    EditProfileForm,
    UserCard
  }
};
</script>
