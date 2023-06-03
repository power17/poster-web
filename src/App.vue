<template>
    <file-upload :before-upload="beforUpload" actions="/api/utils/upload-img" drag></file-upload>
    <router-view></router-view>
</template>
<script setup lang="ts">
import FileUpload from './components/Upload/index.vue'
const beforUpload = () => {
    return true
}
// import { useGlobalStore } from './store'
// const globalStore = useGlobalStore()
</script>
<style scoped lang="scss"></style>
