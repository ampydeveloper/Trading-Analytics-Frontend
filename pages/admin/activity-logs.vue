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
                    Search Users</template
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
                  <template slot="no-options"> Select Entity Type</template>
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
                    Select Approval Status</template
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
                      :disabled="page.current-1 <= 0"
                      @click="getActivityLogs(page.current-1)"
                    >
                      Previous
                    </button>
                    <button
                      :class="[{'active-pagination': pg == page.current}, 'theme-btn card-btn ml-1']"
                      v-for='pg in page.list'
                      @click="getActivityLogs(pg)"
                      v-text='pg'
                      :key='"page"+pg'
                    >{{pg}}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      :disabled="page.current+1>page.last"
                      @click="getActivityLogs(page.current+1)"
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
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'
import $ from 'jquery'

export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Activity Logs - SlabStox',
    }
  },
  mounted() {
    this.getUsers()
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
      // page: 1,
      last_page: 0,
      requestInProcess: false,
      dataTableSel:null,
      allPages:0,
      page:{
        current: 0,
        last: 0,
        list: []
      }
    }
  },
  methods: {    
    getPages(){
        let start = 1, end = 0
        let current = this.page.current
        if(current - 1 >= 4) start = current - 3
        if(current + 3 > this.page.last) end = this.page.last
        else end = current + 3
        this.page.list = [...Array((end+1)-start).keys()].map(i => i + start)
    },
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
      // this.page.current != page //condition may be needed 
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
                console.log(res.data.data);
                console.log(this.logs);
                this.logs = res.data.data.data
                this.page.current = res.data.data.current_page
                this.page.last = res.data.data.last_page
                this.getPages()
                // this.page = res.data.data.current_page
                // this.last_page = res.data.data.last_page
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
.active.theme-btn.card-btn{
  border: 3px solid #1ce783
}
.active-pagination {
  color: #1ce783;
  background: #272d33;
}
</style>