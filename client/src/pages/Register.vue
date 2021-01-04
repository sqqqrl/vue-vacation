<template>
  <div class="content">
    <form novalidate @submit.prevent="validateUser">
      <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-medium-size-100 md-size-50">
          <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
              <h4 class="title">Sign up</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field :class="getValidationClass('username')">
                    <label for="username">Username</label>
                    <md-input
                      type="text"
                      name="username"
                      id="username"
                      v-model="form.username"
                      :disabled="sending"
                    ></md-input>
                    <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
                    <span class="md-error" v-else-if="!$v.form.username.minLength">Invalid username</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field :class="getValidationClass('email')">
                    <label for="email">Email Address</label>
                    <md-input
                      type="email"
                      name="email"
                      id="email"
                      @input="debounceEmail"
                      :disabled="sending"
                    ></md-input>
                    <span class="md-error" v-if="!$v.form.email.required"
                      >The email is required</span
                    >
                    <span class="md-error" v-else-if="!$v.form.email.email"
                      >Invalid email</span
                    >
                    <span class="md-error" v-else-if="!$v.form.email.isUnique"
                      >Email already in use</span
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
                    <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                    <span class="md-error" v-else-if="!$v.form.password.minLength">Invalid password</span>
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
                    Register
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
import { UsersService } from "@/services/users.service";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength
  // maxLength
} from "vuelidate/lib/validators";
import _ from 'lodash';

export default {
  name: "RegisterUser",
  mixins: [validationMixin],
  data() {
    return {
      dataBackgroundColor: "green",
      form: {
        username: "",
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
        email,
        async uniqueEmail(value) {
          return (await UsersService.emailAvailability(value)).data.available
        } 
      },
      password: {
        required,
        minLength: minLength(8)
      },
      username: {
        required,
        minLength: minLength(3)
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

    async register() {
      const data = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password
      };

      try {
        this.sending = true;
        await UsersService.create(data);
        this.error = "";
        this.notifyVue({
          verticalAlign: "center",
          horizontalAlign: "center",
          msg: "Account has been created"
        });
      } catch (error) {
        this.sending = false;
        console.log(error.message);
        this.error = error.status === 404 ? "Bad request" : error.message;
      }
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.register();
      }
    },

    notifyVue({ verticalAlign, horizontalAlign, msg }) {
      this.$notify({
        message: msg,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "info",
        afterClose: async () => {
          await this.$router.push("auth");
        }
      });
    },

    debounceEmail: 
      _.debounce(function (e) {
        this.form.email = e;
        this.$v.form.email.$touch();
      }, 400, {leading: false, trailing: true})
  }
};
</script>

<style scoped>
.md-field.md-theme-default.md-invalid label {
  color: #ff1744 !important;
}
</style>
