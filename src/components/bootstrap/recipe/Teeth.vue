<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">{{label}}</label>
        <div class="col-sm-10">
            <div class="mq-teeth">
                <div class="teeth-row">
                    <div class="teeth-col justify-content-between d-flex">
                        <div class="tooth" v-for="tooth in uppers" :key="tooth.v" :class="styleTooth">
                            <div :class="toothStyle(tooth)"></div>
                        </div>
                    </div>
                </div>
                <div class="teeth-row">
                    <div class="teeth-col justify-content-between d-flex">
                        <div class="tooth" v-for="tooth in lowers" :key="tooth.v" :class="styleTooth">
                            <div :class="toothStyle(tooth)"></div>
                        </div>
                    </div>
                </div>
                <div class="teeth-vertical"></div>
                <div class="teeth-horizontal"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, onMounted, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'Teeth',
    props: {
        name: String,
        label: String,
    },
    setup(props: {name: string, label: string}) {
        const store = useStore()
        const uppers = computed(() => store.getters['teeth/upper'])
        const lowers = computed(() => store.getters['teeth/lower'])
        const styleTooth = computed(() => {
            if (['restrictMove', 'restrictAttach'].includes(props.name)) {
                return 'black';
            }
            return ''
        })
        const toothStyle = (tooth) => {
            const cls = [`t${tooth.v}`];
            if (tooth.s == 2) {
                cls.push('rt');
            } else if (tooth.s == 1) {
                cls.push('rt');
                
            }
            if (['restrictMove', 'restrictAttach'].includes(props.name)) {
                cls.push('black');
            }
            console.log('-style-', tooth, cls.join(' '))
            return cls.join(' ');
        }
        const ud = reactive({
            describe: '',
        })
        const updateTextarea = () => {
            store.commit('recipe/setSpecialDescribe', ud.describe);
        }
        return {
            ud,
            uppers,
            lowers,
            updateTextarea,
            toothStyle,
            styleTooth,
        }
    },
})
</script>