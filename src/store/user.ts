import { defineStore } from 'pinia'
interface userStoreType {
    isLogin: boolean
    userName?: string
}
export const useUserStore = defineStore({
    id: 'user',
    // state: (): userStoreType => ({
    //     isLogin: false,
    //     userName: '',
    // }),
    actions: {
        login(state: userStoreType) {
            state.isLogin = true
            state.userName = 'viking'
        },
        logout(state: userStoreType) {
            state.isLogin = false
        },
    },
})
