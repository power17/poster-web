<template>
    <div class="p-text-component" :style="props">{{ props.text }}</div>
    <div></div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
// import { ComponentDataType } from '../store/interface/editor'
import { textDefaultProps, TextComponentTypeProps } from './defaultProps/index.ts'
// interface propsDataType {
//     text: string
//     fontSize: string
// }
const props = withDefaults(defineProps<TextComponentTypeProps>(), textDefaultProps)
console.log(props)
</script>
