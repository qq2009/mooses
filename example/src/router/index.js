import { createRouter, createWebHashHistory } from 'vue-router';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
    },
    {
        path: '/drag',
        name: 'drag',
        component: () => import('@/views/drag/index.vue'),
    },
    {
        path: '/emitter',
        name: 'emitter',
        component: () => import('@/views/emitter/index.vue'),
    },
    {
        path: '/dynamic',
        name: 'dynamic',
        component: () => import('@/views/dynamic/index.vue'),
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
