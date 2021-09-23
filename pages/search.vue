<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row slab-result-search" v-if="slabItems.length > 0 && showSlab">
      <div class="col-12 no-padding">
        <div class="card transparent-bg">
          <div class="card-body">
            <h5 class="card-title">
                      <button class="theme-btn card-btn slab-result-title">
                        Slabs Results
                      </button>
              <div class="pagination" v-if="this.$route.query.page == 1 && searchPage <= 30">
                    <button
                      class="theme-btn card-btn"
                      :disabled="this.$route.query.page <= 1 ? '' : disabled"
                      @click="previousPage()"
                    >
                      Previous
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      1
                    </button>
                    <button
                      class="theme-btn card-btn"
                      
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      
                    >
                      3
                    </button>                    
                    <button :data-title="this.next"
                      :disabled="
                        this.next == false ? '' :disabled
                      "
                      class="theme-btn card-btn"
                      @click="nextPage()"
                    >
                      Next
                    </button>
              </div>

              <div class="pagination" v-if="this.$route.query.page - 1 >= 1 && searchPage <= 30">
                    <button
                      class="theme-btn card-btn"
                      :disabled="this.$route.query.page <= 1 ? '' : disabled"
                      @click="previousPage()"
                    > <i class="fa fa-chevron-left"></i> </button>

                    <button class="theme-btn card-btn"
                      disabled
                    > 1 </button>

                    <button class="theme-btn card-btn"
                    :disabled="this.$route.query.page <= 1 ? '' : disabled"
                      @click="previousPage()"
                    >
                      {{ this.$route.query.page - 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"                      
                    >
                      {{ this.$route.query.page }}
                    </button>
                    <button
                      class="theme-btn card-btn" 
                      :disabled="
                        this.next == false ? '' :disabled
                      "
                      @click="nextPage()"                     
                    >
                      {{ parseInt(this.$route.query.page) + 1 }}
                    </button> 
                     
                    <button class="theme-btn card-btn"
                    disabled
                    > 10 </button>    

                    <button :data-title="this.next"
                      :disabled="
                        this.next == false ? '' :disabled
                      "
                      class="theme-btn card-btn"
                      @click="nextPage()"
                    ><i class="fa fa-chevron-right"></i></button>
              </div>
              
            </h5>
            <ul class="my-card-listing slab-result-card-outer">
              <CardSlabItem
                v-for="item in slabItems"
                :key="'slab-' + item.id"
                :itemdata="item"
                @clicked="selectSlabCard"
              />
            </ul>
          </div>
          
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-green-btn card-btn">Listings Results</button>
              <input
                v-model="keyword"
                @keyup="searchInternalCards()"
                class="card-title-search-field"
                type="text"
                placeholder="search"
              />
              <div class="custom-dropdown float-right">
                <button class="dropbtn">Filter</button>
                <div class="dropdown-content">
                  <a href="javascript:;" @click="filterBy('ending_soon')"
                    >Ending Soon</a
                  >
                  <a href="javascript:;" @click="filterBy('sx_high_to_low')"
                    >SX High to Low</a
                  >
                  <a href="javascript:;" @click="filterBy('sx_low_to_high')"
                    >SX low to high</a
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
            <p v-if="items.length == 0" class="no-result-found">
              {{ requestInProcess ? '' : 'No results found.' }}
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
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import { mapGetters } from 'vuex'
import { BSpinner } from 'bootstrap-vue'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  auth: 'guest',
  head() {
    return {
      title: 'Search - Slabstox',
    }
  },
  async mounted() {
    // this.keyword = this.keyword_old_state
    this.filter = this.filters_old_state
    // this.searchPage = this.searchPage_old_state
    // this.keyword = this.keyword_old_state
    if (this.$route.query.hasOwnProperty('id')) {
      this.searchCard = this.$route.query.id
    } else if (this.$route.query.hasOwnProperty('keyword')) {
      this.searchCard = null
      this.keyword = this.$route.query.keyword
      if(this.$route.query.hasOwnProperty('page')){
        if(this.$route.query.page != 0 && this.$route.query.page != ""){
          this.searchPage = this.$route.query.page
        }else if(this.$route.query.page == 0 || this.$route.query.page == "" ){
          this.$router.push(
            '/search/?keyword=' + this.keyword + '&page=' + this.searchPage
          )
        }
      }
    }
    // console.log(this.$route.query.page)
    this.searchCards()
    this.scroll()
    // console.log(this.keyword)
  },
  components: {
    CardListItem,
    CardSlabItem,
    BSpinner,
  },
  computed: {
    ...mapGetters({
      keyword_old_state: 'advancesearch/keyword',
      // searchPage_old_state: 'advancesearch/searchPage',
      filters_old_state: 'advancesearch/filters',
      cardid_old_state: 'advancesearch/cardid',
      showAdvanceSearch: 'advancesearch/show',
      searchBtnClick_old_state: 'advancesearch/searchBtnClick',
    }),
  },
  data() {
    return {
      keyword: '',
      // newkeyword: '',
      filter: {},
      items: [],
      slabItems: [],
      requestInProcess: false,
      page: 1,
      searchPage: 1,
      next : true,
      noMoreData: false,
      slabSearchActive: false,
      slabSearchCardId: null,
      showSlab: false,
      filterByKeword: 'ending_soon',
      searchCard: null,
    }
  },
  watch: {
    keyword_old_state(newVal, oldVal) {
      if (newVal != '') {
        console.log('keyword', newVal)
        this.keyword = newVal
        this.filter = {}
        this.searchPage = 1
        this.searchCard = null
        this.searchCards()
      }
    },
    //  searchPage_old_state(newVal, oldVal) {
    //   // console.log('searchPage', newVal)
    //   this.page = newVal
    //   this.filter = {}
    //   this.searchCard = null
    //   this.searchCards()
    // },
    filters_old_state(newVal, oldVal) {
      if (this.keyword == '') {
        console.log('filters_old_state')
        this.filter = newVal
        // this.searchPage = 1
        this.searchCard = null
        this.keyword = ''
        this.searchCards()
      }
    },
    cardid_old_state(newVal, oldVal) {
      if (typeof newVal == 'number' && this.keyword == '') {
        console.log('cardid_old_state')
        this.searchCard = newVal
        this.keyword = ''
        this.searchCards()
      }
    },
    // searchBtnClick_old_state(newVal, oldVal) {
    //   console.log('test23')
    //   this.searchCards()
    // },
  },
  methods: {
    filterBy(data) {
      this.filterByKeword = data
      this.searchCards(false, false)
    },
    selectSlabCard(id) {
      this.slabSearchActive = true
      this.slabSearchCardId = id
      this.slabSearchCard()
    },
    searchInternalCards(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.items = []
          }
          // if (this.keyword != this.newkeyword) {
          //   this.newkeyword = this.keyword
          //   this.page = 1
          // }
          this.requestInProcess = true
          this.$axios
            .$post('search/get-internal-card-list', {
              search: this.keyword,
              filter: this.filter,
              page: this.page,
              filterBy: this.filterByKeword,
              searchCard: this.searchCard,
            })
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                if (res.items.data != null && res.items.data.length > 0) {
                  if (status) {
                    res.items.data.map((item) => {
                      this.items.push(item)
                    })
                  } else {
                    this.items = res.items.data
                  }
                  this.searchPage = res.next
                } else {
                  if (!status) {
                    this.items = []
                  } else {
                    this.noMoreData = true
                  }
                }
              }
            })
            .catch((err) => {
              this.requestInProcess = false
            })
        } catch (err) {
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    searchCards(status = false, hideSlab = true) {
      console.log('searchCards running')
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.items = []
            if (hideSlab) {
              this.slabItems = []
            }
          }
          // if (this.keyword != this.newkeyword) {
          //   this.newkeyword = this.keyword
          //   this.page = 1
          // }
          // console.log(this.user);
          if (this.user == false) {
            var callString = 'get-card-list'
          } else {
            var callString = 'get-card-list-user'
          }
          // this.$router.push(
          //   '/search/?keyword=' + this.keyword + '&page=' + this.searchPage
          // )
          this.requestInProcess = true
          this.$axios
            .$post('search/' + callString, {
              search: this.keyword,
              filter: this.filter,
              page: this.searchPage,
              // filterBy: this.filterByKeword,
              filterBy: '',
              searchCard: this.searchCard,
            })
            .then((res) => {
              this.requestInProcess = false
              // console.log(res)
              if (res.status == 200) {
                if (hideSlab) {
                  this.slabItems = res.cards
                }
                this.showSlab = true
                // console.log(this.keyword)
                if (res.items.data != null && res.items.data.length > 0) {
                  if (status) {
                    res.items.data.map((item) => {
                      this.items.push(item)
                    })
                  } else {
                    this.items = res.items.data
                  }
                } else {
                  if (!status) {
                    this.items = []
                  } else {
                    this.noMoreData = true
                  }
                }
                //wrong need card next page
                if (res.next != false) {
                  this.searchPage = res.next
                  this.next = true
                }else{
                  this.next = false
                }
              }
            })
            .catch((err) => {
              this.requestInProcess = false
            })
        } catch (err) {
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    slabSearchCard(status = false) {
      if (!this.requestInProcess) {
        try {
          if (!status) {
            this.showSlab = false
            this.items = []
          }
          // if (this.keyword != this.newkeyword) {
          //   this.newkeyword = this.keyword
          //   this.page = 1
          // }
          this.requestInProcess = true
          this.$axios
            .$post(
              'card/get-card-list-using-card-id/' + this.slabSearchCardId,
              { page: this.page }
            )
            .then((res) => {
              this.requestInProcess = false
              this.showSlab = true
              if (res.status == 200) {
                if (res.data == null || res.data.length == 0) {
                  this.noMoreData = true
                }
                if (status) {
                  res.data.map((item) => {
                    this.items.push(item)
                  })
                } else {
                  this.items = res.data
                }
                this.page = res.next
              }
            })
        } catch (err) {
          this.requestInProcess = false
          this.showSlab = true
          // console.log(err)
        }
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
            if (this.slabSearchActive) {
              this.slabSearchCard(true)
            } else {
              this.searchInternalCards(true)
            }
          }
        }
      }
    },
    previousPage() {
      if (this.$route.query.page != 1) {
        this.searchPage = this.$route.query.page - 1
        this.$router.push(
          '/search/?keyword=' + this.keyword + '&page=' + this.searchPage
        )
        this.searchCards()
        this.scroll()
      }
    },
    nextPage() {
      if (this.next == true) {
        this.$router.push(
          '/search/?keyword=' + this.keyword + '&page=' + this.searchPage
        )
        this.searchCards()
        this.scroll()
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
        margin: 0;
        .card-body {
          padding-bottom: 0px;
          padding-top: 0;

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
      }
    }
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
.theme-btn {
  padding: 7px 10px 5px 10px;
}
.pagination{
  display: inline-block;
  float: right;
  margin-right: 17px;
}
.active-pagination {
  color: #1ce783;
  background: #39414a;
}
</style>