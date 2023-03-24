import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.css'

import axios from './request'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store).use(router).mount('#app')