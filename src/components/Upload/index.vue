<template>
    <div class="upload">
        <button @click="handleuploadFile" :disabled="isUploading">
            <span v-if="isUploading">正在上传</span>
            <span v-else>点击上传</span>
        </button>
        <input ref="fileRef" type="file" @change="handleUploadFileChange" :style="{ display: 'none' }" />
        <ul class="upload-file-ul">
            <li :class="`upload-flie-li upload-${file.status}`" v-for="file in uploadFiles" :key="file.uid">
                <span class="filename">{{ file.name }}</span>
                <button class="delete-icon" @click="removeFile(file.uid)">删除</button>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import type { UploadFileType } from './index.d.ts'
const uploadFiles = ref<UploadFileType[]>([]) // 文件数组
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
const isUploading = computed(() => {
    return uploadFiles.value.some((file) => file.status === 'loading')
})

const props = defineProps<{ actions: string }>()
const fileRef = ref<HTMLInputElement | null>(null)
const removeFile = (uid: string) => {
    // console.log(uploadFiles, uid)
    uploadFiles.value = uploadFiles.value.filter((file) => file.uid === uid)
}
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
        const fileObj = reactive<UploadFileType>({
            uid: uuidv4(),
            size: uploadFile.size,
            name: uploadFile.name,
            raw: uploadFile,
            status: 'loading',
        })
        uploadFiles.value.push(fileObj)
        try {
            const token = await getToken()
            const res = await axios.post(props.actions, formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    authorization: `Bearer ${token}`,
                },
            })
            // uploadStatus.value = 'success'
            fileObj.status = 'success'
            console.log(res)
            if (fileRef.value) {
                fileRef.value.value = ''
            }
        } catch (e) {
            console.error(e)
            fileObj.status = 'error'
        }
    }
}
</script>
