import { createPinia, defineStore } from 'pinia'
interface globalType {
    num: number
}
export const useGlobalStore = defineStore({
    id: 'global',
    state: (): globalType => ({
        num: 1,
    }),
    actions: {
        add() {
            this.num++
        },
    },
})
const pinia = createPinia()
export default pinia
