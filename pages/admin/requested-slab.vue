<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Slab Requests</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped" id="requested-slabs-table">
              <thead>
                <tr>
                  <!-- <th>Id</th> -->
                  <th>User</th>
                  <th>Sport</th>
                  <th>player</th>
                  <th style="width:45px">year</th>
                  <th>brand</th>
                  <th>card</th>
                  <th style="width:28px">rc</th>
                  <th>variation</th>
                  <th>grade</th>
                  <th>image</th>
                  <th style="width:88px">Actions</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <!-- <td>{{ key }}</td> -->
                  <td>
                    <nuxt-link
                      style="color: #28a745"
                      :to="`users?id=${card.user.id}`"
                      >{{ card.user.full_name }}</nuxt-link
                    >
                  </td>
                  <td>{{ card.sport }}</td>
                  <td>{{ card.player }}</td>
                  <td>{{ card.year }}</td>
                  <td>{{ card.brand }}</td>
                  <td>{{ card.card }}</td>
                  <td>{{ card.rc }}</td>
                  <td>{{ card.variation }}</td>
                  <td>{{ card.grade }}</td>
                  <td>
                    <img
                      :src="card.cardImage"
                      title="Click to view"
                      class="cardImg"
                      @click="openImg(card.cardImage)"
                      v-if="card.image != null"
                      alt="Slab-image"
                      width="100"
                    /><span v-else>N/A</span>
                  </td>
                  <td>
                    <nuxt-link
                      class="card-btn btn btn-success btn-table-spec"
                      :to="`create-card?card_id=${card.id}`"
                    >
                      Approve
                    </nuxt-link>
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      @click="action(card.id)"
                      style="margin-top: 4px;display: block;"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="11" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="11" class="text-center">
                    No requested slab available.
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
      title: 'Admin Dashboard - SlabStox',
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
      requestInProcess: false,
    }
  },
  watch: {
    cards(val) {
      if (val.length > 0) {
        setTimeout(function () {
          if (!$.fn.dataTable.isDataTable('#requested-slabs-table')) {
            $('#requested-slabs-table').DataTable({
              pageLength: 20,
              oLanguage: { sSearch: '' },
              aoColumnDefs: [
                {
                  bSortable: false,
                  aTargets: [-1, -2],
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
    openImg(img) {
      window.open(img, '_blank')
    },
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('card/get-request-slab-list-for-admin', {
              page: page,
            })
            .then((res) => {
              if (res.status == 200) {
                this.cards = res.data.data
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
    action(id) {
      this.showLoader()
      this.requestInProcess = true
      this.$axios
        .post('/card/requested-slab-action-reject', {
          id: id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$toast.success(res.data.message)
            this.requestInProcess = false
            this.hideLoader()
            this.getRequestedSlab()
          }
        })
        .catch((err) => {
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
.cardImg {
  cursor: zoom-in;
}
.active-pagination {
  color: #1ce783;
  background: #272d33;
}
</style>
