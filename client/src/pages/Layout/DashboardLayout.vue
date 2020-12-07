<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <template v-if="$currentUser._id">
        <sidebar-link to="/dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <sidebar-link to="/user">
          <md-icon>person</md-icon>
          <p>User Profile</p>
        </sidebar-link>
        <li class="md-list-item">
          <div id="logout" class="md-list-item-router md-list-item-container md-button-clean" @click="logout">
            <div class="md-list-item-content md-ripple">
              <md-icon>logout</md-icon>
              <p>Logout</p>
            </div>
          </div>
        </li>
        <!-- <li class="md-list-item">
          <a href="#" class="md-list-item-router md-list-item-container md-button-clean nav-item">
            <div class="md-list-item-content md-ripple">
            </div>
          </a>
        </li> -->
      </template>

      <template v-else>
        <sidebar-link to="auth">
          <md-icon>person</md-icon>
          <p>Sing in</p>
        </sidebar-link>

        <sidebar-link to="register">
          <md-icon>person</md-icon>
          <p>Sign up</p>
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

import { AuthService } from "@/services/auth.service";

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
      await AuthService.makeLogout();
    }
  }
};
</script>

<style lang="scss">
#logout {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-decoration: none;
  margin: 10px 15px 0;
  border-radius: 3px;
  color: #FFFFFF !important;
  white-space: nowrap;
  cursor: pointer;
  width: auto;
}
</style>
