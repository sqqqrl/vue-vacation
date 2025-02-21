<template>
  <div class="content">
    <form novalidate @submit.prevent="validateUser">
      <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-medium-size-100 md-size-50">
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
              <h4 class="title">Login</h4>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field :class="getValidationClass('email')">
                    <label for="email">Email Address</label>
                    <md-input
                      type="email"
                      name="email"
                      id="email"
                      v-model="form.email"
                      :disabled="sending"
                    ></md-input>
                    <span class="md-error" v-if="!$v.form.email.required"
                      >The email is required</span
                    >
                    <span class="md-error" v-else-if="!$v.form.email.email"
                      >Invalid email</span
                    >
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field :class="getValidationClass('password')">
                    <label>Password</label>
                    <md-input
                      type="password"
                      name="password"
                      id="password"
                      v-model="form.password"
                      :disabled="sending"
                    ></md-input>
                    <span class="md-error" v-if="!$v.form.password.required"
                      >The password is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.password.minLength"
                      >Invalid password</span
                    >
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-center">
                  <span class="text-error">{{ error }}</span>
                </div>
                <div class="md-layout-item md-size-100 text-center">
                  <md-button
                    type="submit"
                    class="md-raised md-success"
                    :disabled="sending"
                  >
                    Login
                  </md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { AuthService } from "@/services/auth.service";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength
  // maxLength
} from "vuelidate/lib/validators";

export default {
  name: "LoginUser",
  mixins: [validationMixin],
  data() {
    return {
      dataBackgroundColor: "green",
      form: {
        email: "",
        password: ""
      },
      sending: false,
      error: ""
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    async makeLogin() {
      try {
        this.sending = true;
        await AuthService.makeLogin({
          email: this.form.email,
          password: this.form.password
        });
        this.error = "";
        await this.$store.dispatch("user/getCurrent");
        await this.$router.push("dashboard");
      } catch (error) {
        this.sending = false;
        this.error =
          error.status === 404
            ? "User with same email not found"
            : error.message;
      }
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.makeLogin();
      }
    }
  }
};
</script>

<style scoped>
.md-field.md-theme-default.md-invalid label {
  color: #ff1744 !important;
}
</style>
