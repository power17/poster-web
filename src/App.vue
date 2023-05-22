<template>
    <router-link to="/">home</router-link>
    <router-link to="/template">template</router-link>
    <router-view></router-view>
    <div></div>
</template>
<script setup lang="ts">
import { useGlobalStore } from './store'
const globalStore = useGlobalStore()
console.log(globalStore.num)
</script>
<style scoped></style>
