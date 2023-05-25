<template>
    <!-- <pre class="select-table">{{ props.data }}</pre> -->
    <div class="select-table" v-for="(val, key) in props.data" :key="key">
        <div class="label">{{ val?.text }}</div>
        <component v-if="val" :value="val.value" :is="val?.componentName" v-bind="val.extraAntAttr">
            <template v-if="val.options">
                <component v-for="(option, o) in val.options" :is="val.subComponentName" :key="o" :value="option.value">
                    {{ option.text }}
                </component>
            </template>
        </component>
    </div>
</template>
<script setup lang="ts">
// import { Input } from 'ant-design-vue'
import { componentsMapTYpe } from '../../views/editor/interface'

// import { TextComponentTypeProps } from '../defaultAttr/index'
const props = defineProps<{ data: Readonly<Partial<componentsMapTYpe>> }>()
console.log(props.data)
</script>
<style scoped lang="scss">
.select-table {
    display: flex;
    .label {
        width: 80px;
    }
}
</style>
