<template>
  <div class="col-md-12 col-sm-12 listing-lebron" v-if="card">
    <div class="row headwrapper">
      <div
        class="col-lg-4 col-md-12 col-sm-12 t-p-5 product-details-col-md-4 column_one"
      >
        <div class="card">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">
              {{ card.title }}
            </h5>
            <ul class="labels clearfix">
              <li v-if="card.rc == 'yes'" class="grey">Rookie</li>
              <li class="green">{{ card.brand }}</li>
              <li v-if="card.grade != null" class="yellow">{{ card.grade }}</li>
              <!-- <li class="orange">trender</li> -->
            </ul>
            <div class="icons-container" v-if="user != null && user.full_name != null">
              <img
                v-if="!isInWatchList(id)"
                @click="addToWatchList()"
                class="icons"
                src="~/assets/img/icons/1heart-green.png"
              />
              <img
                v-if="isInWatchList(id)"
                @click="removeToWatchList()"
                class="icons heart-fill-icon"
                src="~/assets/img/icons/heart-green.png"
              />
            </div>
            <div class="image-conatiner">
              <img :src="card.cardImage" alt="data.title" />
              <!-- <span v-if="card.grade != null" class="grade-image-text">{{
                card.grade
              }}</span> -->
            </div>

            <a
              class="theme-green-btn card-btn add-my-port2"
              target="_blank"
              v-if="user != null && user.full_name != null"
              href="https://www.ebay.com/sl/sell"
              >Sell This Card
              <font-awesome-icon :icon="['fas', 'chevron-right']"
            /></a>
            <span
              :class="'theme-green-btn card-btn add-my-port2'"
              v-if="user == null || user.full_name == null"
              v-b-modal.loginTopPopup
            >
              Sell This Card
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </span>
            <button
              class="theme-green-btn card-btn add-my-port1"
              v-if="user != null && user.full_name != null"
              v-b-modal.submitAListingPopup
            >
              Submit a Listing
            </button>
            <span
              :class="'theme-green-btn card-btn add-my-port1'"
              v-if="user == null || user.full_name == null"
              v-b-modal.loginTopPopup
            >
              Submit a Listing
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </span>
            <button
              class="theme-green-btn card-btn add-my-port"
              v-if="user != null && user.full_name != null"
              @click="addToMyPortfolio()"
            >
              Add to My Portfolio
            </button>
            <span
              :class="'theme-green-btn card-btn add-my-port'"
              v-if="user == null || user.full_name == null"
              v-b-modal.loginTopPopup
            >
              Add to My Portfolio
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </span>
          </div>
        </div>
      </div>

      <div class="col-lg-8 col-md-12 pr-0 column_graph_sales_stats">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body dashboard-graph">
                <h5 class="card-title_new">
                  <button class="theme-btn card-btn">
                    *SX Value ${{ cardGraph.sx_value ? cardGraph.sx_value : 0 }}
                  </button>
                  <button :class="sx_icon_class + ' card-btn'">
                    <font-awesome-icon
                      v-if="
                        cardGraph.sx_icon == 'up' || cardGraph.sx_icon == 'down'
                      "
                      :icon="['fas', 'long-arrow-alt-' + cardGraph.sx_icon]"
                    />
                    &nbsp;${{
                      cardGraph.dollar_diff ? cardGraph.dollar_diff : 0
                    }}
                  </button>
                  <button :class="sx_icon_class + ' card-btn'">
                    <font-awesome-icon
                      v-if="
                        cardGraph.sx_icon == 'up' || cardGraph.sx_icon == 'down'
                      "
                      :icon="['fas', 'long-arrow-alt-' + cardGraph.sx_icon]"
                    />
                    &nbsp;{{ cardGraph.pert_diff ? cardGraph.pert_diff : 0 }}%
                  </button>
                  <span
                    class="card-link"
                    v-b-modal.openSeeProblemPopup
                    style="margin-left: 20px"
                  >
                    Export Data
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </span>
                  <div class="float-right icon_img">
                    <span class="float-right share-lk-top share-card-data">
                      <span class="share-icon">
                        <img src="~/assets/img/icons/upload_icon.png" alt />
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
                                '&text=' +
                                encodeURI(metaDesc) +
                                ' ' +
                                encodeURI(metaTitle)
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
                                metaImage +
                                '&description=' +
                                encodeURI(metaDesc)
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
                              ><img
                                src="~/assets/img/icons/linkedin-circled.svg"
                                alt
                            /></a>
                          </li>
                        </ul>
                      </div>
                    </span>
                  </div>
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
                    Last Updated -
                    {{
                      lastSaleDate
                        ? this.$moment(lastSaleDate).format(
                            'MMMM DD Y - hh:mm:ss A'
                          )
                        : 'N/A'
                    }}
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
                  <button class="theme-btn card-btn">SALES VOLUME</button>

                  <a
                    href="javascript:;"
                    class="card-link float-right"
                    v-b-modal.viewSalesHistory
                  >
                    VIEW SALES HISTORY
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                  </a>
                </h5>

                <div class="sales_graph dashboard-apex-top">
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
                <li>SlabStox Value: ${{ slabstoxValue }}</li>
                <li>Overall Rank: {{ card.rank }}</li>
                <li>
                  Last Sale Price:
                  {{ lastSalePrice ? '$' + lastSalePrice : 'N/A' }}
                </li>
                <li>
                  Last Sale Date:
                  {{
                    lastSaleDate
                      ? this.$moment(lastSaleDate).format('M/D/Y')
                      : 'N/A'
                  }}
                </li>
                <li>
                  High Sale: {{ highestSale ? '$' + highestSale.cost : 'N/A' }}
                  {{
                    lastSaleDate
                      ? '(' +
                        this.$moment(highestSale.timestamp).format('M/D/Y') +
                        ')'
                      : ''
                  }}
                </li>
                <li>
                  Low Sale: {{ lowestSale ? '$' + lowestSale.cost : 'N/A' }}
                  {{
                    lastSaleDate
                      ? '(' +
                        this.$moment(lowestSale.timestamp).format('M/D/Y') +
                        ')'
                      : ''
                  }}
                </li>
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
            &nbsp;&nbsp;
            <span class="g-sx">*SX Value ${{ slabstoxValue }}</span>
            &nbsp;&nbsp;
            <span class="g-to-sales">
              Price Change ${{
                cardGraph.dollar_diff ? cardGraph.dollar_diff : 0
              }}
              Percentage Change
              {{ cardGraph.pert_diff ? cardGraph.pert_diff : 0 }}%
            </span>
            &nbsp;&nbsp;
            <!-- <span class="g-sales-diff"></span> &nbsp;&nbsp; -->
            <span class="g-image-link"></span> &nbsp;&nbsp;
            <span class="slab-image-link"></span>
          </div>

          <div class="shar-text">Share Graphics</div>
          <div class="g-img-full" id="g-img-full">
            <img
              src=""
              class="slab_image"
              alt="Slab Title"
              crossorigin="anonymous"
            />
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
        <b-modal id="submitAListingPopup" title="Submit a Listing" hide-footer>
          <div class="shar-text">Enter eBay Link</div>
          <div class="form_column">
            <input
              v-model="reqAListLink"
              type="text"
              class="form-control"
              placeholder="Enter eBay link"
              required
            />
          </div>
          <div class="clearfix g-download-out text-right">
            <a
              href="javascript:void(0);"
              @click="submitAListing"
              class="g-download-img-all"
            >
              Submit
            </a>
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
      <div class="sale-h-out">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Source</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
               <th>Listing</th>
            </tr>
          </thead>
          <tbody v-if="cardHistory.length > 0">
            <tr v-for="card of cardHistory" :key="card.id">
              <td>
                {{ $moment(card.timestamp).format('MMMM DD Y hh:mm:ss A') }}
              </td>
              <td>{{ card.source }}</td>
              <td>{{ card.type }}</td>
              <td>{{ card.quantity }}</td>
              <td>${{ card.cost }}</td>
              <td>
                <nuxt-link
      :class="'theme-green-outline-btn'"
      :to="'/product?id=' + card.ebay_items_id"
      v-if="card.ebay_items_id != null"
    >
     View Listing
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
    </nuxt-link>
                </td>
            </tr>
          </tbody>
          <tbody v-if="cardHistory.length == 0">
            <tr>
              <td colspan="5" class="text-center">No sales history found.</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  auth: 'guest',
  head() {
    return {
      title: `${this.metaTitle}`,
      meta: [
        {
          hid: 'card-data',
          name: 'description',
          content: this.metaTitle,
        },
        { hid: 'card-og-title', property: 'og:title', content: this.metaTitle },
        { hid: 'card-og-image', property: 'og:image', content: this.metaImage },
        {
          hid: 'card-og-description',
          property: 'og:description',
          content: this.metaDesc,
        },
        { hid: 'card-og-url', property: 'og:url', content: this.currentUrl },
        {
          hid: 'card-og-site_name',
          property: 'og:site_name',
          content: 'Slabstox',
        },
        { hid: 'card-og-type', property: 'og:type', content: 'article' },
        {
          hid: 'card-og-app_id',
          property: 'fb:app_id',
          content: '2791823984386463',
        },

        {
          hid: 'card-article-published_time',
          property: 'article:published_time',
          content:
            this.lastSaleDate != 'N/A'
              ? this.$moment(this.lastSaleDate).format('MMMM DD Y - hh:mm:ss A')
              : this.$moment().format('MMMM DD Y - hh:mm:ss A'),
        },
        {
          hid: 'card-article-author',
          property: 'article:author',
          content: 'Slabstox',
        },

        {
          hid: 'card-twitter-card',
          property: 'twitter:card',
          content: this.graphImage,
        },
        {
          hid: 'card-twitter-url',
          property: 'twitter:url',
          content: this.currentUrl,
        },
        {
          hid: 'card-twitter-title',
          property: 'twitter:title',
          content: this.metaTitle,
        },
        {
          hid: 'card-twitter-image',
          property: 'twitter:image',
          content: this.metaImage,
        },
        {
          hid: 'card-twitter-description',
          property: 'twitter:description',
          content: this.metaDesc,
        },
      ],
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('id')) {
      this.id = this.$route.query.id
    } else {
      this.$router.push('/dashboard')
    }
    this.getData()
    this.updateGraph(90)
    this.getSalesGraph()
  },
  watch: {
    dialogVisible(visible) {
      if (visible) {
        $('.g-main-text .g-title').text($('.product-title').text())
        // $('.g-main-text .g-sx').text(
        //   'Card Cost Change ' + $('.card-title_new .theme-green-btn').text()
        // )
        // $('.g-main-text .g-to-sales').text(
        //   $('.card-title_new .theme-btn').text()
        // )
        if (this.graphImage != '') {
          $('.g-main-text .g-image-link').text('Graph URL ' + this.graphImage)
        }
        if ($('.image-conatiner img').attr('src') != '') {
          $('.g-main-text .slab-image-link').text(
            'Slab URL ' + $('.image-conatiner img').attr('src')
          )
        }
        $('.g-img-full .slab_image').attr(
          'src',
          $('.image-conatiner img').attr('src')
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
      reqAListLink: '',
      id: null,
      metaTitle: '',
      metaDesc: '',
      metaImage: '',
      card: [
        {
          title: '',
        },
      ],
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphImage: '',
      graphImageBase: '',
      graphDataEmpty: false,
      dialogVisible: false,
      lastSalePrice: '',
      lastSaleDate: '',
      highestSale: '',
      lowestSale: '',
      slabstoxValue: 0,
      sx_icon_class: 'theme-btn',
      currentUrl: location.href,
      cardHistory: [],
      cardGraph: [],
      series: [
        {
          name: 'SX',
          data: [],
        },
      ],
      salesQty: [],
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
          type: 'datetime',
          tickAmount: 6,
          categories: [],
        },
        tooltip: {
          x: {
            format: 'MM/dd/yy',
          },
        },
      },
      barseries: [
        {
          name: 'SX',
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
        colors: '#1de783',
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
    downloadImage() {
      $('.dashboard-graph .apexcharts-toolbar .exportPNG').click()

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
        $('.slab_image_canvas').hide()
        return a
      }
    },
    addToWatchList() {
      try {
        this.$axios
          .$post('watchlist/add', {
            id: this.id,
          })
          .then((res) => {
            this.$store.dispatch('watchlist/fetchIds')
            this.$router.push('/my-portfolio')
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
            this.$router.push('/my-portfolio')
          })
      } catch (err) {
        console.log(err)
      }
    },
    submitAListing() {
      try {
        if (this.reqAListLink.trim().length == 0) {
          this.$toast.error('Please enter a valid link')
          return false
        }
        this.$axios
          .$post('card/add-request-listing', {
            card_id: this.id,
            link: this.reqAListLink,
          })
          .then((res) => {
            this.$bvModal.hide('submitAListingPopup')
            this.reqAListLink = ''
            this.$toast.success('Listing request submitted successfully.')
          })
          .catch((err) => {
            console.log(err)
            this.$toast.error(
              'Invalid link - Please copy exact url from your browser address bar!'
            )
          })
      } catch (err) {
        console.log(err)
        this.$toast.error(
          'Invalid link - Please copy exact url from your browser address bar!'
        )
      }
    },
    getData() {
      try {
        this.$axios.$get('get-card-data/' + this.id).then((res) => {
          if (res.status == 200) {
            this.card = res.data
            this.metaTitle = this.card.title + ' - Slabstox'
            this.metaImage = this.card.cardImage
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
        this.$axios.$post('portfolio/add', { id: this.id }).then((res) => {
          this.$toast.success('Card added to portfolio successfully.')
        })
      } catch (error) {
        this.$toast.success('There has been an error. Please try again.')
      }
    },
    updateGraph(days = 90) {
      try {
        this.$axios
          .$get(`get-single-card-graph/${this.id}/${days}`)
          .then((res) => {
            if (res.status == 200) {
              this.activeDaysGraph = days
              // console.log(this.$moment().format('MMMM DD Y - hh:mm:ss A'));
              // if (this.initGraphLabelLength != res.data.values.length) {
              // console.log(res.data);
              this.series = [{ name: 'SX', data: res.data.values }]
              this.salesQty = res.data.qty
              this.chartOptions = {
                xaxis: {
                  // type: days == 2 ? 'category' : 'datetime',
                  tickAmount: 24,
                  // tickAmount: 6,
                  categories: res.data.labels,
                  // labels: {
                    //  format: days == 2 ? 'MM/dd/yy HH:mm' : 'MM/dd/yy',
                  //   formatter: function (value, timestamp) {
                  //     const date = new Date(timestamp)
                  //     if (days == 2) {
                  //       const hours = date.getHours()
                  //       const mins = date.getMinutes()
                  //       return hours + ':' + mins
                  //     } else {
                  //       return (
                  //         date.getMonth() +
                  //         '/' +
                  //         date.getDate() +
                  //         '/' +
                  //         date.getFullYear()
                  //       )
                  //     }
                  //   },
                  // },
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
                tooltip: {
                  enabled: true,
                  x: {
                    format: days == 2 ? 'MM/dd/yy HH:mm' : 'MM/dd/yy',
                  },
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
              this.cardGraph = res.data
              this.highestSale = res.data.highestSale
              this.lowestSale = res.data.lowestSale
              this.lastSaleDate = res.data.lastSaleDate
              this.lastSalePrice = res.data.lastSalePrice
              this.initGraphLabelLength = res.data.labels
                ? res.data.labels.length
                : 0
              this.slabstoxValue = res.data.slabstoxValue
              // console.log(res.data);
              if (this.cardGraph.sx_icon == 'up') {
                this.sx_icon_class = 'theme-green-btn'
              } else if (this.cardGraph.sx_icon == 'down') {
                this.sx_icon_class = 'theme-red-btn'
              }
              // }
              setTimeout(() => {
                this.generateImageOfGraph()
              }, 50)
            } else {
              this.$router.push('/404')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    getSalesGraph() {
      try {
        this.$axios.$get(`get-card-all-graph/${this.id}`).then((res) => {
          if (res.status == 200) {
            this.cardHistory = res.data.card_history
            this.barseries = [{ name: 'Sales', data: res.data.values }]
            this.barchartOptions = {
              xaxis: { categories: res.data.labels },
              plotOptions: {
                bar: {
                  horizontal: false,
                  endingShape: 'rounded',
                  columnWidth: '45%',
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
    shareFb() {
      FB.ui({
        method: 'feed',
        name: encodeURI(this.metaTitle),
        link: encodeURI(this.baseUrl), //this.baseUrl
        picture: this.metaImage,
        description: encodeURI(this.metaDesc),
      })
    },
    generateImageOfGraph() {
      const chartInstance = this.$refs.cardDataChart.chart.dataURI()
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.graphImageBase = img.src
        // console.log(this.graphImageBase);
        this.$axios
          .$post('generate-graph-image', { image: img.src, prefix: 'cdc' })
          .then((res) => {
            if (res.status == 200) {
              this.graphImage = res.url

              this.metaDesc =
                this.card.title +
                ' SX Value $' +
                this.slabstoxValue +
                ' Card Cost Change $' +
                this.cardGraph.dollar_diff +
                ' ' +
                this.cardGraph.pert_diff +
                '% Slab Image ' +
                this.card.cardImage +
                ' Slab Sales Graph ' +
                this.graphImage
            }
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.listing-lebron{
      padding: 0 25px;
}
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
.form_column input {
  width: 1000%;
  background: #39414a;
  border: 0px;
  color: #ffffff;
  font-size: 11px;
  letter-spacing: 2px;
  line-height: 20px;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  margin: 0px 20px;
  border-bottom: 1px solid #fff !important;
  border-radius: 0;
  &:focus {
    box-shadow: none;
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
  bottom: 0px;
  width: 92%;
}
.add-my-port1 {
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
  bottom: 35px;
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
  bottom: 70px;
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
    .add-my-port1,
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
      cursor: pointer;
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
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
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
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  .slab_graph {
    width: 80%;
    @media (max-width: 767px) {
      width: 100%;
    }
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
.slab_image_canvas {
  position: absolute;
  left: 20px;
}
.sale-h-out {
  padding: 0 20px;
  table {
    margin: 0;
    color: #edecec;
    thead {
      border: 0 !important;
    }
    tbody {
      td {
        border: 0;
      }
    }
  }
  @media (max-width: 768px) {
    padding: 0;
    font-size: 10px;
  }
}
@media (max-width: 991px) {
  .listing-lebron{
        padding: 0 15px
  }
  .headwrapper .card-body .image-conatiner {
    text-align: center;
    padding: 20px 0 113px 0;
  }
  .listing-lebron .column_one .image-conatiner img {
    position: relative;
    left: 0;
    top: 0;
    transform: translate(0px, 0px);
  }
  .listing-lebron .column_graph_sales_stats {
    padding-right: 15px !important;
  }
  .t-p-5 {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (max-width: 767px) {
  .pr-0 {
    padding-right: 15px !important;
  }
}
// .grade-image-text {
//   position: absolute;
//   bottom: 140px;
//   left: 0;
//   z-index: 9;
//   border: 1px solid #1ce783;
//   font-family: 'NexaBold', Helvetica, Arial, sans-serif;
//   font-weight: 400;
//   border-radius: 2px;
//   color: #000;
//   background: #1ce783;
//   padding: 7px 12px 5px 12px;
//   width: 85px;
//   text-align: center;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   margin-right: 2px;
//   font-style: italic;
//   font-size: 12px;
//   line-height: 1;
// }
</style>