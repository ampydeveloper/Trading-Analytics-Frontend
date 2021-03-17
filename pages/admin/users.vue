<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Users Management</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Mobile</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Confirmed</th>
                  <th>Active</th>
                  <th>Deleted</th>
                  <th>Overall Rank</th>
                  <th>Slab Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="users.length > 0">
                <tr v-for="(user, ind) of users" :key="ind">
                  <td>{{ user.id }}</td>
                  <td>{{ user.full_name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.roles[0].name }}</td>
                  <td>{{ user.mobile }}</td>
                  <td>{{ user.dob }}</td>
                  <td>{{ user.address }}</td>
                  <td>
                      <font-awesome-icon v-if='user.confirmed' :icon="['fas', 'check']" />
                      <font-awesome-icon v-else :icon="['fas', 'times']" />
                  </td>
                  <td>
                      <font-awesome-icon v-if='user.active' :icon="['fas', 'check']" />
                      <font-awesome-icon v-else :icon="['fas', 'times']" />
                  </td>
                  <td>
                      <font-awesome-icon v-if='user.deleted_at != null' :icon="['fas', 'check']" />
                      <font-awesome-icon v-else :icon="['fas', 'times']" />
                  </td>
                  <td>{{ user.overall_rank }}</td>
                  <td>{{ user.slab_value }}</td>
                  <td>
                      <button class="card-btn btn btn-primary btn-table-spec" @click="action(user, 'password', 'Change Password')" style="margin-top: 4px"> Change Password</button>
                      <button class="card-btn btn btn-primary btn-table-spec" @click="action(user, 'edit', 'Edit User')" style="margin-top: 4px"> Edit</button><br/>
                      <button class="card-btn btn btn-primary btn-table-spec" v-if='user.roles[0].name != "administrator"' @click="action(user, 'active', 'Change Active Status')" style="margin-top: 4px"> Mark as {{ user.active ? 'In-Active' : 'Active' }}</button>
                      <button class="card-btn btn btn-primary btn-table-spec" v-if='user.roles[0].name != "administrator"' @click="action(user, 'delete', 'Change Deletion Status')" style="margin-top: 4px"> {{ user.deleted_at == null ? 'Delete' : 'Restore' }}</button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="users.length == 0 && requestInProcess">
                <tr>
                  <td colspan="9" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="users.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="9" class="text-center">No users available.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6">
                    <button class="theme-btn card-btn" :disabled="page == 1" @click="getUsers(--page)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(++page)">Next</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        id="updatePopup"
        :title="popUpTitle"
        hide-footer
    >
        <section v-if='activeType == "edit"' class="p-4">
            <div class="form_column">
                <label for='first_name'>First Name</label>
                <input type="text" class="form-control" v-model="activeUser.first_name" name="first_name" required="required" />
            </div>
            <div class="form_column">
                <label for='last_name'>Last Name</label>
                <input type="text" class="form-control" v-model="activeUser.last_name" name="last_name" required="required" />
            </div>
            <div class="form_column">
                <label for='email'>Email</label>
                <input type="email" class="form-control" v-model="activeUser.email" name="email" required="required" />
            </div>
            <div class="form_column">
                <label for='mobile'>Mobile</label>
                <input type="number" class="form-control" v-model="activeUser.mobile" name="mobile" required="required" />
            </div>
            <div class="form_column">
                <label for='dob'>Date of Birth(DOB)</label>
                <input type="date" class="form-control" v-model="activeUser.dob" name="dob" required="required" />
            </div>
            <div class="form_column">
                <label for='address'>Address</label>
                <input v-model="activeUser.address" class="form-control" name="address" required="required" />
            </div>
        </section>
        <section v-else-if='["delete", "active"].includes(activeType)' class="p-4">
            <h5 class="text-capitalize">Do you really want to change <b>{{activeUser.full_name}}</b> {{popUpTitle}}?</h5>
        </section>

        <div class="clearfix g-download-out text-right">
        <a href="javascript:void(0);" @click="save" class="card-btn btn btn-success btn-table-spec mr-2">Proceed</a>
        <a href="javascript:void(0);" @click="hidePopup" class="card-btn btn btn-outline-danger btn-table-spec mr-4">Cancel</a>
        </div>
    </b-modal>
  </div>
</template>

<script>
import sellSlabs from '../sell-slabs.vue'
export default {
  components: { sellSlabs },
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Users Management - Slabstox'
    }
  },
  mounted() {
   this.getUsers(this.page)
  },
  data() {
    return {
      popUpTitle: '',
      users: [],
      page: 1,
      requestInProcess: false,
      activeType: '',
      activeUser: {}
    }
  },
  methods: {
    hidePopup(){
        this.$bvModal.hide('updatePopup')
    },
    getUsers(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('users/get-list-for-admin', {
              page: page
            })
            .then(res => {
              if (res.status == 200) {
                this.users = res.data.data
                this.page = res.data.next
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
          console.log(err)
        }
      }
    },
    action(user, type, popUpTitle=null){
        this.activeType = type
        this.activeUser = {...user}
        this.popUpTitle = popUpTitle
        this.$bvModal.show('updatePopup')
    },
    save(){
        this.showLoader()
        this.requestInProcess = true
        if(this.activeType == 'edit'){
            this.$axios
                .post('/users/save-user-by-admin', this.activeUser)
                .then(res => {
                    if (res.status == 200){
                        this.getUsers()
                        this.$bvModal.hide('updatePopup')
                        this.$toast.success('User saved successfully!')
                    }else if(res.status == 201){
                        Object.keys(res.data).forEach((k) => {
                            this.$toast.error(`${k} - ${res.data[k]}`)
                        })
                    }
                    else this.$toast.error('User cannot be saved, please try-again!')
                    this.requestInProcess = false
                    this.hideLoader()
                }).catch(err => {
                    console.log(err)
                    this.requestInProcess = false
                    this.hideLoader()
                })
        }else  if(['active', 'delete'].includes(this.activeType)){
            this.$axios
                .post(`/users/update-user-by-admin/${this.activeUser.id}/${this.activeType}`)
                .then(res => {
                    if (res.status == 200){
                        this.getUsers()
                        this.$bvModal.hide('updatePopup')
                        this.$toast.success(`User ${this.popUpTitle} successfull!`)
                    }else this.$toast.error('User status cannot be updated, please try-again!')
                    this.requestInProcess = false
                    this.hideLoader()
                }).catch(err => {
                    console.log(err)
                    this.requestInProcess = false
                    this.hideLoader()
                })
        }
    }
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
