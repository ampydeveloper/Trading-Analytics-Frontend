<template>
  <div class="logout-container"></div>
</template>

<script>
import { BASE_URL } from '../constants/keys'
import $ from 'jquery'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  head() {
    return {
      title: 'Logout - SlabStox',
      meta: [
        {
          hid: 'Logout',
          name: 'Logout - Slabstox',
          content: 'Buy & Sell Slabs',
        },
        { property: 'og:title', content: 'Buy & Sell Slabs' },
        { property: 'og:image', content: $('.header-logo').attr('src') },
        {
          property: 'og:description',
          content: 'Buy & Sell Slabs',
        },
        { property: 'og:url', content: this.baseUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    this.$auth.logout()
    window.location.href = 'https://www.slabstox.com/auto-logout/'
  },
  components: {},
  data() {
    return {
      baseUrl: BASE_URL,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.logout-container{
    background: #1ce783!important;
}
</style>