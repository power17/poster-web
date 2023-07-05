import { TextComponentTypeProps } from '../../components/defaultAttr/index.ts'
export interface EditorProps {
    components: ComponentDataType[]
    currentElement: string
}

export interface ComponentDataType {
    props: Partial<TextComponentTypeProps>
    id: string
    name: string
    layerName: string
    isLocked: boolean
    isHidden: boolean
}
