<template>
    <div class="image-processer">
        fjslfjsojsdofj
        <a-modal
            title="裁剪图片"
            v-model:visible="showModal"
            @ok="handleOk"
            @cancel="showModal = false"
            okText="确认"
            cancelText="取消"
        >
            image
            <div class="image-cropper">
                <img :src="baseImageUrl" id="processed-image" ref="cropperImg" />
            </div>
        </a-modal>
        <div class="image-process">
            <!-- <styled-uploader @success="handleFileUploaded"></styled-uploader> -->
            <a-button @click="showModal = true">
                <template #:icon><ScissorOutlined /></template>
                裁剪图片
            </a-button>
            <a-button v-if="showDelete" type="danger" @click="handleDelete">
                <template #:icon><DeleteOutlined /></template>
                删除图片
            </a-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { DeleteOutlined, ScissorOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const showModal = ref(false)
const showDelete = ref(true)
const handleDelete = () => {}
const handleOk = () => {}
const baseImageUrl = ''
</script>
<style>
.image-cropper img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
}
</style>
