<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Search Terms</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Card Id</th>
                  <th>Search Terms</th>
                  <th>User</th>
                   <th>Timestamp</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <td>{{ card.card_details.id }}</td>
                  <td>
                    <nuxt-link
                      style="color: #fff;"
                      :to="`ebay-specific-listings?card=${card.id}`"
                      >{{ card.card_details.title }}</nuxt-link
                    >
                  </td>
                  <td>
                    <nuxt-link
                      style="color:#28a745;"
                      :to="`users?id=${card.user_details.id}`"
                      >{{ card.user_details.full_name }}</nuxt-link
                    >
                  </td>
                    <td>{{ $moment(card.created_at).format('MMMM DD Y - hh:mm:ss') }}</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="4" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="4" class="text-center">No search terms found.</td>
                </tr>
              </tbody>
              <!-- <tfoot>
                <tr>
                  <td colspan="2">
                    <button class="theme-btn card-btn" :disabled="page == 2" @click="getRequestedSlab(page - 1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getRequestedSlab(page)">Next</button>
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
      title: 'Admin Dashboard - Slabstox'
    }
  },
  mounted() {
   this.getRequestedSlab(this.page)
  },
  components: {},
  data() {
    return {
      cards: [],
      page: 1,
      requestInProcess: false
    }
  },
  methods: {
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .get('searched-cards')
            .then(res => {
              if (res.status == 200) {
                this.cards = res.data.data
                // this.page = res.data.next
              }
              this.requestInProcess = false
               this.hideLoader()
            }).catch(err => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
        }
      }
    },
  }
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
