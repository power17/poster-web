export interface EditorProps {
    components: ComponentDataType[]
    currentElement: string
}
export interface ComponentDataType {
    props: { [key: string]: any }
    id: string
    name: string
}
