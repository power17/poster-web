<template>
    <div>home</div>
</template>
<script setup lang="ts">
import { useHomeStore } from './../store/modules/home.ts'
const homeState = useHomeStore()
console.log(homeState.name)
</script>
