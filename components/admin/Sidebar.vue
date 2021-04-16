<template>
  <nav class=" col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <div class="sibar-logo-top">
        <img
          src="~/assets/img/dashboard-sidebar-middel-logo.png"
          alt="Slabstox"
        />
      </div>
      <ul class="nav flex-column nav-list-first">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/admin">
            <div class="icon dashboard-icon"></div>
            <div class="link-text">Dashboard</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='!dataEntry'>
          <nuxt-link class="nav-link" to="/admin/cards">
            <div class="icon live-auctions-icon"></div>
            <div class="link-text">Slabs</div>
          </nuxt-link>
        </li>
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/admin/create-card">
            <div class="icon live-auctions-icon"></div>
            <div class="link-text">Create Slab</div>
          </nuxt-link>
        </li> -->
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/admin/ebay-items-fetch">
            <div class="icon live-auctions-icon"></div>
            <div class="link-text">Ebay Item Fetch</div>
          </nuxt-link>
        </li> -->
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/admin/ebay-items-listings">
            <div class="icon  trenders-icon"></div>
            <div class="link-text">All Listings</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='isAdmin'>
          <nuxt-link class="nav-link" to="/admin/scrapitem/null?random=1">
            <div class="icon live-auctions-icon"></div>
            <div class="link-text">Random Bin</div>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/admin/sold-listings">
            <div class="icon  trenders-icon"></div>
            <div class="link-text">Sold Listings</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='!dataEntry'>
          <nuxt-link class="nav-link" to="/admin/requested-slab">
            <div class="icon stox-request-icon"></div>
            <div class="link-text">Slab Requests</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='!dataEntry'>
          <nuxt-link class="nav-link" to="/admin/requested-listing">
            <div class="icon stox-request-icon"></div>
            <div class="link-text">Listing Requests</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='!dataEntry'>
          <nuxt-link class="nav-link" to="/admin/see-problem">
            <div class="icon my-listing-icon"></div>
            <div class="link-text">Flag a Listing</div>
          </nuxt-link>
        </li>
          <li class="nav-item" v-if='!dataEntry'>
          <nuxt-link class="nav-link" to="/admin/search-terms">
            <div class="icon head-to-head-icon"></div>
            <div class="link-text">Search Terms</div>
          </nuxt-link>
        </li>
          <li class="nav-item" v-if='isAdmin'>
          <nuxt-link class="nav-link" to="/admin/csv-uploads">
            <div class="icon my-listing-icon"></div>
            <div class="link-text">CSV Uploads</div>
          </nuxt-link>
        </li>
          <li class="nav-item" v-if='isAdmin'>
          <nuxt-link class="nav-link" to="/admin/stoxticker">
            <div class="icon stoxticker-icon"></div>
            <div class="link-text">Stoxticker</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='!dataEntry'>
          <nuxt-link class="nav-link" to="/admin/users">
            <!-- <div class="icon my-listing-icon"></div> -->
            <font-awesome-icon class="mt-1" :icon="['fas', 'users']" style="font-size: 20px;" />
            <div class="link-text">Users Management</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='isAdmin'>
          <nuxt-link class="nav-link" to="/admin/settings">
            <font-awesome-icon class="mt-2" :icon="['fas', 'cog']" style="font-size: 20px;" />
            <div class="link-text">Settings</div>
          </nuxt-link>
        </li>
        <li class="nav-item" v-if='isAdmin'>
          <nuxt-link class="nav-link" to="/admin/activity-logs">
            <font-awesome-icon class="mt-2" :icon="['fas', 'clipboard-check']" style="font-size: 20px;" />
            <div class="link-text">Activity Logs</div>
          </nuxt-link>
        </li>
        <!-- <li class="nav-item">
          <nuxt-link class="nav-link" to="/admin/advance-search-options">
            <div class="icon stoxticker-icon"></div>
            <div class="link-text">Advance Search</div>
          </nuxt-link>
        </li> -->
        
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      dataEntry: false
    }
  },
  mounted(){
    if((this.user.roles[0].name).toLowerCase() == 'data entry') this.dataEntry = true
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 0px 0 0;
  overflow-y: auto;
  background: -webkit-linear-gradient(
    top,
    $theme-light-green 0%,
    $theme-dark-green 100%
  );
  background: linear-gradient(
    to bottom,
    $theme-light-green 0%,
    $theme-dark-green 100%
  );
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
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 1px;
        padding-left: 28px;
        font-style: italic;
        .link-text {
          line-height: 3 !important;
          margin-left: 10px !important;
              font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    font-weight: 400 !important;
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
          background-size: 27px;
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
          background-color: $theme-sidebar-link-hover;
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
      .nav-link {
        color: rgba($color: #000000, $alpha: 0.5) !important;
        padding: 0.96rem 1rem;
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
      background-color: rgba(0, 0, 0, 0.3);
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