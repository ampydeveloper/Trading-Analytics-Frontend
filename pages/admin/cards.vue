<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
              <div class="row">
                <div class="col-1">
                  <h5 class="card-title">
                    <button class="theme-btn card-btn">Slabs</button>
                  </h5>
                </div>
               
                <div class="col-11">
                   <nuxt-link class="theme-green-btn card-btn pull-right" to="/admin/create-card">
            Create Slab
          </nuxt-link>
          <button class="theme-green-btn card-btn pull-right" style="margin-right:5px" @click="uploadExcel('soccer')">Upload Pokemon</button>
                  <button class="theme-green-btn card-btn pull-right" style="margin-right:5px" @click="uploadExcel('baseball')">Upload Baseball</button>
                  <button class="theme-green-btn card-btn pull-right" style="margin-right:5px" @click="uploadExcel('basketball')">Upload Basketball</button>
                  <button class="theme-green-btn card-btn pull-right" style="margin-right:5px" @click="uploadExcel('football')">Upload Football</button>
                  <button class="theme-green-btn card-btn pull-right" style="margin-right:5px" @click="uploadExcel('soccer')">Upload Soccer</button>
                  
                </div>
              </div>
            <!-- </h5> -->
          </div>
          <div class="card-body search-form">
          <div class="row">
 <div class="col-2">
                  <select id="sportFilter" @change='getCards(currentPage, $event)' class="form-control text-capitalize">
                    <option selected>Select Sport</option>
                    <option :value="sport" v-for='sport in sportsList' :key='sport' v-text='sport' class="text-capitalize"></option>
                  </select>
                </div>
                <div class="col-3">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model='searchTerm' placeholder="Search Slabs" aria-label="Search term..." aria-describedby="button-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" @click="getCards(currentPage)" type="button" id="button-addon2">Search</button>
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
                  <th>Sport</th>
                  <th>player</th>
                  <th>year</th>
                  <th>brand</th>
                  <th>card</th>
                  <th>rc</th>
                  <th>variation</th>
                  <th>grade</th>
                  <th class="text-center">Published</th>
                  <th class="text-center">Featured</th>
                  <th class="text-center">SX Pro</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <td>{{ card.id }}</td>
                  <td>{{ card.sport }}</td>
                  <td>{{ card.player }}</td>
                  <td>{{ card.year }}</td>
                  <td>{{ card.brand }}</td>
                  <td>{{ card.card }}</td>
                  <td>{{ card.rc }}</td>
                  <td>{{ card.variation }}</td>
                  <td>{{ card.grade }}</td>
                  <td class="text-center">
                    <button class="card-btn btn btn-danger btn-table-spec tag" v-if="card.active == 0" @click="setCardStatus(card.id,1)">
                      <i class="fa fa-close" aria-hidden="true"></i> Unpublished
                    </button>
                    <button class="card-btn btn btn-primary  btn-table-spec tag" v-if="card.active == 1" @click="setCardStatus(card.id,0)">
                      <i class="fa fa-check" aria-hidden="true"></i> Published
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="card-btn btn btn-danger  btn-table-spec tag" v-if="card.is_featured == 0" @click="setFeaturedCard(card.id,1)">
                      <i class="fa fa-close" aria-hidden="true"></i> Not Featured
                    </button>
                    <button class="card-btn btn btn-primary  btn-table-spec tag" v-if="card.is_featured == 1" @click="setFeaturedCard(card.id,0)">
                      <i class="fa fa-check" aria-hidden="true"></i> Featured
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="card-btn btn btn-danger btn-table-spec tag" v-if="card.is_sx == 0" @click="setCardSx(card.id,1)">
                      <i class="fa fa-close" aria-hidden="true"></i> Inactive
                    </button>
                    <button class="card-btn btn btn-primary btn-table-spec tag" v-if="card.is_sx == 1" @click="setCardSx(card.id,0)">
                      <i class="fa fa-check" aria-hidden="true"></i> Active
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="card-btn btn btn-primary  btn-table-spec" @click="addItem(card.id)">Add Listing</button>
                    <nuxt-link class="card-btn btn btn-primary  btn-table-spec" :to='`ebay-specific-listings?card=${card.id}`'>Listing</nuxt-link>
                    <nuxt-link class="card-btn btn  btn-primary  btn-table-spec" :to='`create-sales-data?item=${card.id}`'>Sale Data</nuxt-link>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="12" class="text-center">Loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="12" class="text-center">No slabs found.</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6">
                    <button class="theme-btn card-btn" :disabled="page == 2" @click="getCards(page - 1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getCards(page)">Next</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <input type="file" style="display:none;" ref="excel" @change="uploadExcelNow()">
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
   this.getCards(this.page)
  },
  components: {},
  data() {
    return {
      searchTerm: '',
      cards: [],
      page: 1,
      currentPage: 1,
      requestInProcess: false,
      uploadExcelType: null,
      sportsList: [],
      sportFilter: '',
      filter:null
    }
  },
  methods: {
    addItem(id){
      this.$router.push('/admin/additem/'+id);
    },
    getCards(page, filter=null) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let payload = { page: page, search: this.searchTerm }
          if(filter != null) payload['sport'] = filter.target.value
          this.$axios
            .post('get-cards-list-for-admin', payload)
            .then(res => {
              if (res.status == 200) {
                this.currentPage = page;
                this.cards = res.data.data
                this.page = res.data.next
                this.sportsList = res.data.sportsList
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
    setFeaturedCard(id,tstatus) {
        console.log(id,' : ',tstatus);
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('set-featured-card', {
              is_featured: tstatus,
              id: id
            })
            .then(res => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.$toast.success(res.data.message);
                this.getCards(this.currentPage)
              }
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
     setCardSx(id,tstatus) {
        console.log(id,' : ',tstatus);
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('set-card-sx', {
              is_sx: tstatus,
              id: id
            })
            .then(res => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.$toast.success(res.data.message);
                this.getCards(this.currentPage)
              }
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
    setCardStatus(id,tstatus) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('set-card-status', {
              status: tstatus,
              id: id
            })
            .then(res => {
              this.requestInProcess = false
              this.hideLoader()
              if (res.status == 200) {
                this.$toast.success(res.data.message);
                this.getCards(this.currentPage)
              }
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
    uploadExcel(type) {
      this.uploadExcelType = type
      this.$refs.excel.click()
    },
    uploadExcelNow() {
      let formData = new FormData();
      const files = this.$refs.excel.files;
      const file = files.item(0)
      if(file.type== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        formData.append('file', file);  
        formData.append('for', this.uploadExcelType);  
        if (!this.requestInProcess) {
          try {
            this.showLoader()
            this.requestInProcess = true
            this.$axios
              .post('upload-slab-excel', formData)
              .then(res => {
                this.requestInProcess = false
                this.hideLoader()
                this.uploadExcelType = null;
                if (res.status == 200) {
                  this.$toast.success(res.data.message);
                  this.getCards(this.currentPage)
                }
              }).catch(err => {
                this.requestInProcess = false
                this.hideLoader()
              })
          } catch (err) {
            this.hideLoader()
            this.uploadExcelType = null;
            this.requestInProcess = false
            console.log(err)
          }
        }
      }else{
        this.$toast.error("Invalid File");
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
.btn-table-spec{
      border: none;
    border-radius: 2px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
        padding: 8px 12px 5px 12px;
    font-family: "Nexabold", Helvetica, Arial, sans-serif;
}
.btn-table-spec.tag{
  padding: 4px 6px 2px 6px;
}
.btn-table-spec.btn-primary{
    background-color: #272d33
}
.btn-table-spec.btn-danger{
      background-color: #f76573;

}
</style>
