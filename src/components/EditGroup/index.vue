<template>
    <div class="edit-groups">
        <div v-for="(item, index) in newGrops" :key="index">
            <div>{{ item.text }}</div>
            <pre>{{ item.items }}</pre>
        </div>
    </div>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import { AllComponentProps } from 'lego-bricks'
import { computed } from 'vue'
import { difference } from 'lodash-es'
import { defaultEditGroups } from './defaultEditGroup'
export interface GroupProps {
    text: string
    items: string[]
}
const props = withDefaults(defineProps<{ data: AllComponentProps; groups?: GroupProps[] }>(), {
    groups: defaultEditGroups,
})

const newGrops = computed(() => {
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
</script>
