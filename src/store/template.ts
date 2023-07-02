import axios from 'axios'
import { defineStore } from 'pinia'
interface RespType<T> {
    errno: number
    data: T
}
interface ListType<T> {
    count: number
    list: T[]
}
type RespListDataType<T> = RespType<ListType<T>>

export interface TemplateType {
    id: number
    title: string
    coverImg: string
    author: string
    copiedCount: number
    isHot: boolean
    isNew: boolean
}
interface State {
    data: RespListDataType<TemplateType>
}

export const useTemplateStore = defineStore('templateStore', {
    state: (): State => {
        return {
            data: {
                errno: 0,
                data: {} as ListType<TemplateType>,
            },
        }
    },
    actions: {
        fetchTemplate: async function () {
            const templateDate = await axios.get('/templates', {
                params: {
                    pageIndex: 0,
                    pageSize: 8,
                },
            })
            this.data = templateDate.data
        },
    },
})
