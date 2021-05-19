<template>
    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm justify-content-center">
            <ul class="pagination pagination-sm justify-content-center">
                <li class="page-item" :class="ud.current==1?'active':''" @click="jumpToPage(1)"><button type="button" class="page-link btn">1</button></li>                
                <li v-if="ud.showPrev" class="page-item" @click="jumpToNeighbour(true)"><button type="button" class="page-link btn">上一页</button></li>
                <li v-for="page in pagers" :key="page" class="page-item" :class="ud.current==page?'active':''" @click="jumpToPage(page)">
                    <button type="button" class="page-link btn">{{page}}</button>
                </li>
                <li v-if="ud.showNext" class="page-item" @click="jumpToNeighbour(false)"><button type="button" class="page-link btn">下一页</button></li>
                <li class="page-item" :class="ud.current==total?'active':''" @click="jumpToPage(total)"><button type="button" class="page-link btn">{{total}}</button></li>
            </ul>
        </ul>
    </nav>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, computed } from 'vue'
export default defineComponent({
    name: 'Pagination2',
    props: {
        count: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    emits: ['page'],
    setup(props: {count:number, total: number}, ctx) {
        const ud = reactive({
            showPrev: false,
            showNext: true,
            current: 1,
            pages: [],
        })
        const updatePageState = (prev, next) => {
            ud.showPrev = prev;
            ud.showNext = next;
        }
        const pagers = computed(() => {
            const arr = [];
            let prev = false, next = false;
            const pageTotal = Number(props.total);
            const pageCurr = Number(ud.current);
            const halfCount = (props.count - 1) / 2;

            if (props.total > props.count) {
                if (ud.current > props.count - halfCount) {
                    prev = true;
                }
                if (ud.current < props.total - halfCount) {
                    next = true;
                }
            }

            if (prev && !next) {
                const start = props.total - (props.count - 2);
                for (let i=start; i< props.total; i++) {
                    arr.push(i);
                }
            } else if (!prev && next) {
                for (let i=2; i< props.count; i++) {
                    arr.push(i);
                }
            } else if (prev && next) {
                const offset = Math.floor(props.count / 2) - 1;
                for (let i=pageCurr-offset; i <= pageCurr+offset; i++) {
                    arr.push(i);
                }
            } else {
                for (let i=2; i < Math.min(props.count, props.total); i++) {
                    arr.push(i);
                }
            }
            updatePageState(prev, next);
            console.log('-pagers-', arr.length, arr, prev, next)
            return arr;
        })
        const jumpToPage = (idx) => {       
            if (ud.current !== idx) {
                ud.current = idx;
                ctx.emit('page', ud.current);    
            }
        }
        const jumpToNeighbour = (isPrev) => {
            if (isPrev) {
                if (ud.current > 1) {
                    ud.current -= 1;
                    ctx.emit('page', ud.current);
                }
            } else {
                if (ud.current + 1 < props.total) {
                    ud.current += 1;
                    ctx.emit('page', ud.current);
                }
            }
        }
        return {
            ud,
            pagers,
            jumpToNeighbour,
            jumpToPage,
        }
    },
})
</script>
