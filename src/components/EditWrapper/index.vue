<template>
    <div
        v-if="!isHidden"
        ref="currentElement"
        :style="wrapPosition"
        class="edit-wrapper"
        @click.stop="handleEmitData"
        :class="{ active }"
        @mousedown="startMove"
    >
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import useEditorStore from '../../store/editor'
import { pick } from 'lodash-es'
// import { TextComponentProps } from 'lego-bricks'
const editStore = useEditorStore()
const props = defineProps<{ id: string; isHidden: boolean; props: Object }>()
// 获取定位属性
const wrapPosition = computed(() => pick(props.props, ['position', 'left', 'top', 'bottom', 'left']))
// 发送数据
const emit = defineEmits(['sendItemData'])
const handleEmitData = () => {
    emit('sendItemData', props.id)
}
// 选中高亮
const active = computed(() => props.id === editStore.currentElementId)
// 拖动移动
const currentElement = ref<null | HTMLElement>(null)

const startMove = (e: MouseEvent) => {
    const grap = { x: 0, y: 0 }
    if (currentElement.value) {
        const { left, top } = currentElement.value.getBoundingClientRect()
        grap.x = e.clientX - left
        grap.y = e.clientY - top
    }
    // 鼠标移动
    const handleMove = (e: MouseEvent) => {
        // 获取画布的距离
        const canvasArea = document.getElementById('canvas-area') as HTMLElement
        const { left, top } = canvasArea.getBoundingClientRect()
        const elementLeft = e.clientX - left - grap.x
        const elementTop = e.clientY - top - grap.y
        console.log(elementLeft)
        // 设置位置
        if (currentElement.value) {
            currentElement.value.style.left = elementLeft + 'px'
            currentElement.value.style.top = elementTop + 'px'
        }
    }
    document.addEventListener('mousemove', handleMove)
}
</script>
<style scoped lang="scss">
.edit-wrapper {
    position: absolute;
}
.edit-wrapper.active {
    border: 1px solid #1890ff;
    user-select: none;
    z-index: 1500;
}
</style>
