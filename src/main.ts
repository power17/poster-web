import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/reset.css'
import router from './router'
import { createPinia } from 'pinia'
import './style/inidex.css'
import configAnt from './config/configAnt'
import legoBricks from 'lego-bricks'
import axios from 'axios'
import { useGlobalStore } from './store/global'
const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia).use(legoBricks).use(configAnt).mount('#app')

const baseBackendUrl = 'http://182.92.168.192:8081/api/'
axios.defaults.baseURL = baseBackendUrl
const globalStore = useGlobalStore()
axios.interceptors.request.use((config) => {
    globalStore.startLoading()
    return config
})
axios.interceptors.response.use((resp) => {
    globalStore.finishLoading()
    return resp
})
