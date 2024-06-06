<template>
  <CustomButton btn-type="primary" @click="exportPdf" style="margin-bottom: 10px">
    Export resume as pdf
  </CustomButton>
</template>

<script>
import CustomButton from './CustomButton.vue'
//import html2pdf from 'html2pdf.js'
export default {
  components: {
    CustomButton,
  },
  props: {
    resumeFormat: {
      type: String,
    },
  },
  methods: {
    exportPdf() {
      const unit = this.resumeFormat == 'a4' ? 'mm' : 'in'
      const pdfConfig = {
        margin: 0,
        filename: 'resume',
        image: {
          type: 'jpeg',
          quality: 1,
        },
        jsPDF: {
          unit: unit,
          format: this.resumeFormat,
        },
      }
      const resume = document.getElementById('resume')
      // eslint-disable-next-line no-undef
      html2pdf().set(pdfConfig).from(resume).save()
    },
  },
}
</script>
