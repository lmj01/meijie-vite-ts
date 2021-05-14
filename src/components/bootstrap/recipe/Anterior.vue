<template>
    <div class="mb-3 row">
        <label for="" class="col-sm-2 col-form-label">{{ud.literal[crossbite?0:1]}}</label>
        <div class="col-sm-10 d-flex justify-content-around">
            <select v-model="ud.selFirst" class="col form-select" @change="updateSelectLevel(1)">
                <option v-for="item in data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
            <SelectMultiple class="col-6" :value="ud.data" :indexs="ud.sel" @codes="e=>updateSelectLevel(2,e)" v-if="ud.hasChild" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectMultiple from './SelectMultiple.vue'
import { anterior } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Anterior',
    components: {
        SelectMultiple,
    },
    props: {
        crossbite: {
            type: Boolean,
            default: true,
        }
    },
    setup(props) {
        const store = useStore();
        const data = anterior(props.crossbite);
        const ud = reactive({
            sel: store.getters['recipe/anterior'](props.crossbite),
            selFirst: null,
            data: [],
            hasChild: false,
            literal: ['前牙反HE', '前牙对刃HE'],
        })
        const updateSelectLevel = (level, codes) => {
            if (level == 0) {
                if (ud.sel.length > 0) {
                    let code1 = ud.sel[0] - ud.sel[0] % 100;
                    const tmp1 = data.filter((d) => d.code == code1)[0]
                    if (tmp1 && tmp1.data) {
                        ud.selFirst = code1;  
                        ud.data = tmp1.data;
                        ud.hasChild = true;
                    } else {
                        ud.selFirst = code1;
                    }
                }
            } else if (level == 1) {
                ud.sel = [ud.selFirst];
                const tmp = data.filter((d) => d.code == ud.selFirst)[0];
                if (tmp && tmp.data) {
                    ud.data = tmp.data;
                    ud.hasChild = true;
                } else {
                    ud.hasChild = false;
                    store.commit('recipe/setAnterior', {crossbite: props.crossbite, codes: ud.sel});
                }
            } else if (level == 2) {
                ud.sel = codes;
                store.commit('recipe/setAnterior', {crossbite: props.crossbite, codes: ud.sel});
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