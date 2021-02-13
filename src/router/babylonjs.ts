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
    }
]
export default babylonPath;