<template>
  <header class="guestHeader">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-3 col-lg-3">
          <a href>
            <img class="header-logo" src="~/assets/logo-3.png" alt="Slabstox" />
          </a>
        </div>
        <div class="col-12 col-sm-12 col-md-9 col-lg-9">
          <ul
            v-if="!authenticated"
            class="upper-links list-inline navbar-withlg-upper-links"
          >
            <li>
              <img
                class="nav-logo"
                src="~/assets/prostox-black-logo.png"
                alt="Slabstox"
              />
            </li>
            <li>
              <nuxt-link to="/login">
                <i>Sign In</i>
              </nuxt-link>
            </li>
            <li>/</li>
            <li>
              <nuxt-link to="/register">
                <i>Sign Up</i>
              </nuxt-link>
            </li>
          </ul>
          <b-navbar toggleable="sm">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav v-if="!authenticated" class="ml-auto">
                <b-nav-item class="show-only-on-mobile" to="/login">
                  <i>Sign In</i>
                </b-nav-item>
                <b-nav-item class="show-only-on-mobile" to="/register">
                  <i>Sign Up</i>
                </b-nav-item>
                <b-nav-item to="https://www.slabstox.com/explore/">
                  <i>Explore</i>
                </b-nav-item>
                <b-nav-item to="/dashboard">
                  <i>Slabstoxpro</i>
                </b-nav-item>
                <b-nav-item href="https://www.slabstox.com/slabshield/">
                  <i>Slabshield</i>
                </b-nav-item>
                <b-nav-item href="https://www.slabstox.com/podcast/">
                  <i>Podcast</i>
                </b-nav-item>
                <b-nav-item href="https://www.slabstox.com/blog/">
                  <i>Latest</i>
                </b-nav-item>
                <b-nav-item href="https://www.slabstox.com/connect/">
                  <i>Connect</i>
                </b-nav-item>
                <b-nav-item
                  class="btn-shop-out"
                  href="https://www.slabstox.com/shop/"
                >
                  <i>Shop</i>
                </b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
header.guestHeader {
  background-color: #fff !important;
  padding-bottom: 13px;
  .container {
    max-width: 1170px;
    padding-left: 9px;
    padding-right: 9px;
  }

  .header-logo {
    width: 100%;
  }

  .nav-logo {
    width: 70px;
  }

  .navbar-nav > .nav-item {
    margin-left: 5px;
    position: relative;
  }

  .navbar-nav > .nav-item:first-child {
    margin-left: 0px;
  }
  .navbar .nav-item a.nav-link {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    line-height: 14px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 14px;
    position: relative;
    padding: 6px 12px;
    z-index: 1;
    transition: padding 0.2s ease-in-out, transform 0.2s ease-in-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: block;
  }

  .navbar .nav-item a.nav-link:before {
    content: '';
    opacity: 0;
    position: absolute;
    border-radius: 2px;
    height: 14px;
    width: 100%;
    top: 50%;
    left: 0;
    background-color: #00ef67;
    transform: translateY(-50%);
    transition: height 0.2s ease-in-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: -1;
  }

  .navbar .nav-item a.nav-link:hover {
    text-decoration: none;
    color: #fff !important;
  }
  .navbar .nav-item a.nav-link:hover:before {
    background-color: $theme-btn-green;
    height: 30px;
    opacity: 1;
    content: '';
    position: absolute;
    border-radius: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: height 0.2s ease-in-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: -1;
  }

  .upper-links li {
    display: inline;
    margin: 0px 3px;
    text-transform: uppercase;
    color: #888586;
  }
  .upper-links.navbar-withlg-upper-links {
    margin-top: 29px;
    margin-right: 12px;
    text-align: right;
    width: auto;
  }
  .upper-links li a {
    color: #888586;
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    line-height: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 10px !important;
  }
  .header-logo {
    width: 200px;
    margin-top: 17px;
  }
  .navbar .nav-item a.nav-link {
    font-size: 14px;
    padding: 6px 12px;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    line-height: 14px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
    i {
      font-style: normal;
    }
  }
  .upper-links {
    margin-top: 13px;
    margin-right: 24px;
    float: right;
  }
  nav.navbar {
    margin-top: 95px;
    // margin-top: 99px;
    padding-bottom: 0;
  }
  @media (max-width: 1200px) {
    .navbar-nav > .nav-item {
      margin: 0;
      a.nav-link {
        font-size: 11px;
        padding: 6px 5px ;
      }
     
    }

   .navbar-nav .btn-shop-out a.nav-link {
        margin-left: 8px !important;
        padding: 7px 10px !important;
        font-size: 12px !important;
        margin-top: -2px !important;
      }
  }
  @media (max-width: 768px) {
     nav.navbar{
    margin: 0;
    }
    .header-logo {
      width: 150px !important;
    }
    .navbar .nav-item a.nav-link {
      font-size: 12px !important;
      padding: 6px 6px !important;
    }
    .upper-links {
      margin-right: 0px !important;
    }
  }

  @media (max-width: 576px) {
    .header-logo {
      // width: 60% !important;
      margin-top: -21px !important;
    }
    .upper-links {
      /* position: relative !important;
    margin-top: 25px;
    width: 100%;
    text-align: center; */
      display: none;
    }

    .upper-links .nav-logo {
      display: none;
    }

    .upper-links li a {
      font-size: 16px !important;
    }

    nav.navbar {
      margin-top: -53px;
      float: right;
    }

    nav.navbar button {
      border: none;
      width: 100%;
    text-align: right;
    &:focus{
      outline: none;
    }
    }

    .navbar .nav-item a.nav-link {
      text-align: center;
      padding: 13px 38px !important;
    }

    .navbar-nav > .nav-item {
      margin-left: 0px;
    }
  }

  .show-only-on-mobile {
    display: none;
  }
  .navbar-nav .btn-shop-out a.nav-link {
    background: #1ce783;
    border-radius: 3px;
    transform: skewX(-8deg);
    font-weight: bold;
    padding: 13px 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: 0;
    color: #fff !important;
    margin-left: 35px;
    margin-top: -10px;
    font-size: 13px;
    font-style: normal;
    font-family: Helvetica, Arial, sans-serif;
  }
  @media (max-width: 576px) {
    .show-only-on-mobile {
      display: block;
    }
    nav.navbar {
      .navbar-toggler {
        // width: 100%;
        .navbar-toggler-icon {
          float: right;
          margin-top: 22px;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
      }
      .navbar-collapse {
        padding-top: 25px;
      }
    }
  }
}
</style>