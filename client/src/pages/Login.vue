<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item md-medium-size-100 md-size-50">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Login</h4>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Email Address</label>
                  <md-input v-model="email" type="email"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Password</label>
                  <md-input v-model="password" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button class="md-raised md-success" @click="makeLogin">Login</md-button>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from "@/services/auth.service";

export default {
  name: "LoginUser",
  data() {
    return {
      dataBackgroundColor: "green",
      email: "mkpmkp@drydr.kigh",
      password: "123",
      error: ""
    };
  },
  methods: {
    async makeLogin() {
      try {
        await AuthService.makeLogin({
          email: this.email,
          password: this.password
        });
        this.error = "";
        await this.$store.dispatch("user/getCurrent");
        await this.$router.push('dashboard')
      } catch (error) {
        this.error =
          error.status === 404
            ? "User with same email not found"
            : error.message;
      }
    }
  }
};
</script>
