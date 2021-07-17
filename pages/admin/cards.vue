<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <div class="row">
              <div class="col-1">
                <h5 class="card-title">
                  <button class="theme-btn card-btn">Slabs</button>
                </h5>
              </div>

              <div class="col-11">
                <nuxt-link
                  v-if="!isDataEntry"
                  class="theme-green-btn card-btn pull-right"
                  to="/admin/create-card"
                >
                  Create Slab
                </nuxt-link>
                <nuxt-link
                  v-if="isAdmin"
                  class="theme-green-btn card-btn pull-right"
                  to="/admin/create-cards-excel"
                  style="margin-right: 5px"
                >
                  Import Slabs via CSV
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="card-body search-form">
            <div class="row">
              <div class="col-4">
                <select class="form-control text-capitalize main-sel-all">
                  <option>Change Status</option>
                  <option value="1">Published</option>
                  <option value="0">Unpublished</option>
                  <option value="4">Delete</option>
                </select>
                <button
                  class="btn btn-outline-secondary"
                  @click="updateStatus"
                  type="button"
                  id="button-addon2"
                >
                  Apply
                </button>
              </div>
              <div class="col-3">
                <select
                  id="sportFilter"
                  @change="getCards(1, $event)"
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
              <div class="col-4">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchTerm"
                    placeholder="Search Slabs"
                    aria-label="Search term..."
                    aria-describedby="button-addon2"
                    @keyup.enter="getCards(1)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      @click="getCards(1)"
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
                  <th style="width: 75px">Id</th>
                  <th>Sport</th>
                  <th>player</th>
                  <th>year</th>
                  <th>brand</th>
                  <th>card</th>
                  <th>rc</th>
                  <th>variation</th>
                  <th>grade</th>
                  <th class="text-center" v-if="!isDataEntry">Published</th>
                  <th class="text-center" v-if="!isDataEntry">Featured</th>
                  <th class="text-center" v-if="!isDataEntry">SX Pro</th>
                  <th style="width: 153px" class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <td>
                    <input
                      type="checkbox"
                      class="indi-checkbox"
                      :value="card.id"
                    />
                  </td>
                  <td>{{ card.id }}</td>
                  <td>{{ card.sport }}</td>
                  <td>{{ card.player }}</td>
                  <td>{{ card.year }}</td>
                  <td>{{ card.brand }}</td>
                  <td>{{ card.card }}</td>
                  <td>{{ card.rc }}</td>
                  <td>{{ card.variation }}</td>
                  <td>{{ card.grade }}</td>
                  <td class="text-center" v-if="!isDataEntry">
                    <!-- Unpublished -->
                    <button
                      class="card-btn btn btn-danger btn-table-spec tag"
                      v-if="card.active == 0"
                      @click="setCardStatus(card.id, 1)"
                    >
                      <i class="fa fa-close" aria-hidden="true"></i> 
                    </button>
                    <!-- Published -->
                    <button
                      class="card-btn btn btn-primary btn-table-spec tag"
                      v-if="card.active == 1"
                      @click="setCardStatus(card.id, 0)"
                    >
                      <i class="fa fa-check" aria-hidden="true"></i> 
                    </button>
                  </td>
                  <td class="text-center" v-if="!isDataEntry">
                    <!-- Not Featured -->
                    <button
                      class="card-btn btn btn-danger btn-table-spec tag"
                      v-if="card.is_featured == 0"
                      @click="setFeaturedCard(card.id, 1)"
                    >
                      <i class="fa fa-close" aria-hidden="true"></i> 
                    </button>
                    <!-- Featured -->
                    <button
                      class="card-btn btn btn-primary btn-table-spec tag"
                      v-if="card.is_featured == 1"
                      @click="setFeaturedCard(card.id, 0)"
                    >
                      <i class="fa fa-check" aria-hidden="true"></i> 
                    </button>
                  </td>
                  <td class="text-center" v-if="!isDataEntry">
                    <!-- Inactive -->
                    <button
                      class="card-btn btn btn-danger btn-table-spec tag"
                      v-if="card.is_sx == 0"
                      @click="setCardSx(card.id, 1)"
                    >
                      <i class="fa fa-close" aria-hidden="true"></i> 
                    </button>
                    <!-- Active -->
                    <button
                      class="card-btn btn btn-primary btn-table-spec tag"
                      v-if="card.is_sx == 1"
                      @click="setCardSx(card.id, 0)"
                    >
                      <i class="fa fa-check" aria-hidden="true"></i> 
                    </button>
                  </td>
                  <td class="text-center" v-if="isDataEntry">
                    <button
                      v-b-modal.submitAListingPopup
                      class="card-btn btn btn-primary btn-table-spec"
                      style="margin-top: 4px"
                      @click="reqAList.card_id = card.id"
                    >
                      Submit a Listing
                    </button>
                  </td>
                  <td class="text-center" v-else>
                    <button
                      class="card-btn btn btn-primary btn-table-spec"
                      style="margin-top: 4px"
                      @click="scrapItem(card.id)"
                    >
                      Add Listing
                    </button>

                    <nuxt-link
                      class="card-btn btn btn-primary btn-table-spec"
                      style="margin-top: 4px"
                      :to="`ebay-specific-listings?card=${card.id}`"
                      >All Listings</nuxt-link
                    >
                    <br />
                    <nuxt-link
                      class="card-btn btn btn-primary btn-table-spec"
                      style="margin-top: 4px"
                      :to="`all-sales-data?card_id=${card.id}`"
                      >All Sales Data</nuxt-link
                    >
                    <nuxt-link
                      v-if="!isModerator"
                      class="card-btn btn btn-primary btn-table-spec"
                      style="margin-top: 4px"
                      :to="`edit-card?card_id=${card.id}`"
                      >Edit Slab</nuxt-link
                    >
                  </td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="14" class="text-center">Loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="14" class="text-center">No slabs found.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="page - 1 == 1 && cards.length >= 30">
                  <td colspan="14">
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
                      @click="getCards(2)"
                      v-if="allPages >= 2"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(2)"
                      v-if="allPages >= 2"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && cards.length >= 30">
                  <td colspan="14">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn" @click="getCards(1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(3)"
                      v-if="allPages >= 3"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && cards.length >= 30">
                  <td colspan="14">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn" @click="getCards(2)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getCards(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(4)"
                      v-if="allPages >= 4"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && cards.length >= 30">
                  <td colspan="14">
                    <button class="theme-btn card-btn" @click="getCards(1)">
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(page - 3)"
                    >
                      {{ page - 3 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(page - 2)"
                    >
                      {{ page - 2 }}
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      {{ page - 1 }}
                    </button>
                    <button class="theme-btn card-btn" @click="getCards(page)">
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(page + 1)"
                      v-if="allPages >= page + 1"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      v-if="allPages >= page"
                      @click="getCards(page)"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(allPages)"
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
                      @click="getCards(1)"
                      v-if="page - 1 != 1"
                    >
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(page - 2)"
                      v-if="page - 2 > 0"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getCards(page - 2)"
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
        </div>
      </div>
    </div>
    <input
      type="file"
      style="display: none"
      ref="excel"
      @change="uploadExcelNow()"
    />
    <b-modal id="submitAListingPopup" title="Submit a Listing" hide-footer>
      <div class="shar-text">Enter eBay Link</div>
      <div class="form_column">
        <input
          v-model="reqAList.link"
          type="text"
          class="form-control"
          placeholder="Enter eBay link"
          required
        />
      </div>
      <div class="clearfix g-download-out text-right">
        <a
          href="javascript:void(0);"
          @click="submitAListing"
          class="g-download-img-all"
        >
          Submit
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - SlabStox',
    }
  },
  mounted() {
    this.getCards(this.page)
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
      cards: [],
      page: 1,
      allPages: 0,
      currentPage: 1,
      requestInProcess: false,
      uploadExcelType: null,
      sportsList: [],
      sportFilter: null,
      filter: null,
      reqAList: {
        card_id: 0,
        link: '',
      },
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

      this.statusChange(statusVal, listingArr)

      setTimeout(() => this.getCards(this.currentPage), 500)
    },
    statusChange(statusVal, id) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('change-card-status', {
              id: id,
              status: statusVal,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              // if(statusVal == 4){

              // }
              // location.reload()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    addItem(id) {
      this.$router.push('/admin/additem/' + id)
    },
    scrapItem(id) {
      this.$router.push('/admin/scrapitem/' + id)
    },
    getCards(page, filter = null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: page, search: this.searchTerm }
          if (filter != null) {
            payload['sport'] = filter.target.value
            this.sportFilter = filter
          } else if (this.sportFilter != null) {
            payload['sport'] = this.sportFilter.target.value
          }

          this.$axios
            .post('get-cards-list-for-admin', payload)
            .then((res) => {
              if (res.status == 200) {
                this.currentPage = page
                this.cards = res.data.data
                this.page = res.data.next
                this.allPages = res.data.all_pages
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
    setFeaturedCard(id, tstatus) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('set-featured-card', {
              is_featured: tstatus,
              id: id,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.$toast.success(res.data.message)
                this.getCards(this.currentPage)
              }
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
    setCardSx(id, tstatus) {
      // console.log(id, ' : ', tstatus)
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('set-card-sx', {
              is_sx: tstatus,
              id: id,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.$toast.success(res.data.message)
                this.getCards(this.currentPage)
              }
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
    setCardStatus(id, tstatus) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('set-card-status', {
              status: tstatus,
              id: id,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.$toast.success(res.data.message)
                this.getCards(this.currentPage)
              }
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
    uploadExcel(type) {
      this.uploadExcelType = type
      this.$refs.excel.click()
    },
    uploadExcelNow() {
      let formData = new FormData()
      const files = this.$refs.excel.files
      const file = files.item(0)
      if (
        file.type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        formData.append('file', file)
        formData.append('for', this.uploadExcelType)
        if (!this.requestInProcess) {
          try {
            this.showLoader()
            this.requestInProcess = true
            this.$axios
              .post('upload-slab-excel', formData)
              .then((res) => {
                this.requestInProcess = false
                this.hideLoader()
                this.uploadExcelType = null
                if (res.status == 200) {
                  this.$toast.success(res.data.message)
                  this.getCards(this.currentPage)
                }
              })
              .catch((err) => {
                this.requestInProcess = false
                this.hideLoader()
              })
          } catch (err) {
            this.hideLoader()
            this.uploadExcelType = null
            this.requestInProcess = false
            console.log(err)
          }
        }
      } else {
        this.$toast.error('Invalid File')
      }
    },
    submitAListing() {
      try {
        if (this.reqAList.link.trim().length == 0) {
          this.$toast.error('Please enter a valid link.')
          return false
        }
        if (this.reqAList.card_id == 0) return false
        this.$axios
          .$post('card/add-request-listing', {
            card_id: this.reqAList.card_id,
            link: this.reqAList.link,
          })
          .then((res) => {
            this.$bvModal.hide('submitAListingPopup')
            this.reqAList = { card_id: 0, link: '' }
            this.$toast.success(res.data.message)
          })
          .catch((err) => {
            console.log(err)
            this.$toast.error(
              'Invalid link. Please copy exact url from your browser address bar.'
            )
          })
      } catch (err) {
        console.log(err)
        this.$toast.error(
          'Invalid link. Please copy exact url from your browser address bar.'
        )
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
.main-sel-all {
  width: calc(100% - 82px);
  float: left;
}
.form_column input {
  width: 1000%;
  background: #39414a;
  border: 0px;
  color: #ffffff;
  font-size: 11px;
  letter-spacing: 2px;
  line-height: 20px;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  margin: 0px 20px;
  border-bottom: 1px solid #fff !important;
  border-radius: 0;
  &:focus {
    box-shadow: none;
  }
}
.shar-text {
  margin-left: 20px;
  padding: 10px 0 4px 0;
}
.g-download-img-all {
  font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
  color: #1ce783;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 1px;
}
.g-download-out {
  margin: 20px 20px 0 20px;
}
</style>
