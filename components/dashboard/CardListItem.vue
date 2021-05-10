<template>
  <li class="my-card" v-if="itemdata">
    <h4 class="my-card-title" :title="itemdata.title">
      {{ itemdata.title != '' ? trimTitle(itemdata.title) : '' }}
    </h4>
    <!-- <button class="theme-btn my-card-current-bid-btn" :class="[(valueDifference>0) ? 'green' : (valueDifference<0) ? 'red' : '']">
      current Bid: <span>${{ itemdata.price }}</span>
    </button> -->
    <button class="theme-btn sxvalue">
      <span class="sxvalue-text">
        SX $:{{ itemdata.sx_value != null ? itemdata.sx_value : 0 }}</span
      >
      <span
        :class="(itemdata.sx_icon == 'up' ? 'high' : 'low') + ' float-right'"
        ><font-awesome-icon
          v-if="itemdata.sx_icon !== undefined"
          :icon="['fas', 'long-arrow-alt-' + itemdata.sx_icon]"
        />
        ${{ itemdata.price_diff != null ? itemdata.price_diff : 0 }}</span
      >
    </button>
    <button class="theme-btn timeLeft">Time left: {{ timeLeft.value }}</button>
    <div class="image-container">
      <div class="icons-container">
        <!-- <button class="buynow-btn beta-ver-hide" v-if="itemdata.showBuyNow" @click="buyNow(itemdata.data)">
          Buy Now
        </button> 
        <a class="buynow-btn staging-ver-hide" v-if="itemdata.showBuyNow" :href="viewItemURL" target="_blank">
          Buy Now
        </a> -->

        <!-- <img
          v-if="!isInWatchList(itemdata.id)"
          @click="addToWatchList()"
          class="icons"
          src="~/assets/img/icons/1heart-green.png"
        />
        <img
          v-if="isInWatchList(itemdata.id)"
          @click="removeToWatchList()"
          class="icons heart-fill-icon"
          src="~/assets/img/icons/heart-green.png"
        /> -->
      </div>
      <img
        class="card-image"
        :title="itemdata.title"
        :src="itemdata.galleryURL"
        :alt="itemdata.id"
      />
    </div>
    <nuxt-link
      :class="'my-card-view-listing ' + timeEndClass"
      :to="'/product?id=' + itemdata.id + '&slag=' + itemdata.title"
      v-if="user != null && user.full_name != null"
    >
      {{ viewListingText }}
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
    </nuxt-link>

    <span
      :class="'my-card-view-listing '"
      v-if="user == null || user.full_name == null"
      v-b-modal.loginTopPopup
    >
      {{ viewListingText }}
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
    </span>

    <div
      class="my-card-view-listing-on-ebay"
      v-if="user != null && user.full_name != null"
    >
      <a
        class="my-card-view-listing-on-ebay-link"
        :href="viewItemURL"
        target="_blank"
        >View Listing on Ebay</a
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ['itemdata'],
  mounted() {
    this.getTimeLeft()
    this.calculateValueDifference()

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
    this.viewItemURL =
      'https://www.ebay.com/itm/' +
      this.itemdata.itemId +
      '?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5338548209&toolid=10001'

    // if (window.mobileAndTabletCheck()) {
    //   this.viewItemURL = itemUrl
    // } else {
    //   this.viewItemURL = itemUrl
    // }

    if (this.itemdata.showBuyNow) {
      this.viewListingText = 'Buy Now'
    }
  },
  data() {
    return {
      timeLeft: {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        value: 'N/A',
        datetime: null,
        intervalObject: null,
      },
      viewItemURL: '',
      timeEndClass: '',
      viewListingText: 'View Listing',
      valueDifference: 0,
    }
  },
  methods: {
    trimTitle(title) {
      if (title.length > 53) {
        title = title.substring(0, 53)
        title += '...'
        return title
      }
      return title
    },
    addToWatchList() {
      try {
        this.$axios
          .$post('watchlist/add', {
            id: this.itemdata.id,
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
            id: this.itemdata.id,
          })
          .then((res) => {
            this.$store.dispatch('watchlist/fetchIds')
            this.$emit('onRemoveFromWatchList')
          })
      } catch (err) {
        console.log(err)
      }
    },
    getTimeLeft() {
      // && this.itemdata.data.listing_info.listingType == 'Auction'
      if (this.itemdata.listing_ending_at != null) {
        this.timeLeft.intervalObject = setInterval(() => {
          var date1 = this.$(this.itemdata.listing_ending_at)
          var a = date1.format('YYYY-MM-DD HH:mm:ss')
          var date2 = this.$moment()
          var b = date2.format('YYYY-MM-DD HH:mm:ss')
          var x = this.$moment(a)
          var y = this.$moment(b)
          var final = x.diff(y)

          if (final > 0) {
            const d = this.$moment(final).format('D') - 1
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

            // this.viewListingText = 'View Listing'
          }
          // else {
          //   this.timeLeft.value = '00:00'
          //   clearInterval(this.timeLeft.intervalObject)
          //   this.timeEndClass= 'time-end-grey';
          //   this.viewListingText= 'Sold Listing';
          // }
        }, 1000)
      } else {
        this.timeLeft.value = 'N/A'
        // this.viewListingText = 'View Listing'
      }
    },
    calculateValueDifference() {
      if (this.itemdata.data.card != null) {
        if (this.itemdata.data.card.value) {
          if (this.itemdata.data.selling_status != null) {
            var selling_status_price = this.itemdata.data.selling_status.price
          }
          this.valueDifference =
            parseFloat(selling_status_price) -
            parseFloat(this.itemdata.data.card.value.value)
        } else {
          this.valueDifference = 0
        }
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
.wishlist-card {
  .my-card-current-bid-btn {
    display: none !important;
  }
}
.my-card {
  display: inline-block;
  width: 200px;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  &:hover {
    .my-card-title {
      color: #1ce783;
    }
  }
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: $theme-off-white;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 38px;
    overflow: hidden;
  }
  .timeLeft.theme-btn {
    width: 100%;
    margin-bottom: 5px;
    letter-spacing: 1.4px;
    padding: 7px 5px 5px 5px;
    background: #272d33;
    color: #fff;
    text-align: left;
  }
  .sxvalue.theme-btn {
    width: 100%;
    margin-bottom: 5px;
    letter-spacing: 1.4px;
    font-size: 10px;
    padding: 7px 5px 5px 5px;
    background: #272d33;
    color: #fff;
    text-align: left;
  }
  .sxvalue {
    span.high {
      color: $theme-btn-green;
    }
    span.low {
      color: red;
    }
  }
  .my-card-current-bid-btn {
    width: 100%;
    padding-top: 7px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    text-align: left;
    padding-left: 5px;
    letter-spacing: 1.4px;
    &.green {
      span {
        color: $theme-btn-green;
      }
    }
    &.red {
      span {
        color: $theme-btn-red;
      }
    }
  }
  .image-container {
    position: relative;
    padding: 5px;
    margin-bottom: 7px;
    text-align: center;
    background: #272d33;
    // border-radius: 2px;
    // height: 238px;
    height: 16vw;
    //   @media (max-width: 767px) {
    // height: 340px;
    //    }
    .icons-container {
      position: absolute;
      padding: 10px;
      right: 0;
      top: 9px;
      z-index: 1;
      width: 100%;
      .icons {
        width: 32px;
        height: 32px;
        float: right;
        margin-top: -10px;
      }
      .heart-fill-icon {
        height: auto;
        width: 30px;
      }
      .buynow-btn {
        background: transparent;
        border: 1px solid $theme-btn-green;
        color: #fff;
        text-transform: uppercase;
        float: left;
        margin-top: -10px;
        font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
        font-weight: 400;
        border-radius: 2px;
        padding: 3px 5px 0px 5px;
        color: #000;
        font-size: 10px;
        background: $theme-btn-green;
        &:hover {
          text-decoration: none;
        }
      }
    }
    .card-image {
      //width: 100%;
      //height: 264px;
      margin-top: 0px;
      width: auto;
      max-width: 100%;
      position: absolute;
      height: auto;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
      // max-height: 238px;
      max-height: 16vw;
      min-width: auto;
      //    @media (max-width: 767px) {
      // max-height: 340px;
      //    }
    }
  }
  .my-card-view-listing {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    width: 100%;
    border-radius: 2px;
    background: -webkit-linear-gradient(
      right,
      $theme-dark-green 0%,
      $theme-mild-green 33%,
      $theme-light-green 100%
    );
    background: linear-gradient(
      to left,
      $theme-dark-green 0%,
      $theme-mild-green 33%,
      $theme-light-green 100%
    );
    padding: 6px 5px 5px 5px;
    color: #000;
    font-size: 12px;
    display: block;
    text-align: center;
    &:hover {
      text-decoration: none;
      background: #25b563;
    }
  }
  .my-card-view-listing-on-ebay {
    width: 100%;
    text-align: center;
    a.my-card-view-listing-on-ebay-link {
      color: $theme-off-white;
      font-size: 8px;
      letter-spacing: 1px;

      line-height: 2;
      padding-top: 2px;
      font-style: italic;
    }
  }
}
.my-card-view-listing.time-end-grey {
  background: #272d33;
  color: #fff;
  &:hover {
    background: #272d33;
    color: #fff;
  }
}
</style>
