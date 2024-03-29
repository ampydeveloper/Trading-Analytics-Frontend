<template>
  <div class="row">
    <div class="col-12 t-p-5">
      <div class="card card-single-row-outer my-card-listing-scroll-outer">
        <div class="card-body">
          <h5 class="card-title custom-smart-search-player-name">
            <div class="card-btn-head-outer">
            <button class="card-btn theme-btn">
              {{ card != 'pokemon' ? card : 'Pokémon' }}
            </button>
            </div>
            
            <div class="internal-search-container">
              <input
                v-model="keyword"
                v-on:keyup.enter="search()"
                v-on:keyup="getSmartKeyword()"
                class="card-title-search-field"
                type="text"
                placeholder="search"
              />
              <div class="display_keyword" v-if="showSmartSearch">
                <ul v-click-outside="hideSmartSearch">
                  <li
                    v-for="(item, key) of smartKeyword"
                    :key="key"
                    @click="selectKeyword(item.player)"
                  >
                    {{ item.player }}
                  </li>
                  <li v-if="smartKeyword.length == 0">
                    No results found for this search
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="trender-cards-footer"
              v-if="data.length >= 0 && !requestInProcess && showFilters"
            >
              <ul class="trender-cards-footer-month-filter">
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 1 ? 'active' : '',
                    filterVal == 1 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(1)"
                >
                  1D
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 2 ? 'active' : '',
                    filterVal == 2 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(2)"
                >
                  1W
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 3 ? 'active' : '',
                    filterVal == 3 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(3)"
                >
                  1M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 4 ? 'active' : '',
                    filterVal == 4 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(4)"
                >
                  3M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 5 ? 'active' : '',
                    filterVal == 5 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(5)"
                >
                  6M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 6 && data.length > 0 ? 'active' : '',
                    filterVal == 6 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(6)"
                >
                  1Y
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 7 && data.length > 0 ? 'active' : '',
                    filterVal == 7 && data.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(7)"
                >
                  5Y
                </li>
              </ul>
            </div>

            <div class="trender-cards-footer">
              <button
                :class="orderByPriceClass + ' card-btn t-p-5'"
                @click="filterOrderBy('price' + orderByPrice)"
              >
                <font-awesome-icon
                  v-if="orderByPrice !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + (orderByPrice == 'up' ? 'down' : 'up'),
                  ]"
                />&nbsp;&nbsp;$ Price
              </button>

              <button
                :class="orderByPercentClass + ' card-btn t-p-5'"
                @click="filterOrderBy('percent' + orderByPercent)"
              >
                <font-awesome-icon
                  v-if="orderByPercent !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' +
                      (orderByPercent == 'up' ? 'down' : 'up'),
                  ]"
                />&nbsp;&nbsp;Percent %
              </button>
            </div>

            <div class="ll-head-right float-right">
              <nuxt-link class="card-link" :to="'/top-trenders?sport=' + card">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </div>
          </h5>
          <div class="dataloader" v-if="requestInProcess">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
             <overlay-scrollbars>
          <ul class="my-card-listing my-card-listing-scroll clearfix">
            <CardSlabItem
              v-for="item in data"
              :key="item.id"
              :itemdata="item"
              :orderBy="orderBy"
            />
          </ul>
          </overlay-scrollbars>

          <div
            class="empty-result"
            v-if="data.length == 0 && !requestInProcess"
          >
            <p>There are no cards here. Check again soon.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    card: {
      type: String,
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CardSlabItem,
  },
  data() {
    return {
      data: [],
      keyword: null,
      filterByKeword: null,
      requestInProcess: false,
      filterVal: 2,
      showSmartSearch: false,
      smartKeyword: [],
      orderByPrice: 'up',
      orderByPercent: 'down',
      orderBy: 'percentup',
      orderByPriceClass: 'theme-btn',
      orderByPercentClass: 'theme-green-btn',
    }
  },
  async mounted() {
    this.search()
  },
  methods: {
    filterOrderBy(orderType) {
      if (orderType == 'priceup') {
        this.orderByPrice = 'down'
        this.orderByPriceClass = 'theme-green-btn'
        this.orderByPercentClass = 'theme-btn'
      } else if (orderType == 'pricedown') {
        this.orderByPrice = 'up'
        this.orderByPriceClass = 'theme-red-btn'
        this.orderByPercentClass = 'theme-btn'
      }

      if (orderType == 'percentup') {
        this.orderByPercent = 'down'
        this.orderByPercentClass = 'theme-green-btn'
        this.orderByPriceClass = 'theme-btn'
      } else if (orderType == 'percentdown') {
        this.orderByPercent = 'up'
        this.orderByPercentClass = 'theme-red-btn'
        this.orderByPriceClass = 'theme-btn'
      }
      this.orderBy = orderType
      this.search()
    },
    filterBy(data) {
      this.filterByKeword = data
      this.search()
    },
    hideSmartSearch(event) {
      this.showSmartSearch = false
    },
    search() {
      try {
        this.data = []
        this.requestInProcess = true
        this.$axios
          .$post('search/slab-listing', {
            take: 12,
            sport: this.card,
            search: this.keyword,
            orderby: this.orderBy,
            filterval: this.filterVal,
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.data = res.data
            }
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    getSmartKeyword() {
      try {
        //this.requestInProcess = true
        this.$axios
          .$post('search/get-smart-keyword-onlyname', {
            keyword: this.keyword,
            sport: this.card,
          })
          .then((res) => {
            //this.requestInProcess = false
            if (res.status == 200) {
              if (this.keyword == res.keyword) {
                this.smartKeyword = res.data
                this.showSmartSearch = true
              }
            }
          })
          .catch((err) => {
            //this.requestInProcess = false
            console.log(err)
          })
      } catch (err) {
        //this.requestInProcess = false
        console.log(err)
      }
      console.log(this.keyword)
    },
    selectKeyword(value, cardId) {
      this.keyword = value
      this.showSmartSearch = false
      this.search()
    },
    changeFilter(val) {
      this.filterVal = val
      this.search()
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
}
.no-result-found {
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
}
.trender-cards-footer{
  .card-btn{
     cursor: pointer;
  }
}
.custom-smart-search-player-name {
  .internal-search-container {
    width: 200px;
    display: inline-grid;
    position: relative;
    padding-left: 20px;
    .card-title-search-field {
      margin-left: 0px;
      width: 100%;
    }
    .display_keyword {
      position: absolute;
      background: #fff;
      width: 100%;
      margin: 14px 40px;
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
  }
}
</style>
