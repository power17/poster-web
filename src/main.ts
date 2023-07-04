import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import 'cropperjs/dist/cropper.css'
import router from './router'
import { createPinia } from 'pinia'
import './style/inidex.css'
import configAnt from './config/configAnt'
import legoBricks from 'lego-bricks'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia).use(router).use(legoBricks).use(configAnt).mount('#app')

import axios from 'axios'
import { useGlobalStore } from '../src/store/global'
import { message } from 'ant-design-vue'
const baseBackendUrl = 'http://182.92.168.192:8081/api/'
axios.defaults.baseURL = baseBackendUrl
const globalStore = useGlobalStore()
axios.interceptors.request.use((config) => {
    globalStore.startLoading()
    return config
})
axios.interceptors.response.use(
    (resp) => {
        globalStore.finishLoading()
        const { data } = resp
        if (data.errno !== 0) {
            message.error(data.message || '后端接口返回错误')
            return Promise.reject(data)
        }
        return data
    },
    (error) => {
        return Promise.reject(error)
    },
)
