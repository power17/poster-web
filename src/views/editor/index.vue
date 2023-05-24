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
                <div v-for="v in editStore.components" :key="v.id">
                    <PText v-bind="v.props"></PText>
                </div>
            </a-layout-content>
            <a-layout-sider>Sider</a-layout-sider>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
import useEditorStore from './../../store/modules/editor.ts'
import defaultTextTemplates from './data/defaultTemplate.ts'
import ComponentList from '../../components/ComponentList/index.vue'
import PText from '../../components/PText/index.vue'
console.log(defaultTextTemplates, 'defaultTextTemplates')
const editStore = useEditorStore()
const handleAddItem = (item: any) => {
    editStore.addItem(item)
}
</script>
<style scoped lang="scss">
::v-deep .ant-layout-sider-children {
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
