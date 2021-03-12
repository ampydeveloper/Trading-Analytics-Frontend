<template>
  <div class="row">
    <div class="col-12 t-p-5">
      <div class="card card-single-row-outer">
        <div class="card-body">
          <h5 class="card-title custom-smart-search-player-name">
            <button class="card-btn theme-btn">{{ (card != 'pokemon'?card:'Pokémon') }}</button>
            <div class="internal-search-container">
              <input
                v-model="keyword"
                v-on:keyup.enter="search()"
                v-on:keyup="getSmartKeyword()"
                class="card-title-search-field"
                type="text"
                placeholder="search"
              />
              <div class="display_keyword" v-if="showSmartSearch">
                <ul v-click-outside="hideSmartSearch">
                  <li
                    v-for="(item, key) of smartKeyword"
                    :key="key"
                    @click="selectKeyword(item.player)"
                  >
                    {{ item.player }}
                  </li>
                  <li v-if="smartKeyword.length == 0">
                    No results found for this search
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="trender-cards-footer">
                <button :class="(orderByPrice == 'up'? 'theme-btn':'theme-green-btn') + ' card-btn t-p-5'" @click="filterOrderBy('price'+orderByPrice)">
                    <font-awesome-icon v-if='orderByPrice !== undefined' :icon="['fas', 'long-arrow-alt-'+orderByPrice]" />&nbsp;&nbsp;$ Price
                </button>
                
                <button :class="(orderByPercent == 'up'? 'theme-btn':'theme-green-btn') + ' card-btn t-p-5'" @click="filterOrderBy('percent'+orderByPercent)">
                    <font-awesome-icon v-if='orderByPercent !== undefined' :icon="['fas', 'long-arrow-alt-'+orderByPercent]" />&nbsp;&nbsp;Percent %
                </button>
            </div>
            
            <div class="ll-head-right float-right">
                <nuxt-link
                  class="card-link"
                  :to="'/top-trenders?sport=' + card"
                >
                  View Top 100
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </nuxt-link>
            </div>
          </h5>
          <div class="dataloader" v-if="requestInProcess">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <ul class="my-card-listing">
            <CardSlabItem
              v-for="item in data"
              :key="item.id"
              :itemdata="item"
            />
          </ul>

          <div
            class="empty-result"
            v-if="data.length == 0 && !requestInProcess"
          >
            <p>There are no cards here. Check again soon.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import vClickOutside from 'v-click-outside'
export default {
  directives: {
      clickOutside: vClickOutside.directive
  },
  props: {
    card: {
      type: String
    },
    showFilters: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CardSlabItem
  },
  data() {
    return {
      data: [],
      keyword: null,
      filterByKeword: null,
      requestInProcess: false,
      filterVal: 1,
      showSmartSearch: false,
      smartKeyword: [],
      orderByPrice: 'up',
      orderByPercent: 'up',
      orderBy: null
    }
  },
  async mounted() {
    this.search()
  },
  methods: {
    filterOrderBy(orderType) {
        if(orderType == 'priceup') { this.orderByPrice = 'down'; }else { this.orderByPrice = 'up'; }
        if(orderType == 'percentup') { this.orderByPercent = 'down'; }else { this.orderByPercent = 'up'; }
        this.orderBy = orderType
        this.search()
    },
    filterBy(data) {
      this.filterByKeword = data
      this.search()
    },
    hideSmartSearch(event){
      this.showSmartSearch = false;
    },
    search() {
      try {
        this.data = []
        this.requestInProcess = true
        this.$axios
          .$post('search/slab-listing', {
            take: 6,
            sport: this.card,
            search: this.keyword,
            orderby: this.orderBy            
          })
          .then(res => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.data = res.data
            }
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    getSmartKeyword() {
      try {
        //this.requestInProcess = true
        this.$axios
          .$post('search/get-smart-keyword-onlyname', {
            keyword: this.keyword,
            sport: this.card
          })
          .then(res => {
            //this.requestInProcess = false
            if (res.status == 200) {
              if(this.keyword == res.keyword){
                this.smartKeyword = res.data
                this.showSmartSearch = true
              }
            }
          })
          .catch(err => {
            //this.requestInProcess = false
            console.log(err)
          })
      } catch (err) {
        //this.requestInProcess = false
        console.log(err)
      }
      console.log(this.keyword)
    },
    selectKeyword(value, cardId) {
      this.keyword = value
      this.showSmartSearch = false
      this.search()
    },
    changeFilter(val) {
      this.filterVal = val
      this.search()
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
  // display: inline-block;
  // width: 100%;
}
.no-result-found {
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
}
.trender-cards-footer {
  display: inline-block;
      margin-left: 5px;
      width: calc(100% - 453px);
    text-align: left;
    padding-left: 15px;
  .trender-cards-footer-month-filter {
    list-style: none;
    background: $theme-off-white;
    color: #000000;
    // width: 270px;
    padding: 3px 7px 6px 7px;
    margin: 0px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    border-radius: 4px;
    text-align: center;
        display: inline-block;

    .trender-cards-footer-month-filter-item {
      display: inline;
      padding: 4px 6px 3px 6px;
      border-radius: 2px;
      letter-spacing: 1px;
      font-size: 11px;
      margin: 0 3px;
      cursor: pointer;

      &.active {
        background: $theme-btn-green;
      }
    }
  }
}

.custom-smart-search-player-name {
  .internal-search-container{
    width: 200px;
    display: inline-grid;
    position: relative;
    padding-left: 20px;
    .card-title-search-field {
        margin-left: 0px;
        width: 100%;
    }
    .display_keyword {
      position: absolute;
      background: #fff;
      width: 100%;
      margin: 14px 40px;
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
}
</style>