import { TextComponentTypeProps } from '../../components/PText/defaultProps/index.ts'
export interface EditorProps {
    components: ComponentDataType[]
    currentElement: string
}

export interface ComponentDataType {
    props: Partial<TextComponentTypeProps>
    id: string
    name: string
}
