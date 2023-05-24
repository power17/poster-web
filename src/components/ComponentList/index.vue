<template>
    <div class="component-list" v-for="(val, index) in props.list" :key="index">
        <PText v-bind="val"></PText>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import PText from '../PText/index.vue'

const props = defineProps<{ list: Object[] }>()
</script>
<style scoped lang="scss">
.component-list {
    margin-bottom: 10px;
}
</style>
