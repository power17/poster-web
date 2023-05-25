<template>
    <a-layout>
        <a-layout-header class="header">
            <div class="page-title">
                <router-link to="/">
                    <img alt="power设计" src="../../assets/logo.png" class="logo-img" />
                </router-link>
                <!-- <inline-edit :value="page.title" @change="titleChange" /> -->
            </div>
            <a-menu :selectable="false" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">
                    <a-button type="primary">预览和设置</a-button>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-button type="primary">保存</a-button>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-button type="primary">发布</a-button>
                </a-menu-item>
                <a-menu-item key="4">
                    <user-profile></user-profile>
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout>
            <a-layout-sider>
                <h2>组件列表</h2>
                <div>
                    <ComponentList :list="defaultTextTemplates" @itemClick="handleAddItem"></ComponentList>
                </div>
            </a-layout-sider>
            <a-layout-content class="main">
                <div>content</div>
                <edit-wrapper
                    @sendItemData="handleSendItemData"
                    v-for="v in editStore.components"
                    :id="v.id"
                    :key="v.id"
                >
                    <p-text v-bind="v.props"></p-text>
                </edit-wrapper>
            </a-layout-content>
            <a-layout-sider width="300px">
                <div>组件属性</div>
                <select-table :data="editStore.currentElement" @change="handleChange"></select-table>
                <pre>{{ editStore.currentElement }}</pre>
            </a-layout-sider>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
// import { computed } from 'vue'
import useEditorStore from './../../store/modules/editor.ts'
import defaultTextTemplates from './data/defaultTemplate.ts'
import ComponentList from '../../components/ComponentList/index.vue'
import PText from '../../components/PText/index.vue'
import SelectTable from '../../components/selectTable/index.vue'
import EditWrapper from '../../components/EditWrapper/index.vue'
// import { componentsMapTYpe } from './interface/index'
// import { TextComponentTypeProps } from '../../components/defaultAttr'
const editStore = useEditorStore()
// 改变组件属性
const handleChange = (key: any, value: any) => {
    console.log(key, value)
    editStore.updateComponentData(key, value)
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

.header {
    display: flex;
    justify-content: space-between;
}
.main {
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
