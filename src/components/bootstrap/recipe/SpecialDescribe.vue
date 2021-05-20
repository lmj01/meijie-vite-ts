<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">特殊说明</label>
        <div class="col-sm-10">
            <textarea class="form-control" v-model="ud.describe" rows="3" @input="updateTextarea" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'SpecialDescribe',
    setup(props) {
        const store = useStore()
        const ud = reactive({
            describe: store.getters['recipe/specialDescribe'],
        })
        const updateTextarea = () => {
            store.commit('recipe/setSpecialDescribe', ud.describe);
        }
        return {
            ud,
            updateTextarea,
        }
    },
})
</script>