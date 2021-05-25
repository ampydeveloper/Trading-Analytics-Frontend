<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card create_card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Edit Slab</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
              <!--  -->
            <form class="form-inline" v-on:submit.prevent="edit">
                <input type="hidden" v-model="card.id">
              <div class="form_column">
                <label>Sport</label>
                <select v-model="card.sport" class="form-control">
                  <option value="Basketball">Basketball</option>
                  <option value="Baseball">Baseball</option>
                  <option value="Football">Football</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Pokémon">Pokémon</option>
                  <option value="Hockey">Hockey</option>
                </select>
              </div>
              <div class="form_column">
                <label>Player</label>
                <input v-model="card.player" type="text" class="form-control" placeholder="Player" required/>
              </div>
              <div class="form_column">
                <label>Year</label>
                <input v-model="card.year" type="number" class="form-control" placeholder="Year" required/>
              </div>
              <div class="form_column">
                <label>Brand</label>
                <input v-model="card.brand" type="text" class="form-control" placeholder="Brand" required/>
              </div>
              <div class="form_column">
                <label>Card</label>
                <input v-model="card.card" type="text" class="form-control" placeholder="Card" required/>
              </div>
              <div class="form_column">
                <label>RC</label>
                <select v-model="card.rc" class="form-control">
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </select>
              </div>
              <div class="form_column">
                <label>Variation</label>
                <input
                v-model="card.variation"
                  type="text"
                  class="form-control"
                  placeholder="Variation"
                  required
                />
              </div>
              <div class="form_column">
                <label>Grade</label>
                <input v-model="card.grade" type="text" class="form-control" placeholder="Grade"/>
              </div>
              <div class="form_column">
                <label>Qualifiers</label>
                <textarea
                v-model="card.qualifiers"
                  placeholder="Qualifiers"
                  class="form-control"
                  
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers2</label>
                <textarea
                v-model="card.qualifiers2"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers3</label>
                <textarea
                v-model="card.qualifiers3"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers4</label>
                <textarea
                v-model="card.qualifiers4"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers5</label>
                <textarea
                v-model="card.qualifiers5"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers6</label>
                <textarea
                v-model="card.qualifiers6"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers7</label>
                <textarea
                v-model="card.qualifiers7"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Qualifiers8</label>
                <textarea
                v-model="card.qualifiers8"
                  placeholder="Qualifiers"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form_column">
                <label>Image                  
                </label>
 <div class="input-file">
                <img :src='imgSrc' alt='Card-image' v-if='imgSrc.length > 0' width="200" @click="viewImg"/>
                <input
                  type="file"
                  placeholder="Image"
                  class="form-control"
                  accept="image/jpg"
                  @change="assignFileObj"
                  
                />
                </div>
              </div>
              <div class="form_btns">
                <div class="left_btn">
                  <button @click="back()" class="theme-green-btn card-btn btn-cancel">Cancel</button>
                </div>
                <div class="right_btn">
                  <button type="submit" class="theme-green-btn card-btn btn-save" :disabled="requestInProcess">Update</button>
                </div>
              </div>
            </form>
            <div class="text-center message">
              <p v-if="statusMessage">{{statusMessage}}</p>
            </div>
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
      this.getData(this.$route.query.card_id);
      this.card.id = this.$route.query.card_id;
  },
  components: {},
  data() {
    return {
      card: {
          id:'',
        sport: 'basketball',
        player: '',
        year: '',
        brand: '',
        card: '',
        rc: '0',
        variation: '',
        grade: '',
        qualifiers: '',
        qualifiers2: '',
        qualifiers3: '',
        qualifiers4: '',
        qualifiers5: '',
        qualifiers6: '',
        qualifiers7: '',
        qualifiers8: '',
        image: '',
        // readyforcron: 0,
      },
      imgSrc: '',
      requestInProcess: false,
      statusMessage: null,
    }
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
        this.card.image = event.target.files[0]
      }
    },
    viewImg(){
      window.open(this.imgSrc, '_blank')
    },
    back() {
      this.$router.go(-1);
    },
    getData(card_id) {
      try {
        this.$axios.$get('get-edit-card/' + card_id).then(res => {
            console.log(res);
          if (res.status == 200) {
            this.card = {
                id: res.data.id,
                    sport: res.data.sport,
                    player: res.data.player,
                    year: res.data.year,
                    brand: res.data.brand,
                    card: res.data.card,
                    rc: res.data.rc,
                    variation: res.data.variation,
                    grade: res.data.grade,
                    qualifiers: res.data.qualifiers,
                    qualifiers2: res.data.qualifiers2,
                    qualifiers3: res.data.qualifiers3,
                    qualifiers4: res.data.qualifiers4,
                    qualifiers5: res.data.qualifiers5,
                    qualifiers6: res.data.qualifiers6,
                    qualifiers7: res.data.qualifiers7,
                    qualifiers8: res.data.qualifiers8,
                  };
            if(Object.keys(res.data).includes('cardImage')) this.imgSrc = res.data.cardImage
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    edit() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          let data = new FormData();
          Object.keys(this.card).forEach(k => {
            data.append(k,this.card[k])
          });
          this.$axios
            .post('card-edit', data)
            .then(res => {
              if (res.status == 200) {
                this.$toast.success(res.data.message)
                // this.card = {
                //     sport: 'basketball',
                //     player: '',
                //     year: '',
                //     brand: '',
                //     card: '',
                //     rc: 'yes',
                //     variation: '',
                //     grade: '',
                //     qualifiers: '',
                //     qualifiers2: '',
                //     qualifiers3: '',
                //     qualifiers4: '',
                //     qualifiers5: '',
                //     qualifiers6: '',
                //     qualifiers7: '',
                //     qualifiers8: '',
                //     // readyforcron: 0,
                //   };
              }
              this.$router.push('/admin/cards')
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
.message{
  color: green;
}
.input-file{
  width:80%;
  .form-control{
         background: none !important;
    padding-left: 0 !important;
    width: 100%;
  }
}
</style>
