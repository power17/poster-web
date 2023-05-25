<template>
    <!-- <pre class="select-table">{{ props.data }}</pre> -->
    <!-- <a-slider id="test" value="1" /> -->
    <div class="select-table" v-for="(val, key) in finalData" :key="key">
        <div class="label">{{ val?.text }}</div>
        <component
            v-if="val"
            :value="val.value"
            v-on:[val.eventName]="($event: any) => handleEmit(val.key,$event)"
            :is="val?.componentName"
            v-bind="val.extraAntAttr"
        >
            <template v-if="val.options">
                <component v-for="(option, o) in val.options" :is="val.subComponentName" :key="o" :value="option.value">
                    {{ option.text }}
                </component>
            </template>
        </component>
    </div>
    <!-- <pre>{{ props.data }}</pre> -->
</template>
<script setup lang="ts">
// import { Input } from 'ant-design-vue'
// import { componentsMapTYpe } from '../../views/editor/interface'

import { computed } from 'vue'
import { TextComponentTypeProps } from '../defaultAttr/index'
import { componentsMapType, finalDataType } from './interface/index'
const props = defineProps<{ data: Readonly<TextComponentTypeProps> }>()

const componentsMap: componentsMapType = {
    text: {
        componentName: 'a-input',
        text: '文字',
    },
    fontSize: {
        componentName: 'a-input',
        text: '字体',
        transformDataType(v: string) {
            return parseInt(v)
        },
        afterTransformDataType(v: any) {
            return `${v ? v : 0}px`
        },
    },
    lineHeight: {
        componentName: 'a-slider',
        extraAntAttr: { max: 3, min: 0, step: 1 },
        text: '行高',
        transformDataType(v: string) {
            return parseInt(v)
        },
    },
    textAlign: {
        componentName: 'a-radio-group',
        text: '对齐',
        subComponentName: 'a-radio-button',
        options: [
            {
                value: 'left',
                text: '左',
            },
            {
                value: 'center',
                text: '中',
            },
            {
                value: 'right',
                text: '右',
            },
        ],
    },
    fontFamily: {
        componentName: 'a-select',
        subComponentName: 'a-select-option',
        text: '字体',
        options: [
            { text: '宋体', value: '"SimSun","STSong"' },
            { text: '黑体', value: '"SimHei","STHeiti"' },
            { text: '楷体', value: '"KaiTi","STKaiti"' },
            { text: '仿宋', value: '"FangSong","STFangsong"' },
        ],
    },
}
const finalData = computed(() => {
    let result = {} as finalDataType
    Object.keys(props.data).map((key) => {
        const newKey = key as keyof TextComponentTypeProps
        const item = props.data[newKey]
        const itemMap = componentsMap[newKey]
        if (itemMap) {
            result[newKey] = {
                value: itemMap.transformDataType ? itemMap.transformDataType(item) : item,
                componentName: itemMap.componentName,
                subComponentName: itemMap.subComponentName,
                text: itemMap.text,
                options: itemMap.options,
                extraAntAttr: itemMap.extraAntAttr,
                eventName: itemMap.eventName ? itemMap.eventName : 'change',
                key: newKey,
            }
        }
    })
    return result
})

const emit = defineEmits<{
    (e: 'change', key: any, $event: any): void
}>()
const handleEmit = (key: keyof TextComponentTypeProps, $event: any) => {
    const transform = componentsMap[key]?.afterTransformDataType
    let v = $event.target.value
    if (transform) {
        v = transform(parseInt(v)) || v
    }

    // v = parseInt(v)
    emit('change', key, v)
}
</script>
<style scoped lang="scss">
.select-table {
    display: flex;
    .label {
        width: 80px;
    }
}
</style>
