<template>
    <div class="upload">
        <button @click="handleuploadFile">
            <span v-if="uploadStatus === 'ready'">点击上传</span>
            <span v-if="uploadStatus === 'loading'">正在上传</span>
            <span v-if="uploadStatus === 'success'">上传成功</span>
            <span v-if="uploadStatus === 'error'">上传失败</span>
        </button>
        <input ref="fileRef" type="file" @change="handleUploadFileChange" :style="{ display: 'none' }" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
async function getToken() {
    const res = await axios.post('/api/users/genVeriCode', {
        phoneNumber: '13611911111',
    })
    const code = res.data.data.code
    const loginRes = await axios.post('/api/users/loginByPhoneNumber', {
        phoneNumber: '13611911111',
        veriCode: code,
    })
    const token = loginRes.data.data.token
    return token
}
type UploadStatusType = 'ready' | 'loading' | 'success' | 'error'
let uploadStatus = ref<UploadStatusType>('ready')
const props = defineProps<{ actions: string }>()
const fileRef = ref<HTMLInputElement | null>(null)
// 上传点击
const handleuploadFile = () => {
    if (fileRef.value) {
        fileRef.value.click()
    }
}
const handleUploadFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        try {
            uploadStatus.value = 'loading'
            const res = await axios.post(props.actions, formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    authorization: `Bearer ${await getToken()}`,
                },
            })
            uploadStatus.value = 'success'
            const url = res.data.data.url
            console.log(url)
        } catch {
            // console.error(e.message)
            uploadStatus.value = 'error'
        }
    }
}
</script>
