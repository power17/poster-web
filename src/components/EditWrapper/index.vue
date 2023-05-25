<template>
    <div class="edit-wrapper" @click="handleEmitData" :class="{ active }">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import useEditorStore from '../../store/modules/editor'
const editStore = useEditorStore()
const props = defineProps<{ id: string }>()
const emit = defineEmits<{
    (e: 'sendItemData', id: string): void
}>()
const handleEmitData = () => {
    emit('sendItemData', props.id)
}
const active = computed(() => props.id === editStore.currentElementId)
</script>
<style scoped lang="scss">
.edit-wrapper.active {
    border: 1px solid #1890ff;
    user-select: none;
}
</style>
