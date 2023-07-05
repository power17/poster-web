<template>
    <a-layout>
        <a-layout>
            <a-layout-sider>
                <h2>组件列表</h2>
                <div class="canvas-area">
                    <ComponentList :list="defaultTextTemplates" @itemClick="handleAddItem"></ComponentList>
                </div>
            </a-layout-sider>
            <a-layout-content class="main">
                <div>画布区域</div>
                <div class="canvas-area">
                    <edit-wrapper
                        @sendItemData="handleSendItemData"
                        v-for="component in editStore.components"
                        :key="component.id"
                        :id="component.id"
                        :props="component.props"
                    >
                        <component :is="component.name" v-bind="component.props" />
                    </edit-wrapper>
                </div>
            </a-layout-content>
            <a-layout-sider width="300px">
                <a-tabs v-model:activeKey="activePanel">
                    <a-tab-pane key="component" tab="属性设置">
                        <select-table :data="editStore.currentElement" @change="handleChange"></select-table>
                    </a-tab-pane>
                    <a-tab-pane key="layer" tab="图层设置" force-render>
                        <layer-list @change="handleChange" :list="editStore.components"></layer-list>
                    </a-tab-pane>
                </a-tabs>

                <pre>{{ editStore.currentElement }}</pre>
            </a-layout-sider>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useEditorStore from './../../store/editor.ts'
import defaultTextTemplates from './data/defaultTemplate.ts'
import ComponentList from '../../components/ComponentList/index.vue'

import SelectTable from '../../components/selectTable/index.vue'
import LayerList from '../../components/LayerList/index.vue'
import EditWrapper from '../../components/EditWrapper/index.vue'

const activePanel = ref('component')
const editStore = useEditorStore()
// 改变组件属性
const handleChange = (data) => {
    editStore.updateComponentData(data)
}
//  添加组件
const handleAddItem = (item: any) => {
    editStore.addItem(item)
}
// 添加属性
const handleSendItemData = (id: string) => {
    editStore.currentSelect(id)
}
</script>
<style scoped lang="scss">
:deep(.ant-layout-sider-children) {
    background: #fff;
}
.main {
    position: relative;
}
.canvas-area {
    position: relative;
}

.editor-container .preview-container {
    padding: 24px;
    margin: 0;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.editor-container .preview-list {
    padding: 0;
    margin: 0;
    min-width: 375px;
    min-height: 200px;
    border: 1px solid #efefef;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    margin-top: 50px;
    max-height: 80vh;
}

.page-title {
    display: flex;
}

.page-title .inline-edit span {
    font-weight: 500;
    margin-left: 10px;
    font-size: 16px;
}

.preview-list.canvas-fix .edit-wrapper > * {
    box-shadow: none !important;
}

.preview-list.canvas-fix {
    position: absolute;
    max-height: none;
}

.layout-col {
    height: 100%;
}
</style>
../../store/editor.ts
