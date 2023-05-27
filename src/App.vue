<template>
    <file-upload actions="/api/utils/upload-img"></file-upload>
    <router-view></router-view>
</template>
<script setup lang="ts">
import FileUpload from './components/Upload/index.vue'

// import { useGlobalStore } from './store'
// const globalStore = useGlobalStore()
</script>
<style scoped lang="scss"></style>
