<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">All Sold Listings</button>
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
                    class="text-capitalize"
                    v-for="sport in attributes.sport"
                    :key="sport"
                    :value="sport"
                  >
                    {{ sport }}
                  </option>
                  <option value="random_bin">Random Bin</option>
                </select>
              </div>
              <div class="col-3">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchTerm"
                    placeholder="Search Slabs"
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
                  <th
                    class="sorting"
                    @click=";(field_name = 'id'), order = true, changeOrder()"
                    style="width: 75px"
                  >
                    Id
                  </th>
                  <th
                  >
                    Title
                  </th>
                  <th
                    class="sorting"
                    @click=";(field_name = 'price'), order = true, changeOrder()"
                    style="width: 80px"
                  >
                    Price
                  </th>
                  <th
                    class="sorting"
                    @click=";(field_name = 'sold_price'), order = true, changeOrder()"
                    style="width: 120px"
                  >
                    Sold Price
                  </th>
                  <th
                    class="sorting"
                    @click=";(field_name = 'listing_ending_at'), order = true, changeOrder()"
                    style="width: 210px"
                  >
                    Date Sold
                  </th>
                  <th
                    style="width: 120px"
                  >
                    Username
                  </th>
                  <th
                    class="sorting"
                    @click=";(field_name = 'itemId'), order = true, changeOrder()"
                    style="width: 130px"
                  >
                    Listing Id
                  </th>
                  <th
                    class="sorting"
                    @click=";(field_name = 'card_id'), order = true, changeOrder()"
                    style="width: 75px"
                  >
                    Slab Id
                  </th>
                  <th
                    style="width: 70px"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody v-if="items.length > 0">
                <tr v-for="(item) of items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.title }}</td>
                  <td>${{ item.price }}</td>
                  <td>${{ item.sold_price }}</td>
                  <td
                    v-if="item.card_sales != null"
                    :data-order="
                      $moment(item.card_sales.timestamp).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )
                    "
                  >
                    {{
                      $moment(item.card_sales.timestamp).format(
                        'MMMM DD Y - HH:mm:ss'
                      )
                    }}
                  </td>
                  <td v-if="item.card_sales == null">-</td>
                  <td v-if="item.card_sales != null">
                    {{
                      item.card_sales.source == 'Script'
                        ? 'Python'
                        : item.card_sales.sale_user == null
                        ? ''
                        : item.card_sales.sale_user.full_name +
                          '(' +
                          item.card_sales.sale_user.id +
                          ')'
                    }}
                  </td>
                  <td v-if="item.card_sales == null">-</td>
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.card_id }}</td>
                  <td>{{ item.status == 1 ? 'Active' : 'Inactive' }}</td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess">
                <tr>
                  <td colspan="7" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="7" class="text-center">No listings found.</td>
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
                      @click="changeOrder(2)"
                      v-if="allPages >= 2"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(2)"
                      v-if="allPages >= 2"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(allPages)"
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
                    <button class="theme-btn card-btn" @click="changeOrder(1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(3)"
                      v-if="allPages >= 3"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(allPages)"
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
                    <button class="theme-btn card-btn" @click="changeOrder(2)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="changeOrder(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(4)"
                      v-if="allPages >= 4"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && items.length >= 30">
                  <td colspan="9">
                    <button class="theme-btn card-btn" @click="changeOrder(1)">
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page - 3)"
                    >
                      {{ page - 3 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page - 2)"
                    >
                      {{ page - 2 }}
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      {{ page - 1 }}
                    </button>
                    <button class="theme-btn card-btn" @click="changeOrder(page)">
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page + 1)"
                      v-if="allPages >= page + 1"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page)"
                      v-if="allPages >= page"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(allPages)"
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
                      @click="changeOrder(1)"
                      v-if="page - 1 != 1"
                    >
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page - 2)"
                      v-if="page - 2 > 0"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="changeOrder(page - 2)"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
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
    if (this.$route.query.page) {
      this.getItems(this.$route.query.page)
    } else {
      this.getItems(this.page)
    }

    $('.sorting').click(function () {
      if ($(this).hasClass('sorting_asc')) {
        $(this).removeClass('sorting_asc')
        $(this).addClass('sorting_desc')
        return
      } else if ($(this).hasClass('sorting_desc')) {
        $(this).removeClass('sorting_desc')
        $(this).addClass('sorting_asc')
        return
      } else {
        $('.sorting').each(function () {
          if ($(this).hasClass('sorting_asc')) {
            $(this).removeClass('sorting_asc')
          }
          if ($(this).hasClass('sorting_desc')) {
            $(this).removeClass('sorting_desc')
          }
        })
        $(this).addClass('sorting_asc')
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
      soldPrice: '',
      // sportsList: [],
      sportFilter: null,
      filter: null,
      allPages: 0,
      filters: { ...FILTERS },
      field_name: '',
      isSort: 0,
      old_field: '',
      order:false,
    }
  },
  computed: {
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes',
    }),
  },
  methods: {
    getItems(page, filter = null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: page, search: this.searchTerm }
          this.$router.push('/admin/sold-listings?page=' + page)
          
          if (filter != null) {
            payload['sport'] = filter.target.value
            this.sportFilter = filter
          } else if (this.sportFilter != null) {
            payload['sport'] = this.sportFilter.target.value
          }

          this.$axios
            .post('get-ebay-list-sold', payload)
            .then((res) => {
              if (res.status == 200) {
                this.currentPage = page
                this.items = res.data.data
                this.page = res.data.next
                this.sportsList = res.data.sportsList
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
              this.soldPrice = ''
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
    changeOrder(page,filter = null) {
      if (this.field_name != '') {
        if (this.old_field != this.field_name) {
          this.old_field = this.field_name
          if(this.order == true){
            console.log('top')
            this.isSort = 0
            if (this.isSort == 0) {
              this.isSort = 1
            } else if (this.isSort == 1) {
              this.isSort = 2
            } else if (this.isSort == 2) {
              this.isSort = 1
            } else {
              this.isSort = 0
            }
          }
          this.order = false

          if (this.isSort != 0) {
            if (!this.requestInProcess) {
              try {
                this.showLoader()
                this.requestInProcess = true
                let payload = {
                  page: page ? page : 1,
                  search: this.searchTerm,
                  column_name: this.old_field,
                  sort_type: (this.isSort==1?'ASC' : this.isSort==2 ?'DESC':'ASC'),
                }
                this.$router.push('/admin/sold-listings?page=' + page)

                if (filter != null) {
                  payload['sport'] = filter.target.value
                  this.sportFilter = filter
                } else if (this.sportFilter != null) {
                  payload['sport'] = this.sportFilter.target.value
                }

                this.$axios.post('get-ebay-list-sold-sorting', payload).then((res) => {
                  if (res.status == 200) {
                    this.items = res.data.data
                    this.page = res.data.next
                    this.sportsList = res.data.sportsList
                    this.allPages = res.data.all_pages
                  }
                  this.requestInProcess = false
                  this.hideLoader()
                })
              } catch (err) {
                this.hideLoader()
                this.requestInProcess = false
                console.log(err)
              }
            }
          }
        } else {
          if(this.order == true){
            console.log('bottom')
            if (this.isSort == 1) {
              this.isSort = 2
            } else if (this.isSort == 2) {
              this.isSort = 1
            } else {
              this.isSort = 0
            }
          }

          this.order = false
          if (!this.requestInProcess) {
            try {
              this.showLoader()
              this.requestInProcess = true
              let payload = {
                page: page ? page : 1,
                search: this.searchTerm,
                column_name: this.old_field,
                sort_type: (this.isSort==1?'ASC' : this.isSort==2 ?'DESC':'ASC'),
              }
              this.$router.push('/admin/sold-listings?page=' + page)

              if (filter != null) {
                payload['sport'] = filter.target.value
                this.sportFilter = filter
              } else if (this.sportFilter != null) {
                payload['sport'] = this.sportFilter.target.value
              }

              this.$axios.post('get-ebay-list-sold-sorting', payload).then((res) => {
                if (res.status == 200) {
                  this.items = res.data.data
                  this.page = res.data.next
                  this.sportsList = res.data.sportsList
                  this.allPages = res.data.all_pages
                }
                this.requestInProcess = false
                this.hideLoader()
              })
            } catch (err) {
              this.hideLoader()
              this.requestInProcess = false
              console.log(err)
            }
          }
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
.active-pagination {
  color: #1ce783;
  background: #272d33;
}
input.disable-arrow::-webkit-outer-spin-button,
input.disable-arrow::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
table.table-striped thead tr th.sorting {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7XQMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC);
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 100%;
}
table.table-striped thead tr th.sorting_desc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=) !important;
}
table.table-striped thead tr th.sorting_asc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==) !important;
}
</style>
