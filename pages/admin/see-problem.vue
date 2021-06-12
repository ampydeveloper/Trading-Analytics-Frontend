<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Flag a Listings</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped" id="see-problem-table">
              <thead>
                <tr>
                  <!-- <th>Id</th> -->
                  <th>User</th>
                  <th>Ebay Listing</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="problems.length > 0">
                <tr v-for="problem of problems" :key="problem.id">
                  <!-- <td>{{ problem.id }}</td> -->
                  <td>
                    <nuxt-link
                      style="color: #28a745"
                      :to="`users?id=${problem.user.id}`"
                      >{{ problem.user.full_name }}</nuxt-link
                    >
                  </td>
                  <td>
                    <nuxt-link
                      v-if="problem.ebay != null"
                      style="color: #28a745"
                      :to="`ebay-items-listings?item=${problem.ebay.id}`"
                      >{{ problem.ebay.title }}
                    </nuxt-link>
                  </td>
                  <td>{{ problem.message }}</td>
                  <td>
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      @click="action(problem.ebay.id)"
                      style="margin-top: 4px"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="problems.length == 0 && requestInProcess">
                <tr>
                  <td colspan="4" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="problems.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="4" class="text-center">No listings flags.</td>
                </tr>
              </tbody>
              <!-- <tfoot>
                <tr v-if="page - 1 == 1 && problems.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getSeeProblems(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(3)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && problems.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getSeeProblems(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(4)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && problems.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(1)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getSeeProblems(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(4)"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(5)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && problems.length >= 30">
                  <td colspan="4">
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(page - 1)"
                    >
                      {{ page - 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getSeeProblems(page)"
                    >
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(page + 1)"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getSeeProblems(page + 2)"
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
    this.getSeeProblems(this.page)
  },
  components: {},
  data() {
    return {
      problems: [],
      page: 1,
      requestInProcess: false,
    }
  },
  watch: {
    problems(val) {
      if (val.length > 0) {
        setTimeout(function () {
          if (!$.fn.dataTable.isDataTable('#see-problem-table')) {
            $('#see-problem-table').DataTable({
              pageLength: 20,
              oLanguage: { sSearch: '' },
              aoColumnDefs: [
                {
                  bSortable: false,
                  aTargets: [-1, -2, -3],
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
    getSeeProblems(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('get-see-problem', {
              page: page,
            })
            .then((res) => {
              if (res.status == 200) {
                this.problems = res.data.data
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
    action(id) {
      this.showLoader()
      this.requestInProcess = true
      this.$axios
        .get('/see-problem-reject/' + id)
        .then((res) => {
          if (res.status == 200) {
            this.$toast.success(res.data.message)
            this.requestInProcess = false
            this.hideLoader()
            this.getSeeProblems()
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
.active-pagination {
  color: #1ce783;
  background: #272d33;
}
</style>
