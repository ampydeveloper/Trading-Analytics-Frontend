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
                :activeSt="item.id == cardActiveId ? !cardsActive : cardsActive"
                @toggleCardActive="toggleCardActive"
                @updateGraph="updateGraph"
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
            <h4 class="featured-graph-title">
              <span class="fg-title">{{ cardActiveTitle }}</span>

              <nuxt-link class="card-link float-right" to="/stoxticker">
                Get the Ticker
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>

              <button class="theme-btn card-btn btn-sxvalue float-right">
                Slabstox ${{ stoxtickerData.total }}
              </button>
            </h4>
            <h5 class="card-title">
              <button
                :class="
                  (sxIcon &&
                  sxIcon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="sxIcon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + sxIcon,
                  ]"
                />&nbsp;
                <span class="g-dollar-d-val"> ${{ doller_diff }}</span>
              </button>
              <button
                :class="
                  (sxIcon &&
                  sxIcon == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="sxIcon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + sxIcon,
                  ]"
                />&nbsp;{{ perc_diff }}%
              </button>
              <span class="card-link" v-b-modal.openSeeProblemPopup>
                Export Data
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
              <span class="total_sales" style="display: none">{{
                total_sales
              }}</span>
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
                Last Updated - {{ last_timestamp }}
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
            <span
              class="card-text-link dash-list"
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
              </nuxt-link>
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
            <span
              class="card-text-link dash-list"
              v-for="item in watchlist"
              :key="item.id"
            >
              <span class="card-text-s">{{ trimString(item.title) }} </span>

              <nuxt-link
                class=""
                :to="'/product?id=' + item.id + '&slag=' + item.title"
                :title="item.title"
                >${{ trimString(item.price) }}
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-sm-4 t-p-5 dash-trenders">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Portfolio</button>
              <nuxt-link class="card-link float-right" to="/my-portfolio">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="ternder.length == 0">
              <span>There are no cards here.</span>
            </p>
            <span
              class="card-text-link dash-list"
              v-for="(item, index) in ternder"
              :key="item.id"
            >
              <span class="card-text-s"
                >{{ index + 1 }}. {{ trimString(item.title) }}
              </span>

              <nuxt-link
                class=""
                :to="'/product?id=' + item.id + '&slag=' + item.title"
                :title="item.title"
              >
                ${{ trimString(item.price) }}
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <MyListing />

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
        <span class="g-sales-diff"></span>&nbsp;&nbsp; 
        <span class="g-image-link"></span>&nbsp;&nbsp;
        <span class="slab-image-link"></span>
      </div>

      <div class="shar-text">Share Graphics</div>
      <div class="g-img-full" id="g-img-full">
        <!-- <img src="https://images.unsplash.com/photo-1556629538-fc3eba61504e?auto=format&fit=crop&w=1300&q=80" alt="Cityscape" crossorigin="anonymous" class="slab_image" /> -->
        <!-- <img src="" class="slab_image_dup" alt="" /> -->
        <img src="" class="slab_image" alt="" crossorigin="anonymous" />
        <canvas class="slab_image_canvas"></canvas>
        <img :src="graphImageBase" alt="" class="slab_graph" />
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
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import CardListItem from '~/components/dashboard/CardListItem'
import MyListing from '~/components/dashboard/MyListing'
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  auth: 'guest',
  head() {
    return {
      title: 'Dashboard - Slabstox',
      meta: [
        {  hid: 'dashboard', name: 'Dashboard - Slabstox', content: 'Check Slabstox Featured Slabs' },
        { property: 'og:title', content: 'Check Slabstox Featured Slabs' },
        { property: 'og:image', content: this.logo },
        {
          property: 'og:description',
          content:
            'StoxTicker@' + (this.stoxtickerData.total ? this.stoxtickerData.total.toFixed(2) : ''),
        },
        { property: 'og:url', content: this.baseUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    this.getFeaturedListing()
    this.getLiveAuction()
    this.getTernder()
    this.getWatchlist()
    this.getStoxtickerData()
    this.logo = document.getElementById('sidebarLogo').src
    this.$store.dispatch('advancesearch/fetchAttributes')
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
      graphImageBase:'',
      cardImage: '',
      liveAuction: [],
      ternder: [],
      watchlist: [],
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphDataEmpty: false,
      dialogVisible: false,
      perc_diff: 0,
      doller_diff: 0,
      total_sales: 0,
      last_timestamp: 0,
      keyCount: 0,
      sxIcon:'',
      stoxtickerData: {
        total: 0,
        sale: 0,
        change: 0,
        change_arrow: 'up',
        last_updated: '',
      },
      salesQty: [],
      series: [
        {
          name: 'Sales',
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
            formatter: (value, ind) => {
              return `$${value}`
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
  watch: {
    dialogVisible(visible) {
      const self = this
      if (visible) {
        $('.g-main-text .g-title').text(
          $('.featured-graph-title .fg-title').text()
        )
        $('.g-main-text .g-sx').text(
          $('.my-card.active .sxvalue .sxvalue-text').text()
        )
        $('.g-main-text .g-to-sales').text(
          'Total Sales ' + $('.total_sales').text()
        )
        $('.g-main-text .g-sales-diff').text(
          'Price Change ' + $('.g-dollar-d-val').text()
        )
        
        $('.g-img-full .slab_image, .g-img-full .slab_image_dup').attr(
          'src',
          $('.my-card.active .image-container img').attr('src')
        )
        self.cardImage = $('.my-card.active .image-container img').attr('src')
        // $('.g-download-slab').attr(
        //   'href',
        //   $('.my-card.active .image-container img').attr('src')
        // )
        $('.g-main-text .g-image-link').text(self.graphImage)
        $('.g-main-text .slab-image-link').text(self.cardImage)

        // console.log(graphImageBase);
      }
    },
  },
  methods: {
    openImage(src) {
      window.open(src, '_blank')
    },
    downloadImage() {
      $('.apexcharts-toolbar .exportPNG').click()

      const wrapper = document.getElementById('g-img-full')
      const img = wrapper.querySelector('.slab_image')
      const canvas = wrapper.querySelector('.slab_image_canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, img.width, img.height)

setTimeout(() => {
      canvas.toBlob((blob) => {
        const downloadLink = downloadBlob(blob)
      })
}, 1000)
      function downloadBlob(blob) {
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        // a.download = filename || 'download';
        a.download = 'download'

        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(url)
            this.removeEventListener('click', clickHandler)
          }, 150)
        }
        a.addEventListener('click', clickHandler, false)
        a.click()
        $('.slab_image_canvas').hide();
        return a
      }
    },
    toggleCardActive(card) {
      this.cardActiveId = card.id
      this.cardActiveTitle = card.title
      this.cardsActive = false
    },
    trimString(title) {
      if (title.length > 33) {
        title = title.substring(0, 30)
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
          .$post('search/featured-listing', {
            take: 5,
            is_featured: 1,
          })
          .then((res) => {
            this.requestInProcessFeatured = false
            if (res.status == 200) {
              this.featuredListingItems = res.data
              if (this.featuredListingItems.length > 0) {
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
          .$post('portfolio/dashboard-listing', {
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
    updateGraph(days = 2) {
      try {
        this.graphDataEmpty = false
        this.$axios
          .$get(`get-dashboard-graph/${days}/${this.cardActiveId}`)
          .then((res) => {
            if (res.status == 200) {
              this.activeDaysGraph = days
              var percDiff = res.data.perc_diff
              var dollerDiff = String(res.data.doller_diff)
              this.sxIcon = res.data.sx_icon
            
              if (this.initGraphLabelLength != res.data.labels.length) {
                this.graphDataEmpty = false
                this.series = [{ name: 'Sales', data: res.data.values }]
                this.salesQty = res.data.qty
                this.chartOptions = {
                  xaxis: {
                    categories: res.data.labels,
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
                this.initGraphLabelLength = res.data.labels.length
                this.doller_diff = dollerDiff
                this.perc_diff = percDiff
                this.total_sales = res.data.total_sales
                this.last_timestamp = res.data.last_timestamp
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
        link: encodeURI(thinitGraphLabelLengthis.graphImage), //this.baseUrl
        picture: this.graphImage,
        description: 'Check our StoxTicker value',
      })
    },

    generateImageOfGraph() {
      const chartInstance = this.$refs.dashChart.chart.dataURI()
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.graphImageBase = img.src
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
.t-p-5 {
  padding: 5px;
}
ul.my-card-listing {
  list-style: none;
  padding: 0px;
  margin-left: -17px !important;
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
  a {
    color: #1ce783;
    float: right;
    width: 64px;
    &:hover {
      color: #1ce783;
    }
  }
  .card-text-s {
    width: calc(100% - 64px);
    display: inline-block;
    text-decoration: underline;
    padding-right: 10px;
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
     @media (max-width: 767px) {
          width: 100% !important;
    }
  }
  li.my-card.active {
    background: #39414a;
    margin-right: -2px;
  }
  
}
.featured-graph-title {
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  color: #edecec;
  font-size: 11px;
  letter-spacing: 1px;
  margin-bottom: 13px;
}
.dash-featured {
  padding-bottom: 0;
  .card-title {
    margin-bottom: 10px !important;
  }
  .card {
    border-bottom: 0;
  }
  .card-body {
    background: #2d343b;
    padding-bottom: 0;
    overflow: hidden;
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
  .card-btn {
    margin-right: 8px;
  }
}
// #openSeeProblemPopup___BV_modal_outer_ .modal-dialog {
//   width: 80%;
//   max-width: 1000px;
// }
// .modal-dialog {
//   width: 80%;
//   max-width: 1000px;
// }
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
  .slab_image ,.slab_image_dup {
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
.slab_image_canvas{
  position: absolute;
    left: 20px;
}
</style>