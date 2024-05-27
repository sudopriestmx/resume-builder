<template>
  <main class="container">
    <div id="resume" class="d-flex">
      <div class="left-col">
        <div class="resume-section">
          <h4 class="section-headline">About me</h4>
          <div>Experienced Back-End developer passionate about performant APIs.</div>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">Contact</h4>
          <ul>
            <li>+52(222)2938812</li>
            <li>hi@joseortiz.dev</li>
          </ul>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">Skills</h4>
          <ul>
            <li>Node.JS</li>
            <li>TypeScript</li>
            <li>Fastify</li>
            <li>AWS Lambda</li>
            <li>MongoDB</li>
            <li>Vue.js</li>
          </ul>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">Certifications</h4>
          <ul>
            <li>Cert1</li>
            <li>Cert2</li>
          </ul>
        </div>
      </div>
      <div class="right-col">
        <div class="personal-name">Jose Pablo Ortiz Lack</div>
        <div class="personal-title">Senior Back-End Developer</div>
        <div class="resume-section">
          <h4 class="section-headline">Experience</h4>
          <div>Senior Back-End Developer - KYC Core</div>
          <div>NaranjaX, Argentina (Remote), October 2021 - Present</div>
          <ul>
            <li>
              Designed and implemented a system to acquire, validate, and update compliance
              information from clients to offer them financial products.
            </li>
            <li>
              Implemented a resilience mechanism during the data normalization process, allowing
              retries during external information provider outages, reducing number of incomplete
              normalization processes to almost 0.
            </li>
          </ul>
        </div>
        <div class="resume-section">
          <h4 class="section-headline">Education</h4>
          <div>BSc. in Computer Technologies Engineering</div>
          <div>Tecnológico de Monterrey, Puebla, 2012-2017</div>
          <ul>
            <li>
              Graduation Project: Implementation of a Smart Light Network using the Zigbee Standard,
              a Raspberry Pi, and the Raspbee module to manage the network.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

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
</style>
