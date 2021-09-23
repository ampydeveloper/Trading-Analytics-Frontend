<template>
  <div class="col-md-12 col-sm-12 stoxticker-page-exactout">
    <div class="row dashboard-graph-row">
      <div class="col-md-12 col-sm-12">
        <div class="card">
          <div
            class="card-body dashboard-graph sx-stats-all"
            id="dashboard-graph-outer"
            ref="shareImage"
          >
            <h5 class="card-title">
              <button class="theme-btn card-btn dashboard-apex-top-alld">
                Slabstox ${{ stoxtickerData.total }}
              </button>
              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;
                <span class="g-dollar-d-val">
                  ${{ stoxtickerData.doller_diff }}</span
                >
              </button>
              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;{{ stoxtickerData.perc_diff }}%
              </button>

              <button
                class="theme-btn card-btn dashboard-apex-top-1d"
                style="display: none"
              >
                Slabstox ${{ stoxtickerData1d.total }}
              </button>
              <button
                :class="
                  (stoxtickerData1d.change_arrow &&
                  stoxtickerData1d.change_arrow == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-1d'
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="stoxtickerData1d.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData1d.change_arrow,
                  ]"
                />&nbsp;
                <span class="g-dollar-d-val">
                  ${{ stoxtickerData1d.doller_diff }}</span
                >
              </button>
              <button
                :class="
                  (stoxtickerData1d.change_arrow &&
                  stoxtickerData1d.change_arrow == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-1d'
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="stoxtickerData1d.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData1d.change_arrow,
                  ]"
                />&nbsp;{{ stoxtickerData1d.perc_diff }}%
              </button>

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
                          '&text=StoxTicker@' +
                          (stoxtickerData.total ? stoxtickerData.total : '') +
                          ' ' +
                          encodeURI(this.sxGraphImage)
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
                          encodeURI(this.sxGraphImage) +
                          '&description=' +
                          encodeURI('Check Our Stoxticker')
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
            </h5>
            <div class="dashboard-apex-top" ref="dashboardApexChart">
              <div class="dashboard-apex-top-1d" style="display: none">
                <VueApexCharts
                  ref="sxDashChart1d"
                  type="area"
                  height="350"
                  :options="sxChartOptions1d"
                  :series="sxSeries1d"
                ></VueApexCharts>
              </div>
              <div class="dashboard-apex-top-alld">
                <VueApexCharts
                  ref="sxDashChart"
                  type="area"
                  height="350"
                  :options="sxChartOptions"
                  :series="sxSeries"
                ></VueApexCharts>
              </div>
            </div>
            <div class="dashboard-graph-footer">
              <ul class="dashboard-graph-footer-month-filter">
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 2 ? 'active' : '')
                  "
                  @click="slabstoxGraph1d(2, 1)"
                >
                  1D
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 7 ? 'active' : '')
                  "
                  @click="slabstoxGraph(7)"
                >
                  1W
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 30 ? 'active' : '')
                  "
                  @click="slabstoxGraph(30)"
                >
                  1M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 90 ? 'active' : '')
                  "
                  @click="slabstoxGraph(90)"
                >
                  3M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 180 ? 'active' : '')
                  "
                  @click="slabstoxGraph(180)"
                >
                  6M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 365 ? 'active' : '')
                  "
                  @click="slabstoxGraph(365)"
                >
                  1Y
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 1825 ? 'active' : '')
                  "
                  @click="slabstoxGraph(1825)"
                >
                  5Y
                </li>
              </ul>
              <p class="dashboard-graph-footer-update-at float-right">
                Last Updated -
                {{
                  stoxtickerData.last_timestamp
                    ? stoxtickerData.last_timestamp
                    : 'N/A'
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'
import MarqueeText from 'vue-marquee-text-component'

export default {
  transition: 'fade',
  layout: 'default',
  auth: 'guest',
  head() {
    return {
      title: 'Stoxticker - SlabStox',
      meta: [
        {
          hid: 'stoxticker',
          name: 'Stoxticker - SlabStox',
          content: 'Check our StoxTicker',
        },
      ],
    }
  },
  mounted() {
    var currentHref = location.href
    this.sxStoxtickerUrl = currentHref.replace('stoxticker', 'stox-feed')

    this.getData()
    this.slabstoxGraph(90, 1)

    // this.getSoldListing()
  },
  components: {
    MarqueeText,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      paused: false,
      logo: null,
      baseUrl: BASE_URL,

      requestInProcess: false,
      searchSlabs: [],
      sxSeries1d: [],
      sxSeries: [],
      stoxtickerData: [],
      stoxtickerData1d: [],
      sxActiveDaysGraph: '',
      graphImage: '',
      sxGraphImage: '',
      perc_diff: 0,
      doller_diff: 0,

      last_timestamp: 'N/A',
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
      graph1dInitialized: false,
      show1dGraph: false,

      sxChartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false,
        },
      },
      sxChartOptions1d: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false,
          },
        },
      },
    }
  },
  methods: {
    getData() {
      try {
        this.$axios.$get('get-stoxticker-data').then((res) => {
          if (res.status == 200) {
            this.data = res.data
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        this.$router.push('/404')
      }
    },
    generateImageOfGraph(chartInstance) {
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.$axios
          .$post('generate-graph-image', { image: img.src, prefix: 'cdc' })
          .then((res) => {
            if (res.status == 200) {
              this.sxGraphImage = res.url
            }
          })
      })
    },
    slabstoxGraph(days = 90, intialTime = 0) {
      try {
        this.sxActiveDaysGraph = days
        this.$axios.$get(`get-sx-dashboard-graph/${days}`).then((res) => {
          if (res.status == 200) {
            this.stoxtickerData.total = res.data.total_sales
            // this.stoxtickerData.sale = res.data.total_sales
            this.stoxtickerData.perc_diff = res.data.perc_diff
            this.stoxtickerData.doller_diff = res.data.doller_diff
            this.stoxtickerData.change_arrow = res.data.change_arrow
            if (days == 90) {
              this.stoxtickerData.last_timestamp = res.data.last_timestamp
            }

            this.show1dGraph = false
            this.showalldGraph = true
            $('.dashboard-apex-top-alld').show()
            $('.dashboard-apex-top-1d').hide()

            this.sxSeries = [{ name: 'SX', data: res.data.values }]
            this.sxSalesQty = res.data.qty
            this.sxChartOptions = {
              xaxis: {
                categories: res.data.labels,
              },
              yaxis: {
                labels: {
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
              tooltip: {
                y: {
                  formatter: (value, ind) => {
                    let lblStr = `$${value}`
                    if (typeof ind == 'object')
                      lblStr = `$${value} (${
                        this.sxSalesQty[ind.dataPointIndex]
                      })`
                    else lblStr = `$${value} (${this.sxSalesQty[ind]})`
                    return lblStr
                  },
                },
              },
            }
          } else {
            this.$toast.error(
              'There has been an error loading Slabstox graphs. Please refresh your page.',
              { timeOut: 10000 }
            )
          }
        })
      } catch (error) {
        this.$toast.error(
          'There has been an error loading Slabstox graphs. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    slabstoxGraph1d(days = 2, intialTime = 0) {
      if (intialTime == 1 && this.graph1dInitialized == false) {
        try {
          this.sxActiveDaysGraph = days
          this.$axios.$get(`get-sx-dashboard-graph/${days}`).then((res) => {
            if (res.status == 200) {
              this.graph1dInitialized = true
              this.show1dGraph = true
              this.showalldGraph = false
              $('.dashboard-apex-top-1d').show()
              $('.dashboard-apex-top-alld').hide()

              this.stoxtickerData1d.total = res.data.total_sales
              this.stoxtickerData1d.perc_diff = res.data.perc_diff
              this.stoxtickerData1d.doller_diff = res.data.doller_diff
              this.stoxtickerData1d.change_arrow = res.data.change_arrow

              this.sxSeries1d = [{ name: 'SX', data: res.data.values }]
              this.sxSalesQty1d = res.data.qty
              this.sxChartOptions1d = {
                xaxis: {
                  categories: res.data.labels,
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
                tooltip: {
                  x: {
                    formatter: (value, ind) => {
                      return res.data.labels[ind.dataPointIndex]
                    },
                  },
                  y: {
                    formatter: (value, ind) => {
                      let lblStr = `$${value}`
                      if (typeof ind == 'object')
                        lblStr = `$${value} (${
                          this.sxSalesQty1d[ind.dataPointIndex]
                        })`
                      else lblStr = `$${value} (${this.sxSalesQty1d[ind]})`
                      return lblStr
                    },
                  },
                },
              }
            } else {
              this.$toast.error(
                'There has been an error loading Slabstox graphs. Please refresh your page.',
                { timeOut: 10000 }
              )
            }
          })
        } catch (error) {
          this.$toast.error(
            'There has been an error loading Slabstox graphs. Please refresh your page.',
            { timeOut: 10000 }
          )
        }
      } else {
        this.show1dGraph = true
        this.showalldGraph = false
        $('.dashboard-apex-top-1d').show()
        $('.dashboard-apex-top-alld').hide()
        this.sxActiveDaysGraph = days
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-graph {
  .dashboard-graph-footer {
    position: relative;
    font-size: 12px;
    .dashboard-graph-footer-month-filter {
      position: relative;
      list-style: none;
      background: $theme-off-white;
      color: #000000;
      width: 270px;
      padding: 10px 7px 8px 7px;
      margin: 0px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      border-radius: 4px;
      text-align: center;

      .dashboard-graph-footer-month-filter-item {
        display: inline;
        padding: 8px 8px 4px 8px;
        border-radius: 2px;
        letter-spacing: 1px;
        &.active {
          background: $theme-btn-green;
        }
      }
    }
    .dashboard-graph-footer-update-at {
      color: #c5c3c3;
      text-transform: uppercase;
      position: relative;
      margin-top: -26px;
      letter-spacing: 1px;
    }
  }
}
.board-search-list {
  margin-bottom: 30px;
  .dashboard-graph-footer-month-filter {
    width: auto !important;
  }
  a.theme-btn.card-btn {
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }
  .dashboard-graph {
    .dashboard-graph-footer {
      // margin-top: -25px;
      .dashboard-graph-footer-update-at {
        margin-top: 18px;
      }
    }
  }
}
.sx-stats-all.dashboard-graph {
  .dashboard-graph-footer
    .dashboard-graph-footer-month-filter
    .dashboard-graph-footer-month-filter-item {
    margin: 0;
  }
  .dashboard-graph-footer {
    // margin-top: 13px;
    .dashboard-graph-footer-update-at {
      margin-top: 21px;
    }
  }
}
.card-title {
  text-align: left;
}
</style>