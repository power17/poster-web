<template>
    <div class="p-text-component" :style="styleSheet" @click="handleClick">{{ props.text }}</div>
</template>
<script setup lang="ts">
import { defineProps, StyleValue } from 'vue'
import { pick, without } from 'lodash-es'
import { textDefaultProps, TextComponentTypeProps } from './defaultProps/index.ts'

// import { transformToComponentProps } from '../../utils/index.ts'
function getStyleSheet(textData: TextComponentTypeProps) {
    // 剔除样式属性
    const styleKey = without(Object.keys(textData), 'text', 'url', 'actionType')
    const styleSheet = pick(textData, styleKey)
    return styleSheet
}
// const defaultProps = transformToComponentProps(textDefaultProps)
const props = defineProps<Readonly<Partial<TextComponentTypeProps>>>()
// const props = defineProps<{
//     text?: string
//     top?: string
//     fontSize?: string
//     url?: string
//     actionType?: string
//     color?: String
//     backgroundColor?: String
//     borderWidth?: String
//     borderColor?: String
//     borderStyle?: String
//     borderRadius?: String
//     paddingLeft?: String
//     paddingRight?: String
//     paddingTop?: String
//     paddingBottom?: String
//     width?: String
//     tag?: String
//     textAlign?: String
//     position?: String
//     fontWeight?: String
//     textDecoration?: String
// }>()

// const props = defineProps<ComponentDataPropsType>()

// const props = defineProps(defaultProps)
const textData = Object.assign(textDefaultProps, props)

// 获取样式属性
const styleSheet = getStyleSheet(textData) as StyleValue
const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
        window.location.href = props.url
    }
}
</script>
