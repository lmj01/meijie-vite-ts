<template>
    <div id="idSvgContainer" class="container d-flex">
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
// import * as d3 from 'd3'
import { d3Tree } from '@/helpers/Diagram'

export default defineComponent({
    name: 'bootstrap.test3',
    setup() {
        const ud = reactive({
            width: 660,
            height: 500,
        })
        const treeData = {
            "name": "Eve",
            "value": 15,
            "type": "black",
            "level": "yellow",
            "children": [
                {
                "name": "Cain",
                "value": 10,
                "type": "grey",
                "level": "red"
                },
                {
                "name": "Seth",
                "value": 10,
                "type": "grey",
                "level": "red",
                "children": [
                    {
                    "name": "Enos",
                    "value": 7.5,
                    "type": "grey",
                    "level": "purple"
                    },
                    {
                    "name": "Noam",
                    "value": 7.5,
                    "type": "grey",
                    "level": "purple"
                    }
                ]
                },
                {
                "name": "Abel",
                "value": 10,
                "type": "grey",
                "level": "blue"
                },
                {
                "name": "Awan",
                "value": 10,
                "type": "grey",
                "level": "green",
                "children": [
                    {
                    "name": "Enoch",
                    "value": 7.5,
                    "type": "grey",
                    "level": "orange"
                    }
                ]
                },
                {
                "name": "Azura",
                "value": 10,
                "type": "grey",
                "level": "green"
                }
            ]
        };
        const { drawGraph } = d3Tree(ud.width, ud.height, treeData)
        onMounted(() => {
            drawGraph('idSvgContainer')
        })
        return {

        }
    }
})
</script>