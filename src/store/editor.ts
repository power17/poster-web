import { defineStore } from 'pinia'
import { ComponentDataType } from './interface/editor'
import { TextComponentTypeProps } from '../components/defaultAttr/index'
import { imageDefaultProps, textDefaultProps } from 'lego-bricks'
import { v4 as uuidv4 } from 'uuid'
import { PageProps } from '../components/propsMap'
interface editorStoreType {
    components: ComponentDataType[]
    currentElementId: string
    pageData: {
        title: string
        props: PageProps
    }
}
export const testComponents: ComponentDataType[] = [
    {
        id: uuidv4(),
        name: 'l-text',
        layerName: '图层1',
        isLocked: false,
        isHidden: false,
        props: {
            ...textDefaultProps,
            text: 'hello113',
            width: '100px',
            height: '100px',
            backgroundColor: '#cccccc',
            fontSize: '10px',
            textAlign: 'center',
            fontFamily: '"SimHei","STHeiti"',
            top: '10px',
            borderColor: '#000000',
            position: 'absolute',
            left: '10px',
        },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        layerName: '图层2',
        isLocked: false,
        isHidden: false,
        props: {
            borderColor: '#000000',
            text: 'hello2sf',
            top: '30px',
            fontSize: '20px',
            lineHeight: '1',
            fontFamily: '"SimHei","STHeiti"',
        },
    },
    {
        id: uuidv4(),
        name: 'l-text',
        layerName: '图层3',
        isLocked: false,
        isHidden: false,
        props: {
            text: 'hello3',
            color: 'red',
            fontSize: '30px',
            top: '50px',
            fontFamily: '',
            actionType: 'url',
            borderColor: '#000000',
            // url: 'https://www.baidu.com',
        },
    },
    {
        id: uuidv4(),
        name: 'l-image',
        layerName: '图层4',
        isLocked: false,
        isHidden: false,
        props: {
            ...imageDefaultProps,
            src: '/src/assets/mei.jpg',
            width: '134px',
            top: '100px',
            borderColor: '#000000',
        },
    },
]
interface paramType {
    key: any
    value: any
    isRoot?: boolean
    id?: string
}
const pageDefaultProps = {
    backgroundColor: '#ffffff',
    backgroundImage: 'url("/src/assets/mei1.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '560px',
}
const useEditorStore = defineStore({
    id: 'editor',
    state: (): editorStoreType => {
        return {
            components: testComponents,
            currentElementId: testComponents[0].id,
            pageData: {
                title: '页面设置',
                props: pageDefaultProps,
            },
        }
    },
    getters: {
        currentElement(state) {
            const current = state.components.find((component) => component.id === state.currentElementId)
            return current as ComponentDataType
        },
    },
    actions: {
        // 添加组件
        addItem(props: Partial<TextComponentTypeProps>) {
            this.components.push({
                id: uuidv4(),
                name: 'l-text',
                props,
                layerName: '',
                isLocked: false,
                isHidden: false,
            })
        },
        // 选中
        currentSelect(id: string) {
            this.currentElementId = id
        },
        updatePageData({ key, value }: any) {
            this.pageData.props[key as keyof PageProps] = value
        },
        updateComponentData({ key, value, isRoot, id }: paramType) {
            const current = this.components.find((component) => component.id === (id || this.currentElementId))
            if (current) {
                this.currentElementId = id || this.currentElementId
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
