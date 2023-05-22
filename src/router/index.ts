import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home.vue'
import Template from './../views/Template.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/template',
            name: 'template',
            component: Template,
        },
    ],
})
export default router
