<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">{{data.name}}</label>
        <div class="col-sm-10">
            <SelectSingle :name="'molar'+(left?'Left':'Right')" :value="data.data" :code="ud.code" @code="updateSingleCode" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectSingle from './SelectSingle.vue'
import { molar } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Molar',
    components: {
        SelectSingle,
    },
    props: {
        left: {
            type: Boolean,
            default: true,
        }
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            code: store.getters['recipe/molar'](props.left),
        })
        const data = molar(props.left);
        const updateSingleCode = (code) => {
            ud.code = code;
            store.commit('recipe/setMolar', { left: props.left, code: code });
        }
        return {
            data,
            ud,
            updateSingleCode,
        }
    },
})
</script>