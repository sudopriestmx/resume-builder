<template>
  <main class="container">
    <Sidebar>
      <ToggleSwitch label="Edit mode" off-label="Export Mode" @switch-toggled="toggleEditMode" />

      <div class="sidebar-section" v-if="!editing">
        <SelectInput
          label="Resume format"
          :options="[
            { name: 'A4', value: 'a4' },
            { name: 'Letter', value: 'letter' },
          ]"
          :default-option="resumeFormat"
          @update-selection="resumeFormat = $event"
        />

        <ExportPdf :resume-format="resumeFormat" />
      </div>

      <div class="sidebar-section" v-if="editing">
        <div class="sidebar-title">Left column</div>
        <ColorInput
          label="Highlight color"
          :default-color="colors.left.highlight"
          @color-changed="colors.left.highlight = $event"
        />
        <ColorInput
          label="Background color"
          :default-color="colors.left.background"
          @color-changed="colors.left.background = $event"
        />
        <ColorInput
          label="Text color"
          :default-color="colors.left.text"
          @color-changed="colors.left.text = $event"
        />
      </div>
      <div class="sidebar-section" v-if="editing">
        <div class="sidebar-title">Right column</div>
        <ColorInput
          label="Highlight color"
          :default-color="colors.right.highlight"
          @color-changed="colors.right.highlight = $event"
        />
        <ColorInput
          label="Background color"
          :default-color="colors.right.background"
          @color-changed="colors.right.background = $event"
        />
        <ColorInput
          label="Text color"
          :default-color="colors.right.text"
          @color-changed="colors.right.text = $event"
        />
      </div>
      <div class="sidebar-section" v-if="editing">
        <PercentageInput
          label="Width of left column"
          :min="20"
          :max="80"
          :current-value="widthLeft"
          @percentage-changed="widthLeft = $event"
        />

        <SelectInput
          label="Headline thickness"
          :options="[
            { name: 'Thin', value: '300' },
            { name: 'Medium', value: '400' },
            { name: 'Thick', value: '600' },
          ]"
          :default-option="headlineWeight"
          @update-selection="headlineWeight = $event"
        />
      </div>

      <div class="sidebar-section" v-if="editing">
        <ToggleSwitch label="Show photo" @switch-toggled="toggleImageDisplay" />

        <SelectInput
          v-if="showImage"
          label="Photo shape"
          :options="[
            { name: 'Square', value: 'square' },
            { name: 'Round', value: 'round' },
          ]"
          :default-option="imageShape"
          @update-selection="imageShape = $event"
        />

        <ImgUpload v-if="showImage" @image-changed="imageUrl = $event" />
      </div>
    </Sidebar>
    <div class="resume-wrapper">
      <div
        id="resume"
        class="d-flex"
        :class="{ 'edit-off': !editing, 'letter-format': resumeFormat == 'letter' }"
        :style="cssVariables"
      >
        <div class="left-col" :style="{ width: percentageWidthLeft }">
          <ResumeSection>
            <img
              v-if="showImage"
              :src="imageUrl"
              alt="profile picture"
              class="profile-pic"
              :class="{ circle: imageShape == 'round' }"
            />
            <SectionHeadline
              :headline="headlines[0]"
              @headline-edited="updateHeadline($event, 0)"
              :editing="editing"
            />
            <div :contenteditable="editing" @blur="updateProperty($event, 'introText')">
              {{ introText }}
            </div>
          </ResumeSection>
          <ResumeSection>
            <SectionHeadline
              :headline="headlines[1]"
              @headline-edited="updateHeadline($event, 1)"
              :editing="editing"
            />
            <ContactData
              :contact="contact"
              @edit="updateNestedProperty"
              :editing="editing"
              :icon-color="colors.left.highlight"
            />
          </ResumeSection>
          <ResumeSection>
            <SectionHeadline
              :headline="headlines[2]"
              @headline-edited="updateHeadline($event, 2)"
              :editing="editing"
            />
            <ul>
              <li
                v-for="(skill, index) in skills"
                :key="index"
                :contenteditable="editing"
                @blur="updateNestedProperty($event, 'skills', index)"
              >
                {{ skill }}
              </li>
            </ul>
            <EditButtons
              @add-click="skills.push('new entry')"
              @remove-click="skills.pop()"
              :show-remove-btn="skills.length > 0"
            />
          </ResumeSection>
          <ResumeSection>
            <SectionHeadline
              :headline="headlines[3]"
              @headline-edited="updateHeadline($event, 3)"
              :editing="editing"
            />
            <ul>
              <li
                v-for="(certification, index) in certifications"
                :key="index"
                :contenteditable="editing"
                @blur="updateNestedProperty($event, 'certifications', index)"
              >
                {{ certification }}
              </li>
            </ul>
            <EditButtons
              @add-click="certifications.push('new entry')"
              @remove-click="certifications.pop()"
              :show-remove-btn="skills.length > 0"
            />
          </ResumeSection>
        </div>
        <div class="right-col">
          <div
            class="personal-name"
            :contenteditable="editing"
            @blur="updateProperty($event, 'name')"
          >
            {{ name }}
          </div>
          <div
            class="personal-title"
            :contenteditable="editing"
            @blur="updateProperty($event, 'title')"
          >
            {{ title }}
          </div>
          <ResumeSection>
            <div class="d-flex">
              <SectionHeadline
                :headline="headlines[4]"
                @headline-edited="updateHeadline($event, 4)"
                :editing="editing"
              />
              <EditButtons
                :show-remove-btn="false"
                :text-add="'Add Experience'"
                @add-click="addExperience"
              />
            </div>
            <div v-for="(item, index) in experience" :key="index" class="inner-section">
              <div class="d-flex justify-content-between">
                <div :contenteditable="editing" @blur="updateExperience($event, 'title', index)">
                  {{ item.title }}
                </div>
                <EditButtons @remove-click="removeExperience(index)" :show-add-btn="false" />
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  <span
                    :contenteditable="editing"
                    @blur="updateExperience($event, 'company', index)"
                  >
                    {{ item.company }} </span
                  >,
                  <span
                    :contenteditable="editing"
                    @blur="updateExperience($event, 'location', index)"
                  >
                    {{ item.location }}
                  </span>
                </div>
                <div :contenteditable="editing" @blur="updateExperience($event, 'date', index)">
                  {{ item.date }}
                </div>
              </div>
              <ul>
                <li
                  v-for="(desc, innerIndex) in item.description"
                  :key="innerIndex"
                  :contenteditable="editing"
                  @blur="updateExperienceDescription($event, index, innerIndex)"
                >
                  {{ desc }}
                </li>
              </ul>
              <EditButtons
                @add-click="item.description.push('new entry')"
                @remove-click="item.description.pop()"
                :show-remove-btn="item.description.length > 0"
              />
            </div>
          </ResumeSection>
          <ResumeSection>
            <div class="d-flex">
              <SectionHeadline
                :headline="headlines[5]"
                @headline-edited="updateHeadline($event, 5)"
                :editing="editing"
              />
              <EditButtons
                :show-remove-btn="false"
                :text-add="'Add Education'"
                @add-click="addEducation"
              />
            </div>
            <div v-for="(item, index) in education" :key="index" class="inner-section">
              <div class="d-flex justify-content-between">
                <div :contenteditable="editing" @blur="updateEducation($event, 'title', index)">
                  {{ item.title }}
                </div>
                <EditButtons @remove-click="removeEducation(index)" :show-add-btn="false" />
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  <span
                    :contenteditable="editing"
                    @blur="updateEducation($event, 'university', index)"
                  >
                    {{ item.university }} </span
                  >,
                  <span
                    :contenteditable="editing"
                    @blur="updateEducation($event, 'location', index)"
                  >
                    {{ item.location }}
                  </span>
                </div>
                <div :contenteditable="editing" @blur="updateEducation($event, 'date', index)">
                  {{ item.date }}
                </div>
              </div>
              <ul>
                <li
                  v-for="(desc, innerIndex) in item.description"
                  :key="innerIndex"
                  :contenteditable="editing"
                  @blur="updateEducationDescription($event, index, innerIndex)"
                >
                  {{ desc }}
                </li>
              </ul>
              <EditButtons
                @add-click="item.description.push('new entry')"
                @remove-click="item.description.pop()"
                :show-remove-btn="item.description.length > 0"
              />
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ResumeSection from './components/ResumeSection.vue'
import SectionHeadline from './components/SectionHeadline.vue'
import ContactData from './components/ContactData.vue'
import EditButtons from './components/EditButtons.vue'
import ToggleSwitch from './components/ToggleSwitch.vue'
import Sidebar from './components/Sidebar.vue'
import ColorInput from './components/ColorInput.vue'
import PercentageInput from './components/PercentageInput.vue'
import SelectInput from './components/SelectInput.vue'
import ImgUpload from './components/ImgUpload.vue'
import ExportPdf from './components/ExportPdf.vue'

export default {
  components: {
    ResumeSection,
    SectionHeadline,
    ContactData,
    EditButtons,
    ToggleSwitch,
    Sidebar,
    ColorInput,
    PercentageInput,
    SelectInput,
    ImgUpload,
    ExportPdf,
  },
  data() {
    return {
      colors: {
        left: {
          highlight: '#82c0cc',
          text: '#ffffff',
          background: '#3943b7',
        },
        right: {
          highlight: '#3943b7',
          text: '#000505',
          background: '#ffffff',
        },
      },
      name: 'Jose Pablo Ortiz Lack',
      title: 'Senior Back-End Developer',
      introText: 'Experienced Back-End developer passionate about performant APIs.',
      imageUrl: '/profile_pic.jpeg',
      headlines: ['About me', 'Contact', 'Skills', 'Certifications', 'Experience', 'Education'],
      contact: {
        phone: '+52(222)2938812',
        email: 'hi@joseortiz.dev',
        address: 'Placeholder address',
      },
      skills: ['Node.JS', 'TypeScript', 'Fastify', 'AWS Lambda', 'MongoDB', 'Vue.js'],
      certifications: ['Cert1', 'Cert2'],
      experience: [
        {
          title: 'Senior Back-End Developer - KYC',
          company: 'NaranjaX',
          location: 'Argentina (Remote)',
          date: '2024 - Present',
          description: [
            'Designed and implemented a system to acquire, validate, and update compliance information from clients to offer them financial products.',
          ],
        },
        {
          title: 'Senior Back-End Developer - Onboarding',
          company: 'NaranjaX',
          location: 'Argentina (Remote)',
          date: '2021 - 2024',
          description: [
            'Migrated API calls from a third party biometrics validation service from an OnPremise server to a cloud endpoint provided by them, reducing response times, accessing the latest version of their API, and reducing infraestructure costs.',
            'Implemented a resilience mechanism during the data normalization process, allowing retries during external information provider outages, reducing number of incomplete normalization processes to almost 0.',
          ],
        },
        {
          title: 'Company Team Lead - Node.JS',
          company: 'Distillery',
          location: 'Mexico',
          date: '2021 - Present',
          description: [
            'Manager of a team of 10 Node.JS developers, working on their growing, learning and development plan at Distillery, their clients, and professional careers, following up on thier day to day activities, and technical and non-technical learning.',
            'Volunteer as Senior Technical Interviewer for Node.JS candidates of all levels.',
          ],
        },
      ],
      education: [
        {
          title: 'BSc. in Computer Technologies Engineering',
          university: 'Tecnológico de Monterrey',
          location: 'Puebla',
          date: '2012 - 2017',
          description: [
            'Graduation Project: Implementation of a Smart Light Network using the Zigbee Standard, a Raspberry Pi, and the Raspbee module to manage the network.',
          ],
        },
      ],
      editing: true,
      widthLeft: 30,
      imageShape: 'round',
      headlineWeight: '400',
      showImage: true,
      resumeFormat: 'a4',
    }
  },
  computed: {
    cssVariables() {
      return {
        '--highlight-color-left': this.colors.left.highlight,
        '--background-color-left': this.colors.left.background,
        '--text-color-left': this.colors.left.text,
        '--highlight-color-right': this.colors.right.highlight,
        '--background-color-right': this.colors.right.background,
        '--text-color-right': this.colors.right.text,
        '--headline-weight': this.headlineWeight,
      }
    },
    percentageWidthLeft() {
      return this.widthLeft + '%'
    },
  },
  methods: {
    updateHeadline(newValue, index) {
      this.headlines[index] = newValue
    },
    updateProperty(event, key) {
      this[key] = event.target.innerText
    },
    updateNestedProperty(event, key1, key2) {
      this[key1][key2] = event.target.innerText
    },
    updateExperience(event, key, index) {
      this.experience[index][key] = event.target.innerText
    },
    updateExperienceDescription(event, index1, index2) {
      this.experience[index1]['description'][index2] = event.target.innerText
    },
    updateEducation(event, key, index) {
      this.education[index][key] = event.target.innerText
    },
    updateEducationDescription(event, index1, index2) {
      this.education[index1]['description'][index2] = event.target.innerText
    },
    addExperience() {
      this.experience.unshift({
        title: 'Job Title',
        company: 'Company',
        location: 'Location',
        date: 'date range',
        description: ['description'],
      })
    },
    addEducation() {
      this.education.unshift({
        title: 'Education title',
        university: 'University',
        location: 'Location',
        date: 'date range',
        description: ['description'],
      })
    },
    removeExperience(index) {
      this.experience.splice(index, 1)
    },
    removeEducation(index) {
      this.education.splice(index, 1)
    },
    toggleEditMode(isChecked) {
      this.editing = isChecked
    },
    toggleImageDisplay(isChecked) {
      this.showImage = isChecked
    },
  },
}
</script>

<style scoped>
.resume-wrapper {
  width: 210mm;
  margin-left: auto;
}

#resume {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  /* DIN A4 standard paper size. commonly used for resumes
      For North America letter size use width: 8.5in; height: 11in; */
}

#resume.edit-off {
  height: 297mm;
}

#resume.edit-off.letter-format {
  width: 8.5in;
  height: 11in;
}

@media (min-width: 1350px) {
  .resume-wrapper {
    margin-left: 300px;
  }
}

@media (min-width: 1600px) {
  .resume-wrapper {
    margin-left: auto;
    margin-right: auto;
  }
}
.left-col {
  background-color: var(--background-color-left);
  color: var(--text-color-left);
  border-right: 1px solid var(--highlight-color-left);
  padding: 30px;
}
.right-col {
  background-color: var(--background-color-right);
  color: var(--text-color-right);
  width: 70%;
  padding: 30px;
}

.personal-name {
  font-weight: 300;
  color: var(--highlight-color-right);
  font-size: 28px;
  border-bottom: 1px solid var(--highlight-color-right);
  margin: 0;
  margin-left: -30px;
  padding-left: 30px;
  padding-bottom: 15px;
}

.personal-title {
  border-bottom: 1px solid var(--highlight-color-right);
  margin: 0 0 20px -30px;
  padding: 15px 0 15px 30px;
  font-weight: 300;
  font-size: 20px;
}

#resume ul {
  padding-inline-start: 16px;
  margin-block-end: 5px;
  margin-block-start: 5px;
}

.profile-pic {
  display: block;
  width: 160px;
  height: 160px;
  border: 5px solid var(--highlight-color-left);
  margin-bottom: 20px;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}

.circle {
  border-radius: 50%;
}

.inner-section {
  margin-bottom: 20px;
}
</style>
