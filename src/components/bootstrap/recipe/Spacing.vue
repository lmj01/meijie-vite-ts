<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">{{data.name}}</label>
        <div class="col-sm-10 d-flex">
            <select v-model="ud.selFirst" class="col form-select" @change="updateSelectLevel(1)">
                <option v-for="item in data.data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
            <select v-model="ud.selSecond" class="col form-select" @change="updateSelectLevel(2)" v-if="ud.hasChild">
                <option v-for="item in ud.data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { spacing } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Spacing',
    props: {
        left: {
            type: Boolean,
            default: true,
        }
    },
    setup(props) {
        const store = useStore();
        const data = spacing(props.left);
        const ud = reactive({
            selFirst: null,
            selSecond: null,
            data: [],
            hasChild: false,
        })
        console.log('spacing', data)
        const updateSelectLevel = (level) => {
            if (level == 0) {
                const code = store.getters['recipe/spacing'](props.left);
                let originCode = code - code % 100;
                let tmp = data.data.filter((d) => d.code == originCode)[0]
                if (tmp && tmp.data) {
                    ud.data = tmp.data;
                    ud.hasChild = true;
                    ud.selFirst = originCode;
                    ud.selSecond = code;
                } else {
                    ud.selFirst = originCode;
                }
            } else if (level == 1) {
                const tmp = data.data.filter((d) => d.code == ud.selFirst)[0];
                if (tmp.data) {
                    ud.data = tmp.data;
                    ud.hasChild = true;
                } else {
                    ud.hasChild = false;
                    ud.selSecond = null;
                    store.commit('recipe/setSpacing', {left:props.left, code:ud.selFirst});
                }
            } else if (level == 2) {
                store.commit('recipe/setSpacing', {left:props.left, code:ud.selSecond});
            }
        }
        updateSelectLevel(0)
        return {
            data,
            ud,
            updateSelectLevel,
        }
    },
})
</script>