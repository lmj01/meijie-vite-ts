<template>
    <li>
        <template v-if="node.children">
            <li @click="clickToggle">
                {{node.name}}
            </li>
            <menus 
                v-for="child in node.children" 
                :key="child.meta.id"
                :node="child"
                :base-path="resolvePath(child.path)"
            />
        </template>
        <template v-else>
            <router-link :to="basePath">
                {{node.meta.name}}
            </router-link>
        </template>
    </li>
</template>
<script>
import { computed } from 'vue'
import { routerMap } from '../../router'
export default {
    name: 'Menus',
    props: {
        node: {
            type: Object,
            required: true,
        },
        basePath: {
            type: String,
            default: '',
        },
        expandToggleId: {
            type: Number,
            default: 0,
        }
    },
    setup(props) {
        const node = computed(()=>props.node)
        const isExternal = (path) => {
            return /^(https?:|mailto:|tel:)/.test(path)          
        }
        const resolvePath = (routePath) => {
            if (isExternal(routePath)) return routePath
            let res = `${props.basePath}/${routePath}`
            return res
        }
        return {
            node,
            isExternal,
            resolvePath,
        }
    }
}
</script>