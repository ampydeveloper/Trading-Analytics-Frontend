<template>
  <nav class="navbar dashboard-nav-bar flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="javascript:;"></a>
    <img
      class="top-nav-bar-search-logo"
      src="~/assets/img/navbar-top-stox-search.png"
      alt
    />
    <span class="toggle_topnav">+</span>
    <div class="profile_wrap b-profileImage">
      <b-navbar-nav class="top-nav-navbar">
        <b-nav-item
          class="top-nav-icon"
          href="javascript:;"
          v-if="user != null && user.full_name != null"
          @click="shownotification = !shownotification"
        >
          <img class="icon" src="~/assets/img/icons/bell.png" />
        </b-nav-item>
        <!-- <b-nav-item class="top-nav-icon" to="/cart">
          <img class="icon" src="~/assets/img/icons/cart.png" />
          <span v-show="cartItemsCount > 0" class="cart-item-count">{{
            cartItemsCount
          }}</span>
        </b-nav-item> -->
        <b-nav-item-dropdown right v-if="user != null && user.full_name != null">
          <template v-slot:button-content>
            <b-avatar variant="info" :src="user.picture" class></b-avatar>
            <em>{{ user.full_name }}</em>
          </template>
          <b-dropdown-item to="/profile"
            ><img class="icon" src="~/assets/img/icons/profile_icon.png" />My
            Profile</b-dropdown-item
          >
          <b-dropdown-item @click="logout" href="javascript:;"
            ><img
              class="icon"
              src="~/assets/img/icons/logout_icon.png"
            />Logout</b-dropdown-item
          >
        </b-nav-item-dropdown>

       
      </b-navbar-nav>
    </div>

    <div class="mobile_navbar sidebar">
      <!-- <span class="toggle_mainnav" @click="mobileNavShow != mobileNavShow">+</span>-->
      <ul
        class="nav flex-column nav-list-first"
        v-bind:class="{ 'mobile-show': mobileNavShow }"
      >
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/dashboard">
            <div class="icon dashboard-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/live-auctions">
            <div class="icon live-auctions-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/trenders">
            <div class="icon trenders-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user != null && user.full_name != null">
          <nuxt-link class="nav-link" to="/head2head">
            <div class="icon head-to-head-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user == null || user.full_name == null">
          <span class="nav-link" v-b-modal.loginTopPopup>
            <div class="icon head-to-head-icon"></div>
          </span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:;">
            <div class="icon toggle-icon" @click="toggleMobileNav()"></div>
          </a>
        </li>
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/watch-list">
            <div class="icon watch-list-icon"></div>
          </nuxt-link>
        </li> -->
        <li class="nav-item" v-if="user != null && user.full_name != null">
          <nuxt-link class="nav-link" to="/my-portfolio">
            <div class="icon my-listing-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user == null || user.full_name == null">
          <span class="nav-link" v-b-modal.loginTopPopup>
            <div class="icon my-listing-icon"></div>
          </span>
        </li>
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/sell-slabs">
            <div class="icon sell-card-icon"></div>
          </nuxt-link>
        </li> -->
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/my-listing">
            <div class="icon top-pick-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/analytics">
            <div class="icon analytics-icon"></div>
          </nuxt-link>
        </li> -->
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/stoxticker">
            <div class="icon stoxticker-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user != null && user.full_name != null">
          <nuxt-link class="nav-link" to="/stox-requrest">
            <div class="icon stox-request-icon"></div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user == null || user.full_name == null">
          <span class="nav-link" v-b-modal.loginTopPopup>
            <div class="icon stox-request-icon"></div>
          </span>
        </li>
      </ul>
      <!-- <div class="sibar-logo-middel">
        <img src="~/assets/img/dashboard-sidebar-middel-logo.png" alt="Slabstox" />
      </div>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/live-auctions">
            <div class="icon my-stoxpro-icon"></div>
            <div class="link-text">My Stoxpro</div>
          </nuxt-link>
        </li>
      </ul>-->
    </div>
    <div class="nav-bar-form">
      <div
        class="nav-bar-form-input custom-smart-search"
        v-bind:class="{
          'nav-bar-form-input_search_bar_open': showAdvanceSearch,
        }"
      >
        <input
          v-on:keyup.enter="searchNow()"
          v-on:keyup="getSmartKeyword()"
          class="form-control"
          v-model="keyword"
          type="text"
          aria-label="Search"
        />
        <span class="advance-search-label" @click="toggleAdvanceSearch()">{{
          showAdvanceSearch
            ? 'Basic&nbsp;&nbsp;search'
            : 'Advanced&nbsp;&nbsp;search'
        }}</span>
        <div class="display_keyword" v-if="showSmartSearch">
          <ul v-click-outside="hideSmartSearch">
            <li
              v-for="(item, key) of smartKeyword"
              :key="key"
              @click="selectKeyword(item.id)"
            >
              {{ item.player + ' ' + item.title }}
            </li>
            <li v-if="smartKeyword.length == 0">
              No results found for this search
            </li>
          </ul>
        </div>
      </div>
      <button
        type="button"
        @click="searchNow()"
        class="nav-bar-search-btn"
        v-bind:class="{ search_bar_open: showAdvanceSearch }"
      >
        Search Stox
      </button>
    </div>
    <b-navbar-nav class="top-nav-navbar top-right-nav b-profileImage">
      <b-nav-item
        class="top-nav-icon"
        href="javascript:;"
        v-if="user != null && user.full_name != null"
        @click="shownotification = !shownotification"
      >
        <img class="icon" src="~/assets/img/icons/bell.png" />
        <div class="notification_wrap" v-if="shownotification">
          <div class="notification_count">
            <h5>All Notifications</h5>
          </div>
          <div class="notification_list">
            <ul>
              <li class="text-center">
                <h6>Sorry No Notifications.</h6>
              </li>
              <!-- <li>
                <i class="fa fa-bell" aria-hidden="true"></i>
                <h5>New Message</h5>
                <h6>New card listing added.</h6>
                <span>1 Min Ago</span>
              </li> -->
            </ul>
          </div>
          <div class="viewall">
            <h5>View all Notifications</h5>
          </div>
        </div>
      </b-nav-item>
      <!-- <b-nav-item class="top-nav-icon" to="/cart">
        <img class="icon" src="~/assets/img/icons/cart.png" />
        <span v-show="cartItemsCount > 0" class="cart-item-count">{{
          cartItemsCount
        }}</span>
      </b-nav-item> -->
      <b-nav-item-dropdown right v-if="user != null && user.full_name != null">
        <template v-slot:button-content>
          <b-avatar variant="info" :src="user.picture"></b-avatar>
          <em>{{ user.full_name }}</em>
          <span class="bg"></span>
        </template>
        <b-dropdown-item to="/profile">
          <img class="icon" src="~/assets/img/icons/profile_icon.png" />My
          Profile
        </b-dropdown-item>
        <b-dropdown-item @click="logout" href="javascript:;">
          <img class="icon" src="~/assets/img/icons/logout_icon.png" />Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
      
    </b-navbar-nav>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      keyword: '',
      shownotification: false,
      mobileNavShow: false,
      smartKeyword: [],
      requestInProcess: false,
      showSmartSearch: false,
    }
  },
  computed: {
    ...mapGetters({
      cartItemsCount: 'cart/itemsCount',
      showAdvanceSearch: 'advancesearch/show',
    }),
  },
  watch: {
    $route() {
      if (this.$route.path != '/search') {
        this.keyword = ''
        this.showSmartSearch = false
      }
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
    hideSmartSearch(event) {
      this.showSmartSearch = false
    },
    searchNow() {
      this.$store.dispatch('advancesearch/reset_filter')
      this.$store
        .dispatch('advancesearch/update_keyword', this.keyword)
        .then((res) => {
          this.$router.push('/search/?keyword=' + res)
        })
    },
    toggleAdvanceSearch() {
      this.keyword = ''
      this.$store.dispatch('advancesearch/update_keyword', '')
      this.$store.dispatch('advancesearch/toggle')
    },
    toggleMobileNav() {
      this.mobileNavShow = !this.mobileNavShow
    },
    getSmartKeyword() {
      try {
        this.requestInProcess = true
        this.$axios
          .$post('search/get-smart-keyword', { keyword: this.keyword })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              if (this.keyword == res.keyword) {
                this.smartKeyword = res.data
                this.showSmartSearch = true
              }
            }
          })
          .catch((err) => {
            this.requestInProcess = false
            console.log(err)
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    selectKeyword(value) {
      this.$store
        .dispatch('advancesearch/update_search_card_id', value)
        .then(() => {
          this.$router.push('/search/?id=' + value)
        })
      this.showSmartSearch = false
    },
  },
  mounted() {
    if (this.user == null) {
      this.logout()
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard-nav-bar {
  text-transform: uppercase;
  font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
  .top-nav-bar-search-logo {
    width: 10%;
    margin: 0px 25px;
    margin-top: 20px;
  }
  .custom-smart-search {
    .display_keyword {
      position: absolute;
      background: #fff;
      width: 100%;
      z-index: 9;
      ul {
        list-style: none;
        text-transform: none;
        font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
        font-size: 12px;
        padding: 5px 0px;
        margin: 0;
        li {
          cursor: pointer;
          line-height: 2;
          padding-left: 10px;
          &:hover {
            background: #cccccc;
          }
        }
      }
    }
  }
  .nav-bar-form {
    width: 100%;
    margin-top: 25px;
    .advance-search-label {
      position: relative;
      text-decoration: underline;
      top: -21px;
      font-size: 8px;
      float: right;
      right: 11px;
      color: #c5c3c3;
      cursor: pointer;
    }
    .advance-search-label {
      position: absolute;
      text-decoration: underline;
      top: 10px;
      font-size: 8px;
      float: right;
      right: 11px;
      color: #c5c3c3;
      cursor: pointer;
      z-index: 9;
    }
    .nav-bar-form-input {
      margin-right: 20px;
      //margin-top: 4px;
      display: inline-block;
      width: 70%;
      vertical-align: middle;
      .form-control {
        font-size: 12px;
        height: 30px;
        border-radius: 2px;
        position: relative;
      }
    }

    .nav-bar-form-input_search_bar_open {
      .form-control {
        background: #39414a;
        border-color: #39414a;
      }
    }

    .nav-bar-search-btn {
      display: inline-block;
      text-transform: uppercase;
      font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
      background: transparent;
      border: 1px solid $theme-btn-green;
      color: $theme-btn-green;
      font-size: 11px;
      width: auto;
      // margin-top: 3px;
      letter-spacing: 2px;
      padding: 7px 20px 5px;
      border-radius: 2px;
      vertical-align: middle;
      &:focus,
      &:active {
        outline: none;
      }
    }
    .search_bar_open {
      border-color: #39414a !important;
      color: #39414a !important;
    }
  }
  .top-nav-navbar {
    flex-direction: row;
    margin-top: 10px;
    .top-nav-icon {
      .nav-link {
        width: 34px;
        margin-top: 13px;
        .icon {
          background-color: $theme-card-background-color;
          border-radius: 100%;
          width: 100%;
          margin: 0 auto;
          padding: 3px;
        }
        .cart-item-count {
          background: $theme-nav-badge-color;
          color: #ffffff;
          font-size: 10px;
          padding: 3px 7px 2px 5px;
          border-radius: 50%;
          position: absolute;
          margin-top: -5px;
          margin-left: -13px;
          width: 18px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.top-nav-navbar {
  .nav-item {
    .nav-link {
      color: $theme-off-white !important;
      margin-left: 10px;
      font-size: 14px;
      em {
        padding: 0px 15px 0px 5px;
        font-size: 10px;
        //max-width: 180px;
        overflow: hidden;
        letter-spacing: 2px;
        vertical-align: middle;
        width: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }
    .dropdown-toggle:after {
      margin-right: 15px;
    }
    &.show {
      .bg {
        background: #39414a;
        position: absolute;
        height: 44px;
        bottom: 0;
        z-index: -1;
        left: 29px;
        right: 0;
      }
    }
  }
  .nav-item {
    .nav-link {
      color: $theme-off-white !important;
      margin-left: 10px;
      font-size: 14px;
      em {
        padding: 0px 15px 0px 5px;
        font-size: 10px;
        max-width: 180px;
        overflow: hidden;
      }
    }
    .dropdown-toggle:after {
      margin-right: 15px;
    }
    .dropdown-menu {
      background-color: $theme-card-background-color;
      border-radius: 2px;
      .dropdown-item {
        color: $theme-off-white;
        font-size: 10px;
        &:hover {
          background: $theme-btn-green;
          color: $theme-background-color;
        }
      }
    }
  }
}
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 0px 0 0;
  overflow-y: auto;
  background: $theme-btn-green !important;
  box-shadow: none;
  .sibar-logo-top {
    margin-bottom: 25px;
    img {
      width: 100%;
      max-width: 235px;
      padding: 20px 10px;
    }
  }
  .sibar-logo-middel {
    img {
      width: 90%;
      padding: 20px 10px;
    }
  }

  /**
   * Style for icons
   */
  .nav {
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;

    .nav-item {
      .nav-link {
        display: flex;
        color: #000000;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 12px;
        letter-spacing: 1px;
        padding-left: 28px;
        font-style: italic;
        .link-text {
          line-height: 1.5 !important;
          margin-left: 10px !important;
        }
        &.nuxt-link-exact-active {
          background-color: $theme-sidebar-link-hover;
          color: #ffffff;
        }
        .icon {
          width: 32px;
          height: 32px;
          background-position: center; /* Center the image */
          background-repeat: no-repeat; /* Do not repeat the image */
          background-size: cover;
        }

        .dashboard-icon {
          background-image: url('~@/assets/img/icons/dashboard-icon-black.png');
        }

        .live-auctions-icon {
          background-image: url('~@/assets/img/icons/live-auctions-black.png');
        }

        .trenders-icon {
          background-image: url('~@/assets/img/icons/trenders-black.png');
        }
        .top-pick-icon {
          background-image: url('~@/assets/img/icons/top-pick-black.png');
        }
        .head-to-head-icon {
          background-image: url('~@/assets/img/icons/vs-black.png');
        }
        .toggle-icon {
          background-image: url('~@/assets/img/icons/black-arrows.png');
        }

        .sell-card-icon {
          background-image: url('~@/assets/img/icons/sell-card-black.png');
        }
        .stox-request-icon {
          // background-image: url(~@/assets/img/icons/question_mark_icon.png);
          background-image: url(~@/assets/img/icons/stox-request2.png) !important;
        }
        .my-listing-icon {
          background-image: url('~@/assets/img/icons/my-listing-black.png');
        }
        .analytics-icon {
          background-image: url('~@/assets/img/icons/analytics-black.png');
        }
        .stoxticker-icon {
          background-image: url('~@/assets/img/icons/stoxticker-black.png');
        }
        .my-stoxpro-icon {
          background-image: url('~@/assets/img/icons/my-stoxpro-black.png');
        }
        .watch-list-icon {
          background-image: url('~@/assets/img/icons/watch-list-black.png');
        }

        &.nuxt-link-exact-active {
          .toggle-icon {
            background-image: url('~@/assets/img/icons/white-arrows.png');
          }
          .dashboard-icon {
            background-image: url('~@/assets/img/icons/dashboard-icon-white.png');
          }
          .live-auctions-icon {
            background-image: url('~@/assets/img/icons/live-auctions-white.png');
          }
          .trenders-icon {
            background-image: url('~@/assets/img/icons/trenders-white.png');
          }
          .top-pick-icon {
            background-image: url('~@/assets/img/icons/top-pick-white.png');
          }
          .head-to-head-icon {
            background-image: url('~@/assets/img/icons/vs-white.png');
          }
          .sell-card-icon {
            background-image: url('~@/assets/img/icons/sell-card-white.png');
          }
          .my-listing-icon {
            background-image: url('~@/assets/img/icons/my-listing-white.png');
          }
          .analytics-icon {
            background-image: url('~@/assets/img/icons/analytics-white.png');
          }
          .stoxticker-icon {
            background-image: url('~@/assets/img/icons/stoxticker-white.png');
          }
          .my-stoxpro-icon {
            background-image: url('~@/assets/img/icons/my-stoxpro-white.png');
          }
          .watch-list-icon {
            background-image: url('~@/assets/img/icons/watch-list-white.png');
          }
        }

        &:hover {
          color: #ffffff;
          background-color: $theme-sidebar-link-hover;
          .dashboard-icon {
            background-image: url('~@/assets/img/icons/dashboard-icon-white.png');
          }
          .toggle-icon {
            background-image: url('~@/assets/img/icons/white-arrows.png');
          }
          .live-auctions-icon {
            background-image: url('~@/assets/img/icons/live-auctions-white.png');
          }
          .trenders-icon {
            background-image: url('~@/assets/img/icons/trenders-white.png');
          }
          .top-pick-icon {
            background-image: url('~@/assets/img/icons/top-pick-white.png');
          }
          .head-to-head-icon {
            background-image: url('~@/assets/img/icons/vs-white.png');
          }
          .sell-card-icon {
            background-image: url('~@/assets/img/icons/sell-card-white.png');
          }
          .my-listing-icon {
            background-image: url('~@/assets/img/icons/my-listing-white.png');
          }
          .analytics-icon {
            background-image: url('~@/assets/img/icons/analytics-white.png');
          }
          .stoxticker-icon {
            background-image: url('~@/assets/img/icons/stoxticker-white.png');
          }
          .my-stoxpro-icon {
            background-image: url('~@/assets/img/icons/my-stoxpro-white.png');
          }
          .watch-list-icon {
            background-image: url('~@/assets/img/icons/watch-list-white.png');
          }
        }
      }
    }

    .stox-request {
      .nav-link {
        color: rgba($color: #000000, $alpha: 0.5) !important;
        &:hover {
          color: rgba($color: #ffffff, $alpha: 0.5) !important;
        }
        .link-text {
          .stox-request-icon {
            font-size: 22px;
            line-height: 0;
            margin-right: 15px;
          }
        }
      }
    }
  }

  .nav-list-first {
    li:last-child::after {
      content: '';
      width: 60%;
      height: 2px;
      background-color: #25b563;
      position: absolute;
      left: 35px;
    }
  }
}

.sidebar-footer {
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 10px;
  margin-top: 25px;
  padding-left: 20px;
  text-align: center;
  .sibar-footer-ebay {
    width: 40%;
    margin-left: 10px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  background-color: $theme-card-background-color;
}
.b-avatar {
  width: 55px !important;
  height: 55px !important;
}
/**  STYLE 4 */
.sidebar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: $theme-card-background-color;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: $theme-background-color;
  border: 2px solid #555555;
}
.mobile_navbar {
  display: none;
}
// .toggle_mainnav {
//  position: absolute;
//  right: 20px;
//  width: 20px;
// height: 20px;
// background-color: #fff;
// text-align: center;
//   z-index: 99;
//    cursor: pointer;
//}
.mobile_navbar .nav.mobile-show {
  height: 96px;
}
@media (max-width: 767px) {
  .mobile_navbar {
    display: block;
  }
  .dashboard-nav-bar .navbar-brand {
    display: none !important;
  }
  .dashboard-nav-bar .top-nav-bar-search-logo {
    width: 200px !important;
    margin: 20px 20px !important;
  }
  html body #__nuxt .dashboard-nav-bar {
    display: block;
    padding-right: 0 !important;
  }
  .mobile_navbar {
    position: relative;
    width: 100%;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    float: none;
  }
  // .mobile_navbar {
  //   padding-top: 14px;
  //    padding-bottom: 35px;
  //  }

  .mobile_navbar .nav-item {
    width: 20%;
    float: left;
    position: relative;
  }
  .mobile_navbar .nav-item a {
    padding-left: 10px !important;
    padding-right: 10px;
  }
  .mobile_navbar .nav-item .icon {
    margin: auto;
  }
  .mobile_navbar .nav .nav-item .nav-link.nuxt-link-exact-active {
    background-color: transparent;
  }
  .mobile_navbar .nav .nav-item .nav-link:hover {
    background-color: transparent;
  }
  .mobile_navbar .nav {
    // flex: none;
    height: 48px;
    position: relative;
    display: block;
    //  position: absolute;
    overflow: hidden;
    //  top: 0;
    //   left: 0;
    //   right: 0;
    //   flex: none;
    //  display: block;
    //   padding-right: 50px;
  }
  #__nuxt .dashboard-nav-bar .nav-bar-form {
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    width: auto;
  }
}
</style>
