<template>
    <div class="btn-group" role="group">
        <input type="radio" class="btn-check" :name="ud.name" v-if="ud.ids[0].show" :id="ud.ids[0].id" :code="value[0].code">
        <label class="btn btn-outline-primary" v-if="ud.ids[0].show" :for="ud.ids[0].id">{{value[0].name}}</label>

        <input type="radio" class="btn-check" :name="ud.name" v-if="ud.ids[1].show" :id="ud.ids[1].id" :code="value[1].code">
        <label class="btn btn-outline-primary" v-if="ud.ids[1].show" :for="ud.ids[1].id">{{value[1].name}}</label>

        <input type="radio" class="btn-check" :name="ud.name" v-if="ud.ids[2].show" :id="ud.ids[2].id" :code="value[2].code">
        <label class="btn btn-outline-primary" v-if="ud.ids[2].show" :for="ud.ids[2].id">{{value[2].name}}</label>

        <input type="radio" class="btn-check" :name="ud.name" v-if="ud.ids[3].show" :id="ud.ids[3].id" :code="value[3].code">
        <label class="btn btn-outline-primary" v-if="ud.ids[3].show" :for="ud.ids[3].id">{{value[3].name}}</label>

        <input type="radio" class="btn-check" :name="ud.name" v-if="ud.ids[4].show" :id="ud.ids[4].id" :code="value[4].code">
        <label class="btn btn-outline-primary" v-if="ud.ids[4].show" :for="ud.ids[4].id">{{value[4].name}}</label>

        <input type="radio" class="btn-check" :name="ud.name" v-if="ud.ids[5].show" :id="ud.ids[5].id" :code="value[5].code">
        <label class="btn btn-outline-primary" v-if="ud.ids[5].show" :for="ud.ids[5].id">{{value[5].name}}</label>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, getCurrentInstance, reactive } from 'vue'
export default defineComponent({
    name: 'Select.Single',
    props: {
        name: String,
        value: Array,
        code: Number,
    },
    emits: ['code'],
    setup(props, ctx) {
        const ud = reactive({
            count: 6,
            code: null,
            ids: [],
            name: `brType${props.name}`,
        });
        for (let i = 0; i < ud.count; i++) {
            ud.ids.push({
                show: false,
                id: '',
            })
        }
        ud.code = props.code;        
        (<Array<number>>props.value).forEach((e, i) => {
            let tmp = ud.ids[i];
            tmp.show = true;
            tmp.id = `br${props.name}${e.code}`
        })
        onMounted(() => {
            const ctx = getCurrentInstance()
            const elInputs = ctx.ctx.$el.querySelectorAll('input[type="radio"]')
            elInputs.forEach((input: HTMLElement) => {
                if (parseInt(input.getAttribute('code'), 10) == ud.code) {
                    input.setAttribute('checked', 'checked');
                }
                input.addEventListener('click', (event)=>{
                    const idInput = event.target.id;
                    const code = parseInt(idInput.match(/\d+/)[0], 10)
                    ud.code = code;
                    ctx.emit('code', code);
                })
            })
        })
        return {
            ud,
        }
    }
})
</script>