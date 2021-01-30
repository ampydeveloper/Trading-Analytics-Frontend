<template>
  <div class="login-container">
    <div class="container">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-md-8 col-sm-8">
          <div class="row">
            <div class="col-md-6 col-sm-6 login-form">
              <h2>password reset</h2>
              <p v-show="errorMessage != null" class="error-message">{{errorMessage}}</p>
              <b-form @submit.prevent="passwordreset">
                <b-form-group
                  id="input-group-register-email"
                  label
                  label-for="input-register-email"
                >
                  <b-input-group>
                    <b-form-input
                      id="input-reset-password"
                      v-model="form.password"
                      aria-describedby="input-register-email-help input-register-email-feedback"
                      placeholder="Password"
                      type="password"
                      trim
                      required
                      :class="{'is-invalid': (errors.password != null)}"
                    ></b-form-input>
                    <b-form-feedback v-if="errors.password!= null">{{errors.password}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
                <!-- email group -->

                <!-- email group -->
                <b-form-group
                  id="input-group-register-email"
                  label
                  label-for="input-register-email"
                >
                  <b-input-group>
                    <b-form-input
                      id="input-reset-password"
                      v-model="form.confirmPassword"
                      aria-describedby="input-register-email-help input-register-email-feedback"
                      placeholder="Re-Enter Password"
                      type="password"
                      trim
                      required
                      :class="{'is-invalid': (errors.confirmPassword != null)}"
                    ></b-form-input>
                    <b-form-feedback v-if="errors.confirmPassword!= null">{{errors.confirmPassword}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
                <!-- email group -->
                <b-form-group class="text-center">
                  <button :disabled="isSubmit" type="submit" class="btn-login">
                    Reset Now
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </button>
                </b-form-group>
              </b-form>
            </div>
            <div class="col-md-6 col-sm-6 login-page-signup-section">
              <p class="dont-have-account for-forgetpassword">Don't Have an Account</p>
              <nuxt-link to="/register" class="login-page-signup-btn">Sign up</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',
  layout: 'guest',
  head() {
    return {
      title: 'Password Reset - Slabstox',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'SLabstox description'
        }
      ]
    }
  },
  loading: '~/components/loading.vue',
  mounted() {
    if ($nuxt.$route.params.hasOwnProperty('token')) {
      this.form.token = $nuxt.$route.params.token
    } else {
      this.$router.push('/404')
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  data() {
    return {
      form: {
        password: '',
        confirmPassword: '',
        token: ''
      },
      isSubmit: false,
      errors: {
        confirmPassword: null,
        password: null
      },
      errorMessage: null,
    }
  },
  methods: {
    async passwordreset() {
      if (this.validation()) {
        try {
          this.errorMessage = null;
          this.showLoader()
          this.$nuxt.$loading.start()
          this.isSubmit = true
          const res = await this.$axios.post(
            'auth/password-reset-request',
            this.form
          )
          this.isSubmit = false
          this.hideLoader()
          this.$nuxt.$loading.finish()
          if (res.data) {
            if (res.data.hasOwnProperty('error')) {
              this.errorMessage = res.data.error;
            }else{
              this.$router.push('/auth/login')
            }
          } else {
            this.errorMessage = "Unable to process you request";
          }
        } catch (e) {
          this.hideLoader()
          this.isSubmit = false
          this.errorMessage = e.response.data.message;
        }
      }
    },
    validation() {
      if (this.form.password != this.form.confirmPassword) {
        this.errors.confirmPassword = 'Password not match'
        return false
      }
      return true
    },
    handelError(res) {
      if (res.status == 422) {
        if (res.data.errors.hasOwnProperty('password')) {
          this.errors.password = res.data.errors.password[0]
        }
        this.errorMessage = 'Registration failed';
      }else if(res.status == 500) {
        this.errorMessage = 'Unable to process you request';
      }
    },
    resetErrors() {
      this.errors = {
        first_name: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form h2 {
  text-align: center;
  color: #000;
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  line-height: 4;
  font-weight: bold;
  font-style: normal;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 24px;
}
.email-sent-message {
  font-size: 16px;
  font-weight: bolder;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 50px;
}
.for-forgetpassword {
  margin-top: 125px !important;
}
</style>