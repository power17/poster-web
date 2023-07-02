import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue'),
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
