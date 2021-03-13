<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <div class="sibar-logo-top">
        <img
          src="~/assets/img/dashboard-sidebar-middel-logo.png"
          alt="Slabstox"
          id="sidebarLogo"
        />
      </div>
      <ul class="nav flex-column nav-list-first">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/dashboard">
            <div class="icon dashboard-icon"></div>
            <div class="link-text">Dashboard</div>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/live-auctions">
            <div class="icon live-auctions-icon"></div>
            <div class="link-text">Live Listings</div>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/trenders">
            <div class="icon trenders-icon"></div>
            <div class="link-text">Trenders</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user != null && user.full_name != null">
          <nuxt-link class="nav-link" to="/head2head">
            <div class="icon head-to-head-icon"></div>
            <div class="link-text">Head 2 Head</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user == null || user.full_name == null">
          <span
            class="nav-link login-popup-open"
            to="/"
            v-b-modal.loginTopPopup
          >
            <div class="icon head-to-head-icon"></div>
            <div class="link-text">Head 2 Head</div>
          </span>
        </li>
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/watch-list">
            <div class="icon watch-list-icon"></div>
            <div class="link-text">Watch List</div>
          </nuxt-link>
        </li> -->
        <li class="nav-item" v-if="user != null && user.full_name != null">
          <nuxt-link class="nav-link" to="/my-portfolio">
            <div class="icon my-listing-icon"></div>
            <div class="link-text">My Portfolio</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user == null || user.full_name == null">
          <span
            class="nav-link login-popup-open"
            to="/"
            v-b-modal.loginTopPopup
          >
            <div class="icon my-listing-icon"></div>
            <div class="link-text">My Portfolio</div>
          </span>
        </li>
        <!--<li class="nav-item">
          <nuxt-link class="nav-link" to="/sell-slabs">
            <div class="icon sell-card-icon"></div>
            <div class="link-text">Sell Slabs</div>
          </nuxt-link>
        </li>-->
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/my-listing">
            <div class="icon top-pick-icon"></div>
            <div class="link-text">My Listing</div>
          </nuxt-link>
        </li> -->
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/Analytics">
            <div class="icon analytics-icon"></div>
            <div class="link-text">My Analytics</div>
          </nuxt-link>
        </li>-->
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/stoxticker">
            <div class="icon stoxticker-icon"></div>
            <div class="link-text">Stoxticker</div>
          </nuxt-link>
        </li>

        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/stoxticker-board-details">
            <div class="icon stoxticker-icon"></div>
            <div class="link-text">Stoxticker</div>
          </nuxt-link>
        </li> -->

        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            to="/stox-requrest"
            v-if="user != null && user.full_name != null"
          >
            <div class="icon stox-request-icon"></div>
            <div class="link-text">Slab Request</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="user == null || user.full_name == null">
          <span
            class="nav-link login-popup-open"
            to="/"
            v-b-modal.loginTopPopup
          >
            <div class="icon stox-request-icon"></div>
            <div class="link-text">Slab Request</div>
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
      <!-- <p class="sidebar-footer">
        Powered by
        <img
          class="sibar-footer-ebay"
          src="~/assets/img/ebay-sibar-footer.png"
          alt
        />
      </p> -->
    </div>

    <b-modal id="loginTopPopup" title="ADDITIONAL SX PRO FEATURES" hide-footer>
      <div class="shar-text" style="padding: 20px 20px">
        To Access Additional Features Please <nuxt-link to="/register">Sign Up</nuxt-link> or <a href="/">Sign In</a>.
      </div>
    </b-modal>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.shar-text{
  a{
        color: #11d675;
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
    //font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    .nav-item {
      .nav-link {
        display: flex;
        color: #000000;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 11px;
        align-items: center;
        letter-spacing: 2px;
        padding-left: 28px;
        font-style: italic;
        .link-text {
          line-height: 1.5 !important;
          margin-left: 10px !important;
          margin-top: 4px;
        }
        &.nuxt-link-exact-active {
          //background-color: $theme-sidebar-link-hover;
          background: #25b56f;
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

        .sell-card-icon {
          background-image: url('~@/assets/img/icons/sell-card-black.png');
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
        .stox-request-icon {
          // background-image: url(~@/assets/img/icons/question_mark_icon.png);
          background-image: url(~@/assets/img/icons/stox-request2.png);
        }
        .my-stoxpro-icon {
          background-image: url('~@/assets/img/icons/my-stoxpro-black.png');
        }
        .watch-list-icon {
          background-image: url('~@/assets/img/icons/watch-list-black.png');
        }

        &.nuxt-link-exact-active {
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
          //background-color: $theme-sidebar-link-hover;
          background: #25b563;
          background: #25b56f;

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
      }
    }

    .stox-request {
      position: absolute;
      bottom: 63px;
      .nav-link {
        &:hover {
          color: rgba($color: #ffffff, $alpha: 0.5) !important;
        }
      }
    }
  }

  .nav-list-first {
    li:last-child::after {
      content: '';
      width: 60%;
      height: 1px;
      background-color: #25b563;
      position: absolute;
      left: 30px;
    }
  }
}

.sidebar-footer {
  font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 9px;
  margin-top: 15px;
  padding-left: 31px;
  letter-spacing: 1px;
  text-align: left;
  position: absolute;
  bottom: 0;
  .sibar-footer-ebay {
    width: 75px;
    margin-left: 10px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  background-color: $theme-card-background-color;
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
</style>