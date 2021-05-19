<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">中线</label>
        <div class="col-sm-10">
            <SelectSingle name="Midline" :value="data" :code="ud.code" @code="updateSingleCode" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectSingle from './SelectSingle.vue'
import { midline } from '@/helpers/Recipe'
export default defineComponent({
    name: 'MiddleLine',
    components: {
        SelectSingle,
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            code: store.getters['recipe/midline'],
        })
        const data = midline();
        const updateSingleCode = (code) => {
            ud.code = code;
            store.commit('recipe/setMidline', ud.code);
        }
        return {
            data,
            ud,
            updateSingleCode,
        }
    },
})
</script>