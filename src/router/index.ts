import { createRouter, createWebHashHistory, createWebHistory, routerKey } from 'vue-router'
import Layout1 from '@/components/layout1/index.vue';
let routes = [
    {
        path:'/',
        name: 'index',
        component: ()=>import('@/components/Index.vue')
    },
    {
        path:'/helloworld',
        name: 'helloworld',
        component: ()=>import('@/components/HelloWorld.vue')
    },
    {
        path:'/imgui',
        name: 'imgui',
        component: ()=>import('@/components/ImGui.vue')
    },
];

export const routerMap = [    
    {
        path: '/threejs',
        redirect: '/threejs/trackball',
        component: Layout1,
        meta: { id: 100 },
        name: 'threejs',
        children: [
            {
                path: 'trackball',
                name: 'threejs-trackball',
                component: ()=>import('@/components/threejs/Trackball.vue'),
                meta: { id: 101 },
            },
            {
                path: 'sprite',
                name: 'threejs-sprite',
                component: ()=>import('@/components/threejs/Sprite.vue'),
                meta: { id: 102 },
            },
            {
                path: 'sideview',
                name: 'threejs-Side-view',
                component: ()=>import('@/components/threejs/SideView.vue'),
                meta: { id: 103 },
            },
        ],
    },
    {
        path: '/babylonjs',
        component: Layout1,
        meta: { id: 200 },
        name: 'babylonjs',
        children: [
            {
                path: 'first',
                name: 'babylonjs-first',
                component: ()=>import('@/components/Babylonjs/First.vue'),
                meta: { id: 201 },
            },
            {
                path: 'demo',
                name: 'babylonjs-demo',
                component: ()=>import('@/components/Babylonjs/Demo.vue'),
                meta: { id: 202 },
            },
        ],
    },
    {
        path: '/html5',
        component: Layout1,
        meta: { id: 300 },
        name: 'html5',
        children: [
            {
                path: 'drag',
                name: 'html5-drag',
                component: ()=>import('@/components/html5/Drag.vue'),
                meta: { id: 301 },
            },
            {
                path: 'shadow',
                name: 'html5-shadow',
                component: ()=>import('@/components/html5/Shadow.vue'),
                meta: { id: 302 },
            },
            {
                path: 'primary',
                name: 'html5-primary',
                component: ()=>import('@/components/html5/Primary.vue'),
                meta: { id: 303 },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const menuTreeData = [
    {
        name:'ThreeJS', id:100, children:[
            {name: 'trackball', id:101, children: [] }, 
            {name: 'sprite', id:102, children: [] },
            {name: 'SideView', id:103, children: [] },
        ]
    },
    {
        name:'BabylonJS', id:200, children:[
            {name: 'first', id:201, children: [] }, 
            {name: 'demo', id:202, children: [] },
        ]
    },
    {
        name:'Html5', id:300, children:[
            {name: '拖拉效果', id:301, children: [] }, 
            {name: '阴影', id:302, children: [] },
            {name: '基本控件', id:303, children: [] },
        ]
    }
]
function visitChild(treeList : any, mapList: any) {
    treeList.forEach((item : any)=>{
        for (let i=0; i<mapList.length; i++) {
            if(item.id==mapList[i].meta.id) {
                mapList[i].meta.name = item.name;
                if (item.children.length > 0) {
                    visitChild(item.children, mapList[i].children);
                }
            }
        }
    })
}

(<any>window).mjrouter = router

menuTreeData.forEach(item=>{
    for (let i=0; i<routerMap.length; i++) {
        if (item.id==routerMap[i].meta.id) {
            if (item.children.length > 0) {
                visitChild(item.children, routerMap[i].children)
            }
            router.options.routes.push(routerMap[i]);
            router.addRoute(routerMap[i])
            break;
        }
    }
})

export default router;
