<template>
<div>
<h1>404 Page Not Found</h1>
  <nuxt-link to="/dashboard">Click Here</nuxt-link> to go back.
</div>
  
</template>

<script>
export default {
  transition: 'fade',
  head() {
    return {
      title: '404 - Slabstox'
    }
  }
}
</script>

<style>

</style>