import { message } from 'ant-design-vue'
import axios from 'axios'
import { defineStore } from 'pinia'
interface userInfoType {
    nickName: ''
}
interface userStoreType {
    isLogin: boolean
    userName?: string
    token?: string
    userInfo: userInfoType
}
interface payloadType {
    phoneNumber: string
    veriCode: string
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): userStoreType => ({
        isLogin: false,
        userInfo: {} as userInfoType,
    }),
    actions: {
        login: async function (payload: payloadType) {
            const res = await axios.post('/users/loginByPhoneNumber', payload)
            if (res.data.errno !== 0) {
                message.error(res.data.message)
                return false
            }
            this.token = res.data.data.token
            this.isLogin = true
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
            return this.token
        },
        fetchCurrentUser: async function () {
            const res = await axios.get('/users/getUserInfo')
            console.log(res.data.data)
            this.userInfo = res.data.data
            return this.userInfo
        },
        loginAndFetch: async function (payload: payloadType) {
            const loginRes = await this.login(payload)
            await this.fetchCurrentUser()
            if (!loginRes) {
                return false
            }
            return true
        },
        logout(state: userStoreType) {
            state.isLogin = false
        },
    },
})
