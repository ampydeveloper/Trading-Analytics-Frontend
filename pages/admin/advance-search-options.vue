<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Advance Search Options</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <td></td>
                  <td>
                    <select v-model="filter" @change="getAdvanceSearchData()">
                      <option value='all'>all</option>
                      <option value='sport'>Sport</option>
                      <option value='year'>Year</option>
                      <option value='team'>Team</option>
                      <option value='season'>Season</option>
                      <option value='cardmanufacturer'>Card</option>
                      <option value='product'>Type</option>
                      <option value='series'>Series</option>
                      <option value='grade'>Grade</option>
                    </select>
                  </td>
                  <td></td>
                  <td>
                    <button :disabled="checkedItems.length==0" @click="changeStatus(1)">Active Now</button>
                    <button :disabled="checkedItems.length==0" @click="changeStatus(0)">Disable Now</button>
                  </td>
                </tr>
                <tr>
                  <th><input type="checkbox" @change="toggleCheckbox()" v-model="toggleCheckboxInput" /></th>
                  <th>Type</th>
                  <th>Keyword</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody v-if="data.length > 0">
                <tr v-for="item of data" :key="item.id">
                  <td><input type="checkbox" @change="addRemoveCheckbox(item.id)"  :checked="isChecked(item.id)"/></td>
                  <td>{{ getTypeName(item.type)  }}</td>
                  <td>{{ item.keyword }}</td>
                  <td>{{ (item.status) ? 'Active' : 'Disabled' }}</td>
                </tr>
              </tbody>
              <tbody v-if="data.length == 0 && requestInProcess">
                <tr>
                  <td colspan="4" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="data.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="4" class="text-center">No advance options available.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td><input type="checkbox" @change="toggleCheckbox()" v-model="toggleCheckboxInput" /></td>
                  <td>
                    <select v-model="filter" @change="getAdvanceSearchData()">
                      <option value='all'>all</option>
                      <option value='sport'>Sport</option>
                      <option value='year'>Year</option>
                      <option value='team'>Team</option>
                      <option value='season'>Season</option>
                      <option value='cardmanufacturer'>Card</option>
                      <option value='product'>Type</option>
                      <option value='series'>Series</option>
                      <option value='grade'>Grade</option>
                    </select>
                  </td>
                  <td></td>
                  <td>
                    <button :disabled="checkedItems.length==0" @click="changeStatus(1)">Active Now</button>
                    <button :disabled="checkedItems.length==0" @click="changeStatus(0)">Disable Now</button>
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
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - Slabstox'
    }
  },
  mounted() {
   this.getAdvanceSearchData()
  },
  components: {},
  data() {
    return {
      data: [],
      checkedItems: [],
      filter: 'all',
      requestInProcess: false,
      toggleCheckboxInput: false,
    }
  },
  methods: {
    addRemoveCheckbox(id) {
      const a = this.checkedItems.filter(item => item == id);
      if(a.length == 1) {
        this.checkedItems.splice(this.checkedItems.indexOf(id),1);
      }else{
        this.checkedItems.push(id);
      }
    },
    toggleCheckbox(){
      if(this.toggleCheckboxInput) {
        this.checkedItems = []
        this.checkedItems = this.data.map(item => {return item.id});
      }else{
        this.checkedItems = []
      }
    },
    isChecked(id) {
      const a = this.checkedItems.filter(item => item == id);
      if(a.length == 1) {
        return true;
      }
      return false;
    },
    getTypeName(type) {
      switch (type) {
        case 'cardmanufacturer':
            return 'Card';
          break;
        
        case 'product':
            return 'Type';
          break;
      
        default:
            return type.charAt(0).toUpperCase() + type.slice(1);
          break;
      }
    },
    changeStatus(status) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('advance-search-change-status', {ids: this.checkedItems, status: status})
            .then(res => {
              this.checkedItems = [];
              this.requestInProcess = false
              this.hideLoader()
              this.getAdvanceSearchData()
            }).catch(err => {
              this.checkedItems = [];
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.checkedItems = [];
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    getAdvanceSearchData(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.checkedItems = [];
          this.data = [];
          this.$axios
            .post('advance-search-admin', {filter: this.filter})
            .then(res => {
              if (res.status == 200) {
                this.data = res.data.data
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
