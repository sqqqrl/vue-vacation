<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Profile</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Company (disabled)</label>
              <md-input v-model="user.disabled" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>User Name</label>
              <md-input v-model="user.username" type="text">{{ $currentUser.username }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>First Name</label>
              <md-input v-model="user.firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="user.lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Adress</label>
              <md-input v-model="user.address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="updateProfile">Update Profile</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { UsersService } from "@/services/users.service";

export default {
  name: "edit-profile-form",
  data() {
    return {
      user: {
        username: null,
        disabled: null,
        lastname: null,
        firstname: null,
        address: null
      },
      dataBackgroundColor: "green",
      error: ""
    };
  },

  created: function () {
    this.$_.merge(this.user, this.$currentUser)
  },

  methods: {
    async updateProfile() {
      try {
        const response = await UsersService.update(this.user);
        this.error = "";
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style></style>
