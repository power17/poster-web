import { defineStore } from 'pinia'
interface homeStoreType {
    name: string
}
export const useHomeStore = defineStore({
    id: 'home',
    state: (): homeStoreType => ({
        name: 'nini',
    }),
})
