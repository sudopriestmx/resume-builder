<template>
  <label id="image-input" :style="backgroundImage" :class="{ circle: imgShape == 'round' }">
    <div>Upload image</div>
    <input type="file" accept="image/jpeg image/png image/jpg" @change="changeImage" />
  </label>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
    },
    imgShape: {
      type: String,
    },
    borderColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
  },
  computed: {
    backgroundImage() {
      return {
        '--background-image-url': `url(${this.imgSrc})`,
        '--border-color': this.borderColor,
        '--text-color': this.textColor,
      }
    },
  },
  methods: {
    changeImage(event) {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          this.$emit('imageChanged', reader.result)
        })

        reader.readAsDataURL(selectedFile)
      }
    },
  },
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border: 5px solid var(--border-color);
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  background-image: var(--background-image-url);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 160px 160px;
}

.circle {
  border-radius: 50%;
}

div {
  display: none;
}

label:hover {
  cursor: pointer;
  background: var(--border-color);
  color: var(--text-color);
}

#image-input:hover div {
  display: block;
}
</style>
