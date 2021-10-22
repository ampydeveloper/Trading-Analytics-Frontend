<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">All Listings</button>
              <nuxt-link
                v-if="isAdmin"
                class="theme-green-btn card-btn pull-right"
                :to="`/admin/create-listings-excel`"
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
                  <option value="">Change Status</option>
                  <option value="0">Active</option>
                  <option value="2">Disable</option>
                  <option value="3">Delete</option>
                </select>
              </div>
              <div class="col-2">
                <select
                  id="sportFilter"
                  @change="getItems(1, $event)"
                  class="form-control text-capitalize"
                >
                  <option selected>Select Sport</option>
                  <option class="text-capitalize" v-for="sport in attributes.sport" :key="sport"  :value="sport">{{sport}}</option>
                  <option value="random_bin">Random Bin</option>
                </select>
              </div>
              <div class="col-2">
                <select
                  id="simpleFilter"
                  @change="getItems(1, null, $event)"
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
                    @keyup.enter="getItems(1)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      @click="getItems(1)"
                      type="button"
                      id="button-addon2"
                    >
                     <i class="fa serach-icon fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-2">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control disable-arrow"
                    v-model="searchPage"
                    placeholder="Search Page"
                    aria-label="Search term..."
                    aria-describedby="button-addon2"
                    @keyup.enter="getItems(searchPage)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      @click="getItems(searchPage)"
                      type="button"
                      id="button-addon2"
                    >
                     <i class="fa serach-icon fa-search"></i>
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
                  <th style="width: 75px">Id</th>
                  <th>Title</th>
                  <th style="width: 83px">Time Left</th>
                  <th style="width: 80px">Price</th>
                  <th style="width: 120px">Sold Price</th>
                  <th style="width: 130px">Listing Id</th>
                  <th style="width: 75px">Slab Id</th>
                  <th style="width: 70px">Status</th>
                  <th style="width: 160px" v-if="!isDataEntry">Actions</th>
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
                  <td>
                    {{ item.time_left != '0s' ? item.time_left : '00:00' }}
                  </td>
                  <td>${{ item.price }}</td>
                  <td class="search-form tabel-in">
                    <input
                      type="text"
                      class="form-control"
                      v-model="item.sold_price"
                      placeholder=""
                    />
                    <button
                      class="btn btn-outline-secondary"
                      @click="saveSoldPrice(item)"
                      type="button"
                      id="button-addon2"
                    >
                      <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                  </td>
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.card_id }}</td>
                  <td>{{ item.status == 0 ? 'Active' : 'Inactive' }}</td>
                  <td v-if="!isDataEntry">
                    <select
                      @change="deleteListing($event, item.id, key)"
                      class="form-control text-capitalize change-status"
                    >
                      <option value="">Change Status</option>
                      <option value="0">Active</option>
                      <option value="2">Disable</option>
                      <option value="3">Delete</option>
                    </select>
                    <nuxt-link
                      class="card-btn btn btn-primary btn-table-spec"
                      style="margin-top: 4px"
                      :to="`edit-listing?listing_id=${item.id}`"
                      >Edit Listing</nuxt-link
                    >
                  </td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess">
                <tr>
                  <td colspan="9" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="9" class="text-center">No listings found.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="page - 1 == 1 && items.length >= 30">
                  <td colspan="9">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn disable-pagination">
                      Previous
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      1
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(2)"
                      v-if="allPages >= 2"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(2)"
                      v-if="allPages >= 2"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && items.length >= 30">
                  <td colspan="9">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(3)"
                      v-if="allPages >= 3"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && items.length >= 30">
                  <td colspan="9">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(2)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(4)"
                      v-if="allPages >= 4"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && items.length >= 30">
                  <td colspan="9">
                    <button class="theme-btn card-btn" @click="getItems(1)">
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page - 3)"
                    >
                      {{ page - 3 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page - 2)"
                    >
                      {{ page - 2 }}
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      {{ page - 1 }}
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(page)">
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page + 1)"
                      v-if="allPages >= page + 1"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page)"
                      v-if="allPages >= page"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == allPages">
                  <td colspan="14">
                    <button
                      class="theme-btn card-btn disable-pagination"
                      v-if="page - 1 == 1"
                    >
                      First
                    </button>
                    <button
                      class="theme-btn card-btn disable-pagination"
                      v-if="page - 1 == 1"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(1)"
                      v-if="page - 1 != 1"
                    >
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page - 2)"
                      v-if="page - 2 > 0"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getItems(page - 2)"
                      v-if="page - 2 > 0"
                    >
                      {{ page - 2 }}
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      {{ page - 1 }}
                    </button>

                    <button class="theme-btn card-btn disable-pagination">
                      Next
                    </button>
                    <button class="theme-btn card-btn disable-pagination">
                      Last
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <b-modal id="DeletePopup" @hide="cancelListing()" class="modal-content" title="Delete Listing" hide-footer>
            <section class="ap">
              <h6 class="text-capitalize p-4">
                Do you really want to delete this Listing?
              </h6>
              </section>
              <div class="ap clearfix text-right">
                <a
                  href="javascript:void(0);"
                  @click="deleteProceed()"
                  class="btn btn-success btn-table-spec mr-2"
                  >Proceed</a
                >
                <a
                  href="javascript:void(0);"
                  @click="cancelListing()"
                  class="btn btn-outline-danger btn-table-spec mr-4"
                  >Cancel</a
                >
              </div>
            
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { DEV_API } from '../../constants/keys'
import { mapGetters } from 'vuex'
import { FILTERS } from '../../constants/advance_search_filter'
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - SlabStox',
    }
  },
  mounted() {
    if (this.$route.query.item != null) {
      this.searchItem(this.$route.query.item)
    } else if (this.$route.query.page) {
      this.getItems(this.$route.query.page)
    } else {
      this.getItems(this.page)
    }
  },
  watch() {},
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
      searchPage: '',
      items: [],
      requestInProcess: false,
      page: 1,
      currentPage: 1,
      noMoreData: false,
      // sportsList: [],
      sportFilter: null,
      otherFilter: null,
      filter: null,
      allPages: 0,
      popup:false,
      status_from:'',
      item_id:'',
      // card: {
      //   soldPrice: '',
      // },
      filters: { ...FILTERS },
    }
  }, 
  computed: {
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes'
    })
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
      // if(this.popup != false){
      //   this.statusChange(statusVal, listingArr, false)
      //   this.$bvModal.hide('DeletePopup')
      //   $('.main-sel-all').val($('.main-sel-all option:first').val())
      //   this.popup = false
      // }else{
      //   this.$bvModal.show('DeletePopup')
      //   this.status_from = 0
      // }
      if(this.popup != false && statusVal == 3){
        this.statusChange(statusVal, listingArr, false)
        this.$bvModal.hide('DeletePopup')
        $('.main-sel-all').val($('.main-sel-all option:first').val())
        this.popup = false
      }else if(this.popup == false && statusVal == 3){
        this.$bvModal.show('DeletePopup')
        this.status_from = 0
      }else{
        this.statusChange(statusVal, listingArr, false)
      }
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
              if (res.status == 200) {
                this.currentPage = 1
                this.items = res.data.data
                this.page = res.data.next
                // this.sportsList = res.data.sportsList
                this.allPages = res.data.all_pages
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
    getItems(page, filter = null, filter2 = null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: page, search: this.searchTerm }
          this.$router.push('/admin/ebay-items-listings?page=' + page)
          // if (filter != null) payload['sport'] = filter.target.value

          if (filter != null) {
            payload['sport'] = filter.target.value
            this.sportFilter = filter
          } else if (this.sportFilter != null) {
            payload['sport'] = this.sportFilter.target.value
          }
          if (filter2 != null) {
            payload['filter_by'] = filter2.target.value
            this.otherFilter = filter2
          } else if (this.otherFilter != null) {
            payload['filter_by'] = this.otherFilter.target.value
          }

          this.$axios
            .post('get-ebay-list', payload)
            .then((res) => {
              if (res.status == 200) {
                this.currentPage = page
                this.items = res.data.data
                this.page = res.data.next
                // this.sportsList = res.data.sportsList
                this.allPages = res.data.all_pages
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
    cancelListing() {
      this.$bvModal.hide('DeletePopup')
      $('.main-sel-all').val($('.main-sel-all option:first').val())
      $('.change-status').val($('.change-status option:first').val())
      this.popup = false
    },
    deleteListing(event, id, key){
      var statusVal = $('.change-status').val()
      var d_id = this.item_id
      if(this.popup != false && statusVal == 3){
        this.statusChange(statusVal, d_id, false)
        this.$bvModal.hide('DeletePopup')
        $('.change-status').val($('.change-status option:first').val())
        this.popup = false
      }else if(this.popup == false && statusVal == 3){
        this.$bvModal.show('DeletePopup')
        this.status_from = 1
        this.item_id = id
      }else{
        this.statusChange(statusVal, id, false)
      }

    },
    deleteProceed(){
        this.popup = true
        if(this.status_from == 0){
          this.updateStatus()
        }else{
          this.deleteListing()
        }

    },
    statusChange(event, id, key) {
      if (!this.requestInProcess) {
        if (typeof key == 'boolean' && key == false) {
          var statusVal = event
        } else {
          var statusVal = event.target.value
        }
        if(statusVal != ''){
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
                }
                this.getItems(this.currentPage)
                $('.main-sel-all').val($('.main-sel-all option:first').val())
                $('.change-status').val($('.change-status option:first').val())
                this.item_id = ''
                // else {
                //   location.reload()
                // }
              })
          } catch (err) {
            this.hideLoader()
            this.requestInProcess = false
            console.log(err)
          }
        }
      }
    },
    saveSoldPrice(item) {
      if (!this.requestInProcess) {
        try {
          new Promise((resolve, reject) => {
            this.showLoader()
            this.requestInProcess = true
            this.$axios
              .$post('save-sold-price', {
                id: item.id,
                sold_price: item.sold_price,
              })
              .then((res) => {
                this.$toast.success('Sold price saved successfully.')
                if (this.requestInProcess) {
                  this.requestInProcess = false
                  this.hideLoader()
                  this.getItems(this.currentPage)
                }
              })
              .catch((err) => {
                this.$toast.error(
                  'There has been an error saving sold price. Please try again.',
                  { timeOut: 10000 }
                )
                this.requestInProcess = false
                this.hideLoader()
              })
            setTimeout(() => {
              if (this.requestInProcess) {
                resolve('done')
                this.requestInProcess = false
                this.getItems(this.currentPage)
                this.hideLoader()
              }
            }, 4000)
          })
        } catch (err) {
          this.$toast.error(
            'There has been an error saving sold price. Please try again.',
            { timeOut: 10000 }
          )
          this.hideLoader()
          this.requestInProcess = false
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
.active-pagination {
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
.serach-icon{
  font-size: 16px;
}
input.disable-arrow::-webkit-outer-spin-button,
input.disable-arrow::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
