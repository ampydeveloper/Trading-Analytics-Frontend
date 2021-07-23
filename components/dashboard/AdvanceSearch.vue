<template>
  <div class="col-md-12 col-sm-12" v-if="showAdvanceSearch">
    <div class="row">
      <div class="col-12 t-p-5 advance-search-wrapper">
        <div class="card advance-search">
          <h5 class="card-title">advanced Search</h5>
          <div class="card-body">
            <div class="row as-back">
              <div class="col-md-4 col-sm-4">
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Sport</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.sports" placeholder="Search" :options="attributes.sport"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Year</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.year" placeholder="Search" :options="attributes.year"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Player</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <input
                      type="text"
                      class="form-control-plaintext"
                      :value="filters.player"
                      @blur="update_index($event, 'player')"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Team</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.team" placeholder="Search" :options="attributes.team"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Rookie</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <div class="pretty p-default">
                      <input
                        type="checkbox"
                        :value="filters.rookie == 1 ? 0 : 1"
                        :checked="filters.rookie == 1 ? true : false"
                        @change="update_index($event, 'rookie')"
                      />
                      <div class="state">
                        <label></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Season</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.season" placeholder="Search" :options="attributes.season"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Number</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <input
                      type="number"
                      class="form-control-plaintext"
                      :value="filters.number"
                      @blur="update_index($event, 'number')"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Card</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.card" placeholder="Search" :options="attributes.cardmanufacturer"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Type</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.type" placeholder="Search" :options="attributes.product"></v-select>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Series</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.series" placeholder="Search" :options="attributes.series"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Grade</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.grade" placeholder="Search" :options="attributes.grade"></v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Price</label
                  >
                  <div class="col-md-9 col-sm-9 dollar-label">
                    <span class="dollar-icon">$</span>
                    <input
                      type="text"
                      value=""
                      class="form-control-plaintext"
                      @blur="update_index($event, 'price')"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="staticEmail"
                    class="col-md-2 col-sm-2 col-form-label"
                    >Listing</label
                  >
                  <div class="col-md-9 col-sm-9">
                    <v-select v-model="filters.listing" placeholder="Search" :options="[{'label': 'Buy it now', 'code' : 'buy_it_now'}, 'Auction']"></v-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12 text-center">
                <button @click="update_search()" class="update-search-result">
                  Search Slabstox
                  <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FILTERS } from '../../constants/advance_search_filter'
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'

export default {
  data() {
    return {
      filters: { ...FILTERS }
    }
  },
  components: {
    vSelect
  },
  computed: {
    ...mapGetters({
      showAdvanceSearch: 'advancesearch/show',
      filters_old_state: 'advancesearch/filters',
      attributes: 'advancesearch/attributes'
    })
  },
  methods: {
    update_search() {
      this.$store.dispatch('advancesearch/update_filters', this.filters)
      this.$router.push('/search')
    },
    update_index(e, index) {
      this.filters[index] = e.target.value
    }
  },
  mounted() {
    //this.filters = {...this.filters_old_state};
  }
}
</script>

<style lang="scss" scoped>
.advance_wrap {
  padding-left: 6px;
  padding-right: 6px;
}
.advance-search {
  background: #ffffff !important;
  border-bottom-left-radius: 0px;
  padding: 20px;
  .card-title {
    text-transform: uppercase;
    color: #cdcbcb;
    font-size: 11px;
    letter-spacing: 2px;
    padding: 0px;
    .close_search {
      float: right;
      color: #000;
      font-weight: bold;
      letter-spacing: 1px;
      cursor: pointer;
      padding-left: 20px;
      position: relative;
      &:before {
        content: '\f106';
        position: absolute;
        font-family: FontAwesome;
        top: -5px;
        font-size: 19px;
        right: auto;
        left: 0;
        font-weight: 900;
      }
    }
  }
  .col-form-label {
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 2px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .form-control-plaintext {
    background-color: #f4f4f4;
    height: 30px;
    border-radius: 2px;
    padding: 0px 10px;
    font-family: 'NexaBold', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #000;
      opacity: 1;
    }
  }
  .select_wrap {
    position: relative;
    &:before {
      content: '\f107';
      position: absolute;
      font-family: FontAwesome;
      top: 3px;
      right: 17px;
      left: auto;
      font-weight: 900;
    }

    .form-control-select {
      background-color: #f4f4f4;
      height: 30px;
      width: 100%;
      border: none;
      border-radius: 2px;
      padding: 0px 10px;
      font-family: 'NexaBold', Helvetica, Arial, sans-serif;
      font-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &:focus {
        outline: none;
      }
    }
  }
  .update-search-result {
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    font-family: 'CocogoosePro-Italic', Helvetica, Arial, sans-serif;
    border-radius: 2px;
    background: -webkit-linear-gradient(
      right,
      $theme-dark-green 0%,
      $theme-mild-green 33%,
      $theme-light-green 100%
    );
    background: linear-gradient(
      to left,
      $theme-dark-green 0%,
      $theme-mild-green 33%,
      $theme-light-green 100%
    );
    padding: 7px 35px;
    color: #000000;
    font-size: 13px;
    &:focus {
      border: none;
      outline: none;
    }
  }
}
.dollar-label {
  position: relative;
  .dollar-icon {
    position: absolute;
    top: 3.5px;
    left: 25px;
  }
  input {
    padding-left: 25px !important;
  }
}
</style>