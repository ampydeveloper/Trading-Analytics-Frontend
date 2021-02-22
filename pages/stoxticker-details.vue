<template>
  <div class="col-md-11 col-sm-11 dashboard_page">
      
      <div class="row">
        <div class="col-md-12 pl-1 mb-4 mt-2">
            <div class="top-btn">
                <button class="card-btn custom-stox"> 
<font-awesome-icon :icon="['fas', 'chevron-left']" /> Back to board search</button>
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
              
                {{ stoxtickerDetails.board.name }}   $12,160
              </button>
              
              <!-- <button
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
                    'long-arrow-alt-' + stoxtickerData.change_arrow
                  ]"
                />&nbsp;&nbsp;$5.18
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
                    'long-arrow-alt-' + stoxtickerData.change_arrow
                  ]"
                />&nbsp;&nbsp;3.89%
              </button> -->
                
                
             
              <span class="float-right share-lk-top">
                <span class="share-icon">
                  Share
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
                        :href="'https://twitter.com/intent/tweet?url='+encodeURI(baseUrl)+'&text=StoxTicker@'+stoxtickerData.sale.toFixed(2)"
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a :href="'http://pinterest.com/pin/create/button/?url='+encodeURI(this.baseUrl)+'&media='+encodeURI(this.graphImage)+'&description='+encodeURI('Buy & Sell Sports Cards Online')" target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li>
                      <a :href="'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURI(baseUrl)" target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
             
              </span>
            </h5>
            <div class="dashboard-apex-top" ref="dashboardApexChart">
              <!-- <VueApexCharts
                ref="dashChart"
                type="area"
                height="350"
                :options="chartOptions"
                :series="series"
              ></VueApexCharts> -->
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
                      <CardSlabItem v-for="item in stoxtickerDetails.cards" :key="item.id" :itemdata="item" />
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
import { BASE_URL } from '../constants/keys'

export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Stoxticker - Slabstox'
    }
  },
  mounted() {
    if(this.$route.query.board != null){
   
    this.getStoxtickerData(this.$route.query.board)
    }else{
//error
    }

    this.updateGraph()
  
  },
  components: {
    // CardListItem,
    CardSlabItem,
    // MyListing,
    VueApexCharts: () => import('vue-apexcharts')
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
      stoxtickerDetails: {
        board: 0,
        cards: 0
      },
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
          data: []
        }
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: true
          },
          height: 350,
          type: 'area',
          background: '#39414a',
          zoom: {
            enabled: false
          }
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        yaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold'
            }
          }
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold'
            }
          },
          type: 'category',
          categories: []
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          }
        }
      }
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
   

    getStoxtickerData(board) {
      try {
        this.$axios.$get(`stoxticker/board-details/${board}`).then(res => {
          if (res.status == 200) {
            this.stoxtickerDetails.board = res.board
            this.stoxtickerDetails.cards = res.cards
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    updateGraph(days = 2) {
      try {
        this.graphDataEmpty = false;
        this.$axios.$get(`get-dashboard-graph/${days}`).then(res => {
          if (res.status == 200) {
            this.activeDaysGraph = days
            if (this.initGraphLabelLength != res.data.labels.length) {
              this.graphDataEmpty = false;
              this.series = [{ name: 'Stoxticker', data: res.data.values }]
              this.chartOptions = { xaxis: { categories: res.data.labels } }
              this.initGraphLabelLength = res.data.labels.length
              setTimeout(() => {
                this.generateImageOfGraph()
              }, 1000);
            }else{
              this.graphDataEmpty = true;
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
          name: 'StoxTicker@'+this.stoxtickerData.sale.toFixed(2),
          link: encodeURI(this.graphImage), //this.baseUrl
          picture:  this.graphImage,
          description: 'Check our StoxTicker value'
        })
    },
    generateImageOfGraph() {
      const chartInstance = this.$refs.dashChart.chart.dataURI()
      chartInstance.then(val => {
         let img = new Image()
          img.src = val.imgURI
         this.$axios.$post('generate-image',{image: img.src, prefix: 'sd'}).then(res => {
           if(res.status == 200) {
             this.graphImage = res.url;
             console.log(res.url);
           }
         })
      })
    }
  }
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
ul.featured-listing{
    .my-card{
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

.custom-stox {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    border-radius: 2px;
    background: linear-gradient(to left, rgba(10, 178, 95, 0.76) 0%, rgba(27, 231, 131, 0.76) 33%, rgba(5, 251, 98, 0.76) 100%);
    padding: 20px 35px 17px 35px;
    color: #000;
    font-size: 12px;
    text-align: center;
    border: 0;
    text-transform: uppercase;
    outline: none;
    margin-right: 10px;
    svg{
         margin-right: 5px;
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
</style>
