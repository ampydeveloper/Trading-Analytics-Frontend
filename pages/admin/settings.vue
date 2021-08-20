<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Settings</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <form class="form-inline" v-on:submit.prevent="saveSettings">
            <!-- <form class="form-inline row form-input-100" @change="assignImg" > -->
                 <div class="row form-input-100">
                <div class="form_column col-12">
                  <label data-v-0a5a3a1c="">Categories</label>
                </div>
                <div class="form_column col-4" v-for='(sport, key) in settings.sports' :key="key">
                  <input v-model="settings.sports[key]" type="text"  required="required" class="form-control" />
                </div>
               
                <div class="form_column col-4">
                  <input type="text" required="required" class="form-control" />
                </div>
                <div class="form_column col-4">
                  <input type="text" required="required" class="form-control" />
                </div>
                <div class="form_column col-4">
                  <input type="text" required="required" class="form-control" />
                </div>
                 </div>
            <!-- </form> -->
            <!-- <form class="form-inline form-input-none" v-on:submit.prevent="saveSettings"> -->
                 <div class="form-input-none">
              <div class="form_column">
                <label>Default Basketball Image</label>
                <div class="input-file">
                  <img :src='src.basketball' alt='Card-image' v-if='src.basketball.length > 0' width="60" @click="viewImg(src.basketball)"/>
                  <input
                    type="file"
                    model="basketball"
                    placeholder="Image"
                    class="form-control"
                    accept="image/jpg"
                    @change="assignImg"                  
                  />
                </div>
              </div>
              <div class="form_column">
                <label>Default Baseball Image</label>
                <div class="input-file">
                  <img :src='src.baseball' alt='Card-image' v-if='src.baseball.length > 0' width="60" @click="viewImg(src.baseball)"/>
                  <input
                    type="file"
                    model="baseball"
                    placeholder="Image"
                    class="form-control"
                    accept="image/jpg"
                    @change="assignImg"                  
                  />
                </div>
              </div>
              <div class="form_column">
                <label>Default Football Image</label>
                <div class="input-file">
                  <img :src='src.football' alt='Card-image' v-if='src.football.length > 0' width="60" @click="viewImg(src.slab)"/>
                  <input
                    type="file"
                    model="football"
                    placeholder="Image"
                    class="form-control"
                    accept="image/jpg"
                    @change="assignImg"                  
                  />
                </div>
              </div>
              <div class="form_column">
                <label>Default Soccer Image</label>
                <div class="input-file">
                  <img :src='src.soccer' alt='Card-image' v-if='src.soccer.length > 0' width="60" @click="viewImg(src.soccer)"/>
                  <input
                    type="file"
                    model="soccer"
                    placeholder="Image"
                    class="form-control"
                    accept="image/jpg"
                    @change="assignImg"                  
                  />
                </div>
              </div>
              <div class="form_column">
                <label>Default Pokémon Image</label>
                <div class="input-file">
                  <img :src='src.pokemon' alt='Card-image' v-if='src.pokemon.length > 0' width="60" @click="viewImg(src.pokemon)"/>
                  <input
                    type="file"
                    model="pokemon"
                    placeholder="Image"
                    class="form-control"
                    accept="image/jpg"
                    @change="assignImg"                  
                  />
                </div>
              </div>
              
              <div class="form_column border-bottom py-3">
                <label>Default Listing Image</label>
                <div class="input-file">
                  <img :src='src.listing' alt='Card-image' v-if='src.listing.length > 0' width="60" @click="viewImg(src.listing)"/>
                  <input
                    type="file"
                    model="listing"
                    placeholder="Image"
                    class="form-control"
                    accept="image/jpg"
                    @change="assignImg"                  
                  />
                </div>
              </div>
              </div>
              <small class="text-danger font-italic">Double click to select a sport block & drag to re-order</small>
              <div class="row w-100">
                <div class="col">
                  <div class="form_column mt-3 border-right">
                    <label class="w-50">Trenders Listing Sports Order</label>
                    <draggable element="span" v-model="settings.trenders_order" @start="drag=true" @end="drag=false" ghost-class="ghost">
                      <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item p-1" v-for='sprt in settings.trenders_order' :key='"trenders_"+sprt'>
                          <font-awesome-icon class="mt-2" :icon="['fas', 'thumbtack']" style="font-size: 15px;" />
                          <span class="badge text-capitalize mt-1n">{{sprt}}</span>
                        </li>
                      </transition-group>
                    </draggable>
                  </div>
                </div>
                <div class="col">
                  <div class="form_column mt-3">
                    <label class="w-50">Live Listings Sports Order</label>
                    <draggable element="span" v-model="settings.live_listings_order" @start="drag=true" @end="drag=false" ghost-class="ghost">
                      <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item p-1" v-for='sprt in settings.live_listings_order' :key='"live_listings_"+sprt'>
                          <font-awesome-icon class="mt-2" :icon="['fas', 'thumbtack']" style="font-size: 15px;" />
                          <span class="badge text-capitalize mt-1n">{{sprt}}</span>
                        </li>
                      </transition-group>
                    </draggable>
                  </div>
                </div>
              </div>
              <div class="form_btns">                
                <div class="right_btn">
                  <button type="submit" class="theme-green-btn card-btn btn-save" :disabled="requestInProcess">save</button>
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
// import $ from 'jquery'
import draggable from 'vuedraggable'

export default {
  transition: 'fade',
  layout: 'admin',
  data () {
    return {
      requestInProcess: false,
      settings:{
        basketball_image: '',
        baseball_image: '',
        football_image: '',
        soccer_image: '',
        pokemon_image: '',
        listing_image: '',
        sports: [],
        trenders_order: ['basketball', 'soccer','baseball', 'football', 'hockey', 'pokemon'],
        live_listings_order: ['basketball', 'soccer','baseball', 'football', 'hockey', 'pokemon', 'random bin']
      },
      src:{
        basketball: '',
        baseball: '',
        football: '',
        soccer: '',
        pokemon: '',
        listing: ''
      }
    }
  },
  head() {
    return {
      title: 'App Settings - SlabStox',
    }
  },
  mounted() {
    this.getSettings()
  },
  components: {
      draggable
  },
  methods: {
    assignImg(event){      
      const self = this
      if(event.target.files.length){
        var reader = new FileReader();
        reader.onload = function (efr) {
            self.src[event.target.getAttribute('model')] = efr.target.result
        }
        reader.readAsDataURL(event.target.files[0]); 
        this.settings[`${event.target.getAttribute('model')}_image`] = event.target.files[0]
      }
   
    },
    viewImg(src){  
      window.open(src, '_blank')
    },
    getSettings() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .get('settings')
            .then((res) => {
              if (res.status == 200) {
                this.settings = res.data.data
                // this.src.football = res.data.data.football
                // this.src.baseball = res.data.data.baseball
                // this.src.baseball = res.data.data.baseball
                this.src.listing = this.settings.listing_image
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
    saveSettings() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let data = new FormData();
          Object.keys(this.settings).forEach(key => {
            if(["trenders_order", "live_listings_order"].includes(key)) data.append(key, JSON.stringify(this.settings[key]))
            else data.append(key, this.settings[key])
          })
          this.$axios
            .post('settings', data)
            .then((res) => {
              if (res.status == 200) {
                this.$toast.success(res.data.message)
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
    }
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
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.form-input-none input{
  background: none!important;
}
.list-group-item{
  min-width: 10vw;
  margin: 2px;
  padding-left: 2vw!important;
  cursor: move;
}
.form-input-100 input{
  width: 100% !important;
}
</style>
