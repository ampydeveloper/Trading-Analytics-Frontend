<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Listing Requests</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Card Id</th>
                  <th>Card</th>
                  <th>Link</th>
                  <th>User</th>
                  <th style="width: 15%">Action</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <td>{{ card.id }}</td>
                  <td>
                    <a
                      target="_blank"
                      style="color: #28a745"
                      :href="currentOrigin+'/card-data/?id='+card.id"
                      >
                    {{ card.card.title }}
                    </a>
                  </td>
                  <td class="text-lowercase">
                    <a
                      target="_blank"
                      style="color: #28a745"
                      :href="card.link"
                      >{{ card.link }}</a
                    >
                  </td>
                  <td>
                    <nuxt-link
                      style="color: #28a745"
                      :to="`users?id=${card.user.id}`"
                      >{{ card.user.full_name }} ({{
                        card.user.roles_label
                      }})</nuxt-link
                    >
                  </td>
                  <td>
                    <button
                      class="card-btn btn btn-success btn-table-spec"
                      @click="action(1, card.id)"
                      style="margin-top: 4px"
                    >
                      Approve
                    </button>
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      @click="action(-1, card.id)"
                      style="margin-top: 4px"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="5" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="5" class="text-center">
                    No listing requests available.
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <!-- <tr>
                  <td colspan="6">
                    <button class="theme-btn card-btn" :disabled="page == 2" @click="getRequestedListing(page - 1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getRequestedListing(page)">Next</button>
                  </td>
                </tr> -->
                <tr v-if="page - 1 == 1 && cards.length >= 30">
                  <td colspan="5">
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedListing(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(3)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && cards.length >= 30">
                  <td colspan="5">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedListing(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(4)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && cards.length >= 30">
                  <td colspan="5">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(1)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedListing(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(4)"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(5)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && cards.length >= 30">
                  <td colspan="5">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(page - 1)"
                    >
                      {{ page - 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedListing(page)"
                    >
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(page + 1)"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedListing(page + 2)"
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
      title: 'Admin Dashboard - Slabstox',
    }
  },
  mounted() {
    this.getRequestedListing(this.page)
  },
  components: {},
  data() {
    return {
      cards: [],
      page: 1,
      requestInProcess: false,
      currentOrigin: location.origin,
    }
  },
  methods: {
    getRequestedListing(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('card/get-request-listing-list-for-admin', {
              page: page,
            })
            .then((res) => {
              if (res.status == 200) {
                this.cards = res.data.data
                this.page = res.data.next
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
    action(sts, rid) {
      this.showLoader()
      this.requestInProcess = true
      this.$axios
        .post('/card/requested-listing-action-for-admin', {
          rid: rid,
          sts: sts,
        })
        .then((res) => {
          if (res.status == 200) {
            if (sts == -1) {
              this.$toast.info(res.data.data)
              this.requestInProcess = false
              this.hideLoader()
              this.getRequestedListing()
            } else {
              let data = res.data.data
              let item = {}
              item.title = data.name
              item.card_id = data.card_id
              item.itemId = data.ebay_id
              item.price = data.price
              item.condition = data.condition
              item.time_left = data.timeLeft
              item.image = data.image
              item.location = data.location
              item.auction_start = ''
              item.auction_end = ''
              item.shipToLocations = data.shipToLocations
              item.ReturnPolicy = data.returns
              item.web_link = data.item_link
              item.seller_name = data.seller.name
              item.positiveFeedbackPercent = data.seller.feedback
              item.seller_contact_link = data.seller.contact
              item.seller_store_link = ''
              item.specifics = data.specifics
              item.details = data
              this.requestInProcess = false
              this.createItem(item)
            }
          }
          // this.hideLoader()
        })
        .catch((err) => {
          this.requestInProcess = false
          this.hideLoader()
        })
    },
    createItem(item) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios.post('create-new-item-from-admin', item).then((res) => {
            this.requestInProcess = false
            this.$toast.success(res.data.data.message)
            this.getRequestedListing()
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
</style>
