<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <template v-if="$currentUser._id">
        <sidebar-link to="dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <sidebar-link to="user">
          <md-icon>person</md-icon>
          <p>User Profile</p>
        </sidebar-link>
        <md-button class="logout" @click="logout">
          Logout
        </md-button>
      </template>
      
      <template v-else>
        <sidebar-link to="auth">
          <md-icon>person</md-icon>
          <p>Login</p>
        </sidebar-link>
      </template>

    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";

import { AuthService } from '@/services/auth.service'

export default {
  components: {
    TopNavbar,
    DashboardContent
  },

  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-1.jpg")
    };
  },

  methods: {
    async logout() {
      await AuthService.makeLogout()
    }
  }
};
</script>

<style lang="scss">
  .md-button.logout {
    margin: 10px 15px;
  }
</style>
