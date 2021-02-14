<template>
  <li class="my-card" v-if="itemdata">
    <h4 class="my-card-title" :title="itemdata.title">
      {{ trimTitle(itemdata.title) }}
    </h4>
    <button class="theme-btn sxvalue">
      Purchase: ${{ itemdata.purchase_price }}
      <span
        :class="(itemdata.sx_icon == 'up' ? 'high' : 'low') + ' float-right'"
        ><font-awesome-icon
          v-if="itemdata.sx_icon !== undefined"
          :icon="['fas', 'long-arrow-alt-' + itemdata.sx_icon]"
        />
        {{ itemdata.differ }}</span
      >
    </button>
    <div class="image-container">
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
      View Card Data
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
    </nuxt-link>
    <div class="my-card-view-listing-on-ebay">
      <a
        class="my-card-view-listing-on-ebay-link"
        @click="editPortfolioData(itemdata)"
        target="_blank"
        >Edit Slab</a
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ['itemdata'],
  mounted() {},
  methods: {
    selectSlabCard(id) {
      this.$emit('clicked', id)
    },
    trimTitle(title) {
      if (title.length > 53) {
        title = title.substring(0, 53)
        title += '...'
        return title
      }
      return title
    },
    editPortfolioData(itemArr) {
      try {
        this.$emit('onEditPortfolioOwned', itemArr)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.rfive-columns .my-card {
  width: 20% !important;
}
.my-card {
  display: inline-block;
  width: 200px;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: $theme-off-white;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 43px;
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
    height: 245px;
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
      max-height: 245px;
    }
  }
  .watchlist-card-listing .my-card-view-listing-on-ebay{
display:none;
}
  .my-card-view-listing {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    width: 100%;
    border-radius: 2px;
    // background: -webkit-linear-gradient(
    //   right,
    //   $theme-dark-green 0%,
    //   $theme-mild-green 33%,
    //   $theme-light-green 100%
    // );
    // background: linear-gradient(
    //   to left,
    //   $theme-dark-green 0%,
    //   $theme-mild-green 33%,
    //   $theme-light-green 100%
    // );
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
  .my-card-view-listing-on-ebay {
    width: 100%;
    text-align: center;
    a.my-card-view-listing-on-ebay-link {
      color: $theme-off-white;
      font-size: 8px;
      letter-spacing: 1px;
      cursor: pointer;
      line-height: 2;
      padding-top: 2px;
      font-style: italic;
    }
  }
}
</style>
