<template>
  <div class="register-container">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-md-10 col-sm-10 signup-form">
          <!-- <SocialLoginButtons></SocialLoginButtons> -->
          <div class="row">
            <div class="col-12">
              <h1>Sign Up</h1>
              <p v-show="errorMessage != null" class="error-message">{{errorMessage}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col-md-8 col-sm-8">
              <b-form @submit.prevent="register">
                <!-- Fullname group -->
                <b-form-group
                  id="input-group-register-fullname"
                  label
                  label-for="input-register-fullname"
                >
                  <b-input-group>
                    <b-form-input
                      id="input-register-fullname"
                      v-model="form.first_name"
                      aria-describedby="input-register-fullname-help input-register-fullname-feedback"
                      placeholder="Name"
                      trim
                      required
                      :class="{'is-invalid': (errors.first_name != null)}"
                    ></b-form-input>
                    <b-form-feedback v-if="(errors.first_name!=null)">{{errors.first_name}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
                <!-- Fullname group -->

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
                    <b-form-feedback v-if="(errors.email!=null)">{{errors.email}}</b-form-feedback>
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
                    <b-form-feedback v-if="(errors.password!=null)">{{errors.password}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
                <!-- password group -->

                <!-- password group -->
                <b-form-group
                  id="input-group-register-password"
                  label
                  label-for="input-register-password"
                >
                  <b-input-group>
                    <b-form-input
                      id="input-register-password"
                      v-model="form.confirmpassword"
                      aria-describedby="input-register-password-help input-register-password-feedback"
                      placeholder="Re-Enter Password"
                      type="password"
                      trim
                      required
                      :class="{'is-invalid': (errors.confirmpassword != null)}"
                    ></b-form-input>
                    <b-form-feedback
                      v-if="(errors.confirmpassword != null)"
                    >{{errors.confirmpassword}}</b-form-feedback>
                  </b-input-group>
                </b-form-group>
                <!-- password group -->

                <!-- password group -->
                <b-form-group
                  id="input-group-register-agree"
                  label
                  label-for="input-register-agree"
                >
                  <b-input-group>
                    <div class="pretty p-default">
                      <input type="checkbox" v-model="form.agree" required />
                      <div class="state">
                        <label>Agree to terms of service</label>
                      </div>
                    </div>
                  </b-input-group>
                </b-form-group>
                <!-- password group -->

                <b-form-group class="text-center">
                  <button type="submit" class="btn-signup" :disabled="isSubmit">
                    Signup now
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </button>
                </b-form-group>
                <b-form-group class="text-center have-an-account">
                  <nuxt-link to="/">
                    Have an account? log in
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link>
                </b-form-group>
              </b-form>
            </div>
            <div class="col"></div>
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
      title: 'Register - Slabstox',
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
  data() {
    return {
      form: {
        first_name: '',
        email: '',
        password: '',
        confirmpassword: '',
        agree: false
      },
      isSubmit: false,
      errors: {
        first_name: null,
        email: null,
        password: null,
        confirmpassword: null
      },
      errorMessage: null,
    }
  },
  methods: {
    async register() {
      if (this.validation()) {
        try {
          this.errorMessage = null;
          this.showLoader()
          this.resetErrors()
          this.$nuxt.$loading.start()
          this.isSubmit = true
          const resgisterRes = await this.$axios.post(
            'auth/register',
            this.form
          )
          // await this.$auth.loginWith('local', {
          //   data: { email: this.form.email, password: this.form.password }
          // })
          this.hideLoader()
          this.$nuxt.$loading.finish()
          this.$router.push('/')
        } catch (e) {
          this.$nuxt.$loading.finish()
          this.hideLoader()
          this.isSubmit = false
          if (e) {
            this.handelError(e.response)
          }
          
        }
      }
    },
    validation() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(this.form.email).toLowerCase())) {
        this.errors.email = 'Valid email required'
        return false
      }

      if (this.form.password != this.form.confirmpassword) {
        this.errors.confirmpassword = 'Password not match'
        return false
      }
      return true
    },
    handelError(res) {
      if (res.status == 422) {
        if (res.data.errors.hasOwnProperty('email')) {
          this.errors.email = res.data.errors.email[0]
        }
        if (res.data.errors.hasOwnProperty('first_name')) {
          this.errors.first_name = res.data.errors.first_name[0]
        }
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
        confirmpassword: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  background: -webkit-linear-gradient( left, rgba(5, 251, 98, 1) 0%, rgba(10, 178, 95, 1) 100%);
    background: linear-gradient( to right, rgba(5, 251, 98, 1) 0%, rgba(10, 178, 95, 1) 100%);
  padding-top: 150px;
  padding-bottom: 150px;
  .signup-form {
    background: #ffffff;
    padding-top: 50px;
    padding-bottom: 20px;
    input {
      font-family: Helvetica, Arial, sans-serif;
      background: #eeeeee;
      border-radius: 2px;
      border-color: #eeeeee;
      &.is-invalid {
        border-color: #dc3545;
      }
      &:focus {
        outline: none;
      }
    }

    h1 {
      text-align: center;
      color: #000;
      font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
      line-height: 2;
      font-weight: bold;
      font-style: normal;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .btn-signup {
      font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
      color: #242424;
      position: relative;
      z-index: 0;
      background: #05fb62;
      border-radius: 3px;
      transform: skewX(-8deg);
      font-weight: bold;
      padding: 13px 38px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 4px;
      width: 225px;
      &:hover {
        box-shadow: none;
        background-color: #0ab25f;
      }
      &:focus {
        outline: none;
      }
      &:disabled {
        background: #eeeeee;
      }
    }

    .have-an-account {
      text-align: center;
      a {
        text-transform: uppercase;
        color: #242424;
        font-size: 12px;
        font-weight: bolder;
      }
    }
  }
}
</style>
<style>
.signup-form .signup-form input .signup-form .input-group {
  padding: 0px 30px;
}

.btn-signup:disabled:hover {
  cursor: not-allowed;
  box-shadow: none;
}

#input-group-register-agree {
  text-align: center;
  font-weight: bolder;
  text-transform: uppercase;
  font-size: 12px;
}
.pretty {
  margin: 0 auto;
}

@media (max-width: 425px) {
  .register-container {
    padding: 0px;
    background: #ffffff;
  }
}
</style>
