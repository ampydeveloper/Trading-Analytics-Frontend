<template>
  <div>
    <template v-if="appLoaded">
      <Navbar />
      <nuxt />
      <Footer />
    </template>
    <div id="spinner-holder" v-show="showloader">
      <div class="vertical-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/guest/Navbar'
import Footer from '~/components/guest/Footer'
import { BSpinner } from 'bootstrap-vue'

export default {
  loading: '~/components/loading.vue',
  head() {
    return {
      link: [{ rel: 'stylesheet', href: '/css/layout/guest.css' }],
      bodyAttrs: {
        class: 'guestLayout'
      }
    }
  },
  components: {
    Navbar,
    Footer
  },
  mounted() {
    this.guestMiddleware()
  },
}
</script>

<style>
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
</style>