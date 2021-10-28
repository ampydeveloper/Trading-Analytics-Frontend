<template>
  <nav class="navbar dashboard-nav-bar flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="javascript:;"></a>
    <!-- <img class="top-nav-bar-search-logo" src="~/assets/img/navbar-top-stox-search.png" alt />
    <div class="nav-bar-form">
      <div
        class="nav-bar-form-input"
        v-bind:class="{'nav-bar-form-input_search_bar_open': showAdvanceSearch}"
      >
        <input
          v-on:keyup.enter="searchNow()"
          class="form-control"
          v-model="keyword"
          type="text"
          aria-label="Search"
        />
        <span
          class="advance-search-label"
          @click="toggleAdvanceSearch()"
        >{{ (showAdvanceSearch) ? 'Basic&nbsp;&nbsp;search' : 'Advance&nbsp;&nbsp;search' }}</span>
      </div>
      <button
        type="button"
        @click="searchNow()"
        class="nav-bar-search-btn"
        v-bind:class="{'search_bar_open': showAdvanceSearch}"
      >Search Stox</button>
    </div> -->
    <b-navbar-nav class="top-nav-navbar">
      <b-nav-item
        class="top-nav-icon top-nav-icon2"
        href="javascript:;"
        @click="shownotification = !shownotification"
      >
        <img class="icon" src="~/assets/img/icons/bell.png" />
        <div class="notification_wrap" v-if="shownotification">
          <div class="notification_count">
            <h5>All Notifications</h5>
          </div>
          <div class="notification_list">
            <ul v-for="(item, key) of items">
              <!-- <li class="text-center">
                
                <h6>Sorry No Notifications.</h6>
                
              </li> -->
              <li class="listing-ended-li" @click="listingEnded(item.id)" >
                <i class="fa fa-bell" aria-hidden="true"></i>
                <h5>Listing Ended</h5>
                <h6>{{ item.title }}</h6>
                <span>Recently</span>
              </li>
        
            </ul>
          </div>
          <!-- <div class="viewall">
            <h5>View all Notifications</h5>
          </div> -->
        </div>
      </b-nav-item>
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <b-avatar variant="info" :src="profileImage"></b-avatar>
          <em>{{user_fullname}}</em>
        </template>
        <!-- <b-dropdown-item to="/profile">Profile</b-dropdown-item> -->
        <b-dropdown-item @click="logout" href="javascript:;">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      keyword: '',
      shownotification: false,
        items: [],
      profileImage: 'https://placekitten.com/300/300'
    }
  },
  computed: {
    ...mapGetters({
      cartItemsCount: 'cart/itemsCount',
      showAdvanceSearch: 'advancesearch/show'
    })
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
    searchNow() {
      this.$store.dispatch('advancesearch/update_keyword', this.keyword)
      this.$router.push('/search')
    },
    toggleAdvanceSearch() {
      this.$store.dispatch('advancesearch/toggle')
    },
    listingEnded(itemId){
this.$router.push('/admin/ebay-items-listings?item='+itemId)
    },
    getItems() {
      // if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('search/ended-listing')
            .then((res) => {
              if (res.status == 200) {
                this.items = res.data.data
              }
              this.requestInProcess = false
              this.hideLoader()
            })
            .catch((err) => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      // }
    },
  },
  mounted() {
    this.getItems()
    if(this.user == null) {
      this.logout()
    }
    if (this.user.avatar_location != '') {
      this.profileImage = this.user.avatar_location
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-nav-bar {
  text-transform: uppercase;
  font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
  .top-nav-bar-search-logo {
    width: 10%;
    // margin: 0px 25px;
    margin: 5px 25px;
  }

  .nav-bar-form {
    width: 100%;
    margin-top: 10px;
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
    .nav-bar-form-input {
      margin-right: 20px;
      margin: 4px 0;
      display: inline-block;
      width: 70%;
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
      border: 1px solid $theme-light-green;
      color: $theme-light-green;
      font-size: 12px;
      height: 30px;
      width: 155px;
   //   margin-top: 4px;
     // letter-spacing: 2px;
     // padding: 0px 20px;

    margin-top: 3px;
    letter-spacing: 2px;
    padding: 7px 20px 5px;
      border-radius: 2px;
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
    .top-nav-icon {
      .nav-link {
        width: 34px;
        margin-top: 7px;
        .icon {
          background-color: $theme-card-background-color;
          border-radius: 100%;
          width: 80%;
          margin: 0 auto;
          padding: 2px;
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
    .top-nav-icon2 .nav-link{
    margin-top: 17px;
    .icon{
          padding: 3px;
              width: 92%;
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
        max-width: 180px;
        overflow: hidden;
      }
    }
    .dropdown-toggle:after {
      margin-right: 15px;
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
    .dropdown-menu{
      background-color: $theme-card-background-color;
      border-radius: 2px;
      .dropdown-item{
        color: $theme-off-white;
        font-size: 12px;
        &:hover{
          background: $theme-btn-green;
          color: $theme-background-color;
        }
      }
    }
  }
}
</style>
