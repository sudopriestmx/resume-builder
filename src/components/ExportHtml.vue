<template>
  <CustomButton btn-type="primary" @click="exportHtml" style="margin-bottom: 10px">
    Export resume as html
  </CustomButton>
</template>

<script>
import CustomButton from './CustomButton.vue'
import stringifyRule from 'https://unpkg.com/stringify-css-stylesheet/index.js'

export default {
  components: {
    CustomButton,
  },
  methods: {
    exportHtml() {
      const resume = document.getElementById('resume')

      let styles = ''
      for (let stylesheet of document.styleSheets) {
        styles += stringifyRule(stylesheet)
      }

      const htmlString =
        '<!doctype html><html><head><style>' +
        styles +
        '</style></head><body><div class="html-export-container">' +
        resume.outerHTML +
        '</div></body></html>'

      var resumeFileBlob = new Blob([htmlString], { type: 'text/html' })

      const a = document.createElement('a')
      a.download = 'Resume.html'
      a.href = window.URL.createObjectURL(resumeFileBlob)

      a.dispatchEvent(new MouseEvent('click'))
    },
  },
}
</script>
