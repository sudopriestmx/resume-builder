<template>
  <main class="container">
    <div id="resume" class="d-flex">
      <div class="left-col">
        <div class="resume-section">
          <img :src="imageUrl" alt="profile picture" class="profile-pic" />
          <h4 class="section-headline">{{ headlines[0] }}</h4>
          <div>{{ introText }}</div>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">{{ headlines[1] }}</h4>
          <ul>
            <li>{{ contact.phone }}</li>
            <li>{{ contact.email }}</li>
            <li>{{ contact.address }}</li>
          </ul>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">{{ headlines[2] }}</h4>
          <ul>
            <li v-for="(skill, index) in skills" :key="index">{{ skill }}</li>
          </ul>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">{{ headlines[3] }}</h4>
          <ul>
            <li>Cert1</li>
            <li>Cert2</li>
          </ul>
        </div>
      </div>
      <div class="right-col">
        <div class="personal-name">{{ name }}</div>
        <div class="personal-title">{{ title }}</div>
        <div class="resume-section">
          <h4 class="section-headline">{{ headlines[4] }}</h4>
          <div v-for="(item, index) in experience" :key="index" class="inner-section">
            <div>{{ item.title }}</div>
            <div class="d-flex justify-content-between">
              <div>{{ item.company }}, {{ item.location }}</div>
              <div>{{ item.date }}</div>
            </div>
            <ul>
              <li v-for="(desc, innerIndex) in item.description" :key="innerIndex">{{ desc }}</li>
            </ul>
          </div>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">{{ headlines[5] }}</h4>

          <div v-for="(item, index) in education" :key="index" class="inner-section">
            <div>{{ item.title }}</div>
            <div class="d-flex justify-content-between">
              <div>{{ item.university }}, {{ item.location }}</div>
              <div>{{ item.date }}</div>
            </div>
            <ul>
              <li v-for="(desc, innerIndex) in item.description" :key="innerIndex">{{ desc }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
}
</script>

<style scoped>
#resume {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  /* DIN A4 standard paper size. commonly used for resumes
      For North America letter size use width: 8.5in; height: 11in; */
  height: 297mm;
  width: 210mm;
}
.left-col {
  background-color: var(--background-color-left);
  color: var(--text-color-left);
  border-right: 1px solid var(--highlight-color-left);
  width: 30%;
  padding: 30px;
}
.right-col {
  background-color: var(--background-color-right);
  color: var(--text-color-right);
  width: 70%;
  padding: 30px;
}

.section-headline {
  font-size: 20px;
  font-weight: var(--headline-weight);
  margin-bottom: 15px;
  margin-top: 0;
}

.right-col .section-headline {
  color: var(--highlight-color-right);
}

.left-col .section-headline {
  border-bottom: 1px solid var(--highlight-color-left);
  padding-bottom: 5px;
  margin-right: -30px;
  padding-right: 10px;
  color: var(--highlight-color-left);
}

.resume-section {
  margin-bottom: 30px;
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
  margin-block-end: 0px;
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
  border-radius: 50%;
}

.inner-section {
  margin-bottom: 20px;
}
</style>
