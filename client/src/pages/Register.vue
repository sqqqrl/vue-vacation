<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item md-medium-size-100 md-size-50">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Sign up</h4>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Username</label>
                  <md-input v-model="username" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Email Address</label>
                  <md-input v-model="email" type="email"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Password</label>
                  <md-input v-model="password" type="password"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button class="md-raised md-success" @click="register"
                  >Register</md-button
                >
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { UsersService } from "@/services/users.service"

export default {
  name: "LoginUser",
  data() {
    return {
      dataBackgroundColor: "green",
      username: "kot",
      email: "kot@gmail.com",
      password: "kot",
      error: ""
    };
  },
  methods: {
    async register() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      try {
        await UsersService.create(data);
        this.error = "";
      } catch (error) {
        this.error =
          error.status === 404
            ? "Bad request"
            : error.message;
      }

    }
  }
};
</script>
