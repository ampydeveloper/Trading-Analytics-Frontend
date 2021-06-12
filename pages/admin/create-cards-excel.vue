<template>
  <div class="col-md-12 col-sm-12">
    <div class="row">
      <div class="col-12 t-p-5">
        <div class="card create_card">
          <div class="card-body">
            <h5 class="card-title">
              <button class="theme-btn card-btn">Upload Slabs by CSV</button>
            </h5>
          </div>
          <div class="table_wrapper ap">
            <div class="form_column">
              <label>Sport</label>
              <select v-model="sport" class="form-control">
                <option value="">Select Sports</option>
                <option value="basketball">Basketball</option>
                <option value="baseball">Baseball</option>
                <option value="football">Football</option>
                <option value="soccer">Soccer</option>
                <option value="pokemon">Pokémon</option>
              </select>
            </div>
            <div class="form_column">
              <label>CSV</label>
              <button
                class="theme-green-btn card-btn pull-right"
                @click="uploadExcel()"
              >
                Choose CSV
              </button>
            </div>
            <div class="form_column">
              <label>Images</label>
              <button
                class="theme-green-btn card-btn pull-right"
                @click="uploadImagesZip('images')"
              >
                Choose Images as Zip
              </button>
            </div>

            <div class="form_btns">
              <input type="file" style="display: none" ref="excel" />
              <input type="file" style="display: none" ref="imageZip" />
              <div class="left_btn">
                <button
                  @click="back()"
                  class="theme-green-btn card-btn btn-cancel"
                  style="margin-bottom: 17px"
                >
                  Cancel
                </button>
              </div>
              <div class="right_btn">
                <button
                  type="submit"
                  class="theme-green-btn card-btn btn-save"
                  :disabled="requestInProcess"
                  @click="uploadExcelNow()"
                >
                  Upload
                </button>
              </div>
            </div>
            <div class="text-center message">
              <p v-if="statusMessage">{{ statusMessage }}</p>
            </div>
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
      title: 'Admin Dashboard - SlabStox',
    }
  },
  mounted() {
    // this.card.card_id = this.$route.query.item
  },
  components: {},
  data() {
    return {
      sport: '',
      uploadExcelType: null,
      uploadImageType: null,
      uploadZipType: false,
      requestInProcess: false,
      statusMessage: null,
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    uploadExcel() {
      if (this.sport != '') {
        this.uploadExcelType = this.sport
        this.uploadImageType = 0
        this.$refs.excel.click()
      } else {
        this.$toast.error('Select Sport')
      }
    },
    uploadImagesZip(imageType) {
      if (this.sport != '') {
        this.uploadExcelType = this.sport
        this.uploadZipType = imageType
        this.$refs.imageZip.click()
      } else {
        this.$toast.error('Select Sport')
      }
    },
    uploadExcelNow() {
      let formData = new FormData()
      if (this.uploadImageType == 0) {
        var files = this.$refs.excel.files
        const file = files.item(0)
        formData.append('file', file)
      }
      if (this.uploadZipType == 'images') {
        var files1 = this.$refs.imageZip.files
        const file1 = files1.item(0)
        formData.append('file1', file1)
      }

      //   if(file){
      //   if (
      //     file.type ==
      //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      //   ) {

      formData.append('for', this.uploadExcelType)
      formData.append('imageType', this.uploadImageType)
      if (!this.requestInProcess) {
        try {
          this.showLoader()
          this.requestInProcess = true
          this.$axios
            .post('upload-slab-excel', formData)
            .then((res) => {
              this.requestInProcess = false
              this.hideLoader()
              this.uploadExcelType = null
              if (res.status == 200) {
                this.$toast.success(res.data.message)
                this.$router.push('/admin/cards')
              }
            })
            .catch((err) => {
              this.requestInProcess = false
              this.hideLoader()
            })
        } catch (err) {
          this.hideLoader()
          this.uploadExcelType = null
          this.requestInProcess = false
          console.log(err)
        }
      }
      // }
      //   } else {
      //     this.$toast.error('Invalid File')
      //   }
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
// .toasted.toasted-primary {
//   background: #1ce783;
//   border: none;
//   border-radius: 2px;
//   font-size: 11px;
//   text-transform: uppercase;
//   letter-spacing: 2px;
//   padding: 8px 12px 5px 12px !important;
//   color: #212529;
// }

.message {
  color: green;
}
</style>