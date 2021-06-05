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
            <table class="table table-striped" id="all-request-listing-table">
              <thead>
                <tr>
                  <th style="width: 65px">Card Id</th>
                  <th>Card Title</th>
                  <th style="width: 51%">Link</th>
                  <th style="width: 100px">User</th>
                  <th style="width: 15%">Action</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <td>{{ card.card_id }}</td>
                  <td>
                    <a
                      target="_blank"
                      style="color: #28a745"
                      :href="currentOrigin + '/card-data/?id=' + card.card_id"
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
                    <!-- @click="action(1, card.id)" -->
                    <button
                      class="card-btn btn btn-success btn-table-spec"
                      @click="checkItem(card)"
                      style="margin-top: 4px"
                    >
                      Approve
                    </button>
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      @click="action(-1, card)"
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
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="checkSlabPopup" title="Change Card ID" hide-footer>
      <section class="ap p-4">
        <div class="form_column">
          <label>Card Id</label>
          <input
            v-model="checkCard.card_id"
            type="text"
            class="form-control"
            placeholder="Current Card ID"
            readonly
          />
        </div>
        <div class="form_column">
          <label>New Card Id</label>
          <input
            v-model="checkSlabNewId"
            type="text"
            class="form-control"
            placeholder="New Card ID"
          />
        </div>
        <div class="form_column" style="margin-top: -15px">
          <label></label><small>Enter new card ID if needed.</small>
        </div>
      </section>
      <div class="ap clearfix text-right">
        <a
          href="javascript:void(0);"
          @click="action(1, checkCard)"
          class="btn btn-success btn-table-spec mr-2"
          >Proceed</a
        >
        <a
          href="javascript:void(0);"
          @click="cancelRequest"
          class="btn btn-outline-danger btn-table-spec mr-4"
          >Cancel</a
        >
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
      title: 'Admin Dashboard - Slabstox',
    }
  },
  components: {},
  data() {
    return {
      cards: [],
      page: 1,
      checkSlabNewId: null,
      checkCard: [],
      requestInProcess: false,
      currentOrigin: location.origin,
    }
  },
  mounted() {
    this.getRequestedListing(this.page)
  },
  watch: {
    cards(val) {
      if (val.length > 0) {
        setTimeout(function () {
          if (!$.fn.dataTable.isDataTable('#all-request-listing-table')) {
            $('#all-request-listing-table').DataTable({
              pageLength: 20,
              oLanguage: { sSearch: '' },
              aoColumnDefs: [
                {
                  bSortable: false,
                  aTargets: [-1, -2, -3, -4],
                },
              ],
            })
            $('.dataTables_filter input').attr('placeholder', 'Search')
          }
        }, 100)
      }
    },
  },
   methods: {
    cancelRequest() {
      this.checkSlabOldId = null
      this.$bvModal.hide('checkSlabPopup')
    },
    checkItem(card) {
      this.checkCard = card
       this.checkSlabNewId= null
      this.$bvModal.show('checkSlabPopup')
    },
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
                // this.page = res.data.next
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
    action(sts, cardDetails) {
      this.showLoader()
      this.requestInProcess = true
      this.$axios
        .post('/card/requested-listing-action-for-admin', {
          rid: cardDetails.id,
          sts: sts,
          newSlabId: this.checkSlabNewId,
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
              item.auction_end = data.timeLeft
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
          this.$toast.error(err.response.data.message)
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
            this.checkSlabOldId = null
            this.$bvModal.hide('checkSlabPopup')
          })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false

          this.$toast.error(err.response.data.message)
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
