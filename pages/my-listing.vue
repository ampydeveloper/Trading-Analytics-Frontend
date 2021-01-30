<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row analytics_page_row1">
      <div class="col-md-4 col-sm-4 pl-0">
        <div class="card total_sold my-listing-sold">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">TOTAL SOLD</button>
            </h5>
            <h2>$668.18</h2>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-sm-8 pl-0 pr-0">
        <div class="card">
          <div class="card-body sales_graph-graph">
            <h5 class="card-title">
              <button class="theme-btn card-btn">SALES</button>
              <nuxt-link class="card-link float-right" to="/">
                VIEW SALES HISTORY
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>

            <div class="sales_graph">
              <img
                class="gift-cart-title-ebay-img"
                src="~/assets/img/graph.jpg"
                alt
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card card-single-row-outer">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-green-btn card-btn">Active Listings</button>
              <input
                v-model="keyword"
                @keyup="search()"
                class="card-title-search-field"
                type="text"
                placeholder="search"
              />

              <div class="custom-dropdown float-right">
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
            </h5>

            <ul class="my-card-listing">
              <CardListItem
                v-for="item of items"
                :key="'active' + item.id"
                :itemdata="item"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card no_bg">
          <div class="card-body past_listing">
            <h5 class="card-title">
              <button class="theme-light-grey-btn card-btn">
                Sold Listings
              </button>
               <input
                v-model="keyword"
                @keyup="search()"
                class="card-title-search-field"
                type="text"
                placeholder="search"
              />

              <div class="custom-dropdown float-right">
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
            </h5>
            <ul class="my-card-listing">
              <CardListItem
                v-for="item of items"
                :key="'past' + item.id"
                :itemdata="item"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card no_bg">
          <div class="card-body past_listing">
            <h5 class="card-title">
              <button class="theme-light-grey-btn card-btn">
                Unsold Listings
              </button>
               <input
                v-model="keyword"
                @keyup="search()"
                class="card-title-search-field"
                type="text"
                placeholder="search"
              />

              <div class="custom-dropdown float-right">
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
            </h5>
            <ul class="my-card-listing">
              <CardListItem
                v-for="item of items"
                :key="'past' + item.id"
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
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'My Listing - Slabstox'
    }
  },
  mounted() {
    this.getCards()
  },
  components: {
    CardListItem,
    VueApexCharts: () => import('vue-apexcharts')
  },
  data() {
    return {
      items: [],
      requestInProcess: false,
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area',
          background: 'transparent'
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        yaxis: {},
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z'
          ]
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
    getCards() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.items = []
          this.requestInProcess = true
          this.$axios
            .$post('search/sample-my-listing', {
              take: 6
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
    }
  }
}
</script> 

<style lang="scss" scoped>
.t-p-5 {
  padding: 5px;
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
</style>