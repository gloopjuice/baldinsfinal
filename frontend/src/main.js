import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import header from './components/Header.vue'

import axios from 'axios';

axios.defaults.baseURL = 'https://api-21dp2ggaga.kvalifikacija.rvt.lv/login/api/';

const app = createApp(App)

app.use(router)

app.mount('#app')
