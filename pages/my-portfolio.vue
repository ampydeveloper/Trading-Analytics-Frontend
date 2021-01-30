<template>
  <div class="col-md-12 col-sm-12 search-page my-portfolio-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="row">
            <div class="col-5">
                <div class="add_portfolio">
                  <button class="theme-green-btn card-btn" @click="openModal()">
                    ADD SLAB TO PORTFOLIO
                  </button>
                </div>
            </div>
            <div class="col-7 text-right">
                <button class="theme-green-btn card-btn t-p-5">Sx value ${{value}}</button>
                <button :class="(apiData.diff_icon == 'up'? 'theme-btn':'theme-btn') + ' card-btn t-p-5'">
                    <font-awesome-icon v-if='apiData.diff_icon !== undefined' :icon="['fas', 'long-arrow-alt-'+apiData.diff_icon]" />&nbsp;&nbsp;{{apiData.diff_value}}
                </button>
            </div>
        </div>
                

        <!-- <div class="row">
          <div class="col-sm-4">
            <div class="card green_box">
              <div class="card-body">
                <h5 class="card-title">
                  <button class="theme-btn card-btn">MY PORTFOLIO VALUE</button>
                </h5>
                <h2>${{value}}</h2>
              </div>
            </div>
          </div>
          <div class="col-sm-8 my-p-graph">
            <div class="card">
              <div class="card-body dashboard-graph">
                <h5 class="card-title sx-stats-all">
                  <button class="theme-btn card-btn">
                    My Portfolio ${{value}}
                  </button>
                  <button :class="(apiData.diff_icon == 'up'? 'theme-green-btn':'theme-red-btn') + ' card-btn'">
                    <font-awesome-icon v-if='apiData.diff_icon !== undefined' :icon="['fas', 'long-arrow-alt-'+apiData.diff_icon]" />&nbsp;&nbsp;{{apiData.diff_value}}
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
                <div class="dashboard-graph-footer">
                  <ul class="dashboard-graph-footer-month-filter">
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 2 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 2 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(2)'>1D</li>
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 7 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 7 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(7)'>1W</li>
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 30 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 30 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(30)'>1M</li>
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 90 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 90 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(90)'>3M</li>
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 180 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 180 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(180)'>6M</li>
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 365 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 365 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(365)'>1Y</li>
                    <li :class="'dashboard-graph-footer-month-filter-item '+ ((activeDaysGraph == 1825 && graphDataEmpty == false) ? 'active' : '') + ((activeDaysGraph == 1825 && graphDataEmpty == true) ? 'nodata' : '')" @click='updateGraph(1825)'>5Y</li>
                  </ul>
                  <p class="dashboard-graph-footer-update-at float-right">
                    Last Updated - {{apiData.updated}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="card myportfolio">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-light-grey-btn card-btn">
                Owned
              </button>

              <div class="custom-dropdown float-right">
                <button class="dropbtn">Filter By</button>
                <div class="dropdown-content">
                  <a href="javascript:;" @click="filterBy('football')"
                    >Football</a
                  >
                  <a href="javascript:;" @click="filterBy('baseball')"
                    >Baseball</a
                  >
                  <a href="javascript:;" @click="filterBy('basketball')"
                    >Basketball</a
                  >
                  <a href="javascript:;" @click="filterBy('soccer')"
                    >Soccer</a
                  >
                  <a href="javascript:;" @click="filterBy('price_low_to_high')"
                    >price low to high</a
                  >
                </div>
              </div>
            </h5>
            <ul class="my-card-listing" v-if="items.length > 0">
              <CardSlabItem
                v-for="item of items"
                :key="'portfolio' + item.id"
                :itemdata="item"
              />
            </ul>

            <div
              class="empty-result"
              v-if="items.length == 0 && !this.requestInProcess"
            >
              <p>Please add cards to your portfolio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card wishlist-card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">
                Wishlist
              </button>
            </h5>
            <div class="dataloader" v-if="wishlistRequestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing" v-if="wishlistitems.length > 0">
              <CardListItem
                v-for="item of wishlistitems"
                :key="item.id"
                :itemdata="item"
                @onRemoveFromWatchList="changeInWaitList"
              />
            </ul>

            <div
              class="empty-result"
              v-if="wishlistitems.length == 0 && !this.wishlistRequestInProcess"
            >
              <p>Please add cards to your wishlist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <b-modal id="addToPortfolio" title="Add to My Portfolio" size="xl" hide-footer>
      <div class="row advance-search-wrapper advance-search">
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Player</label
            >
            <div class="col-md-9 col-sm-9">
              <input
                v-model="portfolioSearch.player"
                type="text"
                class="form-control-plaintext"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Sports</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.sport" placeholder="Search" :options="portfolioFilter.sport"></v-select>
                <!-- <select
                  v-model="portfolioSearch.sport"
                  class="form-control-select"
                >
                  <option
                    v-for="sport of portfolioFilter.sport"
                    :key="sport"
                    :value="sport"
                    >{{ sport }}</option
                  >
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Year</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.year" placeholder="Search" :options="portfolioFilter.year"></v-select>
                <!-- <select
                  v-model="portfolioSearch.year"
                  class="form-control-select"
                >
                  <option
                    v-for="year of portfolioFilter.year"
                    :key="year"
                    :value="year"
                    >{{ year }}</option
                  >
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Brand</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.brand" placeholder="Search" :options="portfolioFilter.brand"></v-select>
                <!-- <select
                  v-model="portfolioSearch.brand"
                  class="form-control-select"
                >
                  <option
                    v-for="brand of portfolioFilter.brand"
                    :key="brand"
                    :value="brand"
                    >{{ brand }}</option
                  >
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Card</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.card" placeholder="Search" :options="portfolioFilter.card"></v-select>
                <!-- <select
                  v-model="portfolioSearch.card"
                  class="form-control-select"
                >
                  <option
                    v-for="card of portfolioFilter.card"
                    :key="card"
                    :value="card"
                    >{{ card }}</option
                  >
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Rookie</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.rc" placeholder="Search" :options="['Yes', 'No']"></v-select>
                <!-- <select
                  v-model="portfolioSearch.rc"
                  class="form-control-select"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Variation</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.variation" placeholder="Search" :options="portfolioFilter.variation"></v-select>
                <!-- <select
                  v-model="portfolioSearch.variation"
                  class="form-control-select"
                >
                  <option
                    v-for="variation of portfolioFilter.variation"
                    :key="variation"
                    :value="variation"
                    >{{ variation }}</option
                  >
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Grade</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
              <v-select v-model="portfolioSearch.grade" placeholder="Search" :options="portfolioFilter.grade"></v-select>
                <!-- <select
                  v-model="portfolioSearch.grade"
                  class="form-control-select"
                >
                  <option
                    v-for="grade of portfolioFilter.grade"
                    :key="grade"
                    :value="grade"
                    >{{ grade }}</option
                  >
                </select> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 text-center">
        <button class="update-search-result" @click="searchCards()">
          Search
          <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
        </button>
      </div>
       </div>
      <div class="row my-card-for-portfolio-outer">
        <ul>
          <li
            v-for="item of searchItems"
            :key="item.id"
            class="my-card-for-portfolio"
          >
            <h4 class="my-card-title" :title="item.title">
              {{ trimTitle(item.title) }}
            </h4>
            <div class="image-container">
              <img
                class="card-image"
                :title="item.title"
                :src="item.cardImage"
                :alt="item.id"
              />
            </div>
            <button
              class="my-card-view-listing"
              @click="addToMyPortfolio(item.id)"
            >
              Add
            </button>
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import CardListItem from '~/components/dashboard/CardListItem'
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'My Portfolio - Slabstox'
    }
  },
  mounted() {
    this.getCards()
    this.getWishlist()
    this.getValue()
    this.getSlabFiltersData()
    this.updateGraph()
  },
  components: {
    CardSlabItem,
    CardListItem,
    vSelect,
    VueApexCharts: () => import('vue-apexcharts')
  },
  data() {
    return {
      value: 0,
      filterByKeword: null,
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphDataEmpty: false,
      noMoreData: false,
      apiData: {},
      portfolioSearch: {
        player: '',
        sport: '',
        year: '',
        brand: '',
        card: '',
        rc: 'yes',
        variation: '',
        grade: ''
      },
      portfolioFilter: {
        sport: [],
        year: [],
        brand: [],
        card: [],
        variation: [],
        grade: []
      },
      items: [],
      wishlistitems: [],
      searchItems: [],
      requestInProcess: false,
      wishlistRequestInProcess: false,
      valueRequestInProcess: false,
      series: [
        {
          name: 'Portfolio',
          data: []
        }
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false
          }
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        yaxis: {
           labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily:"NexaBold",
            }
          },
        },
        xaxis: {
           labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily:"NexaBold",
            }
          },
          type: 'categories',
          categories: []
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      }
    }
  },
  methods: {
    changeInWaitList() {
      this.search(false)
    },
    filterBy(data) {
      this.filterByKeword = data
      this.getCards()
    },
    trimTitle(title) {
      if (title.length > 53) {
        title = title.substring(0, 53)
        title += '...'
        return title
      }
      return title
    },
    openModal() {
      this.$bvModal.show('addToPortfolio')
    },
    getValue() {
      if (!this.valueRequestInProcess) {
        try {
          this.showLoader()
          this.items = []
          this.valueRequestInProcess = true
          this.$axios
            .$post('portfolio/portfolio-value', {})
            .then(res => {
              this.hideLoader()
              this.valueRequestInProcess = false
              if (res.status == 200) {
                this.value = res.value;
                this.apiData = res;
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
              filterBy: this.filterByKeword
            })
            .then(res => {
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
    getWishlist(status = false) {
      if (!this.wishlistRequestInProcess) {
        try {
          this.wishlistRequestInProcess = true
          this.$axios
            .$post('watchlist/search', {
              page: 1,
              search: this.keyword,
              filterBy: null
            })
            .then(res => {
              this.wishlistRequestInProcess = false
              if (res.status == 200) {
                if (res.data != null && res.data.length > 0) {
                  if (status) {
                    res.data.map(item => {
                      this.wishlistitems.push(item)
                    })
                  } else {
                    this.wishlistitems = res.data
                  }
                  this.page = res.next
                } else {
                  if (!status) {
                    this.wishlistitems = []
                  } else {
                    this.noMoreData = true
                  }
                }
              }
            })
        } catch (err) {
          this.wishlistRequestInProcess = false
          console.log(err)
        }
      }
    },
    getSlabFiltersData() {
      try {
        this.$axios.$get('portfolio/filters').then(res => {
          if (res.status == 200) {
            this.portfolioFilter.sport = res.data.sport
            this.portfolioFilter.year = res.data.year
            this.portfolioFilter.brand = res.data.brand
            this.portfolioFilter.card = res.data.card
            this.portfolioFilter.variation = res.data.variation
            this.portfolioFilter.grade = res.data.grade
          }
          console.log(res)
        })
      } catch (err) {
        console.log(err)
      }
    },
    searchCards() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.searchItems = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/search', {
              filter: this.portfolioSearch
            })
            .then(res => {
              this.hideLoader()
              this.requestInProcess = false
              if (res.status == 200) {
                this.searchItems = res.data
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    addToMyPortfolio(id) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.searchItems = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/add', {
              id: id
            })
            .then(res => {
              this.hideLoader()
              this.requestInProcess = false
              if (res.status == 200) {
                this.getCards()
                this.$bvModal.hide('addToPortfolio')
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    updateGraph(days=2){
      try {
        this.$axios.$get(`portfolio/get-portfolio-graph/${days}`).then(res => {
          if (res.status == 200) {
            this.activeDaysGraph = days;
            if(this.initGraphLabelLength != res.data.values.length){
              this.graphDataEmpty = false
              this.series = [{'name': 'Portfolio', 'data': res.data.values}];
              this.chartOptions = { xaxis:{ categories: res.data.labels }};
              this.initGraphLabelLength = res.data.labels.length;
            }else{
              this.graphDataEmpty = false
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script> 

<style lang="scss" scoped>
.t-p-5 {
  padding: 5px;
}
.my-p-graph {
  padding-left: 0;
  padding-bottom: 20px;
}
.search-page {
  .slab-result-search {
    margin-top: -15px;
    .no-padding {
      padding: 0px;
      .transparent-bg {
        background: transparent;
        border: none;
        .card-body {
          padding-bottom: 0px;
        }
        .slab-result-title {
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          margin-left: -5px;
        }
        .slab-result-card {
          display: inline-block;
          width: 200px;
          padding: 0px 8px;
          margin-bottom: 30px;
          text-transform: uppercase;
          .slab-result-card-title {
            font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial,
              sans-serif;
            color: $theme-off-white;
            text-decoration: underline;
            font-size: 12px;
            letter-spacing: 1px;
          }
          .my-card-current-bid-btn {
            width: 100%;
            padding-top: 7px;
            padding-bottom: 5px;
            margin-bottom: 5px;
          }
          .slab-result-slab-result-card-image-container {
            background: $theme-off-white;
            position: relative;
            padding: 5px;
            margin-bottom: 15px;
            .slab-result-card-icons-container {
              position: relative;
              padding: 10px;
              .icons {
                width: 32px;
                height: 32px;
                float: right;
                margin-top: -10px;
              }
            }
            .slab-result-card-image {
              width: 100%;
              height: 200px;
              margin-top: -31px;
            }
          }
          .slab-result-card-view-card-data {
            font-family: 'NanoBold', Helvetica, Arial, sans-serif;
            width: 100%;
            border-radius: 2px;
            background: $theme-off-white;
            padding: 7px;
            color: #000000;
            font-size: 13px;
            width: 100%;
            display: block;
            text-align: center;
            font-weight: bolder;
          }
        }
      }
    }
  }
  .card-title {
    margin-bottom: 40px !important;
  }
  ul.my-card-listing {
    list-style: none;
    padding: 0px;
  }
  .no-result-found {
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
}

.add-to-portfolio-search {
  .form-group {
    margin: 0;
  }
  .col-form-label {
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 2px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .form-control-plaintext {
    background-color: #f4f4f4;
    height: 30px;
    border-radius: 2px;
    padding: 0px 10px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #000;
      opacity: 1;
    }
  }
  .select_wrap {
    position: relative;
    &:before {
      content: '\f107';
      position: absolute;
      font-family: FontAwesome;
      top: 3px;
      right: 17px;
      left: auto;
      font-weight: 900;
    }

    .form-control-select {
      background-color: #f4f4f4;
      height: 30px;
      width: 100%;
      border: none;
      border-radius: 2px;
      padding: 0px 10px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      font-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &:focus {
        outline: none;
      }
    }
  }
  .update-search-result {
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    border-radius: 2px;
    background: linear-gradient(
      to left,
      rgba(10, 178, 95, 0.76) 0%,
      rgba(27, 231, 131, 0.76) 33%,
      rgba(5, 251, 98, 0.76) 100%
    );
    padding: 7px 35px;
    color: #000000;
    font-size: 13px;
  }
}
.my-card-for-portfolio-outer{
  ul{
    padding: 20px 0px 0 10px;
        margin: 0;
  }
}
.my-card-for-portfolio {
  display: inline-block;
  // width: 120px;
  width: 11.1%;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  @media (max-width: 1200px) {
    width: 16.6%;
  }
   @media (max-width: 992px) {
    width: 25%;
  }
  @media (max-width: 768px) {
  width: 50%;
  }
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: #272d33;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 43px;
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
    border-radius: 2px;
        height: 152px;
         @media (max-width: 768px) {
    height: 250px;
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
    background: -webkit-linear-gradient(
      right,
      $theme-dark-green 0%,
      $theme-mild-green 33%,
      $theme-light-green 100%
    );
    background: linear-gradient(
      to left,
      $theme-dark-green 0%,
      $theme-mild-green 33%,
      $theme-light-green 100%
    );
    padding: 6px 5px 5px 5px;
    color: #000;
      font-size: 11px;
    display: block;
    text-align: center;
    text-transform: uppercase;
        border: 0;
    &:hover {
    
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

.wishlist-card{
  .dataloader {
    text-align: center;
    margin-top: 15%;
    margin-bottom: 30%;
  }
  .card-title {
    margin-bottom: 40px !important;
  }
  ul.my-card-listing {
    list-style: none;
    padding: 0px;
  }
  .no-result-found {
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
}
</style>