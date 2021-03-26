<template>
  <div class="col-md-12 col-sm-12">
    <div class="row analytics_page" v-if="user != null && user.full_name != null">
      <div class="col-md-12">
        <div class="top-btn">
          <button class="card-btn custom-stox">
            <font-awesome-icon :icon="['fas', 'plus']" />
            create custom stoxticker
          </button>

          <button class="card-btn search-stox">
            Search stoxticker board
            <span class="chevron-right">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </span>
             <span class="chevron-down">
             <font-awesome-icon :icon="['fas', 'chevron-down']" />
             </span>
          </button>
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
                      <li>
                        <a href="#" class="theme-btn card-btn" data-sport="basketball">BASKETBALL</a>
                      </li>
                      <li class="">
                        <a href="#" class="theme-btn card-btn" data-sport="baseball">Baseball</a>
                      </li>
                      <li>
                        <a href="#" class="theme-btn card-btn" data-sport="football">Football</a>
                      </li>
                      <li><a href="#" class="theme-btn card-btn" data-sport="hockey">Hockey</a></li>
                      <li><a href="#" class="theme-btn card-btn" data-sport="soccer">Soccer</a></li>
                      <li>
                        <a href="#" class="theme-btn card-btn" data-sport="pokemon">Pokémon</a>
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
                     
                    />
                     <!-- <div class="display_keyword" v-if="showSmartSearch">
          <ul v-click-outside="hideSmartSearch">
            <li
              v-for="(item, key) of smartKeyword"
              :key="key"
              @click="selectKeyword(item.id)"
            >
              {{ item.player + ' ' + item.title }}
            </li>
            <li v-if="smartKeyword.length == 0">
              No results found for this search
            </li>
          </ul>
              </div> -->
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
             <button class="theme-btn card-btn">
                Slabstox ${{ stoxtickerData.total }}
              </button>

              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;&nbsp;
                <span class="g-dollar-d-val"> ${{ stoxtickerData.doller_diff }}</span>
              </button>
              <button
                :class="
                  (stoxtickerData.change_arrow &&
                  stoxtickerData.change_arrow == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="stoxtickerData.change_arrow !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + stoxtickerData.change_arrow,
                  ]"
                />&nbsp;&nbsp;{{ stoxtickerData.perc_diff }}%
              </button>
             
              <span class="total_sales" style="display: none">{{
                stoxtickerData.total_sales
              }}</span>
             <span class="float-right share-lk-top">
                <span class="share-icon">
                  Share
                  <img src="~/assets/img/share-icon-white.png" alt />
                </span>
                <div class="share-all-outer">
                  <ul>
                    <li>
                      <a href="javascript:;" @click="shareFb()"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(currentUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.sale?stoxtickerData.sale:'') +
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
              <VueApexCharts
                ref="sxDashChart"
                type="area"
                height="350"
                :options="sxChartOptions"
                :series="sxSeries"
              ></VueApexCharts>
            </div>
            <div class="dashboard-graph-footer">
              <ul class="dashboard-graph-footer-month-filter">
                <li
                  :class="
                    'dashboard-graph-footer-month-filter-item ' +
                    (sxActiveDaysGraph == 2 ? 'active' : '')
                  "
                  @click="slabstoxGraph(2)"
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
                {{ stoxtickerData.last_timestamp }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="social_share ss-h4">
        <h4>
              <a class="embed-link" href="javascript:;"
                @click="embedStoxtickerCode()" >EMBEDD CODE </>
              </a>
            </h4>
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
                <button class="theme-btn card-btn">STOXTICKER</button>
                
                <span class="float-right share-lk-top sb-data-values-out">
                <span class="share-icon">
                  Share
                  <img src="~/assets/img/share-icon.png" alt />
                </span>
                <div class="share-all-outer" style="top: 19px;">
                  <ul>
                    <li>
                      <a href="javascript:;" @click="shareFb()"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li>
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(currentUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.sale?stoxtickerData.sale:'')
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
              <div class="row">
                <div class="col-md-2 bs-stats">
                  <h2>SX</h2>
                </div>
                <div class="col-md-2 bs-stats">
                  <h3>{{ intToString(data.total) }}@</h3>
                  <span class="tot-sla">TOTAL SLABS</span>
                </div>
                <div class="col-md-5 bs-stats">
                  <h2>{{ (data.sale?data.sale:'') }}</h2>
                  <span class="avg-sla">AVG. SLAB SALE</span>
                </div>
                <div class="col-md-3 bs-stats">
                  <div class="up_img">
                    <font-awesome-icon
                      :icon="['fas', 'caret-' + data.change_arrow]"
                    />
                  </div>
                  <h2>{{ data.change }}</h2>
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
                >EMBEDD CODE </>
              </a>
            </h4>
          </div>
        </div>

        <b-modal id="embedStatsCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="http://pro.slabstox.com/stox-stats" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
          </textarea
            >
          </p>
        </b-modal>

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
                <div class="share-all-outer" style="top: 19px;">
                  <ul>
                    <li style="margin: 0;">
                      <a href="javascript:;" @click="shareFb()"
                        ><img src="~/assets/img/icons/facebook.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
                      <a
                        :href="
                          'https://twitter.com/intent/tweet?url=' +
                          encodeURI(currentUrl) +
                          '&text=StoxTicker@' +
                         (stoxtickerData.sale?stoxtickerData.sale:'')
                        "
                        target="_blank"
                        ><img src="~/assets/img/icons/twitter.svg" alt
                      /></a>
                    </li>
                    <li style="margin: 0;">
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
                    <li style="margin: 0;">
                      <a
                        :href="
                          'https://www.linkedin.com/shareArticle?mini=true&url=' +
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
              <ul>
                <li>
                  <h3 class="h3-title">BASKETBALL</h3>
                  <marquee direction="left">
                    <!-- <h4>LEBRON JAMES 2003 TOPPS CHROME $ 45.75</h4>
                    <h5>LEBRON JAMES 2003...</h5> -->
                    <template v-for="list in soldListing.basketball">
                    <h4>
                       <nuxt-link
      class="sx-stox-card-link"
      :to="'/card-data/?id=' + list.card.id"
    >{{list.card.title}}
     </nuxt-link> &nbsp;&nbsp;</h4>
                      </template>
                      <template v-if="soldListing.basketball==0">
                      <h4>No recent sold listings.</h4>
                      </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">FOOTBALL</h3>
                  <marquee direction="left">
                   <template v-if="soldListing.football>0" v-for="list in soldListing.football">
                    <h4>{{list.card.title}}&nbsp;&nbsp;</h4>
                      </template>
                  <template v-if="soldListing.football==0">
                    <h4>No recent sold listings.</h4>
                      </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">BASEBALL</h3>
                  <marquee direction="left">
                    <template v-for="list in soldListing.baseball">
                    <h4>{{list.card.title}}&nbsp;&nbsp;</h4>
                      </template>
                      <template v-if="soldListing.baseball==0">
                    <h4>No recent sold listings.</h4>
                      </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">SOCCER</h3>
                  <marquee direction="left">
                   <template v-for="list in soldListing.soccer">
                    <h4>{{list.card.title}}&nbsp;&nbsp;</h4>
                      </template>
                      <template v-if="soldListing.soccer==0">
                    <h4>No recent sold listings.</h4>
                      </template>
                  </marquee>
                </li>
                <li>
                  <h3 class="h3-title">POKÉMON</h3> 
                  <marquee direction="left">
                   <template v-for="list in soldListing.pokemon">
                    <h4>{{list.card.title}}&nbsp;&nbsp;</h4>
                      </template>
                      <template v-if="soldListing.pokemon==0">
                    <h4>No recent sold listings.</h4>
                      </template>
                  </marquee>
                </li>
              </ul>
             
            </div>
          </div>
          <div class="social_share ss-h4">
         
            <h4>
              <a class="embed-link" href="#" @click="embedSellsCode()"
                >EMBEDD CODE </>
              </a>
            </h4>
          </div>
        </div>
        <b-modal id="embedSellsCode" title="" size="xl" hide-footer>
          <h5>Copy code and paste to your website.</h5>
          <p class="code-text">
            <textarea cols="3" rows="10"><iframe src="http://pro.slabstox.com/stox-sells" width="1400" height="260" style="border:none;" frameborder="0"></iframe>
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
          <div class="dataloader" v-if="requestInProcess">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
                    <ul
              class="my-card-listing"
            >
              <li
                class="my-card"   v-for="itemdata in searchSlabs"
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
                </div>
                <button class="my-card-view-listing add-to-board">
                  Add to Board
                  <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
                </button>
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
          <input type="text" :value="user.first_name + ' ' +  (user.last_name!=null?user.last_name:'')" placeholder="ENTER BOARD NAME" style="margin-bottom: 15px;">
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
      <div class="col-sm-6 board-search-list"  v-for="(itemdata, key) in boardSearch" :key='`boardSearch-${key}`'>

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
                    />&nbsp;&nbsp; ${{ boardSearch[key].sx_value }}
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
                    />&nbsp;&nbsp;{{ boardSearch[key].pert_diff }}%
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
                      :class="[{'active': boardActiveDay == 2}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(2)"
                    >
                      1D
                    </li>
                    <li
                      :class="[{'active': boardActiveDay == 7}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(7)"
                    >
                      1W
                    </li>
                    <li
                      :class="[{'active': boardActiveDay == 30}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(30)"
                    >
                      1M
                    </li>
                    <li
                      :class="[{'active': boardActiveDay == 90}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(90)"
                    >
                      3M
                    </li>
                    <li
                      :class="[{'active': boardActiveDay == 180}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(180)"
                    >
                      6M
                    </li>
                    <li
                      :class="[{'active': boardActiveDay == 365}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(365)"
                    >
                      1Y
                    </li>
                    <li
                      :class="[{'active': boardActiveDay == 1825}, 'dashboard-graph-footer-month-filter-item']"
                      @click="searchBoard(1825)"
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

          <div class="create-board-out my-card text-center" style="display:none">
                <button class="my-card-view-listing create-board" @click="searchBoard()">
                  Load More Boards
                  <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
                </button>
          </div>
    </div>
   

   <div class="row dashboard-graph-row all-public-boards-list-out">
      <div class="col-md-12 col-sm-12" v-for="(itemdata, key) in allBoardGraph" :key='`allBoardGraph-${key}`'>
        <div class="card">
          <div
            class="card-body dashboard-graph sx-stats-all"
            id="dashboard-graph-outer"
          >
          
            <h5 class="card-title">
              <nuxt-link
                class="theme-btn card-btn thb-btn"
                :to="`stox-details?board=${allBoardGraph[key].id}`"
                style="margin-right: 4px;" v-if="user != null && user.full_name != null"
                >{{ allBoardGraph[key].name }}
                ${{ allBoardGraph[key].total_card_value }}
              </nuxt-link>

              <span
                class="theme-btn card-btn thb-btn"
                style="margin-right: 4px;" v-if="user == null || user.full_name == null" v-b-modal.loginTopPopup
                >{{ allBoardGraph[key].name }}
                ${{ allBoardGraph[key].total_card_value }}
              </span>

              <button
                :class="
                  (allBoardGraph[key].sx_icon &&
                  allBoardGraph[key].sx_icon == 'up'
                    ? 'theme-green-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="allBoardGraph[key].sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + allBoardGraph[key].sx_icon,
                  ]"
                />&nbsp;&nbsp;
                <span class="g-dollar-d-val"> ${{ allBoardGraph[key].sx_value }}</span>
              </button>
              <button
                :class="
                  (allBoardGraph[key].sx_icon &&
                  allBoardGraph[key].sx_icon == 'up'
                    ? 'theme-btn'
                    : 'theme-red-btn') + ' card-btn'
                "
              >
                <font-awesome-icon
                  v-if="allBoardGraph[key].sx_icon !== undefined"
                  :icon="[
                    'fas',
                    'long-arrow-alt-' + allBoardGraph[key].sx_icon,
                  ]"
                />&nbsp;&nbsp;{{ allBoardGraph[key].pert_diff }}%
              </button>
            </h5>
            <div class="dashboard-apex-top">
              <VueApexCharts
                type="area"
                height="350"
                :key="`vac-${key}-dashChart`"
                :options="boardChartOptions[key]"
                :series="boardSeries[key]"
              ></VueApexCharts>
            </div>
            <div class="dashboard-graph-footer" id='`boardGraphs-${key}`'>
              <ul class="dashboard-graph-footer-month-filter" :id='`dc-${key}-ul`' :key='`dc-${key}-ul`'>
                <li
                  :class="[{'active': boardDaysGraph[key] == 2}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(2,allBoardGraph[key].id,key)"
                >
                  1D
                </li>
                <li
                  :class="[{'active': boardDaysGraph[key] == 7}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(7,allBoardGraph[key].id,key)"
                >
                  1W
                </li>
                <li
                  :class="[{'active': boardDaysGraph[key] == 30}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(30,allBoardGraph[key].id,key)"
                >
                  1M
                </li>
                <li
                  :class="[{'active': boardDaysGraph[key] == 90}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(90,allBoardGraph[key].id,key)"
                >
                  3M
                </li>
                <li
                  :class="[{'active': boardDaysGraph[key] == 180}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(180,allBoardGraph[key].id,key)"
                >
                  6M
                </li>
                <li
                  :class="[{'active': boardDaysGraph[key] == 365}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(365,allBoardGraph[key].id,key)"
                >
                  1Y
                </li>
                <li
                  :class="[{'active': boardDaysGraph[key] == 1825}, 'dashboard-graph-footer-month-filter-item']"
                  @click="allBoardGraphSingleFunc(1825,allBoardGraph[key].id,key)"
                >
                  5Y
                </li>
              </ul>
              <p class="dashboard-graph-footer-update-at float-right">
                Last Updated - 
                {{ (allBoardGraph[key].sales_graph.last_timestamp?allBoardGraph[key].sales_graph.last_timestamp:'') }}
              </p>
            </div>
          </div>
        </div>

        <div class="social_share ss-h4">
          <h4>
            <a class="embed-link" href="javascript:void(0);"
              @click="embedStoxtickerCode()" >EMBEDD CODE </>
            </a>
          </h4>
        </div>
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

export default {
  transition: 'fade',
  layout: 'guestOuter',
  auth: 'guest',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  head() {
    return {
      title: 'Stoxticker - Slabstox',
      meta: [
        {
          hid: 'stoxticker',
          name: 'Stoxticker - Slabstox',
          content: 'Check our StoxTicker',
        },
        { property: 'og:title', content: 'Check our StoxTicker' },
        { property: 'og:image', content: this.sxGraphImage },
        {
          property: 'og:description',
          content: 'StoxTicker@' + (this.data.sale ? this.data.sale : ''),
        },
        { property: 'og:url', content: this.currentUrl },
        { property: 'og:site_name', content: 'Slabstox' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  mounted() {
    this.getData()
    this.slabstoxGraph()
    this.getSoldListing()
    // this.getAllBoards()
    this.allBoardGraphFunc(2)
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

    $(document).on('click', '.add-to-board', function (e) {
      $(this).parent().addClass('active')
      e.preventDefault()
    })
  },
  components: {
    CardListItem,
    CardSlabItem,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      logo: null,
      baseUrl: BASE_URL,
      keyword: null,
      searchKeyword: null,
      requestInProcess: false,
      searchSlabs: [],
      boardSearch: [],
      boardActiveDay: 2,
      boardPage: 1,
      stoxtickerData: [],
      sxActiveDaysGraph: '',
      graphImage: '',
      sxGraphImage: '',
      perc_diff: 0,
      doller_diff: 0,
      total_sales: 0,
      last_timestamp: 'N/A',
      currentUrl: location.href,
      soldListing: '',
      // allBoards: '',
      allBoardGraph: [],
      boardDaysGraph: [],
      boardChartOptions: [],
      boardSeries: [],
      boardSalesQty: [],
      searchChartOptions: [],
      searchSeries: [],
      searchSalesQty: [],
      smartKeyword: [],
      showSmartSearch: false,
      data: {
        total: 0,
        sale: 0,
        change: 0,
        change_icon: 'up',
        last_updated: '',
      },
      series: [
        {
          name: 'Sales',
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
          name: 'Sales',
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
    }
  },
  methods: {
    searchBoard(days=2) {
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
            days: days
          })
          .then((res) => {
            this.requestInProcess = false
            if (res.status == 200) {
              // $('.search-name-out').show()
              $('.board-search-list-outer').show()
              this.boardSearch = res.data
              this.boardPage = res.page

              // this.activeDaysGraph = 2
              //  var percDiff = res.data.perc_diff
              // var dollerDiff = String(res.data.doller_diff)

              if (res.data.length == 4) {
                $('.create-board-out').show()
              }
              if (res.data != null && res.data.length > 0) {
                res.data.map((item, key) => {
                  if (typeof item != 'undefined') {
                    this.boardActiveDay = days
                    this.boardSearch[key] = item
                    this.searchSeries[key] = [
                      {
                        name: 'Sales',
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
                        type: 'category',
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
                            let lblStr = `$${value}`
                            return lblStr
                          },
                        },
                      },
                      tooltip: {
                        enabled: true,
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
                    })
                  }
                })
              }

              // this.last_timestamp = res.data.last_timestamp
              // this.initGraphLabelLength = res.card_data.labels.length
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

        // this.$axios
        //   .$post('search/get-smart-keyword', { keyword: this.keyword })
        //   .then((res) => {
        //     this.requestInProcess = false
        //     if (res.status == 200) {
        //       if (this.keyword == res.keyword) {
        //         this.smartKeyword = res.data
        //         this.showSmartSearch = true
        //       }
        //     }
        //   })
        //   .catch((err) => {
        //     this.requestInProcess = false
        //     console.log(err)
        //   })
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
              this.allBoardGraphFunc(2)
              // this.$router.push('/stoxticker')
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
        name: 'StoxTicker@' + (this.data.sale ? this.data.sale : ''),
        link: this.baseUrl,
        picture: this.sxGraphImage,
        description: 'Check our StoxTicker',
      })
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
    slabstoxGraph(days = 2) {
      try {
        // this.graphDataEmpty = false;
        this.$axios.$get(`get-sx-dashboard-graph/${days}`).then((res) => {
          if (res.status == 200) {
            this.sxActiveDaysGraph = days
            // if (this.initGraphLabelLength != res.data.labels.length) {
            // this.graphDataEmpty = false;
            this.stoxtickerData.total = res.data.total_sales
            this.stoxtickerData.sale = res.data.total_sales
            this.stoxtickerData.perc_diff = res.data.perc_diff
            this.stoxtickerData.doller_diff = res.data.doller_diff
            this.stoxtickerData.change_arrow = res.data.change_arrow
            this.stoxtickerData.last_timestamp = res.data.last_timestamp

            this.sxSeries = [{ name: 'Sales', data: res.data.values }]
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
                enabled: true,
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
            setTimeout(() => {
              this.generateImageOfGraph(this.$refs.sxDashChart.chart.dataURI())
              // console.log(this.generateImageOfGraph(this.$refs.dashChart.chart.dataURI()));
            }, 1000)
            // }else{
            //   this.graphDataEmpty = true;
            // }
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    allBoardGraphFunc(days = 2) {
      try {
        // this.graphDataEmpty = false;
        this.$axios.$get(`stoxticker/all-boards/${days}`).then((res) => {
          if (res.status == 200) {
            this.sxActiveDaysGraph = days
            // if (this.initGraphLabelLength != res.data.labels.length) {
            // this.graphDataEmpty = false;
            // this.stoxtickerData.sale = res.data.sale
            // this.stoxtickerData.perc_diff = res.data.perc_diff
            // this.stoxtickerData.doller_diff = res.data.doller_diff
            // this.stoxtickerData.change_arrow = res.data.change_arrow
            // this.stoxtickerData.last_timestamp = res.data.last_timestamp
            if (res.data != null && res.data.length > 0) {
              res.data.map((item, key) => {
                if (typeof item != 'undefined') {
                  this.allBoardGraph[key] = item
                  this.boardSeries[key] = [
                    {
                      name: 'Sales',
                      data: item.sales_graph.values,
                    },
                  ]
                  this.boardDaysGraph.push(2)
                  this.boardSalesQty.push(item.sales_graph.qty)
                  this.boardChartOptions.push({
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
                      type: 'category',
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
                      y: {
                        formatter: (value, ind) => {
                          let lblStr = `$${value}`
                          if (typeof ind == 'object')
                            lblStr = `$${value} (${
                              this.boardSalesQty[key][ind.dataPointIndex]
                            })`
                          else
                            lblStr = `$${value} (${this.boardSalesQty[key][ind]})`
                          return lblStr
                        },
                      },
                    },
                  })
                }
              })
            }
            console.log(this.allBoardGraph)
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    allBoardGraphSingleFunc(days, board, boardKey) {
      try {
        
        // this.graphDataEmpty = false;
        this.$axios
          .$get(`stoxticker/single-graph-board/${days}/${board}`)
          .then((res) => {
            if (res.status == 200) {

              this.boardDaysGraph.splice(boardKey, 1, days)

              // if (this.initGraphLabelLength != res.data.labels.length) {
              // this.graphDataEmpty = false;
              // this.stoxtickerData.sale = res.data.sale
              // this.stoxtickerData.perc_diff = res.data.perc_diff
              // this.stoxtickerData.doller_diff = res.data.doller_diff
              // this.stoxtickerData.change_arrow = res.data.change_arrow
              // this.stoxtickerData.last_timestamp = res.data.last_timestamp

              this.allBoardGraph.splice(boardKey, 1, res.data)

              this.boardSeries.splice(boardKey, 1, [{name: 'Sales', data: res.data.sales_graph.values, }])

              this.boardSalesQty.splice(boardKey, 1, res.data.sales_graph.qty)
              this.boardChartOptions.splice(boardKey, 1, {
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
                  type: 'category',
                  categories: res.data.sales_graph.labels,
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
                  y: {
                    formatter: (value, ind) => {
                      let lblStr = `$${value}`
                      if (typeof ind == 'object') lblStr = `$${value} (${this.boardSalesQty[ind.dataPointIndex]})`
                      else lblStr = `$${value} (${this.boardSalesQty[ind]})`
                      return lblStr
                    },
                  },
                },
              })
            }
          })
      } catch (error) {
        console.log(error)
      }
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

// .top-btn {
//   margin-bottom: 20px;
// }
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
  padding: 20px 35px 17px 35px;
  color: #000;
  font-size: 12px;
  text-align: center;
  border: 0;
  text-transform: uppercase;
  outline: none;
  margin-right: 10px;
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
  padding: 20px 35px 17px 35px;
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
      font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
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
      margin-right: 1px;
      margin-left: 1px;
      margin-bottom: 5px;
      a {
        font-family: 'CocogoosePro-Regular', Helvetica, Arial, sans-serif;
        font-weight: 400;
        border-radius: 2px;
        background-color: #f5f5f5;
        padding: 12px 30px 10px 30px;
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
}
.analytics_page .card-single-row-outer {
  height: auto;
}
html body main .card.search-slabs-out .my-card-listing .my-card {
  width: 16.66%;
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
    height: 43px;
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
      margin-top: -25px;
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