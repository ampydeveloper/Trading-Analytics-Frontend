<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">All Listings</button>
               <button
                      class="theme-green-btn card-btn pull-right"
                      style="margin-right: 5px"
                      @click="scrapItem(card_id)"
                    >
                      Add Listing
                    </button> 
            </h5>
          </div>
          <div class="card-body search-form">
            <div class="row">
              <!-- <div class="col-2">
                  <select id="sportFilter" @change='getItems(currentPage, $event)' class="form-control text-capitalize">
                    <option selected>Select Sport</option>
                    <option :value="sport" v-for='sport in sportsList' :key='sport' v-text='sport' class="text-capitalize"></option>
                  </select>
                </div> -->
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
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                   <th><input type="checkbox"  /></th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sold Price</th>
                  <th>Listing Id</th>
                   <th>Card Id</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="items.length > 0">
                <tr v-for="(item, key) of items" :key="item.id">
                  <td><input type="checkbox" /></td>
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
                   <td>{{ item.card_id }}</td>
                  <td>{{ item.status == 0 ? 'Active' : 'Inactive' }}</td>
                  <td>
                    <select
                      @change="statusChange($event, item.id, key)"
                      class="form-control text-capitalize"
                    >
                      <option disabled>Status</option>
                      <option value="0">Active</option>
                      <option value="2">Disable</option>
                    </select>
                    <nuxt-link
                      class="card-btn btn btn-primary btn-table-spec"
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
                <!-- <tr>
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
                </tr> -->
                 <tr v-if="page-1 == 1">
                  <td colspan="9">
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
                  <td colspan="9">
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
                  <td colspan="9">
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
                  <td colspan="9">
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
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - SlabStox',
    }
  },
  mounted() {
     this.card_id = this.$route.query.card;
    this.getItems(this.page, this.$route.query.card)
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
      card_id:null
    }
  },
  methods: {
     scrapItem(id) {
      this.$router.push('/admin/scrapitem/' + id)
    },
    getItems(page, card_id, filter = null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = {
            page: page,
            card_id: card_id,
            search: this.searchTerm,
          }
          if (filter != null) payload['sport'] = filter.target.value
          this.$axios
            .post('get-ebay-specific-list', payload)
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
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('admin/change-ebay-status', {
              id: id,
              status: event.target.value,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              this.items[key].status = event.target.value
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
