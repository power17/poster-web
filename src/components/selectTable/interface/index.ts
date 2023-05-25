import { TextComponentTypeProps } from '../../defaultAttr'
export type componentsMapType = {
    [p in keyof TextComponentTypeProps]?: {
        componentName: string | undefined
        extraAntAttr?: { [key: string]: any }
        text?: string
        subComponentName?: string
        options?: { text: string; value: any }[]
        value?: string
        transformDataType?: (data: any) => any
        eventName?: string
        afterTransformDataType?: (data: any) => any
    }
}
export interface FormProps {
    componentName: string | undefined
    subComponentName?: string
    value: string
    extraAntAttr?: { [key: string]: any }
    text?: string
    options?: { text: string; value: any }[]
    key: string
    // valueProp: string
    eventName: string
    // events: { [key: string]: (e: any) => void }
}
export type finalDataType = {
    [P in keyof TextComponentTypeProps]: FormProps
}
