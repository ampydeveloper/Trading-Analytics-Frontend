<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Users Management</button>
            
                <button
                      class="theme-green-btn card-btn pull-right"
                      @click="action(user, 'create', 'Create User')"
                    >
                      Create User
                    </button>
            </h5>
          </div>
          <div class="card-body search-form">
            <div class="row">
              <div class="col-4">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchTerm"
                    placeholder="Search Users"
                    aria-label="Search term..."
                    aria-describedby="button-addon2"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      @click="usersSearch()"
                      type="button"
                      id="button-addon2"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                  <!-- <th>Overall Rank</th>
                  <th>Slab Value</th> -->
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="users.length > 0">
                <tr v-for="(user, ind) of users" :key="ind">
                  <td>{{ user.id }}</td>
                  <td>{{ user.full_name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ (user.roles[0]?user.roles[0].name:'') }}</td>
                  <td>{{ user.mobile }}</td>
                  <td>{{ user.dob }}</td>
                  <td>{{ user.address }}</td>
                  <td>
                    <font-awesome-icon
                      v-if="user.confirmed"
                      :icon="['fas', 'check']"
                    />
                    <font-awesome-icon v-else :icon="['fas', 'times']" />
                  </td>
                  <td>
                    <font-awesome-icon
                      v-if="user.active"
                      :icon="['fas', 'check']"
                    />
                    <font-awesome-icon v-else :icon="['fas', 'times']" />
                  </td>
                  <td>
                    <font-awesome-icon
                      v-if="user.deleted_at != null"
                      :icon="['fas', 'check']"
                    />
                    <font-awesome-icon v-else :icon="['fas', 'times']" />
                  </td>
                  <!-- <td>{{ user.overall_rank }}</td>
                  <td>{{ user.slab_value }}</td> -->
                  <td>
                    <button
                      v-if='(user.roles.length && user.roles[0].name != "administrator") || isAdmin'
                      class="card-btn btn btn-primary btn-table-spec"
                      @click="action(user, 'password', 'Change Password')"
                      style="margin-top: 4px"
                    >
                      Change Password
                    </button>
                    <button
                      v-if='(user.roles.length && user.roles[0].name != "administrator") || isAdmin'
                      class="card-btn btn btn-primary btn-table-spec"
                      @click="action(user, 'edit', 'Edit User')"
                      style="margin-top: 4px"
                    >
                      Edit</button
                    ><br />
                    <button
                      class="card-btn btn btn-primary btn-table-spec"
                      v-if="user.roles[0]!= null && user.roles[0].name != 'administrator'"
                      @click="action(user, 'active', 'Change Active Status')"
                      style="margin-top: 4px"
                    >
                      Mark as {{ user.active ? 'In-Active' : 'Active' }}
                    </button>
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      v-if="user.roles[0]!= null && user.roles[0].name != 'administrator' && isAdmin"
                      @click="action(user, 'delete', 'Change Deletion Status')"
                      style="margin-top: 4px"
                    >
                      {{ user.deleted_at == null ? 'Delete' : 'Restore' }}
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="users.length == 0 && requestInProcess">
                <tr>
                  <td colspan="11" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="users.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="11" class="text-center">No users available.</td>
                </tr>
              </tbody>
              <tfoot>
                <!-- <tr>
                  <td colspan="6">
                    <button class="theme-btn card-btn" :disabled="page == 1" @click="getUsers(--page)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(++page)">Next</button>
                  </td>
                </tr> -->
                <tr v-if="page - 1 == 1 && users.length >= 30">
                  <td colspan="11">
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getUsers(1)"
                    >
                      1
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(2)">
                      2
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(3)">
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && users.length >= 30">
                  <td colspan="11">
                    <button class="theme-btn card-btn" @click="getUsers(1)">
                      1
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getUsers(2)"
                    >
                      2
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(3)">
                      3
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(4)">
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && users.length >= 30">
                  <td colspan="11">
                    <button class="theme-btn card-btn" @click="getUsers(1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(2)">
                      2
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getUsers(3)"
                    >
                      3
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(4)">
                      4
                    </button>
                    <button class="theme-btn card-btn" @click="getUsers(5)">
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && users.length >= 30">
                  <td colspan="11">
                    <button
                      class="theme-btn card-btn"
                      @click="getUsers(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getUsers(page - 1)"
                    >
                      {{ page - 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getUsers(page)"
                    >
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getUsers(page + 1)"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getUsers(page + 2)"
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
    <b-modal id="updatePopup" :title="popUpTitle" hide-footer>
      <div class="ap">
        <section v-if="activeType == 'edit'" class="p-4 search-form">
          <div class="form_column">
            <label for="first_name">First Name</label>
            <input
              type="text"
              class="form-control"
              v-model="activeUser.first_name"
              name="first_name"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model="activeUser.last_name"
              name="last_name"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="activeUser.email"
              name="email"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="mobile">Mobile</label>
            <input
              type="number"
              class="form-control"
              v-model="activeUser.mobile"
              name="mobile"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="dob">Date of Birth(DOB)</label>
            <input
              type="date"
              class="form-control"
              v-model="activeUser.dob"
              name="dob"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="address">Address</label>
            <input
              v-model="activeUser.address"
              class="form-control"
              name="address"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="address">Change Role</label>
            <select v-model="activeUser.user_roles" class="form-control">
              <option value="1">Super Admin</option>
              <option value="3">Moderator</option>
              <option value="4">Data Entry</option>
              <option value="2">User</option>
            </select>
          </div>
        </section>
        <section v-if="activeType == 'create'" class="p-4 search-form">
          <div class="form_column">
            <label for="first_name">First Name</label>
            <input
              type="text"
              class="form-control"
              v-model="activeUser.first_name"
              name="first_name"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model="activeUser.last_name"
              name="last_name"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="last_name">Password</label>
            <input
              type="text"
              class="form-control"
              v-model="activeUser.password"
              name="password"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="activeUser.email"
              name="email"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="mobile">Mobile</label>
            <input
              type="number"
              class="form-control"
              v-model="activeUser.mobile"
              name="mobile"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="dob">Date of Birth(DOB)</label>
            <input
              type="date"
              class="form-control"
              v-model="activeUser.dob"
              name="dob"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="address">Address</label>
            <input
              v-model="activeUser.address"
              class="form-control"
              name="address"
              required="required"
            />
          </div>
          <div class="form_column">
            <label for="address">Change Role</label>
            <select v-model="activeUser.user_roles" class="form-control">
              <option value="1">Super Admin</option>
              <option value="3">Moderator</option>
              <option value="4">Data Entry</option>
              <option value="2">User</option>
            </select>
          </div>
        </section>
        <section
          v-else-if="['delete'].includes(activeType)"
          class="p-4 search-form"
        >
          <h6 class="text-capitalize">
            Do you really want to delete user "{{ activeUser.full_name }}"?
          </h6>
        </section>
        <section
          v-else-if="['active'].includes(activeType)"
          class="p-4 search-form"
        >
          <h6 class="text-capitalize">
            Do you really want to Change The Status of "{{ activeUser.full_name }}"?
          </h6>
        </section>
        <section v-else-if="activeType == 'password'" class="p-4 search-form">
          <div class="form_column">
            <label for="password">New Password</label>
            <input
              v-model="activeUser.password"
              class="form-control"
              name="password"
              required="required"
            />
          </div>
        </section>

        <div class="clearfix g-download-out text-right">
          <a
            href="javascript:void(0);"
            @click="save"
            class="card-btn btn btn-success btn-table-spec mr-2"
            >Proceed</a
          >
          <a
            href="javascript:void(0);"
            @click="hidePopup"
            class="card-btn btn btn-outline-danger btn-table-spec mr-4"
            >Cancel</a
          >
        </div>
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
      title: 'Users Management - Slabstox',
    }
  },
  mounted() {
    this.getUsers(this.page)
    if (this.$route.query.hasOwnProperty('id')) {
      this.searchTerm = this.$route.query.id
      setTimeout(() => this.usersSearch(), 500)
    }
  },
  data() {
    return {
      popUpTitle: '',
      users: [],
      user_id:'',
      page: 1,
      requestInProcess: false,
      activeType: '',
      activeRole: 0,
      activeUser: {},
      searchTerm: '',
    }
  },
  methods: {
    hidePopup() {
      this.$bvModal.hide('updatePopup')
    },
    getUsers(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('users/get-list-for-admin', {
              page: page,
            })
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                this.users = res.data.data
                this.page = res.data.next
              }
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
    usersSearch() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { search: this.searchTerm }
          this.$axios
            .post('users/get-list-for-admin', payload)
            .then((res) => {
              this.requestInProcess = false
              if (res.status == 200) {
                this.users = res.data.data
                this.page = res.data.next
              }
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
    action(user, type, popUpTitle = null) {
      this.activeType = type
      this.activeUser = {}
      if(type != 'create'){
        this.activeUser = { ...user }
        if(this.activeUser.roles.length > 0) this.activeUser.user_roles = this.activeUser.roles[0].id
      }
      this.popUpTitle = popUpTitle
      this.$bvModal.show('updatePopup')
    },
    save() {
      this.showLoader()
      this.requestInProcess = true
      if (this.activeType == 'edit') {
        this.$axios
          .post('/users/save-user-by-admin', this.activeUser)
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.getUsers(this.page)
              this.$bvModal.hide('updatePopup')
              this.$toast.success('User saved successfully!')
            } else if (res.status == 201) {
              Object.keys(res.data).forEach((k) => {
                this.$toast.error(`${k} - ${res.data[k]}`)
              })
            } else this.$toast.error('User cannot be saved, please try-again!')
            this.hideLoader()
          })
          .catch((err) => {
            console.log(err)
            this.requestInProcess = false
            this.hideLoader()
          })
      } else if (['active', 'delete'].includes(this.activeType)) {
        this.$axios
          .post(
            `/users/update-user-by-admin/${this.activeUser.id}/${this.activeType}`
          )
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.getUsers(this.page)
              this.$bvModal.hide('updatePopup')
              this.$toast.success(`User ${this.popUpTitle} successfull!`)
            } else
              this.$toast.error(
                'User status cannot be updated, please try-again!'
              )
            this.hideLoader()
          })
          .catch((err) => {
            console.log(err)
            this.requestInProcess = false
            this.hideLoader()
          })
      } else if (this.activeType == 'password') {
        this.$axios
          .post(`/users/change-user-password-by-admin/${this.activeUser.id}`, {
            password: this.activeUser.password,
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.$bvModal.hide('updatePopup')
              this.$toast.success(`User's password changed successfully!`)
            } else
              this.$toast.error(
                "User's password cannot be updated, please try-again!"
              )
            this.hideLoader()
          })
          .catch((err) => {
            console.log(err)
            this.requestInProcess = false
            this.hideLoader()
          })
      } else if (this.activeType == 'create') {
        this.$axios
          .post('/users/create-user', this.activeUser)
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.getUsers(this.page)
              this.$bvModal.hide('updatePopup')
              this.$toast.success('User saved successfully!')
            }
            this.hideLoader()
          })
          .catch((err) => {
            this.requestInProcess = false
            this.hideLoader()
          })
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
