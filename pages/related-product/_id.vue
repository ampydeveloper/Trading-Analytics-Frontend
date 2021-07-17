<template>
  <div class="col-md-12 col-sm-12 search-page">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-green-btn card-btn">Related Listings</button>
            </h5>
            <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
            <p
              v-if="items.length == 0"
              class="no-result-found"
            >{{ (requestInProcess) ? '' : 'No result found'}}</p>
            <ul v-else class="my-card-listing">
              <CardListItem v-for="item in items" :key="item.id" :itemdata="item" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
import { mapGetters } from 'vuex'
import { BSpinner } from 'bootstrap-vue'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  head() {
    return {
      title: 'Related Products - Slabstox'
    }
  },
  async mounted() {
    if ($nuxt.$route.params.hasOwnProperty('id')) {
      this.id = $nuxt.$route.params.id
    } else {
      this.$router.push('/404')
    }

    this.getData()
    this.scroll()
  },
  components: {
    CardListItem,
    BSpinner
  },
  data() {
    return {
      id: null,
      items: [],
      requestInProcess: false,
      page: 1,
      noMoreData: false,
    }
  },
  methods: {
    getData(status = false) {
      if (!this.requestInProcess) {
        try {
          if(!status){
            this.page = 1
            this.items = []
          }
          this.requestInProcess = true
          this.$axios
            .$post('card/get-card-list-using-card-id/' + this.id, {page: this.page})
            .then(res => {
              this.requestInProcess = false
              if (res.status == 200) {
                if(res.data == null || res.data.length ==0){
                  this.noMoreData = true;
                }
                if(status){
                    res.data.map(item => {
                      this.items.push(item);  
                    })
                  }else{
                    this.items = res.data
                  }
                  this.page = res.next
              }
            })
        } catch (err) {
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    scroll() {
      window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop + window.innerHeight;
        const offsetHeight = document.documentElement.offsetHeight;
        let bottomOfWindow = (scrollTop >=(offsetHeight-2) && scrollTop <=(offsetHeight+2))
        if (bottomOfWindow) {
          if(!this.noMoreData){
            this.getData(true);
          }
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
.search-page {
  .dataloader {
    text-align: center;
    margin-top: 15%;
    margin-bottom: 30%;
  }
  .slab-result-search {
    margin-top: -15px;
    .no-padding {
      padding: 0px;
      .transparent-bg {
        background: transparent;
        border: none;
        .card-body {
          padding-bottom: 0px;
        }
        .slab-result-title {
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          margin-left: -5px;
        }
        .slab-result-card {
          display: inline-block;
          width: 200px;
          padding: 0px 8px;
          margin-bottom: 30px;
          text-transform: uppercase;
          .slab-result-card-title {
            font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial,
              sans-serif;
            color: $theme-off-white;
            text-decoration: underline;
            font-size: 12px;
            letter-spacing: 1px;
          }
          .my-card-current-bid-btn {
            width: 100%;
            padding-top: 7px;
            padding-bottom: 5px;
            margin-bottom: 5px;
          }
          .slab-result-slab-result-card-image-container {
            background: $theme-off-white;
            position: relative;
            padding: 5px;
            margin-bottom: 15px;
            .slab-result-card-icons-container {
              position: relative;
              padding: 10px;
              .icons {
                width: 32px;
                height: 32px;
                float: right;
                margin-top: -10px;
              }
            }
            .slab-result-card-image {
              width: 100%;
              height: 200px;
            }
          }
          .slab-result-card-view-card-data {
            font-family: 'NanoBold', Helvetica, Arial, sans-serif;
            width: 100%;
            border-radius: 2px;
            background: $theme-off-white;
            padding: 7px;
            color: #000000;
            font-size: 13px;
            width: 100%;
            display: block;
            text-align: center;
            font-weight: bolder;
          }
        }
      }
    }
  }
  .card-title {
    margin-bottom: 40px !important;
  }
  ul.my-card-listing {
    list-style: none;
    padding: 0px;
  }
  .no-result-found {
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
}
</style>