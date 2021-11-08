<template>
  <div class="col-md-12 col-sm-12 dashboard_page">
    <div class="row">
      <div class="col-md-12 col-sm-12 t-p-5 stoxticker_listing-outer">
        <div class="card stoxticker_page stoxticker_listing analytics_page">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn ">SX STOXTICKER</button>
              <span
                class="tooltip-text d-inline"
                v-b-tooltip.bottomleft
                title="Similar to the New York Stock Exchange, our StoxTicker allows you tosee a running list of cards from all sports, including their respective values. If the card is in green, it’s trending up since the most recent sale. If it is in red, it’s trending down."
                >?</span
              >
              <span class="float-right share-lk-top sb-data-values-out">
                <span class="share-icon si-white">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
                </span>
                <div class="share-all-outer" style="top: 19px">
                  <ul>
                    <li style="margin: 0">
                      <a
                        :href="
                          'https://www.facebook.com/sharer/sharer.php?u=' +
                          encodeURI(sxStoxtickerUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0">
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(sxStoxtickerUrl) +
                          '&text=StoxTicker@' +
                          (stoxtickerData.sale ? stoxtickerData.sale : '')
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0">
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(sxStoxtickerUrl) +
                          '&description=' +
                          encodeURI('Buy & Sell Sports Cards Online')
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li style="margin: 0">
                      <a
                        :href="
                          'https://www.linkedin.com/shareArticle?mini=true&url=' +
                          encodeURI(sxStoxtickerUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
              </span>
            </h5>
            <ul>
              <li v-for="sport in attributes.sport" :key="sport">
                <h3 class="h3-title">{{sport}}</h3>

                <marquee-text
                  :duration="30"
                  :paused="paused"
                  :key="'soldListing' + sport + 'MarqueeKey'"
                  :v-if="soldListing[sport] != 0"
                >
                  <div
                    
                    @mouseenter="paused = !paused"
                    @mouseleave="paused = false"
                    v-for="(value,key) in soldListing"
                    :key="key"                    
                  >
                  <div v-if="key == sport">
                    <template v-for="list in value">
                      <h4>
                        <nuxt-link
                          class="sx-stox-card-link"
                          :to="'/card-data/?id=' + list.card.id"
                          :class="
                            list.slab_sold_flag == true
                              ? 'listing-rise'
                              : 'listing-fall'
                          "
                          >{{ list.card.title }} - ${{ list.sold_price }}
                        </nuxt-link>
                        &nbsp;&nbsp;
                      </h4>
                    </template>
                  </div>
                  </div>
                </marquee-text>

                <marquee-text
                  :duration="30"
                  :paused="paused"
                  :repeat="1"
                  v-if="soldListing.basketball == 0"
                >
                  <div
                    @mouseenter="paused = !paused"
                    @mouseleave="paused = false"
                  >
                    <h4 style="padding: 0 50px">No recently sold listings.</h4>
                  </div>
                </marquee-text>
              </li>
            </ul>
          </div>
        </div>
        <div class="social_share ss-h4" style="margin-bottom: 0;">
            <h4>
              <a class="embed-link" href="#" @click="embedSellsCode()"
                >EMBED CODE </>
              </a>
            </h4>
          </div>

          <b-modal id="embedSellsCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="http://pro.slabstox.com/stox-feed" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea
            >
          </p>
        </b-modal>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-sm-12 t-p-5 dash-featured">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn ">SX Featured Slabs</button>
              <span
                class="tooltip-text mx-2"
                v-b-tooltip.bottomleft
                title="Chosen on a daily basis by the SlabStox team, these are theSlabs to watch and track, due to recent performance or market trends."
                >?</span
              >
              <nuxt-link class="card-link float-right" to="/trenders">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <div class="dataloader" v-if="requestInProcessFeatured">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <div
              class="featured-listing-outer"
              :style="'height:' + featureHeight + ';'"
            >
              <overlay-scrollbars>
                <ul
                  class="my-card-listing featured-listing"
                  :style="'height:' + featureHeight + ';'"
                >
                  <CardSlabItem
                    v-for="item in featuredListingItems"
                    :key="item.id"
                    :itemdata="item"
                    :activeSt="
                      item.id == cardActiveId ? !cardsActive : cardsActive
                    "
                    @toggleCardActive="toggleCardActive"
                    @updateGraph="updateGraph"
                  />
                </ul>
              </overlay-scrollbars>
            </div>
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
              <div class="fg-slabbstox-ticker float-right">
                <nuxt-link class="card-link" to="/stoxticker">
                  Get the Ticker
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </nuxt-link>

                <button class="theme-btn card-btn  btn-sxvalue">
                  Slabstox ${{ stoxtickerData.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </button>
              </div>
            </h4>
            <h5 class="card-title">
              <button
                :class="
                  (sxIcon && sxIcon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn  dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="sxIcon && sxIcon !== undefined"
                  :icon="['fas', 'long-arrow-alt-' + sxIcon]"
                />&nbsp;
                <span class="g-dollar-d-val"> ${{ doller_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              </button>
              <button
                :class="
                  (sxIcon && sxIcon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn  dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="sxIcon && sxIcon !== undefined"
                  :icon="['fas', 'long-arrow-alt-' + sxIcon]"
                />&nbsp;{{ perc_diff }}%
              </button>

              <button
                :class="
                  (sxIcon1d && sxIcon1d == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn  dashboard-apex-top-1d'
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="sxIcon1d && sxIcon1d !== undefined"
                  :icon="['fas', 'long-arrow-alt-' + sxIcon1d]"
                />&nbsp;
                <span class="g-dollar-d-val"> ${{ doller_diff1d }}</span>
              </button>
              <button
                :class="
                  (sxIcon1d && sxIcon1d == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn  dashboard-apex-top-1d'
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="sxIcon1d && sxIcon1d !== undefined"
                  :icon="['fas', 'long-arrow-alt-' + sxIcon1d]"
                />&nbsp;{{ perc_diff1d }}%
              </button>

              <span class="card-link" v-b-modal.openSeeProblemPopup>
                Export Data
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
            </h5>
            <div class="dashboard-apex-top">
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
                  @click="updateGraph1d(2, 1)"
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
                Last Updated - {{ last_timestamp ? last_timestamp : 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-4 t-p-5 dash-live-auction">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn ">Top Live Auctions</button>
              <nuxt-link class="card-link float-right" to="/live-auctions">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="liveAuction.length == 0">
              <span>There are no listings here.</span>
            </p>

            <span
              class="card-text-link dash-list"
              v-for="item in liveAuction"
              :key="item.id"
            >
              <span class="card-text-s">
                <nuxt-link
                  class=""
                  :to="'/product?id=' + item.id + '&slag=' + item.title"
                  :title="item.title"
                >
                  {{ trimString(item.title) }}
                </nuxt-link>
              </span>
              <nuxt-link
                class="price-link"
                :to="'/product?id=' + item.id + '&slag=' + item.title"
                :title="item.title"
              >
                SX $:{{ item.sx_value }}
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-lg-4 t-p-5 dash-watchlist">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn ">Wishlist</button>
              <nuxt-link
                class="card-link float-right"
                to="/my-portfolio"
                v-if="user != null && user.full_name != null"
              >
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="watchlist.length == 0">
              <span>There are no slabs here.</span>
            </p>
            <span
              class="card-text-link dash-list"
              v-for="item in watchlist"
              :key="item.id"
            >
              <span class="card-text-s">
                <nuxt-link :to="'/card-data?id=' + item.id" :title="item.title">
                  {{ trimString(item.title) }}
                </nuxt-link>
              </span>

              <nuxt-link
                class="price-link"
                :to="'/card-data?id=' + item.id"
                :title="item.title"
                >${{ item.price }}
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-lg-4 t-p-5 dash-trenders">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn ">Portfolio</button>
              <nuxt-link
                class="card-link float-right"
                to="/my-portfolio"
                v-if="user != null && user.full_name != null"
              >
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p class="card-text dash-no-cards" v-if="ternder.length == 0">
              <span>There are no slabs here.</span>
            </p>
            <span
              class="card-text-link dash-list"
              v-for="(item, index) in ternder"
              :key="item.id"
            >
              <span class="card-text-s">
                <nuxt-link :to="'/card-data?id=' + item.id" :title="item.title">
                  {{ index + 1 }}. {{ trimString(item.title) }}
                </nuxt-link>
              </span>

              <nuxt-link
                class="price-link"
                :to="'/card-data?id=' + item.id"
                :title="item.title"
              >
                ${{ item.price }}
              </nuxt-link>
            </span>
          </div>
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

        <span class="g-sales-diff" v-if="this.showalldGraph == true"
          >Price Change ${{ doller_diff }}</span
        >
        <span class="g-sales-diff" v-if="this.show1dGraph == true"
          >Price Change ${{ doller_diff1d }}</span
        >
        &nbsp;&nbsp;
        <span class="g-sales-pert" v-if="this.showalldGraph == true"
          >Percentage Change {{ perc_diff }}%</span
        >
        <span class="g-sales-pert" v-if="this.show1dGraph == true"
          >Percentage Change {{ perc_diff1d }}%</span
        >
        &nbsp;&nbsp;

        <span class="g-image-link"></span>&nbsp;&nbsp;

        <span class="slab-image-link"></span>
      </div>

      <div class="shar-text">Share Graphics</div>
      <div class="g-img-full" id="g-img-full">
        <img src="" class="slab_image" alt="" crossorigin="anonymous" />
        <canvas class="slab_image_canvas"></canvas>
        <img
          :src="graphImage"
          alt=""
          class="slab_graph"
          v-if="this.showalldGraph == true"
        />
        <img
          :src="graphImage1d"
          v-if="this.show1dGraph == true"
          alt=""
          class="slab_graph"
        />
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
import { BASE_URL } from '../constants/keys'
import MarqueeText from 'vue-marquee-text-component'
import $ from 'jquery'
import { mapGetters } from 'vuex'
import { FILTERS } from '../constants/advance_search_filter'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  // auth: 'guest',
  head() {
    return {
      title: 'Dashboard - SlabStox',
      meta: [
        {
          hid: 'dashboard',
          name: 'Dashboard - SlabStox',
          content: 'Check SlabStox Featured Slabs',
        },
        { property: 'og:title', content: 'Check Slabstox Featured Slabs' },
        { property: 'og:image', content: this.logo },
        {
          property: 'og:description',
          content:
            'StoxTicker@' +
            (this.stoxtickerData.sale
              ? this.stoxtickerData.sale
              : ''),
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
    this.getSoldListing()
    var currentHref = location.href
    this.sxStoxtickerUrl = currentHref.replace('dashboard', 'stox-feed')
  },
  updated() {
    this.featureHeight =
      $('.featured-listing .my-card').outerHeight() + 10 + 'px'
  },
  components: {
    CardListItem,
    MarqueeText,
    CardSlabItem,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      paused: false,
      sxStoxtickerUrl: '',
      soldListing: '',
      soldListingbasketballMarqueeKey: 0,
      soldListingfootballMarqueeKey: 0,
      soldListingbaseballMarqueeKey: 0,
      soldListingsoccerMarqueeKey: 0,
      soldListingpokemonMarqueeKey: 0,
      soldListinghockeyMarqueeKey: 0,
      featureHeight: '400px',
      cardsActive: false,
      cardActiveId: 0,
      cardActive1dId: 0,
      cardActiveTitle: '',
      featuredListingItems: [],
      requestInProcessFeatured: false,
      logo: null,
      baseUrl: BASE_URL,
      graphImage: '',
      graphImage1d: '',
      graphImageBase: '',
      cardImage: '',
      liveAuction: [],
      ternder: [],
      watchlist: [],
      activeDaysGraph: 2,
      graphDataEmpty: false,
      dialogVisible: false,
      perc_diff: 0,
      doller_diff: 0,
      perc_diff1d: 0,
      doller_diff1d: 0,
      total_sales: 0,
      last_timestamp: 0,
      keyCount: 0,
      sxIcon: '',
      sxIcon1d: '',
      show1dGraph: false,
      showalldGraph: true,
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
      filters: { ...FILTERS },
    }
  },
  computed:{
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes'
    })
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
        var rand = '?' + Math.random()
        self.cardImage =
          $('.my-card.active .image-container img').attr('src') + rand
        $('.g-img-full .slab_image, .g-img-full .slab_image_dup').attr(
          'src',
          self.cardImage
        )

        if (self.graphImage != '' && this.showalldGraph == true) {
          $('.g-main-text .g-image-link').text('Graph URL ' + self.graphImage)
        }
        if (self.graphImage1d != '' && this.show1dGraph == true) {
          $('.g-main-text .g-image-link').text('Graph URL ' + self.graphImage1d)
        }
        if (self.cardImage != '') {
          $('.g-main-text .slab-image-link').text('Slab URL ' + self.cardImage)
        }
      }
    },
  },
  methods: {
    
    downloadImage() {
      if (this.showalldGraph == true) {
        $('.dashboard-apex-top-alld .apexcharts-toolbar .exportPNG').click()
      } else {
        $('.dashboard-apex-top-1d .apexcharts-toolbar .exportPNG').click()
      }
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

                this.updateGraph(90, 1)
              }
            }
          })
      } catch (err) {
        this.requestInProcessFeatured = false
        // console.log(err)
        this.$toast.error(
          'There has been an error featured slabs. Please refresh your page.',
          { timeOut: 10000 }
        )
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
        // console.log(err)
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
        // console.log(err)
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
        // console.log(err)
      }
    },
    getStoxtickerData() {
      try {
        this.$axios.$get('get-stoxticker-data').then((res) => {
          if (res.status == 200) {
            this.stoxtickerData = res.data
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    updateGraph1d(days = 2, intialTime = 0) {
      if (intialTime == 1 && this.cardActive1dId != this.cardActiveId) {
        try {
          this.cardActive1dId = this.cardActiveId
          // this.graph1dInitialized = true
          this.graphDataEmpty = false
          this.activeDaysGraph = days
          this.$axios
            .$get(`get-dashboard-graph/${days}/${this.cardActiveId}`)
            .then((res) => {
              if (res.status == 200) {
                this.perc_diff1d = res.data.perc_diff
                this.doller_diff1d = String(res.data.doller_diff)
                this.sxIcon1d = res.data.sx_icon
                this.show1dGraph = true
                this.showalldGraph = false
                $('.dashboard-apex-top-1d').show()
                $('.dashboard-apex-top-alld').hide()

                this.series1d = [{ name: 'SX', data: res.data.values }]
                this.salesQty1d = res.data.qty

                this.chartOptions1d = {
                  xaxis: {
                    tickAmount: 24,
                    categories: res.data.labels,
                    type: 'category',
                    tickPlacement: 'on',
                    labels: {
                      style: {
                        colors: '#edecec',
                        fontSize: '10px',
                        fontFamily: 'NexaBold',
                      },
                      formatter: function (value, ind) {
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
                  tooltip: {
                    // enabled: true,
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
              }
            })
        } catch (error) {
          // console.log(error)
          this.$toast.error(
            'There has been an error loading graphs. Please refresh your page.',
            { timeOut: 10000 }
          )
        }
      } else {
        this.graphDataEmpty = false
        this.show1dGraph = true
        this.showalldGraph = false
        $('.dashboard-apex-top-1d').show()
        $('.dashboard-apex-top-alld').hide()
        this.activeDaysGraph = days
      }
    },
    updateGraph(days = 90, intialTime = 0) {
      try {
        this.graphDataEmpty = false
        this.activeDaysGraph = days
        this.$axios
          .$get(`get-dashboard-graph/${days}/${this.cardActiveId}`)
          .then((res) => {
            if (res.status == 200) {
              this.perc_diff = res.data.perc_diff
              this.doller_diff = String(res.data.doller_diff)
              this.sxIcon = res.data.sx_icon

              if (days == 90) {
                this.last_timestamp = res.data.last_timestamp
              }

              this.show1dGraph = false
              this.showalldGraph = true
              $('.dashboard-apex-top-alld').show()
              $('.dashboard-apex-top-1d').hide()
              this.series = [{ name: 'SX', data: res.data.values }]
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
            }
          })
      } catch (error) {
        // console.log(error)
        this.$toast.error(
          'There has been an error loading graphs. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    generateImageOfGraph(days) {
      if (days == 'all') {
        var chartInstance = this.$refs.dashChart.chart.dataURI()
        var prefix = 'cdc'
      } else {
        var chartInstance = this.$refs.dashChart1d.chart.dataURI()
        var prefix = 'cdc1d'
      }

      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.graphImageBase = img.src
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
    getSoldListing() {
      try {
        this.$axios.$get('stoxticker/sold-listings').then((res) => {
          if (res.status == 200) {
            this.soldListing = res.data
            //below keys added so the marque plugin can update the content when data comes
            this.soldListingbasketballMarqueeKey = 1
            this.soldListingfootballMarqueeKey = 2
            this.soldListingbaseballMarqueeKey = 3
            this.soldListingsoccerMarqueeKey = 4
            this.soldListingpokemonMarqueeKey = 5
            this.soldListinghockeyMarqueeKey = 6
          } else {
            this.$toast.error(
              'There has been an error fetching SX Stoxticker. Please refresh your page.',
              { timeOut: 10000 }
            )
          }
        })
      } catch (error) {
        this.$toast.error(
          'There has been an error fetching SX Stoxticker. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    embedSellsCode() {
      this.$bvModal.show('embedSellsCode')
    },
  },
}
</script>

<style lang="scss" scoped>
.t-p-5 {
  padding: 5px;
}
.dashboard_page {
  padding-right: 25px !important;
  padding-left: 25px !important;
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
    color: $theme-off-white;
    &:hover {
      color: $theme-off-white;
    }
  }
  .price-link {
    color: #1ce783;
    float: right;
    width: 110px;
    &:hover {
      color: #1ce783;
    }
  }
  .card-text-s {
    width: calc(100% - 110px);
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
    padding-left: 2vw !important;
    padding-right: 2vw !important;
    width: 20% !important;
    margin: 0;
    padding-top: 25px;
    padding-bottom: 25px;
    position: relative;

    @media (max-width: 1340px) {
      padding-left: 1.4vw !important;
      padding-right: 1.4vw !important;
    }

    @media (max-width: 1200px) {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }
  li.my-card.active {
    background: #39414a;
    margin-right: -2px;
  }
}
.featured-listing-outer {
  margin: 0 -15px;
}
@media (max-width: 1200px) {
  .featured-listing-outer {
    .featured-listing {
      min-width: 936px;
    }
  }
  html body main .featured-listing-outer {
    .featured-listing {
      margin: 0 0 0 -2px !important;
    }
  }
}
@media (min-width: 1201px) {
  html body main .featured-listing-outer {
    .featured-listing {
      margin: 0 !important;
    }
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
  .slab_image,
  .slab_image_dup {
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
.slab_image_canvas {
  position: absolute;
  left: 20px;
}
@media (max-width: 768px) {
  .fg-title {
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }
  .fg-slabbstox-ticker {
    margin-bottom: 5px;
    text-align: right;
    width: 100%;
    .card-link {
      margin-bottom: 5px !important;
      display: inline-block !important;
    }
  }
}
</style>

