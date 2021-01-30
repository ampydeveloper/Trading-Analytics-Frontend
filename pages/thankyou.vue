<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Payment Confirmation</button>
            </h5>
            <div class="thankyou-message-container">
              <h1>Thanks for your order!</h1>
              <p>You will receive an email confirmation shortly to abc@fmail.com.com including product order details</p>
              <p>
                Estimated delivery is jul 15, 2020
                <span>Share on Social</span>
                <font-awesome-icon :icon="['fab', 'instagram']" />
                <font-awesome-icon :icon="['fab', 'facebook-square']" />
                <font-awesome-icon :icon="['fab', 'twitter']" />
              </p>
              <nuxt-link class="continue-shopping" to="/search">Continue Shopping</nuxt-link>
              <nuxt-link class="cancel-my-order" to="/">Cancel my order</nuxt-link>
            </div>
            <div class="thankyou-powered-by-ebay">
              <h5>
                powered by
                <img
                  class="thankyou-ebay-img"
                  src="~/assets/img/ebay-sibar-footer.png"
                  alt
                />
              </h5>
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
  layout: 'dashboard',
  head() {
    return {
      title: 'Thankyou - Slabstox'
    }
  },
  mounted() {
    this.authMiddleware()
  }
}
</script>

<style lang="scss" scoped>
.thankyou-message-container {
  text-align: center;
  color: $theme-off-white;
  text-transform: uppercase;
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  h1 {
    font-size: 24px;
    letter-spacing: 1px;
    line-height: 3;
  }
  p {
    font-size: 12px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    line-height: 0; 
    font-style: italic;
    letter-spacing: 1px;
    span {
      margin-left: 50px;
    }
    svg {
      font-size: 24px;
      color: #1be783;
      margin-left: 10px;
    }
  }

  .continue-shopping,
  .cancel-my-order {
    font-size: 12px;
  }

  .continue-shopping {
    margin-right: 50px;
    color: #1be783;
  }
  .cancel-my-order {
    color: #d13132;
  }
}

.thankyou-powered-by-ebay {
  text-align: center;
  margin-top: 50px;
  h5 {
    color: $theme-off-white;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    font-size: 10px;
    .thankyou-ebay-img {
      width: 10%;
      margin-left: 10px;
    }
  }
}
</style>