<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <h1 class="main-title-dh">Welcome to Dashboard</h1>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - Slabstox'
    }
  },
  mounted() {
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
.t-p-5 {
  padding: 5px;
}
ul.my-card-listing {
  list-style: none;
  padding: 0px;
}
.card-link {
  line-height: 2;
  margin-top: 2px;
}
.main-title-dh{
    color: #fff;
    text-transform: uppercase;
    padding: 0px 15px;
}
</style>
