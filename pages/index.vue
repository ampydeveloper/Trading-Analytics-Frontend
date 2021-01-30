<template>
  <div class="login-container">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-md-10 col-sm-10">
          <div class="row">
            <div class="col-md-6 col-sm-6 login-form">
              <h1 v-if="showLoginForm">Sign In</h1>
              <h1 class="two-setp-verification" v-else>Two step verification</h1>
              <p v-show="errorMessage != null" class="error-message">{{errorMessage}}</p>
              <div class="row" v-if="showLoginForm">
                <div class="col">
                  <b-form @submit.prevent="login">
                    <!-- email group -->
                    <b-form-group
                      id="input-group-register-email"
                      label
                      label-for="input-register-email"
                    >
                      <b-input-group>
                        <b-form-input
                          id="input-register-email"
                          v-model="form.email"
                          aria-describedby="input-register-email-help input-register-email-feedback"
                          placeholder="Email"
                          trim
                          required
                          :class="{'is-invalid': (errors.email != null)}"
                        ></b-form-input>
                        <span
                          class="invalid-feedback"
                          v-if="(errors.email != null)"
                        >{{errors.email}}</span>
                      </b-input-group>
                    </b-form-group>
                    <!-- email group -->

                    <!-- password group -->
                    <b-form-group
                      id="input-group-register-password"
                      label
                      label-for="input-register-password"
                    >
                      <b-input-group>
                        <b-form-input
                          id="input-register-password"
                          v-model="form.password"
                          aria-describedby="input-register-password-help input-register-password-feedback"
                          placeholder="Password"
                          type="password"
                          trim
                          required
                          :class="{'is-invalid': (errors.password != null)}"
                        ></b-form-input>
                        <b-form-feedback v-if="(errors.password != null)">{{errors.password}}</b-form-feedback>
                      </b-input-group>
                    </b-form-group>
                    <!-- password group -->

                    <b-form-group class="text-center">
                      <p class="fogot-password">
                        <nuxt-link to="/forgot-password">Forgot Your Password ?</nuxt-link>
                      </p>
                      <button :disabled="isSubmit" type="submit" class="btn-login">
                        Login Now
                        <font-awesome-icon :icon="['fas', 'chevron-right']" />
                      </button>
                    </b-form-group>
                  </b-form>
                </div>
              </div>
              <div class="row" v-else>
                <div class="col">
                  <b-form @submit.prevent="googleAuth">
                    <div v-if="twoFactor.qr !=null" class="google-auth-qr">
                      <img :src="twoFactor.qr" alt />
                    </div>
                    <b-form-group
                      id="input-group-register-email"
                      label
                      label-for="input-register-email"
                    >
                      <b-input-group>
                        <b-form-input
                          id="input-register-email"
                          v-model="twoFactor.code"
                          aria-describedby="input-register-email-help input-register-email-feedback"
                          placeholder="Code"
                          trim
                          required
                        ></b-form-input>
                        <span class="invalid-feedback"></span>
                      </b-input-group>
                    </b-form-group>
                    <!-- email group -->
                    <b-form-group class="text-center">
                      <button type="submit" class="btn-login">
                        Verify Now
                        <font-awesome-icon :icon="['fas', 'chevron-right']" />
                      </button>
                    </b-form-group>
                  </b-form>
                </div>
              </div>
              <div class="row" v-if="showLoginForm">
                <div class="col">
                  <div class="divider">
                    <div class="divider-line"></div>
                    <div class="divider-or-text">or</div>
                  </div>
                </div>
              </div>
              <SocialLoginButtons v-if="showLoginForm" v-on:onSocialLogin="processAuthLogin"></SocialLoginButtons>
            </div>
            <div
              class="col-md-6 col-sm-6 login-page-signup-section"
              v-bind:class="{'no-qr-image': (showLoginForm==false && twoFactor.qr==null), 'with-qr-image': (showLoginForm==false && twoFactor.qr!=null) }"
            >
              <p class="dont-have-account">Don't Have an Account ?</p>
              <nuxt-link to="/register" class="login-page-signup-btn">Sign up</nuxt-link>
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialLoginButtons from '~/components/guest/SocialLoginButtons'

export default {
  transition: 'fade',
  layout: 'guest',
  head() {
    return {
      title: 'Login - Slabstox',
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
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  components: {
    SocialLoginButtons
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      isSubmit: false,
      errors: {
        email: null,
        password: null
      },
      errorMessage: null,
      showLoginForm: true,
      twoFactor: {
        token: null,
        qr: null,
        code: null,
        id: null
      }
    }
  },
  methods: {
    processAuthLogin(data) {
      this.showLoginForm = false
      this.twoFactor.token = data.auth
      this.twoFactor.qr = data.image
      this.twoFactor.id = data.id
    },
    async login() {
      if (this.validation()) {
        try {
          this.errorMessage = null
          this.isSubmit = true
          this.showLoader()
          this.resetErrors()
          this.$nuxt.$loading.start()
          const res = await this.$axios.post('auth/login', this.form)
          if (res.status == 200) {
            // this.processAuthLogin(res.data)
            const a = await this.$auth.loginWith('local', {
              data: { token: res.data.auth }
            })
            document.getElementById('__nuxt').style.display = "none";
            window.location.href = '/dashboard'
          }
          this.isSubmit = false
          this.hideLoader()
          this.$nuxt.$loading.finish()
        } catch (e) {
          this.hideLoader()
          this.isSubmit = false
          if (e) {
            this.handelError(e.response)
            this.errorMessage = 'Invalid Email and Password'
          }
        }
      }
    },
    async googleAuth() {
      try {
        this.showLoader()
        this.$nuxt.$loading.start()
        const res = await this.$axios.post('auth/two-factor', this.twoFactor)
        if (res.status == 200) {
          if (res.data.hasOwnProperty('token')) {
            const res = await this.$auth.loginWith('local', {
              data: { token: this.twoFactor.token }
            })
            window.location.href = '/dashboard'
            this.$router.push('/redirect')
            this.hideLoader()
            this.$nuxt.$loading.finish()
          } else {
            this.errorMessage = res.data.error
            this.hideLoader()
            this.$nuxt.$loading.finish()
          }
        }
      } catch (e) {
        this.hideLoader()
        this.handelError(e.response)
        this.errorMessage = 'Login failed'
      }
    },
    validation() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(this.form.email).toLowerCase())) {
        this.errors.email = 'Valid email required'
        return false
      }
      if (this.form.password.length == 0) {
        this.errors.password = 'Password required'
        return false
      }
      return true
    },
    handelError(res) {
      if (res.status == 422) {
        if (res.data.hasOwnProperty('email')) {
          this.errors.email = res.data.email[0]
        }
        if (res.data.hasOwnProperty('password')) {
          this.errors.password = res.data.password[0]
        }
      }
    },
    resetErrors() {
      this.errors = {
        email: null,
        password: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  position: relative;
  text-align: center;
  margin-top: 20px;
  .divider-line {
    height: 1px;
    background-color: #f1eeea;
    width: 100%;
  }
  .divider-or-text {
    display: inline-block;
    background-color: #ffffff;
    padding: 5px 10px;
    font-size: 14px;
    top: -16px;
    position: relative;
    color: #282828;
  }
}

.google-auth-qr {
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
}

h1.two-setp-verification {
  font-size: 28px;
}

.no-qr-image {
  .dont-have-account {
    margin-top: 60px !important;
  }
}
.with-qr-image {
  .dont-have-account {
    margin-top: 170px !important;
  }
}
</style>
