<template>
  <div class="col-md-12 col-sm-12 analytics_page">
    <div class="row ">
        <div class="col-md-11 col-sm-11 pr-0 inner_wrap">
            <div class="col-md-12 col-sm-12 pl-0">
        <div class="card green_box stoxticker_page">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">STOXTICKER</button>
               <nuxt-link class="card-link float-right" to="/">
                      SLABSTOX.COM 
              </nuxt-link>
            </h5>
              <div class="row">
                  <div class="col-md-2 bs-stats">
                      <h2>SX</h2>
                  </div>
                  <div class="col-md-2 bs-stats">
                      <h3>{{intToString(data.total)}}@</h3>
                      <span class="tot-sla">TOTAL SLABS</span>
                  </div>
                   <div class="col-md-5 bs-stats">
                      <h2>{{data.sale.toFixed(2)}}</h2>
                      <span class="avg-sla">AVG. SLAB SALE</span>
                  </div>
                  <div class="col-md-3 bs-stats">
                       <div class="up_img">
                        <font-awesome-icon :icon="['fas', 'caret-'+data.change_arrow]" />
                        </div>
                      <h2>{{data.change}}</h2>
                      <span class="cha-amo">CHANGE AMOUNT</span>
                  </div>
              </div>
            
              <span class="date">LAST UPDATED - {{data.last_updated}}</span>
          </div>
        </div>
        <div class="social_share">
             <h5>SHARE ON SOCIAL</h5>
             <ul>
                <li><a href="javascript:;" @click="shareFb()"><img src="~/assets/img/icons/facebook.svg" alt /></a></li>
                <!-- <li><a href="#"><img src="~/assets/img/icons/instagram.svg" alt /></a></li> -->
                <li><a :href="'https://twitter.com/intent/tweet?url='+encodeURI(baseUrl)+'&text=StoxTicker@'+data.sale.toFixed(2)" target="_blank"><img src="~/assets/img/icons/twitter.svg" alt /></a></li>
                <li><a :href="'http://pinterest.com/pin/create/button/?url='+encodeURI(baseUrl)+'&media='+logo+'&description='+encodeURI('Buy & Sell Sports Cards Online')" target="_blank"><img src="~/assets/img/pinterest.png" alt /></a></li>
                <li><a :href="'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURI(baseUrl)" target="_blank"><img src="~/assets/img/icons/linkedin-circled.svg" alt /></a></li>
             </ul>
             <h4> <a class="embed-link" href="javascript:;" @click="embedStatsCode()">EMBEDD CODE </></a> </h4>
          </div>
      </div> 

      <b-modal id="embedStatsCode" title="" size="xl" hide-footer>
        <h5>Copy code and paste to your website.</h5>
        <p class="code-text">
          <textarea cols="3" rows="10">
            <iframe src="https://staging.slabstox.com/stoxticker-stats" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea>
        </p>
      </b-modal>

      <div class="col-md-12 col-sm-12 pl-0 beta-ver-hide">
        <div class="card stoxticker_page stoxticker_listing">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">SX STOXTICKER</button>
              <nuxt-link class="card-link float-right" to="/">
                SLABSTOX.COM 
              </nuxt-link>
            </h5>
              <ul>
                <li>
                  <h3 class="h3-title">BASKETBALL</h3>
                  <marquee direction="left">
                  <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4><h5>LEBRON JAMES 2003...</h5>
                  </marquee>
                  </li>
                   <li>
                  <h3 class="h3-title">FOOTBALL</h3>
                  <marquee direction="left">
                  <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4><h5>LEBRON JAMES 2003...</h5>
                  </marquee>
                  </li>
                   <li>
                  <h3 class="h3-title">BASEBALL</h3>
                  <marquee direction="left">
                  <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4><h5>LEBRON JAMES 2003...</h5>
                  </marquee>
                  </li>
                   <li>
                  <h3 class="h3-title">SOCCER</h3>
                  <marquee direction="left">
                  <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4><h5>LEBRON JAMES 2003...</h5>
                  </marquee>
                  </li>
                   <li>
                  <h3 class="h3-title">HOCKEY</h3>
                  <marquee direction="left">
                  <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4><h5>LEBRON JAMES 2003...</h5>
                  </marquee>
                  </li>
              
              </ul>
              <span class="date">LAST UPDATED MAY 13 2020 - 07:57:39 AM CST</span>
          </div>
        </div>
        <div class="social_share">
             <h5>SHARE ON SOCIAL</h5>
             <ul>
                <li><a href="javascript:;" @click="shareFb()"><img src="~/assets/img/icons/facebook.svg" alt /></a></li>
                <!-- <li><a href="#"><img src="~/assets/img/icons/instagram.svg" alt /></a></li> -->
                <li><a :href="'https://twitter.com/intent/tweet?url='+encodeURI(baseUrl)+'&text=StoxTicker@'+data.sale.toFixed(2)" target="_blank"><img src="~/assets/img/icons/twitter.svg" alt /></a></li>
                <li><a :href="'http://pinterest.com/pin/create/button/?url='+encodeURI(baseUrl)+'&media='+logo+'&description='+encodeURI('Buy & Sell Sports Cards Online')" target="_blank"><img src="~/assets/img/pinterest.png" alt /></a></li>
                <li><a :href="'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURI(baseUrl)" target="_blank"><img src="~/assets/img/icons/linkedin-circled.svg" alt /></a></li>
             </ul>
             <h4> <a class="embed-link" href="#" @click="embedSellsCode()">EMBEDD CODE </></a> </h4>
          </div>
      </div> 
      <b-modal id="embedSellsCode" title="" size="xl" hide-footer>
        <h5>Copy code and paste to your website.</h5>
        <p class="code-text">
          <textarea cols="3" rows="10">
            <iframe src="https://staging.slabstox.com/stoxticker-sells" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea>
        </p>
      </b-modal>

        </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../constants/keys'
import CardListItem from '~/components/dashboard/CardListItem'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Stoxticker - Slabstox'
    }
  },
  mounted() {
    this.getData()
    this.logo = document.getElementById('sidebarLogo').src
  },
  components: {
    CardListItem,
    VueApexCharts: () => import('vue-apexcharts')
  },
  data() {
    return {
      logo: null,
      baseUrl: BASE_URL,
      data: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: ''
      },
      sampleMyList: {
        category: 'Basketball Cards',
        galleryURL:
          'https://thumbs2.ebaystatic.com/m/mRwha6cB-2q2Fjdol6S5wNQ/140.jpg',
        id: 43,
        itemId: '363020170125',
        price: '720.0',
        title: '2018-19 Luka Doncic Panini Prizm RC Rookie #280 Silver Prizm'
      },
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area',
          background: 'transparent'
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        yaxis: {},
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      }
    }
  },
  methods: {
    getData() {
      try {
        this.$axios.$get('get-stoxticker-data').then(res => {
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
    shareFb() {
      FB.ui({
        method: 'feed',
        name: 'StoxTicker@' + this.data.sale.toFixed(2),
        link: this.baseUrl,
        picture: this.logo,
        description: 'Check our StoxTicker value'
      })
    },
    embedStatsCode() {
      this.$bvModal.show('embedStatsCode')
    },
    embedSellsCode() {
      this.$bvModal.show('embedSellsCode')
    },
    intToString (value) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor((""+value).length/3);
        var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue+suffixes[suffixNum];
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
.dashboard-graph {
  .dashboard-graph-footer {
    position: relative;
    font-size: 12px;
    .dashboard-graph-footer-month-filter {
      position: relative;
      list-style: none;
      background: $theme-off-white;
      color: #000000;
      width: 270px;
      padding: 10px 7px 8px 7px;
      margin: 0px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      border-radius: 4px;
      text-align: center;

      .dashboard-graph-footer-month-filter-item {
        display: inline;
        padding: 8px 8px 4px 8px;
        border-radius: 2px;
        letter-spacing: 1px;
        &.active {
          background: $theme-btn-green;
        }
      }
    }
    .dashboard-graph-footer-update-at {
      color: #c5c3c3;
      text-transform: uppercase;
      position: relative;
      margin-top: -26px;
      letter-spacing: 1px;
    }
  }
}
.dashboard-apex-top {
  margin-left: -17px;
  margin-bottom: -8px;
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
</style>
