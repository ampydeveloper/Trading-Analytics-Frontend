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
             <form class="form-inline" v-on:submit.prevent="create">
              <div class="form_column">
                <label>Sport</label>
                <input
                  v-model="requestSlab.sport"
                  type="text"
                  class="form-control"
                  placeholder="Enter Sport"
                  required
                />
              </div>
              <div class="form_column">
                <label>Player</label>
                <input
                  v-model="requestSlab.player"
                  type="text"
                  class="form-control"
                  placeholder="Enter Player"
                  required
                />
              </div>
              <div class="form_column">
                <label>Year</label>
                <input
                  v-model="requestSlab.year"
                  type="number"
                  class="form-control"
                  placeholder="Enter Year"
                />
              </div>
              <div class="form_column">
                <label>Brand</label>
                <input
                  v-model="requestSlab.brand"
                  type="text"
                  class="form-control"
                  placeholder="Enter Brand"
                />
              </div>
              <div class="form_column">
                <label>Card</label>
                <input
                  v-model="requestSlab.card"
                  type="text"
                  class="form-control"
                  placeholder="Enter card"
                />
              </div>
              <div class="form_column">
                <label>Rookie Card</label>
                <select v-model="requestSlab.rc" class="form-control">
                  <option value="yes">Select Rookie</option>
                  <option value="yes">YES</option>
                  <option value="No">NO</option>
                </select>
              </div>
              <div class="form_column">
                <label>Variation</label>
                <input
                  v-model="requestSlab.variation"
                  type="text"
                  class="form-control"
                  placeholder="Enter Variation"
                  required
                />
              </div>
              <div class="form_column">
                <label>Grade</label>
                <input
                  v-model="requestSlab.grade"
                  type="text"
                  class="form-control"
                  placeholder="Enter Grade"
                />
              </div>
              <div class="form_column">
                <label>Image                  
                </label>
                <div class="input-file">
                <img :src='imgSrc' alt='Card-image' v-if='imgSrc.length > 0' width="200px"/>
                <input
                  type="file"
                  placeholder="Image"
                  class="form-control form-input-bor"
                  accept="image/jpg"
                  @change="assignFileObj"
                  required
                />
                </div>
              </div>
              <div class="form_btns">
                <div class="right_btn">
                  <button
                    type="submit"
                    class="theme-green-btn requestSlab-btn"
                    :disabled="requestInProcess"
                  >
                    Request Now
                  </button>
                </div>
              </div>
            </form>
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
      title: 'Admin Dashboard - SlabStox'
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
       imgSrc: '',
      requestSlab: {
        player: '',
        sport: '',
        year: '',
        brand: '',
        requestSlab: '',
        rc: 'yes',
        variation: '',
        grade: '',
        image: ''
      },
    }
  },
  methods: {
    openImg(img){
      window.open(img, '_blank')
    },
    create() {
      if (!this.requestInProcess) {
        try {
          this.requestInProcess = true
        //   let data = new FormData();
        //   Object.keys(this.requestSlab).forEach((ky) => {
        //     data.append(ky, this.requestSlab[ky])
        //   })
          this.$axios
            .$post('card/add-request-slab', data)
            .then(res => {
              this.requestInProcess = false
              this.requestSlab = {
                player: '',
                sport: '',
                year: '',
                brand: '',
                requestSlab: '',
                rc: 'yes',
                variation: '',
                grade: '',
                image: ''
              }
              this.imgSrc = '';
              this.statusMessage = res.data.message
            
            })
            .catch(err => {
              this.requestInProcess = false
            })
        } catch (error) {
          this.requestInProcess = false
          console.log(error)
        }
      }
    },
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('card/get-request-slab-list-for-admin', {
              page: page
            })
            .then(res => {
              if (res.status == 200) {
                this.cards = res.data.data
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
     getSlab(sts, rid){
        this.showLoader()
        this.requestInProcess = true
        this.$axios
            .post('/card/requested-slab-add', {
                id: rid,
                sts: sts
            })
            .then(res => {
                if (res.status == 200) {
                        this.$toast.info(res.data.data)
                        this.requestInProcess = false
                        this.hideLoader()
                        this.getRequestedListing()
                }
            }).catch(err => {
                this.requestInProcess = false
                this.hideLoader()
            })
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
.cardImg{
  cursor: zoom-in;
}
</style>
