<template>
    <div class="mb-3 row">
        <label for="" class="col-sm-2 col-form-label">后牙反HE或锁HE</label>
        <div class="col-sm-10">
            <div class="btn-group" role="group">
                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[0]" :code="data[0].code">
                <label class="btn btn-outline-primary" :for="ud.ids[0]">{{data[0].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[1]" :code="data[1].code">
                <label class="btn btn-outline-primary" :for="ud.ids[1]">{{data[1].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[2]" :code="data[2].code">
                <label class="btn btn-outline-primary" :for="ud.ids[2]">{{data[2].name}}</label>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { posterior } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Posterior',
    setup(props) {
        const store = useStore()
        const ud = reactive({
            sel: store.getters['recipe/posterior'],
            type: 'brTypePosterior',
            ids: [],
        })
        const data = posterior();
        if (data) {
            data.forEach((e) => {
                ud.ids.push(`brPosterior${e.code}`)
            })
        }
        onMounted(() => {
            const ctx = getCurrentInstance()
            const elInputs = ctx.ctx.$el.querySelectorAll('input[type="radio"]')
            elInputs.forEach((input: HTMLElement) => {
                if (parseInt(input.getAttribute('code'), 10) == ud.sel) {
                    input.setAttribute('checked', 'checked');
                }
                input.addEventListener('click', (event)=>{
                    const idInput = event.target.id;
                    const code = parseInt(idInput.match(/\d+/)[0], 10)
                    ud.sel = code;
                    store.commit('recipe/setPosterior', ud.sel);
                })
            })
        })
        return {
            data,
            ud,
        }
    },
})
</script>