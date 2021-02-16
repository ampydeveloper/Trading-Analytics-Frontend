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
            <h5>Live Listings</h5>
         

            <draggable  @start="drag=true" @end="drag=false">
   <div>Baseball</div>
   <div>Soccer</div>
   <div>Football</div>
   <div>Basketball</div>
   <div>Pokemon</div>
</draggable>

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
          
        }
      },
  head() {
    return {
      title: 'Admin Dashboard - Slabstox',
  
    }
  },
  mounted() {
    this.getRequestedSlab(this.page)
    
  },
  components: {
      draggable
  },
  data() {
    return {
      cards: [],
      page: 1,
      requestInProcess: false,
    }
  },
  methods: {
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('card/get-request-slab-list-for-admin', {
              page: page,
            })
            .then((res) => {
              if (res.status == 200) {
                this.cards = res.data.data
                this.page = res.data.next
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
</style>
