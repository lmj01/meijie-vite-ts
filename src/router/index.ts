import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import babylonPath from './babylonjs';
let routes = [
    {
        path:'/',
        name: 'index',
        component: ()=>import('../components/Index.vue')
    },
    {
        path:'/helloworld',
        name: 'helloworld',
        component: ()=>import('../components/HelloWorld.vue')
    },
    {
        path:'/imgui',
        name: 'imgui',
        component: ()=>import('../components/ImGui.vue')
    },
    {
        path:'/jsx',
        name: 'jsx.index',
        component: ()=>import('../Jsx/Index.Vue')
    }
];
routes = routes.concat(babylonPath);

export default createRouter({
    history: createWebHistory(),
    routes: routes
})
