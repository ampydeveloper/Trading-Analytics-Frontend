<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card ap">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Slab Requests</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <!-- <th>Id</th> -->
                  <th>User</th>
                  <th>Sport</th>
                  <th>player</th>
                  <th>year</th>
                  <th>brand</th>
                  <th>card</th>
                  <th>rc</th>
                  <th>variation</th>
                  <th>grade</th>
                  <th>image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="cards.length > 0">
                <tr v-for="card of cards" :key="card.id">
                  <!-- <td>{{ key }}</td> -->
                  <td>
                    <nuxt-link
                   style="color:#28a745;"
                      :to="`users?id=${card.user.id}`"
                      >{{ card.user.full_name }}</nuxt-link
                    >
                  </td>
                  <td>{{ card.sport }}</td>
                  <td>{{ card.player }}</td>
                  <td>{{ card.year }}</td>
                  <td>{{ card.brand }}</td>
                  <td>{{ card.card }}</td>
                  <td>{{ card.rc }}</td>
                  <td>{{ card.variation }}</td>
                  <td>{{ card.grade }}</td>
                  <td>
                    <img
                      :src="card.cardImage"
                      title="Click to view"
                      class="cardImg"
                      @click="openImg(card.cardImage)"
                      v-if="card.image != null"
                      alt="Slab-image"
                      width="200"
                    /><span v-else>N/A</span>
                  </td>
                  <td>
                    <nuxt-link
                      class="card-btn btn btn-success btn-table-spec"
                      :to="`create-card?card_id=${card.id}`"
                    >
                      Approve
                    </nuxt-link>
                    <button
                      class="card-btn btn btn-danger btn-table-spec"
                      @click="action(card.id)"
                      style="margin-top: 4px"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess">
                <tr>
                  <td colspan="11" class="text-center">loading...</td>
                </tr>
              </tbody>
              <tbody v-if="cards.length == 0 && requestInProcess == false">
                <tr>
                  <td colspan="11" class="text-center">
                    No requested slab available.
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <!-- <tr>
                  <td colspan="6">
                    <button class="theme-btn card-btn" :disabled="page == 2" @click="getRequestedSlab(page - 1)">
                      Previous
                    </button>
                    <button class="theme-btn card-btn" @click="getRequestedSlab(page)">Next</button>
                  </td>
                </tr> -->
                <tr v-if="page - 1 == 1 && cards.length >= 30">
                  <td colspan="9">
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(3)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 2 && cards.length >= 30">
                  <td colspan="9">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(1)"
                    >
                      1
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(4)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 == 3 && cards.length >= 30">
                  <td colspan="9">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(1)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(2)"
                    >
                      2
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(3)"
                    >
                      3
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(4)"
                    >
                      4
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(5)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
                <tr v-if="page - 1 > 3 && cards.length >= 30">
                  <td colspan="9">
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page - 2)"
                    >
                      Previous
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page - 1)"
                    >
                      {{ page - 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn active-pagination"
                      @click="getRequestedSlab(page)"
                    >
                      {{ page }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page + 1)"
                    >
                      {{ page + 1 }}
                    </button>
                    <button
                      class="theme-btn card-btn"
                      @click="getRequestedSlab(page + 2)"
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',
  layout: 'admin',
  head() {
    return {
      title: 'Admin Dashboard - Slabstox',
    }
  },
  mounted() {
    this.getRequestedSlab(this.page)
  },
  components: {},
  data() {
    return {
      cards: [],
      page: 1,
      requestInProcess: false,
    }
  },
  methods: {
    openImg(img) {
      window.open(img, '_blank')
    },
    getRequestedSlab(page) {
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('card/get-request-slab-list-for-admin', {
              page: page,
            })
            .then((res) => {
              if (res.status == 200) {
                this.cards = res.data.data
                this.page = res.data.next
              }
              this.requestInProcess = false
              this.hideLoader()
            })
            .catch((err) => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.requestInProcess = false
          console.log(err)
        }
      }
    },
    action(id) {
      this.showLoader()
      this.requestInProcess = true
      this.$axios
        .post('/card/requested-slab-action-reject', {
          id: id
        })
        .then((res) => {
          if (res.status == 200) {
            this.$toast.success(res.data.message)
            this.requestInProcess = false
            this.hideLoader()
            this.getRequestedSlab()
          }
        })
        .catch((err) => {
          this.requestInProcess = false
          this.hideLoader()
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
.cardImg {
  cursor: zoom-in;
}
</style>
