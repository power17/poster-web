<template>
    <div class="select-table" v-for="(val, key) in finalData" :key="key">
        <!-- <pre> {{ finalData }}</pre> -->
        <div class="label">{{ val?.text }}</div>
        <component
            v-if="val"
            :value="val.value"
            class="select-com"
            v-on:[val.eventName]="($event: any) => handleEmit(val.key, $event)"
            :is="val?.componentName"
            v-bind="val.extraAntAttr"
        >
            <template v-if="val.options">
                <component
                    :is="val?.subComponentName"
                    v-for="(option, k) in val.options"
                    :value="option.value"
                    :key="k"
                >
                    {{ option.text }}
                </component>
            </template>
        </component>
    </div>
    <!-- <div class="select-table" v-for="(val, key) in finalData" :key="key">
        <div class="label">{{ val?.text }}</div>
        <a-select
            v-if="val"
            :value="val.value"
            v-on:[val.eventName]="($event: any) => handleEmit(val.key,$event)"
            :is="val?.componentName"
            v-bind="val.extraAntAttr"
        >
            <template v-if="val.options">
                <a-select-option v-for="(option, k) in val.options" :key="k" :value="option.value">
                    {{ option.text }}
                </a-select-option>
            </template>
        </a-select>
    </div> -->

    <!-- <pre>{{ props.data }}</pre> -->
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { TextComponentTypeProps } from '../defaultAttr/index'
import { componentsMapType, finalDataType } from './interface/index'

const props = defineProps<{ data: Readonly<TextComponentTypeProps> }>()
const componentsMap: componentsMapType = {
    text: {
        componentName: 'a-textarea',
        text: '文字',
        extraAntAttr: { row: 3 },
        subComponentName: '',
    },
    fontSize: {
        componentName: 'a-input-number',
        text: '字号',
        subComponentName: '',
        transformDataType(v: any) {
            return parseInt(v)
        },
        afterTransformDataType(v: any) {
            return `${v ? v : 0}px`
        },
    },
    lineHeight: {
        componentName: 'a-slider',
        subComponentName: '',
        extraAntAttr: { max: 10, min: 0, step: 0.2 },
        text: '行高',
        transformDataType(v: string) {
            return parseFloat(v)
        },
        afterTransformDataType(v: any) {
            return String(v)
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
        value: '',
        options: [
            { text: '无', value: '""' },
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
                componentName: itemMap.componentName || '',
                subComponentName: itemMap.subComponentName,
                text: itemMap.text,
                options: itemMap.options,
                extraAntAttr: itemMap.extraAntAttr,
                eventName: itemMap.eventName ? itemMap.eventName : 'change',
                key: newKey,
            }
        }
    })
    console.log(result)
    return result
})

const emit = defineEmits<{
    (e: 'change', key: any, $event: any): void
}>()
const handleEmit = (key: string, $event: any) => {
    // todo
    let v = $event
    if (typeof $event === 'object') {
        const transform = componentsMap[key as keyof TextComponentTypeProps]?.afterTransformDataType
        v = $event.target.value
        if (transform) {
            v = transform(parseInt(v)) || v
        }
    } else {
        switch (key) {
            case 'fontFamily':
                break
            case 'lineHeight':
                break
            default:
                v = `${v}px`
        }
        // if (key !== 'fontFamily') {
        //     v = `${v}px`
        // }
    }
    // v = parseInt(v)
    emit('change', key, String(v))
}
</script>
<style scoped lang="scss">
.select-table {
    display: flex;
    margin-bottom: 10px;
    flex: 1;

    .select-com {
        flex: 1;
    }

    .label {
        width: 80px;
    }
}
</style>
