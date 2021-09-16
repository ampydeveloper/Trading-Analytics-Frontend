<template>
  <div class="col-md-12 col-sm-12 stoxticker-page-exactout">
    <div class="row analytics_page">
      <div class="col-md-12 pr-0 inner_wrap">        
        <div class="col-md-12 col-sm-12 pl-0 stoxticker_listing-outer">
          <div class="card stoxticker_page stoxticker_listing">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn" >SX STOXTICKER</button>
                <span class="tooltip-text d-inline" v-b-tooltip.bottomleft  title="Similar to the New York Stock Exchange, our StoxTicker allows you tosee a running list of cards from all sports, including their respective values. If the card is in green, it’s trending up since the most recent sale. If it is in red, it’s trending down.">?</span>
                <span class="float-right share-lk-top sb-data-values-out">
                <span class="share-icon si-white">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
                </span>
                <div class="share-all-outer" style="top: 19px;">
                  <ul>
                    <li style="margin: 0;">
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u='+encodeURI(sxStoxtickerUrl)"  target="_blank"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(sxStoxtickerUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.sale?stoxtickerData.sale:'')
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(sxStoxtickerUrl) +
                          '&description=' +
                          encodeURI('Buy & Sell Sports Cards Online')
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'https://www.linkedin.com/shareArticle?mini=true&url=' +
                          encodeURI(sxStoxtickerUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
              </span>
              </h5>
              <ul>
              <li v-for="sport in attributes.sport" :key="sport">
                <h3 class="h3-title">{{sport}}</h3>

                <marquee-text
                  :duration="30"
                  :paused="paused"
                  :key="'soldListing' + sport + 'MarqueeKey'"
                  :v-if="soldListing[sport] != 0"
                >
                  <div
                    
                    @mouseenter="paused = !paused"
                    @mouseleave="paused = false"
                    v-for="(value,key) in soldListing"
                    :key="key"                    
                  >
                  <div v-if="key == sport">
                    <template v-for="list in value">
                      <h4>
                        <nuxt-link
                          class="sx-stox-card-link"
                          :to="'/card-data/?id=' + list.card.id"
                          :class="
                            list.slab_sold_flag == true
                              ? 'listing-rise'
                              : 'listing-fall'
                          "
                          >{{ list.card.title }} - ${{ list.sold_price }}
                        </nuxt-link>
                        &nbsp;&nbsp;
                      </h4>
                    </template>
                  </div>
                  </div>
                </marquee-text>

                <marquee-text
                  :duration="30"
                  :paused="paused"
                  :repeat="1"
                  v-if="soldListing.basketball == 0"
                >
                  <div
                    @mouseenter="paused = !paused"
                    @mouseleave="paused = false"
                  >
                    <h4 style="padding: 0 50px">No recently sold listings.</h4>
                  </div>
                </marquee-text>
              </li>
            </ul>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../constants/keys'
import MarqueeText from 'vue-marquee-text-component'
import { mapGetters } from 'vuex'
import { FILTERS } from '../constants/advance_search_filter'

export default {
  transition: 'fade',
  layout: 'default',
  auth: 'guest',
  head() {
    return {
      title: 'Stoxticker - SlabStox',
      
    }
  },
  mounted() {
    var currentHref = location.href
    this.sxStoxtickerUrl = currentHref.replace('stoxticker', 'stox-sells')

    this.getSoldListing()
  },
  components: {
    MarqueeText,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      paused: false,
      baseUrl: BASE_URL,
      stoxtickerData: [],
      currentUrl: location.origin + '/main-stoxticker',
      soldListing: '',
      sxStoxtickerUrl: '',
      data: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: '',
      },
     filters: { ...FILTERS },
      
    }
  },
  computed:{
    ...mapGetters({
      attributes: 'advancesearch/attributes'
    })
  },
  methods: {

    getSoldListing() {
      try {
        this.$axios.$get('stoxticker/sold-listings').then((res) => {
          if (res.status == 200) {
            this.soldListing = res.data
            //below keys added so the marque plugin can update the content when data comes
            this.soldListingbasketballMarqueeKey = 1
            this.soldListingfootballMarqueeKey = 2
            this.soldListingbaseballMarqueeKey = 3
            this.soldListingsoccerMarqueeKey = 4
            this.soldListingpokemonMarqueeKey = 5
            this.soldListinghockeyMarqueeKey = 6
          } else {
            this.$toast.error(
              'There has been an error fetching SX Stoxticker. Please refresh your page.',
              { timeOut: 10000 }
            )
          }
        })
      } catch (error) {
        this.$toast.error(
          'There has been an error fetching SX Stoxticker. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-main {
  padding: 0 10px !important;
}
.t-p-5 {
  padding: 5px;
}
ul.my-card-listing {
  list-style: none;
  padding: 0px;
}
.stat_box ul {
  padding: 0px;
  list-style-type: none;
  width: auto;
  margin-bottom: 0px;
}
.stat_box ul li {
  font-size: 12px;
  margin-bottom: 7px;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  font-style: normal;
}
</style>