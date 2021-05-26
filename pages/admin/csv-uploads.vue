<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">CSV Uploads</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped" id="csv-uploads-table">
              <thead>
                <tr>
                  <th>Import date</th>
                  <th>CSV Uploads</th>
                  <th>Status</th>
                  <th v-if="isAdmin">Action</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr
                  v-for="(card, key) of cards"
                  :key="card.id"
                  :id="'csv-upload-' + card.id"
                >
                  <td>
                    {{
                      $moment(card.created_at).format('MMMM DD Y - hh:mm:ss')
                    }}
                  </td>
                  <td>{{ card.file_name }}</td>
                  <td>{{ card.status == 1 ? 'Done' : 'Processing' }}</td>
                  <td class="text-center" v-if="isAdmin">
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      style="margin-top: 4px"
                      @click="deleteItem(card.id)"
                    >
                      Delete
                    </button>
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
                  <td colspan="4" class="text-center">No CSV uploads found.</td>
                </tr>
              </tbody>
              <!-- <tfoot>
                <tr v-if="page - 1 == 1 && cards.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(3)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && cards.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(4)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && cards.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(1)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(4)"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(5)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && cards.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page - 1)"
                    >
                      {{ page - 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(page)"
                    >
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page + 1)"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page + 2)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot> -->
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="csvDeletePopup" title="Delete CSV UPLOAD" hide-footer>
      <section class="ap p-4">
        <h6 class="text-capitalize">
          Do you really want to delete this data from the system?
        </h6>
        </section>
        <div class="ap clearfix text-right">
          <a
            href="javascript:void(0);"
            @click="deleteProceed"
            class="btn btn-success btn-table-spec mr-2"
            >Proceed</a
          >
          <a
            href="javascript:void(0);"
            @click="cancelItem"
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
  mounted() {
    this.getRequestedSlab(this.page)
  },
  components: {},
  data() {
    return {
      cards: [],
      page: 1,
      deleteCsv: null,
      requestInProcess: false,
    }
  },
   watch: {
    cards(val) {
      if (val.length > 0) {
        setTimeout(function () {
          if (!$.fn.dataTable.isDataTable('#csv-uploads-table')) {
            $('#csv-uploads-table').DataTable({
              pageLength: 20,
              oLanguage: { sSearch: '' },
              aoColumnDefs: [
                {
                  bSortable: false,
                  aTargets: [-1],
                },
              ],
            })
            $('.dataTables_filter input').attr('placeholder', 'Search')
          }
        }, 500)
      }
    },
  },
  methods: {
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('csv-uploads', {
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
    cancelItem() {
      this.deleteCsv = null
      this.$bvModal.hide('csvDeletePopup')
    },
    deleteItem(card_id) {
      this.deleteCsv = card_id
      this.$bvModal.show('csvDeletePopup')
    },
    deleteProceed() {
      this.$axios
        .get('delete-upload/' + this.deleteCsv)
        .then((res) => {
          if (res.status == 200) {
            $('#csv-upload-' + this.deleteCsv).remove()
            this.deleteCsv = null
            this.$bvModal.hide('csvDeletePopup')
            this.$toast.success('CSV uploads deleted successfully.')
          }
          this.requestInProcess = false
          this.hideLoader()
        })
        .catch((err) => {
          this.deleteCsv = null
          this.$bvModal.hide('csvDeletePopup')
          this.$toast.error('There has been error. Please try again.')
          this.requestInProcess = false
          this.hideLoader()
        })
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
