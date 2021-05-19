<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">覆盖</label>
        <div class="col-sm-10">
            <SelectSingle name="Overjet" :value="data" :code="ud.code" @code="updateSingleCode" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectSingle from './SelectSingle.vue'
import { overjet } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Overjet',
    components: {
        SelectSingle,
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            code: store.getters['recipe/overjet'],
        })
        const data = overjet();
        const updateSingleCode = (code) => {
            ud.code = code;
            store.commit('recipe/setOverjet', ud.code);
        }
        return {
            data,
            ud,
            updateSingleCode,
        }
    },
})
</script>