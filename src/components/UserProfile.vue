<template>
    <router-link to="/login" v-if="!isLogin">
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
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => userStore.isLogin)
</script>
<style scoped lang="scss">
.user-profile-component {
    border-radius: 20px;
}

.user-operation {
    margin-left: 30px;
}
</style>
