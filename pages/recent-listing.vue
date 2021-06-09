<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-green-btn card-btn">Recent Listing</button>
            </h5>
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <p
              v-if="items.length == 0"
              class="no-result-found"
            >{{ (requestInProcess) ? '' : 'No result found'}}</p>
            <ul v-else class="my-card-listing">
              <CardListItem v-for="item in items" :key="item.id" :itemdata="item" />
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
    this.searchCards()
  },
  components: {
    CardListItem,
    BSpinner
  },
  data() {
    return {
      items: [],
      requestInProcess: false,
      page: 1,
      noMoreData: false,
      sport: null,
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
          this.$axios
            .$post('search/recent-listing', {
              take: 100,
              page: this.page,
              sport: this.sport,
              // filterBy: 'ending_soon',
              filterBy: '',
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
    scroll() {
      window.onscroll = () => {
        const scrollTop =
          document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        let bottomOfWindow =
          scrollTop >= offsetHeight - 10 && scrollTop <= offsetHeight + 10
          console.log(bottomOfWindow)
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
</style>