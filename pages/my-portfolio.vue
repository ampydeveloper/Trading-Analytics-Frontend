<template>
  <div class="col-md-12 col-sm-12 search-page my-portfolio-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="row">
          <div class="col-5">
            <div class="add_portfolio">
              <button class="theme-green-btn card-btn" @click="openModal()">
                ADD SLAB TO PORTFOLIO
              </button>
            </div>
          </div>
          <div class="col-7 text-right">
            <div class="top-card">
              <button class="theme-light-grey-btn card-btn">
                Purchase ${{ apiData.total_purchases }}
              </button>
              <button class="theme-green-btn card-btn">
                Sx value ${{ value }}
              </button>
              <button
                :class="
                  (apiData.percent_diff_icon == 'up'
                    ? 'theme-btn'
                    : 'theme-btn') + ' card-btn pert-left'
                "
              >
                <font-awesome-icon
                  v-if="apiData.percent_diff_icon !== undefined"
                  :icon="['fas', 'long-arrow-alt-' + apiData.percent_diff_icon]"
                />&nbsp;&nbsp;{{ apiData.percent_differ }}%
              </button>

              <button
                :class="
                  (apiData.diff_icon == 'up' ? 'theme-btn' : 'theme-btn') +
                  ' card-btn doll-right'
                "
              >
              <span class="doll-bor"></span>
                <font-awesome-icon
                  v-if="apiData.diff_icon !== undefined"
                  :icon="['fas', 'long-arrow-alt-' + apiData.diff_icon]"
                />&nbsp;&nbsp;${{ apiData.diff_value }}
              </button>
            </div>
          </div>
        </div>

        <div class="card myportfolio">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-light-grey-btn card-btn">Owned</button>
            </h5>
            <ul class="my-card-listing" v-if="items.length > 0">
              <CardSlabItemPortfolio
                v-for="item of items"
                :key="'portfolio' + item.id + item.purchase_price + item.portfolio_id"
                :itemdata="item"
                :addPortfolioVar="addPortfolioVar"
                @onEditPortfolioOwned="updateToMyPortfolioPrice"
              />
            </ul>

            <div
              class="empty-result"
              v-if="items.length == 0 && !this.requestInProcess"
            >
              <p>Please add cards to your portfolio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card wishlist-card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-dark-grey-btn card-btn">Wishlist</button>
            </h5>
            <div class="dataloader" v-if="wishlistRequestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <ul class="my-card-listing watchlist-card-listing" v-if="wishlistitems.length > 0">
               <CardSlabItemFeatured
                v-for="item of wishlistitems"
                :key="'portfolio' + item.id"
                :itemdata="item"
                @onRemoveFromWatchList="changeInWaitList"
              />
            </ul>

            <div
              class="empty-result"
              v-if="wishlistitems.length == 0 && !this.wishlistRequestInProcess"
            >
              <p>Please add cards to your wishlist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="addToPortfolio"
      title="Add to My Portfolio"
      size="xl"
      hide-footer
    >
      <div class="row advance-search-wrapper advance-search">
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Player</label
            >
            <div class="col-md-9 col-sm-9">
              <input
                v-model="portfolioSearch.player"
                type="text"
                class="form-control-plaintext"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Sports</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.sport"
                  placeholder="Search"
                  :options="portfolioFilter.sport"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Year</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.year"
                  placeholder="Search"
                  :options="portfolioFilter.year"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Brand</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.brand"
                  placeholder="Search"
                  :options="portfolioFilter.brand"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Card</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.card"
                  placeholder="Search"
                  :options="portfolioFilter.card"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Rookie</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.rc"
                  placeholder="Search"
                  :options="['Yes', 'No']"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Variation</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.variation"
                  placeholder="Search"
                  :options="portfolioFilter.variation"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label for="staticEmail" class="col-md-2 col-sm-2 col-form-label"
              >Grade</label
            >
            <div class="col-md-9 col-sm-9">
              <div class="select_wrap">
                <v-select
                  v-model="portfolioSearch.grade"
                  placeholder="Search"
                  :options="portfolioFilter.grade"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 text-center">
          <button class="update-search-result" @click="searchCards()">
            Search
            <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
          </button>
        </div>
      </div>
      <div class="row my-card-for-portfolio-outer">
        <ul>
          <li
            v-for="item of searchItems"
            :key="item.id"
            class="my-card-for-portfolio"
          >
            <h4 class="my-card-title" :title="item.title">
              {{ trimTitle(item.title) }}
            </h4>
            <div class="image-container">
              <img
                class="card-image"
                :title="item.title"
                :src="item.cardImage"
                :alt="item.id"
              />
               <span v-if="item.grade != null" class="grade-image-text">{{item.grade}}</span>
            </div>
            <button
              class="my-card-view-listing"
              @click="addToMyPortfolioPrice(item.id)"
            >
              Add
            </button>
          </li>
        </ul>
      </div>
    </b-modal>

    <b-modal
      id="addToPortfolioPurchasePrice"
      v-bind:title="portfolioPopUpTitle"
      size="xl"
      hide-footer
    >
      <div class="row advance-search-wrapper advance-search">
        <div class="col-md-6">
          <div class="form-group row">
            <label
              for="staticPurchasePrice"
              class="col-md-2 col-sm-2 col-form-label"
              >Price $</label
            >
            <div class="col-md-9 col-sm-9">
              <input
                v-model="addPortfolioVar.price"
                type="text"
                class="form-control-plaintext"
              />
            </div>
          </div>
        </div>

        <div class="col-md-6" v-if="addPortfolioVar.isedit == 'no'">
          <div class="form-group row">
            <label
              for="staticPurchaseQuantity"
              class="col-md-2 col-sm-2 col-form-label"
              >Quantity</label
            >
            <div class="col-md-9 col-sm-9">
              <input
                v-model="addPortfolioVar.quantity"
                type="text"
                class="form-control-plaintext"
              />
            </div>
          </div>
        </div>

        <div class="col-md-6" v-if="addPortfolioVar.isedit == 'yes'">
          <div class="form-group row">
            <label
              for="staticPurchaseQuantity"
              class="col-md-2 col-sm-2 col-form-label"
              >Grading</label
            >
            <div class="col-md-9 col-sm-9">
              <!-- <input
                v-model="addPortfolioVar.quantity"
                type="text"
                class="form-control-plaintext"
              /> -->
              <select class="form-control grading" v-model="addPortfolioVar.grade" @change="updateGrading(addPortfolioVar)">
                <option value="null" selected>Select Grade Status</option>
                <option v-for='gr in ["review", "pending", "graded"]' :key='"grading-"+gr' :value="gr" v-text="gr" class="text-capitalize"></option>
              </select>
            </div>
          </div>
        </div>


      </div>
      <div class="row">
        <div class="col-sm-12 text-center">
          <button class="update-search-result" @click="addToMyPortfolio()">
            Save
          </button>
            <button class="update-search-result" @click="deleteMyPortfolio()"  v-if="addPortfolioVar.isedit != 'no'">
            Delete From Portfolio
          </button>
        </div>
      </div>
    </b-modal>

    
  </div>
</template>

<script>
import CardSlabItemPortfolio from '~/components/dashboard/CardSlabItemPortfolio'
import CardSlabItemFeatured from '~/components/dashboard/CardSlabItemFeatured'
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'My Portfolio - Slabstox',
    }
  },
  mounted() {
    this.getCards()
    this.getWishlist()
    this.getValue()
    this.getSlabFiltersData()
    // this.updateGraph()
  },
  components: {
    CardSlabItemPortfolio,
    CardSlabItemFeatured,
    vSelect,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      value: 0,
      filterByKeword: null,
      activeDaysGraph: 2,
      initGraphLabelLength: 0,
      graphDataEmpty: false,
      noMoreData: false,
      apiData: {},
      portfolioSearch: {
        player: '',
        sport: '',
        year: '',
        brand: '',
        card: '',
        rc: '',
        variation: '',
        grade: '',
      },
      portfolioPopUpTitle: 'Add to Price and Quantity',
      addPortfolioVar: {
        isedit: 'no',
        id: 0,
        quantity: 0,
        price: 0,
        grade: 0,
      },
      portfolioFilter: {
        sport: [],
        year: [],
        brand: [],
        card: [],
        variation: [],
        grade: [],
      },
      items: [],
      wishlistitems: [],
      searchItems: [],
      requestInProcess: false,
      wishlistRequestInProcess: false,
      valueRequestInProcess: false,
      series: [
        {
          name: 'Portfolio',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
          type: 'categories',
          categories: [],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    }
  },
  methods: {
    changeInWaitList() {
      // this.getWishlist()
    },
    filterBy(data) {
      this.filterByKeword = data
      this.getCards()
    },
    trimTitle(title) {
      if (title.length > 53) {
        title = title.substring(0, 53)
        title += '...'
        return title
      }
      return title
    },
    openModal() {
      this.$bvModal.show('addToPortfolio')
    },
    getValue() {
      if (!this.valueRequestInProcess) {
        try {
          this.showLoader()
          this.items = []
          this.valueRequestInProcess = true
          this.$axios.$post('portfolio/portfolio-value', {}).then((res) => {
            this.hideLoader()
            this.valueRequestInProcess = false
            if (res.status == 200) {
              this.value = res.value
              this.apiData = res
            }
          })
        } catch (err) {
          this.hideLoader()
          this.valueRequestInProcess = false
          console.log(err)
        }
      }
    },
    getCards() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.items = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/listing', {
              search: this.keyword,
              filterBy: this.filterByKeword,
            })
            .then((res) => {
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
    },
    getWishlist(status = false) {
      if (!this.wishlistRequestInProcess) {
        try {
          this.wishlistRequestInProcess = true
          this.$axios
            .$post('watchlist/search', {
              page: 1,
              search: this.keyword,
              filterBy: null,
            })
            .then((res) => {
              this.wishlistRequestInProcess = false
              if (res.status == 200) {
                if (res.data != null && res.data.length > 0) {
                  if (status) {
                    res.data.map((item) => {
                      this.wishlistitems.push(item)
                    })
                  } else {
                    this.wishlistitems = res.data
                  }
                  this.page = res.next
                } else {
                  if (!status) {
                    this.wishlistitems = []
                  } else {
                    this.noMoreData = true
                  }
                }
              }
            })
        } catch (err) {
          this.wishlistRequestInProcess = false
          console.log(err)
        }
      }
    },
    getSlabFiltersData() {
      try {
        this.$axios.$get('portfolio/filters').then((res) => {
          if (res.status == 200) {
            this.portfolioFilter.sport = res.data.sport
            this.portfolioFilter.year = res.data.year
            this.portfolioFilter.brand = res.data.brand
            this.portfolioFilter.card = res.data.card
            this.portfolioFilter.variation = res.data.variation
            this.portfolioFilter.grade = res.data.grade
          }
          console.log(res)
        })
      } catch (err) {
        console.log(err)
      }
    },
    searchCards() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.searchItems = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/search', {
              filter: this.portfolioSearch,
            })
            .then((res) => {
              this.hideLoader()
              this.requestInProcess = false
              if (res.status == 200) {
                this.searchItems = res.data
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    updateGrading(addPortfolioVar){
      try{
        this.$axios
            .post('portfolio/gradeCard', {
              my_portfolio_id: addPortfolioVar.id,
              grade: addPortfolioVar.grade
            })
            .then(res => {
              this.getCards()
              // this.$toast.success('Card graded successfully.')
              this.hideLoader()
            }).catch(err => {
              console.log(err)
            })
        } catch (err) {        
          console.log(err)
        }
    },
    updateToMyPortfolioPrice(tarr) {
      this.portfolioPopUpTitle = 'Update ' + tarr.title
      this.addPortfolioVar.isedit = 'yes'
      this.addPortfolioVar.id = tarr.portfolio_id
      this.addPortfolioVar.quantity = tarr.quantity
      this.addPortfolioVar.price = tarr.purchase_price
      this.addPortfolioVar.grade = tarr.grade
      this.$bvModal.show('addToPortfolioPurchasePrice')
    },
    addToMyPortfolioPrice(id) {
      this.portfolioPopUpTitle = 'Add to Price and Quantity'
      this.addPortfolioVar.isedit = 'no'
      this.addPortfolioVar.id = id
      this.addPortfolioVar.quantity = 0
      this.addPortfolioVar.price = 0
       this.addPortfolioVar.grade = 0
      this.$bvModal.hide('addToPortfolio')
      this.$bvModal.show('addToPortfolioPurchasePrice')
    },
    addToMyPortfolio() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.searchItems = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/add', this.addPortfolioVar)
            .then((res) => {
              this.hideLoader()
              this.requestInProcess = false
              if (res.status == 200) {
                this.getCards()
                this.getValue();
                this.$bvModal.hide('addToPortfolio')
                this.$bvModal.hide('addToPortfolioPurchasePrice')
                this.addPortfolioVar.id = 0
                this.addPortfolioVar.quantity = 0
                this.addPortfolioVar.price = 0
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
     deleteMyPortfolio() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.searchItems = []
          this.requestInProcess = true
          this.$axios
            .$post('portfolio/delete', this.addPortfolioVar)
            .then((res) => {
              this.hideLoader()
              this.requestInProcess = false
              if (res.status == 200) {
                this.getCards()
                this.getValue();
                this.$bvModal.hide('addToPortfolio')
                this.$bvModal.hide('addToPortfolioPurchasePrice')
                this.addPortfolioVar.id = 0
                this.addPortfolioVar.quantity = 0
                this.addPortfolioVar.price = 0
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
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
.my-p-graph {
  padding-left: 0;
  padding-bottom: 20px;
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

.add-to-portfolio-search {
  .form-group {
    margin: 0;
  }
  .col-form-label {
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 2px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .form-control-plaintext {
    background-color: #f4f4f4;
    height: 30px;
    border-radius: 2px;
    padding: 0px 10px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #000;
      opacity: 1;
    }
  }
  .select_wrap {
    position: relative;
    &:before {
      content: '\f107';
      position: absolute;
      font-family: FontAwesome;
      top: 3px;
      right: 17px;
      left: auto;
      font-weight: 900;
    }

    .form-control-select {
      background-color: #f4f4f4;
      height: 30px;
      width: 100%;
      border: none;
      border-radius: 2px;
      padding: 0px 10px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      font-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &:focus {
        outline: none;
      }
    }
  }
  .update-search-result {
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    border-radius: 2px;
    background: linear-gradient(
      to left,
      rgba(10, 178, 95, 0.76) 0%,
      rgba(27, 231, 131, 0.76) 33%,
      rgba(5, 251, 98, 0.76) 100%
    );
    padding: 7px 35px;
    color: #000000;
    font-size: 13px;
  }
}
.my-card-for-portfolio-outer {
  ul {
    padding: 20px 0px 0 10px;
    margin: 0;
  }
}
.my-card-for-portfolio {
  display: inline-block;
  // width: 120px;
  width: 11.1%;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  @media (max-width: 1200px) {
    width: 16.6%;
  }
  @media (max-width: 992px) {
    width: 25%;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: #272d33;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 43px;
  }
  .my-card-current-bid-btn {
    width: 100%;
    padding-top: 7px;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .image-container {
    position: relative;
    padding: 5px;
    margin-bottom: 7px;
    text-align: center;
    background: #272d33;
    border-radius: 2px;
    height: 152px;
    @media (max-width: 768px) {
      height: 250px;
    }
    .icons-container {
      position: absolute;
      padding: 10px;
      right: 0;
      top: 9px;
      .icons {
        width: 32px;
        height: 32px;
        float: right;
        margin-top: -10px;
        cursor: pointer;
      }
    }
    .card-image {
      margin-top: 0px;
      width: auto;
      max-width: 100%;
      position: absolute;
      height: auto;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
      max-height: 245px;
    }
  }
  .my-card-view-listing {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    width: 100%;
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
    padding: 6px 5px 5px 5px;
    color: #000;
    font-size: 11px;
    display: block;
    text-align: center;
    text-transform: uppercase;
    border: 0;
  }
  .my-card-view-listing-on-ebay {
    width: 100%;
    text-align: center;
    a.my-card-view-listing-on-ebay-link {
      color: $theme-off-white;
      font-size: 8px;
      letter-spacing: 1px;
      line-height: 2;
      padding-top: 2px;
      font-style: italic;
    }
  }
}
.wishlist-card {
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
.top-card .card-btn {
  padding: 8px 12px 5px 12px;
  font-family: 'Nexabold', Helvetica, Arial, sans-serif;
  margin-bottom: 5px;
  &.pert-left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.doll-right {
    .doll-bor{
    height: 21px;
    width: 1px;
    background: #c9c9c9;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 4px;
    }
    position: relative;
    margin-left: -5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.form-control.grading{
  background-color: #f4f4f4;
    height: 30px;
    border-radius: 2px;
    padding: 0px 10px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
        border: 0;
}
.grade-image-text{
  position: absolute;
  bottom: 8px;
  left: 8px;
  letter-spacing: 1.4px;
  z-index: 9;
  border: 1px solid #1ce783;
    text-transform: uppercase;
    float: left;
    margin-top: -10px;
    font-family: "NexaBold", Helvetica, Arial, sans-serif;
    font-weight: 400;
    border-radius: 2px;
    padding: 3px 5px 0px 5px;
    color: #000;
    font-size: 10px;
    background: #1ce783;
}
</style>