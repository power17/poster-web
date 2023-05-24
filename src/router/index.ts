import { createRouter, createWebHistory } from 'vue-router'
import Index from './../views/index/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/editor/:id',
            name: 'editor',
            component: () => import(/* webpackChunkName: "editor" */ '../views/editor/index.vue'),
            // meta: { requiredLogin: true, title: '编辑我的设计' },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "editor" */ '../views/login/index.vue'),
            // meta: { requiredLogin: true, title: '编辑我的设计' },
        },
    ],
})
export default router
