<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="wl-noti-full">
          <p>
            Want to get live updates on these listings?
            <a href="/profile"
              >Edit your notification settings now.
             <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </a>
          </p>
        </div>
        <div class="card myportfolio watch_list">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-light-grey-btn card-btn">WATCH LIST</button>
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
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing">
              <CardListItem
                v-for="item in items"
                :key="item.id"
                :itemdata="item"
                @onRemoveFromWatchList="changeInWaitList"
              />
            </ul>

            <div
              class="empty-result watch-list-empty"
              v-if="items.length == 0 && !requestInProcess"
            >
              <p>There are no cards here. Add one.</p>
            </div>
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
      title: 'Watch List - Slabstox'
    }
  },
  mounted() {
    this.search()
    this.scroll()
  },
  components: {
    CardListItem
  },
  data() {
    return {
      items: [],
      page: 1,
      keyword: null,
      filterByKeword: null,
      requestInProcess: false,
      noMoreData: false,
      test: {
        galleryURL:
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/tRAAAOSwPDdfN1FH/$_1.JPG',
        id: 13815,
        itemId: '143683775551',
        price: '255.00',
        title:
          '2018-19 Panini Prizm DeAndre Ayton GEM MINT PSA 10 Rookie RC #279',
        viewItemURL:
          'https://www.ebay.com/itm/2018-19-Panini-Prizm-DeAndre-Ayton-GEM-MINT-PSA-10-Rookie-RC-279-/143683775551'
      }
    }
  },
  methods: {
    changeInWaitList() {
      this.search(false)
    },
    filterBy(data) {
      this.filterByKeword = data
      this.search(false)
    },
    search(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.page = 1
            this.items = []
          }
          this.requestInProcess = true
          this.$axios
            .$post('watchlist/search', {
              page: this.page,
              search: this.keyword,
              filterBy: this.filterByKeword
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
          scrollTop >= offsetHeight - 15 && scrollTop <= offsetHeight + 15
        if (bottomOfWindow) {
          if (!this.noMoreData) {
            this.search(true)
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
.wl-noti-full {
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  p {
    margin-bottom: 10px;
    text-align: right;
        color: #1ce783;
  }
  a {
        color: #1ce783;
    &:hover {
      color: #1ce783;
    }
  }
}
.card-title-search-field {
  background-color: #edecec !important;
}
.search-page {
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
.watch-list-empty {
  color: #000 !important;
}
</style>