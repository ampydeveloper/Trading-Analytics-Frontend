<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">All Listings</button>
              <nuxt-link
                class="theme-green-btn card-btn pull-right"
                :to='`/admin/create-listings-excel`'
                style="margin-right: 5px"
              >
                Import Listing via CSV
              </nuxt-link>
            </h5>
          </div>
          <div class="card-body search-form">
            <div class="row">
              <div class="col-2">
                <select
                  class="form-control text-capitalize main-sel-all"
                  @change="updateStatus"
                >
                  <option>Change Status</option>
                  <option value="0">Active</option>
                  <option value="2">Disable</option>
                </select>
              </div>
              <div class="col-2">
                <select
                  id="sportFilter"
                  @change="getSportItems(currentPage, $event)"
                  class="form-control text-capitalize"
                >
                  <option selected>Select Sport</option>
                  <option
                    :value="sport"
                    v-for="sport in sportsList"
                    :key="sport"
                    v-text="sport"
                    class="text-capitalize"
                  ></option>
                  <option value="random_bin">Random Bin</option>
                </select>
              </div>
              <div class="col-2">
                <select
                  id="simpleFilter"
                  @change="getItems(currentPage, $event)"
                  class="form-control text-capitalize"
                >
                  <option selected>Filter By</option>
                  <option value="ending_soon" class="text-capitalize">
                    Ending Soon
                  </option>
                </select>
              </div>
              <div class="col-3">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchTerm"
                    placeholder="Search Listings"
                    aria-label="Search term..."
                    aria-describedby="button-addon2"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      @click="getItems(currentPage)"
                      type="button"
                      id="button-addon2"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th><input type="checkbox" class="main-checkbox" /></th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sold Price</th>
                  <th>Listing Id</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="items.length > 0">
                <tr v-for="(item, key) of items" :key="item.id">
                  <td>
                    <input
                      type="checkbox"
                      class="indi-checkbox"
                      :value="item.id"
                    />
                  </td>
                  <td>{{ item.id }}</td>
                  <td>{{ item.title }}</td>
                  <td>${{ item.price }}</td>
                  <td class="search-form tabel-in">
                    <input
                      type="text"
                      class="form-control"
                      v-model="soldPrice"
                      placeholder=""
                    />
                    <button
                      class="btn btn-outline-secondary"
                      @click="saveSoldPrice(item.id)"
                      type="button"
                      id="button-addon2"
                    >
                      <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                  </td>
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.status == 0 ? 'Active' : 'Inactive' }}</td>
                  <td>
                    <select
                      @change="statusChange($event, item.id, key)"
                      class="form-control text-capitalize"
                    >
                      <option>Change Status</option>
                      <option value="0">Active</option>
                      <option value="2">Disable</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess">
                <tr>
                  <td colspan="8" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="8" class="text-center">No listings found.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="page-1 == 1">
                  <td colspan="8">
                    <button class="theme-btn card-btn active-pagination" @click="getItems(1)">
                      1
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(3)">
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page-1 == 2">
                  <td colspan="8">
                    <button class="theme-btn card-btn" @click="getItems(1)">
                      1
                    </button>
                    <button class="theme-btn card-btn active-pagination" @click="getItems(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(3)">
                      3
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(4)">
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page-1 == 3">
                  <td colspan="8">
                    <button
                      class="theme-btn card-btn"
                     
                      @click="getItems(1)"
                    >
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn active-pagination" @click="getItems(3)">
                      3
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(4)">
                      4
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(5)">
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="(page-1) > 3">
                  <td colspan="8">
                    <button
                      class="theme-btn card-btn"
                      
                      @click="getItems(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page - 1)"
                    >
                      {{ page - 1 }}
                    </button>
                    <button class="theme-btn card-btn active-pagination" @click="getItems(page)">
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page + 1)"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page + 2)"
                    >
                      Next
                    </button>
                  </td>
                </tr>

              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { DEV_API } from '../../constants/keys'
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - Slabstox',
    }
  },
  mounted() {
    if(this.$route.query.item != null){
    this.searchItem(this.$route.query.item)
    }else{
this.getItems(this.page)
    }
  },
  watch() {
  console.log('redd');
  },
  updated() {
    $('.main-checkbox').change(function () {
      if ($('.main-checkbox').is(':checked')) {
        $('.indi-checkbox').attr('checked', true)
      } else {
        $('.indi-checkbox').attr('checked', false)
      }
    })
  },
  components: {},
  data() {
    return {
      searchTerm: '',
      items: [],
      requestInProcess: false,
      page: 1,
      currentPage: 1,
      noMoreData: false,
      soldPrice: '',
      sportsList: [],
      sportFilter: '',
      filter: null,
      // card: {
      //   soldPrice: '',
      // },
    }
  },
  methods: {
    updateStatus() {
      var statusVal = $('.main-sel-all').val(),
        listingArr = []

      $('.indi-checkbox').each(function () {
        var $thisCheck = $(this)
        if ($thisCheck.is(':checked')) {
          listingArr.push($thisCheck.val())
        }
      })

      this.statusChange(statusVal, listingArr, false)
    },
    searchItem(searchItem) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: 1, search: searchItem }
          this.$axios
            .post('get-ebay-list', payload)
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.currentPage = 1
                this.items = res.data.data
                this.page = res.data.next
                this.sportsList = res.data.sportsList
                console.log(res.data.data);
              }
              this.requestInProcess = false
              this.hideLoader()
            })
            .catch((err) => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    getItems(page, filter = null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: page, search: this.searchTerm }
          if (filter != null) payload['sport'] = filter.target.value
          this.$axios
            .post('get-ebay-list', payload)
            .then((res) => {
              if (res.status == 200) {
                this.currentPage = page
                this.items = res.data.data
                this.page = res.data.next
                this.sportsList = res.data.sportsList
              }
              this.requestInProcess = false
              this.hideLoader()
            })
            .catch((err) => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    getSportItems(page, filter = null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: page, search: this.searchTerm }
          if (filter != null) payload['sport'] = filter.target.value
          this.$axios
            .post('get-ebay-list-for-sport', payload)
            .then((res) => {
              if (res.status == 200) {
                this.currentPage = page
                this.items = res.data.data
                this.page = res.data.next
                this.sportsList = res.data.sportsList
              }
              this.requestInProcess = false
              this.hideLoader()
            })
            .catch((err) => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    getStatus(status) {
      if (status == 0) {
        return 'Active'
      } else if (status == 1) {
        return 'Disabled by cron'
      } else if (status == 2) {
        return 'Disabled manually'
      }
    },
    statusChange(event, id, key) {
      if (!this.requestInProcess) {
        if (key == false) {
          var statusVal = event
        } else {
          var statusVal = event.target.value
        }
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('change-ebay-status', {
              id: id,
              status: statusVal,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              if (key != false) {
                this.items[key].status = event.target.value
              } else {
                location.reload()
              }
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    saveSoldPrice(id) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('save-sold-price', {
              id: id,
              sold_price: this.soldPrice,
            })
            .then((res) => {
              this.requestInProcess = false
              this.soldPrice = ''
              this.hideLoader()
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
ul.my-card-listing {
  list-style: none;
  padding: 0px;
}
.card-link {
  line-height: 2;
  margin-top: 2px;
}
.active-pagination{
      color: #1ce783;
    background: #272d33;
}
.search-form.tabel-in {
  .form-control {
    width: 65px;
    padding: 8px 6px !important;
    height: 27px !important;
    font-size: 13px;
    display: inline-block;
    float: left;
  }
  .btn-outline-secondary {
    height: 25px !important;
    padding: 4px 5px 3px 7px;
    line-height: 8px;
    display: inline-block;
  }
}
</style>
