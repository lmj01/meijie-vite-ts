<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">{{data.name}}</label>
        <div class="col-sm-10 d-flex">
            <select v-model="ud.selFirst" class="col form-select" @change="updateSelectLevel(1)">
                <option v-for="item in data.data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
            <SelectMultiple class="col-6" :value="ud.data" :indexs="ud.selSecond" @codes="e=>updateSelectLevel(2,e)" v-if="ud.hasChild" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectMultiple from './SelectMultiple.vue'
import { mesioDistal } from '@/helpers/Recipe'
export default defineComponent({
    name: 'MesioDistal',
    components: {
        SelectMultiple,
    },
    props: {
        left: {
            type: Boolean,
            default: true,
        }
    },
    setup(props) {
        const store = useStore();
        const data = mesioDistal(props.left);
        const ud = reactive({
            selFirst: null,
            selSecond: [],
            data: [],
            hasChild: false,
        })
        const updateSelectLevel = (level, codes) => {
            if (level == 0) {
                let originCodes = store.getters['recipe/mesioDistal'](props.left)
                if (originCodes.length > 0) {
                    let code = originCodes[0] - originCodes[0] % 100;
                    const tmp1 = data.data.filter((d) => d.code == code)[0]
                    if (tmp1 && tmp1.data) {
                        ud.selFirst = code;                        
                        ud.selSecond = originCodes;
                        ud.data = tmp1.data;
                        ud.hasChild = true;
                    } else {
                        ud.selFirst = code;
                    }
                }
            } else if (level == 1) {
                const tmp = data.data.filter((d) => d.code == ud.selFirst)[0];
                if (tmp && tmp.data) {
                    ud.data = tmp.data;
                    ud.hasChild = true;
                } else {
                    ud.hasChild = false;
                    store.commit('recipe/setMesioDistal', {left: props.left, codes: [ud.selFirst]});
                }
            } else if (level == 2) {                
                ud.selSecond = codes;
                store.commit('recipe/setMesioDistal', {left: props.left, codes: codes});
            }
        }
        updateSelectLevel(0, null)
        return {
            data,
            ud,
            updateSelectLevel,
        }
    },
})
</script>