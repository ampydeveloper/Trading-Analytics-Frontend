<template>
  <footer>
      <p class="dashbord-footer-para">
        <nuxt-link to="/">Slabstox.com</nuxt-link>
      </p>
  </footer>
</template>

<script>
export default {
}
</script>
<style lang="scss" scoped>
.dashbord-footer-para{
  text-align: right;
  line-height: 4;
  a{
    color: $theme-off-white;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bolder;
    letter-spacing: 1px;
  }
}
</style>
