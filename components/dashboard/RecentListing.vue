<template>
  <div class="row">
    <div class="col-12 t-p-5">
      <div class="card card-single-row-outer my-card-listing-scroll-outer">
        <div class="card-body">
          <h5 class="card-title custom-smart-search-player-name">
            <button class="card-btn theme-btn theme-green-btn ending-title">
              Recent Listings
            </button>
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
                  <a href="javascript:;" @click="filterBy('price_low_to_high')"
                    >price low to high</a
                  >
                  <a href="javascript:;" @click="filterBy('buy_it_now')"
                    >buy it now</a
                  >
                </div>
              </div>
              <nuxt-link
                class="card-link"
                :to="'/recent-listing?filter=recent'"
              >
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </div>
          </h5>

          <div class="dataloader" v-if="requestInProcess">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <overlay-scrollbars>
            <ul
              class="my-card-listing my-card-listing-scroll clearfix"
              v-if="normalListingItems.length > 0"
            >
              <CardListItem
                v-for="item in normalListingItems"
                :key="item.id"
                :itemdata="item"
              />
            </ul>
          </overlay-scrollbars>
          <div
            class="empty-result"
            v-if="normalListingItems.length == 0 && !requestInProcess"
          >
            <p>There are no cards here. Check again soon.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
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
    CardListItem,
  },
  data() {
    return {
      data: [],
      keyword: null,
      filterByKeword: '',
      requestInProcess: false,
      filterVal: 1,
      showSmartSearch: false,
      smartKeyword: [],
      normalListingItems: [],
    }
  },
  async mounted() {
    this.search()
    this.getNormalRecentListing()
  },
  methods: {
    getNormalRecentListing() {
      if (!this.requestInProcess) {
        try {
          this.requestInProcess = true
          this.$axios
            .$post('search/get-recent-auction-list', {
              take: 6,
              page: this.page,
            })
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                this.normalListingItems = res.items
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
      this.search()
    },
    filterBy(data) {
      this.filterByKeword = data
      this.search()
    },
    search() {
      try {
        this.data = []
        this.requestInProcess = true
        this.$axios
          .$post('search/get-recent-auction-list', {
            take: 6,
            search: this.keyword,
            filterBy: this.filterByKeword,
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              if (this.filterByKeword == 'price_low_to_high') {
                res.items.map((item) => {
                  this.normalListingItems.push(item)
                })
              } else {
                this.normalListingItems = res.items
              }
            }
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
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
.trender-cards-footer {
  width: calc(100% - 435px);
  text-align: center;
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