<template>
    <div class="mb-3 row">
        <label for="" class="col-sm-2 col-form-label">远程</label>
        <div class="col-sm-10">
            <div class="btn-group" role="group">
                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[0]" :code="data[0].code">
                <label class="btn btn-outline-primary" :for="ud.ids[0]">{{data[0].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[1]" :code="data[1].code">
                <label class="btn btn-outline-primary" :for="ud.ids[1]">{{data[1].name}}</label>

                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[2]" :code="data[2].code">
                <label class="btn btn-outline-primary" :for="ud.ids[2]">{{data[2].name}}</label>
                
                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[3]" :code="data[3].code">
                <label class="btn btn-outline-primary" :for="ud.ids[3]">{{data[3].name}}</label>
                
                <input type="radio" class="btn-check" :name="ud.type" :id="ud.ids[4]" :code="data[4].code">
                <label class="btn btn-outline-primary" :for="ud.ids[4]">{{data[4].name}}</label>
            </div>
        </div>
        <div class="col-sm-10 offset-sm-2 my-2" v-if="ud.hasDescribe">
            <textarea class="form-control" v-model="ud.describe" rows="3" @input="updateTextarea" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { remote } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Remote',
    setup(props) {
        const store = useStore()
        const ud = reactive({
            code: store.getters['recipe/remote'](true),
            describe: store.getters['recipe/remote'](false),
            type: 'brTypeRemote',
            hasDescribe: false,
            ids: [],
        })
        const data = remote();
        if (data) {
            data.forEach((e) => {
                ud.ids.push(`brRemote${e.code}`)
            })
        }
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
        onMounted(() => {
            const ctx = getCurrentInstance()
            const elInputs = ctx.ctx.$el.querySelectorAll('input[type="radio"]')
            elInputs.forEach((input: HTMLElement) => {
                if (parseInt(input.getAttribute('code'), 10) == ud.code[0]) {
                    input.setAttribute('checked', 'checked');
                }
                input.addEventListener('click', (event)=>{
                    const idInput = event.target.id;
                    const code = parseInt(idInput.match(/\d+/)[0], 10)
                    ud.code = [code];
                    updateCheckDescribe();
                    store.commit('recipe/setRemote', ud);
                })
            })
        })
        const updateTextarea = () => {
            store.commit('recipe/setRemote', ud);
        }
        return {
            data,
            ud,
            updateTextarea,
        }
    },
})
</script>