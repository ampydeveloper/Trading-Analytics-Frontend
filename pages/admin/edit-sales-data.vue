<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card create_card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Edit Sales Data</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <form class="form-inline" v-on:submit.prevent="edit">
              <input type="hidden" value="" v-model="card.id" />
              <div class="form_column">
                <label>Sale Date</label>
                <b-form-datepicker
                  class="profile_datepicker"
                  v-model="card.timestamp"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: '2-digit',
                  }"
                  locale="en"
                ></b-form-datepicker>
              </div>
              <div class="form_column">
                <label>Type</label>
                <select v-model="card.type" class="form-control">
                  <option value="bin">Bin</option>
                  <option value="auction">Auction</option>
                </select>
              </div>
              <div class="form_column">
                <label>Source</label>
                <input
                  v-model="card.source"
                  type="text"
                  class="form-control"
                  placeholder="Source"
                  readonly
                  required
                />
              </div>
              <div class="form_column">
                <label>Quantity</label>
                <input
                  v-model="card.quantity"
                  type="number"
                  class="form-control"
                  placeholder="Quantity"
                  required
                />
              </div>
              <div class="form_column">
                <label>Price</label>
                <input
                  v-model="card.cost"
                  type="text"
                  class="form-control"
                  placeholder="Price"
                  required
                />
              </div>

              <div class="form_btns">
                <div class="left_btn">
                  <button
                    @click="back()"
                    type="button"
                    class="theme-green-btn card-btn btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
                <div class="right_btn">
                  <button
                    type="submit"
                    class="theme-green-btn card-btn btn-save"
                    :disabled="requestInProcess"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
            <div class="text-center message">
              <p v-if="statusMessage">{{ statusMessage }}</p>
            </div>
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
    this.getData(this.$route.query.sale_id)
  },
  components: {},
  data() {
    return {
      card: {
        id: '',
        card_id: '',
        timestamp: '',
        quantity: '',
        cost: '',
        source: '',
        type: '',
      },
      requestInProcess: false,
      statusMessage: null,
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getData(sale_id) {
      try {
        this.$axios.$get('get-edit-sales/' + sale_id).then((res) => {
          if (res.status == 200) {
            this.card = {
              id: res.data.id,
              card_id: res.data.card_id,
              timestamp: res.data.timestamp,
              quantity: res.data.quantity,
              cost: res.data.cost,
              source: (res.data.source=='Script'?'Ebay':res.data.source),
              type: res.data.type,
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    edit() {
      if (!this.requestInProcess) {
        try {
          new Promise((resolve, reject) => {
            this.showLoader()
            this.requestInProcess = true
            this.$axios
              .post('edit-sales-data', this.card)
              .then((res) => {
                if (res.status == 200) {
                  this.$toast.success(res.data.message)
                }
                if (this.requestInProcess) {
                  this.requestInProcess = false
                  this.$router.push(
                    'all-sales-data?card_id=' + this.card.card_id
                  )
                  this.hideLoader()
                }
              })
              .catch((err) => {
                this.$toast.error(
                  'There has been an error saving sales data. Please try again.',
                  { timeOut: 10000 }
                )
                this.requestInProcess = false
                this.hideLoader()
              })
            setTimeout(() => {
              if (this.requestInProcess) {
                resolve('done')
                this.requestInProcess = false
                this.$router.push('all-sales-data?card_id=' + this.card.card_id)
                this.hideLoader()
              }
            }, 3000)
          })
        } catch (err) {
          this.$toast.error(
            'There has been an error saving sales data. Please try again.',
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
.toasted.toasted-primary {
  background: #1ce783;
  border: none;
  border-radius: 2px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 8px 12px 5px 12px !important;
  color: #212529;
}

.message {
  color: green;
}
</style>
