<template>
  <div class="col-md-12 col-sm-12 headtohead_serach-out">
    <div class="row headtohead_serach sec-h2h-out" style="display: none">
      <div class="col-md-6 col-sm-6">
        <div class="dashboard-nav-bar clearfix">
          <div class="nav-bar-form">
            <div class="nav-bar-form-input">
              <input
                @keyup="resultSelect('card_one')"
                class="form-control"
                v-model="card_one.keyword"
                type="text"
                aria-label="Search"
              />
              <div
                class="autoselected"
                v-if="autoselected.one.open && card_one.items.length > 0"
              >
                <ul>
                  <li
                    v-for="(item, key) in card_one.items"
                    :key="'card-one-item-' + item.id"
                    :class="{ selected: resultIsActive(key, 'card_one') }"
                    @click="selectItemForCard(item, 'card_one')"
                  >
                    {{ item.title }}
                  </li>
                </ul>
              </div>
            </div>
            <button
              type="button"
              @click="compareSlab()"
              class="nav-bar-search-btn"
            >
              Search Stox
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-sm-6" v-if="card_one.selectedCard != null">
        <div class="dashboard-nav-bar clearfix">
          <div class="nav-bar-form">
            <div class="nav-bar-form-input">
              <input
                @keyup="resultSelect('card_two')"
                class="form-control"
                v-model="card_two.keyword"
                type="text"
                aria-label="Search"
              />
              <div
                class="autoselected"
                v-if="autoselected.two.open && card_two.items.length > 0"
              >
                <ul>
                  <li
                    v-for="(item, key) in card_two.items"
                    :key="'card-two-item-' + item.id"
                    :class="{ selected: resultIsActive(key, 'card_two') }"
                    @click="selectItemForCard(item, 'card_two')"
                  >
                    {{ item.title }}
                  </li>
                </ul>
              </div>
            </div>
            <button
              type="button"
              @click="compareSlab()"
              class="nav-bar-search-btn"
            >
              Search Stox
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row headtohead_serach first-h2h-out">
      <div class="t-p-5 first-slab-out">
        <div class="dashboard-nav-bar">
          <div class="nav-bar-form">
            <div class="nav-bar-form-input">
              <p class="slab-title-step">Step 1</p>
              <p class="slab-title">Select your first slab</p>
              <input
                @keyup="resultSelect('card_one')"
                class="form-control"
                v-model="card_one.keyword"
                type="text"
                aria-label="Search"
                placeholder="Search"
              />
              <div
                class="autoselected"
                v-if="autoselected.one.open && card_one.items.length > 0"
              >
                <ul>
                  <li
                    v-for="(item, key) in card_one.items"
                    :key="'card-one-item-' + item.id"
                    :class="{ selected: resultIsActive(key, 'card_one') }"
                    @click="selectItemForCard(item, 'card_one')"
                  >
                    {{ item.title }}
                  </li>
                  <li v-if="card_one.items.length == 0">
                    No results found for this search
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="t-p-5 text-center vs-slab-out">
        <span class="vs-between-out">VS</span>
      </div>
      <div class="t-p-5 comp-slab-out">
        <div class="dashboard-nav-bar">
          <div class="nav-bar-form">
            <div class="nav-bar-form-input">
              <p class="slab-title-step">Step 2</p>
              <p class="slab-title">Select your second slab</p>
              <input
                @keyup="resultSelect('card_two')"
                class="form-control"
                v-model="card_two.keyword"
                type="text"
                aria-label="Search"
                placeholder="Search"
              />
              <div
                class="autoselected"
                v-if="autoselected.two.open && card_two.items.length > 0"
              >
                <ul>
                  <li
                    v-for="(item, key) in card_two.items"
                    :key="'card-two-item-' + item.id"
                    :class="{ selected: resultIsActive(key, 'card_two') }"
                    @click="selectItemForCard(item, 'card_two')"
                  >
                    {{ item.title }}
                  </li>
                  <li v-if="card_two.items.length == 0">
                    No results found for this search
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="t-p-5 butt-slab-out">
        <button @click="compareSlab()" class="my-card-view-listing2">
          Compare slabs
          <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
        </button>
      </div>
    </div>
    <div class="row headwrapper" v-if="showSelectedCards">
      <div class="col-md-4 col-sm-4 t-p-5 product-details-col-md-4 column_one">
        <div class="card" v-if="selectedCardOne != null">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">
              {{
                selectedCardOne.title != ''
                  ? selectedCardOne.title
                  : selectedCardOne.player +
                    ' ' +
                    selectedCardOne.year +
                    ' ' +
                    selectedCardOne.brand +
                    ' ' +
                    selectedCardOne.card +
                    ' ' +
                    selectedCardOne.variation
              }}
            </h5>
            <ul class="labels">
              <!-- <li class="orange">{{ selectedCardOne.brand }}</li> -->

              <li v-if="selectedCardOne.rc == 'yes'" class="grey">Rookie</li>
              <li class="green">{{ selectedCardOne.brand }}</li>
              <li v-if="selectedCardOne.grade != null" class="yellow">
                {{ selectedCardOne.grade }}
              </li>
            </ul>
            <div class="image-conatiner">
              <img
                :src="selectedCardOne.cardImage"
                :alt="selectedCardOne.title"
              />
              <!-- <span
                v-if="selectedCardOne.grade != null"
                class="grade-image-text"
                >{{ selectedCardOne.grade }}</span
              > -->
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-md-4 column_two d-none">
        <div class="row">
          <div class="col-md-12">
            <div class="vs_wrap">
              <div class="team_vs">
                <div class="row">
                  <div class="vs_tip">VS</div>
                  <div class="col-md-6 left">
                    <h3>
                      {{
                        selectedCardOne.title != ''
                          ? selectedCardOne.title
                          : selectedCardOne.player +
                            ' ' +
                            selectedCardOne.year +
                            ' ' +
                            selectedCardOne.brand +
                            ' ' +
                            selectedCardOne.card +
                            ' ' +
                            selectedCardOne.variation
                      }}
                    </h3>
                  </div>
                  <div class="col-md-6 right">
                    <h3>
                      {{
                        selectedCardTwo.title != ''
                          ? selectedCardTwo.title
                          : selectedCardTwo.player +
                            ' ' +
                            selectedCardTwo.year +
                            ' ' +
                            selectedCardTwo.brand +
                            ' ' +
                            selectedCardTwo.card +
                            ' ' +
                            selectedCardTwo.variation
                      }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div
        class="col-md-4 col-sm-4 t-p-5 product-details-col-md-4 column_three visible-mobile"
      >
        <div class="card" v-if="selectedCardTwo != null">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">
              {{
                selectedCardTwo.title != ''
                  ? selectedCardTwo.title
                  : selectedCardTwo.player +
                    ' ' +
                    selectedCardTwo.year +
                    ' ' +
                    selectedCardTwo.brand +
                    ' ' +
                    selectedCardTwo.card +
                    ' ' +
                    selectedCardTwo.variation
              }}
            </h5>
            <ul class="labels">
              <!-- <li class="orange">{{ selectedCardTwo.brand }}</li> -->
              <li v-if="selectedCardTwo.rc == 'yes'" class="grey">Rookie</li>
              <li class="green">{{ selectedCardTwo.brand }}</li>
              <li v-if="selectedCardTwo.grade != null" class="yellow">
                {{ selectedCardTwo.grade }}
              </li>
            </ul>
            <div class="image-conatiner">
              <img
                :src="selectedCardTwo.cardImage"
                :alt="selectedCardTwo.title"
              />
              <!-- <span
                v-if="selectedCardTwo.grade != null"
                class="grade-image-text"
                >{{ selectedCardTwo.grade }}</span
              > -->
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 column_two">
        <div class="row">
          <div class="col-md-12">
            <div class="vs_wrap">
              <div class="team_vs">
                <div class="row">
                  <div class="vs_tip">VS</div>
                  <div class="col-md-6 left">
                    <h3>
                      {{
                        selectedCardOne.title != ''
                          ? selectedCardOne.title
                          : selectedCardOne.player +
                            ' ' +
                            selectedCardOne.year +
                            ' ' +
                            selectedCardOne.brand +
                            ' ' +
                            selectedCardOne.card +
                            ' ' +
                            selectedCardOne.variation
                      }}
                    </h3>
                  </div>
                  <div class="col-md-6 right">
                    <h3>
                      {{
                        selectedCardTwo.title != ''
                          ? selectedCardTwo.title
                          : selectedCardTwo.player +
                            ' ' +
                            selectedCardTwo.year +
                            ' ' +
                            selectedCardTwo.brand +
                            ' ' +
                            selectedCardTwo.card +
                            ' ' +
                            selectedCardTwo.variation
                      }}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="sx_value">
                <div class="row">
                  <div class="col-md-6 left">
                    <h3 class="dashboard-apex-top-alld">
                      SX: ${{ card_one.sx ? card_one.sx : 0 }}
                    </h3>
                    <h3 class="dashboard-apex-top-1d">
                      SX: ${{ card_one.sx1d ? card_one.sx1d : 0 }}
                    </h3>
                  </div>
                  <div class="col-md-6 right">
                    <h3 class="dashboard-apex-top-alld">
                      SX: ${{ card_two.sx ? card_two.sx : 0 }}
                    </h3>
                    <h3 class="dashboard-apex-top-1d">
                      SX: ${{ card_two.sx1d ? card_two.sx1d : 0 }}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="row headtohead_graph">
                <div class="col-md-12 col-sm-12 t-p-5">
                  <div class="card">
                    <div class="card-body dashboard-graph pt-0 pb-0">
                      <div class="dashboard-apex-top">
                        <div
                          class="dashboard-apex-top-1d"
                          style="display: none"
                        >
                          <VueApexCharts
                            ref="h2hDataChart1d"
                            type="area"
                            height="350"
                            :options="chartOptions1d"
                            :series="series1d"
                          ></VueApexCharts>
                        </div>
                        <div class="dashboard-apex-top-alld">
                          <VueApexCharts
                            ref="h2hDataChart"
                            type="area"
                            height="350"
                            :options="chartOptions"
                            :series="series"
                          ></VueApexCharts>
                        </div>
                      </div>
                      <div class="dashboard-graph-footer clearfix">
                        <ul class="dashboard-graph-footer-month-filter">
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 2 ? 'active' : '')
                            "
                            @click="getGraphData1d(2, 1)"
                          >
                            1D
                          </li>
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 7 ? 'active' : '')
                            "
                            @click="getGraphData(7)"
                          >
                            1W
                          </li>
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 30 ? 'active' : '')
                            "
                            @click="getGraphData(30)"
                          >
                            1M
                          </li>
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 90 ? 'active' : '')
                            "
                            @click="getGraphData(90)"
                          >
                            3M
                          </li>
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 180 ? 'active' : '')
                            "
                            @click="getGraphData(180)"
                          >
                            6M
                          </li>
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 365 ? 'active' : '')
                            "
                            @click="getGraphData(365)"
                          >
                            1Y
                          </li>
                          <li
                            :class="
                              'dashboard-graph-footer-month-filter-item ' +
                              (activeDaysGraph == 1825 ? 'active' : '')
                            "
                            @click="getGraphData(1825)"
                          >
                            5Y
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 stat col-left">
            <div class="stat_box">
              <h3>stats</h3>
              <ul>
                <li>
                  SlabStox Value: ${{
                    card_one.slabstoxvalue1 ? card_one.slabstoxvalue1 : 0
                  }}
                </li>
                <li>Overall Rank: {{ card_one.rank }}</li>
                <li>
                  Last Sale Price: ${{
                    card_one.last_sale ? card_one.last_sale.cost : 0
                  }}
                </li>
                <li>
                  Last Sale Date:{{
                    card_one.last_sale
                      ? this.$moment(card_one.last_sale.timestamp).format(
                          'M/D/Y'
                        )
                      : 'N/A'
                  }}
                </li>
                <li>
                  High Sale: ${{
                    card_one.high_sale ? card_one.high_sale.cost : 0
                  }}
                  ({{
                    card_one.high_sale
                      ? this.$moment(card_one.high_sale.timestamp).format(
                          'M/D/Y'
                        )
                      : 'N/A'
                  }})
                </li>
                <li>
                  Low Sale: ${{
                    card_one.low_sale ? card_one.low_sale.cost : 0
                  }}
                  ({{
                    card_one.low_sale
                      ? this.$moment(card_one.low_sale.timestamp).format(
                          'M/D/Y'
                        )
                      : 'N/A'
                  }})
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 stat col-right">
            <div class="stat_box">
              <h3>stats</h3>
              <ul>
                <li>
                  SlabStox Value: ${{
                    card_two.slabstoxvalue2 ? card_two.slabstoxvalue2 : 0
                  }}
                </li>
                <li>Overall Rank: {{ card_two.rank }}</li>
                <li>
                  Last Sale Price: ${{
                    card_two.last_sale ? card_two.last_sale.cost : 0
                  }}
                </li>
                <li>
                  Last Sale Date:
                  {{
                    card_two.last_sale
                      ? this.$moment(card_two.last_sale.timestamp).format(
                          'M/D/Y'
                        )
                      : 'N/A'
                  }}
                </li>
                <li>
                  High Sale: ${{
                    card_two.high_sale ? card_two.high_sale.cost : 0
                  }}
                  ({{
                    card_two.high_sale
                      ? this.$moment(card_two.high_sale.timestamp).format(
                          'M/D/Y'
                        )
                      : 'N/A'
                  }})
                </li>
                <li>
                  Low Sale: ${{
                    card_two.low_sale ? card_two.low_sale.cost : 0
                  }}
                  ({{
                    card_two.low_sale
                      ? this.$moment(card_two.low_sale.timestamp).format(
                          'M/D/Y'
                        )
                      : 'N/A'
                  }})
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-md-4 col-sm-4 t-p-5 product-details-col-md-4 column_three visible-not-mobile"
      >
        <div class="card" v-if="selectedCardTwo != null">
          <div class="card-body product-image-card">
            <h5 class="card-title product-title">
              {{
                selectedCardTwo.title != ''
                  ? selectedCardTwo.title
                  : selectedCardTwo.player +
                    ' ' +
                    selectedCardTwo.year +
                    ' ' +
                    selectedCardTwo.brand +
                    ' ' +
                    selectedCardTwo.card +
                    ' ' +
                    selectedCardTwo.variation
              }}
            </h5>
            <ul class="labels">
              <!-- <li class="orange">{{ selectedCardTwo.brand }}</li> -->
              <li v-if="selectedCardTwo.rc == 'yes'" class="grey">Rookie</li>
              <li class="green">{{ selectedCardTwo.brand }}</li>
              <li v-if="selectedCardTwo.grade != null" class="yellow">
                {{ selectedCardTwo.grade }}
              </li>
            </ul>
            <div class="image-conatiner">
              <img
                :src="selectedCardTwo.cardImage"
                :alt="selectedCardTwo.title"
              />
              <!-- <span
                v-if="selectedCardTwo.grade != null"
                class="grade-image-text"
                >{{ selectedCardTwo.grade }}</span
              > -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row card-50-div"
      v-if="selectedCardOne != null && selectedCardTwo != null"
    >
      <div class="col-sm-12 col-md-6 card-50-first">
        <AvailableListing :cardId="selectedCardOne.id" />
      </div>
      <div class="col-sm-12 col-md-6">
        <AvailableListing :cardId="selectedCardTwo.id" />
      </div>
    </div>
    <div
      class="row popularpick"
      v-if="selectedCardOne == null && selectedCardTwo == null"
    >
      <div class="col-12 t-p-5">
        <div class="card no_bg">
          <div class="card-body">
            <h5 class="card-title">
              <button class="card-btn theme-btn" v-b-tooltip.right  title="Choose wisely. These Slabs are most frequently chosen by other SlabStoxPro users to compare inHead 2 Head mode.">Popular picks</button>
            </h5>
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing" v-if="popularCardsData.length > 0">
              <li
                class="my-card"
                v-for="itemdata of popularCardsData"
                :key="itemdata.id"
              >
                <h4 class="my-card-title" :title="itemdata.title">
                  {{
                    itemdata.title != ''
                      ? itemdata.title
                      : itemdata.player +
                        ' ' +
                        itemdata.year +
                        ' ' +
                        itemdata.brand +
                        ' ' +
                        itemdata.card +
                        ' ' +
                        itemdata.variation
                  }}
                </h4>
                <div class="image-container">
                  <img
                    class="card-image"
                    :title="itemdata.title"
                    :src="itemdata.cardImage"
                    :alt="itemdata.id"
                  />
                  <span v-if="itemdata.grade != null" class="grade-image-text">{{
        itemdata.grade
      }}</span>
                </div>
                <button
                  @click="addToHeadToHead(itemdata)"
                  class="my-card-view-listing"
                >
                  Add to Head<code>2</code>Head
                </button>
              </li>
            </ul>
            <div
              class="empty-result"
              v-if="popularCardsData.length == 0 && !requestInProcess"
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
import { mapGetters } from 'vuex'
import AvailableListing from '~/components/dashboard/AvailableListing'
import { FILTERS } from '../constants/advance_search_filter'
import $ from 'jquery'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Head 2 Head - SlabStox',
    }
  },
  mounted() {
    this.getPopularPick()
  },
  components: {
    AvailableListing,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  computed: {
    ...mapGetters({
      attributes: 'advancesearch/attributes',
    }),
  },
  data() {
    return {
      initGraphLabelLength: 0,
      activeDaysGraph: 90,
      keyword: null,
      showSelectedCards: false,
      selectedCardOne: null,
      selectedCardTwo: null,
      popularCardsData: [],
      card_one: {
        keyword: null,
        items: [],
        selectedCard: null,
        rank: null,
        last_sale: null,
        high_sale: null,
        low_sale: null,
      },
      card_two: {
        keyword: null,
        items: [],
        selectedCard: null,
        rank: null,
        last_sale: null,
        high_sale: null,
        low_sale: null,
      },
      show1dGraph: false,
      showalldGraph: true,
      graph1dInitialized: false,
      series: [
        {
          name: 'SX',
          data: [],
        },
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
          background: ['#e57c13', '#14f078'],
          zoom: {
            enabled: false,
          },
        },
        colors: ['#e57c13', '#14f078'],
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
      },
      series1d: [
        {
          name: 'SX',
          data: [],
        },
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
          background: ['#e57c13', '#14f078'],
          zoom: {
            enabled: false,
          },
        },
        colors: ['#e57c13', '#14f078'],
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
      },
      selectedAdvanceSearchModel: null,
      requestInProcess: false,
      autoselected: {
        one: {
          current: 0,
          open: false,
        },
        two: {
          current: 0,
          open: false,
        },
      },
    }
  },
  methods: {
    trimTitle(title) {
      if (title.length > 53) {
        title = title.substring(0, 53)
        title += '...'
        return title
      }
      return title
    },
    addToHeadToHead(itemdata) {
      if (this.card_one.selectedCard == null) {
        this.selectItemForCard(itemdata, 'card_one')
      } else if (
        this.card_one.selectedCard != null &&
        this.card_two.selectedCard == null
      ) {
        this.selectItemForCard(itemdata, 'card_two')
      }
    },
    compareSlab() {
      if (
        this.card_one.selectedCard != null &&
        this.card_two.selectedCard != null
      ) {
        this.selectedCardOne = this.card_one.selectedCard
        this.selectedCardTwo = this.card_two.selectedCard
        this.getGraphData(this.activeDaysGraph, 1)
        // this.getGraphData(2, 1)
        $('.sec-h2h-out').show()
        $('.first-h2h-out').hide()
        this.showSelectedCards = true
      } else {
        this.showSelectedCards = false
      }
    },
    searchNow(card) {
      this.selectedAdvanceSearchModel = card
      if (card == 'card_one') {
        this.autoselected.one.current = 0
        this.card_one.items = []
        this.card_one.filters = { ...FILTERS }
      } else {
        this.autoselected.two.current = 0
        this.card_two.items = []
        this.card_two.filters = { ...FILTERS }
      }

      this.searchCards()
    },
    update_index(e, index) {
      if (this.selectedAdvanceSearchModel == 'card_one') {
        this.card_one.filters[index] = e.target.value
      } else {
        this.card_two.filters[index] = e.target.value
      }
    },
    searchCards() {
      if (!this.requestInProcess) {
        try {
          // this.requestInProcess = true
          this.keyword =
            this.selectedAdvanceSearchModel == 'card_one'
              ? this.card_one.keyword
              : this.card_two.keyword
          if (this.keyword.length >= 3) {
            this.$axios
              .$post('search/get-smart-keyword-with-data', {
                search: this.keyword,
                take: 10,
              })
              .then((res) => {
                // this.requestInProcess = false
                if (res.status == 200) {
                  if (this.keyword == res.keyword) {
                    if (res.data != null && res.data.length > 0) {
                      if (this.selectedAdvanceSearchModel == 'card_one') {
                        this.card_one.items = res.data
                        this.autoselected.one.open = true
                      } else {
                        this.card_two.items = res.data
                        this.autoselected.two.open = true
                      }
                    } else {
                      if (this.selectedAdvanceSearchModel == 'card_one') {
                        this.card_one.items = []
                        this.autoselected.one.open = false
                      } else {
                        this.card_two.items = []
                        this.autoselected.two.open = false
                      }
                    }
                  }
                }
              })
              .catch((err) => {
                throw err
              })
          }
        } catch (err) {
          // this.requestInProcess = false
          if (this.selectedAdvanceSearchModel == 'card_one') {
            this.card_one.items = []
            this.autoselected.one.open = false
          } else {
            this.card_two.items = []
            this.autoselected.two.open = false
          }
          console.log(err)
        }
      }
    },
    resultUp(card) {
      if (card == 'card_one') {
        if (this.autoselected.one.current > 0) this.autoselected.one.current--
      } else {
        if (this.autoselected.two.current > 0) this.autoselected.two.current--
      }
    },
    resultDown(card) {
      if (card == 'card_one') {
        if (this.autoselected.one.current < this.card_one.items.length - 1)
          this.autoselected.one.current++
      } else {
        if (this.autoselected.two.current < this.card_two.items.length - 1)
          this.autoselected.two.current++
      }
    },
    resultIsActive(index, card) {
      if (card == 'card_one') {
        return index === this.autoselected.one.current
      } else {
        return index === this.autoselected.two.current
      }
    },
    selectItemForCard(item, card) {
      if (card == 'card_one') {
        this.card_one.selectedCard = item
        this.card_one.keyword =
          item.title != ''
            ? item.title
            : item.player +
              ' ' +
              item.year +
              ' ' +
              item.brand +
              ' ' +
              item.card +
              ' ' +
              item.variation
        this.card_one.rank = item.rank
        this.autoselected.one.open = false
      } else {
        this.card_two.selectedCard = item
        this.card_two.keyword =
          item.title != ''
            ? item.title
            : item.player +
              ' ' +
              item.year +
              ' ' +
              item.brand +
              ' ' +
              item.card +
              ' ' +
              item.variation
        this.card_two.rank = item.rank
        this.autoselected.two.open = false
      }
    },
    getGraphData(days = 90, intialTime = 0) {
      try {
        this.activeDaysGraph = days
        let cardIds =
          this.card_one.selectedCard.id + '|' + this.card_two.selectedCard.id
        this.$axios
          .$get('get-card-graph/' + cardIds + '/' + days)
          .then((res) => {
            if (res.status == 200) {
                       this.show1dGraph = false
              this.showalldGraph = true
              $('.dashboard-apex-top-alld').show()
              $('.dashboard-apex-top-1d').hide()

              this.series = [
                {
                  name: '<span class="sales-t1">SX</span>',
                  data: res.data.values1,
                },
                {
                  name: '<span class="sales-t2">SX</span>',
                  data: res.data.values2,
                },
              ]
              this.salesQty = [{ data: res.data.qty1 }, { data: res.data.qty2 }]
              this.chartOptions = {
                xaxis: {
                  // type: 'datetime',
                  // tickAmount: days == 2 ? 24 : 6,
                  categories: res.data.lable1,
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: '#edecec',
                      fontSize: '10px',
                      fontFamily: 'NexaBold',
                    },
                    formatter: (value, ind) => {
                      if (value == 'undefined') {
                        return 0
                      }
                      let valCheck = value
                      if (Number(value) === value && value % 1 !== 0) {
                        let valCheck = Number(value).toFixed(2)
                      }
                      return `$${valCheck}`
                    },
                  },
                },
                tooltip: {
                  // enabled: true,
                  // x: {
                  //   format: days == 2 ? 'MM/dd/yy HH:mm' : 'MM/dd/yy',
                  // },
                  y: {
                    formatter: (value, ind) => {
                      if (value == 'undefined') {
                        return 0
                      }
                      let lblStr = `$${value}`
                      if (typeof ind == 'object')
                        var salesQtyVal = this.salesQty[ind.seriesIndex]

                      let quantity = salesQtyVal.data[ind.dataPointIndex]

                      lblStr = `$${value} (${quantity})`
                      return lblStr
                    },
                  },
                },
              }

              this.initGraphLabel1Length = res.data.lable1.length

              this.card_one.sx = res.data.sx1
              this.card_two.sx = res.data.sx2

              if (intialTime == 1) {
                this.card_one.slabstoxvalue1 = res.data.slabstoxvalue1
                this.card_two.slabstoxvalue2 = res.data.slabstoxvalue2
                this.card_one.rank = res.data.rank1
                this.card_two.rank = res.data.rank2
                this.card_one.low_sale = res.data.low_sale1
                this.card_two.low_sale = res.data.low_sale2
                this.card_one.high_sale = res.data.high_sale1
                this.card_two.high_sale = res.data.high_sale2
                this.card_one.last_sale = res.data.last_sale1
                this.card_two.last_sale = res.data.last_sale2
              }
            } else {
              // this.$router.push('/404')
              this.$toast.error(
                'There has been an error loading graphs. Please refresh your page.',
                { timeOut: 10000 }
              )
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
    getGraphData1d(days = 2, intialTime = 0) {
      this.activeDaysGraph = days
      if (intialTime == 1 && this.graph1dInitialized == false) {
        try {
          let cardIds =
            this.card_one.selectedCard.id + '|' + this.card_two.selectedCard.id
          this.$axios
            .$get('get-card-graph/' + cardIds + '/' + days)
            .then((res) => {
              if (res.status == 200) {
                this.graph1dInitialized = true
                this.show1dGraph = true
                this.showalldGraph = false
                $('.dashboard-apex-top-1d').show()
                $('.dashboard-apex-top-alld').hide()

                this.series1d = [
                  {
                    name: '<span class="sales-t1">SX</span>',
                    data: res.data.values1,
                  },
                  {
                    name: '<span class="sales-t2">SX</span>',
                    data: res.data.values2,
                  },
                ]
                this.salesQty1d = [
                  { data: res.data.qty1 },
                  { data: res.data.qty2 },
                ]
                this.chartOptions1d = {
                  xaxis: {
                    // type:'category',
                    // tickAmount: days == 2 ? 24 : 6,
                    categories: res.data.lable1,
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
                        if (value == 'undefined') {
                          return 0
                        }
                        let valCheck = value
                        if (Number(value) === value && value % 1 !== 0) {
                          let valCheck = Number(value).toFixed(2)
                        }

                        return `$${valCheck}`
                      },
                    },
                  },
                  tooltip: {
                    // enabled: true,
                    x: {
                      formatter: (value, ind) => {
                        return res.data.lable1[ind.dataPointIndex]
                      },
                    },
                    y: {
                      formatter: (value, ind) => {
                        if (value == 'undefined') {
                          return 0
                        }
                        let lblStr = `$${value}`
                        if (typeof ind == 'object')
                          var salesQtyVal = this.salesQty1d[ind.seriesIndex]

                        let quantity = salesQtyVal.data[ind.dataPointIndex]
                        lblStr = `$${value} (${quantity})`
                        return lblStr
                      },
                    },
                  },
                }

                this.initGraphLabel1Length = res.data.lable1.length

                this.card_one.sx1d = res.data.sx1
                this.card_two.sx1d = res.data.sx2
              } else {
                // this.$router.push('/404')
                 this.$toast.error(
                'There has been an error loading graphs. Please refresh your page.',
                { timeOut: 10000 }
              )
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
        this.show1dGraph = true
        this.showalldGraph = false
        $('.dashboard-apex-top-1d').show()
        $('.dashboard-apex-top-alld').hide()
        this.activeDaysGraph = days
      }
    },
    resultSelect(card) {
      // if (this.autoselected.one.open || this.autoselected.two.open) {
      //   if (card == 'card_one') {
      //     this.card_one.selectedCard = this.card_one.items[
      //       this.autoselected.one.current
      //     ]
      //     this.autoselected.one.open = false
      //   } else {
      //     this.card_two.selectedCard = this.card_two.items[
      //       this.autoselected.two.current
      //     ]
      //     this.autoselected.two.open = false
      //   }
      // } else {
      // }
      this.searchNow(card)
    },
    getPopularPick() {
      if (!this.requestInProcess) {
        try {
          this.requestInProcess = true
          this.$axios
            .$post('search/popular-pick-cards', {
              take: 12,
            })
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                this.popularCardsData = res.data
              }
            })
            .catch((err) => {
              throw err
            })
        } catch (err) {
          this.requestInProcess = false
          this.popularCardsData = []
          console.log(err)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
      // float: left;
      padding-right: 10px;
      // width: 70%;
      width: 100%;
      .form-control {
        font-size: 12px;
        height: 32px;
        border-radius: 2px;
        position: relative;
        &:focus {
          box-shadow: none;
        }
        &::placeholder {
          color: #c5c3c3;
          font-size: 8px;
          text-transform: uppercase;
          font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
        }

        &::-ms-input-placeholder {
          color: #c5c3c3;
          font-size: 8px;
          text-transform: uppercase;
          font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
        }

        &::-ms-input-placeholder {
          color: #c5c3c3;
          font-size: 8px;
          text-transform: uppercase;
          font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
        }
      }
      .slab-title {
        color: #fff;
        text-transform: uppercase;
        font-weight: 400;
        // font-size: 13px;
        font-size: 1.1vw;
        letter-spacing: 2px;
        margin-bottom: 10px;
        // margin-top: 10px;
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
      border: 1px solid $theme-btn-green;
      color: $theme-btn-green;
      font-size: 12px;
      height: auto;
      // width: 30%;
      margin-top: 4px;
      letter-spacing: 2px;
      padding: 7px 20px 5px;
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
.slab-title-step {
  margin: 0;
  font-size: 12px;
}
.vs-between-out {
  // width: 45px;
  // height: 45px;
  background: #fff;
  border-radius: 50%;
  // display: inline-block;
  // line-height: 46px;
  // margin-top: 30px;

  width: 3vw;
  height: 3vw;
  font-size: 1.2vw;
  line-height: 3.2vw;
  position: absolute;
  top: 50%;
  display: block;
  transform: translate(0, -50%);
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
    height: calc(100% - 10px);
    min-height: 570px;
  }
}

.first-slab-out,
.comp-slab-out {
  float: left;
  width: 40%;
  @media (max-width: 768px) {
    width: 100%;
  }
}
.vs-slab-out {
  float: left;
  width: 5%;
  position: relative;
}
.butt-slab-out {
  float: left;
  width: 15%;
  //  @media (max-width: 768px) {
  //   width: 100%;
  //   .my-card-view-listing2{
  //         margin: 0;
  //   }
  // }
}
.my-card {
  float: left;
}
.headtohead_serach-out {
  padding: 0 30px;
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
  border: 1px solid #39414a;
  padding: 15px 15px 20px 15px;
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

  .autoselected {
    position: absolute;
    z-index: 99;
    // width: inherit;
    width: 100%;
    ul {
      background: #ffffff;
      list-style: none;
      padding: 0px;
      width: calc(100% - 12px);
      font-size: 10px;
      li {
        border-bottom: 1px solid #b15f5f;
        line-height: 2;
        padding: 5px;
        font-weight: normal;
        cursor: pointer;
        &.selected {
          background: #666;
        }
      }
    }
  }
}
.headwrapper {
  .product-image-card {
    position: relative;
    margin: 15px;
    padding: 0;
  }
  .product-image-card .image-conatiner img {
    max-height: 79%;
    transform: translate(-50%, -39.5%);
  }
  .image-conatiner {
    img {
      max-width: 100%;
      border: 8px solid #fff;
    }
  }
  .card-title {
    padding: 7px 12px 5px 12px;
    background: #edecec;
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
    padding: 7px 4px 5px 4px;
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
    height: 100%;
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
    margin-top: 15px;
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
        @media (max-width: 991px) {
          font-size: 10px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-all;
          word-break: break-all;
          word-break: break-word;
          -ms-hyphens: auto;
          -moz-hyphens: auto;
          -webkit-hyphens: auto;
          hyphens: auto;
        }
      }
      .right h3 {
        text-align: right;
      }
      .vs_tip {
        position: absolute;
        left: 0;
        right: 0;
        font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        top: 50%;
        transform: translate(0, -50%);
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
  .column_one {
    max-width: 30%;
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
.my-card-view-listing2 {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  width: 100%;
  border-radius: 2px;
  background: linear-gradient(
    to left,
    rgba(10, 178, 95, 0.76) 0%,
    rgba(27, 231, 131, 0.76) 33%,
    rgba(5, 251, 98, 0.76) 100%
  );
  padding: 20px 5px 17px 5px;
  color: #000;
  font-size: 11px;
  display: block;
  text-align: center;
  border: 0;
  text-transform: uppercase;
  margin-top: 26px;
  margin-left: 10px;
  svg {
    width: 10px;
    height: 10px;
  }
}
.popularpick {
  margin-top: 20px;
  .my-card {
    display: inline-block;
    width: 200px;
    padding: 0px 8px;
    margin-bottom: 30px;
    text-transform: uppercase;
    &:hover {
      .my-card-title {
        color: #1ce783;
      }
    }
    .my-card-title {
      font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
      color: $theme-off-white;
      text-decoration: underline;
      font-size: 11px;
      letter-spacing: 1px;
      height: 38px;
      overflow: hidden;
    }
    .sxvalue.theme-btn {
      width: 100%;
      margin-bottom: 5px;
      letter-spacing: 1.4px;
      padding: 7px 10px 5px 10px;
      background: #272d33;
      color: #fff;
      text-align: left;
    }
    .sxvalue {
      span.high {
        color: $theme-btn-green;
      }
      span.low {
        color: red;
      }
    }
    .my-card-current-bid-btn {
      width: 100%;
      padding-top: 7px;
      padding-bottom: 5px;
      margin-bottom: 5px;
    }
    .image-container {
      position: relative;
      padding: 5px;
      margin-bottom: 7px;
      text-align: center;
      background: #272d33;
      // border-radius: 2px;
      height: 230px;
      @media (max-width: 1200px) {
        border: 5px solid #fff !important;
      }
      .card-image {
        max-height: 230px !important;
        border: 5px solid #fff !important;
        padding: 0 !important;
        @media (max-width: 1200px) {
          border: 0 !important;
        }
        @media (max-width: 767px) {
        max-height: 200px !important;
        padding: 5px !important;
        }
      }
      .icons-container {
        position: absolute;
        padding: 10px;
        right: 0;
        top: 9px;
        .icons {
          width: 32px;
          height: 32px;
          float: right;
          margin-top: -10px;
          cursor: pointer;
        }
      }
      .card-image {
        margin-top: 0px;
        width: auto;
        max-width: 100%;
        position: absolute;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 5px;
        max-height: 245px;
      }
    }
    .my-card-view-listing {
      font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
      font-weight: 400;
      width: 100%;
      border-radius: 2px;
      background: #39414a;
      text-transform: uppercase;
      padding: 6px 5px 5px 5px;
      color: #fff;
      font-size: 10px;
      display: block;
      text-align: center;
      border: 0;
      code {
        color: #fff;
        font-size: 11px;
        font-weight: 400;
      }
      &:hover {
        text-decoration: none;
      }
    }
    .my-card-view-listing-on-ebay {
      width: 100%;
      text-align: center;
      a.my-card-view-listing-on-ebay-link {
        color: $theme-off-white;
        font-size: 8px;
        letter-spacing: 1px;

        line-height: 2;
        padding-top: 2px;
        font-style: italic;
      }
    }
  }
}
.sec-h2h-out.headtohead_serach {
  border: 0;
  padding: 0;
  .nav-bar-form .nav-bar-form-input {
    width: calc(100% - 151px);
    float: left;
  }
  .nav-bar-form .nav-bar-search-btn {
    padding: 7px 10px 5px;
    float: left;
  }
}
@media (max-width: 768px) {
.vs-slab-out {
    position: relative;
    width: 100%;
  }
  .vs-between-out {
    width: 30px;
    height: 30px;
    font-size: 12px;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 31px;
  }
  .butt-slab-out {
    width: 100%;
    .my-card-view-listing2 {
      margin: 0;
      padding: 15px 5px 11px 5px;
      font-size: 12px;
    }
  }
}
@media (max-width: 767px) {
  html body #__nuxt .dashboard-nav-bar {
    padding-left: 0;
  }
  .dashboard-nav-bar .nav-bar-form .nav-bar-form-input .slab-title {
    font-size: 11px;
  }
  .headtohead_serach {
    padding: 0;
    border: 0;
    margin-top: 20px;
  }
  .popularpick {
    margin-top: 0;
  }
  .headtohead_serach .autoselected ul {
    width: 100%;
    text-align: left;
    margin: 0;
  }
  .sec-h2h-out.headtohead_serach {
    // padding-left: 5px;
    // padding-right: 5px;
    margin-top: 10px;
  }
  // .headwrapper .column_two .vs_wrap {
  //   margin-left: 5px;
  //   margin-right: 5px;
  // }
  #__nuxt .headwrapper .column_three {
    // margin-left: 5px;
    // margin-right: 5px;
    margin-top: 15px;
  }
  #__nuxt .headwrapper .column_two .stat,
  #__nuxt .headwrapper .column_two .stat {
    flex: none;
    max-width: 100%;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
  }
  // .card-50-div {
  .card-50-first {
    margin-bottom: 10px;
    .custom-dropdown {
      margin-right: 0;
    }
  }
  .card-title-search-field {
    margin-left: 0;
  }
  // }
  .headwrapper .vs_wrap .team_vs .vs_tip {
    width: 35px;
    height: 35px;
    font-size: 17px;
    line-height: 39px;
    margin-top: -17px;
    // left: -15px;
  }
  .headwrapper .vs_wrap .team_vs {
    .left {
      width: 50%;
      float: left;
      h3 {
        padding: 0;
      }
    }
    .right {
      width: 50%;
      float: left;
      h3 {
        padding: 0;
      }
    }
  }
}
@media (max-width: 575px) {
  .t-p-5 {
    padding: 0 !important;
  }
}
// .grade-image-text {
//   bottom: 1px;
//   left: 0;
//   letter-spacing: 1px;
//   margin-right: 2px;
//   font-style: italic;
//   font-size: 12px;
//   line-height: 1;
//   padding: 7px 12px 5px 12px;
//   width: 85px;
//   text-align: center;
// }
</style>