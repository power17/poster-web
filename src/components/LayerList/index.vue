<template>
    <ul class="ant-list-items ant-list-bordered">
        <li
            :class="{ active: currentSelectId === item.id }"
            @click="handleSelect(item.id)"
            v-for="item in list"
            :key="item.id"
            class="ant-list-item"
        >
            <a-tooltip :title="item.isHidden ? '显示' : '隐藏'">
                <a-button shape="circle" @click.stop="handleChange('isHidden', !item.isHidden, true, item.id)">
                    <template #icon v-if="item.isHidden"><EyeOutlined /></template>
                    <template #icon v-else><EyeInvisibleOutlined /></template>
                </a-button>
            </a-tooltip>
            <a-tooltip :title="item.isLocked ? '解锁' : '锁定'">
                <a-button shape="circle" @click.stop="handleChange('isLocked', !item.isLocked, true, item.id)">
                    <template #icon v-if="item.isLocked"><UnlockOutlined /></template>
                    <template #icon v-else><LockOutlined /></template>
                </a-button>
            </a-tooltip>
            <div style="height: 32px; line-height: 32px">{{ item.layerName }}</div>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { ComponentDataType } from '../../store/interface/editor'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined, DragOutlined } from '@ant-design/icons-vue'
defineProps<{ list: ComponentDataType[]; currentSelectId: string }>()
// const currentSelectId = ref('')
const emits = defineEmits(['change', 'select'])
const handleChange = (key: string, value: boolean, isRoot: boolean, id: string) => {
    // currentSelectId.value = id
    emits('change', { key, value, isRoot, id })
}
const handleSelect = (id: string) => {
    // currentSelectId.value = id
    emits('select', id)
}
</script>
<style scoped lang="scss">
.ant-list-item {
    padding: 10px 15px;
    transition: all 0.5s ease-out;
    cursor: pointer;
    justify-content: normal;
    border: 1px solid #fff;
    border-bottom-color: #f0f0f0;
}
.ant-list-item.active {
    border: 1px solid #1890ff;
}
.ant-list-item.ghost {
    opacity: 0.5;
}

.ant-list-item:hover {
    background: #e6f7ff;
}
.ant-list-item > * {
    margin-right: 10px;
}
.ant-list-item button {
    font-size: 12px;
}

.ant-list-item .handle {
    cursor: move;
    margin-left: auto;
}
.ant-list-item .edit-area {
    width: 100%;
}
</style>
