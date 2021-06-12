<template>
  <div class="col-md-11 col-sm-11 dashboard_page">
      
      <div class="row">
        <div class="col-md-12 pl-1 mb-4 mt-2">
            <div class="top-btn">
<nuxt-link
                      class="card-btn custom-stox"
                      :to="`stoxticker`"
                      >
                      <font-awesome-icon :icon="['fas', 'chevron-left']" />
                       Back to board search</nuxt-link
                    >
            </div>
        </div>
    </div>
    
    
    <div class="row">
      <div class="col-md-12 col-sm-12 t-p-5">
        <div class="card">
          <div
            class="card-body dashboard-graph sx-stats-all"
            id="dashboard-graph-outer"
            ref="shareImage"
          >
            <h5 class="card-title">
              <button class="theme-btn card-btn">
              
                {{ stoxtickerDetails.board.name }} ${{stoxtickerDetails.cardData.total_card_value}}
              </button>
               <button
                :class="
                  (stoxtickerDetails.cardData.sx_icon &&
                  stoxtickerDetails.cardData.sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerDetails.cardData.sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerDetails.cardData.sx_icon
                  ]"
                />&nbsp;&nbsp;${{stoxtickerDetails.cardData.sx_value}}
              </button>
                
                <button
                :class="
                  (stoxtickerDetails.cardData.sx_icon &&
                  stoxtickerDetails.cardData.sx_icon == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerDetails.cardData.sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerDetails.cardData.sx_icon
                  ]"
                />&nbsp;&nbsp;{{stoxtickerDetails.cardData.pert_diff}}%
              </button>
            
              <button v-if="user.id == stoxtickerDetails.board.user_id"
            class="theme-red-btn card-btn" @click="deleteBoard()">
             Delete
              </button>
                   
              <!-- <span class="float-right share-lk-top">
                <span class="share-icon">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
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
                        :href="'https://twitter.com/intent/tweet?url='+encodeURI(baseUrl)+'&text=Check Stoxticker: '+stoxtickerDetails.board.name+' valued@ '+stoxtickerData.sale.toFixed(2)+' ' +encodeURI(this.graphImage)"
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a :href="'http://pinterest.com/pin/create/button/?url='+encodeURI(this.baseUrl)+'&media='+encodeURI(this.graphImage)+'&description='+encodeURI('Check Stoxticker: '+stoxtickerDetails.board.name)" target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li>
                      <a :href="'https://www.linkedin.com/sharing/share-offsite/?url='+encodeURI(baseUrl)" target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
             
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
                  @click="getStoxtickerData(2)"
                >
                  1D
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                      (activeDaysGraph == 7 ? 'active' : '')
                  "
                  @click="getStoxtickerData(7)"
                >
                  1W
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                      (activeDaysGraph == 30 ? 'active' : '')
                  "
                  @click="getStoxtickerData(30)"
                >
                  1M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                      (activeDaysGraph == 90 ? 'active' : '')
                  "
                  @click="getStoxtickerData(90)"
                >
                  3M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                      (activeDaysGraph == 180 ? 'active' : '')
                  "
                  @click="getStoxtickerData(180)"
                >
                  6M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                      (activeDaysGraph == 365 ? 'active' : '')
                  "
                  @click="getStoxtickerData(365)"
                >
                  1Y
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                      (activeDaysGraph == 1825 ? 'active' : '')
                  "
                  @click="getStoxtickerData(1825)"
                >
                  5Y
                </li>
              </ul>
              <p class="dashboard-graph-footer-update-at float-right">
                Last Updated - 
                {{ stoxtickerDetails.last_timestamp }}
              </p>
            </div>
          </div>
        </div>
      </div>
<!-- <div class="social_share ss-h4">
        <h4>
              <a class="embed-link" href="javascript:;"  @click="embedStatsCode()">EMBEDD CODE </>
              </a>
            </h4>
        </div> -->
    </div>
    <b-modal id="embedStatsCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="https://pro.slabstox.com/stoxticker-board-details" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea
            >
          </p>
        </b-modal>
      
        <div class="row slabs-ticker">
        <div class="col-md-12 col-sm-12 t-p-5">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                      <button class="theme-btn card-btn">slabs in ticker</button>
                    </h5>
                    <div class="dataloader" v-if="requestInProcessFeatured">
                      <b-spinner variant="success" label="Spinning"></b-spinner>
                    </div>
                    <ul class="my-card-listing">
                      <CardSlabItem v-for="item in stoxtickerDetails.cards" :key="item.card_data.id" :itemdata="item.card_data" />
                    </ul>

                    <div class="empty-result" v-if="stoxtickerDetails.cards.length == 0 && !requestInProcessFeatured">
                      <p>There are no cards here. Check again soon.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
// import CardListItem from '~/components/dashboard/CardListItem'
// import MyListing from '~/components/dashboard/MyListing'
import { BASE_URL } from '../../constants/keys'

export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Stoxticker - SlabStox',
      meta: [
        {
           hid: 'stoxticker-details',name: 'Stoxticker - Slabstox',
          content: 'Check Stoxticker: ' + this.stoxtickerDetails.board.name,
        },
        {
          property: 'og:title',
          content: 'Check Stoxticker: ' + this.stoxtickerDetails.board.name,
        },
        { property: 'og:image', content: this.graphImage },
        {
          property: 'og:description',
          content: 'Check Stoxticker: ' + this.stoxtickerDetails.board.name,
        },
        { property: 'og:url', content: this.baseUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    if (this.$route.query.board != null) {
      this.getStoxtickerData()
    } else {
      //error
    }
// console.log(this.user);
// console.log(this.stoxtickerDetails.board);
    // this.updateGraph()
  },
  components: {
    // CardListItem,
    CardSlabItem,
    // MyListing,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      requestInProcessFeatured: false,
      logo: null,
      baseUrl: BASE_URL,
      graphImage: '',

      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphDataEmpty: false,
      boardFollow: false,
      stoxtickerDetails: {
        board: [],
        cards: [],
        cardData: [],
      },
      stoxtickerData: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: '',
      },
      salesQty: [],
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
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
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
    trimString(title) {
      if (title.length > 53) {
        title = title.substring(0, 50)
        title += '...'
        return title
      }
      return title
    },
    embedStatsCode() {
      this.$bvModal.show('embedStatsCode')
    },
    getStoxtickerData(days = 2) {
      try {
        this.$axios
          .$get(`stoxticker/board-details/${this.$route.query.board}/${days}`)
          .then((res) => {
            if (res.status == 200) {
              this.activeDaysGraph = days
              this.stoxtickerDetails.board = res.board
              this.stoxtickerDetails.cards = res.cards
              this.stoxtickerDetails.cardData = res.card_data
              this.stoxtickerDetails.last_timestamp =
                res.card_data.sales_graph.last_timestamp
              this.boardFollow = res.follow != null ? true : false

              this.series = [
                { name: 'SX', data: res.card_data.sales_graph.values },
              ]
              this.salesQty = res.card_data.sales_graph.qty
              this.chartOptions = {
                xaxis: {
                  categories: res.card_data.sales_graph.labels,
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: '#edecec',
                      fontSize: '10px',
                      fontFamily: 'NexaBold',
                    },
                    formatter: (value, ind) => {
                      let lblStr = `$${value}`
                      return lblStr
                    },
                  },
                },
                colors: ['#14f078'],
                tooltip: {
                  enabled: true,
                  y: {
                    formatter: (value, ind) => {
                      let lblStr = `$${value}`
                      if (typeof ind == 'object')
                        lblStr = `$${value} (${
                          this.salesQty[ind.dataPointIndex]
                        })`
                      else lblStr = `$${value} (${this.salesQty[ind]})`
                      return lblStr
                    },
                  },
                },
              }

              setTimeout(() => {
                this.generateImageOfGraph()
              }, 1000)
            } else {
              this.$router.push('/404')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    // updateGraph(days = 2) {
    //   try {
    //     this.graphDataEmpty = false
    //     this.$axios.$get(`get-dashboard-graph/${days}`).then((res) => {
    //       if (res.status == 200) {
    //         this.activeDaysGraph = days
    //         if (this.initGraphLabelLength != res.data.labels.length) {
    //           this.graphDataEmpty = false
    //           this.series = [{ name: 'Stoxticker', data: res.data.values }]
    //           this.chartOptions = { xaxis: { categories: res.data.labels } }
    //           this.initGraphLabelLength = res.data.labels.length
    //           setTimeout(() => {
    //             this.generateImageOfGraph()
    //           }, 1000)
    //         } else {
    //           this.graphDataEmpty = true
    //         }
    //       }
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
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
              // console.log(res.url)
            }
          })
      })
    },
    followBoard() {
      this.$axios
        .$post('stoxticker/follow-board', { board: this.$route.query.board })
        .then((res) => {
          if (res.status == 200) {
            this.boardFollow = res.board_create
            this.$toast.success('Stoxticker board updated successfully.')
          }
        })
    },
    deleteBoard() {
      this.$axios
        .$post('stoxticker/delete-board', { board: this.$route.query.board })
        .then((res) => {
          if (res.status == 200) {
            this.$toast.success('Stoxticker board deleted successfully.')
            this.$router.push('/stoxticker')
          }
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
  &:hover {
    color: #1ce783;
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
.share-lk-top span {
  font-family: 'Nexabold', Helvetica, Arial, sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #edecec;
  margin: 0;
  line-height: 25px;
  display: inline-block;
}
.share-all-outer {
  left: 32px;
  top: 25px;
}
.custom-stox {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  border-radius: 2px;
  background: linear-gradient(
    to left,
    rgba(10, 178, 95, 0.76) 0%,
    rgba(27, 231, 131, 0.76) 33%,
    rgba(5, 251, 98, 0.76) 100%
  );
  padding: 20px 35px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  border: 0;
  text-transform: uppercase;
  outline: none;
  margin-right: 10px;
  svg {
    margin-right: 5px;
  }
  &:hover {
    text-decoration: none;
  }
}

@media (max-width: 1200px) {
  html body main .my-card-listing .my-card {
    width: 33.333%;
  }
}

@media (max-width: 767px) {
  html body main .my-card-listing .my-card {
    width: 100% !important;
  }
  .top-btn {
    margin-left: 15px;
  }
}
.slabs-ticker {
  .my-card-listing .my-card {
    width: 20% !important;
  }
}
html body main .my-card-listing .my-card[data-v-672220c2]:nth-child(6n+7){
 clear: none;
}
</style>
