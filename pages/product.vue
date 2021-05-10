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

              <label v-if="data.card && data.card.rc == 'yes'" class="grey">Rookie</label>
              <label v-if="data.card && data.card.brand != null" class="green">{{
                data.card.brand
              }}</label>
              <label v-if="data.card && data.card.grade != null" class="yellow">{{
                data.card.grade
              }}</label>
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
                      v-if="valueDifference > 0"
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
                  <button class="theme-red-btn card-btn" v-if="sx_icon == null">
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
                      }}% Positive Feedback</a
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
                          {{ value.value }}
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
                v-if="
                  data.listing_info != null &&
                  data.listing_info.listingType == 'Auction'
                "
                :href="viewItemURL"
                >Place Bid</a
              >
              <a
                class="slab-specs-btn theme-buy-now-btn"
                target="_blank"
                :href="viewItemURL"
                v-if="
                  data.listing_info != null &&
                  data.listing_info.listingType != 'Auction'
                "
                >Buy Now</a
              >
              <a
                class="slab-specs-btn theme-btn"
                v-if="
                  data.listing_info != null &&
                  data.listing_info.listingType == 'Auction'
                "
                target="_blank"
                :href="viewItemURL"
                >Make Offer</a
              >
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
      viewItemURL: '',
      valueDifference: 0,
      seeProblemMessage: null,
      sx: null,
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
        if (res.status == 200) {
          this.seeProblemMessage = null
          this.$bvModal.hide('openSeeProblemPopup')
          this.loaded = true
          this.$toast.success('Listed has been flaged successfully.')
        }
      } catch (err) {
        console.log(err)
      }
    },
    calculateValueDifference() {
      if (this.data.card != null && this.data.card.value != null) {
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
      if (this.sx_icon > 0) {
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
        if (res.status == 200) {
          this.data = res.data.items
          this.sx = res.data.sx
          this.sx_value = res.data.sx_value
          this.sx_icon = res.data.sx_icon

          // window.mobileAndTabletCheck = function () {
          //   let check = false
          //   ;(function (a) {
          //     if (
          //       /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          //         a
          //       ) ||
          //       /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          //         a.substr(0, 4)
          //       )
          //     )
          //       check = true
          //   })(navigator.userAgent || navigator.vendor || window.opera)
          //   return check
          // }
          let itemUrl =
            'https://www.ebay.com/itm/' +
            res.data.items.itemId +
            '?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5338548209&toolid=10001'
          this.viewItemURL = itemUrl
          // if (window.mobileAndTabletCheck()) {
          //   this.viewItemURL = itemUrl
          // } else {
          //   this.viewItemURL = itemUrl
          // }
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


<style lang="scss" scoped>
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
      // vertical-align: middle;
      border: 6px solid #fff;
      // display: table-cell;
      // width: 359px;
      // height: 505px;
      width: 100%;
      height: calc(100% - 112px);
      display: block;

      img {
        width: auto;
        display: block;
        margin: 0 auto;
        max-width: 100%;
        // vertical-align: middle;
        transform: translate(0, -50%);
        top: 50%;
        position: relative;
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
        padding-right: 10px;
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
      width: calc(33% - 3px);
      float: left;
      margin: 0 2px;
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
  // .slab-specs-btn {
  //   width: 32.4%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       width: 375px;
  //     }
  //   }
  // }
}
@media (min-width: 768px) {
  // .slab-specs-btn {
  //   width: 32.4%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 553px;
  //       width: 521px;
  //     }
  //   }
  // }
}
@media (min-width: 1024px) {
  // .slab-specs-btn {
  //   width: 32.4%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 593px;
  //     }
  //   }
  // }
}
@media (min-width: 1366px) {
  // .slab-specs-btn {
  //   width: 32.4%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 538px;
  //       img {
  //         max-height: 401px;
  //       }
  //     }
  //   }
  // }
}
@media (min-width: 1440px) {
  // .slab-specs-btn {
  //   width: 32.4%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 514px;
  //     }
  //   }
  // }
}
@media (min-width: 1600px) {
  // .slab-specs-btn {
  //   width: 32.6%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 514px;
  //     }
  //   }
  // }
}
@media (min-width: 1856px) {
  // .slab-specs-btn {
  //   width: 32.6%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 514px;
  //       img {
  //         max-height: 415px;
  //       }
  //     }
  //   }
  // }
}
@media (min-width: 1921px) {
  // .slab-specs-btn {
  //   width: 32.8%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       height: 514px;
  //     }
  //   }
  // }
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
  // .slab-specs-btn {
  //   width: 32.8%;
  // }
  // .product-details {
  //   .product-image-card {
  //     .image-conatiner {
  //       img {
  //         max-height: 415px;
  //       }
  //     }
  //   }
  // }
}

@media (max-width: 991px) {
 .product-details .t-p-5 {
    padding-right: 15px !important;
    padding-left: 15px !important;
    padding-bottom: 5px !important;
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
