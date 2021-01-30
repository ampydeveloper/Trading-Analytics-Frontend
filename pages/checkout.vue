<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-md-8 col-sm-8 payment-option-left">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Payment option</button>
            </h5>
            <div class="payment-option-continer">
              <h5
                :class="(collapsePaymentModeActiveTab==1) ? null : 'collapsed'"
                :aria-expanded="(collapsePaymentModeActiveTab==1) ? 'true' : 'false'"
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
                />Pay with paypal
                <img
                  class="payment-option-paypal-img"
                  src="~/assets/img/paypal.png"
                  alt
                />
              </h5>
              <b-collapse v-model="collapsePaymentModePaypal" id="pay-with-paypal" class="mt-2">
                <b-card>
                  <p class="paypal-account-details-title-text">Paypal account details</p>
                  <p class="paypal-account-details-text">
                    EMAIL@HOST.COM
                    <span>Choose bank visa x3214</span>
                    <a href="javascript:;">Change</a>
                  </p>
                </b-card>
              </b-collapse>

              <hr />
              <h5
                :class="(collapsePaymentModeActiveTab==2) ? null : 'collapsed'"
                :aria-expanded="(collapsePaymentModeActiveTab==2) ? 'true' : 'false'"
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
                />Pay with Credit Card
                <img
                  class="payment-option-cc-img"
                  src="~/assets/img/cc-icons.png"
                  alt
                />
              </h5>
              <b-collapse v-model="collapsePaymentModeCC" id="pay-with-cc" class="mt-2">
                <b-card></b-card>
              </b-collapse>
            </div>
          </div>
        </div>
        <div class="card shipping-details-card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Shipping Details</button>
            </h5>
            <div class="row shipping-details-continer">
              <div class="col-md-3 col-sm-3">
                <h6>Shipping to:</h6>
                <p>JACK LINDER</p>
                <p>1234 Whisper Lane</p>
                <p>Fort Wayne, IN 56663</p>
                <p>United State</p>

                <a href="javascript:;">Change</a>
              </div>
              <div class="col-md-3 col-sm-3">
                <h6>Shipping:</h6>
                <p>USPS STANDARD</p>
                <p>Ground Shipping</p>

                <a href="javascript:;">Change</a>
              </div>
              <div class="col-md-6 col-sm-6">
                <h6>Estimated Arrival</h6>
                <p>5-7 Business Days</p>
                <p>July 15, 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 payment-option-side-cards">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Check Our Summary</button>
              <span class="float-right items-count">Items (2)</span>
            </h5>
            <div class="checkout-our-summary-details">
              <h4>
                Subtotal
                <span class="float-right">USD $90.00</span>
              </h4>
              <h4>
                Shipping
                <span class="float-right">Free</span>
              </h4>
              <h4>
                Tax
                <span class="float-right">0.00</span>
              </h4>
              <h4 class="total">
                Total
                <span class="float-right">USD $90.00</span>
              </h4>
              <div class="confirm-and-pay-container">
                <button class="confirm-and-pay" @click="goToThankyou()">
                  Confirm and pay
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="payment-option-powered-by-ebay">
          <h5>
            powered by
            <img
              class="gift-cart-title-ebay-img"
              src="~/assets/img/ebay-sibar-footer.png"
              alt
            />
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Cart - Slabstox'
    }
  },
  mounted() {
    this.authMiddleware()
  },
  data() {
    return {
      collapsePaymentModeActiveTab: 1,
      collapsePaymentModePaypal: true,
      collapsePaymentModeCC: false
    }
  },
  methods: {
    activePaymentModeChange(i) {
      this.collapsePaymentModeActiveTab = i
      this.collapsePaymentModePaypal = i == 1 ? true : false
      this.collapsePaymentModeCC = i == 2 ? true : false
    },
    goToThankyou(){
      this.$router.push('/thankyou')
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-option-side-cards {
padding-left: 0px;
  .card {
    margin-bottom: 25px;
  }
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
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
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
    font-size: 12px;
  }
  .paypal-account-details-text {
    color: $theme-off-white;
font-style: italic;
    font-size: 11px;
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
</style>