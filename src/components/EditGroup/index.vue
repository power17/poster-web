<template>
    <div class="edit-groups">
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel v-for="(item, key) in editGroups" :key="`item-${key}`" :header="item.text">
                <select-table @change="handleChange" :data="item.propsMap"></select-table>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import SelectTable from '../SelectTable/index.vue'
import { AllComponentProps } from 'lego-bricks'
import { computed, ref } from 'vue'
import { difference } from 'lodash-es'
import { defaultEditGroups } from './defaultEditGroup'
export interface GroupProps {
    text: string
    items: string[]
}
const activeKey = ref('item-0')
const props = withDefaults(defineProps<{ data: AllComponentProps; groups?: GroupProps[] }>(), {
    groups: defaultEditGroups,
})

const newGroups = computed(() => {
    const allNormalGroup = props.groups.reduce((pre, curr) => {
        return [...pre, ...curr.items]
    }, [] as string[])
    const specialProps = difference(Object.keys(props.data), allNormalGroup)
    return [
        {
            text: '基本属性',
            items: specialProps,
        },
        ...props.groups,
    ]
})
const editGroups = computed(() => {
    return newGroups.value.map((group) => {
        const propsMap = {} as AllComponentProps
        group.items.forEach((key) => {
            propsMap[key] = props.data[key]
        })
        group.propsMap = propsMap
        return group
    })
})
const emits = defineEmits(['change'])
const handleChange = ({ key, value }) => {
    console.log({ key, value })
    emits('change', { key, value })
}
</script>
