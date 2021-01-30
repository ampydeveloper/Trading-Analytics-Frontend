<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-md-12 col-sm-12 t-p-5">
        <div class="card">
          <div class="card-body dashboard-graph">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Slabstox $12,160</button>
              <button class="theme-green-btn card-btn">
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-up']" />&nbsp;&nbsp;5.18
              </button>
              <nuxt-link class="card-link float-right" to="/">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
          

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-sm-4 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Live Auction</button>
              <nuxt-link class="card-link float-right" to="/">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p
              class="card-text"
            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Trenders</button>
              <nuxt-link class="card-link float-right" to="/">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p
              class="card-text"
            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Watchlist</button>
              <nuxt-link class="card-link float-right" to="/">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
            <p
              class="card-text"
            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">My Listing</button>
              <nuxt-link class="card-link float-right" to="/">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
            </h5>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Dashboard - Head2Head'
    }
  },
  mounted() {
    this.authMiddleware()
  },
  components: {
    
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
