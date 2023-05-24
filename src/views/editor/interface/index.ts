import { TextComponentTypeProps } from '../../../components/defaultAttr'
export type TableDataType = {
    [P in keyof TextComponentTypeProps]: {
        componentName?: string
        value?: string
        extraAntAttr?: Object
    }
}

export type componentsMapTYpe = {
    [p in keyof TextComponentTypeProps]?: {
        componentName?: string
        extraAntAttr?: { [key: string]: any }
    }
}
