import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import pinia from './store'
import './style/inidex.css'
const app = createApp(App)
app.use(router).use(pinia).mount('#app')
