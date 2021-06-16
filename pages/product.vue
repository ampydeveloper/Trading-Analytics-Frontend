<template>
  <div class="col-md-12 col-sm-12 product-details" v-if="loaded">
    <div class="row">
      <div class="col-md-4 col-sm-4 t-p-5 product-details-col-md-4">
        <div class="card" style="height: 100%">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">{{ data.title }}</h5>
            <div class="labels">
              <!-- <label
                class="topps"
                v-if="data.card != null && data.card.brand != ''"
                >{{data.card.brand}}</label
              >
              <label
                class="chrome"
                v-if="data.card != null && data.card.variation != ''"
                >{{data.card.variation}}</label
              >
              <label
                class="top-pick"
                v-if="data.card != null && data.card.rc == 'yes'"
                >Rookie</label
              >
              <label class="trender" v-if="false">Trender</label> -->

              <label v-if="data.card && data.card.rc == 'yes'" class="grey"
                >Rookie</label
              >
              <label
                v-if="data.card && data.card.brand != null"
                class="green"
                >{{ data.card.brand }}</label
              >
              <label
                v-if="data.card && data.card.grade != null"
                class="yellow"
                >{{ data.card.grade }}</label
              >
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
              <a :href="viewItemURL" target="_blank">
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
                  <button class="theme-btn card-btn" v-if="sx != null">
                    SX Value ${{ sx != null ? sx : '0' }}
                  </button>
                  <button
                    class="theme-green-btn card-btn"
                    v-if="sx_icon == 'up'"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-up']"
                    />&nbsp;&nbsp;{{ sx_value }}
                  </button>
                  <button
                    class="theme-red-btn card-btn"
                    v-if="sx_icon == 'down'"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-down']"
                    />&nbsp;&nbsp;{{ sx_value }}
                  </button>
                  <button class="theme-btn card-btn" v-if="sx_icon == null">
                    {{ sx_value }}
                  </button>
                  <nuxt-link
                    v-if="data.card_id != null"
                    class="theme-btn card-btn vsd-btn"
                    :to="'/card-data/?id=' + data.card_id"
                  >
                    View Slab Data
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link>
                </h5>
                <div class="listing-info-container">
                  <ul>
                    <li
                      v-if="
                        data.listing_info != null &&
                        data.listing_info.listingType != 'Auction'
                      "
                    >
                      Buy it Now:
                      {{ sellingPrice }}
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
            <div class="card" style="height: 100%">
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
                      }}
                      Positive Feedback</a
                    >
                  </p>
                  <p>
                    <a
                      :href="
                        data.seller_info
                          ? data.seller_info.seller_contact_link
                          : ''
                      "
                      target="_blank"
                      >Contact Seller</a
                    >
                  </p>
                  <p>
                    <a
                      v-if="
                        data.seller_info && data.seller_info.seller_store_link
                      "
                      :href="
                        data.seller_info
                          ? data.seller_info.seller_store_link
                          : ''
                      "
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
                    <template v-for="(value, key) of data.specifications">
                      <li class="slab-specs-li" v-if="key < 14">
                        <p>
                          {{ value.name }}
                          {{ value.name.indexOf(':') !== -1 ? '' : ':' }}
                          {{ trimWords(value.value) }}
                        </p>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
            <div class="slab-specs-btn-group">
              <a
                class="slab-specs-btn theme-green-btn"
                target="_blank"
                :href="viewItemURL"
                >VIEW LISTING ON EBAY</a
              >
              <!-- <a
                class="slab-specs-btn theme-buy-now-btn"
                target="_blank"
                :href="viewItemURL"
                v-if="
                  data.listing_info != null &&
                  data.listing_info.listingType != 'Auction'
                "
                >VIEW LISTING ON EBAY</a
              > -->
              <!-- <a
                class="slab-specs-btn theme-btn"
                v-if="
                  data.listing_info != null &&
                  data.listing_info.listingType == 'Auction'
                "
                target="_blank"
                :href="viewItemURL"
                >Make Offer</a
              > -->
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
        <template v-for="(value, key) of data.specifications">
          <li>
            <p>
              {{ value.name }}
              {{ value.value }}
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
  layout: 'guestOuter',
  head() {
    return {
      title: 'Product Details - SlabStox',
    }
  },
  async mounted() {
    if (this.$route.query.hasOwnProperty('id')) {
      this.id = this.$route.query.id
      if (this.id != null && this.id != '') {
        this.getData()
      } else {
        this.$toast.error(
          'There has been an error fetching listing details. Redirecting to dashboard.',
          { timeOut: 1000 }
        )
        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 3000)
      }
    } else {
      this.$toast.error(
        'There has been an error fetching listing details. Redirecting to dashboard.',
        { timeOut: 1000 }
      )
      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 3000)
    }
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
      viewItemURL: '',
      valueDifference: 0,
      seeProblemMessage: null,
      sx: null,
      sellingPrice: 0,
      timeLeft: {
        value: null,
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        datetime: null,
        intervalObject: null,
      },
      timeLeftFromBack: null,
    }
  },
  methods: {
    async submitSeeProblem() {
      try {
        const res = await this.$axios.$post('add-see-problem', {
          id: this.id,
          message: this.seeProblemMessage,
        })
        if (res.status == 200) {
          this.seeProblemMessage = null
          this.$bvModal.hide('openSeeProblemPopup')
          this.loaded = true
          this.$toast.success('Listed has been flaged successfully.')
        }
      } catch (err) {
        // console.log(err)
        this.$toast.error('There has been an error. Please try again.')
      }
    },
    // calculateValueDifference() {
    //   if (this.data.card != null && this.data.card.value != null) {
    //     var sellingStatusPrice = this.data.selling_status
    //       ? this.data.selling_status.price
    //       : ''
    //     this.valueDifference =
    //       parseFloat(sellingStatusPrice) -
    //       parseFloat(this.data.card.value.value)
    //   } else {
    //     this.valueDifference = 0
    //   }
    // },
    // getValueDifference() {
    //   if (this.sx_icon > 0) {
    //     return this.valueDifference.toFixed(2)
    //   } else {
    //     let a = this.valueDifference * 2
    //     return (this.valueDifference - a).toFixed(2)
    //   }
    // },
    async getData() {
      try {
        const res = await this.$axios.$post('get-item-details', {
          id: this.id,
        })
        if (res.status == 200) {
          this.data = res.data.items
          this.sx = res.data.sx
          this.sx_value = res.data.sx_value
          this.sx_icon = res.data.sx_icon
          this.timeLeftFromBack = res.data.timeleft

          let itemUrl =
            'https://www.ebay.com/itm/' +
            res.data.items.itemId +
            '?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5338548209&toolid=10001'
          this.viewItemURL = itemUrl

          // this.calculateValueDifference()
          this.getTimeLeft()
          this.loaded = true
        } else {
          // this.$router.push('/dashboard')
          this.$toast.error(
            'There has been an error fetching listing details. Please refresh your page.',
            { timeOut: 10000 }
          )
        }
      } catch (err) {
        // this.$router.push('/dashboard')
        this.$toast.error(
          'There has been an error fetching listing details. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    trimWords(str, max = 4) {
      const array = str.trim().split(' ')
      const ellipsis = array.length > max ? '...' : ''

      return array.slice(0, max).join(' ') + ellipsis
    },
    getTimeLeft() {
      this.timeLeft.days = this.data.time_days
      this.timeLeft.hours = this.data.time_hours
      this.timeLeft.mins = this.data.time_mins
      this.timeLeft.secs = this.data.time_secs

      if (
        this.timeLeft.days != 0 ||
        this.timeLeft.hours != 0 ||
        this.timeLeft.mins != 0 ||
        this.timeLeft.secs != 0
      ) {
        this.timeLeft.intervalObject = setInterval(() => {
          this.timeLeft.secs = this.timeLeft.secs - 1
          if (this.timeLeft.secs == 0) {
            this.timeLeft.mins = this.timeLeft.mins - 1
            this.timeLeft.secs = 60
          }
          if (this.timeLeft.mins == 0) {
            this.timeLeft.hours = this.timeLeft.hours - 1
            this.timeLeft.mins = 60
          }
          if (this.timeLeft.days > 0) {
            this.timeLeft.value =
              this.timeLeft.days +
              'd ' +
              this.timeLeft.hours +
              'h ' +
              this.timeLeft.mins +
              'm'
          } else if (this.timeLeft.hours > 1) {
            this.timeLeft.value =
              this.timeLeft.hours +
              'h ' +
              this.timeLeft.mins +
              'm ' +
              this.timeLeft.secs +
              's'
          } else if (this.timeLeft.mins > 1) {
            this.timeLeft.value =
              this.timeLeft.mins + 'm ' + this.timeLeft.secs + 's'
          } else {
            this.timeLeft.value = this.timeLeft.secs + 's'
          }
          if (
            this.timeLeft.days == 0 &&
            this.timeLeft.hours == 0 &&
            this.timeLeft.mins == 0 &&
            this.timeLeft.secs == 0
          ) {
            this.timeLeft.value = '00:00'
            clearInterval(this.timeLeft.intervalObject)
          }
        }, 1000)
      } else {
        this.timeLeft.value = '00:00'
      }

      // if (this.timeLeftFromBack && this.timeLeftFromBack != '0s') {
      //   this.timeLeft.value = this.timeLeftFromBack
      // } else {
      //   this.timeLeft.value = '00:00'
      // }
      //correcting price
      function isNumeric(str) {
        if (typeof str != 'string') return false // we only process strings!
        return (
          !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
          !isNaN(parseFloat(str))
        ) // ...and ensure strings of whitespace fail
      }

      var sellingPrice = this.data.selling_status
        ? this.data.selling_status.price
        : 0
      if (isNumeric(sellingPrice)) {
        this.sellingPrice = '$' + sellingPrice
      } else {
        this.sellingPrice = sellingPrice
      }
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
        // console.log(err)
        this.$toast.error('There has been an error. Please try again.')
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
        // console.log(err)
        this.$toast.error('There has been an error. Please try again.')
      }
    },
  },
  // destroyed() {
  //   if (this.timeLeft.intervalObject != null) {
  //     clearInterval(this.timeLeft.intervalObject)
  //   }
  // },
}
</script>


<style lang="scss" scoped>
.product-details {
  padding: 0 25px;
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
      // vertical-align: middle;
      border: 6px solid #fff;
      // display: table-cell;
      // width: 359px;
      // height: 505px;
      width: 100%;
      position: relative;
      // height: calc(100% - 112px);
      height: 83%;
      display: block;
      min-height: 350px;
      @media (max-width: 991px) {
        height: 76%;
      }
      img {
        width: auto;
        display: block;
        margin: 0 auto;
        max-width: 100%;
        // vertical-align: middle;
        transform: translate(-50%, -50%);
        top: 50%;
        position: absolute;
        left: 50%;
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
    overflow: hidden;
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
        padding-right: 10px;
        vertical-align: top;
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
    padding-left: 1px;
    .slab-specs-btn {
      border-radius: 0px;
      padding: 22px 5px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      display: inline-block;
      text-align: center;
      font-size: 14px !important;
      // width: calc(33% - 3px);
          width: 100%;
      // float: left;
      // margin: 0 2px;
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
@media (min-width: 1921px) {
  .product-details-col-md-4 {
    flex: 0 0 22.333333%;
    max-width: 22.333333%;
  }
  .product-details-col-md-8 {
    flex: 0 0 77.666667%;
    max-width: 77.666667%;
  }
}

@media (max-width: 767px) {
  .pr-0 {
    padding-right: 15px !important;
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
    color: #212529;
  }
}
@media (max-width: 767px) {
  #specsDetails .modal-dialog {
    .modal-content {
      .modal-body {
        ul li {
          width: calc(100% - 20px);
        }
      }
    }
  }
}
</style>
