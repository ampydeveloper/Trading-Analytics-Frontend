<template>
  <div>
    <template v-if="appLoaded">
      <nuxt />
    </template>
    <div id="spinner-holder" v-show="showloader">
      <div class="vertical-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  head() {
    return {
      bodyAttrs: {
        class: 'defaultLayout'
      }
    }
  },
}
</script>

<style lang="scss">
#spinner-holder {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.defaultLayout{
  background-color: #272d33;
  color: #ffffff;
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  text-align: center;
  h1{
    line-height: 3;
  }
  a{
    color: rgba(5, 251, 98, 0.76);
    &:hover{
      color: rgba(10, 178, 95, 0.76);
    }
  }
}
</style>
