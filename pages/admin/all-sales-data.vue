<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">All Sales Data</button>
              <nuxt-link
              class="theme-green-btn card-btn pull-right"
              :to="`create-sales-data?item=${card_id}`"
              >Add Sales Data</nuxt-link
            >
            </h5>
            
          </div>
          <!-- <div class="card-body search-form">
            <div class="row">
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
            </div>
          </div> -->
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="items.length > 0">
                <tr v-for="(item, key) of items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.timestamp }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.source }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>${{ item.cost }}</td>
                  <td>
                    <nuxt-link
                      class="card-btn btn btn-primary btn-table-spec"
                      :to="`edit-sales-data?sale_id=${item.id}`"
                      >Edit</nuxt-link
                    >
                    <button v-if='isAdmin'
                      class="card-btn btn btn-primary btn-table-spec"
                      @click="statusChange(item.id)"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess">
                <tr>
                  <td colspan="7" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="items.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="7" class="text-center">No sales data found.</td>
                </tr>
              </tbody>
              <!-- <tfoot>
                <tr>
                  <td colspan="6">
                    <button class="theme-btn card-btn" :disabled="page == 2" @click="getItems(page - 1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getItems(page)">Next</button>
                  </td>
                </tr>
              </tfoot> -->
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
      title: 'Admin Dashboard - Slabstox',
    }
  },
  mounted() {
    this.card_id = this.$route.query.card_id
    this.getItems(this.$route.query.card_id)
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
      card_id: '',
      sportsList: [],
      sportFilter: '',
      filter: null,
    }
  },
  methods: {
    getItems(card_id) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { card_id: card_id, search: this.searchTerm }
          this.$axios
            .post('get-sales-list', payload)
            .then((res) => {
              if (res.status == 200) {
                this.items = res.data.data
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
    statusChange(id) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .$post('change-sales-status', {
              id: id,
            })
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              this.getItems(this.card_id)
            })
        } catch (err) {
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
