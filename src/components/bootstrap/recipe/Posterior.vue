<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">后牙反HE或锁HE</label>
        <div class="col-sm-10">
            <SelectSingle name="Posterior" :value="data" :code="ud.code" @code="updateSingleCode" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectSingle from './SelectSingle.vue'
import { posterior } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Posterior',
    components: {
        SelectSingle,
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            code: store.getters['recipe/posterior'],
        })
        const data = posterior();
        const updateSingleCode = (code) => {
            ud.code = code;
            store.commit('recipe/setPosterior', ud.code);
        }
        return {
            data,
            ud,
            updateSingleCode,
        }
    },
})
</script>