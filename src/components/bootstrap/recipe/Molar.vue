<template>
    <div class="mb-3 row">
        <label for="" class="col-sm-2 col-form-label">{{data.name}}</label>
        <div class="col-sm-10">
            <div class="btn-group" role="group">
                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[0]" checked>
                <label class="btn btn-outline-primary" :for="ud.ids[0]">{{data.data[0].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[1]" >
                <label class="btn btn-outline-primary" :for="ud.ids[1]">{{data.data[1].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[2]" >
                <label class="btn btn-outline-primary" :for="ud.ids[2]">{{data.data[2].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[3]" >
                <label class="btn btn-outline-primary" :for="ud.ids[3]">{{data.data[3].name}}</label>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { molar } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Molar',
    props: {
        left: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            type: '',
            ids: [],
        })
        const data = molar(props.left);
        ud.type = `brType${data.code}`
        if (data.data) {
            data.data.forEach((e) => {
                ud.ids.push(`brId${e.code}`)
            })
        }
        onMounted(() => {
            const ctx = getCurrentInstance()
            const elInputs = ctx.ctx.$el.querySelectorAll('input[type="radio"]')
            elInputs.forEach((input: HTMLElement) => {
                input.addEventListener('click', (event)=>{
                    const idInput = event.target.id;
                    const code = parseInt(idInput.match(/\d+/)[0], 10)
                    store.commit('recipe/setMolar', { left: props.left, code: code });
                    console.log('-input click-', idInput, code)
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