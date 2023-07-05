<template>
    <div v-if="!isHidden" class="edit-wrapper" @click="handleEmitData" :class="{ active }">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import useEditorStore from '../../store/editor'
const editStore = useEditorStore()
const props = defineProps<{ id: string; isHidden: boolean }>()
// const emit = defineEmits<{
//     (e: string, id: string): void
// }>()
const emit = defineEmits(['sendItemData'])
const handleEmitData = () => {
    emit('sendItemData', props.id)
}
const active = computed(() => props.id === editStore.currentElementId)
</script>
<style scoped lang="scss">
.edit-wrapper {
    height: 30px;
}
.edit-wrapper.active {
    border: 1px solid #1890ff;
    user-select: none;
    z-index: 1500;
}
</style>
../../store/editor
