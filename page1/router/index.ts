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
            {
                path: 'test3',
                name: 'page1.test3',
                component: () => import('@/components/bootstrap/test3.vue'),
            },
            {
                path: 'recipe',
                name: 'page1.recipe',
                component: () => import('@/components/bootstrap/Recipe.vue'),
                children: [
                    {
                        path: 'framea',
                        name: 'recipe.frame.a',
                        component: () => import('@/components/bootstrap/recipe/FrameA.vue'),
                    },
                    {
                        path: 'frameb',
                        name: 'recipe.frame.b',
                        component: () => import('@/components/bootstrap/recipe/FrameB.vue'),
                    },
                    {
                        path: 'framec',
                        name: 'recipe.frame.c',
                        component: () => import('@/components/bootstrap/recipe/FrameC.vue'),
                    },
                ],
            },
            {
                path: 'mobile',
                name: 'page1.mobile',
                component: () => import('@/components/bootstrap/mobile.vue'),
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
    if (import.meta.env.DEV) {
        console.log(`-routers to-${to.fullPath}- and from-${from.fullPath}-`);
    }
    next();
})
export default router;
