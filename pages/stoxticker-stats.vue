<template>
  <div class="col-md-12 col-sm-12 analytics_page p-0">
    <div class="row ">
      <div class="col-md-9 col-sm-9 pr-0">
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
                <div class="col-md-3">
                  <h2>SX</h2>
                </div>
                <div class="col-md-2">
                  <h3>10k@</h3>
                  <span class="tot-sla">TOTAL SLABS</span>
                </div>
                <div class="col-md-3">
                  <h2>134.00</h2>
                  <span class="avg-sla">AVG. SLAB SALE</span>
                </div>
                <div class="col-md-3">
                  <div class="up_img">
                    <font-awesome-icon :icon="['fas', 'caret-up']" />
                  </div>
                  <h2>13.40</h2>
                  <span class="cha-amo">CHANGE AMOUNT</span>
                </div>
              </div>

              <span class="date"
                >LAST UPDATED MAY 13 2020 - 07:57:39 AM CST</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/dashboard/CardListItem'
export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Stoxticker - Slabstox'
    }
  },
  mounted() {},
  components: {
    CardListItem,
    VueApexCharts: () => import('vue-apexcharts')
  },
  data() {
    return {
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
header.guestHeader,
header.guestFooter {
  display: none;
}
</style>