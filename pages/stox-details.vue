<template>
  <div class="col-md-12 col-sm-12 col-lg-11 dashboard_page stox-details-page">
    <div class="row">
      <div class="col-md-12 pl-1 mb-4 mt-2">
        <div class="top-btn">
          <nuxt-link class="card-btn custom-stox" :to="`stoxticker`">
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
              <button
                class="theme-btn card-btn dashboard-apex-top-1d"
                style="display: none"
              >
                {{ stoxtickerDetails.board.name }} ${{
                  stoxtickerDetails1d.cardData.total_card_value
                }}
              </button>
              <button
                :class="
                  (stoxtickerDetails1d.cardData.sx_icon &&
                  stoxtickerDetails1d.cardData.sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-1d'
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="stoxtickerDetails1d.cardData.sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerDetails1d.cardData.sx_icon,
                  ]"
                />&nbsp;&nbsp;${{ stoxtickerDetails1d.cardData.doller_diff }}
              </button>
              <button
                :class="
                  (stoxtickerDetails1d.cardData.sx_icon &&
                  stoxtickerDetails1d.cardData.sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-1d'
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="stoxtickerDetails1d.cardData.sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerDetails1d.cardData.sx_icon,
                  ]"
                />&nbsp;&nbsp;{{ stoxtickerDetails1d.cardData.pert_diff }}%
              </button>

              <button class="theme-btn card-btn dashboard-apex-top-alld">
                {{ stoxtickerDetails.board.name }} ${{
                  stoxtickerDetails.cardData.total_card_value
                }}
              </button>
              <button
                :class="
                  (stoxtickerDetails.cardData.sx_icon &&
                  stoxtickerDetails.cardData.sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerDetails.cardData.sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerDetails.cardData.sx_icon,
                  ]"
                />&nbsp;&nbsp;${{ stoxtickerDetails.cardData.doller_diff }}
              </button>
              <button
                :class="
                  (stoxtickerDetails.cardData.sx_icon &&
                  stoxtickerDetails.cardData.sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerDetails.cardData.sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerDetails.cardData.sx_icon,
                  ]"
                />&nbsp;&nbsp;{{ stoxtickerDetails.cardData.pert_diff }}%
              </button>

              <button
                v-if="user.id != stoxtickerDetails.board.user_id"
                :class="
                  (boardFollow ? 'theme-green-btn' : 'theme-btn') + ' card-btn'
                "
                @click="followBoard()"
              >
                {{ boardFollow ? 'Unfollow' : 'Follow' }}
              </button>

              <span class="card-link" v-b-modal.openSeeProblemPopup>
                Export Data
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>

              <span class="float-right share-lk-top">
                <span class="share-icon">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
                </span>
                <div class="share-all-outer">
                  <ul>
                    <li>
                      <a
                        :href="
                          'https://www.facebook.com/sharer/sharer.php?u=' +
                          encodeURI(currentUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(currentUrl) +
                          '&text=Check Stoxticker: ' +
                          stoxtickerDetails.board.name +
                          ' valued@ ' +
                          stoxtickerData.sale.toFixed(2) +
                          ' ' +
                          encodeURI(this.graphImage)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(currentUrl) +
                          '&media=' +
                          encodeURI(graphImage) +
                          '&description=' +
                          encodeURI(
                            'Check Stoxticker: ' + stoxtickerDetails.board.name
                          )
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://www.linkedin.com/sharing/share-offsite/?url=' +
                          encodeURI(currentUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
              </span>
              <button
                v-if="user.id == stoxtickerDetails.board.user_id"
                style="margin-right: 8px"
                class="theme-red-btn card-btn float-right"
                @click="deleteBoard()"
              >
                Delete
              </button>

              <b-modal
                id="openSeeProblemPopup"
                title="EXPORT DATA"
                hide-footer
                v-model="dialogVisible"
              >
                <div class="shar-text">Share Text</div>
                <div class="g-main-text">
                  <span class="g-title"
                    >{{ stoxtickerDetails.board.name }} ${{
                      stoxtickerDetails.cardData.total_card_value
                    }}</span
                  >
                  &nbsp;&nbsp;
                  <span class="g-sx" v-if="this.show1dGraph == true"
                    >Price Change ${{
                      stoxtickerDetails1d.cardData.sx_value
                    }}&nbsp;&nbsp;
                    Percentage Change
                    {{ stoxtickerDetails1d.cardData.pert_diff }}%</span
                  >
                  <span class="g-sx" v-if="this.showalldGraph == true"
                    >Price Change ${{
                      stoxtickerDetails.cardData.sx_value
                    }}&nbsp;&nbsp;
                    Percentage Change
                    {{ stoxtickerDetails.cardData.pert_diff }}%</span
                  >
                  &nbsp;&nbsp;
                  <span
                    class="slab-image-link"
                    v-if="this.show1dGraph == true"
                    >Graph URL {{ graphImage1d }}</span
                  >
                  <span
                    class="slab-image-link"
                    v-if="this.showalldGraph == true"
                    >Graph URL {{ graphImage }}</span
                  >
                </div>

                <div class="shar-text">Share Graphics</div>
                <div
                  class="g-img-full"
                  id="g-img-full"
                  v-if="this.show1dGraph == true"
                >
                  <img :src="graphImage1d" alt="" class="slab_graph" />
                </div>
                <div
                  class="g-img-full"
                  id="g-img-full"
                  v-if="this.showalldGraph == true"
                >
                  <img :src="graphImage" alt="" class="slab_graph" />
                </div>
                <div class="clearfix g-download-out text-right">
                  <a
                    href="javascript:void(0);"
                    @click="downloadImage"
                    class="g-download-img-all"
                  >
                    Download Graphics
                  </a>
                </div>
              </b-modal>
            </h5>
            <div class="dashboard-apex-top" ref="dashboardApexChart">
              <div class="dashboard-apex-top-1d" style="display: none">
                <VueApexCharts
                  ref="dashChart1d"
                  type="area"
                  height="350"
                  :options="chartOptions1d"
                  :series="series1d"
                ></VueApexCharts>
              </div>
              <div class="dashboard-apex-top-alld">
                <VueApexCharts
                  ref="dashChart"
                  type="area"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                ></VueApexCharts>
              </div>
            </div>
            <div class="dashboard-graph-footer">
              <ul class="dashboard-graph-footer-month-filter">
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (activeDaysGraph == 2 ? 'active' : '')
                  "
                  @click="getStoxtickerData1d(2, 1)"
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
              <a class="embed-link" href="javascript:;"  @click="embedStatsCode()">EMBED CODE </>
              </a>
            </h4>
        </div> -->
    </div>
    <b-modal id="embedStatsCode" title="" size="xl" hide-footer>
      <h5>Copy code and paste to your website.</h5>
      <p class="code-text">
        <textarea cols="3" rows="10">
<iframe src="https://pro.slabstox.com/stoxticker-board-details" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
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
              <CardSlabItem
                v-for="item in stoxtickerDetails.cards"
                :key="item.card_data.id"
                :itemdata="item.card_data"
              />
            </ul>

            <div
              class="empty-result"
              v-if="
                stoxtickerDetails.cards.length == 0 && !requestInProcessFeatured
              "
            >
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
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'

export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Stoxticker - SlabStox',
      meta: [
        {
          hid: 'stoxticker-details',
          name: 'Stoxticker - SlabStox',
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
        { property: 'og:url', content: this.currentUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  watch: {
    dialogVisible(visible) {
      const self = this
      if (visible) {
      }
    },
  },
  mounted() {
    if (this.$route.query.board != null) {
      this.getStoxtickerData(90, 1)
      // this.getStoxtickerData(2, 1)
    }
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
      graphImage1d: '',
      dialogVisible: false,
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphDataEmpty: false,
      boardFollow: false,
      currentUrl: location.href,
      graph1dInitialized: false,
      show1dGraph: false,
      showalldGraph: true,
      stoxtickerDetails: {
        board: [],
        cards: [],
        cardData: [],
      },
      stoxtickerDetails1d: {
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
          name: 'SX',
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
          type: 'datetime',
          tickAmount: 6,
          tickPlacement: 'on',
          categories: [],
        },
        tooltip: {
          enabled: true,
          x: {
            format: 'MM/dd/yy',
          },
        },
        noData: {
          text: 'Graph Loading...',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            colors: '#edecec',
            fontSize: '10px',
            fontFamily: 'NexaBold',
          },
        },
      },
      salesQty1d: [],
      series1d: [
        {
          name: 'SX',
          data: [],
        },
      ],
      chartOptions1d: {
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
          tickAmount: 24,
          tickPlacement: 'on',
          categories: [],
        },
        tooltip: {
          enabled: true,
        },
        noData: {
          text: 'Graph Loading...',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            colors: '#edecec',
            fontSize: '10px',
            fontFamily: 'NexaBold',
          },
        },
      },
    }
  },
  methods: {
    downloadImage() {
      // $('.apexcharts-toolbar .exportPNG').click()
      if (this.showalldGraph == true) {
        $('.dashboard-apex-top-alld .apexcharts-toolbar .exportPNG').click()
      } else {
        $('.dashboard-apex-top-1d .apexcharts-toolbar .exportPNG').click()
      }
    },
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
    getStoxtickerData(days = 90, intialTime = 0) {
      try {
        this.activeDaysGraph = days
        this.$axios
          .$get(`stoxticker/board-details/${this.$route.query.board}/${days}`)
          .then((res) => {
            if (res.status == 200) {
              this.stoxtickerDetails.cardData = res.card_data

              if (intialTime == 1) {
                this.stoxtickerDetails.board = res.board
                this.stoxtickerDetails.cards = res.cards
                this.stoxtickerDetails.last_timestamp =
                  res.card_data.sales_graph.last_timestamp
                this.boardFollow = res.follow != null ? true : false
              }

              this.show1dGraph = false
              this.showalldGraph = true
              $('.dashboard-apex-top-alld').show()
              $('.dashboard-apex-top-1d').hide()

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
                      let valCheck = value
                      if (Number(value) === value && value % 1 !== 0) {
                        let valCheck = Number(value).toFixed(2)
                      }

                      let lblStr = `$${valCheck}`
                      return lblStr
                    },
                  },
                },
                colors: ['#14f078'],
                tooltip: {
                  // enabled: true,
                  // x: {
                  //   format: days == 2 ? 'MM/dd/yy HH:mm' : 'MM/dd/yy',
                  // },
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
                this.generateImageOfGraph('all')
              }, 2000)
            } else {
              // this.$router.push('/404')
              this.$toast.error(
                'There has been an error loading graph. Please refresh your page.',
                { timeOut: 10000 }
              )
            }
          })
      } catch (error) {
        // console.log(error)
        this.$toast.error(
          'There has been an error loading graph. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    getStoxtickerData1d(days = 2, intialTime = 0) {
      if (intialTime == 1 && this.graph1dInitialized == false) {
        try {
          this.activeDaysGraph = days
          this.$axios
            .$get(`stoxticker/board-details/${this.$route.query.board}/${days}`)
            .then((res) => {
              if (res.status == 200) {
                this.graph1dInitialized = true
                this.stoxtickerDetails1d.cardData = res.card_data
                this.show1dGraph = true
                this.showalldGraph = false
                $('.dashboard-apex-top-1d').show()
                $('.dashboard-apex-top-alld').hide()
                this.series1d = [
                  { name: 'SX', data: res.card_data.sales_graph.values },
                ]
                this.salesQty1d = res.card_data.sales_graph.qty
                this.chartOptions1d = {
                  xaxis: {
                    tickAmount: 24,
                    tickPlacement: 'on',
                    categories: res.card_data.sales_graph.labels,
                    labels: {
                      formatter: function (value) {
                        if (value !== undefined) {
                          var splittedCategories = value.split(':')
                          var mins = splittedCategories[1]
                          if (mins == '00') {
                            return value
                          } else {
                            return ''
                          }
                        }
                        return ''
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: '#edecec',
                        fontSize: '10px',
                        fontFamily: 'NexaBold',
                      },
                      formatter: (value, ind) => {
                        let valCheck = value
                        if (Number(value) === value && value % 1 !== 0) {
                          let valCheck = Number(value).toFixed(2)
                        }

                        let lblStr = `$${valCheck}`
                        return lblStr
                      },
                    },
                  },
                  colors: ['#14f078'],
                  tooltip: {
                    x: {
                      formatter: (value, ind) => {
                        return res.card_data.sales_graph.labels[
                          ind.dataPointIndex
                        ]
                      },
                    },
                    y: {
                      formatter: (value, ind) => {
                        let lblStr = `$${value}`
                        if (typeof ind == 'object')
                          lblStr = `$${value} (${
                            this.salesQty1d[ind.dataPointIndex]
                          })`
                        else lblStr = `$${value} (${this.salesQty1d[ind]})`
                        return lblStr
                      },
                    },
                  },
                }

                setTimeout(() => {
                  this.generateImageOfGraph(2)
                }, 3000)
              } else {
                // this.$router.push('/404')
                this.$toast.error(
                  'There has been an error loading graph. Please refresh your page.',
                  { timeOut: 10000 }
                )
              }
            })
        } catch (error) {
          // console.log(error)
          this.$toast.error(
            'There has been an error loading graph. Please refresh your page.',
            { timeOut: 10000 }
          )
        }
      } else {
        this.show1dGraph = true
        this.showalldGraph = false
        $('.dashboard-apex-top-1d').show()
        $('.dashboard-apex-top-alld').hide()
        this.activeDaysGraph = days
      }
    },

    generateImageOfGraph(days) {
      // const chartInstance = this.$refs.dashChart.chart.dataURI()
      if (days == 'all') {
        var chartInstance = this.$refs.dashChart.chart.dataURI()
        var prefix = 'stoxticker-board-details'
      } else {
        var chartInstance = this.$refs.dashChart1d.chart.dataURI()
        var prefix = 'stoxticker-board-details-1d'
      }
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.$axios
          .$post('generate-image', { image: img.src, prefix: prefix })
          .then((res) => {
            if (res.status == 200) {
              if (days == 'all') {
                this.graphImage = res.url
              } else {
                this.graphImage1d = res.url
              }
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
.stox-details-page {
  padding: 0 25px;
}
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
  margin-left: 15px;
  vertical-align: middle;
  display: inline-block;
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
    margin-right: 8px !important;
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
  // .top-btn {
  //   margin-left: 15px;
  // }
}
.slabs-ticker {
  .my-card-listing .my-card {
    width: 20% !important;
    @media (max-width: 991px) {
      width: 33.333% !important;
    }
    @media (max-width: 767px) {
      width: 50% !important;
    }
  }
}
html body main .my-card-listing .my-card[data-v-672220c2]:nth-child(6n + 7) {
  clear: none;
}
.g-main-text {
  background: #272d33;
  margin: 0 20px;
  padding: 15px 15px;
  border-radius: 2px;
  text-transform: initial;
  .g-title{
        text-transform: capitalize;
  }
}
.shar-text {
  margin-left: 20px;
  padding: 10px 0 4px 0;
}
.g-img-full {
  margin: -10px 20px 0 20px;
  .slab_image {
    width: calc(20% - 5px);
    margin-right: 5px;
    float: left;
    margin-top: 10px;
  }
  .slab_graph {
    width: 100%;
  }
}
.g-download-img-all {
  font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
  color: #1ce783;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 1px;
}
.g-download-out {
  margin: 20px 20px 0 20px;
}
</style>
