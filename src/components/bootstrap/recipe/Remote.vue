<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">远程</label>
        <div class="col-sm-10">
            <SelectSingle name="remote" :value="data" :code="ud.code[0]" @code="e=>updateSingleCode(e, 1)" />
        </div>
        <div class="col-sm-10 offset-sm-2 my-2" v-if="ud.hasDescribe">
            <textarea class="form-control" v-model="ud.describe" rows="3" @input="updateTextarea" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectSingle from './SelectSingle.vue'
import { remote } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Remote',
    components: {
        SelectSingle,
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            code: store.getters['recipe/remote'](true),
            describe: store.getters['recipe/remote'](false),
            hasDescribe: false,
        })
        const data = remote();
        const updateCheckDescribe = () => {
            let hasDescribe = false                
            ud.code.forEach((code) => {
                let tmp = data.filter((d) => d.code == code)[0]
                if (tmp && tmp.describe) {
                    hasDescribe = true
                }
            })
            ud.hasDescribe = hasDescribe
            if (!hasDescribe) {
                ud.describe = '';
            }
        }
        const updateSingleCode = (code) => {
            ud.code = [code];
            updateCheckDescribe();
            store.commit('recipe/setRemote', ud);
        }
        const updateTextarea = () => {
            store.commit('recipe/setRemote', ud);
        }
        return {
            data,
            ud,
            updateTextarea,
            updateSingleCode,
        }
    },
})
</script>