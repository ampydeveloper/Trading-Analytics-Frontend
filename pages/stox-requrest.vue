<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-sm-12 col-md-7">
        <div class="requestSlab create_requestSlab">
          <div class="requestSlab-body">
            <h5 class="requestSlab-title">
              <button class="theme-btn requestSlab-btn" >
                New Slab Request
              </button>
              <span class="tooltip-text mx-2" v-b-tooltip.center  title="Please fill out the information below to request a new Slab be added to the SlabStoxPro database. We will evaluate your submission and add in the Slabs we feel would provide value to our entire userbase. Please make sure all of the information is correct and that you submit a clear, cropped photo to make it easier to approve the Slab. Please crop the card so the graded card case doesn’t show. Thank you for taking the time to suggest a new Slab! ">?</span>
            </h5>
          </div>
          <div class="">
            <div class="text-center send-message" v-if="statusMessage">
              <p>{{ statusMessage }}</p>
            </div>
            <form class="form-inline" v-on:submit.prevent="create">
              <div class="form_column">
                <label>Sport</label>
                <select v-model="requestSlab.sport" class="form-control">
                  <option selected value="0">Select Sports</option>
                  <option v-for="sport in attributes.sport" :key="sport"  :value="sport">{{sport}}</option>
                </select>
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
                <label>Card #</label>
                <input
                  v-model="requestSlab.card"
                  type="text"
                  class="form-control"
                  placeholder="Enter Card #"
                />
              </div>
              <div class="form_column">
                <label>Rookie Card</label>
                <select v-model="requestSlab.rc" class="form-control">
                  <option value="0">Select Rookie</option>
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
                <label>Slab Image                  
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
import { mapGetters } from 'vuex'
import { FILTERS } from '../constants/advance_search_filter'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Stox Request - SlabStox'
    }
  },
  mounted() {},
  components: {},
  data() {
    return {
      requestSlab: {
        player: '',
        sport: 0,
        year: '',
        brand: '',
        requestSlab: '',
        rc: 0,
        variation: '',
        grade: '',
        image: ''
      },
      imgSrc: '',
      requestInProcess: false,
      statusMessage: null,
      filters: { ...FILTERS }
    }
  },
  computed: {
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes'
    })
  },
  methods: {
    assignFileObj(event){
      const self = this
      if(event.target.files.length){
        var reader = new FileReader();
        reader.onload = function (efr) {
            self.imgSrc = efr.target.result
        }
        reader.readAsDataURL(event.target.files[0]); 
        this.requestSlab.image = event.target.files[0]
      }
    },
    create() {
      if (!this.requestInProcess) {
        try {
          this.requestInProcess = true
          let data = new FormData();
          Object.keys(this.requestSlab).forEach((ky) => {
            data.append(ky, this.requestSlab[ky])
          })
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
              
              setTimeout(() => {
                 this.$router.push('/dashboard')
                }, 500)
            })
            .catch(err => {
              this.requestInProcess = false
            })
        } catch (error) {
          this.requestInProcess = false
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.t-p-5 {
  padding: 5px;
}
ul.my-requestSlab-listing {
  list-style: none;
  padding: 0px;
}
.requestSlab-link {
  line-height: 2;
  margin-top: 2px;
}
.message {
  color: green;
}
.requestSlab-btn {
  padding: 8px 12px 5px 12px;
  font-family: 'Nexabold', Helvetica, Arial, sans-serif;
      cursor: pointer;
}
.form_column label {
  width: 30%;
  justify-content: left;
  text-transform: uppercase;
  font-style: italic;
  line-height: 1.3;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  font-size: 10px;
  color: #636d77;
  letter-spacing: 2px;
}

.form_column input,
.form_column select {
  width: 70%;
  background: #39414a;
  border: 0px;
  color: #ffffff;
  font-size: 11px;
  letter-spacing: 2px;
  line-height: 20px;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  margin: 0px;
  border-bottom: 1px solid #fff !important;
  border-radius: 0;
  &:focus {
    box-shadow: none;
  }
}
.requestSlab.create_requestSlab {
  background: #39414a;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  padding: 17px 17px 17px 15px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.requestSlab-title {
  .requestSlab-btn {
    margin-bottom: 15px;
        cursor: default;
  }
}
.form-control.form-input-bor{
   border: 0 !important;
   padding-left: 0 !important;
}
.input-file{
      width: 70%;
}
</style>
