import { defineStore } from 'pinia'
import { ComponentDataType } from './interface/editor'
import { TextComponentTypeProps } from '../components/defaultAttr/index'
import { imageDefaultProps } from 'lego-bricks'
import { v4 as uuidv4 } from 'uuid'
interface editorStoreType {
    components: ComponentDataType[]
    currentElementId: string
}
export const testComponents: ComponentDataType[] = [
    {
        id: uuidv4(),
        name: 'l-text',
        layerName: '图层1',
        isLocked: false,
        isHidden: false,
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
        layerName: '图层2',
        props: { text: 'hello2sf', top: '30px', fontSize: '20px', lineHeight: '1', fontFamily: '"SimHei","STHeiti"' },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        layerName: '图层3',
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
        layerName: '图层4',
        props: {
            ...imageDefaultProps,
            src: 'https://poster-design.oss-cn-shenzhen.aliyuncs.com/pexels-tua%CC%82%CC%81n-kie%CC%A3%CC%82t-jr-1391498.jpg',
            width: '134px',
            top: '100px',
        },
    },
]
interface paramType {
    key: any
    value: any
    isRoot?: boolean
    id?: string
}

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
        updateComponentData({ key, value, isRoot, id }: paramType) {
            const current = this.components.find((component) => component.id === (id || this.currentElementId))
            if (current) {
                if (isRoot) {
                    ;(current as any)[key] = value
                } else {
                    current.props[key as keyof TextComponentTypeProps] = value
                }
            }
        },
    },
})
export default useEditorStore
