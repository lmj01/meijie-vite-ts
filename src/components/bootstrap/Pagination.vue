<template>
    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm justify-content-center">
        <li class="page-item" :class="ud.curr==ud.pages[0]?'disabled':''" @click="clickPageForward(true)">
            <button type="button" class="page-link btn btn-primary">Previous</button>
        </li>
        <li class="page-item" 
            v-for="p in ud.pages" :key="p"
            :class="ud.curr==p?'active':''"
            @click="clicSelectCurrent(p)"
        >
            <button type="button" class="page-link btn btn-primary">{{p}}</button>
        </li>
        <li class="page-item" :class="ud.curr==ud.pages[ud.size - 1]?'disabled':''" @click="clickPageForward(false)">
            <button type="button" class="page-link btn btn-primary">next</button>
        </li>        
        <li class="page-item">
            <button type="button" class="page-link btn btn-primary">共{{ud.total}}页</button>
        </li>
        </ul>
    </nav>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, reactive, watch } from 'vue'
export default defineComponent({
    name: 'Pagination',
    props: {
        pageSize: {
            type: Number,
            default: 5,
        },
        pageTotal: {
            type: Number,
            default: 1,
        },
    },
    emits: ['page'],
    setup(props: {pageSize:number, pageTotal: number}, ctx) {
        const ud = reactive({
            size: props.pageSize, // page size
            curr: 1, // current page
            total: 1, // page total
            pages: [],
        })
        const initialPage = () => {
            for (let i = 0; i<ud.size; i++) {
                ud.pages.push(i+1)
            }
        }
        const clicSelectCurrent = (page) => {
            ud.curr = page;
            ctx.emit('page', ud.curr);
        }
        const clickPageForward = (isForward) => {
            let change = false;
            if (isForward) {
                if (ud.curr > ud.pages[0]) {
                    change = true;
                    ud.curr--;
                }
            } else {
                if (ud.curr < ud.pages[ud.size-1]) {
                    change = true;
                    ud.curr++;
                }
            }
            if (change) {
                ctx.emit('page', ud.curr);
            }
        }
        watch(
            () => props.pageTotal,
            () => {
                ud.size = props.pageSize;
                ud.total = Math.max(1, Math.ceil(props.pageTotal / ud.size))
                console.log('-total change-', props.pageTotal, props.pageSize, ud.total)
            }
        )
        initialPage();
        return {
            ud,
            clicSelectCurrent,
            clickPageForward,
        }
    },
})
</script>
