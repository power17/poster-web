import axios from 'axios'
import { defineStore } from 'pinia'
import { RespListDataType, TemplateType, ListType } from './resType'
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
