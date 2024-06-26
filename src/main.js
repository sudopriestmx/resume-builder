import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPhone, faEnvelope, faHouse } from '@fortawesome/free-solid-svg-icons'

library.add(faPhone, faEnvelope, faHouse)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
