<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card create_card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Create Slab</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <form class="form-inline" v-on:submit.prevent="create">
              <div class="form_column">
                <label>Sport</label>
                <select v-model="card.sport" class="form-control">
                  <option value="basketball">Basketball</option>
                  <option value="baseball">Baseball</option>
                  <option value="football">Football</option>
                  <option value="soccer">Soccer</option>
                  <option value="pokemon">Pokemon</option>
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
                  <option value="0">YES</option>
                  <option value="1">NO</option>
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
                <input v-model="card.grade" type="text" class="form-control" placeholder="Grade" required/>
              </div>
              <div class="form_column">
                <label>Qualifiers</label>
                <textarea
                v-model="card.qualifiers"
                  placeholder="Qualifiers"
                  class="form-control"
                  required
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
              <div class="form_btns">
                <div class="left_btn">
                  <button @click="back()" class="theme-green-btn card-btn btn-cancel">Cancel</button>
                </div>
                <div class="right_btn">
                  <button type="submit" class="theme-green-btn card-btn btn-save" :disabled="requestInProcess">Create</button>
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
  mounted() {},
  components: {},
  data() {
    return {
      card: {
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
        readyforcron: 0,
      },
      requestInProcess: false,
      statusMessage: null,
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    create() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('card-create', this.card)
            .then(res => {
              if (res.status == 200) {
                this.$toast.success(res.data.message)
                this.card = {
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
                    readyforcron: 0,
                  };
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
</style>
