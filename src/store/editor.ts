import { defineStore } from 'pinia'
import { ComponentDataType } from './interface/editor'
import { TextComponentTypeProps } from '../components/defaultAttr/index'
// import { imageDefaultProps } from 'lego-bricks'
import { v4 as uuidv4 } from 'uuid'
interface editorStoreType {
    components: ComponentDataType[]
    currentElementId: string
}
export const testComponents: ComponentDataType[] = [
    {
        id: uuidv4(),
        name: 'l-text',
        props: {
            text: 'hello1',
            fontSize: '10px',
            textAlign: 'center',
            fontFamily: '"SimHei","STHeiti"',
            top: '10px',
        },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        props: { text: 'hello2sf', top: '30px', fontSize: '20px', lineHeight: '1', fontFamily: '"SimHei","STHeiti"' },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        props: {
            text: 'hello3',
            color: 'red',
            fontSize: '30px',
            top: '50px',
            fontFamily: '',
            actionType: 'url',
            // url: 'https://www.baidu.com',
        },
    },
    {
        id: uuidv4(),
        name: 'l-image',
        // layerName: '图层4',
        props: {
            backgroundSize: 'cover',
            backgroundColor: '#fff',
            backgroundRepeat: 'no-repeat',
            top: '100px',
            backgroundImage:
                'url("https://static.imooc-lego.com/upload-files/%E5%B9%BC%E5%84%BF%E5%9B%AD%E8%83%8C%E6%99%AF%E5%9B%BE-994372.jpg")',
            height: '560px',
            text: '',
        },
    },
]

const useEditorStore = defineStore({
    id: 'editor',
    state: (): editorStoreType => ({
        components: testComponents,
        currentElementId: '',
    }),
    getters: {
        currentElement(state) {
            const current = state.components.find((component) => component.id === state.currentElementId) || {
                props: {},
            }
            return current?.props as TextComponentTypeProps
        },
    },
    actions: {
        // 添加组件
        addItem(props: Partial<TextComponentTypeProps>) {
            this.components.push({
                id: uuidv4(),
                name: 'l-text',
                props,
            })
        },
        // 选中
        currentSelect(id: string) {
            this.currentElementId = id
        },
        updateComponentData(key: any, value: any) {
            const current = this.components.find((component) => component.id === this.currentElementId)
            if (current) {
                current.props[key as keyof TextComponentTypeProps] = value
            }
        },
    },
})
export default useEditorStore
