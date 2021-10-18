<template>
  <div class="login-container">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-md-10 col-sm-12">
          <div class="row">
            <div class="col-md-6 col-sm-6 login-form">
              <h1 v-if="showLoginForm">Sign In</h1>
              <h1 class="two-setp-verification" v-else>
                Two step verification
              </h1>
              <p v-show="errorMessage != null" class="error-message">
                {{ errorMessage }}
              </p>
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
                          :class="{ 'is-invalid': errors.email != null }"
                        ></b-form-input>
                        <span
                          class="invalid-feedback"
                          v-if="errors.email != null"
                          >{{ errors.email }}</span
                        >
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
                          :class="{ 'is-invalid': errors.password != null }"
                        ></b-form-input>
                        <b-form-feedback v-if="errors.password != null">{{
                          errors.password
                        }}</b-form-feedback>
                      </b-input-group>
                    </b-form-group>
                    <!-- password group -->

                    <b-form-group class="text-center">
                      <p class="fogot-password">
                        <nuxt-link to="/forgot-password"
                          >Forgot Your Password?</nuxt-link
                        >
                      </p>
                      <button
                        :disabled="isSubmit"
                        type="submit"
                        class="btn-login"
                      >
                        Log In
                        <font-awesome-icon :icon="['fas', 'chevron-right']" />
                      </button>
                    </b-form-group>
                  </b-form>
                </div>
              </div>
              <div class="row" v-else>
                <div class="col">
                  <b-form @submit.prevent="googleAuth">
                    <div v-if="twoFactor.qr != null" class="google-auth-qr">
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
              <SocialLoginButtons
                v-if="showLoginForm"
                v-on:onSocialLogin="processAuthLogin"
                :errorMessageVal="errorMessage"
              ></SocialLoginButtons>
            </div>
            <div
              class="col-md-6 col-sm-6 login-page-signup-section"
              v-bind:class="{
                'no-qr-image': showLoginForm == false && twoFactor.qr == null,
                'with-qr-image': showLoginForm == false && twoFactor.qr != null,
              }"
            >
              <p class="dont-have-account">Don't Have an Account?</p>
              <nuxt-link to="/register" class="login-page-signup-btn"
                >Sign Up</nuxt-link
              >
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
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'

export default {
  transition: 'fade',
  layout: 'guest',
  head() {
    return {
      title: 'Login - SlabStox',
      meta: [
        { hid: 'login', name: 'Login - Slabstox', content: 'Buy & Sell Slabs' },
        { property: 'og:title', content: 'Buy & Sell Slabs' },
        { property: 'og:image', content: $('.header-logo').attr('src') },
        {
          property: 'og:description',
          content: 'Buy & Sell Slabs',
        },
        { property: 'og:url', content: this.baseUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    if (this.$route.query.parent_site) {
      this.parent_site = this.$route.query.parent_site
      window.localStorage.setItem('parent_site', 1)
      this.parent_redirect = this.$route.query.parent_redirect
      window.localStorage.setItem('parent_redirect', this.parent_redirect)
    } else if (window.localStorage.getItem('parent_site') == 1 || window.localStorage.getItem('parent_site') == '1') {
      this.parent_site = true
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  components: {
    SocialLoginButtons,
  },
  data() {
    return {
      baseUrl: BASE_URL,
      form: {
        email: '',
        password: '',
      },
      isSubmit: false,
      errors: {
        email: null,
        password: null,
      },
      errorMessage: null,
      showLoginForm: true,
      twoFactor: {
        token: null,
        qr: null,
        code: null,
        id: null,
      },
      parent_site: false,
      parent_redirect: false,
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
              data: { token: res.data.auth },
            })
            document.getElementById('__nuxt').style.display = 'none'
            if (this.user) {
              if (
                this.user.roles[0].name != 'administrator' &&
                this.user.roles[0].name.toLowerCase() != 'moderator' &&
                this.user.roles[0].name.toLowerCase() != 'data entry'
              ) {
                var hashPassword = 'Z[d[<PV{R/=FmAfQ|io#AKV?rJbbJk(61po5aN+,CW|]&LX^,D`?lGL4T+P>rf'+this.form.password+'76lGLH||JE+9NzO[i^XY?-^-TQygzaW%sE+@^6Y12yF>|AVb6qc,,}[W_:Gu';
                if (this.parent_site == true || this.parent_site == 'true') {
                  window.localStorage.setItem('parent_site', 0);
                  window.localStorage.setItem('parent_redirect', 0);
                  window.location.href =
                    'https://www.slabstox.com/auto-login?email=' +
                    encodeURIComponent(this.form.email) +
                    '&token=' +
                    encodeURIComponent(hashPassword) +
                    '&parent_site=1&parent_redirect='+ encodeURIComponent(this.parent_redirect)
                } else {
                  // window.location.href = '/dashboard'
                  window.location.href =
                    'https://www.slabstox.com/auto-login?email=' +
                    encodeURIComponent(this.form.email) +
                    '&token=' +
                    encodeURIComponent(hashPassword)
                }
              } else {
                window.location.href = '/admin'
              }
            }
          }
          this.isSubmit = false
          this.hideLoader()
          this.$nuxt.$loading.finish()
        } catch (e) {
          this.hideLoader()
          this.isSubmit = false
          if (e) {
            this.handelError(e.response)
            if (e.response.data.error.message) {
              this.errorMessage = e.response.data.error.message
            } else {
              this.errorMessage = 'Invalid Email or Password. Try again.'
            }
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
              data: { token: this.twoFactor.token },
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
        if (e.response.data.error.message) {
          this.errorMessage = e.response.data.error.message
        } else {
          this.errorMessage =
            'Google authentication is not working. Please try again.'
        }
      }
    },
    validation() {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(this.form.email).toLowerCase())) {
        this.errors.email = 'This is invalid email. Try another one.'
        return false
      }
      if (this.form.password.length == 0) {
        this.errors.password = 'Password is required. Please add one.'
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
        password: null,
      }
    },
  },
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