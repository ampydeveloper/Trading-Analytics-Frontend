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
              <div class="row form-input-100">
                <div class="form_column col-12">
                  <label data-v-0a5a3a1c="">Sports</label>
                </div>
                <div
                  class="form_column col-6"
                  v-for="(sport, key) in settings.sports"
                  :key="key"
                >
                  <input
                    v-model="settings.sports[key]"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-input-none row" >
                <div class="form_column col-12" style="margin-top: 30px">
                  <label data-v-0a5a3a1c="">Default Images</label>
                </div>
                <template v-for="(sport, key) in settings.sports" >
                <div class="form_column col-6" :key="key" v-if="settings.sports[key] != ''" >
                  <label>
                   {{ currentSport =  settings.sports[key] }}
                  </label>
                  <div class="input-file">
                    <img  
                    v-if="settings[currentSport+'_image'] != null"
                        :src="settings[currentSport+'_image']"
                        alt="Card-image"
                        
                        width="60"
                        @click="viewImg(src[key])"
                      />

                      <input
                        type="file"
                        :model="currentSport"
                        placeholder="Image"
                        class="form-control"
                        accept="image/jpg"
                        @change="assignImg"
                      />
                  </div>
                </div>
                </template>
<div class="clearfix col-12"></div>
                <div class="form_column col-6">
                  <label>Listing</label>
                  <div class="input-file">
                    <img
                      :src="src.listing"
                      alt="Card-image"
                      v-if="src.listing.length > 0"
                      width="60"
                      @click="viewImg(src.listing)"
                    />
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

              <div class="row w-100">
                <div class="col">
                  <div class="form_column mt-3 border-right">
                    <label class="w-50">Trenders Order</label>
                    <draggable
                      element="span"
                      v-model="settings.trenders_order"
                      @start="drag = true"
                      @end="drag = false"
                      ghost-class="ghost"
                    >
                      <transition-group type="transition" :name="'flip-list'">
                        <li
                          class="list-group-item p-1"
                          v-for="sprt in settings.trenders_order"
                          :key="'trenders_' + sprt"
                        >
                          <font-awesome-icon
                            class="mt-2"
                            :icon="['fas', 'thumbtack']"
                            style="font-size: 15px"
                          />
                          <span class="badge text-capitalize mt-1n">{{
                            sprt
                          }}</span>
                        </li>
                      </transition-group>
                    </draggable>
                  </div>
                </div>
                <div class="col">
                  <div class="form_column mt-3">
                    <label class="w-50">Live Listings Order</label>
                    <draggable
                      element="span"
                      v-model="settings.live_listings_order"
                      @start="drag = true"
                      @end="drag = false"
                      ghost-class="ghost"
                    >
                      <transition-group type="transition" :name="'flip-list'">
                        <li
                          class="list-group-item p-1"
                          v-for="sprt in settings.live_listings_order"
                          :key="'live_listings_' + sprt"
                        >
                          <font-awesome-icon
                            class="mt-2"
                            :icon="['fas', 'thumbtack']"
                            style="font-size: 15px"
                          />
                          <span class="badge text-capitalize mt-1n">{{
                            sprt
                          }}</span>
                        </li>
                      </transition-group>
                    </draggable>
                  </div>
                </div>
              </div>
              <div class="form_btns">
                <div class="right_btn">
                  <button
                    type="submit"
                    class="theme-green-btn card-btn btn-save"
                    :disabled="requestInProcess"
                  >
                    save
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
import $ from 'jquery'
import draggable from 'vuedraggable'

export default {
  transition: 'fade',
  layout: 'admin',
  data() {
    return {
      newData:'',
      requestInProcess: false,
      settings: {
        sports: [],
        trenders_order: [],
        live_listings_order: [],
      },
      src: {
        basketball: '',
        baseball: '',
        football: '',
        soccer: '',
        pokemon: '',
        listing: '',
        hockey: '',
      },
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
    draggable,
  },
  methods: {
    assignImg(event) {
      const self = this
      if (event.target.files.length) {
        var reader = new FileReader()
        reader.onload = function (efr) {
          self.src[event.target.getAttribute('model')] = efr.target.result
        }
        reader.readAsDataURL(event.target.files[0])
        this.settings[`${event.target.getAttribute('model')}_image`] =
          event.target.files[0]
      }
    },
    viewImg(src) {
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
                this.settings.sports.push('','','','')
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
          this.settings.sports = this.settings.sports.filter(val =>val!='')
          let data = new FormData()
          Object.keys(this.settings).forEach((key) => {
            if (
              ['trenders_order', 'live_listings_order', 'sports'].includes(key)
            )
              data.append(key, JSON.stringify(this.settings[key]))
            else data.append(key, this.settings[key])
          })
          // console.log(settings)
          this.$axios
            .post('settings', data)
            .then((res) => {
              if (res.status == 200) {
                this.$toast.success(res.data.message)
              }
              this.requestInProcess = false
              this.hideLoader()
              this.getSettings()
              $('input[type=file]').val('')
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
.form-input-none input {
  background: none !important;
}
.list-group-item {
  min-width: 10vw;
  margin: 2px;
  padding-left: 2vw !important;
  cursor: move;
}
.form-input-100 input {
  width: 100% !important;
}
</style>
