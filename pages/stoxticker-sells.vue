<template>
  <div class="col-md-12 col-sm-12">
    <div class="row analytics_page">
      <div class="col-md-12 pr-0 inner_wrap">
        <div class="col-md-12 col-sm-12 pl-0 stoxticker_listing-outer">
          <div class="card stoxticker_page stoxticker_listing">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn">SX STOXTICKER</button>
                <span class="float-right share-lk-top sb-data-values-out">
                  <span class="share-icon si-white">
                    Share
                    <img src="~/assets/img/share-icon-white.png" alt />
                  </span>
                  <div class="share-all-outer" style="top: 19px">
                    <ul>
                      <li style="margin: 0">
                        <a href="javascript:;" @click="shareFb()"
                          ><img src="~/assets/img/icons/facebook.svg" alt
                        /></a>
                      </li>
                      <li style="margin: 0">
                        <a
                          :href="
                            'https://twitter.com/intent/tweet?url=' +
                            encodeURI(currentUrl) +
                            '&text=StoxTicker@' +
                            (this.data.sale ? this.data.sale : '') +
                            ' Total Slabs: ' +
                            intToString(data.total)
                          "
                          target="_blank"
                          ><img src="~/assets/img/icons/twitter.svg" alt
                        /></a>
                      </li>
                      <li style="margin: 0">
                        <a
                          :href="
                            'http://pinterest.com/pin/create/button/?url=' +
                            encodeURI(currentUrl) +
                            '&media=' +
                            encodeURI(this.graphImage) +
                            '&description=' +
                            encodeURI(
                              'StoxTicker@' +
                                (this.data.sale ? this.data.sale : '') +
                                ' Total Slabs: ' +
                                intToString(data.total)
                            )
                          "
                          target="_blank"
                          ><img src="~/assets/img/pinterest.png" alt
                        /></a>
                      </li>
                      <li style="margin: 0">
                        <a
                          :href="
                            'https://www.linkedin.com/shareArticle?mini=true&url=' +
                            encodeURI(currentUrl)
                          "
                          target="_blank"
                          ><img
                            src="~/assets/img/icons/linkedin-circled.svg"
                            alt
                        /></a>
                      </li>
                    </ul>
                  </div>
                </span>
              </h5>
              <ul>
                <li>
                  <h3 class="h3-title">BASKETBALL</h3>
                  <marquee direction="left">
                    <!-- <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4>
                    <h5>LEBRON JAMES 2003...</h5> -->
                    <template v-for="list in soldListing.basketball">
                      <h4>{{ list.title }}&nbsp;&nbsp;</h4>
                    </template>
                    <template v-if="soldListing.basketball == 0">
                      <h4>No recent sold listings.</h4>
                    </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">FOOTBALL</h3>
                  <marquee direction="left">
                    <template
                      v-if="soldListing.football > 0"
                      v-for="list in soldListing.football"
                    >
                      <h4>{{ list.title }}&nbsp;&nbsp;</h4>
                    </template>
                    <template v-if="soldListing.football == 0">
                      <h4>No recent sold listings.</h4>
                    </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">BASEBALL</h3>
                  <marquee direction="left">
                    <template v-for="list in soldListing.baseball">
                      <h4>{{ list.title }}&nbsp;&nbsp;</h4>
                    </template>
                    <template v-if="soldListing.baseball == 0">
                      <h4>No recent sold listings.</h4>
                    </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">SOCCER</h3>
                  <marquee direction="left">
                    <template v-for="list in soldListing.soccer">
                      <h4>{{ list.title }}&nbsp;&nbsp;</h4>
                    </template>
                    <template v-if="soldListing.soccer == 0">
                      <h4>No recent sold listings.</h4>
                    </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">POKÉMON</h3>
                  <marquee direction="left">
                    <template v-for="list in soldListing.pokemon">
                      <h4>{{ list.title }}&nbsp;&nbsp;</h4>
                    </template>
                    <template v-if="soldListing.pokemon == 0">
                      <h4>No recent sold listings.</h4>
                    </template>
                  </marquee>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../constants/keys'

export default {
  transition: 'fade',
  layout: 'default',
  auth: 'guest',
  head() {
    return {
      title: 'Stoxticker - Slabstox',
      meta: [
        {
          hid: 'stoxticker-sells', name: 'Stoxticker - Slabstox',
          content: 'Slabstox - Check our StoxTicker',
        },
        { property: 'og:title', content: 'Slabstox - Check our StoxTicker' },
        { property: 'og:image', content: this.sxGraphImage },
        {
          property: 'og:description',
          content:
            'StoxTicker@' +
            (this.data.sale ? this.data.sale : '') +
            ' Total Slabs: ' +
            this.intToString(this.data.total),
        },
        { property: 'og:url', content: this.currentUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    this.getData()
    this.getSoldListing()
  },
  components: {},
  data() {
    return {
      logo: null,
      baseUrl: BASE_URL,
      requestInProcess: false,
      graphImage: '',
      sxGraphImage: '',
      perc_diff: 0,
      doller_diff: 0,
      total_sales: 0,
      last_timestamp: 'N/A',
      currentUrl: location.href,
      soldListing: '',
      data: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: '',
      },
    }
  },
  methods: {
    trimTitle(title) {
      if (title.length > 53) {
        title = title.substring(0, 53)
        title += '...'
        return title
      }
      return title
    },
    getData() {
      try {
        this.$axios.$get('get-stoxticker-data').then((res) => {
          if (res.status == 200) {
            this.data = res.data
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        this.$router.push('/404')
      }
    },
    getSoldListing() {
      try {
        this.$axios.$get('stoxticker/sold-listings').then((res) => {
          if (res.status == 200) {
            this.soldListing = res.data
          } else {
            this.$router.push('/404')
          }
        })
      } catch (error) {
        this.$router.push('/404')
      }
    },
    shareFb() {
      FB.ui({
        method: 'feed',
        name:
          'StoxTicker@' +
          (this.data.sale ? this.data.sale : '') +
          ' Total Slabs: ' +
          intToString(data.total),
        link: this.baseUrl,
        picture: this.sxGraphImage,
        description: 'Slabstox - Check our StoxTicker',
      })
    },
    intToString(value) {
      var suffixes = ['', 'k', 'm', 'b', 't']
      var suffixNum = Math.floor(('' + value).length / 3)
      var shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(2)
      )
      if (shortValue % 1 != 0) {
        shortValue = shortValue ? shortValue.toFixed(1) : ''
      }
      return shortValue + suffixes[suffixNum]
    },
    generateImageOfGraph(chartInstance) {
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.$axios
          .$post('generate-graph-image', { image: img.src, prefix: 'cdc' })
          .then((res) => {
            if (res.status == 200) {
              this.sxGraphImage = res.url
            }
          })
      })
    },
  },
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
.stat_box {
  padding: 10px 15px;
  background-color: #1de783;
  border-radius: 3px;
}
.stat_box h3 {
  padding: 7px 12px 5px 12px;
  background: #edecec;
  border: none;
  border-radius: 2px;
  font-style: italic;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 13px !important;
}
.stat_box ul {
  padding: 0px;
  list-style-type: none;
  width: auto;
  margin-bottom: 0px;
}
.stat_box ul li {
  font-size: 12px;
  margin-bottom: 7px;
  font-family: 'NexaBold', Helvetica, Arial, sans-serif;
  font-style: normal;
}
.embed-link {
  color: #fff;
}
.thb-btn {
  color: #000;
  &:hover {
    text-decoration: none;
  }
}
.analytics_page .card-single-row-outer {
  height: auto;
}
html body main .card.search-slabs-out .my-card-listing .my-card {
  width: 16.66%;
}
.share-lk-top {
  cursor: pointer;
  span {
    margin-right: 5px;
    img {
      width: 20px;
      margin-top: -5px;
      margin-left: 10px;
    }
  }
}
.share-lk-top span {
  font-family: 'Nexabold', Helvetica, Arial, sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #edecec;
  margin: 0;
  line-height: 25px;
  display: inline-block;
}
.share-all-outer {
  left: 32px;
  top: 25px;
}
.sb-data-values-out {
  .share-icon {
    margin-left: 0 !important;
    margin-top: -5px !important;
    font-size: 11px !important;
    font-style: normal !important;
  }
  .si-white {
    color: #fff;
  }
}
</style>