<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title custom-smart-search-player-name">
              <button class="theme-green-btn card-btn">Recent Listing</button>
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

              <div class="ll-head-right float-right">
                <div class="custom-dropdown">
                  <button class="dropbtn">Filter By</button>
                  <div class="dropdown-content">
                    <a href="javascript:;" @click="filterBy('ending_soon')"
                      >Ending Soon</a
                    >
                    <a
                      href="javascript:;"
                      @click="filterBy('price_low_to_high')"
                      >price low to high</a
                    >
                    <a href="javascript:;" @click="filterBy('buy_it_now')"
                      >buy it now</a
                    >
                  </div>
                </div>
              </div>
            </h5>
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <p v-if="items.length == 0" class="no-result-found">
              {{
                requestInProcess
                  ? ''
                  : 'There are no cards here. Check again soon.'
              }}
            </p>
            <ul v-else class="my-card-listing">
              <CardListItem
                v-for="item in items"
                :key="item.id"
                :itemdata="item"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
import { BSpinner } from 'bootstrap-vue'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  head() {
    return {
      title: 'Live Listings  - Slabstox',
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
    if (this.$route.query.hasOwnProperty('filter')) {
      this.filter = this.$route.query.filter
    }
    this.searchCards()
  },
  components: {
    CardListItem,
    BSpinner,
  },
  data() {
    return {
      items: [],
      requestInProcess: false,
      page: 1,
      noMoreData: false,
      sport: null,
      filter: null,
      keyword: null,
      // filterByKeword: '',
      filterVal: 1,
      showSmartSearch: false,
      smartKeyword: [],
    }
  },
  methods: {
    searchCards(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.page = 1
            this.items = []
          }
          this.requestInProcess = true
          if (this.filter != 'recent') {
            var axiosUrl = 'search/recent-listing'
          } else {
            var axiosUrl = 'search/get-recent-auction-list'
          }
          this.$axios
            .$post(axiosUrl, {
              take: 100,
              page: this.page,
              sport: this.sport,
              filterBy: this.filter != 'recent' ? this.filter : null,
              search: this.keyword,
            })
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                if (this.filter != 'recent') {
                  var resultData = res.data
                } else {
                  var resultData = res.items
                }

                if (resultData != null && resultData.length > 0) {
                  if (status) {
                    resultData.map((item) => {
                      this.items.push(item)
                    })
                  } else {
                    this.items = resultData
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
    hideSmartSearch(event) {
      this.showSmartSearch = false
    },
    getSmartKeyword() {
      try {
        this.$axios
          .$post('search/get-smart-keyword-onlyname', {
            keyword: this.keyword,
          })
          .then((res) => {
            if (res.status == 200) {
              if (this.keyword == res.keyword) {
                this.smartKeyword = res.data
                this.showSmartSearch = true
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
      }
    },
    selectKeyword(value, cardId) {
      this.keyword = value
      this.showSmartSearch = false
      this.searchCards(false)
    },
    filterBy(data) {
      this.filter = data
      this.searchCards(false)
    },
    changeFilter(val) {
      this.filterVal = val
      this.searchCards(false)
    },
    scroll() {
      window.onscroll = () => {
        const scrollTop =
          document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        let bottomOfWindow =
          scrollTop >= offsetHeight - 10 && scrollTop <= offsetHeight + 10
        if (bottomOfWindow) {
          if (!this.noMoreData) {
            this.searchCards(true)
          }
        }
      }
    },
  },
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