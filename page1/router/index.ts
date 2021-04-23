import { createRouter, createWebHashHistory, createWebHistory, routerKey } from 'vue-router'
let routes = [
    {
        path: '/page1',
        indirection: 'test',
        name: 'page1.index',
        component: () => import('@/components/bootstrap/index.vue'),
        children: [
            {
                path: '',
                name: 'page1.test',
                component: () => import('@/components/bootstrap/test.vue'),
            },
            {
                path: 'test2',
                name: 'page1.test2',
                component: () => import('@/components/bootstrap/test2.vue'),
            },
        ],
    },
];

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    console.log('before router', to, from);

    next();
})
console.log(router)
export default router;
