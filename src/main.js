import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/sass/style.scss'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import axios from 'axios'
import Notifications from '@kyvg/vue3-notification'

axios.defaults.headers.post['Authorization'] = 'Bearer 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'
axios.defaults.baseURL = 'https://api.openai.com/v1/'

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(Notifications)
app.use(router)

app.mount('#app')
