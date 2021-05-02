<template>
  <div class="row">
    <div class="col-12 t-p-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <button class="theme-cart-btn card-btn">Available Listings</button>
            <input
              v-model="keyword"
              @keyup="card_one()"
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
          <ul class="my-card-listing" v-if="data.length > 0">
            <CardListItem
              v-for="item in data"
              :key="'available-item-' + item.id"
              :itemdata="item"
            />
          </ul>
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
import CardListItem from '~/components/dashboard/CardListItem'
export default {
  props: {
    cardId: {
      type: Number
    },
    datascroll: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CardListItem
  },
  data() {
    return {
      data: [],
      itemIds: [],
      dataTwo: [],
      requestInProcess: false,
      page: 1,
      noMoreData: false,
      filterByKeword: 'ending_soon',
      keyword: null,
    }
  },
  async mounted() {
     setTimeout(() => {
        this.card_one()
      }, 200)
    if (this.datascroll) {
      this.scroll()
    }
    this.search()
  },
  methods: {
    filterBy(data) {
      this.filterByKeword = data
      this.noMoreData = false
      this.card_one()
    },
    async card_one(status = false) {
      try {
        this.requestInProcess = true
        if (!status) {
          this.page = 1
        }
        const res = await this.$axios.$post('get-items-for-listing', {
          card_id: this.cardId,
          take: 12,
          page: this.page,
          search: this.keyword,
          filterBy: this.filterByKeword
        })
        this.requestInProcess = false
        if (res.status == 200) {
          if (res.data != null && res.data.length > 0) {
            if (status) {
              res.data.map(item => {
                if(Object.keys(item).includes('id') && !this.itemIds.includes(item.id)){
                  this.itemIds.push(item.id)
                  this.data.push(item)
                }
              })
              this.data = this.data.filter(Boolean)
            } else {
              this.data = res.data
            }
            this.page = res.next
          } else {
            if (!status) {
              this.data = []
            } else {
              this.noMoreData = true
            }
          }
        }
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    scroll() {
      window.onscroll = () => {
        const scrollTop =
          document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        let bottomOfWindow =
          scrollTop >= offsetHeight - 2 && scrollTop <= offsetHeight + 2
        if (bottomOfWindow) {
          if (!this.noMoreData) {
            this.card_one(true)
          }
        }
      }
    },
    search() {
      // try {
      //   this.data = []
      //   this.requestInProcess = true
      //   this.$axios
      //     .$post('search/slab-listing', {
      //       take: 12,
      //       sport: this.card,
      //       search: this.keyword
      //     })
      //     .then(res => {
      //       this.requestInProcess = false
      //       if (res.status == 200) {
      //         this.data = res.data
      //       }
      //     })
      // } catch (err) {
      //   this.requestInProcess = false
      //   console.log(err)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.dataloader {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
}
.my-card-listing {
  padding: 0px;
  margin: 0px;
}
.t-p-5 {
  padding-left: 5px;
  padding-right: 5px;
}
@media (max-width: 991px) {
  .t-p-5{
        padding-right: 15px;
    padding-left: 15px;
  }
}
</style>