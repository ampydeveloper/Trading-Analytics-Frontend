<template>
  <div class="login-container">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-md-10 col-sm-10">
          <div class="row">
            <div class="col-sm-12 login-form">
              <h2>Reset password</h2>
              <p v-show="errorMessage != null" class="error-message">{{errorMessage}}</p>
              <b-form v-if="!emailSent" @submit.prevent="forgotpassword">
                
                <b-form-group
                  id="input-group-new-password"
                  label
                  label-for="input-new-password"
                >
                  <b-input-group>
                    <b-form-input
                      id="input-new-password"
                      v-model="form.password"
                      aria-describedby="input-new-password-help input-new-password-feedback"
                      placeholder="New Password"
                      type="password"
                      trim
                      required
                    ></b-form-input>
                    <b-form-feedback v-if="errors.password !== null">{{errors.password}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
         
                <b-form-group
                  id="input-group-confirm-password"
                  label
                  label-for="input-confirm-password"
                >
                  <b-input-group>
                    <b-form-input
                      id="input-confirm-passwordl"
                      v-model="form.confirmPassword"
                      aria-describedby="input-confirm-password-help input-confirm-password-feedback"
                      placeholder="Confirm Password"
                      type="password"
                      trim
                      required
                    ></b-form-input>
                    <b-form-feedback v-if="errors.confirmPassword !== null">{{errors.confirmPassword}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
              
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
              >Password has been reset successfully. You can login now.</p>
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
  head() {
    return {
      title: 'Reset Password - Slabstox',
      meta: [
        {
          hid: 'reset-password',
          name: 'Reset Password - Slabstox',
          content: 'Reset Password - Slabstox'
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
        password: '',
        confirmPassword: ''
      },
      isSubmit: false,
      emailSent: false,
      errors: {
        password: null,
        confirmPassword: null
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
          'auth/password-reset-request',
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
          this.errorMessage = 'Unable to process you request.'
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