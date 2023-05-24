<template>
    <!-- <pre class="select-table">{{ props.data }}</pre> -->
    <div v-for="(val, key) in props.data" :key="key">
        <component v-if="val" :value="val.value" :is="val?.componentName" v-bind="val.extraAntAttr"></component>
    </div>

    <a-input :value="10" placeholder="Basic usage" />
    <!-- <a-button type="primary">Primary Button</a-button> -->
</template>
<script setup lang="ts">
// import { Input } from 'ant-design-vue'
import { TableDataType } from '../../views/editor/interface'

// import { TextComponentTypeProps } from '../defaultAttr/index'
const props = defineProps<{ data: Readonly<Partial<TableDataType>> }>()
console.log(props.data)
</script>
