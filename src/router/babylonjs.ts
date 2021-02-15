const babylonPath = [
    {
        path:'/babylonjs/',
        name: 'babylonjs.index',
        component: ()=>import('../Babylonjs/Index.vue')
    },
    {
        path:'/babylonjs/demo',
        name: 'babylonjs.demo',
        component: ()=>import('../Babylonjs/Demo.vue')
    },
    {
        path:'/babylonjs/first',
        name: 'babylonjs.first',
        component: ()=>import('../Babylonjs/First.vue')
    }
]
export default babylonPath;