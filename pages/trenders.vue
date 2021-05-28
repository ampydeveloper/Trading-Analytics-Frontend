<template>
  <div class="col-md-12 col-sm-12 search-page trenders-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card card-single-row-outer myportfolio">
          <div class="card-body">
            <h5 class="card-title">
              <div class="card-btn-head-outer">
              <button class="theme-light-grey-btn card-btn">
                Top Trenders
              </button>
              </div>

              <div
              class="trender-cards-footer"
            >
              <ul class="trender-cards-footer-month-filter">
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 1 ? 'active' : '',
                    filterVal == 1 && recentListingItems.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(1)"
                >
                  1D
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 2 ? 'active' : '',
                    filterVal == 2 && recentListingItems.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(2)"
                >
                  1W
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 3 ? 'active' : '',
                    filterVal == 3 && recentListingItems.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(3)"
                >
                  1M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 4 ? 'active' : '',
                    filterVal == 4 && recentListingItems.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(4)"
                >
                  3M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 5 ? 'active' : '',
                    filterVal == 5 && recentListingItems.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(5)"
                >
                  6M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 6 && recentListingItems.length > 0 ? 'active' : '',
                    filterVal == 6 && recentListingItems.length == 0 ? 'nodata' : '',
                  ]"
                  @click="changeFilter(6)"
                >
                  1Y
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[
                    filterVal == 7 && recentListingItems.length > 0 ? 'active' : '',
                    filterVal == 7 && recentListingItems.length == 0 ? 'nodata' : '',
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

              <!-- <input  v-model="keyword" @keyup="getRecentListing()" class="card-title-search-field" type="text" placeholder="search"> -->
              <!-- <nuxt-link class="card-link float-right" :to="'/top-trenders'">
                View Top 25
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link> -->
            </h5>
            <div class="dataloader" v-if="requestInProcessRecent">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing rfive-columns">
              <CardSlabItem
                v-for="item in recentListingItems"
                :key="item.id"
                :itemdata="item"
              />
            </ul>

            <div
              class="empty-result"
              v-if="recentListingItems.length == 0 && !requestInProcessRecent"
            >
              <p>There are no cards here. Check again soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LiveListingSlabTenders
      v-for="(card, key) in cards"
      :key="key"
      :card="card"
      :showFilters="true"
    />

    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card no_bg">
          <div class="card-body">
            <ul class="my-card-listing">
              <CardSlabItem
                v-for="item in normalListingItems"
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
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import LiveListingSlabTenders from '~/components/dashboard/LiveListingSlabTenders'
export default {
  transition: 'fade',
  layout: 'guestOuter',
  auth: 'guest',
  head() {
    return {
      title: 'Trenders - SlabStox',
    }
  },
  mounted() {
    this.getRecentListing()
    // this.getEndingSoonListing()
    this.getNormalRecentListing()
    this.scroll()
  },
  components: {
    CardSlabItem,
    LiveListingSlabTenders,
  },
  data() {
    return {
      recentListingItems: [],
      normalListingItems: [],
      endingSoonListingItems: [],
      page: 1,
      requestInProcess: false,
      requestInProcessRecent: false,
      requestInProcessEndingSoon: true,
      noMoreData: false,
      keyword: null,
      cards: [],
      filterVal: 4,
      orderByPrice: 'up',
      orderByPercent: 'down',
      orderBy: 'percentup',
      orderByPriceClass: 'theme-btn',
      orderByPercentClass: 'theme-green-btn',
    }
  },
  methods: {
    changeFilter(val) {
      this.filterVal = val
      this.getRecentListing()
    },
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
      this.getRecentListing()
    },
    getRecentListing() {
      try {
        this.recentListingItems = []
        this.requestInProcessRecent = true
        this.$axios
          .$post('search/slab-listing', {
            take: 5,
            // search: this.keyword,
            top_trend: true,
            orderby: this.orderBy,
            filterval: this.filterVal,
          })
          .then((res) => {
            this.requestInProcessRecent = false
            if (res.status == 200) {
              this.cards = res.order
              this.recentListingItems = res.data
            }
          })
      } catch (err) {
        this.requestInProcessRecent = false
        console.log(err)
      }
    },
    // getEndingSoonListing() {
    //   try {
    //     this.endingSoonListingItems = []
    //     this.requestInProcessEndingSoon = true
    //     this.$axios
    //       .$post('search/ending-soon-listing', {
    //         take: 12,
    //       })
    //       .then((res) => {
    //         this.requestInProcessEndingSoon = false
    //         if (res.status == 200) {
    //           this.endingSoonListingItems = res.data
    //         }
    //       })
    //   } catch (err) {
    //     this.requestInProcessEndingSoon = false
    //     console.log(err)
    //   }
    // },
    getNormalRecentListing(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.page = 1
            this.normalListingItems = []
          }
          this.requestInProcess = true
          this.$axios
            .$post('search/slab-listing', {
              take: 12,
              page: this.page,
            })
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                if (res.data != null && res.data.length > 0) {
                  if (status) {
                    res.data.map((item) => {
                      this.normalListingItems.push(item)
                    })
                  } else {
                    this.normalListingItems = res.data
                  }
                  this.page = res.next
                } else {
                  if (!status) {
                    this.normalListingItems = []
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
    scroll() {
      window.onscroll = () => {
        const scrollTop =
          document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        let bottomOfWindow =
          scrollTop >= offsetHeight - 15 && scrollTop <= offsetHeight + 15
        if (bottomOfWindow) {
          if (!this.noMoreData) {
            this.getNormalRecentListing(true)
          }
        }
      }
    },
  },
}
</script> 

<style lang="scss" scoped>
.trenders-page{
  padding-right: 25px !important;
  padding-left: 25px !important;
}
.t-p-5 {
  padding: 5px;
}
.search-page {
  .dataloader {
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
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
.card-single-row-outer.myportfolio{
  .theme-green-btn{
    border: 1px solid #212529;
    padding: 7px 11px 4px 11px;
  }
}
</style>