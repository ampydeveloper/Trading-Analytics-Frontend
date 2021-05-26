<template>
  <div class="row">
    <div class="col-12 t-p-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <button class="theme-cart-btn card-btn">Related Listings</button>
            <nuxt-link class="card-link float-right" :to="'/related-product/'+cardId">
              View All
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </nuxt-link>
          </h5>
          <div class="dataloader" v-if="requestInProcess">
              <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
          <ul class="my-card-listing" v-if="data.length > 0">
            <CardListItem v-for="item in data" :key="'realted-item-'+item.id" :itemdata="item" />
          </ul>
           <div
            class="empty-result"
            v-if="data.length == 0 && !requestInProcess"
          >
            <p>There are no listings here. Check again soon.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
export default {
  props: ['cardId','itemId'],
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
          card_id: this.cardId,
          id: this.itemId
        })
        this.requestInProcess = false;
        if (res.status == 200) {
          this.data = res.data
          this.loaded = true
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
  padding: 5px;
}
</style>