<template>
    <router-link to="/login" v-if="isEmptyObject(userStore.userInfo)">
        <a-button type="primary" class="user-profile-component">登录</a-button>
    </router-link>
    <div v-else>
        <a-dropdown-button class="user-profile-component">
            <router-link to="/">{{ userInfo.nickName }}</router-link>
            <template #overlay>
                <a-menu class="user-profile-dropdown">
                    <a-menu-item key="0">登出</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown-button>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '../store/user'
import { computed } from 'vue'
import { isEmptyObject } from '../utils'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
</script>
<style scoped lang="scss">
.user-profile-component {
    border-radius: 20px;
}

.user-operation {
    margin-left: 30px;
}
</style>
