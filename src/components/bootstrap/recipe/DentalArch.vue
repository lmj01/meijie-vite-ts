<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">牙弓治疗</label>
        <div class="col-sm-10 d-flex">
            <select v-model="ud.selFirst" class="col form-select" @change="updateSelectLevel(1)">
                <option v-for="item in data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
            <select v-model="ud.selSecond" class="col form-select" @change="updateSelectLevel(2)" v-if="ud.hasChild">
                <option v-for="item in ud.data" :key="item.code" :value="item.code">{{item.name}}</option>
            </select>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { dentalArch } from '@/helpers/Recipe'
export default defineComponent({
    name: 'DentalArch',
    setup() {
        const store = useStore();
        const data = dentalArch();
        const ud = reactive({
            selFirst: store.getters['recipe/dentalArch'],
            selSecond: null,
            data: [],
            hasChild: false,
        })
        const updateSelectLevel = (level) => {
            if (level == 1) {
                const tmp = data.filter((d) => d.code == ud.selFirst)[0];
                if (tmp.data) {
                    ud.data = tmp.data;
                    ud.hasChild = true;
                } else {
                    ud.hasChild = false;
                    ud.selSecond = null;
                    store.commit('recipe/setDentalArch', ud.selFirst);
                }
            } else if (level == 2) {
                store.commit('recipe/setDentalArch', ud.selSecond);
            }
        }
        return {
            data,
            ud,
            updateSelectLevel,
        }
    },
})
</script>