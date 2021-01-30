<template>
  <div class="col-md-12 col-sm-12">
    <div class="row cart_wrap">
      <div class="col-md-8 col-sm-8 column_left">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Shopping Cart Items</button>
            </h5>
            <div class="checkout-items-continer">
              <div class="row checkout-item" v-for="(item, index) of cartItems" :key="index">
                <div class="col-md-2 col-sm-2 p-0">
                  <img class="image" :src="item.details.galleryURL" :alt="index" />
                </div>
                <div class="col-md-6 col-sm-6">
                  <button class="theme-cart-btn card-btn title" :title="item.title">{{ item.title }}</button>
                  <div class="labels">
                    <label class="topps">Topps</label>
                    <label class="chrome">chrome</label>
                    <label class="top-pick">top pick</label>
                    <label class="trender">Trender</label>
                  </div>
                  <h6 class="seller-details">Seller: Vanduecop (35409)</h6>
                  <nuxt-link
                    :to="'/product?id='+item.details.id"
                    class="view-listing-details"
                  >view listing details</nuxt-link>
                  <span class="remove-item" @click="removeFromCart(index)">remove item</span>
                  <h6 class="save-for-later">
                    <img src="~/assets/img/icons/heart-green.png" alt /> Save for later
                  </h6>
                </div>
                <div class="col-md-4 col-sm-4 p-0">
                  <h5 class="quantity-price">
                    quantity: {{ item.qty }}
                    <span class="float-right price">USD ${{ item.price }}</span>
                  </h5>
                  <div class="shpping-type">
                    <span class="float-right free">Free</span>
                    <h6 class="shipping-option">
                      <font-awesome-icon :icon="['fas', 'chevron-down']" />Shipping
                    </h6>
                    <h6 class="shipping-option-description">$3.00 Standard Shipping</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card saved-items-card" style="display:none;">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Saved Items</button>
            </h5>
            <div class="checkout-items-continer">
              <div class="row checkout-item">
                <div class="col-md-2 col-sm-2 p-0">
                  <img class="image" src="~/assets/img/sample-card.jpg" alt />
                </div>
                <div class="col-md-6 col-sm-6">
                  <button class="theme-cart-btn card-btn title">Cody Belling 2019 topps update</button>
                  <div class="labels">
                    <label class="topps">Topps</label>
                    <label class="chrome">chrome</label>
                    <label class="top-pick">top pick</label>
                    <label class="trender">Trender</label>
                  </div>
                  <h6 class="seller-details">Seller: Vanduecop (35409)</h6>
                  <nuxt-link to="details" class="view-listing-details">view listing details</nuxt-link>
                  <span class="remove-item">remove item</span>
                  <h6 class="save-for-later">
                    <img src="~/assets/img/icons/heart-green-fill.png" alt /> Add to cart
                  </h6>
                </div>
                <div class="col-md-4 col-sm-4 p-0">
                  <h5 class="quantity-price">
                    quantity: 1
                    <span class="float-right price">USD $45.00</span>
                  </h5>
                  <div class="shpping-type">
                    <span class="float-right free">Free</span>
                    <h6 class="shipping-option">
                      <font-awesome-icon :icon="['fas', 'chevron-down']" />Shipping
                    </h6>
                    <h6 class="shipping-option-description">$3.00 Standard Shipping</h6>
                  </div>
                </div>
              </div>
              <div class="row checkout-item">
                <div class="col-md-2 col-sm-2 p-0">
                  <img class="image" src="~/assets/img/sample-card.jpg" alt />
                </div>
                <div class="col-md-6 col-sm-6">
                  <button class="theme-cart-btn card-btn title">Cody Belling 2019 topps update</button>
                  <div class="labels">
                    <label class="topps">Topps</label>
                    <label class="chrome">chrome</label>
                    <label class="top-pick">top pick</label>
                    <label class="trender">Trender</label>
                  </div>
                  <h6 class="seller-details">Seller: Vanduecop (35409)</h6>
                  <nuxt-link to="details" class="view-listing-details">view listing details</nuxt-link>
                  <span class="remove-item">remove item</span>
                  <h6 class="save-for-later">
                    <img src="~/assets/img/icons/heart-green-fill.png" alt /> Add to cart
                  </h6>
                </div>
                <div class="col-md-4 col-sm-4 p-0">
                  <h5 class="quantity-price">
                    quantity: 1
                    <span class="float-right price">USD $45.00</span>
                  </h5>
                  <div class="shpping-type">
                    <span class="float-right free">Free</span>
                    <h6 class="shipping-option">
                      <font-awesome-icon :icon="['fas', 'chevron-down']" />Shipping
                    </h6>
                    <h6 class="shipping-option-description">$3.00 Standard Shipping</h6>
                  </div>
                </div>
              </div>
              <div class="row checkout-item">
                <div class="col-md-2 col-sm-2 p-0">
                  <img class="image" src="~/assets/img/sample-card.jpg" alt />
                </div>
                <div class="col-md-6 col-sm-6">
                  <button class="theme-cart-btn card-btn title">Cody Belling 2019 topps update</button>
                  <div class="labels">
                    <label class="topps">Topps</label>
                    <label class="chrome">chrome</label>
                    <label class="top-pick">top pick</label>
                    <label class="trender">Trender</label>
                  </div>
                  <h6 class="seller-details">Seller: Vanduecop (35409)</h6>
                  <nuxt-link to="details" class="view-listing-details">view listing details</nuxt-link>
                  <span class="remove-item">remove item</span>
                  <h6 class="save-for-later">
                    <img src="~/assets/img/icons/heart-green-fill.png" alt /> Add to cart
                  </h6>
                </div>
                <div class="col-md-4 col-sm-4 p-0">
                  <h5 class="quantity-price">
                    quantity: 1
                    <span class="float-right price">USD $45.00</span>
                  </h5>
                  <div class="shpping-type">
                    <span class="float-right free">Free</span>
                    <h6 class="shipping-option">
                      <font-awesome-icon :icon="['fas', 'chevron-down']" />Shipping
                    </h6>
                    <h6 class="shipping-option-description">$3.00 Standard Shipping</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-sm-4 cart-right-side-cards">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Gift Card</button>
            </h5>
            <div class="gift-cart-form">
              <h4 class="gift-cart-title">
                <img class="gift-cart-title-ebay-img" src="~/assets/img/ebay-sibar-footer.png" alt /> Gift Card
              </h4>
              <input class="gift-cart-form-input" type="text" />
              <button class="gift-cart-form-btn">
                Submit
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-cart-btn card-btn">Shoppinng Cart Summary</button>
              <span class="float-right items-count">Items ({{cartItemsCount}})</span>
            </h5>
            <div class="supping-cart-summary-details">
              <h4>
                Subtotal
                <span class="float-right">USD ${{grandTotal(cartItems)}}</span>
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
                <span class="float-right">USD ${{grandTotal(cartItems)}}</span>
              </h4>
              <div class="checkout-btn-container">
                <button class="checkout-btn" @click="goToCheckout()">
                  Proceed to checkout
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="powered-by-ebay">
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      cartItems: 'cart/items',
      cartItemsCount: 'cart/itemsCount'
    })
  },
  methods: {
    removeItem(index) {
      this.$store.dispatch('cart/removeFromCart', index)
    },
    clearCart() {
      this.$store.dispatch('cart/clearCart')
    },
    incrementQty(index) {
      this.$store.dispatch('cart/incrementQty', index)
    },
    decrementQty(index) {
      this.$store.dispatch('cart/decrementQty', index)
    },
    grandTotal(cartItems) {
      let total = 0
      Object.keys(cartItems).forEach(function(itemId) {
        const item = cartItems[itemId]
        total += item.qty * item.price
      })

      return total.toFixed(2)
    },
    goToCheckout() {
      this.$router.push('/checkout')
    }
  }
}
</script>

<style lang="scss" scoped>
.cart_wrap .column_left {
  padding-right: 0px;
}
.cart-right-side-cards {
  .card {
    margin-bottom: 25px;
  }
}
.gift-cart-form {
  position: relative;
  padding: 0px 20px;
  .gift-cart-title {
    color: $theme-off-white;
    text-transform: uppercase;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    font-size: 14px;
    .gift-cart-title-ebay-img {
      width: 25%;
    }
  }
  .gift-cart-form-input {
    position: relative;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    width: 70%;
    vertical-align: top;
    margin-right: -1px;
  }
  .gift-cart-form-btn {
    width: 28%;
    position: relative;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    background-color: $theme-btn-green;
    color: #000000;
    border: 1px solid $theme-btn-green;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    text-transform: uppercase;
    font-size: 10px;
    padding: 7px 11px 4px;
    margin-left: -3px;
    letter-spacing: 1px;
    font-style: italic;
    &:focus {
      border: none;
      outline: none;
    }
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

.supping-cart-summary-details {
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
  .checkout-btn-container {
    text-align: center;
    margin-top: 25px;
    margin-bottom: 15px;
    .checkout-btn {
      font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
      background: $theme-btn-green;
      color: #000000;
      border: none;
      border-radius: 2px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 2px;
      padding: 16px 12px;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}

.powered-by-ebay {
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

.checkout-items-continer {
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  padding: 0px 25px;
  .checkout-item {
    padding: 20px 0px 20px;
    border-bottom: 2px solid #272d33;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0px;
    }
    .p-0 {
      padding: 0px;
    }
    .image {
      width: 100%;
      background: $theme-off-white;
      padding: 2px;
      height: auto;
    }
    .quantity-price {
      text-transform: uppercase;
      font-size: 10px;
      color: $theme-off-white;
      span {
        font-size: 12px;
      }
    }
    .shpping-type {
      text-transform: uppercase;
      font-size: 10px;
      margin-top: 40px;
      color: $theme-off-white;
      .free {
        font-size: 12px;
        margin-top: 10px;
      }
      .shipping-option,
      .shipping-option-description {
        text-transform: capitalize;
        font-size: 9px;
      }
      .shipping-option-description {
        padding-left: 10px;
      }
    }
    .title {
      font-size: 10px;
      text-decoration: underline;
      height: 22px;
      overflow: hidden;
    }
    .labels {
      color: #000000;
      font-size: 10px;
      text-transform: uppercase;
      padding-top: 5px;
      label {
        background: #ffffff;
        padding: 5px 6px;
        border-radius: 2px;
      }
      .topps {
        background-color: #e9cb1e;
      }
      .chrome {
        background-color: #cccccc;
      }
      .top-pick {
        background-color: $theme-btn-green;
      }
      .trender {
        background-color: #e57b13;
      }
    }
    .seller-details {
      color: $theme-off-white;
      font-size: 10px;
      text-transform: uppercase;
    }
    .view-listing-details {
      color: $theme-off-white;
      font-size: 9px;
      text-decoration: underline;
    }
    .remove-item {
      color: #d13132;
      font-size: 9px;
      display: block;
      text-decoration: underline;
      margin-top: 5px;
      cursor: pointer;
    }
    .save-for-later {
      color: $theme-btn-green;
      text-transform: uppercase;
      font-size: 12px;
      margin-top: 5px;
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
}

.saved-items-card {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none;
  margin-top: 25px;
  .card-btn {
    background: $theme-card-background-color !important;
  }
  .checkout-item {
    padding: 10px 0px 10px;
    border-bottom: none;
  }
}
</style>