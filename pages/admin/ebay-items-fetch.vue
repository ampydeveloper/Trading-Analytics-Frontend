<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Ebay Listing Fetch</button>
            </h5>
          </div>
          <div class="table_wrapper">
            <form class="form-inline" v-on:submit.prevent="getCard">
                <div class="form_column">
                    <label>Ebay Id</label>
                    <input v-model="card.itemId" type="text" class="form-control" placeholder="Item Id" required />
                </div>
                <div class="form_btns">
                    <div class="left_btn">
                      <button @click="back()" class="theme-green-btn card-btn">Cancel</button>
                    </div>
                    <div class="right_btn">
                      <button type="submit" class="theme-green-btn card-btn" :disabled="requestInProcess">Submit</button>
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
      title: 'Admin Ebay Item Fetch - SlabStox'
    }
  },
  mounted() {
    if('item' in this.$route.query){
      this.card.itemId = this.$route.query.item
      this.getCard()
    }
   //this.getCards(this.page)
  },
  components: {},
  data() {
    return {
      card: {
        itemId: '',
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
    getCard(thisObj) {
        if (!this.requestInProcess) {
            try {
              this.showLoader()
              this.requestInProcess = true
              this.$axios
                .post('fetch-card-by-item-id-for-admin', {
                  itemid: this.card.itemId
                })
                .then(res => {
                  if (res.status == 200) {
                    this.currentPage = page;
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
    getCards(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('get-cards-list-for-admin', {
              page: page
            })
            .then(res => {
              if (res.status == 200) {
                this.currentPage = page;
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
