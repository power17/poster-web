import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/reset.css'
import router from './router'
import { createPinia } from 'pinia'
import './style/inidex.css'
import configAnt from './config/configAnt'
import legoBricks from 'lego-bricks'
const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia).use(legoBricks).use(configAnt).mount('#app')
