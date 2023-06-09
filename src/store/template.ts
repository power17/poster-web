import axios from 'axios'
import { defineStore } from 'pinia'
export const useTemplateStore = defineStore('templateStore', {
    state: () => {
        return {
            templateData: [],
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
            this.templateData = templateDate.data.list
        },
    },
})
