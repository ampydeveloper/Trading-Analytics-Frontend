<template>
  <div class="col-md-10 col-sm-10 profile_page">
    <div class="row" v-if="requestCount!=null">
      <div class="col-md-6 col-sm-6 profile_stat_outer">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Listing Requests</button>
            </h5>
            <div class="profile_stat_box">
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <p class="count count-green">{{requestCount.listingCountApproved}}</p>
                  <p class="display-title">Approved</p>
                </div>

                <div class="col-md-6 col-sm-6">
                  <p class="count">{{requestCount.listingCountRejected}}</p>
                  <p class="display-title">Rejected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 profile_stat_outer">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Slab Requests</button>
            </h5>
            <div class="profile_stat_box">
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <p class="count count-green">{{requestCount.slabCountApproved}}</p>
                  <p class="display-title">Approved</p>
                </div>

                <div class="col-md-6 col-sm-6">
                  <p class="count">{{requestCount.slabCountRejected}}</p>
                  <p class="display-title">Rejected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-sm-6 payment-option-left">
        <div class="card">
          <div
            class="card-body"
            v-bind:class="{ 'edit-profile-input': editProfileInputShow }"
          >
            <h5 class="card-title">
              <button class="theme-btn card-btn">PROFILE INFO</button>
              <span
                class="edit-profile-input-link"
                @click="toggleProfileInputShow()"
                >EDIT PROFILE</span
              >
            </h5>
            <div class="profile_box">
              <div class="row">
                <div class="col-md-4 col-sm-4">
                  <div class="profile_img">
                    <img
                      class="gift-cart-title-ebay-img"
                      :src="user.picture"
                      alt
                    />
                  </div>
                  <!-- <button v-b-modal.changeProfileImage class="theme-btn card-btn">Change</button> -->
                </div>
                <div class="col-md-8 row">
                  <div class="col-md-6">
                    <div class="profile_info">
                      <h6>Name</h6>
                      <input
                        type="text"
                        class="profile_input"
                        @keyup="profileKeyup = true"
                        v-model="profile.name"
                        :readonly="!editProfileInputShow"
                      />
                    </div>
                    <div class="profile_info">
                      <h6>EMAIL</h6>
                      <input
                        type="text"
                        class="profile_input"
                        @keyup="profileKeyup = true"
                        v-model="profile.email"
                        :readonly="!editProfileInputShow"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="profile_info">
                      <h6>MOBILE</h6>
                      <input
                        type="text"
                        class="profile_input"
                        @keyup="profileKeyup = true"
                        v-model="profile.mobile"
                        :readonly="!editProfileInputShow"
                      />
                    </div>
                    <div class="profile_info">
                      <h6>BIRTHDAY</h6>
                      <b-form-datepicker
                        class="profile_datepicker"
                        v-model="profile.dob"
                        @keyup="profileKeyup = true"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: '2-digit',
                        }"
                        locale="en"
                        :readonly="!editProfileInputShow"
                      ></b-form-datepicker>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="profile_info">
                      <h6>ADDRESS</h6>
                      <textarea
                        v-model="profile.address"
                        @keyup="profileKeyup = true"
                        class="profile_textarea"
                        cols="30"
                        rows="3"
                        :readonly="!editProfileInputShow"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="theme-dark-grey-btn card-btn btn-post-bottom"
              :class="{ active: profileKeyup }"
              @click="saveProfileInfo()"
            >
              SAVE PROFILE INFO
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-sm-6 payment-option-side-cards">
        <div class="card notification_box">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">NOTIFICATIONS</button>
            </h5>
            <div class="profile_box">
              <div class="row">
                <div class="col-md-12">
                  <div class="col-md-12 row">
                    <div class="profile_info col-md-6">
                      <span>SLAB NOTIFICATIONS</span>
                      <div class="notification_title">
                        <h5>ENDING SOON LIVE AUCTION</h5>
                      </div>
                      <div class="notification_title">
                        <h5>WATCH LIST UPDATES</h5>
                      </div>
                      <div class="notification_title">
                        <h5>PORTFOLIO UPDATES</h5>
                      </div>
                    </div>
                    <div class="profile_info col-md-3">
                      <span>EMAIL</span>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="
                              slabNotification.endingSoonLiveAuction.email
                            "
                            class="custom-control-input"
                            id="switch1"
                          />
                          <label
                            class="custom-control-label"
                            for="switch1"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="slabNotification.swatchListUpdate.email"
                            class="custom-control-input"
                            id="switch2"
                          />
                          <label
                            class="custom-control-label"
                            for="switch2"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="slabNotification.portfolioUpdate.email"
                            class="custom-control-input"
                            id="switch3"
                          />
                          <label
                            class="custom-control-label"
                            for="switch3"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                    </div>
                    <div class="profile_info col-md-3">
                      <span>BROWSER</span>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="
                              slabNotification.endingSoonLiveAuction.browser
                            "
                            class="custom-control-input"
                            id="switch4"
                          />
                          <label
                            class="custom-control-label"
                            for="switch4"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="slabNotification.swatchListUpdate.browser"
                            class="custom-control-input"
                            id="switch5"
                          />
                          <label
                            class="custom-control-label"
                            for="switch5"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="slabNotification.portfolioUpdate.browser"
                            class="custom-control-input"
                            id="switch6"
                          />
                          <label
                            class="custom-control-label"
                            for="switch6"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="col-md-12 row">
                    <div class="profile_info col-md-6">
                      <span>MY LISTINGS NOTIFICATIONS</span>
                      <div class="notification_title">
                        <h5>LISTING PURCHASE</h5>
                      </div>
                      <div class="notification_title">
                        <h5>LISTING ENDING SOON</h5>
                      </div>
                    </div>
                    <div class="profile_info col-md-3">
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="
                              myListingNotification.listingPurchase.email
                            "
                            class="custom-control-input"
                            id="switch7"
                          />
                          <label
                            class="custom-control-label"
                            for="switch7"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="
                              myListingNotification.listingEndingSoon.email
                            "
                            class="custom-control-input"
                            id="switch8"
                          />
                          <label
                            class="custom-control-label"
                            for="switch8"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                    </div>
                    <div class="profile_info col-md-3">
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="
                              myListingNotification.listingPurchase.browser
                            "
                            class="custom-control-input"
                            id="switch9"
                          />
                          <label
                            class="custom-control-label"
                            for="switch9"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                      <div class="notification_title">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            v-model="
                              myListingNotification.listingEndingSoon.browser
                            "
                            class="custom-control-input"
                            id="switch10"
                          />
                          <label
                            class="custom-control-label"
                            for="switch10"
                            @click="changeNotification()"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>

            <button
              class="theme-dark-grey-btn card-btn btn-post-bottom"
              :class="{ active: notificationKeyup }"
              @click="updateNotification()"
            >
              SAVE NOTIFICATION SETTINGS
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="col-md-6 col-sm-6 payment-option-left">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Ebay Account</button>
              <img
                class="gift-cart-title-ebay-img"
                src="~/assets/img/ebay-sibar-footer.png"
                alt
              />
            </h5>
            <div class="box_info">
              <p>
                The SlabStox Pro + eBay integration allows you to buy and sell
                sportcard listings, track analytics, and more directly from your
                SlabStox Pro account.
              </p>
            </div>
            <button class="theme-green-btn card-btn btn-post-bottom">
              CONNECT TO EBAY
            </button>
          </div>
        </div>
      </div> -->
      <!-- <div class="col-md-6 col-sm-6 payment-option-side-cards"> -->
      <!-- <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Payment Info</button>
            </h5>
            <div class="payment-option-continer">
              <h5
                :class="collapsePaymentModeActiveTab == 1 ? null : 'collapsed'"
                :aria-expanded="
                  collapsePaymentModeActiveTab == 1 ? 'true' : 'false'
                "
                aria-controls="pay-with-paypal"
                @click="activePaymentModeChange(1)"
              >
                <font-awesome-icon
                  v-if="collapsePaymentModeActiveTab == 1"
                  :icon="['fas', 'chevron-down']"
                />
                <font-awesome-icon
                  v-if="collapsePaymentModeActiveTab != 1"
                  :icon="['fas', 'chevron-right']"
                />Connect paypal
                <img
                  class="payment-option-paypal-img"
                  src="~/assets/img/paypal.png"
                  alt
                />
              </h5>
              <b-collapse
                v-model="collapsePaymentModePaypal"
                id="pay-with-paypal"
                class="mt-2"
              >
                <b-card>
                  <p class="paypal-account-details-title-text">
                    Paypal account details
                  </p>
                  <p class="paypal-account-details-text">
                    EMAIL@HOST.COM
                    <span>Choose bank visa x3214</span>
                    <a href="javascript:;">Change</a>
                  </p>
                </b-card>
              </b-collapse>

              <hr />
              <h5
                :class="collapsePaymentModeActiveTab == 2 ? null : 'collapsed'"
                :aria-expanded="
                  collapsePaymentModeActiveTab == 2 ? 'true' : 'false'
                "
                aria-controls="pay-with-cc"
                @click="activePaymentModeChange(2)"
              >
                <font-awesome-icon
                  v-if="collapsePaymentModeActiveTab == 2"
                  :icon="['fas', 'chevron-down']"
                />
                <font-awesome-icon
                  v-if="collapsePaymentModeActiveTab != 2"
                  :icon="['fas', 'chevron-right']"
                />User Credit Card
                <img
                  class="payment-option-cc-img"
                  src="~/assets/img/cc-icons.png"
                  alt
                />
              </h5>
              <b-collapse
                v-model="collapsePaymentModeCC"
                id="pay-with-cc"
                class="mt-2"
              >
                <b-card></b-card>
              </b-collapse>
              <button class="theme-green-btn card-btn btn-post-bottom">
                SAVE PAYMENT INFO
              </button>
            </div>
          </div>
        </div> -->
      <!-- </div> -->
      <div class="col-md-6 col-sm-6 payment-option-side-cards">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">FACEBOOK</button>
              <img
                class="gift-cart-title-ebay-img"
                src="~/assets/img/facebook.jpg"
                alt
              />
            </h5>
            <div class="box_info">
              <p>
                The SlabStox Pro + Facebook integration allows you to share your
                slabs, listings, and portfolio directly to your Facebook feed.
              </p>
              <!-- <p>The SlabStox Pro + Facebook integration allows you to connect your account to your Facebook account.</p> -->
            </div>
            <button
              class="theme-green-btn card-btn"
              v-if="facebook == null"
              @click="profile_facebook()"
            >
              CONNECT TO FACEBOOK
            </button>
            <button
              class="theme-green-btn card-btn"
              v-if="facebook != null"
              @click="disconnect_social('facebook')"
            >
              DISCONNECT TO FACEBOOK
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 payment-option-left">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">GOOGLE</button>
              <img
                class="gift-cart-title-ebay-img"
                src="~/assets/img/google-icon.png"
                alt
              />
            </h5>
            <div class="box_info">
              <p>
                The SlabStox Pro + Google integration allows you to share your
                slabs, listings, and portfolio directly to your Google feed.
              </p>
              <!-- <p>
                The SlabStox Pro + Google integration allows you to connect your
                account to your Google account.
              </p> -->
            </div>
            <button
              class="theme-green-btn card-btn"
              v-if="google == null"
              id="profile-google-btn"
            >
              CONNECT TO Google
            </button>
            <button
              class="theme-green-btn card-btn"
              v-if="google != null"
              @click="disconnect_social('google')"
            >
              DISCONNECT TO Google
            </button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="disconnectSocialAccount"
      title="Disconnect You Account"
      hide-footer
    >
      <div class="center-form profile_page edit-profile-input">
        <label for="">Set new Password</label>
        <input
          type="password"
          class="profile_input"
          v-model="disconnect.password"
          placeholder="Choose New Password"
        />
        <button
          class="theme-green-btn card-btn"
          @click="disconnectNow()"
          :disabled="
            disconnect.password == null ||
            disconnect.password == '' ||
            requestInProcess
          "
        >
          Save
        </button>
      </div>
    </b-modal>

    <b-modal
      id="changeProfileImage"
      title="Change Profile Image"
      size="lg"
      hide-footer
    >
      <div class="row">
        <ProfileCropper :profileImage="user.picture" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import ProfileCropper from '~/components/dashboard/ProfileCropper'
import {
  GOOGLE_CLIENT_ID_DEV,
  GOOGLE_CLIENT_ID_PROD,
  FACEBOOK_APP_ID_DEV,
  FACEBOOK_APP_ID_PROD,
} from '../constants/keys'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Profile - Slabstox',
    }
  },
  components: { ProfileCropper },
  mounted() {
    this.profile = {
      name:
        this.user.first_name + ' ' + (this.user.last_name != 'null')
          ? this.user.last_name
          : '',
      mobile: this.user.mobile,
      email: this.user.email,
      dob: this.user.dob,
      address: this.user.address,
    }

    if (this.user.slab_notification != null) {
      this.slabNotification = { ...this.user.slab_notification }
    }

    if (this.user.my_listing_notification != null) {
      this.myListingNotification = { ...this.user.my_listing_notification }
    }

    this.getSocialAccountsDetails()
  },
  data() {
    return {
      collapsePaymentModeActiveTab: 1,
      collapsePaymentModePaypal: true,
      collapsePaymentModeCC: false,
      editProfileInputShow: false,
      profileKeyup: false,
      notificationKeyup: false,
      profile: {
        name: null,
        mobile: null,
        email: null,
        dob: null,
        address: null,
      },
      requestInProcess: false,
      slabNotification: {
        endingSoonLiveAuction: {
          email: false,
          browser: false,
        },
        swatchListUpdate: {
          email: false,
          browser: false,
        },
        portfolioUpdate: {
          email: false,
          browser: false,
        },
      },
      myListingNotification: {
        listingPurchase: {
          email: false,
          browser: false,
        },
        listingEndingSoon: {
          email: false,
          browser: false,
        },
      },
      facebook: null,
      google: null,
      requestCount:null,
      disconnect: {
        provider: null,
        id: null,
        password: null,
      },
    }
  },
  methods: {
    getSocialAccountsDetails() {
      try {
        this.$axios.$get('user/get-social-accounts').then((res) => {
          if (res.status == 200) {
            this.facebook = res.facebook
            this.google = res.google
            this.requestCount = res.request_count
            if (this.facebook == null) {
              this.profile_facebookSDK()
            }
            if (this.google == null) {
              this.profile_googleSDK()
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    changeNotification() {
      this.notificationKeyup = true
    },
    activePaymentModeChange(i) {
      this.collapsePaymentModeActiveTab = i
      this.collapsePaymentModePaypal = i == 1 ? true : false
      this.collapsePaymentModeCC = i == 2 ? true : false
    },
    toggleProfileInputShow() {
      this.editProfileInputShow = !this.editProfileInputShow
    },
    saveProfileInfo() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('user/profile-data/update', this.profile)
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              this.profileKeyup = false
              if (res.status == 200) {
                this.$auth.fetchUser()
              }
            })
        } catch (err) {
          this.hideLoader()
          this.profileKeyup = false
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    updateNotification() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('user/notification/update', {
              slabNotification: this.slabNotification,
              myListingNotification: this.myListingNotification,
            })
            .then((res) => {
              this.requestInProcess = false
              this.notificationKeyup = false
              this.hideLoader()
              if (res.status == 200) {
                this.$auth.fetchUser()
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          this.notificationKeyup = false
          console.log(err)
        }
      }
    },
    profile_googleSDK() {
      const selfthis = this
      if (window['gAuth2']) {
        selfthis.profile_prepareLoginButton()
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
            selfthis.profile_prepareLoginButton()
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
    profile_prepareLoginButton() {
      const selfthis = this
      window['gAuth2'].attachClickHandler(
        document.getElementById('profile-google-btn'),
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
          selfthis.linkSocialAccounts(data, 'google')
        },
        (error) => {
          console.log(error)
          // alert(JSON.stringify(error, undefined, 2));
        }
      )
    },
    profile_facebookSDK() {
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
    profile_facebook() {
      const selfthis = this
      FB.login(
        function (response) {
          if (response.status === 'connected') {
            // Logged into your webpage and Facebook.
            FB.api('/me?fields=id,first_name,last_name,email', function (res) {
              const data = { ...res }
              data.avatar =
                'https://graph.facebook.com/' + data.id + '/picture?type=small'
              selfthis.linkSocialAccounts(data, 'facebook')
            })
          } else {
            // The person is not logged into your webpage or we are unable to tell.
            console.log('Unable to login now')
          }
        },
        { scope: 'public_profile,email' }
      )
    },
    linkSocialAccounts(user, provider) {
      this.showLoader()
      this.$axios
        .post('user/add-social-accounts/' + provider, user)
        .then((res) => {
          this.hideLoader()
          this.getSocialAccountsDetails()
        })
        .catch((e) => {
          this.hideLoader()
        })
    },
    disconnect_social(provider) {
      this.disconnect = {
        provider: provider,
        id: provider == 'facebook' ? this.facebook.id : this.google.id,
        password: null,
      }
      this.$bvModal.show('disconnectSocialAccount')
    },
    disconnectNow() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('user/remove-social-accounts', this.disconnect)
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.getSocialAccountsDetails()
              }
              this.$bvModal.hide('disconnectSocialAccount')
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-profile-input {
  .profile_input,
  .profile_textarea {
    border-bottom: 1px solid #ffffff !important;
  }
}
.payment-option-left, .payment-option-side-cards{
  .theme-green-btn{
    cursor: pointer;
  }
}
.edit-profile-input-link {
  cursor: pointer;
  &:hover {
    color: #1ce783;
  }
}
// .payment-option-side-cards {
//   padding-left: 0px;
//   .card {
//     margin-bottom: 25px;
//   }
// }
.dropdown-menu.show {
  background: #39414a;
  font-style: normal;
  font-size: 12px;
}
.dropdown-menu.show .b-calendar .b-calendar-grid-body .col .btn {
  font-size: 12px;
  line-height: 15px;
  padding: 9px 0 9px 3px;
}
.dropdown-menu.show > .btn-primary.dropdown-toggle {
  background: #1ce783;
}
.dropdown-menu.show .btn-outline-primary {
  color: #1ce783;
}
.dropdown-menu.show footer {
  display: none;
}

.items-count {
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  color: $theme-off-white;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 3;
  font-style: italic;
}

.checkout-our-summary-details {
  color: $theme-off-white;
  text-transform: uppercase;
  padding: 0px 20px;
  font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
  h4 {
    font-size: 16px;
  }
  h4.total {
    margin-top: 25px;
  }
  .confirm-and-pay-container {
    text-align: center;
    margin-top: 25px;
    margin-bottom: 15px;
    .confirm-and-pay {
      font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
      background: $theme-btn-green;
      color: #000000;
      border: none;
      border-radius: 2px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 2px;
      padding: 16px 35px;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}

.payment-option-powered-by-ebay {
  text-align: center;
  h5 {
    color: $theme-off-white;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    font-size: 12px;
    img {
      width: 23%;
      margin-left: 10px;
    }
  }
}

.payment-option-continer {
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  padding: 0px 0px;
  h5 {
    color: $theme-off-white;
    font-size: 11px;
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 2px;
    svg {
      margin-right: 20px;
    }
    .payment-option-paypal-img {
      width: 35%;
      margin-left: 25px;
    }
    .payment-option-cc-img {
      width: 35%;
      margin-left: 25px;
    }
    &:focus {
      outline: none;
    }
  }
  .collapse {
    .card {
      border: none;
    }
  }
  .paypal-account-details-title-text {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    font-size: 10px;
    color: #636d77;
    letter-spacing: 2px;
  }
  .paypal-account-details-text {
    color: $theme-off-white;
    font-style: italic;
    font-size: 11px;
    letter-spacing: 1px;
    a,
    span {
      margin-left: 20px;
      font-style: italic;
    }

    a {
      color: $theme-btn-green;
      text-decoration: underline;
    }
  }
  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
  }
}

.shipping-details-card {
  margin-top: 25px;
  .shipping-details-continer {
    padding: 0px 25px;
    h6 {
      text-transform: uppercase;
      font-style: italic;
      line-height: 4;
      font-size: 14px;
    }
    p {
      color: #ffffff;
      font-size: 12px;
      font-style: italic;
      line-height: 20px;
      margin: 0px;
      padding: 0 !important;
    }
    div {
      border-right: 2px solid #272d33;
      &:last-child {
        border-right: none;
      }
      padding-bottom: 0px;
      margin-bottom: 20px;
    }
    a {
      line-height: 3;
      color: $theme-btn-green;
      text-decoration: underline;
      font-style: italic;
    }
  }
}

.profile_page {
  .profile_input,
  .profile_textarea {
    width: 100%;
    background: $theme-card-background-color;
    border: 0px;
    color: #ffffff;
    font-size: 11px;
    letter-spacing: 2px;
    line-height: 20px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    margin: 0px;
    padding: 0 !important;
    &:focus {
      outline: 0;
    }
  }
  .profile_datepicker {
    width: 100%;
    background: $theme-card-background-color;
    border: 0px;
    color: #ffffff;
    font-size: 10px;
    letter-spacing: 2px;
    font-style: italic;
    line-height: 20px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    margin: 0px;
    padding: 0 !important;
  }
}
#disconnectSocialAccount {
  .center-form {
    padding: 0 20px;
    .card-btn {
      padding: 8px 12px 5px;
      font-family: Nexabold, Helvetica, Arial, sans-serif;
      color: #212529;
      margin-top: 15px;
    }
  }
}
.profile_stat_outer{
  .card{
            height: auto;
    margin-bottom: 30px;
    min-height: auto;
    .card-body{
      padding-bottom: 30px;
    }
  }
}
.profile_stat_box {
  .count {
    font-size: 75px;
    text-align: center;
    color: #cfcfcf;
    margin: 0;
    line-height: 80px;
  }
  .count-green {
    color: #1ce783;
  }
  .display-title {
    color: #fff;
    font-size: 10px;
    margin-top: 3px;
    letter-spacing: 1px;
    display: block;
    text-align: center;
    text-transform: uppercase;
        margin-bottom: 0;
  }
}
</style>