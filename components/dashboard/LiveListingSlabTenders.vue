<template>
  <div class="row">
    <div class="col-12 t-p-5">
      <div class="card card-single-row-outer">
        <div class="card-body">
          <h5 class="card-title custom-smart-search-player-name">
            <button class="card-btn theme-btn">{{ card }}</button>
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
              
            <!-- <div
              class="trender-cards-footer"
              v-if="data.length >= 0 && !requestInProcess && showFilters"
            >
              <ul class="trender-cards-footer-month-filter">
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 1 && data.length > 0) ? 'active' : '', (filterVal == 1 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(1)"
                >
                  1D
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 2 && data.length > 0) ? 'active' : '', (filterVal == 2 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(2)"
                >
                  1W
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 3 && data.length > 0) ? 'active' : '', (filterVal == 3 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(3)"
                >
                  1M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 4 && data.length > 0) ? 'active' : '', (filterVal == 4 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(4)"
                >
                  3M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 5 && data.length > 0) ? 'active' : '', (filterVal == 5 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(5)"
                >
                  6M
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 6 && data.length > 0) ? 'active' : '', (filterVal == 6 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(6)"
                >
                  1Y
                </li>
                <li
                  class="trender-cards-footer-month-filter-item"
                  :class="[(filterVal == 7 && data.length > 0) ? 'active' : '', (filterVal == 7 && data.length == 0) ? 'nodata' : '' ]"
                  @click="changeFilter(7)"
                >
                  5Y
                </li>
              </ul>
            </div> -->
            <div class="ll-head-right float-right">
                <div class="custom-dropdown">
                    <button class="dropbtn">Filter By</button>
                    <div class="dropdown-content">
                      <a href="javascript:;" @click="filterBy('price')"
                        >$ Price</a
                      >
                      <a href="javascript:;" @click="filterBy('percent')"
                        >% Percent</a
                      >
                    </div>
                 </div>
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
      smartKeyword: []
    }
  },
  async mounted() {
    this.search()
  },
  methods: {
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
            search: this.keyword
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
ul.my-card-listing {
  list-style: none;
  padding: 0px;
  display: inline-block;
}
.no-result-found {
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
}
.trender-cards-footer {
  display: inline-block;
      margin-left: 5px;
      width: calc(100% - 435px);
    text-align: center;
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