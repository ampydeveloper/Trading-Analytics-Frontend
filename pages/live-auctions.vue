<template>
  <div class="col-md-12 col-sm-12 search-page">
    
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card card-single-row-outer">
          <div class="card-body">
            <h5 class="card-title">
              <button class="card-btn theme-btn theme-green-btn">Recent Listings</button>
            </h5>
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing" v-if="normalListingItems.length > 0">
              <CardListItem v-for="item in normalListingItems" :key="item.id" :itemdata="item" />
            </ul>

            <div class="empty-result" v-if="normalListingItems.length == 0 && !requestInProcess">
              <p>There are no cards here. Check again soon.</p>
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
              <button class="card-btn theme-btn theme-green-btn ending-title">Ending Soon</button>
            </h5>
            <div class="dataloader" v-if="requestInProcessEndingSoon">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing" v-if="endingSoonListingItems.length > 0">
              <CardListItem v-for="item in endingSoonListingItems" :key="item.id" :itemdata="item" />
            </ul>

            <div class="empty-result" v-if="endingSoonListingItems.length == 0 && !requestInProcessEndingSoon">
              <p>There are no cards here. Check again soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LiveListingCard v-for="(card, key) in cards" :key="key" :card="card" />

    <!--<div class="row">
      <div class="col-12 t-p-5">
        <div class="card no_bg">
          <div class="card-body">
            <ul class="my-card-listing">
              <CardListItem v-for="item in normalListingItems" :key="item.id" :itemdata="item" />
            </ul>
          </div>
        </div>
      </div>-->

    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
import LiveListingCard from '~/components/dashboard/LiveListingCard'
export default {
  transition: 'fade',
  layout: 'guestOuter',
  // middleware: 'guest',
    // auth: false,
  head() {
    return {
      title: 'Live Listings - Slabstox'
    }
  },
  mounted() {
    this.getEndingSoonListing()
    this.getNormalRecentListing()
    this.scroll()
  },
  components: {
    CardListItem,
    LiveListingCard
  },
  data() {
    return {
      normalListingItems: [],
      endingSoonListingItems: [],
      page: 1,
      requestInProcess: false,
      requestInProcessEndingSoon: false,
      noMoreData: false,
      cards: [
        'soccer',
        'football', 
        'baseball', 
        'basketball',
        'pokemon',
        'random bin'
      ]
    }
  },
  methods: {
    getEndingSoonListing() {
      try {
        this.endingSoonListingItems = []
        this.requestInProcessEndingSoon = true;
        this.$axios
          .$post('search/ending-soon-listing', {
            take: 12,
            filterBy: 'ending_soon',
          })
          .then(res => {
             this.requestInProcessEndingSoon = false;
            if (res.status == 200) {
              this.endingSoonListingItems = res.data
            }
          })
      } catch (err) {
        this.requestInProcessEndingSoon = false;
        console.log(err)
      }
    },
    getNormalRecentListing(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.page = 1
            this.normalListingItems = []
          }
          this.requestInProcess = true
          this.$axios
            .$post('search/get-recent-auction-list', {
              take: 6,
              page: this.page
            })
            .then(res => {
              this.requestInProcess = false
              if (res.status == 200) {
                if (res.items != null && res.items.length > 0) {
                  // if (status) {
                  //   res.items.data.map(item => {
                  //     this.normalListingItems.push(item)
                  //   })
                  // } else {
                    this.normalListingItems = res.items
                  // }
                  this.page = 1
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
.card-btn.ending-title{
background: #f95050;
}
</style>