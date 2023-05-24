import { defineStore } from 'pinia'
import { ComponentDataType } from './../interface/editor'
import { TextComponentTypeProps } from './../../components/PText/defaultProps/index'
import { v4 as uuidv4 } from 'uuid'
interface editorStoreType {
    components: ComponentDataType[]
}
export const testComponents: ComponentDataType[] = [
    {
        id: uuidv4(),
        name: 'l-text',
        props: { text: 'hello1', fontSize: '10px', top: '10px', color: 'yellow' },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        props: { text: 'hello2sf', fontSize: '20px', top: '20px' },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        props: {
            text: 'hello3',
            color: 'red',
            fontSize: '30px',
            top: '40px',
            actionType: 'url',
            url: 'https://www.baidu.com',
        },
    },
]

const useEditorStore = defineStore({
    id: 'editor',
    state: (): editorStoreType => ({
        components: testComponents,
    }),
    actions: {
        // 添加组件
        addItem(props: Partial<TextComponentTypeProps>) {
            this.components.push({
                id: uuidv4(),
                name: 'l-text',
                props,
            })
        },
    },
})
export default useEditorStore
