<template>
    <ul class="side-bar">
        <Menus
          v-for="item in menuData"
          :key="item.meta.id"
          :node="item"
          :basePath="item.path"
        />
    </ul>
</template>
<script>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import Menus from './Menus.vue'
export default {
    name: 'Sidebar',
    components: {Menus},
    setup() {
        const router = useRouter()
        const menuData = computed(()=>{
            const validPath = ['/threejs', '/babylonjs', '/html5']
            return router.options.routes.filter((item)=>validPath.includes(item.path))
        })
        return {
            menuData,
        }
    }
}
</script>
<style lang="scss" scoped>
ul.side-bar {
    li {
        list-style: none;
    }
}
</style>