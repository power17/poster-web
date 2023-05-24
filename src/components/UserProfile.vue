<template>
    <router-link to="/login">
        <a-button type="primary" class="user-profile-component">登录</a-button>
    </router-link>
    <!-- <div>
        <a-dropdown-button class="user-profile-component">
            <router-link to="/setting">viket</router-link>
            <template #overlay>
                <a-menu class="user-profile-dropdown">
                    <a-menu-item key="0">登出</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown-button>
    </div> -->
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.user-profile-component,
.user-profile-dropdown {
    border-radius: 20px;
}

.user-operation {
    margin-left: 30px;
}
</style>
