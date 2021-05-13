<template>
    <div class="btn-group w-100">
        <button class="btn btn-default dropdown-toggle w-100" type="button" :id="id" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="mx-2" v-for="item in selItem" :key="item">{{item}}</span>
        </button>
        <ul class="dropdown-menu w-100" :aria-labelledby="id">
            <li class="col-3" v-for="item in value" :key="item.code">
                <label class="dropdown-item"><input type="checkbox" :code="item.code">{{item.name}}</label>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, getCurrentInstance } from 'vue'
import bootstrapDropdown from 'bootstrap/js/src/dropdown'
export default defineComponent({
    name: 'Select.Multiple',
    props: {
        value: Array,
    },
    emits: ['codes'],
    setup(props, ctx) {
        const myDropdown = ref(null);
        const selItem = ref([]);
        const id = `dd${Date.now()}` 
        onMounted(() => {
            myDropdown.value = new bootstrapDropdown(document.getElementById(id), {})
            const ctx = getCurrentInstance()
            const elInputs = ctx.ctx.$el.querySelectorAll('input[type="checkbox"]')
            elInputs.forEach((input: HTMLElement) => {
                input.addEventListener('change', (event)=>{
                    let codes = []
                    for (let checkbox of elInputs) {
                        if (checkbox.checked) {
                            codes.push(parseInt(checkbox.getAttribute('code'), 10))
                        }
                    }
                    let tmp = []
                    codes.forEach((e) => {
                        let item = props.value.filter((v) => v.code == e)[0]
                        if (item) {
                            tmp.push(item.name)
                        }
                    })
                    selItem.value = tmp;
                    ctx.emit('codes', codes)
                    console.log('-after changed-', codes, selItem.value)
                })
            })
        })
        return {
            id,
            selItem,
            myDropdown,
        }
    }
})
</script>