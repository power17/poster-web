<template>
    <div class="p-text-component" :style="styleSheet" @click="handleClick">{{ props.text }}</div>
</template>
<script setup lang="ts">
import { defineProps, StyleValue } from 'vue'
import { pick, without } from 'lodash-es'
import { textDefaultProps, TextComponentTypeProps } from './defaultProps/index.js'
// import { transformToComponentProps } from '../../utils/index.ts'
function getStyleSheet(textData: TextComponentTypeProps) {
    // 剔除样式属性
    const styleKey = without(Object.keys(textData), 'text', 'url', 'actionType')
    const styleSheet = pick(textData, styleKey)
    return styleSheet
}
// const defaultProps = transformToComponentProps(textDefaultProps)
const props = defineProps<{
    text?: string
    top?: string
    fontSize?: string
    url?: string
    actionType?: string
    color?: String
    backgroundColor?: String
    borderWidth?: String
    borderColor?: String
    borderStyle?: String
    borderRadius?: String
    paddingLeft?: String
    paddingRight?: String
    paddingTop?: String
    paddingBottom?: String
    width?: String
    tag?: String
    textAlign?: String
    position?: String
    fontWeight?: String
    textDecoration?: String
}>()
// const props = defineProps(defaultProps)
const textData = Object.assign(textDefaultProps, props)
const styleSheet = getStyleSheet(textData) as StyleValue
const handleClick = () => {
    if (textData.actionType === 'url' && textData.url) {
        window.location.href = textData.url
    }
}
</script>
