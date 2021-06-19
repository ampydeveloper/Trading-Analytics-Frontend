<template>
  <div class="row">
    <div class="col-md-12 col- col-sm-12">
      <button id="google-btn" class="social-login-btn google">
        <font-awesome-icon
          :icon="['fab', 'google']"
        />&nbsp;&nbsp;&nbsp;&nbsp;Sign in with Google
      </button>
    </div>
    <div class="col-md-12 col-sm-12">
      <button @click="facebook()" class="social-login-btn facebook">
        <font-awesome-icon
          :icon="['fab', 'facebook-square']"
        />&nbsp;&nbsp;Continue with facebook
      </button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {
  GOOGLE_CLIENT_ID_DEV,
  GOOGLE_CLIENT_ID_PROD,
  FACEBOOK_APP_ID_DEV,
  FACEBOOK_APP_ID_PROD,
} from '../../constants/keys'

export default {
  props: ['errorMessageVal'],
  mounted() {
    this.googleSDK()
    this.facebookSDK()
  },
  methods: {
    socialLogin(user, provider) {
      this.showLoader()
      this.$axios
        .post('auth/login/' + provider, user)
        .then((res) => {
          this.hideLoader()
          // if (res.status == 200) {
          //   this.$emit('onSocialLogin', res.data)
          // }

          if (res.data.hasOwnProperty('auth')) {
            this.$auth
              .login({
                data: {
                  token: res.data.auth,
                },
              })
              .then((res) => {
                window.location.href = '/dashboard'
                this.$router.push('/redirect')
              })
          }
        })
        .catch((e) => {
          this.hideLoader()
        })
    },
    googleSDK() {
      const selfthis = this
      if (window['gAuth2']) {
        selfthis.prepareLoginButton()
      } else {
        window['googleSDKLoaded'] = () => {
          window['gapi'].load('auth2', () => {
            window['gAuth2'] = window['gapi'].auth2.init({
              // Devepment
              // client_id: GOOGLE_CLIENT_ID_DEV,
              // Production
              client_id: GOOGLE_CLIENT_ID_PROD,
              cookiepolicy: 'single_host_origin',
              scope: 'profile email',
            })
            selfthis.prepareLoginButton()
          })
        }
        ;(function (d, s, id) {
          var js,
            fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) {
            return
          }
          js = d.createElement(s)
          js.id = id
          js.src =
            'https://apis.google.com/js/platform.js?onload=googleSDKLoaded'
          fjs.parentNode.insertBefore(js, fjs)
        })(document, 'script', 'google-jssdk')
      }
    },
    prepareLoginButton() {
      const selfthis = this
      window['gAuth2'].attachClickHandler(
        document.getElementById('google-btn'),
        {},
        (googleUser) => {
          let profile = googleUser.getBasicProfile()

          //YOUR CODE HERE
          var data = {
            first_name: profile.getGivenName(),
            last_name: profile.getFamilyName(),
            email: profile.getEmail(),
            id: profile.getId(),
            avatar: profile.getImageUrl(),
          }
          selfthis.socialLogin(data, 'google')
        },
        (error) => {
          console.log(error);
          if (error.error != 'popup_closed_by_user') {
            this.errorMessageVal =
              'There has been an error fetching your details. Please check your Google account for permissions or check your browser for cookie settings.'
            this.$toast.error(
              'There has been an error fetching your details. Please check your Google account for permissions or check your browser for cookie settings.',
              { timeOut: 10000 }
            )
          }
        }
      )
    },
    facebookSDK() {
      window['fbAsyncInit'] = function () {
        FB.init({
          // Developemnt
          // appId: FACEBOOK_APP_ID_DEV,
          // Production
          appId: FACEBOOK_APP_ID_PROD,
          cookie: true,
          xfbml: true,
          version: 'v8.0',
        })

        FB.AppEvents.logPageView()
      }
      ;(function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    },
    facebook() {
      const selfthis = this
      FB.login(
        function (response) {
          if (response.status === 'connected') {
            // Logged into your webpage and Facebook.
            FB.api('/me?fields=id,first_name,last_name,email', function (res) {
              const data = { ...res }
              data.avatar =
                'https://graph.facebook.com/' + data.id + '/picture?type=small'
              selfthis.socialLogin(data, 'facebook')
            })
          } else {
            // The person is not logged into your webpage or we are unable to tell.
            if (response.status != undefined) {
              this.errorMessageVal =
                'There has been an error fetching your details. Please check your Facebook account for permissions or check your browser for cookie settings.'
              this.$toast.error(
                'There has been an error fetching your details. Please check your Facebook account for permissions or check your browser for cookie settings.',
                { timeOut: 10000 }
              )
            } else {
              this.errorMessageVal =
                'There has been an error fetching your details. Please try again.'
              this.$toast.error(
                'There has been an error fetching your details. Please try again.',
                { timeOut: 10000 }
              )
            }
          }
        },
        { scope: 'public_profile,email' }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.social-login-btn {
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
  text-align: center;
  border: none;
  width: 80%;
  display: block;
  margin: 5px auto;
  color: #ffffff;
  height: 3.2rem;
  font-weight: 500;
  transition: all 0.25s ease-in-out !important;
  text-align: center;
  cursor: pointer;
  -webkit-appearance: none;
  border-radius: 0;
  transform: translateY(-1px);
  &:focus {
    outline: none;
  }
}

.google {
  background-color: #db4a39;
}

.facebook {
  background-color: #39579a;
  color: #ffffff;
  &:hover {
    background-color: #344e86;
  }
}

.twitter {
  background-color: #00acee;
}
</style>