import { message } from 'ant-design-vue'
import useHotKey from '../hooks/useHotKey'
import useEditorStore from '../store/editor'
// import { cloneDeep } from 'lodash-es'
// import { v4 as uuidv4 } from 'uuid'

const initHotKey = () => {
    const editorStore = useEditorStore()
    useHotKey('ctrl+c, command+c', () => {
        // const cloneComponent = cloneDeep(editorStore.currentElement)
        // cloneComponent.id = uuidv4()
        editorStore.copyComponent()
        message.success('复制成功')
    })
    useHotKey('ctrl+v, command+vs', () => {
        editorStore.pasteComponent()
        message.success('粘贴成功')
    })
    useHotKey('esc', () => {
        editorStore.$patch({
            currentElementId: '',
        })
    })
    useHotKey('backspace, delete', () => {
        editorStore.deleteComponent()
    })
}

export default initHotKey
