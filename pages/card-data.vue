<template>
  <div class="col-md-12 col-sm-12 listing-lebron" v-if="card">
    <div class="row headwrapper">
      <div class="col-md-4 col-sm-4 t-p-5 product-details-col-md-4 column_one">
        <div class="card">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">
              {{ card.title }}
            </h5>
            <ul class="labels">
              <!-- <li class="yellow">topps</li>
              <li class="grey">chrome</li> -->
              <li class="green">{{ card.brand }}</li>
              <!-- <li class="orange">trender</li> -->
            </ul>
            <div class="icons-container">
              <img
                v-if="!isInWatchList(id) && user.full_name != null"
                @click="addToWatchList()"
                class="icons"
                src="~/assets/img/icons/1heart-green.png"
              />
              <img
                v-if="isInWatchList(id) && user.full_name != null"
                @click="removeToWatchList()"
                class="icons heart-fill-icon"
                src="~/assets/img/icons/heart-green.png"
              />
            </div>
            <div class="image-conatiner">
              <img :src="card.cardImage" alt="data.title" />
            </div>

            <a
              class="theme-green-btn card-btn add-my-port2"
              target="_blank"
              href="https://www.ebay.com/sl/sell"
              >Sell This Card
              <font-awesome-icon :icon="['fas', 'chevron-right']"
            /></a>
            <button
              class="theme-green-btn card-btn add-my-port"
              v-if="user.full_name != null"
              @click="addToMyPortfolio()"
            >
              Add to My Portfolio
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-8 pr-0">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body dashboard-graph">
                <h5 class="card-title_new">
                  <button class="theme-btn card-btn">
                    Card Value ${{ card.details.currentPrice }}
                  </button>
                  <button
                    :class="
                      (card.sx_icon == 'up'
                        ? 'theme-green-btn'
                        : 'theme-red-btn') + ' card-btn'
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-' + card.sx_icon]"
                    />&nbsp;&nbsp;{{ card.sx }}
                  </button>
                  <span class="card-link" v-b-modal.openSeeProblemPopup>
                    Export Data
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </span>
                  <!-- <div class="float-right icon_img">
                    <img
                      class="gift-cart-title-ebay-img"
                      src="~/assets/img/icons/1heart-green.png"
                      alt
                    />
                    <span class="float-right share-lk-top share-card-data">
                      <span class="share-icon">
                        <img src="~/assets/img/icons/upload_icon.png" alt />
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
                              :href="'https://twitter.com/intent/tweet?url='+encodeURI(baseUrl)+'&text='+encodeURI(card.player+'-'+ card.year+'@'+card.details.currentPrice)"
                              target="_blank"
                              ><img src="~/assets/img/icons/twitter.svg" alt
                            /></a>
                          </li>
                          <li>
                            <a 
                              :href="'http://pinterest.com/pin/create/button/?url='+encodeURI(baseUrl)+'&media=' + this.graphImage + '&description='+encodeURI(card.player+'-'+ card.year+'@'+card.details.currentPrice)"
                              target="_blank"
                              ><img src="~/assets/img/pinterest.png" alt
                            /></a>
                          </li>
                          <li>
                            <a
                              :href="'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURI(baseUrl)"
                              target="_blank"
                              ><img
                                src="~/assets/img/icons/linkedin-circled.svg"
                                alt
                            /></a>
                          </li>
                        </ul>
                      </div>
                    </span>
                  </div> -->
                </h5>
                <div class="dashboard-apex-top">
                  <VueApexCharts
                    ref="cardDataChart"
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
                    Last Updated - {{ card.price_graph_updated }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 pr-0">
            <div class="card">
              <div class="card-body sales_graph-graph">
                <h5 class="card-title1">
                  <button class="theme-btn card-btn">SALES</button>
                  <!-- <nuxt-link class="card-link float-right" to="/">
                    VIEW SALES HISTORY
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </nuxt-link> -->
                  <a
                    href="javascript:;"
                    class="card-link float-right"
                    v-b-modal.viewSalesHistory
                  >
                    VIEW SALES HISTORY
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </a>
                </h5>

                <div class="sales_graph">
                  <!-- <img
                    class="gift-cart-title-ebay-img"
                    src="~/assets/img/graph.jpg"
                    alt
                  /> -->
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
          <div class="col-md-4">
            <div class="stat_box">
              <h3>stats</h3>
              <ul>
                <li>SlabStox Value: {{ card.details.currentPrice }}</li>
                <li>Overall Rank: {{ card.rank }}</li>
                <li>Last Sale Price: N/A</li>
                <li>Last Sale Date: N/A</li>
                <li>High Sale: N/A</li>
                <li>Low Sale: N/A</li>
              </ul>
              <!-- <span>READ MORE ABOUT OUR STATS</span> -->
            </div>
          </div>
        </div>

        <b-modal
          id="openSeeProblemPopup"
          title="EXPORT DATA"
          hide-footer
          v-model="dialogVisible"
        >
          <div class="shar-text">Share Text</div>
          <div class="g-main-text">
            <span class="g-title"></span>
            &nbsp;&nbsp;<span class="g-sx"></span> &nbsp;&nbsp;
            <span class="g-to-sales"></span> &nbsp;&nbsp;
            <span class="g-sales-diff"></span>
            &nbsp;&nbsp; <span class="g-image-link"></span>
          </div>

          <div class="shar-text">Share Graphics</div>
          <div class="g-img-full">
            <img src="" alt="" class="slab_image" />
            <img :src="graphImage" alt="" class="slab_graph" />
          </div>
          <div class="clearfix g-download-out">
            <a href="#" class="g-download-slab" target="_blank" download></a>
            <a
              :href="graphImage"
              class="g-download-graph"
              target="_blank"
              download
            ></a>
            <a href="#" class="g-download-img-all">Download Graphics</a>
          </div>
        </b-modal>
      </div>
    </div>

    <AvailableListing :cardId="parseInt(id)" :datascroll="true" />

    <b-modal
      id="viewSalesHistory"
      title="View Sales history"
      size="xl"
      hide-footer
    >
      <div class="row">View Sales history</div>
    </b-modal>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
import AvailableListing from '~/components/dashboard/AvailableListing'
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'
export default {
  transition: 'fade',
  layout: 'guestOuter',
  head() {
    return {
      title: 'Buy & Sell Sports Cards Online - Slabstox',
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('id')) {
      this.id = this.$route.query.id
    } else {
      this.$router.push('/404')
    }
    this.getData()
    this.updateGraph()
  },
  watch: {
    dialogVisible(visible) {
      if (visible) {
        $('.g-main-text .g-title').text($('.product-title').text())
        $('.g-main-text .g-sx').text(
          'Card Cost Change ' + $('.card-title_new .theme-green-btn').text()
        )
        $('.g-main-text .g-to-sales').text(
          $('.card-title_new .theme-btn').text()
        )
        // $('.g-main-text .g-sales-diff').text(
        //   'Price Change $'+$('.g-dollar-d-val').text()
        // )
        $('.g-main-text .g-image-link').text(this.graphImage)
        $('.g-img-full .slab_image').attr(
          'src',
          $('.image-conatiner img').attr('src')
        )
        $('.g-download-slab').attr(
          'href',
          $('.my-card.active .image-container img').attr('src')
        )
      }
    },
  },
  components: {
    CardListItem,
    AvailableListing,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      baseUrl: BASE_URL,
      id: null,
      card: null,
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphImage: '',
      graphDataEmpty: false,
      dialogVisible: false,
      series: [
        {
          name: 'Card Value',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
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
    }
  },
  methods: {
    addToWatchList() {
      try {
        this.$axios
          .$post('watchlist/add', {
            id: this.id,
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
            id: this.id,
          })
          .then((res) => {
            this.$store.dispatch('watchlist/fetchIds')
            this.$emit('onRemoveFromWatchList')
          })
      } catch (err) {
        console.log(err)
      }
    },
    getData() {
      try {
        this.$axios.$get('get-card-data/' + this.id).then((res) => {
          if (res.status == 200) {
            this.card = res.data
            // this.series = [{name: 'Card Values', data: res.data.price_graph_values}];
            // this.chartOptions = { xaxis:{ categories: res.data.price_graph_labels }};
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        this.$router.push('/404')
      }
    },
    addToMyPortfolio() {
      try {
        this.$axios.$post('portfolio/add', { id: this.id }).then((res) => {})
      } catch (error) {}
    },
    updateGraph(days = 2) {
      try {
        this.$axios.$get(`get-card-graph/${this.id}/${days}`).then((res) => {
          if (res.status == 200) {
            this.activeDaysGraph = days
            if (this.initGraphLabelLength != res.data.values.length) {
              this.series = [{ name: 'Card Values', data: res.data.values }]
              this.chartOptions = { xaxis: { categories: res.data.labels } }
              this.initGraphLabelLength = res.data.labels.length
            }
            setTimeout(() => {
              this.generateImageOfGraph()
            }, 100)
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    shareFb() {
      FB.ui({
        method: 'feed',
        name: encodeURI(
          this.card.player +
            '-' +
            this.card.year +
            '@' +
            this.card.details.currentPrice
        ),
        link: encodeURI(this.graphImage), //this.baseUrl
        picture: this.graphImage,
        description: 'Check our Slab value',
      })
    },
    generateImageOfGraph() {
      const chartInstance = this.$refs.cardDataChart.chart.dataURI()
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.$axios
          .$post('generate-graph-image', { image: img.src, prefix: 'cdc' })
          .then((res) => {
            if (res.status == 200) {
              this.graphImage = res.url
            }
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
.dashboard-nav-bar {
  text-transform: uppercase;
  font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
  padding: 10px 16px 12px 15px;
  background-color: #39414a;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  .top-nav-bar-search-logo {
    width: 10%;
    margin: 0px 25px;
    margin-top: 5px;
  }

  .nav-bar-form {
    width: 100%;

    .advance-search-label {
      position: relative;
      text-decoration: underline;
      top: -21px;
      font-size: 8px;
      float: right;
      right: 11px;
      color: #c5c3c3;
      cursor: pointer;
    }
    .nav-bar-form-input {
      margin-right: 0;
      margin-top: 4px;
      float: left;
      padding-right: 10px;
      width: 70%;
      .form-control {
        font-size: 12px;
        height: 30px;
        border-radius: 2px;
        position: relative;
      }
    }

    .nav-bar-form-input_search_bar_open {
      .form-control {
        background: #39414a;
        border-color: #39414a;
      }
    }

    .nav-bar-search-btn {
      display: inline-block;
      text-transform: uppercase;
      font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
      background: transparent;
      border: 1px solid $theme-light-green;
      color: $theme-light-green;
      font-size: 12px;
      height: 30px;
      width: 30%;
      margin-top: 4px;
      letter-spacing: 2px;
      padding: 0px 20px;
      border-radius: 2px;
      &:focus,
      &:active {
        outline: none;
      }
    }
    .search_bar_open {
      border-color: #39414a !important;
      color: #39414a !important;
    }
  }
  .top-nav-navbar {
    flex-direction: row;
    .top-nav-icon {
      .nav-link {
        width: 34px;
        margin-top: 7px;
        .icon {
          background-color: $theme-card-background-color;
          border-radius: 100%;
          width: 80%;
          margin: 0 auto;
          padding: 2px;
        }
        .cart-item-count {
          background: $theme-nav-badge-color;
          color: #ffffff;
          font-size: 10px;
          padding: 3px 7px 2px 5px;
          border-radius: 50%;
          position: absolute;
          margin-top: -5px;
          margin-left: -13px;
          width: 18px;
          text-align: center;
        }
      }
    }
  }
}
.add-my-port {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif !important;
  font-weight: 400;
  border-radius: 2px;
  background: linear-gradient(
    to left,
    rgba(10, 178, 95, 0.76) 0%,
    rgba(27, 231, 131, 0.76) 33%,
    rgba(5, 251, 98, 0.76) 100%
  );
  padding: 6px 5px 5px 5px !important;
  color: #000;
  font-size: 12px;
  display: block;
  text-align: center;
  position: absolute;
  bottom: 10px;
  width: 92%;
}
.add-my-port2 {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif !important;
  font-weight: 400;
  border-radius: 2px;
  background: linear-gradient(
    to left,
    rgba(10, 178, 95, 0.76) 0%,
    rgba(27, 231, 131, 0.76) 33%,
    rgba(5, 251, 98, 0.76) 100%
  );
  padding: 6px 5px 5px 5px !important;
  color: #000;
  font-size: 12px;
  display: block;
  text-align: center;
  position: absolute;
  bottom: 50px;
  width: 92%;
  &:hover {
    text-decoration: none;
  }
}
.t-p-5 {
  padding: 5px;
}
.product-details-col-md-4 {
  padding-top: 0px;
  .card {
    border: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    height: calc(100% - 9px);
  }
}
.my-card {
  float: left;
}
ul.my-card-listing {
  list-style: none;
  padding: 0px;
  margin-left: -17px;
  margin-right: -17px;
}
.card-link {
  line-height: 2;
  margin-top: 2px;
}
.headtohead_serach {
  .col-md-6 {
    padding-left: 5px;
    padding-right: 5px;
    &:first-child {
      padding-right: 30px;
    }
    &:last-child {
      padding-left: 30px;
    }
  }
}
.headwrapper {
  .product-image-card {
    position: relative;
    margin: 15px;
    padding: 0;
    .add-my-port,
    .add-my-port2 {
      width: 100%;
    }
  }
  .image-conatiner {
    img {
      max-width: 100%;
      border: 8px solid #fff;
      max-height: 75% !important;
    }
  }
  .icons-container {
    position: absolute;
    padding: 10px;
    right: 0px;
    margin-top: 10px;
    margin-right: -10px;
    z-index: 1;
    .icons {
      width: 32px;
      height: 32px;
      float: right;
      margin-top: -10px;
    }
    .heart-fill-icon {
      height: auto;
      width: 30px;
      cursor: pointer;
    }
  }
  .card-title {
    padding: 7px 12px 5px 12px;
    background: #000000;
    color: #fff;
    border: none;
    border-radius: 2px;
    font-style: italic;
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 3px !important;
  }
  .labels {
    padding: 0px;
    margin: 0px -2px 7px -2px;
    list-style-type: none;
    display: flex;
    width: auto;
  }
  .labels li {
    padding: 7px 12px 5px 12px;
    background: #edecec;
    border: none;
    border-radius: 2px;
    margin-left: 2px;
    text-align: center;
    width: 25%;
    float: left;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-right: 2px;
    font-style: italic;
    line-height: 1;
  }
  .card-body {
    padding-bottom: 15px;
  }
  .labels li.yellow {
    background-color: #e9cb1d;
  }
  .labels li.grey {
    background-color: #cccccc;
  }
  .labels li.green {
    background-color: #1de783;
  }
  .labels li.orange {
    background-color: #e57c13;
  }
  .stat_box {
    padding: 10px 15px;
    background-color: #1de783;
    border-radius: 3px;
    h3 {
      padding: 7px 12px 5px 12px;
      background: #edecec;
      border: none;
      border-radius: 2px;
      font-style: italic;
      display: inline-block;
      text-align: center;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 13px !important;
    }
    ul {
      padding: 0px;
      list-style-type: none;
      width: auto;
      margin-bottom: 0px;
      li {
        font-size: 12px;
        margin-bottom: 7px;
        font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        font-style: normal;
      }
    }
  }
  .vs_wrap {
    padding: 20px;
    margin-top: 0px;
    background-color: #39414a;
    border-radius: 3px;
    margin-bottom: 15px;
    .team_vs {
      background: #e57c13;
      background: -moz-linear-gradient(left, #e57c13 33%, #1de783 76%);
      background: -webkit-linear-gradient(left, #e57c13 33%, #1de783 76%);
      background: linear-gradient(to right, #e57c13 33%, #1de783 76%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e57c13', endColorstr='#1de783',GradientType=1 );
      padding: 5px;
      border-radius: 3px;
      position: relative;
      h3 {
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 0px;
      }
      .right h3 {
        text-align: right;
      }
      .vs_tip {
        position: absolute;
        left: 0;
        right: 0;
        font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        top: -10px;
        text-align: center;
        background-color: #fff;
        width: 55px;
        margin: auto;
        cursor: pointer;
        font-style: normal;
        z-index: 9;
        border-radius: 100px;
        height: 55px;
        line-height: 60px;
        font-size: 22px;
      }
    }
    .sx_value {
      margin-top: 5px;
      h3 {
        padding: 7px 12px 5px 12px;
        background: #edecec;
        border: none;
        border-radius: 2px;
        font-style: italic;
        text-align: center;
        font-size: 12px;
        text-transform: uppercase;
        display: inline-block;
        letter-spacing: 1px;
        margin-bottom: 3px !important;
      }
      .right {
        text-align: right;
      }
    }
  }

  .column_two {
    max-width: 40%;
    flex: 40%;
  }
  .column_three {
    max-width: 30%;
  }
}
.dashboard-graph-footer-month-filter {
  position: relative;
  list-style: none;
  background: #edecec;
  color: #000000;
  width: auto;
  padding: 10px 7px 8px 7px;
  margin: 0px;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  border-radius: 4px;
  text-align: center;
  display: table;
  li {
    display: inline;
    padding: 8px 8px 4px 8px;
    border-radius: 2px;
    letter-spacing: 1px;
  }
}
.card {
  border: 0px;
}
.share-card-data {
  span {
    margin: 0;
    img {
      width: 26px;
      margin-top: 3px;
      height: auto;
    }
  }
  .share-all-outer {
    top: 30px;
  }
}
.dashboard-apex-top {
  margin-left: -15px;
}
.g-main-text {
  background: #272d33;
  margin: 0 20px;
  padding: 15px 15px;
  border-radius: 2px;
  text-transform: initial;
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
    width: 80%;
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
