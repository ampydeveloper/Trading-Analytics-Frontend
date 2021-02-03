<template>
  <li class="my-card" v-if="itemdata">
    <h4 class="my-card-title" :title="itemdata.title">
      {{ trimTitle(itemdata.title) }}
    </h4>
    <button class="theme-btn my-card-current-bid-btn" :class="[(valueDifference>0) ? 'green' : (valueDifference<0) ? 'red' : '']">
      current Bid: <span>${{ itemdata.price }}</span>
    </button>
    <button class="theme-btn timeLeft">Time left: {{ timeLeft.value }}</button>
    <div class="image-container">
      <div class="icons-container">
        <button class="buynow-btn beta-ver-hide" v-if="itemdata.showBuyNow" @click="buyNow(itemdata.data)">
          Buy Now
        </button> 
        <a class="buynow-btn staging-ver-hide" v-if="itemdata.showBuyNow" :href="itemdata.viewItemURL" target="_blank">
          Buy Now
        </a>
        
        <img
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
        />
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
    >
      View Listing
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
    </nuxt-link>
    <div class="my-card-view-listing-on-ebay">
      <a
        class="my-card-view-listing-on-ebay-link"
        :href="itemdata.viewItemURL"
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
  },
  data() {
    return {
      timeLeft: {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        value: null,
        datetime: null,
        intervalObject: null,
      },
      timeEndClass: '',
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
            id: this.itemdata.id
          })
          .then(res => {
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
            id: this.itemdata.id
          })
          .then(res => {
            this.$store.dispatch('watchlist/fetchIds')
            this.$emit('onRemoveFromWatchList')
          })
      } catch (err) {
        console.log(err)
      }
    },
    getTimeLeft() {
      this.timeLeft.intervalObject = setInterval(() => {
        var date1 = this.$moment(this.itemdata.listing_ending_at)
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
          if(d > 0){
            this.timeLeft.value = d+'d '+h+'h' 
          }else if(h > 1){
            this.timeLeft.value = h+'h '+m+'m' 
          }else if(m > 1){
            this.timeLeft.value = m+'m '+s+'s' 
          }else{
            this.timeLeft.value = s+'s' 
          }
        } else {
          this.timeLeft.value = '00:00'
          clearInterval(this.timeLeft.intervalObject)
          this.timeEndClass= 'time-end-grey';
        }
      }, 1000)
    },
    calculateValueDifference() {
      if(this.itemdata.data.card  != null){

      if(this.itemdata.data.card.value) {
        if(this.itemdata.data.selling_status  != null){
var selling_status_price = this.itemdata.data.selling_status.price;
        }
        this.valueDifference = (parseFloat(selling_status_price) - parseFloat(this.itemdata.data.card.value.value)) 
      }else{
        this.valueDifference = 0
      }
    }
    },
  },
  destroyed() {
    if (this.timeLeft.intervalObject != null) {
      clearInterval(this.timeLeft.intervalObject)
    }
  }
}
</script>

<style lang="scss" scoped>
.wishlist-card {
    .my-card-current-bid-btn { display: none !important; }
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
    height: 43px;
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
  .my-card-current-bid-btn {
    width: 100%;
    padding-top: 7px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    text-align: left;
    padding-left: 5px;
    letter-spacing: 1.4px;
    &.green{
      span{
        color: $theme-btn-green;
      }
    }
    &.red{
      span{
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
    height: 238px;
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
        &:hover{
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
      max-height: 238px;
      min-width: auto;
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
.my-card-view-listing.time-end-grey{
      background: #272d33;
    color: #fff;
    &:hover{
        background: #272d33;
    color: #fff;
    }
}
</style>
