<template>
    <div class="mb-3 row">
        <label for="" class="col-sm-2 col-form-label">主诉</label>
        <div class="col-sm-10">
            <SelectMultiple :value="data" @codes="updateSelectCodes" />
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
import { complaints } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Complains',
    components: {
        SelectMultiple,
    },
    setup() {
        const store = useStore()
        const data = complaints();
        const ud = reactive({
            code: [],
            describe: '',
            hasDescribe: false,
        })
        const updateSelectCodes = (codes) => {
            if (Array.isArray(codes)) {
                ud.code = codes;
                let hasDescribe = false                
                codes.forEach((code) => {
                    let tmp = data.filter((d) => d.code == code)[0]
                    if (tmp && tmp.describe) {
                        hasDescribe = true
                    }
                })
                ud.hasDescribe = hasDescribe
                if (!hasDescribe) {
                    ud.describe = '';
                }
                updateTextarea();
            } else {
                throw 'only revice array codes';
            }
        }
        const updateTextarea = () => {
            store.commit('recipe/setComplaints', ud);
        }
        return {
            ud,
            data,
            updateSelectCodes,
            updateTextarea,
        }
    },
})
</script>