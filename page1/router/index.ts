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
        console.log('before router', to, from);
    }
    next();
})
export default router;
