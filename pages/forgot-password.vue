<template>
  <div class="login-container">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-md-10 col-sm-10">
          <div class="row">
            <div class="col-md-6 col-sm-6 login-form">
              <h2>Forgot password</h2>
              <p v-show="errorMessage != null" class="error-message">{{errorMessage}}</p>
              <b-form v-if="!emailSent" @submit.prevent="forgotpassword">
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
                      type="email"
                      trim
                      required
                      :class="{'is-invalid': (errors.email != null)}"
                    ></b-form-input>
                    <b-form-feedback v-if="errors.email !== null">{{errors.email}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
                <!-- email group -->

                <b-form-group class="text-center">
                  <button
                    :disabled="isSubmit"
                    type="submit"
                    class="btn-login btn-login-forgrt-password"
                  >
                    Reset Now
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </button>
                </b-form-group>
              </b-form>
              <p
                v-if="emailSent"
                class="email-sent-message"
              >Password Reset link is sent to your email, please check your inbox</p>
            </div>
            <div class="col-md-6 col-sm-6 login-page-signup-section">
              <p class="dont-have-account for-forgetpassword">Don't Have an Account?</p>
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
export default {
  transition: 'fade',
  layout: 'guest',
  metaInfo() {
    return {
      title: 'Forgot Password - Slabstox',
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  data() {
    return {
      form: {
        email: ''
      },
      isSubmit: false,
      emailSent: false,
      errors: {
        email: null
      },
      errorMessage: null
    }
  },
  methods: {
    async forgotpassword() {
      try {
        this.$nuxt.$loading.start()
        this.showLoader()
        this.isSubmit = true
        const res = await this.$axios.post(
          'auth/send-reset-link-email',
          this.form
        )
        this.isSubmit = false
        this.hideLoader()
        this.$nuxt.$loading.finish()
        if (res.data) {
          if (res.data.hasOwnProperty('error')) {
            this.errorMessage = res.data.error
          } else {
            this.emailSent = true
          }
        } else {
          this.errorMessage = 'Unable to process you request'
        }
      } catch (e) {
        this.hideLoader()
        this.isSubmit = false
        this.errorMessage = e.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  .login-form h2 {
    text-align: center;
    color: #000;
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    line-height: 5;
    font-weight: bold;
    font-style: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 24px;
  }
  .btn-login-forgrt-password {
    margin-top: 20px;
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    width: 225px;
    margin-bottom: 30px;
  }
  .email-sent-message {
    font-size: 16px;
    font-weight: bolder;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 50px;
  }
  .for-forgetpassword {
    margin-top: 105px !important;
  }
}
</style>