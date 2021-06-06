<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title custom-smart-search-player-name">
              <div class="card-btn-head-outer">
              <button class="theme-green-btn card-btn">Top Trenders</button>
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
              v-if="items.length >= 0 && !requestInProcess"
            >
              <ul class="trender-cards-footer-month-filter">
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 1 ? 'active' : '',
                    filterVal == 1 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(1)"
                >
                  1D
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 2 ? 'active' : '',
                    filterVal == 2 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(2)"
                >
                  1W
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 3 ? 'active' : '',
                    filterVal == 3 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(3)"
                >
                  1M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 4 ? 'active' : '',
                    filterVal == 4 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(4)"
                >
                  3M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 5 ? 'active' : '',
                    filterVal == 5 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(5)"
                >
                  6M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 6 && items.length > 0 ? 'active' : '',
                    filterVal == 6 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(6)"
                >
                  1Y
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 7 && items.length > 0 ? 'active' : '',
                    filterVal == 7 && items.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(7)"
                >
                  5Y
                </li>
              </ul>
            </div>
            
            <div class="custom-dropdown float-right">
                <button class="dropbtn">Filter By</button>
                <div class="dropdown-content">
                  <a href="javascript:;" @click="filterOrderBy('price'+orderByPrice)"
                    >$ Price</a
                  >
                  <a href="javascript:;" @click="filterOrderBy('percent'+orderByPercent)"
                    >% Percent</a
                  >
                </div>
             </div>
            </h5>
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <p
              v-if="items.length == 0"
              class="no-result-found"
            >{{ (requestInProcess) ? '' : 'No result found'}}</p>
            <ul v-else class="my-card-listing">
              <CardSlabItem v-for="item in items" :key="item.id" :itemdata="item" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import { BSpinner } from 'bootstrap-vue'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
      clickOutside: vClickOutside.directive
  },
  props: {
    showFilters: {
      type: Boolean,
      default: false,
    },
  },
  transition: 'fade',
  layout: 'guestOuter',
  // auth: 'guest',
  head() {
    return {
      title: 'Search - Slabstox'
    }
  },
  mounted() {
    this.searchCards()
    // this.scroll()
  },
   async mounted() {
    if (this.$route.query.hasOwnProperty('sport')) {
      this.sport = this.$route.query.sport
    }
    this.searchCards();
    // this.search();
  },
  components: {
    CardSlabItem,
    BSpinner
  },
  data() {
    return {
      items: [],
      requestInProcess: false,
      page: 1,
      noMoreData: false,
      sport: null,
      keyword: null,
      filterByKeword: null,
      filterVal: 4,
      showSmartSearch: false,
      smartKeyword: [],
       orderByPrice: 'up',
      orderByPercent: 'up',
        orderBy: null
    }
  },
  methods: {
    changeFilter(val) {
      this.filterVal = val
      this.search()
    },
    filterOrderBy(orderType) {
        if(orderType == 'priceup') { this.orderByPrice = 'down'; }else { this.orderByPrice = 'up'; }
        if(orderType == 'percentup') { this.orderByPercent = 'down'; }else { this.orderByPercent = 'up'; }
        this.orderBy = orderType
        this.search()
    },
    searchCards(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.page = 1
            this.items = []
          }
          this.requestInProcess = true
          this.$axios
            .$post('search/slab-listing', {
              take: 100,
              page: this.page,
              sport: this.sport
            })
            .then(res => {
              this.requestInProcess = false
              if (res.status == 200) {
                if (res.data != null && res.data.length > 0) {
                  if (status) {
                    res.data.map(item => {
                      this.items.push(item)
                    })
                  } else {
                    this.items = res.data
                  }
                  this.page = res.next
                } else {
                  if (!status) {
                    this.items = []
                  } else {
                    this.noMoreData = true
                  }
                }
              }
            })
        } catch (err) {
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    search() {
      try {
        this.items = []
        this.requestInProcess = true
        this.$axios
          .$post('search/slab-listing', {
            take: 100,
            sport: this.sport,
            search: this.keyword,
            orderby: this.orderBy,
            filterval: this.filterVal,
          })
          .then(res => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.items = res.data
            }
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    hideSmartSearch(event){
      this.showSmartSearch = false;
    },
    getSmartKeyword() {
      try {
        //this.requestInProcess = true
        this.$axios
          .$post('search/get-smart-keyword-onlyname', {
            keyword: this.keyword,
            sport: this.sport
          })
          .then(res => {
            //this.requestInProcess = false
            if (res.status == 200) {
              if(this.keyword == res.keyword){
                this.smartKeyword = res.data
                this.showSmartSearch = true
              }
            }
          })
          .catch(err => {
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
    scroll() {
      window.onscroll = () => {
        const scrollTop =
          document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        let bottomOfWindow =
          scrollTop >= offsetHeight - 10 && scrollTop <= offsetHeight + 10
          // console.log(bottomOfWindow)
        if (bottomOfWindow) {
          if (!this.noMoreData) {
            this.searchCards(true)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.t-p-5 {
  padding: 5px;
}
.search-page {
  .dataloader {
    text-align: center;
    margin-top: 15%;
    margin-bottom: 30%;
  }
  .slab-result-search {
    margin-top: 15px;
    // background-color: #39414a;
    margin-left: -10px;
    margin-bottom: 10px;
    border-radius: 4px;
    margin-right: -10px;
    .no-padding {
      padding: 0px;
      .transparent-bg {
        background: transparent;
        border: none;
        .card-body {
          padding-bottom: 0px;
          .card-body-wrap {
            margin-left: -13px;
            margin-right: -13px;
            .card-title {
              margin-left: 17px;
            }
          }
        }
        .slab-result-title {
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
          margin-left: 0px;
        }
        .slab-result-card {
          display: inline-block;
          width: 16.66%;
          padding: 0px 18px;
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
              height: 250px;
              margin-top: 0;
            }
          }
          .slab-result-card-view-card-data {
            font-family: 'NanoBold', Helvetica, Arial, sans-serif;
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
            padding: 7px;
            color: #000000;
            font-size: 12px;
            letter-spacing: 1px;
            text-decoration: none;
            width: 100%;
            display: block;
            text-align: center;
            font-weight: 800;
          }
        }
      }
    }
  }
  .card-title {
    margin-bottom: 40px !important;
    margin-left: 5px;
  }
  ul.my-card-listing {
    list-style: none;
    padding: 0px;
    margin-left: -13px;
    margin-right: -13px;
    margin-bottom: 0px;
  }
  .no-result-found {
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
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