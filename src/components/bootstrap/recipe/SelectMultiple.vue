<template>
    <div class="btn-group border rounded">
        <button class="btn btn-default dropdown-toggle w-100" type="button" :id="ud.id" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="mx-2" v-for="item in ud.selItem" :key="item">{{item}}</span>
        </button>
        <ul class="dropdown-menu w-100" :aria-labelledby="ud.id">
            <li class="col" v-for="item in value" :key="item.code">
                <label class="dropdown-item"><input type="checkbox" :code="item.code">{{item.name}}</label>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, getCurrentInstance, reactive } from 'vue'
import bootstrapDropdown from 'bootstrap/js/src/dropdown'
export default defineComponent({
    name: 'Select.Multiple',
    props: {
        value: Array,
        indexs: {
            type: Array,
            default: [],
        }
    },
    emits: ['codes'],
    setup(props, ctx) {
        const myDropdown = ref(null);
        const ud = reactive({
            id: `${Date.now()}`,
            sel: [],
            selItem: [],
        });        
        (<Array<number>>props.indexs).forEach((e) => ud.sel.push(e))
        const updateSelectItems = () => {
            let tmp = []
            ud.sel.forEach((e) => {
                let item = (<Array<{code,name}>>props.value).filter((v) => v.code == e)[0]
                if (item) {
                    tmp.push(item.name)
                }
            })
            ud.selItem = tmp;
        }
        onMounted(() => {
            myDropdown.value = new bootstrapDropdown(document.getElementById(ud.id), {})
            const ctx = getCurrentInstance()
            const elInputs = ctx.ctx.$el.querySelectorAll('input[type="checkbox"]')
            updateSelectItems()
            elInputs.forEach((input: HTMLInputElement) => {
                let code = parseInt(input.getAttribute('code'), 10);
                if (ud.sel.includes(code)) {
                    input.checked = true;
                }
                input.addEventListener('change', (event)=>{
                    let codes = []
                    for (let checkbox of elInputs) {
                        if (checkbox.checked) {
                            codes.push(parseInt(checkbox.getAttribute('code'), 10))
                        }
                    }
                    ud.sel = codes;
                    updateSelectItems()
                    ctx.emit('codes', ud.sel)
                })
            })
        })
        return {
            ud,
            myDropdown,
        }
    }
})
</script>