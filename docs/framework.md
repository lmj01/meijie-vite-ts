# framework

## Vue3

[plugins第三方插件](https://github.com/vuejs/awesome-vue#components--libraries)

Vue的前端响应式由vue2的Object.defineProperty来hook变量的改变事件，在Vue3中使用Proxy来监听变量的改变事件。这样的限制还是在层数上的限制，与React的本质区别是React是被动式更新，而vue是主动式刷新，依赖追踪每个变量


## 其他
- [Vue3 使用 svg-sprite-loader 实现 svg 图标按需加载](https://cloud.tencent.com/developer/article/1764171)

## vite

[vite home](https://cn.vitejs.dev/)
vite构建工具中自动集成了scss，所以不需要sass-loader之类的，但需要sass的运行库，npm install sass --dev
[vite configuration](https://vitejs.dev/config/)
### 参考
- [参考配置内容](https://gitee.com/xkrumeng/vite-vue3-scaffold/tree/master)

## typescript

[tsconfig.json 配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

[vuex开发指南](https://vuex.vuejs.org/zh/guide/)

threejs不要使用Vue的reactive之类的函数，因为会使用Proxy封装对象，导致出现失败
Uncaught (in promise) TypeError: 'get' on proxy: property 'modelViewMatrix' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<Matrix4>' but got '[object Object]')

## 术语

- HMR(Hot Module Replacement)模块热替换

## 问题集

1. 使用新工具时，很多问题需要版本的更新，特别是核心库的版本问题要一致