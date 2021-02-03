<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">All Listings</button>
            </h5>
          </div>
          <div class="card-body search-form">
            <div class="row">
              <div class="col-2">
                <select
                  id="sportFilter"
                  @change="getItems(currentPage, $event)"
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
                </select>
              </div>
              <div class="col-2">
                <select
                  id="simpleFilter"
                  @change="getItems(currentPage, $event)"
                  class="form-control text-capitalize"
                >
                  <option selected>Filter By</option>
                  <option value="" class="text-capitalize">Ending Soon</option>
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
          <!-- <div class="card-body search-form">
              <div class="row">
              <div class="col-2">
            <select class="form-control text-capitalize main-sel-all">
              <option disabled>Status</option>
              <option value="0">Active</option>
              <option value="2">Disable</option>
            </select>
            </div>
            </div>
          </div> -->
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <!-- <th><input type="checkbox" class="main-checkbox" /></th> -->
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
                  <!-- <td>
                    <input
                      type="checkbox"
                      class="indi-checkbox"
                      :value="item.id"
                    />
                  </td> -->
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
                  <td>{{ item.status == 1 ? 'Active' : 'Inactive' }}</td>
                  <td>
                    <select
                      @change="statusChange($event, item.id, key)"
                      class="form-control text-capitalize"
                    >
                      <option disabled>Status</option>
                      <option value="0">Active</option>
                      <option value="2">Disable</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess">
                <tr>
                  <td colspan="6" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="6" class="text-center">No listings found.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6">
                    <button
                      class="theme-btn card-btn"
                      :disabled="page == 2"
                      @click="getItems(page - 1)"
                    >
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(page)">
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
    this.getItems(this.page)
  },
  updated() {
    $('.main-sel-all').change(function () {
      var $this = $(this),
        statusVal = $this.val(),
        listingArr = []

      $('.indi-checkbox').each(function () {
        var $thisCheck = $(this)
        if ($thisCheck.is(':checked')) {
          listingArr.push($thisCheck.val())
        }
      })
// console.log(token);
//       $.ajax({
//         url: DEV_API+'change-ebay-status',
//         type: 'POST',
//         data: {
//           id: listingArr,
//           status: statusVal,
//         },
//         dataType: 'json',
//         success: function (data) {},
//         error: function (request, error) {},
//       })
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
    // addRemoveCheckbox(id) {
    //   const a = this.checkedItems.filter(item => item == id);
    //   if(a.length == 1) {
    //     this.checkedItems.splice(this.checkedItems.indexOf(id),1);
    //   }else{
    //     this.checkedItems.push(id);
    //   }
    // },
    // toggleCheckbox(){
    //   if(this.toggleCheckboxInput) {
    //     this.checkedItems = []
    //     this.checkedItems = this.data.map(item => {return item.id});
    //   }else{
    //     this.checkedItems = []
    //   }
    // },
    // isChecked(id) {
    //   const a = this.checkedItems.filter(item => item == id);
    //   if(a.length == 1) {
    //     return true;
    //   }
    //   return false;
    // },
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
            .$post('admin/change-ebay-status', {
              id: id,
              status: statusVal,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              if (key != false) {
                this.items[key].status = event.target.value
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
