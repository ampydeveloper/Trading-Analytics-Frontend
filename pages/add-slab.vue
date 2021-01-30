<template>
  <div class="col-md-12 col-sm-12 add-slab">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card">
          <div class="card-body">
            <h3>Slab Title</h3>
            <span>Use word people</span>
            <input type="text" v-model="slab.title" />
            <div>
              <span class="strong-indicator"></span>
              <span>Good length. Don't stop here</span>
            </div>
            <hr />
            <h3>Slab Details</h3>
            <div class="slab-details-container">
              <div class="row">
                <div class="col-md-12">
                  <h4>Required</h4>
                  <h5>Buyers need these details to find your item</h5>
                  <label for>Condition</label>
                  <select v-model="slab.condition">
                    <option value="Like New">Like New</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h4>Recommended</h4>
                  <h5>Buyers frequently search for these details</h5>
                  <div>
                    <div class="icon">Icon here</div>
                    <span>Add as many details as you can</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for>
                    Card Manufacturer
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.card_manufacturer">
                    <option value="Toops">Toops</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Player
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.player">
                    <option value="Derek jeter">Derek jeter</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Card Attribute
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.card_attribute">
                    <option value="Rookie">Rookie</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Grade
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.grade">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Product
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.product">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Professional Grade
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.professional_grade">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Team
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.team">
                    <option value="Toops">Toops</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Original/Reprint
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.original_reprint">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Sport
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.sport">
                    <option value="Toops">Toops</option>
                  </select>
                </div>
                <div class="col-md-6"></div>
              </div>
              <div class="row">
                <hr />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h4>Additional</h4>
                  <h5>Buyer aslo search for these details</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for>
                    Season
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.season">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Year
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.year">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Series
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.series">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Era
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.era">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    League
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.league">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Autograph
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.autograph">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Certification No
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.certification_no">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Convention/Event
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.convention_event">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Card Thickness
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.card_thickness">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Card Number
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.card_number">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    California Prop 65 Warning
                    <span>13.4M searches</span>
                  </label>
                  <textarea v-model="slab.california_prop_warning"></textarea>
                </div>
                <div class="col-md-6">
                  <label for>
                    Country/Origin of Manufacture
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.year">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    Theme
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.theme">
                    <option value="1">--</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for>
                    UPC
                    <span>13.4M searches</span>
                  </label>
                  <select v-model="slab.upc">
                    <option value="1">--</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <hr>
              </div>
              
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h3>Slab Pricing</h3>
            <span>Recommendation applied</span>
            <div class="row">
              <div class="col-md-12">
                <h4>Auction</h4>
                <h5>Set a starting amount and let buyer complete for your item    <b-form-checkbox switch size="lg"></b-form-checkbox></h5>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-8">
                        <span>Starting bid</span>
                        <span>To attract buyer and increase competition for your item, consider a low starting bid</span>
                      </div>
                      <div class="col-md-4">
                        <span>$</span>
                        <input v-model="slab.price">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-8">
                        <span>Average starting bid: $19.50</span>
                        <a href="#">See how other sellers priced it</a>
                      </div>
                      <div class="col-md-4">
                        <span>icon</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <input type="checkbox"> Easy Pricing
                    <span>We'll lower your starting bid 5% each time your items is auto-relisted until it sells or gets to $11.70 - notifying buyers who showed interset</span>
                  </div>
                </div>
                <div class="row">
                  <hr>
                </div>
              </div>
              <div class="col-md-12">
                <h4>Buy it now</h4>
                <h5>Buyers can purcahse immediately at this place <b-form-checkbox switch size="lg"></b-form-checkbox></h5>
              </div>
            </div>
          </div>
        </div>
        <p>By Selecting list it. you agree to accept the <nuxt-link to="/">Slabstox User Agreement and Payment Terms of Use</nuxt-link>. acknowledge reading the <nuxt-link to="/">User Privacy Notice</nuxt-link> and assume full responsibilty for the item offered and the content of your listing</p>
        <div>
          <button @click="addToSlab()">Listing the slab</button>
          <button>Preview slab</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
// import vueDropzone from "vue2-dropzone";

export default {
  transition: 'fade',
  layout: 'dashboard',
  head() {
    return {
      title: 'Add Slab - Slabstox'
    }
  },
  mounted() {},
  components: {
    // vueDropzone
  },
  data() {
    return {
      slab: {
        title: null,
        condition: null,
        card_manufacturer: null,
        player: null,
        card_attribute: null,
        grade: null,
        product: null,
        professional_grade: null,
        team: null,
        original_reprint: null,
        sport: null,
        season: null,
        year: null,
        series: null,
        era: null,
        league: null,
        autograph: null,
        certification_no: null,
        convention_event: null,
        card_thickness: null,
        card_number: null,
        california_prop_warning: null,
        country_origin_of_manufacture: null,
        theme: null,
        upc: null,
        description: null,
        price: null,
        auction: null,
        buy_it_now: null,
      },
      requestInProcess: false,
    }
  },
  methods: {
    addToSlab() {
      if(!this.requestInProcess){
        try {
          this.requestInProcess = true
           this.$axios
            .$post('slab/add', this.slab)
            .then(res => {

            }).catch(err => {
               this.requestInProcess = false
            });
        } catch (error) {
          this.requestInProcess = false
          console.log(err)
        }
      }
    }
  }
}
</script>

<style>
</style>