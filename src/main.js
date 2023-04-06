import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/es/notification/style/css.js'
import { VagmiPlugin } from 'vagmi'
import { client } from '@/utils/vagmi'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ArcoVueIcon)
app.use(router)
app.use(VagmiPlugin(client))
app.mount('#app')
