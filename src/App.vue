<template>
    <a-layout-header class="header">
        <div class="page-title">
            <router-link to="/">
                <img alt="power设计" src="./assets/logo.png" class="logo-img" />
                power设计
            </router-link>
            <!-- <inline-edit :value="page.title" @change="titleChange" /> -->
        </div>
        <a-menu class="header-menu" :selectable="false" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
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
    <router-view></router-view>
    <!-- <file-upload :before-upload="beforUpload" actions="/api/utils/upload-img" drag></file-upload> -->
    <!-- <button @click="login">gitee授权登录</button> -->
</template>
<script setup lang="ts">
// import { onMounted } from 'vue'
// import FileUpload from './components/Upload/index.vue'
// import axios from 'axios'
// const beforUpload = () => {
//     return true
// }
// onMounted(() => {
//     window.addEventListener('message', (m) => {
//         const token = m.data
//         axios
//             .get('http://127.0.0.1:7001/api/users/getUserInfo', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then((data) => {
//                 console.log(data)
//             })
//         console.log(m)
//     })
// })
// const login = () => {
//     window.open('http://127.0.0.1:7001/api/users/gitee/oauth', '_blank')
// }
// import { useGlobalStore } from './store'
// const globalStore = useGlobalStore()
</script>
<style scoped lang="scss">
.header-menu {
    width: 550px;
}
:deep(.ant-layout-sider-children) {
    background: #fff;
}

.header {
    display: flex;
    justify-content: space-between;
}
</style>
