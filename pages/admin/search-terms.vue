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
            <table class="table table-striped" id="search-cards-table">
              <thead>
                <tr>
                  <th>Card Id</th>
                  <th>Search Term</th>
                  <th>User</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <td>
                    {{ card.card_details ? card.card_details.id : 'N/A' }}
                  </td>
                  <td>
                    <nuxt-link
                      style="color: #fff"
                      v-if="card.card_details != null"
                      :to="`ebay-specific-listings?card=${card.id}`"
                      >{{ card.card_details.title }}</nuxt-link
                    >
                    <span v-if="card.search != null">
                      {{ card.search }}
                    </span>
                  </td>
                  <td>
                    <nuxt-link
                      v-if="card.user_details != null"
                      style="color: #28a745"
                      :to="`users?id=${card.user_details.id}`"
                      >{{ card.user_details.full_name }}</nuxt-link
                    >
                  </td>
                  <td
                    :data-order="
                      $moment(card.created_at).format('YYYY-MM-DD HH:mm:ss')
                    "
                  >
                    {{
                      $moment(card.created_at).format('MMMM DD Y - hh:mm:ss')
                    }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="4" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="4" class="text-center">
                    No search terms found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
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
  mounted() {
    this.getRequestedSlab(this.page)
  },
  updated() {
    setTimeout(function () {
      if (!$.fn.dataTable.isDataTable('#search-cards-table')) {
        $('#search-cards-table').DataTable({
          pageLength: 20,
          dom: 'Bfrtip',
          buttons: [{ extend: 'csv', text: 'Export as CSV' }],
          oLanguage: { sSearch: '' },
          aoColumnDefs: [
            {
              bSortable: false,
              aTargets: [-2, -3, -4],
            },
          ],
        })
        $('.dataTables_filter input').attr('placeholder', 'Search Terms')
      }
    }, 1000)
  },
  components: {},
  data() {
    return {
      cards: [],
      page: 1,
      requestInProcess: false,
    }
  },
  methods: {
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('searched-cards', {
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
</style>
