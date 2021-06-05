<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Activity Logs</button>
            </h5>
          </div>
          <div class="card-body search-form">
            <div class="row">
              <div class="col-3">
                <v-select
                  label="name"
                  placeholder="Select User"
                  :reduce="(name) => name.id"
                  :options="users"
                  v-model="selUser"
                >
                  <template slot="no-options">
                    Type to search users...</template
                  >
                </v-select>
              </div>
              <div class="col-3">
                <v-select
                  name="user"
                  label="name"
                  placeholder="Select Entity"
                  :reduce="(name) => name.id"
                  :options="models"
                  v-model="selModel"
                >
                  <template slot="no-options"> Select entity type...</template>
                </v-select>
              </div>
              <div
                class="col-2"
                v-if="selModel != null && selModel.includes('RequestListing')"
              >
                <v-select
                  label="name"
                  placeholder="Select Approval Status"
                  :reduce="(name) => name.id"
                  :options="[
                    { id: 1, name: 'Approved' },
                    { id: -1, name: 'Rejected' },
                  ]"
                  v-model="selSt"
                >
                  <template slot="no-options">
                    Select Approval Status...</template
                  >
                </v-select>
              </div>
              <div class="col-1">
                <button
                  class="btn btn-outline-secondary"
                  @click="getActivityLogs(1)"
                  type="button"
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
          <div class="table_wrapper ap">
            <span class="text-white"
              >Total Activity Count: {{ totalCount }}</span
            >
            <table class="table table-striped" id="all-activity-logs-table">
              <thead>
                <tr>
                  <th style="width: 75px">#</th>
                  <th style="width: 100px">Action</th>
                  <th style="width: 150px">Entity</th>
                  <th>Entity Id</th>
                  <th>Operations</th>
                  <th style="width: 150px">Date/time</th>
                </tr>
              </thead>
              <tbody v-if="logs.length > 0">
                <tr
                  v-for="(log, key) in logs"
                  :key="
                    log.id +
                    key +
                    log.subject_id +
                    Math.random().toString(36).substring(7)
                  "
                >
                  <td>{{ log.id }}</td>
                  <td>{{ log.description }}</td>
                  <td>{{ log.subject_type }}</td>
                  <td>
                    <span v-if="log.subject_type == 'Listings'">
                      <nuxt-link
                        :to="`/admin/edit-listing?listing_id=${log.subject_id}`"
                        >{{ log.subject_id }}</nuxt-link
                      >
                    </span>
                    <span v-else-if="log.subject_type == 'Card'">
                      <nuxt-link
                        :to="`/admin/edit-card?card_id=${log.subject_id}`"
                        >{{ log.subject_id }}</nuxt-link
                      >
                    </span>

                    <span v-else v-text="log.subject_id"></span>
                  </td>
                  <td>{{ log.properties }}</td>
                  <td>
                    {{ $moment(log.created_at).format('MMMM DD Y - hh:mm:ss') }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="logs.length == 0 && requestInProcess">
                <tr>
                  <td colspan="6" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="logs.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="6" class="text-center">
                    No Activity Logs found.
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6">
                    <button
                      class="theme-btn card-btn"
                      :disabled="page == 1"
                      @click="getActivityLogs(page-1)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      :disabled="page==last_page"
                      @click="getActivityLogs(page+1)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot>
               <!-- <tfoot>
                <tr v-if="page - 1 == 1 && logs.length >= 30">
                  <td colspan="14">
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
                      @click="getActivityLogs(2)"
                      v-if="allPages >= 2"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(2)"
                      v-if="allPages >= 2"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && logs.length >= 30">
                  <td colspan="14">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn" @click="getActivityLogs(1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(3)"
                      v-if="allPages >= 3"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(3)"
                      v-if="allPages >= 3"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && logs.length >= 30">
                  <td colspan="14">
                    <button class="theme-btn card-btn disable-pagination">
                      First
                    </button>
                    <button class="theme-btn card-btn" @click="getActivityLogs(2)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getActivityLogs(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(4)"
                      v-if="allPages >= 4"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(5)"
                      v-if="allPages >= 5"
                    >
                      5
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(6)"
                      v-if="allPages >= 6"
                    >
                      6
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(4)"
                      v-if="allPages >= 4"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(allPages)"
                    >
                      Last
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && logs.length >= 30">
                  <td colspan="14">
                    <button class="theme-btn card-btn" @click="getActivityLogs(1)">
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(page - 3)"
                    >
                      {{ page - 3 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(page - 2)"
                    >
                      {{ page - 2 }}
                    </button>
                    <button class="theme-btn card-btn active-pagination">
                      {{ page - 1 }}
                    </button>
                    <button class="theme-btn card-btn" @click="getActivityLogs(page)">
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(page + 1)"
                      v-if="allPages >= page + 1"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      v-if="allPages >= page"
                      @click="getActivityLogs(page)"
                    >
                      Next
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(allPages)"
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
                      @click="getActivityLogs(1)"
                      v-if="page - 1 != 1"
                    >
                      First
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(page - 2)"
                      v-if="page - 2 > 0"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getActivityLogs(page - 2)"
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
              </tfoot> -->
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'
import $ from 'jquery'

export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Activity Logs - Slabstox',
    }
  },
  mounted() {
    this.getUsers()
    // this.getActivityLogs(this.page)
  },
  components: {
    vSelect,
  },
  data() {
    return {
      selUser: 0,
      selModel: null,
      selSt: null,
      totalCount: 0,
      users: [],
      models: [],
      logs: [],
      page: 1,
      last_page: 0,
      requestInProcess: false,
      dataTableSel:null,
      allPages:0
    }
  },
//   watch: {
//       logs(val) {
//         if (val.length > 0) {
//           setTimeout(function () {
//             if (!$.fn.dataTable.isDataTable('#all-activity-logs-table')) {
//               this.dataTableSel = $('#all-activity-logs-table').DataTable({
//                 pageLength: 20,
//                 oLanguage: { sSearch: '' },
//                 aoColumnDefs: [
//                   {
//                     bSortable: false,
//                     aTargets: [-1, -2, -3, -4],
//                   },
//                 ],
//               })
//               $('.dataTables_filter input').attr('placeholder', 'Search')
//             }else{
//               // this.dataTableSel.ajax.reload();
// //               this.dataTableSel.fnClearTable();
// // this.dataTableSel.fnDestroy();
//               // $('#all-activity-logs-table').DataTable().destroy();
//               // $('#all-activity-logs-table').DataTable().destroy();
//           //  $('#all-activity-logs-table').DataTable({
//           //       pageLength: 20,
//           //       oLanguage: { sSearch: '' },
//           //       aoColumnDefs: [
//           //         {
//           //           bSortable: false,
//           //           aTargets: [-1, -2, -3, -4],
//           //         },
//           //       ],
//           //     })
//           //     $('.dataTables_filter input').attr('placeholder', 'Search')
//             }
//           }, 500)
//         }
//       },
//     },
  methods: {    
    getUsers() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .get('users/get-users-for-activity-logs')
            .then((res) => {
              if (res.status == 200) {
                this.users = res.data.data.users
                this.models = res.data.data.models
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
    getActivityLogs(page = 1) {
      if (!this.requestInProcess && this.selUser > 0) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .get(
              `users/get-activity-logs-for-admin/${this.selUser}?model=${this.selModel}&sts=${this.selSt}&page=${page}`
            )
            .then((res) => {
              if (res.status == 200) {
                this.logs = res.data.data.data
                this.page = res.data.data.current_page
                this.last_page = res.data.data.last_page
                this.allPages = this.totalCount = res.data.data.total
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
</style>
