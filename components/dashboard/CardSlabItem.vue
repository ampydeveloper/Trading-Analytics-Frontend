<template>
  <li
    class="my-card"
    v-if="itemdata"
    @click="makeActive()"
    v-bind:class="{ active: isActive }"
  >
    <div class="bor-left"></div>
    <nuxt-link
      class=""
      :to="'/card-data/?id=' + itemdata.id"
    >
    <h4 class="my-card-title" :title="itemdata.title">
      {{ itemdata.title != '' ? trimTitle(itemdata.title) : '' }}
    </h4>
    </nuxt-link>
    <button class="theme-btn sxvalue">
      <span class="sxvalue-text">
        SX ${{ itemdata.price != null ? itemdata.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }}</span
      >
      <span
        :class="(itemdata.sx_icon == 'up' ? 'high' : 'low') + ' float-right'"
        ><font-awesome-icon
          v-if="itemdata.sx_icon !== undefined"
          :icon="['fas', 'long-arrow-alt-' + itemdata.sx_icon]"
        />
        {{ pert_change_space.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span
      >
    </button>
    <div class="image-container">
      <span v-if="itemdata.is_sx == 1" class="sx-pro-text">SX PRO</span>
      <span v-if="itemdata.grade != null" class="grade-image-text">{{
        itemdata.grade
      }}</span>
      <img
        class="card-image"
        @click="selectSlabCard(itemdata.id)"
        :title="itemdata.title"
        :src="itemdata.cardImage"
        :alt="itemdata.id"
      />
    </div>
    <nuxt-link
      class="my-card-view-listing"
      :to="'/card-data/?id=' + itemdata.id"
    >
      View Slab Data
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
    </nuxt-link>

    <div class="text-center">
      <nuxt-link class="my-card-view-link" :to="'/search/?id=' + itemdata.id">
        View Live Listings
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </nuxt-link>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    itemdata: Object,
    activeSt: {
      type: Boolean,
      default: false,
    },
    orderBy: {
      type: String,
      default: "priceup",
    },
  },
  data() {
    return {
      isActive: false,
      pert_change_space: 0,
    }
  },
  watch: {
    activeSt(val) {
      this.isActive = val
    },
  },
  mounted() {
    this.isActive = this.activeSt
    var sx_val = this.itemdata.sx_value != null ? this.itemdata.sx_value : 0
    this.pert_change_space =
      (this.orderBy == "percentup" || this.orderBy == "percentdown") ? this.itemdata.sx_percent + '%' : '$' + sx_val
  },
  methods: {
    selectSlabCard(id) {
      this.$emit('clicked', id)
    },
    trimTitle(title) {
      // if (title.length > 53) {
      //   title = title.substring(0, 53)
      //   title += '...'
      //   return title
      // }
      return title
    },
    makeActive() {
      this.$emit('toggleCardActive', this.itemdata)
      this.$emit('updateGraph')
      // this.isActive = !this.isActive
      // this.updateGraph(2);
    },
  },
}
</script>

<style lang="scss" scoped>
.t-p-5 {
  padding: 5px;
}
// .rfive-columns .my-card {
//   width: 20% !important;
//   @media (max-width: 767px) {
//     width: 100% !important;
//   }
// }
.my-card {
  display: inline-block;
  width: 200px;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  &:hover {
    .my-card-title {
      color: #1ce783;
    }
  }
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: $theme-off-white;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 38px;
    overflow: hidden;
  }
  .sxvalue.theme-btn {
    width: 100%;
    margin-bottom: 5px;
    letter-spacing: 1.4px;
    font-size: 10px;
    padding: 7px 5px 5px 5px;
    background: #272d33;
    color: #fff;
    text-align: left;
    @media (max-width: 1420px) {
   font-size: 9px;
    }
     @media (max-width: 1330px) {
   font-size: 8px;
    }
    @media (max-width: 1200px) {
   font-size: 10px;
    }
  }
  .sxvalue {
    span.high {
      color: $theme-btn-green;
    }
    span.low {
      color: red;
    }
  }
  .my-card-current-bid-btn {
    width: 100%;
    padding-top: 7px;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .image-container {
    position: relative;
    padding: 5px;
    margin-bottom: 7px;
    text-align: center;
    background: #272d33;
    // border-radius: 2px;
    // height: 245px;
    // @media (max-width: 767px) {
    //   height: 380px !important;
    // }
    height: 16vw;
    .icons-container {
      position: absolute;
      padding: 10px;
      right: 0;
      top: 9px;
      .icons {
        width: 32px;
        height: 32px;
        float: right;
        margin-top: -10px;
        cursor: pointer;
      }
    }
    .card-image {
      margin-top: 0px;
      width: auto;
      max-width: 100%;
      position: absolute;
      height: auto;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
      max-height: 16vw;
      // max-height: 245px;
      // @media (max-width: 767px) {
      //   max-height: 380px !important;
      // }
    }
  }
  .my-card-view-listing {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    width: 100%;
    border-radius: 2px;
    background: #edecec;
    padding: 6px 5px 5px 5px;
    color: #000;
    font-size: 12px;
    display: block;
    text-align: center;
    &:hover {
      text-decoration: none;
      background: #d4d4d4;
    }
  }
  .my-card-view-listing-on-ebay {
    width: 100%;
    text-align: center;
    a.my-card-view-listing-on-ebay-link {
      color: $theme-off-white;
      font-size: 8px;
      letter-spacing: 1px;

      line-height: 2;
      padding-top: 2px;
      font-style: italic;
    }
  }
}
.my-card-view-link {
  display: none;
}
.featured-listing .my-card {
  .bor-left {
    border-left: 2px solid #39414a;
    height: calc(100% - 60px);
    width: 1px;
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 30px;
  }
  .my-card-view-link {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: #edecec;
    text-transform: uppercase;
    font-size: 7px;
    line-height: 2;
    letter-spacing: 1px;
    margin-top: 12px;
    display: inline-block;
  }
}
</style>
