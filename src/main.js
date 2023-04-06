import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')
