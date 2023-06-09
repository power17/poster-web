import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'
import axios from 'axios'
import { message } from 'ant-design-vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import(/* webpackChunkName: "index" */ '../views/Index/index.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue'),
                    meta: { title: '欢迎来到慕课乐高' },
                },
                // {
                //     path: 'template/:id',
                //     name: 'template',
                //     component: () => import(/* webpackChunkName: "template" */ '../views/Template/index.vue'),
                //     meta: { title: '模版详情' },
                // },
                // { path: 'works', name: 'works', component: Works, meta: { title: '我的作品', requiredLogin: true } },
            ],
        },
        {
            path: '/editor/:id',
            name: 'editor',
            component: () => import(/* webpackChunkName: "home" */ '../views/Editor/index.vue'),
            meta: { title: '编辑我的设计' },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "editor" */ '../views/Login/index.vue'),
            meta: { redirectAlreadyLogin: true, title: '登录到慕课乐高', disableLoading: true },
        },
    ],
})

// 路由拦截
router.beforeEach(async (to) => {
    const userStore = useUserStore()
    const { isLogin, token } = userStore
    const { title, redirectAlreadyLogin, requiredLogin } = to.meta
    if (title) {
        document.title = title as string
    }
    if (isLogin) {
        if (redirectAlreadyLogin) {
            return '/'
        }
    } else {
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            try {
                await userStore.fetchCurrentUser()
                if (redirectAlreadyLogin) {
                    return '/'
                }
            } catch (e) {
                message.error('登录状态已过期，请重新登录')
                userStore.logout()
                return 'login'
            }
        } else {
            if (requiredLogin) {
                return 'login'
            }
        }
    }
})
export default router
