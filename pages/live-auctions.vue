<template>
  <div class="col-md-12 col-sm-12 search-page live-auctions-page">
    <div class="navbar">
      <ul>
        <li
          v-for="sport in cards"
          :key="sport"
          class="sports-navbars btn theme-green-btn"
          :data-title="sport.replace(' ', '-') + '-outor-div'"
        >
          {{ sport }}
        </li>
      </ul>
    </div>

    <EndingSoonListing />

    <LiveListingCard v-for="(card, key) in cards" :key="key" :card="card" />

    <RecentListing />
  </div>
</template>
<script>
import $ from 'jquery'
import CardListItem from '~/components/dashboard/CardListItem'
import LiveListingCard from '~/components/dashboard/LiveListingCard'
import EndingSoonListing from '~/components/dashboard/EndingSoonListing'
import RecentListing from '~/components/dashboard/RecentListing'
import { mapGetters } from 'vuex'
import { FILTERS } from '../constants/advance_search_filter'
export default {
  transition: 'fade',
  layout: 'guestOuter',
  head() {
    return {
      title: 'Live Listings - SlabStox',
    }
  },
  mounted() {
    this.getEndingSoonListing()
  },
   updated() {
   $('.sports-navbars').click(function () {
      var link = '#'
      link += $(this).attr('data-title')
      $('html, body').animate(
        {
          scrollTop: $(link).offset().top,
        },
        2000
      )
    })
  },
  components: {
    CardListItem,
    LiveListingCard,
    EndingSoonListing,
    RecentListing,
  },
  data() {
    return {
      page: 1,
      requestInProcess: false,
      filters: { ...FILTERS },
      noMoreData: false,
      cards: [],
    }
  },
  computed: {
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes',
    }),
  },
  methods: {
    getEndingSoonListing() {
      //getting order only by this API
      try {
        this.$axios
          .$post('search/ending-soon-listing', {
            take: 1,
            filterBy: 'ending_soon',
          })
          .then((res) => {
            if (res.status == 200) {
              this.cards = [...res.order, ...['random bin']]
            }
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script> 

<style lang="scss" scoped>
.live-auctions-page {
  padding-right: 25px !important;
  padding-left: 25px !important;
}
.t-p-5 {
  padding: 5px;
}
.search-page {
  .dataloader {
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .slab-result-search {
    margin-top: -15px;
    .no-padding {
      padding: 0px;
      .transparent-bg {
        background: transparent;
        border: none;
        .card-body {
          padding-bottom: 0px;
        }
        .slab-result-title {
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          margin-left: -5px;
        }
        .slab-result-card {
          display: inline-block;
          width: 200px;
          padding: 0px 8px;
          margin-bottom: 30px;
          text-transform: uppercase;
          .slab-result-card-title {
            font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial,
              sans-serif;
            color: $theme-off-white;
            text-decoration: underline;
            font-size: 12px;
            letter-spacing: 1px;
          }
          .my-card-current-bid-btn {
            width: 100%;
            padding-top: 7px;
            padding-bottom: 5px;
            margin-bottom: 5px;
          }
          .slab-result-slab-result-card-image-container {
            background: $theme-off-white;
            position: relative;
            padding: 5px;
            margin-bottom: 15px;
            .slab-result-card-icons-container {
              position: relative;
              padding: 10px;
              .icons {
                width: 32px;
                height: 32px;
                float: right;
                margin-top: -10px;
              }
            }
            .slab-result-card-image {
              width: 100%;
              height: 200px;
              margin-top: -31px;
            }
          }
          .slab-result-card-view-card-data {
            font-family: 'NanoBold', Helvetica, Arial, sans-serif;
            width: 100%;
            border-radius: 2px;
            background: $theme-off-white;
            padding: 7px;
            color: #000000;
            font-size: 13px;
            width: 100%;
            display: block;
            text-align: center;
            font-weight: bolder;
          }
        }
      }
    }
  }
  ul.my-card-listing {
    list-style: none;
    padding: 0px;
  }
  .no-result-found {
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
  }
}
.card-btn.ending-title {
  background: #f95050;
}

.navbar ul {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: inline-block;
  margin: 10px 5px;
  padding: 6px 12px 4px 12px;
}
.games {
  text-align: center;
  color: #fff;
}
.games p {
  font-size: 20px;
  line-height: 40px;
  padding: 50px 10px;
}

@media (max-width: 1100px) {
  .navbar ul li {
    padding: 6px 10px 4px 10px;
    font-size: 10px;
    letter-spacing: 2px;
  }
  .navbar {
    padding: 0px;
  }
}
@media (max-width: 1023px) {
  .navbar ul li {
    padding: 6px 6px 4px 6px;
    font-size: 8px;
    letter-spacing: 1px;
  }
}
@media (max-width: 767px) {
  .navbar ul li {
    padding: 6px 7px 4px 7px;
    font-size: 10px;
  }
}
</style>