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
import {filterPath} from '@/router'
export default {
    name: 'Sidebar',
    components: {Menus},
    setup() {
        const router = useRouter()
        const menuData = computed(()=>{
            return router.options.routes.filter((item)=>filterPath.includes(item.path))
        })
        return {
            menuData,
        }
    }
}
</script>
<style lang="scss" scoped>
ul.side-bar {
    padding: 0;
    ul {
        padding: 0;
        text-align: left;
        li {
            list-style: none;
            text-align: left;
        }
    }
}
</style>