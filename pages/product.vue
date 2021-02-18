<template>
  <div class="col-md-12 col-sm-12 product-details" v-if="loaded">
    <div class="row">
      <div class="col-md-4 col-sm-4 t-p-5 product-details-col-md-4">
        <div class="card" style="height: 100%">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">{{ data.title }}</h5>
            <div class="labels">
              <label class="topps" v-if="data.card!=null && data.card.brand == 'Topps Series 2'"
                >Topps</label
              >
              <label class="chrome" v-if="data.card!=null && data.card.brand == 'Prizm'"
                >Prizm</label
              >
              <label class="top-pick" v-if="false">top pick</label>
              <label class="trender" v-if="false">Trender</label>
            </div>
            <!-- <div class="icons-container">
              <img
                v-if="!isInWatchList(data.id) && user.full_name != null"
                @click="addToWatchList()"
                class="icons"
                src="~/assets/img/icons/1heart-green.png"
              />
              <img
                v-if="isInWatchList(data.id) && user.full_name != null"
                @click="removeToWatchList()"
                class="icons heart-fill-icon"
                src="~/assets/img/icons/heart-green.png"
              />
            </div> -->
            <div class="image-conatiner">
              <img :src="getImage()" :alt="data.title" />
            </div>
            <div class="view-listing-on-ebay">
              <a :href="data.viewItemURL" target="_blank">
                View listing on ebay
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-sm-8 t-p-5 product-details-col-md-8">
        <div class="row">
          <div class="col-md-8 col-sm-8 listing-info">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title sx-stats-all">
                  <button class="theme-cart-btn card-btn">Listing Info</button>
                  <button class="theme-btn card-btn">
                    *$$ Value
                    {{ data.card != null ? data.card.value.value : '0' }}
                  </button>
                  <button
                    class="theme-green-btn card-btn"
                    v-if="valueDifference > 0"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-up']"
                      v-if="valueDifference > 0"
                    />&nbsp;&nbsp;{{ getValueDifference() }}
                  </button>
                  <button
                    class="theme-red-btn card-btn"
                    v-if="valueDifference < 0"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-down']"
                    />&nbsp;&nbsp;{{ getValueDifference() }}
                  </button>
                  <nuxt-link
                    class="theme-btn card-btn vsd-btn"
                    :to="'/card-data/?id=' + data.card_id"
                  >
                    View Slab Data
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link>
                </h5>
                <div class="listing-info-container">
                  <ul>
                    <li>
                      Buy it Now: ${{
                        data.selling_status ? data.selling_status.price : 0
                      }}
                    </li>
                    <li
                      v-if="
                        data.selling_status &&
                        data.selling_status.timeLeft != null
                      "
                    >
                      Time left: {{ timeLeft.value }}
                    </li>
                    <li
                      v-if="
                        data.selling_status &&
                        data.selling_status.timeLeft == null
                      "
                    >
                      Time left: 00:00
                    </li>
                  </ul>
                  <ul>
                    <li v-if="data.condition != null">
                      Condition: {{ data.condition.conditionDisplayName }}
                    </li>
                    <li v-if="false">Current Bid:</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 seller-info">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-cart-btn card-btn">Seller Info</button>
                </h5>
                <div class="seller-info-container">
                  <p class="seller-name">
                    {{
                      data.seller_info ? data.seller_info.sellerUserName : ''
                    }}
                  </p>
                  <p>
                    <a href="javascript:;" class="positive-feedback-link"
                      >{{
                        data.seller_info
                          ? data.seller_info.positiveFeedbackPercent
                          : 0
                      }}% Positive Feedback</a
                    >
                  </p>
                  <p>
                    <a
                      href="https://contact.ebay.com/ws/eBayISAPI.dll?FindAnswers&redirect=0&iid=164254838107&requested=fansonlycollectibles"
                      target="_blank"
                      >Contact Seller</a
                    >
                  </p>
                  <p>
                    <a
                      href="https://www.ebay.com/str/90s-cards?_trksid=p2047675.l2563"
                      target="_blank"
                      >Visit Store</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row slab-spec-row">
          <div class="col-md-7 col-sm-7 pr-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-cart-btn card-btn">Slab Specs</button>
                  <a
                    class="view-details-link float-right"
                    v-b-modal.specsDetails
                    href="javascript:;"
                  >
                    view Details
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </a>
                </h5>
                <div class="slab-specs-container">
                  <ul class="slab-specs-ul">
                    <template v-for="(value, key) of data.details">
                      <li class="slab-specs-li" :key="key" v-if="value != ''">
                        <p>
                          {{ key }}:
                          {{
                            key == 'rookie' && value == 1
                              ? 'Yes'
                              : key == 'rookie'
                              ? 'No'
                              : value
                          }}
                        </p>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
            <div class="slab-specs-btn-group" v-if="user.full_name != null">
              <a
                class="slab-specs-btn theme-green-btn"
                target="_blank"
                v-if="data.listing_info != null && data.listing_info.listingType == 'Auction'"
                :href="data.viewItemURL"
                >Place Bid</a
              >
              <a
                class="slab-specs-btn theme-buy-now-btn"
                target="_blank"
                :href="data.viewItemURL"
                v-if="data.listing_info != null && data.listing_info.listingType != 'Auction'"
                >Buy Now</a
              >
              <a
                class="slab-specs-btn theme-btn"
                v-if="data.listing_info != null && data.listing_info.listingType == 'Auction'"
                target="_blank"
                :href="data.viewItemURL"
                >Make Offer</a
              >
            </div>
            <div class="slab-specs-btn-group" v-if="user.full_name == null">
              <nuxt-link class="slab-specs-btn theme-btn" to="/">
                Login To Buy
              </nuxt-link>
            </div>
          </div>
          <div class="col-md-5 col-sm-5 purchase-info">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-cart-btn card-btn">Purchase info</button>
                </h5>
                <div class="purchase-info-container">
                  <p>
                    <span>Shipping</span>
                    {{
                      data.shipping_info != null
                        ? '$' + data.shipping_info.shippingServiceCost
                        : '0'
                    }}
                    standard shipping
                    <!-- | <a href="javascript:;" class="see-deatils">see details</a> -->
                  </p>
                  <p>
                    <span>Location</span>
                    {{ data.location }}
                  </p>
                  <p>
                    <span>Shipping to</span>
                    {{
                      data.shipping_info
                        ? data.shipping_info.shipToLocations
                        : ''
                    }}
                    <!-- <a href="javascript:;" class="see-exclusions"
                      >See Exclusions</a
                    > -->
                  </p>
                  <!-- <p>
                    <span>Delivery</span> Estimated on before Mon. Jun 29 to
                    53072
                  </p> -->
                  <p>
                    <span>Payments</span>
                    {{ data.paymentMethod }}
                  </p>
                  <p>
                    <span>Return</span>
                    Seller
                    {{ data.returnsAccepted == 'true' ? '' : 'does not' }}
                    accept return
                    <!-- | <a href="javascript:;" class="see-deatils">see details</a> -->
                  </p>
                </div>
              </div>
            </div>
            <div class="subtitle">
              <span v-b-modal.openSeeProblemPopup v-if="user.full_name != null">
                SEE A PROBLEM? FLAG LISTING
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RealtedProductList :cardId="data.card_id" :itemId="data.id" />
    <b-modal id="specsDetails" title="Slab Specs" hide-footer>
      <ul>
        <template v-for="(value, key) of data.details">
          <li :key="key" v-if="value != ''">
            <p>
              {{ key }}:
              {{
                key == 'rookie' && value == 1
                  ? 'Yes'
                  : key == 'rookie'
                  ? 'No'
                  : value
              }}
            </p>
          </li>
        </template>
      </ul>
    </b-modal>
    <b-modal id="openSeeProblemPopup" title="FLAG LISTING" hide-footer>
      <form class="" v-on:submit.prevent="submitSeeProblem">
        <div class="col-md-12">
          <textarea
            class="form-control"
            placeholder="Describe your problem with this listing in a few words…"
            v-model="seeProblemMessage"
            required
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="col-md-12 text-right">
          <button
            type="submit"
            class="theme-green-btn form-submit-btn"
            :disabled="!seeProblemMessage"
          >
            Submit
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import RealtedProductList from '~/components/dashboard/RealtedProductList'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Product Details - Slabstox',
    }
  },
  async mounted() {
    if (this.$route.query.hasOwnProperty('id')) {
      this.id = this.$route.query.id
    } else {
      this.$router.push('/404')
    }
    this.getData()
  },
  components: {
    RealtedProductList,
  },
  watchQuery(newQuery, oldQuery) {
    if (this.id != newQuery.id) {
      this.id = newQuery.id
      this.getData()
    }
  },
  data() {
    return {
      id: null,
      loaded: false,
      data: null,
      title: '',
      valueDifference: 0,
      seeProblemMessage: null,
      timeLeft: {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        value: null,
        datetime: null,
        intervalObject: null,
      },
    }
  },
  methods: {
    async submitSeeProblem() {
      try {
        const res = await this.$axios.$post('add-see-problem', {
          id: this.id,
          message: this.seeProblemMessage,
        })
        console.log(res)
        if (res.status == 200) {
          this.seeProblemMessage = null
          this.$bvModal.hide('openSeeProblemPopup')
          this.loaded = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    calculateValueDifference() {
      if (this.data.card !=null && this.data.card.value != null) {
        var sellingStatusPrice = this.data.selling_status
          ? this.data.selling_status.price
          : ''
        this.valueDifference =
          parseFloat(sellingStatusPrice) -
          parseFloat(this.data.card.value.value)
      } else {
        this.valueDifference = 0
      }
    },
    getValueDifference() {
      if (this.valueDifference > 0) {
        return this.valueDifference.toFixed(2)
      } else {
        let a = this.valueDifference * 2
        return (this.valueDifference - a).toFixed(2)
      }
    },
    async getData() {
      try {
        const res = await this.$axios.$post('get-item-details', {
          id: this.id,
        })
        console.log(res)
        if (res.status == 200) {
          this.data = res.data
          this.calculateValueDifference()
          this.getTimeLeft()
          this.loaded = true
        } else {
          this.$router.push('/404')
        }
      } catch (err) {
        console.log(err)
      }
    },
    getTimeLeft() {
      this.timeLeft.intervalObject = setInterval(() => {
        var date1 = this.$moment(this.data.listing_ending_at)
        var a = date1.format('YYYY-MM-DD HH:mm:ss')
        var date2 = this.$moment()
        var b = date2.format('YYYY-MM-DD HH:mm:ss')
        var x = this.$moment(a)
        var y = this.$moment(b)
        var final = x.diff(y)
        if (final > 0) {
          const d = this.$moment(final).format('D')
          const h = this.$moment(final).format('H')
          const m = this.$moment(final).format('mm')
          const s = this.$moment(final).format('ss')
          if (d > 0) {
            this.timeLeft.value = d + 'd ' + h + 'h'
          } else if (h > 1) {
            this.timeLeft.value = h + 'h ' + m + 'm'
          } else if (m > 1) {
            this.timeLeft.value = m + 'm ' + s + 's'
          } else {
            this.timeLeft.value = s + 's'
          }
        } else {
          this.timeLeft.value = '00:00'
          clearInterval(this.timeLeft.intervalObject)
        }
      }, 1000)
    },
    getImage() {
      if (this.data.pictureURLSuperSize != null) {
        return this.data.pictureURLSuperSize
      } else if (this.data.pictureURLLarge != null) {
        return this.data.pictureURLLarge
      } else if (this.data.galleryURL != null) {
        return this.data.galleryURL
      } else {
        return '~/assets/img/default-image.jpg'
      }
    },
    addToWatchList() {
      try {
        this.$axios
          .$post('watchlist/add', {
            id: this.data.id,
          })
          .then((res) => {
            this.$store.dispatch('watchlist/fetchIds')
          })
      } catch (err) {
        console.log(err)
      }
    },
    removeToWatchList() {
      try {
        this.$axios
          .$post('watchlist/remove', {
            id: this.data.id,
          })
          .then((res) => {
            this.$store.dispatch('watchlist/fetchIds')
            this.$emit('onRemoveFromWatchList')
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
  destroyed() {
    if (this.timeLeft.intervalObject != null) {
      clearInterval(this.timeLeft.intervalObject)
    }
  },
}
</script>


<style lang="scss">
.product-details {
  .t-p-5 {
    padding: 5px;
  }
  .product-image-card {
    padding: 10px 24px;
    // height: 562px;
    .product-title {
      background: #272d33;
      color: #edecec;
      border: none;
      border-radius: 2px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 5px;
      margin-bottom: 0px !important;
      height: 50px;
      overflow: hidden;
    }
    .labels {
      color: #000000;
      font-size: 12px;
      text-transform: uppercase;
      padding-top: 5px;
      label {
        background: #ffffff;
        padding: 6px 9px;
        border-radius: 2px;
        line-height: 1.1;
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
    .icons-container {
      position: absolute;
      padding: 10px;
      right: 0px;
      margin-top: 10px;
      margin-right: 25px;
      z-index: 1;
      .icons {
        width: 32px;
        height: 32px;
        float: right;
        margin-top: -10px;
      }
      .heart-fill-icon {
        height: auto;
        width: 30px;
        cursor: pointer;
      }
    }
    .image-conatiner {
      background: #272d33;
      padding: 5px 7px;
      text-align: center;
      vertical-align: middle;
      border: 6px solid #fff;
      display: table-cell;
      width: 359px;
      height: 505px;
      img {
        width: auto;
        display: block;
        margin: 0 auto;
        max-width: 100%;
        vertical-align: middle;
      }
    }
    .view-listing-on-ebay {
      text-align: center;
      font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      a {
        color: $theme-btn-green;
        font-size: 9px;
        text-decoration: none;
      }
    }
  }
  .listing-info,
  .slab-specs {
    padding-right: 0px;
  }
  .slab-spec-row {
    margin-top: 10px;
  }
  .seller-info {
    padding-left: 10px;
    .seller-info-container {
      padding: 0px 10px;
      .seller-name {
        color: $theme-off-white;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 2;
        letter-spacing: 1px;
        font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial,
          sans-serif;
      }
      p {
        padding: 0px;
        margin: 0px;
        a {
          color: $theme-btn-green;
          font-size: 9px;
          font-family: 'CocogoosePro-LightItalic', Helvetica, Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          text-decoration: underline;
          &.positive-feedback-link {
            text-decoration: none;
          }
        }
      }
    }
  }
  .listing-info-container {
    // height: 93px;
    ul {
      padding: 0px;
      margin: 0px;
      list-style: none;
      li {
        color: $theme-off-white;
        display: inline-block;
        width: 49%;
        font-size: 17px;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        font-weight: bolder;
        line-height: 3;
      }
    }
  }
  .view-details-link {
    font-size: 8px;
    color: $theme-btn-green;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 1px;
    font-style: italic;
  }
  .slab-specs-container {
    padding: 0px 10px;
    height: 289px !important;
    ul {
      padding: 0px;
      margin: 0px;
      list-style: none;
      li {
        color: $theme-off-white;
        display: inline-block;
        width: 49%;
        font-size: 10px;
        text-transform: uppercase;
        font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        font-weight: bolder;
        line-height: 2;
        margin-bottom: 10px;
        p {
          padding: 2px 0px;
          margin: 0px;
          font-size: 11px;
          letter-spacing: 1px;
          line-height: 14px;
        }
      }
    }
  }
  .purchase-info {
    padding-left: 10px;
    .purchase-info-container {
      padding: 0px 10px;
      height: auto;
      p {
        color: $theme-off-white;
        font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        font-size: 11px;
        letter-spacing: 1px;
        span {
          display: block;
          text-transform: uppercase;
        }
        .see-deatils,
        .see-exclusions {
          color: $theme-off-white;
          text-transform: capitalize;
        }
        .see-exclusions {
          text-decoration: underline;
        }
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }

  .slab-specs-btn-group {
    margin-top: 10px;
    .slab-specs-btn {
      border-radius: 0px;
      padding: 22px 5px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      display: inline-block;
      text-align: center;
      font-size: 14px !important;
      &.theme-green-btn {
        color: #000;
      }
      &.theme-buy-now-btn {
        color: #fff;
        &:hover {
          text-decoration: none;
        }
      }
      &.theme-btn {
        color: #000;
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
}
@media (min-width: 425px) {
  .slab-specs-btn {
    width: 32.4%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        width: 375px;
      }
    }
  }
}
@media (min-width: 768px) {
  .slab-specs-btn {
    width: 32.4%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 553px;
        width: 521px;
      }
    }
  }
}
@media (min-width: 1024px) {
  .slab-specs-btn {
    width: 32.4%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 593px;
      }
    }
  }
}
@media (min-width: 1366px) {
  .slab-specs-btn {
    width: 32.4%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 538px;
        img {
          max-height: 401px;
        }
      }
    }
  }
}
@media (min-width: 1440px) {
  .slab-specs-btn {
    width: 32.4%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 514px;
      }
    }
  }
}
@media (min-width: 1600px) {
  .slab-specs-btn {
    width: 32.6%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 514px;
      }
    }
  }
}
@media (min-width: 1856px) {
  .slab-specs-btn {
    width: 32.6%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 514px;
        img {
          max-height: 415px;
        }
      }
    }
  }
}
@media (min-width: 1921px) {
  .slab-specs-btn {
    width: 32.8%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        height: 514px;
      }
    }
  }
  .product-details-col-md-4 {
    flex: 0 0 22.333333%;
    max-width: 22.333333%;
  }
  .product-details-col-md-8 {
    flex: 0 0 77.666667%;
    max-width: 77.666667%;
  }
}
@media (min-width: 2048px) {
  .slab-specs-btn {
    width: 32.8%;
  }
  .product-details {
    .product-image-card {
      .image-conatiner {
        img {
          max-height: 415px;
        }
      }
    }
  }
}

#specsDetails,
#openSeeProblemPopup {
  .modal-dialog {
    .modal-content {
      background: $theme-card-background-color;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      .modal-title {
        background: $theme-background-color;
        color: $theme-off-white;
        border: none;
        border-radius: 2px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 5px 15px 4px;
      }
      .modal-body {
        color: $theme-off-white;
        text-transform: uppercase;
        padding: 20px 0px !important;
        font-size: 12px;
        ul li {
          width: 49%;
          float: left;
          list-style: none;
        }
        textarea {
          width: 100%;
          background: #39414a;
          color: #ffffff;
          font-size: 11px;
          letter-spacing: 2px;
          line-height: 20px;
          font-family: 'NexaBold', Helvetica, Arial, sans-serif;
          margin: 0px;
          &:focus {
            box-shadow: none;
            outline: 0;
            border: 1px solid #ced4da;
          }
        }
        .form-submit-btn {
          padding: 8px 12px 5px 12px;
          font-family: 'Nexabold', Helvetica, Arial, sans-serif;
          margin-top: 15px;
        }
      }
    }
  }
}
.vsd-btn {
  color: #212529;
  display: inline-block;
  &:hover {
    text-decoration: none;
  }
}
</style>
