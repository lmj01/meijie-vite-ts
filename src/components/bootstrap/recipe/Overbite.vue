<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">覆HE</label>
        <div class="col-sm-10 d-flex justify-content-around">
            <select v-model="ud.selFirst" class="col form-select" @change="updateSelectLevel(1)">
                <option v-for="item in data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
            <select v-model="ud.selSecond" class="col form-select" @change="updateSelectLevel(2)" v-if="ud.hasChild">
                <option v-for="item in ud.data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>  
            <SelectMultiple class="col-4" :value="ud.data2" :indexs="ud.sel" @codes="e=>updateSelectLevel(3,e)" v-if="ud.hasGrandson" />
        </div>
        <div class="col-sm-10 offset-sm-2 my-2" v-if="ud.hasDescribe">
            <textarea class="form-control" v-model="ud.describe" rows="3" @input="updateTextarea" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectMultiple from './SelectMultiple.vue'
import { overbite } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Overbite',
    components: {
        SelectMultiple,
    },
    setup() {
        const store = useStore();
        const data = overbite();
        const ud = reactive({
            sel: store.getters['recipe/overbite'](true),
            selFirst: null,
            selSecond: null,
            describe: store.getters['recipe/overbite'](false),
            data: [],
            data2: [],
            hasChild: false,
            hasGrandson: false,
            hasDescribe: false,
        })
        const updateSelectLevel = (level, codes) => {
            if (level == 0) {
                if (ud.sel.length > 0) {
                    let code1 = ud.sel[0] - ud.sel[0] % 1000;
                    const tmp1 = data.filter((d) => d.code == code1)[0]
                    if (tmp1 && tmp1.data) {
                        ud.selFirst = code1;                        
                        ud.selSecond = ud.sel;
                        ud.data = tmp1.data;
                        ud.hasChild = true;
                        let code2 = ud.sel[0] - ud.sel[0] % 100;
                        const tmp2 = ud.data.filter((d) => d.code == code2)[0]
                        if (tmp2 && tmp2.data) {
                            ud.selSecond = code2;
                            ud.data2 = tmp2.data;
                            ud.hasGrandson = true;                            
                        } else {
                            ud.selSecond = code2;
                            if (tmp2.describe) {
                                ud.hasDescribe = true
                            }
                        }
                    } else {
                        ud.selFirst = code1;
                    }
                }
            } else if (level == 1) {
                const tmp = data.filter((d) => d.code == ud.selFirst)[0];
                if (tmp && tmp.data) {
                    ud.data = tmp.data;
                    ud.hasChild = true;
                    ud.sel = [ud.selFirst];
                } else {
                    ud.hasChild = false;
                    ud.hasGrandson = false;
                    ud.selSecond = null;
                    ud.hasDescribe = false;
                    ud.describe = '';
                }
            } else if (level == 2) {
                const tmp = ud.data.filter((d) => d.code == ud.selSecond)[0];
                if (tmp && tmp.data) {
                    ud.data2 = tmp.data
                    ud.hasGrandson = true;
                    ud.hasDescribe = false;
                } else {
                    ud.hasGrandson = false;
                    if (tmp && tmp.describe) {
                        ud.hasDescribe = true
                        ud.sel = [ud.selSecond];
                        updateTextarea();
                    }
                }
            } else if (level == 3) {
                ud.sel = codes;
                updateTextarea();
            }
        }
        const updateTextarea = () => {
            store.commit('recipe/setOverbite', {describe: ud.describe, code: ud.sel});
        }
        updateSelectLevel(0, null)
        return {
            data,
            ud,
            updateSelectLevel,
            updateTextarea,
        }
    },
})
</script>