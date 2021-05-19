<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">{{name}}</label>
        <div class="col-sm-10">
            <div class="mq-teeth">
                <div class="teeth-row">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'Teeth',
    props: {
        name: String,
    },
    setup(props) {
        const store = useStore()
        const ud = reactive({
            describe: '',
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