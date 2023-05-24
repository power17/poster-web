<template>
    <div class="p-text-component" :style="styleSheet">{{ props.text }}</div>
    <div></div>
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
}>()
const textData = Object.assign(textDefaultProps, props)
const styleSheet = getStyleSheet(textData) as StyleValue
</script>
