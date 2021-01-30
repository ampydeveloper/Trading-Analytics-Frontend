<template>
  <div>
    <template v-if="appLoaded">
      <Navbar />
      <div class="container-fluid">
        <div class="row">
          <Sidebar />
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="row">
              <!-- <AdvanceSearch /> -->
              <nuxt />
            </div>          
            <Footer />         
          </main>
        </div>
      </div>
    </template>
    <div id="spinner-holder" v-show="showloader">
      <div class="vertical-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/admin/Navbar'
// import AdvanceSearch from '~/components/dashboard/AdvanceSearch'
import Sidebar from '~/components/admin/Sidebar'
import Footer from '~/components/admin/Footer'
import { BSpinner } from 'bootstrap-vue'

export default {
  head() {
    return {
      link: [{ rel: 'stylesheet', href: '/css/layout/admin.css' }],
      bodyAttrs: {
        class: 'adminDashboardLayout'
      }
    }
  },
  components: {
    Navbar,
    Sidebar,
    Footer,
    // AdvanceSearch,
  },
  mounted() {
    this.authAdminMiddleware()
  },
}
</script>

<style>
main{
  padding-top: 10px;
}
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
  top: 15%;
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>