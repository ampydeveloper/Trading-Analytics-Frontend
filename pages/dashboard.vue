<template>
  <div class="col-md-12 col-sm-12 dashboard_page">
    <div class="row">
      <div class="col-md-12 col-sm-12 t-p-5 dash-featured">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">SX Featured Slabs</button>
              <nuxt-link class="card-link float-right" to="/live-auctions">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <div class="dataloader" v-if="requestInProcessFeatured">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing featured-listing">
              <CardSlabItem
                v-for="item in featuredListingItems"
                :key="item.id"
                :itemdata="item"
                :activeSt="(item.id==cardActiveId) ? !cardsActive : cardsActive"
                @toggleCardActive='toggleCardActive'
                @updateGraph='updateGraph'
              />
            </ul>

            <div
              class="empty-result"
              v-if="
                featuredListingItems.length == 0 && !requestInProcessFeatured
              "
            >
              <p>There are no cards here. Check again soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row featured-graph">
      <div class="col-md-12 col-sm-12 t-p-5">
        <div class="card">
          <div
            class="card-body dashboard-graph sx-stats-all"
            id="dashboard-graph-outer"
            ref="shareImage"
          >
          <h4 class="featured-graph-title">{{cardActiveTitle}}

<nuxt-link class="card-link float-right" to="/stoxticker">
                Get the Ticker
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
              
<button class="theme-btn card-btn btn-sxvalue float-right">
                Slabstox ${{ stoxtickerData.total }}
              </button>
          </h4>
            <h5 class="card-title">
              
              <!-- <button class="theme-btn card-btn theme-green-btn">
                SX Stoxticker ${{ stoxtickerData.sale.toFixed(2) }}
              </button> -->

              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;&nbsp;${{ stoxtickerData.change }}
              </button>
              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;&nbsp;{{ stoxtickerData.change }}%
              </button>
              <nuxt-link class="card-link" to="/stoxticker">
                Export Data
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>

              

              <!-- <span class="float-right share-lk-top">
                <span class="share-icon">
                  <img src="~/assets/img/share-icon.png" alt />
                </span>
                <div class="share-all-outer">
                  <ul>
                    <li>
                      <a href="javascript:;" @click="shareFb()"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(baseUrl) +
                          '&text=StoxTicker@' +
                          stoxtickerData.sale.toFixed(2)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(this.baseUrl) +
                          '&media=' +
                          encodeURI(this.graphImage) +
                          '&description=' +
                          encodeURI('Buy & Sell Sports Cards Online')
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://www.linkedin.com/shareArticle?mini=true&url=' +
                          encodeURI(baseUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
                <span class="share-icon" @click='chart2Img()'>
                  <img src="~/assets/img/share-icon.png" alt />
                </span> 
              </span> -->

              
            </h5>
            <div class="dashboard-apex-top" ref="dashboardApexChart">
              <VueApexCharts
                ref="dashChart"
                type="area"
                height="350"
                :options="chartOptions"
                :series="series"
              ></VueApexCharts>
            </div>
            <div class="dashboard-graph-footer">
              <ul class="dashboard-graph-footer-month-filter">
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 2 ? 'active' : '')
                  "
                  @click="updateGraph(2)"
                >
                  1D
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 7 ? 'active' : '')
                  "
                  @click="updateGraph(7)"
                >
                  1W
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 30 ? 'active' : '')
                  "
                  @click="updateGraph(30)"
                >
                  1M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 90 ? 'active' : '')
                  "
                  @click="updateGraph(90)"
                >
                  3M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 180 ? 'active' : '')
                  "
                  @click="updateGraph(180)"
                >
                  6M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 365 ? 'active' : '')
                  "
                  @click="updateGraph(365)"
                >
                  1Y
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 1825 ? 'active' : '')
                  "
                  @click="updateGraph(1825)"
                >
                  5Y
                </li>
              </ul>
              <p class="dashboard-graph-footer-update-at float-right">
                Last Updated - {{ stoxtickerData.last_updated }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-sm-4 t-p-5 dash-live-auction">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Top Live Auctions</button>
              <nuxt-link class="card-link float-right" to="/live-auctions">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="liveAuction.length == 0">
              <span>There are no cards here.</span>
            </p>
            <span class="card-text-link dash-list"
              v-for="item in liveAuction"
              :key="item.id"
              >
              <span class="card-text-s">
               {{ trimString(item.title) }}
</span>
              <nuxt-link
              class=""
              :to="'/product?id=' + item.id + '&slag=' + item.title"
              :title="item.title"
              >
              ${{ trimString(item.price) }}
              </nuxt-link
            >
            </span>
          </div>
        </div>
      </div>
     
      <div class="col-md-4 col-sm-4 t-p-5 dash-watchlist">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Watchlist</button>
              <nuxt-link class="card-link float-right" to="/watch-list">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="watchlist.length == 0">
              <span>There are no cards here.</span>
            </p>
            <span class="card-text-link dash-list"
              v-for="item in watchlist"
              :key="item.id"
              >
              <span class="card-text-s">{{ trimString(item.title) }} </span>

              <nuxt-link
              class=""
              :to="'/product?id=' + item.id + '&slag=' + item.title"
              :title="item.title"
              >${{ trimString(item.price) }
              </nuxt-link
            >
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-sm-4 t-p-5 dash-trenders">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Portfolio</button>
              <nuxt-link class="card-link float-right" to="/trenders">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="ternder.length == 0">
              <span>There are no cards here.</span>
            </p>
            <span class="card-text-link dash-list"
              v-for="item in ternder"
              :key="item.id"
              >
              <span class="card-text-s">{{ trimString(item.title) }} </span>
              
              <nuxt-link
              class=""
              :to="'/product?id=' + item.id + '&slag=' + item.title"
              :title="item.title"
              >
              ${{ trimString(item.price) }}
              </nuxt-link
            >
            </span>
          </div>
        </div>
      </div>

    </div>
    <MyListing />
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import CardListItem from '~/components/dashboard/CardListItem'
import MyListing from '~/components/dashboard/MyListing'
import { BASE_URL } from '../constants/keys'

export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Dashboard - Slabstox',
    }
  },
  mounted() {
    this.getFeaturedListing()
    this.getLiveAuction()
    this.getTernder()
    this.getWatchlist()
    this.getStoxtickerData()
    this.logo = document.getElementById('sidebarLogo').src
    // this.print()
  },
  components: {
    CardListItem,
    CardSlabItem,
    MyListing,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      cardsActive: false,
      cardActiveId: 0,
      cardActiveTitle: '',
      featuredListingItems: [],
      requestInProcessFeatured: false,
      logo: null,
      baseUrl: BASE_URL,
      graphImage: '',
      liveAuction: [],
      ternder: [],
      watchlist: [],
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphDataEmpty: false,
     
      stoxtickerData: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: '',
      },
      series: [
        {
          name: 'Stoxticker',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: true,
          },
          height: 350,
          type: 'area',
          background: '#39414a',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
            formatter: (value) => { return '$'+value },
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            }
          },
          type: 'category',
          categories: [],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy',
          },
        },
      },
    }
  },
  methods: {
    toggleCardActive(card){
      this.cardActiveId = card.id
      this.cardActiveTitle = card.title
      this.cardsActive = false
    },
    trimString(title) {
      if (title.length > 53) {
        title = title.substring(0, 50)
        title += '...'
        return title
      }
      return title
    },
    getFeaturedListing() {
      try {
        this.featuredListingItems = []
        this.requestInProcessFeatured = true
        this.$axios
          .$post('search/slab-listing', {
            take: 5,
            is_featured: 1,
          })
          .then((res) => {
            this.requestInProcessFeatured = false
            if (res.status == 200) {
              this.featuredListingItems = res.data
              if(this.featuredListingItems.length > 0){
                this.toggleCardActive(this.featuredListingItems[0])
                this.updateGraph()
              }
            }
          })
      } catch (err) {
        this.requestInProcessFeatured = false
        console.log(err)
      }
    },
    getLiveAuction() {
      try {
        this.$axios
          .$post('search/ending-soon-listing', {
            take: 6,
          })
          .then((res) => {
            if (res.status == 200) {
              this.liveAuction = res.data
            }
          })
      } catch (err) {
        console.log(err)
      }
    },
    getTernder() {
      try {
        this.$axios
          .$post('search/slab-listing', {
            take: 6,
          })
          .then((res) => {
            if (res.status == 200) {
              this.ternder = res.data
            }
          })
      } catch (err) {
        console.log(err)
      }
    },
    getWatchlist() {
      try {
        this.$axios
          .$post('watchlist/search', {
            take: 6,
          })
          .then((res) => {
            if (res.status == 200) {
              this.watchlist = res.data
            }
          })
      } catch (err) {
        console.log(err)
      }
    },
    getStoxtickerData() {
      try {
        this.$axios.$get('get-stoxticker-data').then((res) => {
          if (res.status == 200) {
            this.stoxtickerData = res.data
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    updateGraph(days=2) {
      try {
        this.graphDataEmpty = false
        this.$axios.$get(`get-dashboard-graph/${days}/${this.cardActiveId}`).then((res) => {
          if (res.status == 200) {
            this.activeDaysGraph = days
            if (this.initGraphLabelLength != res.data.labels.length) {
              this.graphDataEmpty = false
              this.series = [{ name: 'Stoxticker', data: res.data.values }]
              this.chartOptions = { xaxis: { categories: res.data.labels } }
              this.initGraphLabelLength = res.data.labels.length
              setTimeout(() => {
                this.generateImageOfGraph()
              }, 1000)
            } else {
              this.graphDataEmpty = true
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    shareFb() {
      FB.ui({
        method: 'feed',
        name: 'StoxTicker@' + this.stoxtickerData.sale.toFixed(2),
        link: encodeURI(this.graphImage), //this.baseUrl
        picture: this.graphImage,
        description: 'Check our StoxTicker value',
      })
    },

    generateImageOfGraph() {
      const chartInstance = this.$refs.dashChart.chart.dataURI()
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.$axios
          .$post('generate-image', { image: img.src, prefix: 'sd' })
          .then((res) => {
            if (res.status == 200) {
              this.graphImage = res.url
              console.log(res.url)
            }
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-graph {
  .share-lk-top {
    position: relative;
    &:hover {
      .share-all-outer {
        display: block;
      }
    }
    svg {
      cursor: pointer;
      margin-right: 10px;
      color: #1ce783;
    }
  }
}
.t-p-5 {
  padding: 5px;
}
ul.my-card-listing {
  list-style: none;
  padding: 0px;
}
ul.featured-listing {
  .my-card {
    width: 20% !important;
  }
}

.card-link {
  line-height: 2;
  margin-top: 2px;
}
.card-text-link {
  display: block;
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  color: $theme-off-white;
  text-decoration: underline;
  text-transform: uppercase;
  font-size: 10px;
  text-align: left;
  line-height: 2;
  letter-spacing: 1px;
  a{
        color: #1ce783;
        float: right;
        width: 20%;
          &:hover {
    color: #1ce783;
  }
  }
.card-text-s{
          width: 80%;
    display: inline-block;
    text-decoration: underline;
}

}
.dash-watchlist,
.dash-trenders,
.dash-live-auction {
  padding-bottom: 10px;
  .card {
    height: 100%;
  }
  .dash-no-cards {
    text-decoration: none !important;
  }
}
.share-lk-top {
  cursor: pointer;
  span {
    margin-right: 5px;
    img {
      width: 20px;
      margin-top: -5px;
    }
  }
}
.featured-listing {
  li.my-card {
    padding-left: 40px !important;
    padding-right: 40px !important;
    width: 20% !important;
    margin: 0;
        padding-top: 25px;
            padding-bottom: 25px;
            position: relative;
  }
  li.my-card.active{
    background: #39414a;
  }
  li.my-card.active + li{
    //background: red;
      .bor-left {
           display:none;
         //  background: blue;
      }
      .my-card-title{
      //  background: blue;
      }
  }
   li.my-card:first-child{
     // background: yellow;
   }
  li.my-card:first-child .bor-left {
    display:none;
    //background: blue;
  }
}
.featured-graph-title{
font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: #edecec;
    font-size: 11px;
    letter-spacing: 1px;
        margin-bottom: 13px;
}
.dash-featured {
  padding-bottom: 0;
  .card-title{
    margin-bottom: 10px !important;
  }
  .card {
    border-bottom: 0;
  }
  .card-body {
    background: #2d343b;
    padding-bottom: 0;
  }
}
.featured-graph {
  .t-p-5 {
    padding-top: 0;
    .card {
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  .card-btn{
        margin-right: 8px
  }
}
.dash-list{

}
</style>
