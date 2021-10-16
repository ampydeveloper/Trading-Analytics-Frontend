<template>
  <div class="col-md-12 col-sm-12 stoxticker-page-exactout">
    <div class="row">
      <div class="col-md-12 pl-1 mb-4 mt-2">
        <div class="top-btn">
          <nuxt-link class="card-btn custom-stox" :to="`stoxticker`">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
            Back to stoxticker</nuxt-link
          >
        </div>
      </div>
    </div>

    <div class="row dashboard-graph-row all-public-boards-list-out">
     
      <div
        class="col-md-12 col-sm-12"
        v-for="(itemdata, key) in allBoardGraph"
        :key="`allBoardGraph-${key}`"
      >
        <div class="card">
          <div
            class="card-body dashboard-graph sx-stats-all"
            id="dashboard-graph-outer"
          >
          <span style="display:none">{{key}}43</span>
            <h5 class="card-title">
              <nuxt-link
                :class="
                  'theme-btn card-btn thb-btn sx-allboards-apex-top-alld' +
                  allBoardGraph[key].id
                "
                :to="`stox-details?board=${allBoardGraph[key].id}`"
                style="margin-right: 4px"
                v-if="user != null && user.full_name != null"
                >{{ allBoardGraph[key].name }} ${{
                  allBoardGraph[key].total_card_value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}
              </nuxt-link>
              <span
                :class="
                  'theme-btn card-btn thb-btn sx-allboards-apex-top-alld' +
                  allBoardGraph[key].id
                "
                style="margin-right: 4px"
                v-if="user == null || user.full_name == null"
                v-b-modal.loginTopPopup
                >{{ allBoardGraph[key].name }} ${{
                  allBoardGraph[key].total_card_value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}
              </span>
              <button
                :class="
                  (allBoardGraph[key].sx_icon &&
                  allBoardGraph[key].sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') +
                  ' card-btn sx-allboards-apex-top-alld' +
                  allBoardGraph[key].id
                "
              >
                <font-awesome-icon
                  v-if="allBoardGraph[key].sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + allBoardGraph[key].sx_icon,
                  ]"
                />&nbsp;&nbsp;
                <span class="g-dollar-d-val">
                  ${{
                    allBoardGraph[key].doller_diff
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }}</span
                >
              </button>
              <button
                :class="
                  (allBoardGraph[key].sx_icon &&
                  allBoardGraph[key].sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') +
                  ' card-btn sx-allboards-apex-top-alld' +
                  allBoardGraph[key].id
                "
              >
                <font-awesome-icon
                  v-if="allBoardGraph[key].sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + allBoardGraph[key].sx_icon,
                  ]"
                />&nbsp;&nbsp;{{ allBoardGraph[key].pert_diff }}%
              </button>

              <nuxt-link
                :class="
                  'theme-btn card-btn thb-btn sx-allboards-apex-top-1d' +
                  allBoardGraph[key].id
                "
                style="display: none; margin-right: 4px"
                :to="`stox-details?board=${allBoardGraph[key].id}`"
                v-if="user != null && user.full_name != null"
                >{{ allBoardGraph[key].name }} ${{
                  allBoardGraph[key].total_card_value
                }}
              </nuxt-link>
              <span
                :class="
                  'theme-btn card-btn thb-btn sx-allboards-apex-top-1d' +
                  allBoardGraph[key].id
                "
                style="display: none; margin-right: 4px"
                v-if="user == null || user.full_name == null"
                v-b-modal.loginTopPopup
                >{{ allBoardGraph[key].name }} ${{
                  allBoardGraph[key].total_card_value
                }}
              </span>
              <button
                :class="
                  (allBoardGraph[key].sx_icon &&
                  allBoardGraph[key].sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') +
                  ' card-btn sx-allboards-apex-top-1d' +
                  allBoardGraph[key].id
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="allBoardGraph[key].sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + allBoardGraph[key].sx_icon,
                  ]"
                />&nbsp;&nbsp;
                <span class="g-dollar-d-val">
                  ${{ allBoardGraph[key].doller_diff }}</span
                >
              </button>
              <button
                :class="
                  (allBoardGraph[key].sx_icon &&
                  allBoardGraph[key].sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') +
                  ' card-btn sx-allboards-apex-top-1d' +
                  allBoardGraph[key].id
                "
                style="display: none"
              >
                <font-awesome-icon
                  v-if="allBoardGraph[key].sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + allBoardGraph[key].sx_icon,
                  ]"
                />&nbsp;&nbsp;{{ allBoardGraph[key].pert_diff }}%
              </button>
              <button
                class="theme-btn card-btn"
                v-if="allBoardGraph[key].featured == 1"
              >
                Featured
              </button>
            </h5>
            <div class="dashboard-apex-top">
              <div
                :class="'sx-allboards-apex-top-1d' + allBoardGraph[key].id"
                style="display: none"
              >
                <VueApexCharts
                  ref="stoxtickerBoardChart"
                  type="area"
                  height="350"
                  :key="`vac-${key}-dashChart`"
                  :options="boardChartOptions1d[key]"
                  :series="boardSeries1d[key]"
                ></VueApexCharts>
              </div>
              <div
                :class="'sx-allboards-apex-top-alld' + allBoardGraph[key].id"
              >
                <VueApexCharts
                  ref="stoxtickerBoardChart"
                  type="area"
                  height="350"
                  :key="`vac-${key}-dashChart`"
                  :options="boardChartOptions[key]"
                  :series="boardSeries[key]"
                ></VueApexCharts>
              </div>
            </div>
            <div class="dashboard-graph-footer" id="`boardGraphs-${key}`">
              <ul
                class="dashboard-graph-footer-month-filter"
                :id="`dc-${key}-ul`"
                :key="`dc-${key}-ul`"
              >
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 2 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc1d(2, allBoardGraph[key].id, key)
                  "
                >
                  1D
                </li>
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 7 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc(7, allBoardGraph[key].id, key)
                  "
                >
                  1W
                </li>
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 30 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc(30, allBoardGraph[key].id, key)
                  "
                >
                  1M
                </li>
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 90 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc(90, allBoardGraph[key].id, key)
                  "
                >
                  3M
                </li>
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 180 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc(180, allBoardGraph[key].id, key)
                  "
                >
                  6M
                </li>
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 365 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc(365, allBoardGraph[key].id, key)
                  "
                >
                  1Y
                </li>
                <li
                  :class="[
                    { active: boardDaysGraph[key] == 1825 },
                    'dashboard-graph-footer-month-filter-item',
                  ]"
                  @click="
                    allBoardGraphSingleFunc(1825, allBoardGraph[key].id, key)
                  "
                >
                  5Y
                </li>
              </ul>
              <p class="dashboard-graph-footer-update-at float-right">
                Last Updated -
                {{
                  allBoardGraph[key].sales_graph.last_timestamp
                    ? allBoardGraph[key].sales_graph.last_timestamp
                    : ''
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="social_share ss-h4">
          <h4>
            <!-- <a class="embed-link" href="javascript:void(0);"
              @click="embedStoxtickerCode()" >EMBED CODE </>
            </a> -->
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'
import { mapGetters } from 'vuex'
import { FILTERS } from '../constants/advance_search_filter'

export default {
  transition: 'fade',
  layout: 'guestOuter',

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
    // var currentHref = location.href
    // this.sxStoxtickerUrl = currentHref.replace('stoxticker', 'stox-feed')
    // this.allBoardGraphFunc(90)
    // this.allBoardGraphFunc1d(2)
    // setTimeout(() => {
      this.allBoardGraphFunc(90)
      this.allBoardGraphFunc1d(2)
    // }, 2000)
    // this.logo = document.getElementById('sidebarLogo').src
    // $('.custom-stox').text('red');

    setTimeout(() => {
      this.allBoardGraphFunc(90)
      this.allBoardGraphFunc1d(2)
    }, 10000)
  },
  updated() {
    // setTimeout(() => {
    //   this.allBoardGraphFunc(90)
    //   this.allBoardGraphFunc1d(2)
    // }, 2000)
    //  this.allBoardGraphFunc(90)
    //     this.allBoardGraphFunc1d(2)
    // console.log(this.mountAppend);
    //  this.mountAppend = this.mountAppend + 1
    //     if (
    //       $.trim($('.all-public-boards-list-out').html()) == '' &&
    //       this.mountAppend == 4
    //     ) {
    //       setTimeout(() => {
    //         this.allBoardGraphFunc(90)
    //         this.allBoardGraphFunc1d(2)
    //       }, 10000)
    //     }
  },
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
   
     
      requestInProcess: false,
  
      allBoardGraph: [],
      boardDaysGraph: [],
      boardChartOptions: [],
      boardSeries: [],
      boardSalesQty: [],

      allBoardGraph1d: [],
      boardChartOptions1d: [],
      boardSeries1d: [],
      boardSalesQty1d: [],

    
      sxStoxtickerUrl: '',
    
      allBoardsGraph1dInitialized: false,
      allBoardsShow1dGraph: false,
      allBoardsShowalldGraph: true,
 
      filters: { ...FILTERS },
    }
  },
  computed: {
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes',
    }),
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
    allBoardGraphFunc(days = 90) {
      try {
        this.$axios.$get(`stoxticker/all-boards/${days}`).then((res) => {
          if (res.status == 200) {
            if (res.data != null && res.data.length > 0) {
              res.data.map((item, key) => {
                this.boardDaysGraph[key] = days
                if (typeof item != 'undefined') {
                  this.allBoardGraph[key] = item
                  this.boardSeries[key] = [
                    {
                      name: 'SX',
                      data: item.sales_graph.values,
                    },
                  ]
                  this.boardDaysGraph.push(90)
                  this.boardSalesQty.push(item.sales_graph.qty)
                  this.boardChartOptions.push({
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
                      categories: item.sales_graph.labels,
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
                        format: 'MM/dd/yy',
                      },
                      y: {
                        formatter: (value, ind) => {
                          let lblStr = `$${value}`
                          if (typeof ind == 'object')
                            lblStr = `$${value} (${
                              this.boardSalesQty[key][ind.dataPointIndex]
                            })`
                          else
                            lblStr = `$${value} (${this.boardSalesQty[key][ind]})`
                          return lblStr
                        },
                      },
                    },
                  })
                }
              })
              // console.log(this.allBoardGraph);

            }
    //         setTimeout(() => {
    //   this.allBoardGraphFunc(90)
    //   this.allBoardGraphFunc1d(2)
    // // }, 2000)
          }
        })

      } catch (error) {
        // console.log(error)
      }
    },
    allBoardGraphFunc1d(days = 90) {
      try {
        this.$axios.$get(`stoxticker/all-boards/${days}`).then((res) => {
          if (res.status == 200) {
            if (res.data != null && res.data.length > 0) {
              res.data.map((item, key) => {
                // this.boardDaysGraph[key] = days
                if (typeof item != 'undefined') {
                  this.allBoardGraph1d[key] = item
                  this.boardSeries1d[key] = [
                    {
                      name: 'SX',
                      data: item.sales_graph.values,
                    },
                  ]
                  // this.boardDaysGraph.push(90)
                  this.boardSalesQty1d.push(item.sales_graph.qty)
                  this.boardChartOptions1d.push({
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
                      categories: item.sales_graph.labels,
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
                    tooltip: {
                      enabled: true,
                      x: {
                        formatter: (value, ind) => {
                          return item.sales_graph.labels[ind.dataPointIndex]
                        },
                      },
                      y: {
                        formatter: (value, ind) => {
                          let lblStr = `$${value}`
                          if (typeof ind == 'object')
                            lblStr = `$${value} (${
                              this.boardSalesQty1d[key][ind.dataPointIndex]
                            })`
                          else
                            lblStr = `$${value} (${this.boardSalesQty1d[key][ind]})`
                          return lblStr
                        },
                      },
                    },
                  })
                }
              })
            }
          }
        })
      } catch (error) {
        // console.log(error)
      }
    },
    allBoardGraphSingleFunc(days, board, boardKey) {
      try {
        this.$axios
          .$get(`stoxticker/single-graph-board/${days}/${board}`)
          .then((res) => {
            if (res.status == 200) {
              $('.sx-allboards-apex-top-alld' + board).show()
              $('.sx-allboards-apex-top-1d' + board).hide()

              this.boardDaysGraph.splice(boardKey, 1, days)
              this.allBoardGraph.splice(boardKey, 1, res.data)

              this.boardSeries.splice(boardKey, 1, [
                { name: 'SX', data: res.data.sales_graph.values },
              ])
              this.boardSalesQty.splice(boardKey, 1, res.data.sales_graph.qty)
              this.boardChartOptions.splice(boardKey, 1, {
                xaxis: {
                  categories: res.data.sales_graph.labels,
                },
              })
            }
          })
      } catch (error) {
        // console.log(error)
      }
    },
    allBoardGraphSingleFunc1d(days, board, boardKey) {
      try {
        this.boardDaysGraph.splice(boardKey, 1, days)
        $('.sx-allboards-apex-top-alld' + board).hide()
        $('.sx-allboards-apex-top-1d' + board).show()
      } catch (error) {
        // console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-main {
  padding: 0 10px !important;
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
.dashboard-apex-top {
  margin-left: -17px;
  margin-bottom: -8px;
}
.stat_box {
  padding: 10px 15px;
  background-color: #1de783;
  border-radius: 3px;
}
.stat_box h3 {
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
.embed-link {
  color: #fff;
}
.thb-btn {
  color: #000;
  &:hover {
    text-decoration: none;
  }
}
.display_keyword {
  position: absolute;
  background: #fff;
  width: 100%;
  z-index: 9;
  ul {
    list-style: none;
    text-transform: none;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    font-size: 12px;
    padding: 5px 0px;
    margin: 0;
    li {
      cursor: pointer;
      line-height: 2;
      padding-left: 10px;
      &:hover {
        background: #cccccc;
      }
    }
  }
}

.custom-stox-search,
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

  @media (max-width: 768px) {
    padding: 20px 20px 17px 20px;
  }

  &:after {
    display: none;
  }
  &.active {
    background: #272d33;
    color: #39414a;
    border: 13px solid #39414a;
  }
  svg {
    vertical-align: baseline;
    margin-right: 5px;
  }
}

.search-stox {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  border-radius: 2px;
  background-color: #fff;
  padding: 20px 35px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  border: 0;
  &:after {
    display: none;
  }
  .chevron-down {
    display: none;
  }
  &.active {
    background: #272d33;
    color: #39414a;
    border: 13px solid #39414a;
    .chevron-right {
      display: none;
    }
    .chevron-down {
      display: inline-block;
    }
  }
  svg {
    margin-left: 5px;
  }
}
.stoxticker_page .bs-stats {
  height: auto;
  position: relative;
}
.stoxticker_page {
  .bs-stats1 {
    width: 10vw;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .bs-stats2 {
    width: 110px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .bs-stats3 {
    width: 42vw;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .bs-stats4 {
    width: 20vw;
    h2 {
      padding-left: 24px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.search-stox-box,
.search-add-box,
.search-name-out {
  background-color: #39414a;
  padding: 15px;
  border-radius: 2px;
  display: none;
  &.active {
    display: block;
  }
  .inner-wrap {
    padding: 15px;
    background-color: #fff;
    border-radius: 2px;
  }
  .search-bar {
    input {
      background-color: #f5f5f5;
      width: 100%;
      border: 0px;
      border-radius: 2px;
      outline: none;
      // font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 11px;
      letter-spacing: 2px;
      padding: 12px 20px 8px 20px;
      font-style: normal;

      &::placeholder {
        color: #cdcbcb;
      }
    }
  }
  .close-btn {
    text-align: right;
    margin-top: 7px;
    text-transform: uppercase;
    font-style: normal;
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .select-cat {
    margin-top: 10px;
    h6 {
      font-size: 9px;
      color: #b1b1b1;
      font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
      letter-spacing: 1px;
      font-weight: 400;
      margin-top: 15px;
    }
  }
}

.cat-btn {
  ul {
    padding: 0px;
    margin: 0 -1px;
    list-style-type: none;
    li {
      width: auto;
      display: inline-block;
      margin-right: 5px;
      margin-left: 1px;
      margin-bottom: 5px;
      a {
        // font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
        font-family: NexaBold, Helvetica, Arial, sans-serif;
        font-weight: 400;
        border-radius: 2px;
        background-color: #f5f5f5;
        padding: 12px 17px 10px 17px;
        color: #000;
        font-size: 11px;
        text-decoration: none;
        display: block;
        text-align: center;
        border: 0;
        text-transform: uppercase;
        outline: none;
      }
    }
  }
}
.cat-btn ul li.active a {
  background-color: #1ce783;
}
.search-field .search .card-btn {
  padding: 9px 20px 8px 20px;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}
.load-more-btn .custom-stox {
  padding: 12px 35px 11px 35px;
}
.top-btn{
  margin-left: 12px;
}
.top-btn.active {
  margin-bottom: 0px;
}
.top-btn .search-stox.active {
  border-radius: 0;
  background-color: #272d33;
  border: 10px solid #39414a;
  // color: #fff;
}
.cat-wrap {
  padding-left: 12px;
  padding-right: 12px;
}
.search-add-box {
  .search-wrap {
    margin-top: 15px;
  }
}
.search-wrap {
  width: calc(100% - 863px);
  text-align: right;
  padding-right: 12px;
}
@media (max-width: 1300px) {
  .search-wrap {
    max-width: 100%;
    text-align: right;
    flex: 100%;
  }
}
@media (max-width: 991px) {
  .cat-wrap,
  .search-wrap {
    max-width: 100%;
    text-align: center;
    flex: 100%;
  }
}

@media (max-width: 570px) {
  .top-btn .card-btn {
    width: 100%;
    margin-bottom: 7px;
    margin-left: 0px;
    margin-right: 0px;
  }
}
@media (max-width: 400px) {
  .cat-btn ul li {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .search-field .search .card-btn {
    margin-right: 0;
    width: 100%;
  }
  .search-wrap {
    padding: 0;
    .search {
      padding: 0 12px;
    }
  }
}
.analytics_page .card-single-row-outer {
  height: auto;
}
.card-single-row-outer {
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
}
html body main .card.search-slabs-out .my-card-listing .my-card {
  width: 16.66%;
  @media (max-width: 1200px) {
    width: 20%;
    &:nth-child(6n + 7) {
      clear: none;
    }
    .image-container {
      height: 15vw;
      .card-image {
        max-height: 15vw;
      }
    }
  }
  @media (max-width: 991px) {
    width: 33.333333%;
    .image-container {
      height: 21vw;
      .card-image {
        max-height: 21vw;
      }
    }
  }
  @media (max-width: 768px) {
    width: 50%;
    .image-container {
      height: 220px;
      .card-image {
        max-height: 200px;
      }
    }
  }
}
.my-card-no-slab {
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 2px;
  font-style: italic;
  padding: 30px 0 25px 0;
  border: 1px solid #fff;
  margin: 0 15px;
  border-radius: 2px;
}
.no-card-no-board {
  width: 100%;
  margin: 50px 20px;
}
.card.search-slabs-out {
  .my-card-active-listing,
  .my-card-listing {
    float: left;
    width: calc(100% + 30px);
  }
}
.my-card {
  &.active {
    .add-to-board {
      background: linear-gradient(
        to left,
        rgba(10, 178, 95, 0.76) 0%,
        rgba(27, 231, 131, 0.76) 33%,
        rgba(5, 251, 98, 0.76) 100%
      );
      &:hover {
        background: linear-gradient(
          to left,
          rgba(10, 178, 95, 0.76) 0%,
          rgba(27, 231, 131, 0.76) 33%,
          rgba(5, 251, 98, 0.76) 100%
        );
      }
    }
  }
  display: inline-block;
  width: 200px;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: $theme-off-white;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 38px;
    overflow: hidden;
  }
  .image-container {
    position: relative;
    padding: 5px;
    margin-bottom: 7px;
    text-align: center;
    background: #272d33;
    // border-radiupx;
    height: 12vw;
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
      max-height: 12vw;
    }
  }
  .my-card-view-listing {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    width: 100%;
    border-radius: 2px;
    background: #edecec;
    padding: 6px 5px 5px 5px;
    color: #000;
    font-size: 12px;
    display: block;
    text-align: center;
    border: 0;
    text-transform: uppercase;
    &:focus {
      outline: 0;
    }
    &:hover {
      text-decoration: none;
      background: #d4d4d4;
    }
  }
}
.create-board-out {
  width: 100%;
  margin-bottom: 10px;
  .create-board {
    width: auto;
    padding: 6px 25px 5px 25px;
    display: inline-block;
    background: linear-gradient(
      to left,
      rgba(10, 178, 95, 0.76) 0%,
      rgba(27, 231, 131, 0.76) 33%,
      rgba(5, 251, 98, 0.76) 100%
    );
    &:hover {
      background: linear-gradient(
        to left,
        rgba(10, 178, 95, 0.76) 0%,
        rgba(27, 231, 131, 0.76) 33%,
        rgba(5, 251, 98, 0.76) 100%
      );
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
.search-board-dataloader {
  width: 100%;
  padding: 50px 0;
  text-align: center;
}
.stoxticker-page-exactout {
  @media (max-width: 767px) {
    .dashboard-apex-top {
      margin-bottom: 20px;
    }
  }
}

.featured-boards {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  border-radius: 2px;
  background-color: #fff;
  padding: 20px 35px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  border: 0;
}
.featured-boards .chevron-right {
  padding-left: 5px;
}
</style>