<template>
  <div class="col-md-12 col-sm-12 analytics_page">
    <div class="row analytics_page_row1">
      <div class="col-md-4 col-sm-4 pr-0">
        <div class="col-md-12 col-sm-12 pl-0">
          <div class="card green_box">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn">My Portfolio VALUE</button>
                <nuxt-link class="card-link pl-2" to="/my-portfolio">
                  View Portfolio
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </nuxt-link>
              </h5>
              <h2>${{ value }}</h2>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-sm-12 pl-0 beta-ver-hide">
          <div class="card total_sold">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn">TOTAL SOLD</button>
                <nuxt-link class="card-link float-right pl-2" to="/">
                  My Listing
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </nuxt-link>
              </h5>
              <h2>$0</h2>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-sm-12 pl-0 beta-ver-hide">
          <div class="card total_purchase">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn">TOTAL PURCHASED</button>
              </h5>
              <h2>$0</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8 col-sm-8">
        <div class>
          <div class="col-md-12 col-sm-12 pr-0 pl-0">
            <div class="card">
              <div class="card-body dashboard-graph">
                <h5 class="card-title sx-stats-all">
                  <button class="theme-btn card-btn">
                    My Portfolio ${{ value }}
                  </button>
                  <button
                    :class="
                      (apiData.diff_icon == 'up'
                        ? 'theme-green-btn'
                        : 'theme-red-btn') + ' card-btn'
                    "
                  >
                    <font-awesome-icon
                      v-if="apiData.diff_icon !== undefined"
                      :icon="['fas', 'long-arrow-alt-' + apiData.diff_icon]"
                    />&nbsp;&nbsp;{{ apiData.diff_value }}
                  </button>
                </h5>
                <div class="dashboard-apex-top">
                  <VueApexCharts
                    type="area"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                  ></VueApexCharts>
                </div>
                <div class="dashboard-graph-footer clearfix">
                  <ul class="dashboard-graph-footer-month-filter">
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 2 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 2 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(2)"
                    >
                      1D
                    </li>
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 7 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 7 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(7)"
                    >
                      1W
                    </li>
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 30 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 30 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(30)"
                    >
                      1M
                    </li>
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 90 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 90 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(90)"
                    >
                      3M
                    </li>
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 180 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 180 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(180)"
                    >
                      6M
                    </li>
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 365 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 365 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(365)"
                    >
                      1Y
                    </li>
                    <li
                      :class="
                        'dashboard-graph-footer-month-filter-item ' +
                        (activeDaysGraph == 1825 && graphDataEmpty == false
                          ? 'active'
                          : '') +
                        (activeDaysGraph == 1825 && graphDataEmpty == true
                          ? 'nodata'
                          : '')
                      "
                      @click="updateGraph(1825)"
                    >
                      5Y
                    </li>
                  </ul>
                  <p class="dashboard-graph-footer-update-at float-right">
                    Last Updated - {{ apiData.updated }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-0">
          <div class="col-md-8 col-sm-8 pl-0 pr-0">
            <div class="card beta-ver-hide">
              <div class="card-body sales_graph-graph">
                <h5 class="card-title">
                  <button class="theme-btn card-btn">SALES</button>
                  <nuxt-link class="card-link float-right" to="/">
                    VIEW SALES HISTORY
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link>
                </h5>

                <div class="sales_graph">
                  <!-- <img
                    class="gift-cart-title-ebay-img"
                    src="~/assets/img/graph.jpg"
                    alt
                  />  -->
                  <VueApexCharts
                    type="bar"
                    height="350"
                    :options="barchartOptions"
                    :series="barseries"
                  ></VueApexCharts>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 pr-0 stat">
            <div class="stat_box">
              <h3>stats</h3>
              <ul>
                <li>SlabStox Value: ${{ value }}</li>
                <li>Overall Rank: {{ rank }}</li>
                <li>Last Sale Price: N/A</li>
                <li>Last Sale Date: N/A</li>
                <li>High Sale: N/A</li>
                <li>Low Sale: N/A</li>
              </ul>
              <!-- <span>READ MORE ABOUT OUR STATS</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 pr-0 analytics_page_row2">
      <div class="row">
        <div class="col-md-12 pl-0 view_portfolio">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn">MVP's</button>
                <nuxt-link class="card-link pl-2" to="/">
                  View Portfolio
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </nuxt-link>
              </h5>
              <ul class="my-card-listing">
                <!-- <CardListItem v-for="item of items" :key="'active'+item.id" :itemdata="item" /> -->
                <CardSlabItem
                  v-for="item of items"
                  :key="'portfolio' + item.id"
                  :itemdata="item"
                />
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-2 pl-0 by_sport beta-ver-hide">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn">BY SPORT</button>
                <div class="custom-dropdown float-right">
                  <button class="dropbtn">See Result</button>
                  <div class="dropdown-content">
                    <a href="javascript:;" @click="filterBy('ending_soon')"
                      >Sold</a
                    >
                    <a
                      href="javascript:;"
                      @click="filterBy('price_low_to_high')"
                      >Purchased</a
                    >
                  </div>
                </div>
              </h5>
            </div>
            <div class="pie_chart">
              <!-- <img
                class="gift-cart-title-ebay-img"
                src="~/assets/img/piechart.jpg"
                alt
              /> -->
              <VueApexCharts
                type="donut"
                height="350"
                :options="piechartOptions"
                :series="pieseries"
              ></VueApexCharts>
            </div>
          </div>
        </div>
        <div
          class="col-md-8 col-sm-4 row pr-0 pl-0 value_listing beta-ver-hide"
        >
          <div class="col-md-6 col-sm-6 pr-0">
            <div class="card green_box">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-btn card-btn">EXPIRING LISTINGS</button>
                  <nuxt-link class="card-link pl-2" to="/my-portfolio">
                    VIEW LISTING
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link>
                </h5>
                <h2>20</h2>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 pr-0">
            <div class="card total_purchase2">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-btn card-btn">TOTAL LISTINGS</button>
                  <nuxt-link class="card-link float-right pl-2" to="/">
                    VIEW LISTING
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link>
                </h5>
                <h2>25</h2>
              </div>
            </div>
          </div>

          <div class="col-md-12 pr-0">
            <div class="card recently_viewed">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-btn card-btn">RECENTLY VIEWED</button>
                </h5>
                <ul>
                  <li>
                    <h4>
                      2018-19 LUKA DONCIC PANINI PRIZM RC ROOKIE #280 SILVE...
                    </h4>
                    <h5>current Bid: $720.0</h5>
                  </li>
                  <li>
                    <h4>
                      2018-19 LUKA DONCIC PANINI PRIZM RC ROOKIE #280 SILVE...
                    </h4>
                    <h5>current Bid: $720.0</h5>
                  </li>
                  <li>
                    <h4>
                      2018-19 LUKA DONCIC PANINI PRIZM RC ROOKIE #280 SILVE...
                    </h4>
                    <h5>current Bid: $720.0</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
import CardSlabItem from '~/components/dashboard/CardSlabItem'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Analytics - Slabstox',
    }
  },
  mounted() {
    this.getCards()
    this.getValue()
    this.updateGraph()
  },
  components: {
    CardListItem,
    CardSlabItem,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      value: 0,
      rank: 0,
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      apiData: {},
      valueRequestInProcess: false,
      items: [],
      graphDataEmpty: false,
      requestInProcess: false,
      sampleMyList: {
        category: 'Basketball Cards',
        galleryURL:
          'https://thumbs2.ebaystatic.com/m/mRwha6cB-2q2Fjdol6S5wNQ/140.jpg',
        id: 43,
        itemId: '363020170125',
        price: '720.0',
        title: '2018-19 Luka Doncic Panini Prizm RC Rookie #280 Silver Prizm',
      },
      series: [
        {
          name: 'Portfolio',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chartOptions: {
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
          type: 'categories',
          categories: [],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
      barseries: [
        {
          name: 'Sales',
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
      barchartOptions: {
        chart: {
          type: 'bar',
          height: 200,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '45%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          showForSingleSeries: false,
          showForNullSeries: false,
          showForZeroSeries: false,
          tooltip: {
            enabled: false,
          },
        },
        colors: '#15df93',
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
          categories: ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'],
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
        },
      },
      //  [40, 30,48]
      pieseries: [40, 30,48],
      piechartOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Football', 'Baseball', 'Basketball'],
        colors: ['#1ce783', '#ffffff', '#a29e9d'],
        stroke:{
         colors:['#39414a']
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
          type: 'categories',
          categories: [],
        },
        datasets: [{
          borderColor: ["#000"]
        }],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  },
  methods: {
    // getCards() {
    //   if (!this.requestInProcess) {
    //     try {
    //       this.showLoader()
    //       this.items = [];
    //       this.requestInProcess = true
    //       this.$axios
    //         .$post('search/sample-my-listing', {
    //           take: 6
    //         })
    //         .then(res => {
    //           this.hideLoader()
    //           this.requestInProcess = false
    //           if (res.status == 200) {
    //             this.items = res.data
    //           }
    //         })
    //     } catch (err) {
    //       this.hideLoader()
    //       this.requestInProcess = false
    //       console.log(err)
    //     }
    //   }
    // },
    getValue() {
      if (!this.valueRequestInProcess) {
        try {
          this.showLoader()
          this.items = []
          this.valueRequestInProcess = true
          this.$axios.$post('portfolio/portfolio-value', {}).then((res) => {
            this.hideLoader()
            this.valueRequestInProcess = false
            if (res.status == 200) {
              this.value = res.value
              this.rank = res.rank
              this.apiData = res
            }
          })
        } catch (err) {
          this.hideLoader()
          this.valueRequestInProcess = false
          console.log(err)
        }
      }
    },
    getCards() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.items = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/listing', {
              search: this.keyword,
              filterBy: this.filterByKeword,
            })
            .then((res) => {
              this.hideLoader()
              this.requestInProcess = false
              if (res.status == 200) {
                this.items = res.data
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    updateGraph(days = 2) {
      try {
        this.$axios
          .$get(`portfolio/get-portfolio-graph/${days}`)
          .then((res) => {
            if (res.status == 200) {
              this.activeDaysGraph = days
              if (this.initGraphLabelLength != res.data.values.length) {
                this.graphDataEmpty = false
                this.series = [{ name: 'Portfolio', data: res.data.values }]
                this.chartOptions = { xaxis: { categories: res.data.labels } }
                this.initGraphLabelLength = res.data.labels.length
              } else {
                this.graphDataEmpty = false
              }
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sales_graph-graph {
  .card-title {
    margin: 0;
  }
  .sales_graph {
    margin-left: -15px;
    margin-bottom: -36px;
  }
}
.t-p-5 {
  padding: 5px;
}
ul.my-card-listing {
  list-style: none;
  padding: 0px;
}
.card-link {
  line-height: 2;
  margin-top: 2px;
}
.stat_box {
  padding: 15px 15px;
  background-color: #1de783;
  border-radius: 3px;
  min-height: 270px;
}
.stat_box h3 {
  padding: 7px 12px 5px 12px;
  background: #edecec;
  border: none;
  border-radius: 2px;
  font-style: italic;
  display: inline-block;
  text-align: center;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 13px !important;
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