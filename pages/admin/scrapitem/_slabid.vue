<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Add Ebay Listing</button>
                <button
                      class="theme-green-btn card-btn pull-right"
                      @click="addItem($nuxt.$route.params.slabid)"
                    >
                      Add Listing via ID
                    </button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <form class="form-inline" v-on:submit.prevent="createItem">
                <div class="form_column search-form">
                    <label>Ebay URL</label>
                    <input v-model="item.itemId" type="text" class="form-control" style="width: calc(80% - 75px);" placeholder="Ebay URL" required />
                    <button class="btn btn-outline-secondary btn-sm" type="button" @click="fetchDetails">Fetch</button>
                </div>
                <div class="form_column">
                    <label>Listing Title</label>
                    <input v-model="item.title" type="text" class="form-control" placeholder="Listing Title" required />
                </div>
                <div class="form_column">
                    <label>Price</label>
                    <input v-model="item.price" type="text" class="form-control" required />
                </div>
                <div class="form_column">
                    <label>Category</label>
                    <select v-model="item.category" class="form-control" required>
                      <option>Select Category</option>
                      <option
                       :value="cat.id"
                    v-for="cat in categories"
                    :key="cat.categoryId"
                    v-text="cat.name"
                  ></option>
                    </select>
                </div>
                <div class="form_column">
                    <label>Condition</label>
                    <input v-model="item.condition" type="text" class="form-control" required />
                </div>
                <div class="form_column">
                    <label>Time Left</label>
                    <input v-model="item.time_left" type="text" class="form-control" />
                </div>
                <div class="form_column">
                    <label>Image</label>
                    <input v-model="item.image" type="text" class="form-control" required />
                </div>
                <div class="form_column">
                    <label>Auction End Date</label>
                    <input v-model="item.auction_end" type="text" class="form-control" />
                </div>
                <div class="form_column">
                    <label>Ship To Locations</label>
                    <input v-model="item.shipToLocations" type="text" class="form-control" required />
                </div>
                 <div class="form_column">
                    <label>Location</label>
                    <input v-model="item.location" type="text" class="form-control" required />
                </div>
                <div class="form_column">
                    <label>Return Policy</label>
                    <input v-model="item.ReturnPolicy" type="text" class="form-control" required />
                </div>

                <h3 class="head-h3">Specifications</h3>
                <div class="form_column" v-for="(field, key) of item.specifics" :key="key">
                    <label>{{key}}</label>
                    <input  type="text" class="form-control" required :value="field" />
                    <!-- <button type="button" v-if="field.remove" @click="removeSpec(key)">Remove</button> -->
                </div>
                 <h3 class="head-h3">Seller Info</h3>
                 <div class="form_column">
                    <label>Seller Name</label>
                    <input v-model="item.seller_name" type="text" class="form-control" required />
                </div>
                 <div class="form_column">
                    <label>Positive Feedback Percent</label>
                    <input v-model="item.positiveFeedbackPercent" type="text" class="form-control" required />
                </div>
                <div class="form_column">
                    <label>Seller Contact Link</label>
                    <input v-model="item.seller_contact_link" type="text" class="form-control" />
                </div>
                <div class="form_column">
                    <label>Seller Store Link</label>
                    <input v-model="item.seller_store_link" type="text" class="form-control" />
                </div>
                
                <div class="form_btns">
                    <div class="left_btn">
                      <button @click="back()" type="button" class="theme-green-btn card-btn btn-cancel">Cancel</button>
                    </div>
                    <div class="right_btn">
                      <button type="submit" class="theme-green-btn card-btn btn-save" :disabled="requestInProcess">Submit</button>
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
      title: 'Admin Ebay Item Fetch - Slabstox'
    }
  },
  mounted() {
    if ($nuxt.$route.params.hasOwnProperty('slabid')) {
      this.item.card_id = $nuxt.$route.params.slabid
    } else {
      this.$router.push('/404')
    }
    if ($nuxt.$route.query.hasOwnProperty('random') && $nuxt.$route.query.random == 1) this.item.random_bin = 1 
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    this.getSpec();
  },
  components: {},
  data() {
    return {
      item: {
        random_bin: 0,
        card_id: '',
        itemId: '',
        title: '',
        category:'',
        specifics: [],
      },
      categories:[],
      requestInProcess: false,
      statusMessage: null,
      newSpec: null,
      specList: [],
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    addItem(id) {
      this.$router.push('/admin/additem/' + id)
    },
    getSpec(){
      this.$axios.get('get-ebay-spec-distinct-name')
      .then(res => {
        this.specList = res.data.data;
      })
      this.$axios.get('get-listing-categories')
      .then(res => {
        this.categories = res.data.data;
      })
    },
    notInSpec(name){
      let status = true;
      this.item.specifics.map(item => {
        if(name == item.index){
          status = false;
        }
      })

      return status;
    },
    addNewSpecifics() {
        this.item.specifics.push({
          index: this.newSpec, 
          value: '', 
          remove: true
        })
        this.newSpec = null;
    },
    removeSpec(key){
      this.item.specifics.splice(key, 1);
    },
    createItem() {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios.post('create-new-item-from-admin', this.item)
          .then(res => {
            this.requestInProcess = false
            this.$toast.success(res.data.message);
            this.$router.push('/admin/cards');
            this.hideLoader()
          })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
      
    },
    fetchDetails(){
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
              .post('scrap-item-for-admin', {
                itemid: this.item.itemId
              })
              .then(res => {
                if (res.status == 200) {
                  let data = res.data.data
                  this.item.title = data.name
                  this.item.price = data.price
                  this.item.condition = data.condition
                  this.item.time_left = data.timeLeft
                  this.item.image = data.image
                  this.item.location = data.location
                  this.item.auction_start = data.timeLeft 
                  this.item.auction_end = data.timeLeft      
                  this.item.listing_type = data.auction             
                  this.item.shipToLocations = data.shipToLocations
                  this.item.ReturnPolicy = data.returns
                  this.item.web_link = this.item.itemId
                  this.item.seller_name = data.seller.name
                  this.item.positiveFeedbackPercent = data.seller.feedback
                  this.item.seller_contact_link = data.seller.contact
                  this.item.seller_store_link = ''
                  this.item.specifics = data.specifics
                  this.item.details = data
                  // console.log(res.data)
                }
                this.requestInProcess = false
                  this.hideLoader()
              }).catch(err => {
                this.requestInProcess = false
                this.hideLoader()
              })
        } catch (err) {
          console.log(err)
          this.hideLoader()
          this.requestInProcess = false
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
</style>
