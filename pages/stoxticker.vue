<template>
  <div class="col-md-12 col-sm-12 stoxticker-page-exactout">
    <div class="row analytics_page" v-if="user != null && user.full_name != null">
      <div class="col-md-12">
        <div class="top-btn">
          <button class="card-btn custom-stox">
            <font-awesome-icon :icon="['fas', 'plus']" />
            create custom stoxticker
          </button>
          <span class="tooltip-text set-tooltip mr-xl-2" v-b-tooltip.bottomleft  title="Click here to create your own custom StoxTicker by adding any Slabs you want to the SlabStoxPro database.">?</span>

            <button class="card-btn search-stox" >
              Search stoxticker board
              <span class="chevron-right">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
              <span class="chevron-down">
              <font-awesome-icon :icon="['fas', 'chevron-down']" />
              </span>
            </button>
            <span class="tooltip-text set-tooltip mx-xl-2" v-b-tooltip.bottomleft title="Click here to search other SlabStoxPro users’ StoxTicker boards to see who they’re tracking.">?</span>

            <nuxt-link to="/featured-boards" >
            <button class="card-btn featured-boards" >
                Featured boards
                <span class="chevron-right">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </span>
            </button>
            </nuxt-link>
            <span class="tooltip-text set-tooltip mx-xl-2" v-b-tooltip.bottomleft title="Click here to fetch featured boards">?</span>
     
        <nuxt-link to="/personal-boards" >
            <button class="card-btn featured-boards" >
                Personal boards
                <span class="chevron-right">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </span>
            </button>
            </nuxt-link>
            <span class="tooltip-text set-tooltip mx-xl-2" v-b-tooltip.bottomleft title="Click here to fetch personal boards">?</span>
        
        </div>
      </div>
    </div>

    <div class="row analytics_page">
      <div class="col-md-12 mb-3">
        <div class="search-stox-box">
          <div class="inner-wrap">
            <div class="search-field">
              <div class="row">
                <div class="col-md-10">
                  <div class="search-bar">
                    <input
                      type="text"
                      placeholder="STOXTICKER BOARD SEARCH"
                      v-model="searchKeyword"
                      @keyup.enter="searchBoard()"
                    />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="close-btn">
                    <span>
                      <font-awesome-icon :icon="['fas', 'chevron-up']" />
                      Close</span
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="select-cat">
                    <h6>SELECT CATEGORIES</h6>
                  </div>
                </div>
                <div class="cat-wrap">
                  <div class="cat-btn"> 
                    <ul>
                      <li v-for="sport in attributes.sport" :key="sport">
                        <a href="#" class="theme-btn card-btn" :data-sport="sport">{{sport}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="search-wrap">
                  <div class="search">
                    <button
                      class="card-btn custom-stox-search"
                      @click="searchBoard()"
                      
                    >
                      search stoxticker board
                      <font-awesome-icon
                        :icon="['fas', 'chevron-circle-right']"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="search-add-box">
          <div class="inner-wrap">
            <div class="search-field">
              <div class="row">
                <div class="col-md-10">
                  <div class="search-bar">
                    <input
                      type="text"
                      placeholder="SEARCH SLABS"
                      v-model="keyword"
                      @keyup.enter="getSmartKeyword()"
                    />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="close-btn">
                    <span>
                      <font-awesome-icon :icon="['fas', 'chevron-up']" />
                      Close</span
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="search-wrap col-sm-12">
                  <div class="search">
                    <button
                      class="card-btn custom-stox-search"
                      @click="getSmartKeyword()"
                    >
                      search
                      <font-awesome-icon
                        :icon="['fas', 'chevron-circle-right']"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div class="dataloader search-board-dataloader" v-if="requestInProcess">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>

      </div>
    </div>

    <div class="row dashboard-graph-row">
      <div class="col-md-12 col-sm-12">
        <div class="card">
          <div
            class="card-body dashboard-graph sx-stats-all"
            id="dashboard-graph-outer"
            ref="shareImage"
          >
          
            <h5 class="card-title">
             <button class="theme-btn card-btn dashboard-apex-top-alld">
                Slabstox ${{ stoxtickerData.total ? stoxtickerData.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' }}
              </button>
              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;
                <span class="g-dollar-d-val"> ${{ stoxtickerData.doller_diff ? stoxtickerData.doller_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):'' }}</span>
              </button>
              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-alld'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;{{ stoxtickerData.perc_diff ? stoxtickerData.perc_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):'' }}%
              </button>

               <button class="theme-btn card-btn dashboard-apex-top-1d" style="display: none">
                Slabstox ${{ stoxtickerData1d.total }}
              </button>
              <button
                :class="
                  (stoxtickerData1d.change_arrow &&
                  stoxtickerData1d.change_arrow == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-1d'
                " style="display: none"
              >
                <font-awesome-icon
                  v-if="stoxtickerData1d.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData1d.change_arrow,
                  ]"
                />&nbsp;
                <span class="g-dollar-d-val"> ${{ stoxtickerData1d.doller_diff }}</span>
              </button>
              <button
                :class="
                  (stoxtickerData1d.change_arrow &&
                  stoxtickerData1d.change_arrow == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn dashboard-apex-top-1d'
                " style="display: none"
              >
                <font-awesome-icon
                  v-if="stoxtickerData1d.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData1d.change_arrow,
                  ]"
                />&nbsp;{{ stoxtickerData1d.perc_diff }}%
              </button>
             
             <span class="float-right share-lk-top">
                <span class="share-icon">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
                </span>
                <div class="share-all-outer">
                  <ul>
                    <li>
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u='+encodeURI(currentUrl)"  target="_blank"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(currentUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.total?stoxtickerData.total:'') +
                         ' ' +encodeURI(this.sxGraphImage)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(currentUrl) +
                          '&media=' +
                          encodeURI(this.sxGraphImage) +
                          '&description=' +
                          encodeURI('Check Our Stoxticker')
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://www.linkedin.com/sharing/share-offsite/?url=' +
                          encodeURI(currentUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
             
              </span> 
            </h5>
            <div class="dashboard-apex-top" ref="dashboardApexChart">
               <div class="dashboard-apex-top-1d" style="display: none">
               <VueApexCharts
                ref="sxDashChart1d"
                type="area"
                height="350"
                :options="sxChartOptions1d"
                :series="sxSeries1d"
              ></VueApexCharts>
                 </div>
                  <div class="dashboard-apex-top-alld">
              <VueApexCharts
                ref="sxDashChart"
                type="area"
                height="350"
                :options="sxChartOptions"
                :series="sxSeries"
              ></VueApexCharts>
                 </div>
            </div>
            <div class="dashboard-graph-footer">
              <ul class="dashboard-graph-footer-month-filter">
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 2 ? 'active' : '')
                  "
                  @click="slabstoxGraph1d(2, 1)"
                >
                  1D
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 7 ? 'active' : '')
                  "
                  @click="slabstoxGraph(7)"
                >
                  1W
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 30 ? 'active' : '')
                  "
                  @click="slabstoxGraph(30)"
                >
                  1M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 90 ? 'active' : '')
                  "
                  @click="slabstoxGraph(90)"
                >
                  3M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 180 ? 'active' : '')
                  "
                  @click="slabstoxGraph(180)"
                >
                  6M
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 365 ? 'active' : '')
                  "
                  @click="slabstoxGraph(365)"
                >
                  1Y
                </li>
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 1825 ? 'active' : '')
                  "
                  @click="slabstoxGraph(1825)"
                >
                  5Y
                </li>
              </ul>
              <p class="dashboard-graph-footer-update-at float-right">
                Last Updated - 
                {{ (stoxtickerData.last_timestamp?stoxtickerData.last_timestamp:'N/A') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-sm-12">
      <div class="social_share ss-h4">
        <h4>
              <a class="embed-link" href="javascript:;"
                @click="embedStoxtickerCode()" >EMBED CODE </>
              </a>
            </h4>
        </div>
          </div>
    </div>
    <b-modal id="embedStoxtickerCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="http://pro.slabstox.com/stox-all-stats" width="1400" height="260" style="border:none;" frameborder="0"></iframe>  
          </textarea
            >
          </p>
        </b-modal>

    <div class="row analytics_page">
      <div class="col-md-12 pr-0 inner_wrap">
        <div class="col-md-12 col-sm-12 pl-0 stoxticker_page-outer">
          <div class="card green_box stoxticker_page">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn" >STOXTICKER</button>
                <span class="tooltip-text d-inline border-white" v-b-tooltip.bottomleft  title="This combines every Slab housed on the SlabStoxPro database. You can see the total number of slabs, SX value for all of them, and percent change day-over-day.">?</span>
                <span class="float-right share-lk-top sb-data-values-out">
                <span class="share-icon">
                  Share
                  <img src="~/assets/img/share-icon.png" alt />
                </span>
                <div class="share-all-outer" style="top: 19px;">
                  <ul>
                    <li>
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u='+encodeURI(currentUrl)"  target="_blank"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(currentUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.total?stoxtickerData.total:'')
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(currentUrl) +
                          '&media=' +
                          encodeURI(this.graphImage) +
                          '&description=' +
                          encodeURI('Buy & Sell Sports Cards Online')
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://www.linkedin.com/sharing/share-offsite/?url=' +
                          encodeURI(currentUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
              </span>

              </h5>
              <div class="row" style="justify-content: center;">
                <div class="bs-stats bs-stats1">
                  <h2 :class="sx_length && sx_length >= 16 ? 'small-font' : ''">SX</h2>
                </div>
                <div class="bs-stats bs-stats2">
                  <h3>{{ intToString(data.total) }}</h3>
                  <span class="tot-sla">TOTAL SLABS</span>
                </div>
                <div class="bs-stats bs-stats3">
                  <h2 :class="sx_length && sx_length >= 16 ? 'small-font' : ''">${{ (data.sale?data.sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0) }}</h2>
                  <span class="avg-sla">TOTAL SX VALUE</span>
                </div>
                <div class="bs-stats bs-stats4">
                  <div class="up_img">
                    <font-awesome-icon
                      :icon="['fas', 'caret-' + data.change_arrow]"
                    />
                  </div>
                  <h2 :class="sx_length && sx_length >= 16 ? 'small-font' : ''">{{ data.change }}%</h2>
                  <span class="cha-amo">CHANGE AMOUNT</span>
                </div>
              </div>

              <span class="date">
                  <i class="float-left">
slabstox.com
</i>
                  <i class="float-right">
                LAST UPDATED - {{ data.last_updated }}
                </i>
                </span>
            </div>
          </div>
          <div class="social_share ss-h4">
           
            <h4>
              <a
                class="embed-link"
                href="javascript:;"
                @click="embedStatsCode()"
                >EMBED CODE </>
              </a>
            </h4>
          </div>
        </div>

        <b-modal id="embedStatsCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="http://pro.slabstox.com/stox-ticker" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea
            >
          </p>
        </b-modal>

        <div class="col-md-12 col-sm-12 pl-0 stoxticker_listing-outer">
          <div class="card stoxticker_page stoxticker_listing">
            <div class="card-body">
              <h5 class="card-title">
                <button class="theme-btn card-btn" >SX STOXTICKER</button>
                <span class="tooltip-text d-inline" v-b-tooltip.bottomleft  title="Similar to the New York Stock Exchange, our StoxTicker allows you tosee a running list of cards from all sports, including their respective values. If the card is in green, it’s trending up since the most recent sale. If it is in red, it’s trending down.">?</span>
                <span class="float-right share-lk-top sb-data-values-out">
                <span class="share-icon si-white">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
                </span>
                <div class="share-all-outer" style="top: 19px;">
                  <ul>
                    <li style="margin: 0;">
                      <a :href="'https://www.facebook.com/sharer/sharer.php?u='+encodeURI(sxStoxtickerUrl)"  target="_blank"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(sxStoxtickerUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.total?stoxtickerData.total:'')
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'http://pinterest.com/pin/create/button/?url=' +
                          encodeURI(sxStoxtickerUrl) +
                          '&media=' +
                          encodeURI(this.graphImage) +
                          '&description=' +
                          encodeURI('Buy & Sell Sports Cards Online')
                        "
                        target="_blank"
                        ><img src="~/assets/img/pinterest.png" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'https://www.linkedin.com/shareArticle?mini=true&url=' +
                          encodeURI(sxStoxtickerUrl)
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/linkedin-circled.svg" alt
                      /></a>
                    </li>
                  </ul>
                </div>
              </span>
              </h5>
              <ul>
                <li v-for="sport in attributes.sport" :key="sport">
                  <h3 class="h3-title">{{sport}}</h3>

                  <marquee-text
                    :duration="30"
                    :paused="paused"
                    :key="'soldListing' + sport + 'MarqueeKey'"
                    :v-if="soldListing[sport] != 0"
                  >
                    <div
                      
                      @mouseenter="paused = !paused"
                      @mouseleave="paused = false"
                      v-for="(value,key) in soldListing"
                      :key="key"                    
                    >
                    <div v-if="key == sport">
                      <template v-for="list in value">
                        <h4>
                          <nuxt-link
                            class="sx-stox-card-link"
                            :to="'/card-data/?id=' + list.card.id"
                            :class="
                              list.slab_sold_flag == true
                                ? 'listing-rise'
                                : 'listing-fall'
                            "
                            >{{ list.card.title }} - ${{ list.sold_price }}
                          </nuxt-link>
                          &nbsp;&nbsp;
                        </h4>
                      </template>
                    </div>
                    </div>
                  </marquee-text>

                  <marquee-text
                    :duration="30"
                    :paused="paused"
                    :repeat="1"
                    v-if="soldListing.basketball == 0"
                  >
                    <div
                      @mouseenter="paused = !paused"
                      @mouseleave="paused = false"
                    >
                      <h4 style="padding: 0 50px">No recently sold listings.</h4>
                    </div>
                  </marquee-text>
                </li>
              </ul>
            </div>
          </div>
          <div class="social_share ss-h4">
            <h4>
              <a class="embed-link" href="#" @click="embedSellsCode()"
                >EMBED CODE </>
              </a>
            </h4>
          </div>
        </div>

        <b-modal id="embedSellsCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="http://pro.slabstox.com/stox-feed" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea
            >
          </p>
        </b-modal>
      </div>
    </div>

      <div class="card card-single-row-outer search-slabs-out" style="display:none;">
        <div class="card-body">
          <h5 class="card-title custom-smart-search-player-name">
            <button class="card-btn theme-btn">Slabs</button>
            
          </h5>
           <ul
              class="my-card-listing my-card-active-listing"
            >
            </ul>
                    <ul
              class="my-card-listing"
            >
              <li
                class="my-card"   v-for="itemdata in searchSlabs" :id="'slab-search-'+itemdata.id"
              :key="itemdata.id" :data-card_id="itemdata.id"
              >
                <h4 class="my-card-title" :title="itemdata.title">
                  {{ trimTitle(itemdata.title) }}
                </h4>
                <div class="image-container">
                  <img
                    class="card-image"
                    :title="itemdata.title"
                    :src="itemdata.cardImage"
                    :alt="itemdata.id"
                  />
                    <span v-if="itemdata.grade != null" class="grade-image-text">{{
                itemdata.grade
              }}</span>
                </div>
                <button class="my-card-view-listing add-to-board" v-on:click="addToBoard(itemdata.id)">
                  Add to Board
                  <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
                </button>
              </li>
              <li class="my-card-no-slab" v-if="searchSlabs.length == 0">
                No slab found.
              </li>
            </ul>

          <div
            class="empty-result"
            v-if="data.length == 0 && !requestInProcess"
          >
            <p>There are no cards here. Check again soon.</p>
          </div>
        </div>
      </div>

      <div class="card search-name-out" style="display:none;">
        <div class="card-body" style="padding:0;">
          <h5 class="card-title custom-smart-search-player-name">
            <button class="card-btn theme-btn">Create Board</button>
          </h5>
          <div class="search-bar">
          <input type="text" :value="(user!=null?user.first_name:'')  + ' ' +  (user!=null && user.last_name!=null?user.last_name:'')" placeholder="ENTER BOARD NAME" style="margin-bottom: 15px;">
</div>
          <div class="create-board-out my-card text-center">
 <button class="my-card-view-listing create-board" @click="createBoard()">
                  Create Board
                  <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
                </button>
          </div>
 </div>
    </div>
    
    <div class="row board-search-list-outer" style="display:none;">
      <div class="col-sm-12 col-md-12 col-lg-6 board-search-list"  v-for="(itemdata, key) in boardSearch" :key='`boardSearch-${key}`'>

            <div class="card">
              <div class="card-body dashboard-graph">
                <h5 class="card-title_new">
                 <nuxt-link v-if="user != null && user.full_name != null"
                      class="theme-btn card-btn"
                      :to="`stox-details?board=${itemdata.id}`"
                      style="margin-right: 4px;"
                      >{{ itemdata.name }}
                      ${{ boardSearch[key].total_card_value }}
                      </nuxt-link
                    >

                    <span
                      class="theme-btn card-btn"
                      style="margin-right: 4px;" v-if="user == null || user.full_name == null" v-b-modal.loginTopPopup
                      >{{ itemdata.name }}
                      ${{ boardSearch[key].total_card_value }}
                      </span
                    >

                   <button
                    :class="
                      (boardSearch[key].sx_icon == 'up'
                        ? 'theme-green-btn'
                        : 'theme-red-btn') + ' card-btn'
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-' + boardSearch[key].sx_icon]"
                    />&nbsp;${{ boardSearch[key].doller_diff }}
                  </button>
                  <button
                    :class="
                      (boardSearch[key].sx_icon == 'up'
                        ? 'theme-green-btn'
                        : 'theme-red-btn') + ' card-btn'
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'long-arrow-alt-' + boardSearch[key].sx_icon]"
                    />&nbsp;{{ boardSearch[key].pert_diff }}%
                  </button>
                </h5>
                <div class="dashboard-apex-top">
                  <VueApexCharts
                    ref="cardDataChart"
                    type="area"
                    height="350"
                    :options="searchChartOptions[key]"
                    :series="searchSeries[key]"
                  ></VueApexCharts>
                </div>
                <div class="dashboard-graph-footer">
                  <ul class="dashboard-graph-footer-month-filter">
                    <li
                      class="dashboard-graph-footer-month-filter-item"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      1D
                    </li>
                    <li
                      class="dashboard-graph-footer-month-filter-item"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      1W
                    </li>
                    <li
                    class="dashboard-graph-footer-month-filter-item"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      1M
                    </li>
                    <li
                      class="dashboard-graph-footer-month-filter-item active"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      3M
                    </li>
                    <li
                     class="dashboard-graph-footer-month-filter-item"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      6M
                    </li>
                    <li
                    class="dashboard-graph-footer-month-filter-item"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      1Y
                    </li>
                    <li
                      class="dashboard-graph-footer-month-filter-item"
                      @click="openSearchBoard(itemdata.id)"
                    >
                      5Y
                    </li>
                  </ul>
                  <p class="dashboard-graph-footer-update-at float-right">
                    Last Updated - 
                    {{ boardSearch[key].sales_graph.last_timestamp }}
                  </p>
                </div>

                </div>
            </div>
      
      </div>
      <div class="my-card-no-slab no-card-no-board" v-if="boardSearch.length ==0 && requestInProcess ==false">
        No board found.
      </div>
          <div class="dataloader search-board-dataloader" v-if="requestInProcess">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <div class="create-board-out my-card text-center" style="display:none">
                <button class="my-card-view-listing create-board" @click="searchBoard()">
                  Load More Boards
                  <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
                </button>
          </div>
    </div>
   


  </div>
</template>

<script>
import { BASE_URL } from '../constants/keys'
import CardSlabItem from '~/components/dashboard/CardSlabItem'
import CardListItem from '~/components/dashboard/CardListItem'
import $ from 'jquery'
import vClickOutside from 'v-click-outside'
import MarqueeText from 'vue-marquee-text-component'
import { mapGetters } from 'vuex'
import { FILTERS } from '../constants/advance_search_filter'

export default {
  transition: 'fade',
  layout: 'guestOuter',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  head() {
    return {
      title: 'Stoxticker - SlabStox',
      meta: [
        {
          hid: 'stoxticker',
          name: 'Stoxticker - SlabStox',
          content: 'Check our StoxTicker',
        },
        { property: 'og:title', content: 'Check our StoxTicker' },
        { property: 'og:image', content: this.sxGraphImage },
        {
          property: 'og:description',
          content: 'StoxTicker@' + (this.data.sale ? this.data.sale : ''),
        },
        { property: 'og:url', content: this.currentUrl },
        { property: 'og:site_name', content: 'SlabStox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    var currentHref = location.href
    this.sxStoxtickerUrl = currentHref.replace('stoxticker', 'stox-feed')

    this.getData()
    this.slabstoxGraph(90, 1)

    this.getSoldListing()

    this.logo = document.getElementById('sidebarLogo').src

    $('.custom-stox').on('click', function () {
      $(this).addClass('active')
      $('.search-add-box').addClass('active')
      $('.search-stox-box').removeClass('active')
      $('.search-stox').removeClass('active')
      $('.search-name-out').hide()
      $('.stoxticker_page-outer').hide()
      $('.stoxticker_listing-outer').hide()
      $('.board-search-list-outer').hide()
      $('.dashboard-graph-row').hide()
      $('.all-public-boards-list-out').hide()
    })

    $('.search-stox').on('click', function () {
      $(this).addClass('active')
      $('.search-stox-box').addClass('active')
      $('.search-add-box').removeClass('active')
      $('.custom-stox').removeClass('active')
      $('.search-name-out').hide()
      $('.stoxticker_page-outer').hide()
      $('.stoxticker_listing-outer').hide()
      $('.dashboard-graph-row').hide()
      $('.search-slabs-out').hide()
      $('.all-public-boards-list-out').hide()
    })

    $('.close-btn').on('click', function () {
      $('.custom-stox').removeClass('active')
      $('.search-stox').removeClass('active')
      $('.search-stox-box').removeClass('active')
      $('.search-add-box').removeClass('active')
      $('.search-name-out').hide()
      $('.board-search-list-outer').hide()
      $('.stoxticker_page-outer').show()
      $('.stoxticker_listing-outer').show()
      $('.all-public-boards-list-out').show()
    })

    $('.cat-btn li a').on('click', function (e) {
      $(this).parent().toggleClass('active')
      e.preventDefault()
    })
  },
  updated() {
<<<<<<< HEAD
    console.log(this.mountAppend)
    this.mountAppend = this.mountAppend + 1
    console.log(this.mountAppend)
    if (
      $.trim($('.all-public-boards-list-out').html()) == '' &&
      this.mountAppend == 4
    ) {
      setTimeout(() => {
        this.allBoardGraphFunc(90)
        this.allBoardGraphFunc1d(2)
      }, 10000)
    }
      var sx = $('.bs-stats3 h2').text();
      this.sx_length = sx.length;
=======
    var sx = $('.bs-stats3 h2').text()
    this.sx_length = sx.length
>>>>>>> 73a133d27b9cf25300b14e668af423325d5778f1
  },
  components: {
    CardListItem,
    CardSlabItem,
    MarqueeText,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      sx_length: '',
      paused: false,
      logo: null,
      baseUrl: BASE_URL,
      keyword: null,
      searchKeyword: null,
      requestInProcess: false,
      searchSlabs: [],
      boardSearch: [],
      boardActiveDay: [],
      boardPage: 1,
      stoxtickerData: [],
      stoxtickerData1d: [],
      sxActiveDaysGraph: '',
      graphImage: '',
      sxGraphImage: '',
      perc_diff: 0,
      doller_diff: 0,
      total_sales: 0,
      last_timestamp: 'N/A',
      currentUrl: location.origin + '/main-stoxticker',
      soldListing: '',
      soldListingbasketballMarqueeKey: 0,
      soldListingfootballMarqueeKey: 0,
      soldListingbaseballMarqueeKey: 0,
      soldListingsoccerMarqueeKey: 0,
      soldListingpokemonMarqueeKey: 0,
      soldListinghockeyMarqueeKey: 0,

      boardDaysGraph: [],
      boardChartOptions: [],
      boardSeries: [],
      boardSalesQty: [],

      boardChartOptions1d: [],
      boardSeries1d: [],
      boardSalesQty1d: [],

      searchChartOptions: [],
      searchSeries: [],
      searchSalesQty: [],
      smartKeyword: [],
      showSmartSearch: false,
      sxStoxtickerUrl: '',
      data: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: '',
      },
      graph1dInitialized: false,
      show1dGraph: false,
      showalldGraph: true,
      allBoardsGraph1dInitialized: false,
      allBoardsShow1dGraph: false,
      allBoardsShowalldGraph: true,
      series: [
        {
          name: 'SX',
          data: [0],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
            formatter: (value, ind) => {
              return `$${value}`
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
          type: 'category',
          categories: [],
        },
      },
      sxSeries: [
        {
          name: 'SX',
          data: [0],
        },
      ],
      sxSalesQty: [],
      sxChartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
          type: 'datetime',
          tickAmount: 6,
          tickPlacement: 'on',
          categories: [],
        },
        tooltip: {
          enabled: true,
          x: {
            format: 'MM/dd/yy',
          },
        },
        noData: {
          text: 'Graph Loading...',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            colors: '#edecec',
            fontSize: '10px',
            fontFamily: 'NexaBold',
          },
        },
      },
      sxSeries1d: [
        {
          name: 'SX',
          data: [0],
        },
      ],
      sxSalesQty1d: [],
      sxChartOptions1d: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: 'area',
          background: 'transparent',
          zoom: {
            enabled: false,
          },
        },
        colors: ['#14f078'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#edecec',
              fontSize: '10px',
              fontFamily: 'NexaBold',
            },
          },
          type: 'category',
          tickAmount: 24,
          tickPlacement: 'on',
          categories: [],
        },
        tooltip: {
          enabled: true,
        },
        noData: {
          text: 'Graph Loading...',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            colors: '#edecec',
            fontSize: '10px',
            fontFamily: 'NexaBold',
          },
        },
      },
      filters: { ...FILTERS },
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
    searchBoard(days = 90) {
      $('.board-search-list-outer').show()
      var sportList = []
      $('.cat-btn li.active').each(function () {
        var $this = $(this)
        sportList.push($this.find('a').attr('data-sport'))
      })
      $('.stoxticker_page-outer').hide()
      $('.stoxticker_listing-outer').hide()
      try {
        this.requestInProcess = true
        this.$axios
          .$post('stoxticker/search-board', {
            keyword: this.searchKeyword,
            sport: sportList,
            page: this.boardPage,
            days: days,
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              this.boardSearch = res.data
              this.boardPage = res.page
              $('.create-board-out').hide()
              if (res.data.length < res.boards_count) {
                $('.create-board-out').show()
              }
              if (res.data != null && res.data.length > 0) {
                res.data.map((item, key) => {
                  if (typeof item != 'undefined') {
                    this.boardActiveDay[key] = days
                    this.searchSeries[key] = [
                      {
                        name: 'SX',
                        data: item.sales_graph.values,
                      },
                    ]
                    this.searchSalesQty.push(item.sales_graph.qty)
                    this.searchChartOptions.push({
                      chart: {
                        toolbar: {
                          show: false,
                        },
                        height: 350,
                        type: 'area',
                        background: 'transparent',
                        zoom: {
                          enabled: false,
                        },
                      },
                      colors: ['#14f078'],
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: {
                        curve: 'smooth',
                      },
                      xaxis: {
                        labels: {
                          style: {
                            colors: '#edecec',
                            fontSize: '10px',
                            fontFamily: 'NexaBold',
                          },
                        },
                        type: 'datetime',
                        tickAmount: 6,
                        tickPlacement: 'on',
                        categories: item.sales_graph.labels,
                      },
                      yaxis: {
                        labels: {
                          style: {
                            colors: '#edecec',
                            fontSize: '10px',
                            fontFamily: 'NexaBold',
                          },
                          formatter: (value, ind) => {
                            let valCheck = value
                            if (Number(value) === value && value % 1 !== 0) {
                              let valCheck = Number(value).toFixed(2)
                            }

                            let lblStr = `$${valCheck}`
                            return lblStr
                          },
                        },
                      },
                      tooltip: {
                        enabled: true,
                        x: {
                          format: 'MM/dd/yy',
                        },
                        y: {
                          formatter: (value, ind) => {
                            let lblStr = `$${value}`
                            if (typeof ind == 'object')
                              lblStr = `$${value} (${
                                this.searchSalesQty[key][ind.dataPointIndex]
                              })`
                            else
                              lblStr = `$${value} (${this.searchSalesQty[key][ind]})`
                            return lblStr
                          },
                        },
                      },
                      noData: {
                        text: 'Graph Loading...',
                        align: 'center',
                        verticalAlign: 'middle',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                          colors: '#edecec',
                          fontSize: '10px',
                          fontFamily: 'NexaBold',
                        },
                      },
                    })
                  }
                })
              }
            }
          })
          .catch((err) => {
            this.requestInProcess = false
            console.log(err)
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    openSearchBoard(boardId) {
      if (this.user != null && this.user.full_name != null) {
        this.$router.push('/stox-details?board=' + boardId)
      }
    },
    addToBoard(itemId) {
      var itemIdSel = $('#slab-search-' + itemId)
      itemIdSel.addClass('active')
      $('.search-slabs-out .my-card-active-listing').append(
        itemIdSel.prop('outerHTML')
      )
      itemIdSel.remove()
    },
    hideSmartSearch(event) {
      this.showSmartSearch = false
    },
    selectKeyword(value) {
      this.$store
        .dispatch('advancesearch/update_search_card_id', value)
        .then(() => {
          this.$router.push('/search/?id=' + value)
        })
      this.showSmartSearch = false
    },
    getSmartKeyword() {
      var sportList = []
      $('.cat-btn li.active').each(function () {
        var $this = $(this)
        sportList.push($this.find('a').text())
      })
      $('.stoxticker_page-outer').hide()
      $('.stoxticker_listing-outer').hide()
      try {
        this.requestInProcess = true
        this.$axios
          .$post('stoxticker/slab-search', {
            keyword: this.keyword,
            sport: sportList,
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              $('.search-slabs-out').show()
              $('.search-name-out').show()
              this.searchSlabs = res.data
            }
          })
          .catch((err) => {
            this.requestInProcess = false
            console.log(err)
          })
      } catch (err) {
        this.requestInProcess = false
        console.log(err)
      }
    },
    createBoard() {
      var cardList = []
      $('.search-slabs-out li.active').each(function () {
        var $this = $(this)
        cardList.push($this.attr('data-card_id'))
      })
      try {
        this.requestInProcess = true
        this.$axios
          .$post('stoxticker/create-board', {
            name: $('.search-name-out input').val(),
            cards: cardList,
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              $('.search-name-out input').val('')
              $('.search-slabs-out').hide()
              $('.search-name-out').hide()
              $('.custom-stox').removeClass('active')
              $('.search-stox').removeClass('active')
              $('.search-stox-box').removeClass('active')
              $('.search-add-box').removeClass('active')
              $('.stoxticker_page-outer').show()
              $('.stoxticker_listing-outer').show()
              $('.dashboard-graph-row').show()

              $('.search-stox-box .search-bar input').val('')
              this.searchSlabs = res.data
              this.$toast.success('Stoxticker board created successfully.')
            }
          })
          .catch((err) => {
            this.requestInProcess = false
          })
      } catch (err) {
        this.requestInProcess = false
      }
    },
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
            this.$toast.error(
              'There has been an error fetching Stoxticker. Please refresh your page.',
              { timeOut: 10000 }
            )
          }
        })
      } catch (error) {
        this.$toast.error(
          'There has been an error fetching Stoxticker. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    getSoldListing() {
      try {
        this.$axios.$get('stoxticker/sold-listings').then((res) => {
          if (res.status == 200) {
            this.soldListing = res.data
            //below keys added so the marque plugin can update the content when data comes
            this.soldListingbasketballMarqueeKey = 1
            this.soldListingfootballMarqueeKey = 2
            this.soldListingbaseballMarqueeKey = 3
            this.soldListingsoccerMarqueeKey = 4
            this.soldListingpokemonMarqueeKey = 5
            this.soldListinghockeyMarqueeKey = 6
          } else {
            this.$toast.error(
              'There has been an error fetching SX Stoxticker. Please refresh your page.',
              { timeOut: 10000 }
            )
          }
        })
      } catch (error) {
        this.$toast.error(
          'There has been an error fetching SX Stoxticker. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    embedStatsCode() {
      this.$bvModal.show('embedStatsCode')
    },
    embedSellsCode() {
      this.$bvModal.show('embedSellsCode')
    },
    embedStoxtickerCode() {
      this.$bvModal.show('embedStoxtickerCode')
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
      // const chartInstance = this.$refs.cardDataChart.chart.dataURI()
      chartInstance.then((val) => {
        let img = new Image()
        img.src = val.imgURI
        this.$axios
          .$post('generate-graph-image', { image: img.src, prefix: 'cdc' })
          .then((res) => {
            if (res.status == 200) {
              this.sxGraphImage = res.url
              // console.log(res.url);
            }
          })
      })
    },
    slabstoxGraph(days = 90, intialTime = 0) {
      try {
        this.sxActiveDaysGraph = days
        this.$axios.$get(`get-sx-dashboard-graph/${days}`).then((res) => {
          if (res.status == 200) {
            this.stoxtickerData.total = res.data.total_sales
            this.stoxtickerData.perc_diff = res.data.perc_diff
            this.stoxtickerData.doller_diff = res.data.doller_diff
            this.stoxtickerData.change_arrow = res.data.change_arrow
            if (days == 90) {
              this.stoxtickerData.last_timestamp = res.data.last_timestamp
            }

            this.show1dGraph = false
            this.showalldGraph = true
            $('.dashboard-apex-top-alld').show()
            $('.dashboard-apex-top-1d').hide()

            this.sxSeries = [{ name: 'SX', data: res.data.values }]
            this.sxSalesQty = res.data.qty
            this.sxChartOptions = {
              xaxis: {
                categories: res.data.labels,
              },
              yaxis: {
                labels: {
                  formatter: (value, ind) => {
                    let valCheck = value
                    if (Number(value) === value && value % 1 !== 0) {
                      let valCheck = Number(value).toFixed(2)
                    }

                    let lblStr = `$${valCheck}`
                    return lblStr
                  },
                },
              },
              tooltip: {
                y: {
                  formatter: (value, ind) => {
                    let lblStr = `$${value}`
                    if (typeof ind == 'object')
                      lblStr = `$${value} (${
                        this.sxSalesQty[ind.dataPointIndex]
                      })`
                    else lblStr = `$${value} (${this.sxSalesQty[ind]})`
                    return lblStr
                  },
                },
              },
            }
          } else {
            this.$toast.error(
              'There has been an error loading Slabstox graphs. Please refresh your page.',
              { timeOut: 10000 }
            )
          }
        })
      } catch (error) {
        this.$toast.error(
          'There has been an error loading Slabstox graphs. Please refresh your page.',
          { timeOut: 10000 }
        )
      }
    },
    slabstoxGraph1d(days = 2, intialTime = 0) {
      if (intialTime == 1 && this.graph1dInitialized == false) {
        try {
          this.sxActiveDaysGraph = days
          this.$axios.$get(`get-sx-dashboard-graph/${days}`).then((res) => {
            if (res.status == 200) {
              this.graph1dInitialized = true
              this.show1dGraph = true
              this.showalldGraph = false
              $('.dashboard-apex-top-1d').show()
              $('.dashboard-apex-top-alld').hide()

              this.stoxtickerData1d.total = res.data.total_sales
              this.stoxtickerData1d.perc_diff = res.data.perc_diff
              this.stoxtickerData1d.doller_diff = res.data.doller_diff
              this.stoxtickerData1d.change_arrow = res.data.change_arrow

              this.sxSeries1d = [{ name: 'SX', data: res.data.values }]
              this.sxSalesQty1d = res.data.qty
              this.sxChartOptions1d = {
                xaxis: {
                  categories: res.data.labels,
                  labels: {
                    formatter: function (value) {
                      if (value !== undefined) {
                        var splittedCategories = value.split(':')
                        var mins = splittedCategories[1]
                        if (mins == '00') {
                          return value
                        } else {
                          return ''
                        }
                      }
                      return ''
                    },
                  },
                },
                yaxis: {
                  labels: {
                    formatter: (value, ind) => {
                      let valCheck = value
                      if (Number(value) === value && value % 1 !== 0) {
                        let valCheck = Number(value).toFixed(2)
                      }

                      let lblStr = `$${valCheck}`
                      return lblStr
                    },
                  },
                },
                tooltip: {
                  x: {
                    formatter: (value, ind) => {
                      return res.data.labels[ind.dataPointIndex]
                    },
                  },
                  y: {
                    formatter: (value, ind) => {
                      let lblStr = `$${value}`
                      if (typeof ind == 'object')
                        lblStr = `$${value} (${
                          this.sxSalesQty1d[ind.dataPointIndex]
                        })`
                      else lblStr = `$${value} (${this.sxSalesQty1d[ind]})`
                      return lblStr
                    },
                  },
                },
              }
            } else {
              this.$toast.error(
                'There has been an error loading Slabstox graphs. Please refresh your page.',
                { timeOut: 10000 }
              )
            }
          })
        } catch (error) {
          this.$toast.error(
            'There has been an error loading Slabstox graphs. Please refresh your page.',
            { timeOut: 10000 }
          )
        }
      } else {
        this.show1dGraph = true
        this.showalldGraph = false
        $('.dashboard-apex-top-1d').show()
        $('.dashboard-apex-top-alld').hide()
        this.sxActiveDaysGraph = days
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-main {
  padding: 0 10px !important;
}
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
.thb-btn {
  color: #000;
  &:hover {
    text-decoration: none;
  }
}
.display_keyword {
  position: absolute;
  background: #fff;
  width: 100%;
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

.custom-stox-search,
.custom-stox {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  border-radius: 2px;
  background: linear-gradient(
    to left,
    rgba(10, 178, 95, 0.76) 0%,
    rgba(27, 231, 131, 0.76) 33%,
    rgba(5, 251, 98, 0.76) 100%
  );
  padding: 20px 20px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  border: 0;
  text-transform: uppercase;
  outline: none;
  margin-right: 10px;
  text-decoration: none;

  @media (max-width: 768px) {
    padding: 20px 20px 17px 20px;
  }

  &:after {
    display: none;
  }
  &.active {
    background: #272d33;
    color: #39414a;
    border: 13px solid #39414a;
  }
  svg {
    vertical-align: baseline;
    margin-right: 5px;
  }
}

.search-stox {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  border-radius: 2px;
  background-color: #fff;
  padding: 20px 20px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  border: 0;
  &:after {
    display: none;
  }
  .chevron-down {
    display: none;
  }
  &.active {
    background: #272d33;
    color: #39414a;
    border: 13px solid #39414a;
    .chevron-right {
      display: none;
    }
    .chevron-down {
      display: inline-block;
    }
  }
  svg {
    margin-left: 5px;
  }
}
.stoxticker_page .bs-stats {
  height: auto;
  position: relative;
}
.stoxticker_page {
  .bs-stats1 {
    width: 10vw;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .bs-stats2 {
    width: 110px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .bs-stats3 {
    width: 42vw;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .bs-stats4 {
    width: 20vw;
    h2 {
      padding-left: 24px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.search-stox-box,
.search-add-box,
.search-name-out {
  background-color: #39414a;
  padding: 15px;
  border-radius: 2px;
  display: none;
  &.active {
    display: block;
  }
  .inner-wrap {
    padding: 15px;
    background-color: #fff;
    border-radius: 2px;
  }
  .search-bar {
    input {
      background-color: #f5f5f5;
      width: 100%;
      border: 0px;
      border-radius: 2px;
      outline: none;
      // font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 11px;
      letter-spacing: 2px;
      padding: 12px 20px 8px 20px;
      font-style: normal;

      &::placeholder {
        color: #cdcbcb;
      }
    }
  }
  .close-btn {
    text-align: right;
    margin-top: 7px;
    text-transform: uppercase;
    font-style: normal;
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .select-cat {
    margin-top: 10px;
    h6 {
      font-size: 9px;
      color: #b1b1b1;
      font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
      letter-spacing: 1px;
      font-weight: 400;
      margin-top: 15px;
    }
  }
}

.cat-btn {
  ul {
    padding: 0px;
    margin: 0 -1px;
    list-style-type: none;
    li {
      width: auto;
      display: inline-block;
      margin-right: 5px;
      margin-left: 1px;
      margin-bottom: 5px;
      a {
        // font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
        font-family: NexaBold, Helvetica, Arial, sans-serif;
        font-weight: 400;
        border-radius: 2px;
        background-color: #f5f5f5;
        padding: 12px 17px 10px 17px;
        color: #000;
        font-size: 11px;
        text-decoration: none;
        display: block;
        text-align: center;
        border: 0;
        text-transform: uppercase;
        outline: none;
      }
    }
  }
}
.cat-btn ul li.active a {
  background-color: #1ce783;
}
.search-field .search .card-btn {
  padding: 9px 20px 8px 20px;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}
.load-more-btn .custom-stox {
  padding: 12px 35px 11px 35px;
}
.top-btn.active {
  margin-bottom: 0px;
}
.top-btn .search-stox.active {
  border-radius: 0;
  background-color: #272d33;
  border: 10px solid #39414a;
  // color: #fff;
}
.cat-wrap {
  padding-left: 12px;
  padding-right: 12px;
}
.search-add-box {
  .search-wrap {
    margin-top: 15px;
  }
}
.search-wrap {
  width: calc(100% - 863px);
  text-align: right;
  padding-right: 12px;
}
@media (max-width: 1300px) {
  .search-wrap {
    max-width: 100%;
    text-align: right;
    flex: 100%;
  }
}
@media (max-width: 991px) {
  .cat-wrap,
  .search-wrap {
    max-width: 100%;
    text-align: center;
    flex: 100%;
  }
}

@media (max-width: 570px) {
  .top-btn .card-btn {
    width: 100%;
    margin-bottom: 7px;
    margin-left: 0px;
    margin-right: 0px;
  }
}
@media (max-width: 400px) {
  .cat-btn ul li {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .search-field .search .card-btn {
    margin-right: 0;
    width: 100%;
  }
  .search-wrap {
    padding: 0;
    .search {
      padding: 0 12px;
    }
  }
}
.analytics_page .card-single-row-outer {
  height: auto;
}
.card-single-row-outer {
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
}
html body main .card.search-slabs-out .my-card-listing .my-card {
  width: 16.66%;
  @media (max-width: 1200px) {
    width: 20%;
    &:nth-child(6n + 7) {
      clear: none;
    }
    .image-container {
      height: 15vw;
      .card-image {
        max-height: 15vw;
      }
    }
  }
  @media (max-width: 991px) {
    width: 33.333333%;
    .image-container {
      height: 21vw;
      .card-image {
        max-height: 21vw;
      }
    }
  }
  @media (max-width: 768px) {
    width: 50%;
    .image-container {
      height: 220px;
      .card-image {
        max-height: 200px;
      }
    }
  }
}
.my-card-no-slab {
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 2px;
  font-style: italic;
  padding: 30px 0 25px 0;
  border: 1px solid #fff;
  margin: 0 15px;
  border-radius: 2px;
}
.no-card-no-board {
  width: 100%;
  margin: 50px 20px;
}
.card.search-slabs-out {
  .my-card-active-listing,
  .my-card-listing {
    float: left;
    width: calc(100% + 30px);
  }
}
.my-card {
  &.active {
    .add-to-board {
      background: linear-gradient(
        to left,
        rgba(10, 178, 95, 0.76) 0%,
        rgba(27, 231, 131, 0.76) 33%,
        rgba(5, 251, 98, 0.76) 100%
      );
      &:hover {
        background: linear-gradient(
          to left,
          rgba(10, 178, 95, 0.76) 0%,
          rgba(27, 231, 131, 0.76) 33%,
          rgba(5, 251, 98, 0.76) 100%
        );
      }
    }
  }
  display: inline-block;
  width: 200px;
  padding: 0px 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  .my-card-title {
    font-family: 'CocogoosePro-SemiLightItalic', Helvetica, Arial, sans-serif;
    color: $theme-off-white;
    text-decoration: underline;
    font-size: 11px;
    letter-spacing: 1px;
    height: 38px;
    overflow: hidden;
  }
  .image-container {
    position: relative;
    padding: 5px;
    margin-bottom: 7px;
    text-align: center;
    background: #272d33;
    // border-radiupx;
    height: 12vw;
    .icons-container {
      position: absolute;
      padding: 10px;
      right: 0;
      top: 9px;
      .icons {
        width: 32px;
        height: 32px;
        float: right;
        margin-top: -10px;
        cursor: pointer;
      }
    }
    .card-image {
      margin-top: 0px;
      width: auto;
      max-width: 100%;
      position: absolute;
      height: auto;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
      max-height: 12vw;
    }
  }
  .my-card-view-listing {
    font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
    font-weight: 400;
    width: 100%;
    border-radius: 2px;
    background: #edecec;
    padding: 6px 5px 5px 5px;
    color: #000;
    font-size: 12px;
    display: block;
    text-align: center;
    border: 0;
    text-transform: uppercase;
    &:focus {
      outline: 0;
    }
    &:hover {
      text-decoration: none;
      background: #d4d4d4;
    }
  }
}
.create-board-out {
  width: 100%;
  margin-bottom: 10px;
  .create-board {
    width: auto;
    padding: 6px 25px 5px 25px;
    display: inline-block;
    background: linear-gradient(
      to left,
      rgba(10, 178, 95, 0.76) 0%,
      rgba(27, 231, 131, 0.76) 33%,
      rgba(5, 251, 98, 0.76) 100%
    );
    &:hover {
      background: linear-gradient(
        to left,
        rgba(10, 178, 95, 0.76) 0%,
        rgba(27, 231, 131, 0.76) 33%,
        rgba(5, 251, 98, 0.76) 100%
      );
    }
  }
}
.board-search-list {
  margin-bottom: 30px;
  .dashboard-graph-footer-month-filter {
    width: auto !important;
  }
  a.theme-btn.card-btn {
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }
  .dashboard-graph {
    .dashboard-graph-footer {
      // margin-top: -25px;
      .dashboard-graph-footer-update-at {
        margin-top: 18px;
      }
    }
  }
}
.sx-stats-all.dashboard-graph {
  .dashboard-graph-footer
    .dashboard-graph-footer-month-filter
    .dashboard-graph-footer-month-filter-item {
    margin: 0;
  }
  .dashboard-graph-footer {
    // margin-top: 13px;
    .dashboard-graph-footer-update-at {
      margin-top: 21px;
    }
  }
}
.search-board-dataloader {
  width: 100%;
  padding: 50px 0;
  text-align: center;
}
.stoxticker-page-exactout {
  @media (max-width: 767px) {
    .dashboard-apex-top {
      margin-bottom: 20px;
    }
  }
}

.featured-boards {
  font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
  font-weight: 400;
  border-radius: 2px;
  background-color: #fff;
  padding: 20px 20px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  border: 0;
}
.featured-boards .chevron-right {
  padding-left: 5px;
}
.small-font {
  font-size: 4vw !important;
}
</style>