<template>
  <div class="profileCropper">
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />

    <div class="content">
      <section class="cropper-area p-2">
        <p>Your Image</p>
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="4 / 4"
            :src="imgSrc"
            preview=".preview"
          />
        </div>
        <!-- <textarea v-model="data" /> -->
      </section>
      <section class="preview-area p-2">
        <p>Preview</p>
        <div class="preview" />
      </section>
      <section class="cropped-area p-2">
        <p>Cropped</p>
        <div class="cropped-image">
          <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
          <div v-else class="crop-placeholder" />
        </div>
      </section>
    </div>
    <section class="action-area">
        <div class="actions">
          <a href="javascript:;" class="modal-title" role="button" @click.prevent="showFileChooser">
            Choose image
          </a>
          <a href="javascript:;" class="modal-title" v-if="imageSelected" role="button" @click.prevent="reset">
            Reset
          </a>
          <a href="javascript:;" class="modal-title" v-if="imageSelected" role="button" @click.prevent="cropImage">
            Save
          </a> 
          <a href="javascript:;" class="modal-title update-now" v-if="cropImg!=''" role="button" @click.prevent="updateProfile">
            Update Now
          </a>
          
        </div>
      </section>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  props: ['profileImage'],
  components: {
    VueCropper
  },
  data() {
    return {
      imgSrc: '',  
      cropImg: '',
      data: null,
      imageSelected: false,
    }
  },
  mounted(){
    this.imgSrc = this.profileImage;
  },
  methods: {
    updateProfile() {
        try {
          this.$axios.$post('user/update-profile', {image: this.cropImg}).then(res => {
            if (res.status == 200) {
              this.$auth.fetchUser()
              this.$bvModal.hide('changeProfileImage')
            }
          })
        } catch (err) {
          console.log(err)
        }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    flipX() {
      const dom = this.$refs.flipX
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleX(scale)
      dom.setAttribute('data-scale', scale)
    },
    flipY() {
      const dom = this.$refs.flipY
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleY(scale)
      dom.setAttribute('data-scale', scale)
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4)
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4)
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY)
    },
    reset() {
      this.$refs.cropper.reset()
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg)
    },
    setCropBoxData() {
      if (!this.data) return

      this.$refs.cropper.setCropBoxData(JSON.parse(this.data))
    },
    setData() {
      if (!this.data) return

      this.$refs.cropper.setData(JSON.parse(this.data))
    },
    setImage(e) {
      const file = e.target.files[0]
      console.log(file)

      if (file == undefined || file.type.indexOf('image/') === -1) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = event => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }

        reader.readAsDataURL(file)
        this.imageSelected = true;
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    showFileChooser() {
      this.$refs.input.click()
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.profileCropper {
  font-family: "NexaBold", Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  width:100%;
  margin:0px 20px;
  input[type=file] {
    display: none;
  }
  .content {
    display: flex;
    justify-content: space-between;
  }

  .cropper-area ,.preview-area,.cropped-area{
    width: 33%;
  }

  .action-area{
    width:100%;
  }

  .actions {
    margin: 1rem 20px 0px 5px;
  }

  .actions a {
    display: inline-block;
    padding: 5px 10px;
    background: #1ce783;
    color: #343a40;
    text-decoration: none;
    border-radius: 3px;
    font-size:11px !important;
    letter-spacing: 1px;
    margin:0px 5px;
  }

  textarea {
    width: 100%;
    height: 100px;
  }

  .preview-area p {
    margin: 0;
    margin-bottom: 1rem;
  }

  .preview {
    width: 100%;
    overflow: hidden;
  }

  .crop-placeholder {
    width: 100%;
  }

  .cropped-image img {
    max-width: 100%;
  }

  .cropper-area{
    overflow: hidden;
  }
  .cropper-area,.cropped-area,.preview-area{
    height:300px;
  }

  .cropped-area .cropped-image{
    width: 100%;
  }

  .cropped-image,.preview,.img-cropper{
    border:2px dashed #272d33;
    height:244px;
    overflow: hidden;
  }
  .update-now{
    background: #1ce783 !important;
    color:#000 !important;
  }
}
</style>