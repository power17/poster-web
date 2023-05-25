import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/reset.css'
import router from './router'
import pinia from './store'
import './style/inidex.css'
import configAnt from './config/configAnt'
const app = createApp(App)
app.use(router).use(pinia).use(configAnt).mount('#app')
