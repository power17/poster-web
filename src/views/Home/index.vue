<template>
    <div class="content-container">
        <a-row :gutter="16">
            <template-list :list="templateData"></template-list>
        </a-row>
        <a-row type="flex" justify="center"></a-row>
    </div>
</template>
<script setup lang="ts">
import { useTemplateStore } from './../../store/template'
import { computed, onMounted } from 'vue'
const templateStore = useTemplateStore()
const templateData = computed(() => templateStore.data.data.list || [])
onMounted(async () => {
    await templateStore.fetchTemplate()
})
</script>
