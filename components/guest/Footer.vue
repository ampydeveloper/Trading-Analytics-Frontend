<template>
  <footer class="guestFooter">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-3">
          <a class="footer-link" href>
            <img class="footer-logo" src="~/assets/logo-3.png" alt="Slabstox" />
          </a>
        </div>
        <div class="col-lg-offset-1 col-md-2 col-sm-2">
          <div class>
            <p>
              <span class="title">
                <strong>EXPLORE</strong>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>COMPANY</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>PODCASTS</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>BLOG</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>SHOP</span>
                </a>
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-2 col-sm-2">
          <div class>
            <p>
              <span class="title">
                <strong>Trade</strong>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>SLABSTOX</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>Live Auctions</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>Trenders</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>Top Picks</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>Head 2 Head</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>Stox Ticker</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="#">
                  <span>Prostox</span>
                </a>
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-2 col-sm-2">
          <div class>
            <p>
              <span class="title">
                <strong>CONNECT</strong>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="https://www.instagram.com/slabstox/">
                  <span>INSTAGRAM</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a
                  class="footer-link"
                  href="https://www.youtube.com/channel/UCAPKPFuEp26sskdNj6j4lBA"
                >
                  <span>YOUTUBE</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="https://www.facebook.com/SlabStox/">
                  <span>FACEBOOK</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="https://twitter.com/SlabStox">
                  <span>TWITTER</span>
                </a>
              </span>
            </p>
            <p>
              <span class="sub-title">
                <a class="footer-link" href="https://www.linkedin.com/in/aaron-nowak-4241a3129/">
                  <span>LINKEDIN</span>
                </a>
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-2 col-sm-2">
          <div class>
            <p>
              <span class="title">
                <strong>
                  <span>SUPPORT</span>
                </strong>
              </span>
            </p>
            <p>
              <span class="sub-title">1-800-555-5555</span>
            </p>
            <p>
              <span class="sub-title">Info@slabstox.com</span>
            </p>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <ul class="footer-all-rights-ul">
            <li>©2020 Slabstox All rights reserved.</li>
            <li>/</li>
            <li>
              <a class="footer-link" href="#">Terms &amp; Conditions</a>
            </li>
            <li>/</li>
            <li>
              <a class="footer-link" href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {}
</script>

<style lang="scss" scoped>
.guestFooter {
  padding-top: 135px;
  padding-bottom: 35px;
  background: #ffffff;
  .footer-logo {
    width: 200px;
  }
  .footer-link {
    color: #000;
    text-transform: uppercase;
    span {
      font-size: 12px;
      font-family: 'CocogoosePro-LightItalic', Helvetica, Arial, sans-serif;
    }
    &:hover {
      color: #00ef67;
      text-decoration: none;
    }
  }
  span.title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    line-height: 3;
  }
  span.sub-title {
    font-family: 'CocogoosePro-LightItalic', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    font-size: 12px;
  }
  .footer-all-rights-ul {
    list-style: none;
    margin-top: 30px;
  }
  .footer-all-rights-ul li {
    display: inline-block;
    text-transform: uppercase;
    font-size: 9px;
    color: #b6b8b7;
    font-weight: 600;
    margin-right: 3px;
  }
  .footer-all-rights-ul li a {
    color: #b6b8b7;
  }
}

@media (max-width: 768px) {
  .guestFooter {
    .footer-logo {
      width: 152px;
      margin-top: -25px;
    }
  }
}

@media (max-width: 425px) {
  .guestFooter {
    padding: 0px;
    .footer-logo {
      width: 50%;
      margin-top: -15px;
      margin-bottom: 15px;
    }
    .footer-all-rights-ul {
      list-style: none;
      margin-top: 30px;
      padding: 0px;
      font-size: 10px;
    }
  }
}
</style>
