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
    }
];
routes = routes.concat(babylonPath);

export default createRouter({
    history: createWebHistory(),
    routes: routes
})
