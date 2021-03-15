<template>
  <div class="col-md-11 col-sm-11 dashboard_page"> 
    
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
              <button data-v-6fc4d46b="" class="theme-green-btn card-btn"><svg data-v-6fc4d46b="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="long-arrow-alt-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-long-arrow-alt-up fa-w-8"><path data-v-6fc4d46b="" fill="currentColor" d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z" class=""></path></svg>&nbsp;&nbsp;
              <span data-v-6fc4d46b="" class="g-dollar-d-val"> $0</span></button>
              <button data-v-6fc4d46b="" class="theme-btn card-btn"><svg data-v-6fc4d46b="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="long-arrow-alt-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-long-arrow-alt-up fa-w-8"><path data-v-6fc4d46b="" fill="currentColor" d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z" class=""></path></svg>&nbsp;&nbsp;100.00%
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
                Last Updated - 
                <!-- {{ stoxtickerData.last_updated }} -->
                 FEBRUARY 20 2021 - 11:58:47 AM
              </p>
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
      title: 'Stoxticker - Slabstox',
      meta: [
        {  hid: 'stoxticker-board-details',name: 'Stoxticker - Slabstox', content: 'Check Stoxticker: '+this.stoxtickerDetails.board.name },
        { property: 'og:title', content: 'Check Stoxticker: '+this.stoxtickerDetails.board.name },
        { property: 'og:image', content: this.graphImage },
        {
          property: 'og:description',
          content:
            'Check Stoxticker: '+this.stoxtickerDetails.board.name,
        },
        { property: 'og:url', content: this.baseUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    if (this.$route.query.board != null) {
      this.getStoxtickerData(this.$route.query.board)
    } else {
      //error
    }

    this.updateGraph()
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
      stoxtickerDetails: {
        board: 0,
        cards: 0,
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
    getStoxtickerData(board) {
      try {
        this.$axios.$get(`stoxticker/board-details/${board}`).then((res) => {
          if (res.status == 200) {
            this.stoxtickerDetails.board = res.board
            this.stoxtickerDetails.cards = res.cards

            this.series = [{ name: 'Sales', data: res.card_data.values }]
            this.chartOptions = {
              xaxis: {
                categories: res.card_data.labels,
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
        this.graphDataEmpty = false
        this.$axios.$get(`get-dashboard-graph/${days}`).then((res) => {
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
              // console.log(res.url)
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
</style>
