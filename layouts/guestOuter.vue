<template>
  <div>
    <template v-if="appLoaded">
      <NavbarGuestOuter />
      <div class="container-fluid">
        <div class="row">
          <Sidebar />
          <main
            role="main"
            class="col-md-9 ml-sm-auto col-lg-10 dashboard-main"
          >
            <div class="row">
              <AdvanceSearch />
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
import NavbarGuestOuter from '~/components/dashboard/NavbarGuestOuter'
import AdvanceSearch from '~/components/dashboard/AdvanceSearch'
import Sidebar from '~/components/dashboard/Sidebar'
import Footer from '~/components/dashboard/Footer'
import { BSpinner } from 'bootstrap-vue'

export default {
  // middleware({ store, redirect }) {
  //   if (store.state.auth.loggedIn) {
  //     if (
  //       store.state.auth.user.roles &&
  //       store.state.auth.user.roles[0].name != 'user'
  //     ) {
  //       //user is admin allow all pages
  //       // return redirect(route.fullPath)
  //     } else {
  //       if (store.$router.history.current.path.indexOf('admin') !== -1) {
  //         //user is trying to open admin 
  //         return redirect('/')
  //       } else {
  //         //user is simple user allow all pages
  //         // return redirect(route.fullPath)
  //       }
  //     }
  //   } 
  // },
  head() {
    return {
      link: [{ rel: 'stylesheet', href: '/css/layout/dashboard.css' }],
      bodyAttrs: {
        class: 'dashboardLayout',
      },
    }
  },
  watch: {
    $route() {
      if (this.$route.path != '/search') {
        this.$store.dispatch('advancesearch/hide')
      }
      this.$store.dispatch('advancesearch/update_keyword', '')
    },
  },
  components: {
    NavbarGuestOuter,
    Sidebar,
    Footer,
    AdvanceSearch,
  },
  mounted() {
    this.guestMiddleware()
  },
}
</script>

<style>
main {
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
  /* top: 15%; */
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.theme-btn{
  color: #000;
}
</style>