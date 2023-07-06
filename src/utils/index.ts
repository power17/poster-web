import { isEmpty, mapValues, pick } from 'lodash-es'
import { computed } from 'vue'
import { TextComponentTypeProps } from '../components/defaultAttr'
export const transformToComponentProps = <T extends {}>(props: T) => {
    return mapValues(props, (item) => {
        return {
            type: (item as any).constructor as StringConstructor,
            default: item,
        }
    })
}
export const useComponentCommon = (props: Readonly<Partial<TextComponentTypeProps>>, picks: string[]) => {
    const styleProps = computed(() => pick(props, picks))
    // const styleProps = () => pick(props, picks)
    // const handleClick = () => {
    //     if (props.actionType === 'url' && props.url) {
    //         window.location.href = props.url
    //     }
    // }
    return {
        styleProps,
        // handleClick,
    }
}
export const isEmptyObject = (object: Object) => {
    return Object.keys(object).length === 0
}
export const getDragTargetIndex = (element: HTMLElement, className: string) => {
    while (element) {
        if (element.classList.contains(className)) {
            return element
        } else {
            element = element.parentNode as HTMLElement
        }
    }
    return null
}
