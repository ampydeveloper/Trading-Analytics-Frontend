<template>
  <div class="row beta-ver-hide">
    <div class="col-12 t-p-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <button class="theme-cart-btn card-btn">My Listing</button>
            <nuxt-link class="card-link float-right" to="/my-listing">
                View All
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </nuxt-link>
          </h5>
          <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
          <ul class="my-card-listing">
            <CardListItem v-for="item in data" :key="'available-item-'+item.id" :itemdata="item" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
export default {
  components: {
    CardListItem
  },
  data() {
    return {
      data: [],
      requestInProcess: false,
    }
  },
  async mounted(){
    try {
      this.requestInProcess = true;
        const res = await this.$axios.$post('get-items-for-listing', {
          take: 12,
          card_id: this.cardId,
          id: this.itemId
        })
        this.requestInProcess = false;
        if (res.status == 200) {
          this.data = res.data
        }
      } catch (err) {
         this.requestInProcess = false;
        console.log(err)
      }
  }
}
</script>

<style lang="scss" scoped>
.dataloader {
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
.my-card-listing{
  padding: 0px;
  margin: 0px;
}
.t-p-5{
  padding-left: 5px;
  padding-right: 5px;
}
</style>