<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">{{label}}</label>
        <div class="col-sm-10">
            <div class="mq-teeth" :class="name==ud.type?'spacing':''">
                <div class="teeth-row">
                    <div class="teeth-col justify-content-between d-flex my-2">
                        <div class="tooth" v-for="(tooth,idx) in uppers" :key="tooth.v" :class="toothParentStyle(tooth)" @click="clickChangeState(tooth)">
                            <div :class="toothStyle(tooth)"></div>
                            <div class="missing" v-if="toothMissing(tooth)"></div>
                            <div class="lock" v-if="toothLock(tooth)"></div>
                            <div class="ext" v-if="toothExtract(tooth)"></div>
                            <input v-if="name == ud.type && idx+1 < uppers.length" type="text" class="number upper" :class="checkInputDisabled(tooth,idx,true)?'disabled':''" :disabled="checkInputDisabled(tooth,idx,true)" :left="tooth.v" :right="inputRightId(true,idx)" @input="updateNumberChangeValue">
                        </div>
                    </div>
                </div>
                <div class="teeth-row">
                    <div class="teeth-col justify-content-between d-flex">
                        <div class="tooth" v-for="(tooth,idx) in lowers" :key="tooth.v" :class="toothParentStyle(tooth)" @click="clickChangeState(tooth)">
                            <div :class="toothStyle(tooth)"></div>
                            <div class="missing" v-if="toothMissing(tooth)"></div>
                            <div class="lock" v-if="toothLock(tooth)"></div>
                            <div class="ext" v-if="toothExtract(tooth)"></div>
                            <input v-if="name == ud.type && idx+1 < uppers.length" type="text" class="number lower" :class="checkInputDisabled(tooth,idx,true)?'disabled':''" :disabled="checkInputDisabled(tooth,idx,true)" :left="tooth.v" :right="inputRightId(true,idx)" @input="updateNumberChangeValue">
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
import { toothTypeList } from '@/../page1/store/teeth'
export default defineComponent({
    name: 'Teeth',
    props: {
        name: String,
        label: String,
    },
    setup(props: {name: string, label: string}, ctx) {
        const store = useStore()
        const uppers = computed(() => store.getters['teeth/upper'])
        const lowers = computed(() => store.getters['teeth/lower'])
        const toothParentStyle = (tooth) => {
            if (tooth.t.includes(1)) return 'white';
            if ([toothTypeList[2], toothTypeList[3]].includes(props.name)) {
                return 'black';
            }
            return 'white';
        }
        const toothMissing = (tooth) => {
            if (tooth.s == 1 && tooth.t.includes(1)) return true;
            return false;
        }
        const toothLock = (tooth) => {
            if (tooth.s == 1) {
                if (props.name == toothTypeList[2] && tooth.t.includes(2)) return true;
                else if (props.name == toothTypeList[3] && tooth.t.includes(3)) return true;
            }
            return false;
        }
        const toothExtract = (tooth) => {
            if (props.name == toothTypeList[4] && tooth.t.includes(4)) return true;
            return false;
        }
        const toothStyle = (tooth) => {
            const cls = [`t${tooth.v}`];
            if (tooth.s == 1) {
                if (tooth.t.includes(1)) {
                    cls.push('rt');
                } else {
                    if (props.name == toothTypeList[4] && tooth.t.includes(4)) {
                        cls.push('rt');
                        cls.push('blue');    
                    }
                }
            }
            if ([toothTypeList[2], toothTypeList[3]].includes(props.name)) {
                if (tooth.t[0] !== 1) {
                    cls.push('black')
                }
            }
            return cls.join(' ');
        }        
        const nextRight = (data, icur, inext) => {
            const cur = data[icur];
            const next = data[inext];
            if (!next) return cur.v;
            if (next.s==2) {
                if (next.v==28) return cur.v;
                else return nextRight(data, icur, inext+1);
            }
            return next.v;
        }
        const inputRightId = (isUpper, idx) => {
            return nextRight(isUpper?uppers.value:lowers.value, idx, idx+1);
        }
        const checkInputDisabled = (it, idx, isUpper) => {
            let idNext = inputRightId(isUpper, idx);
            if (it.v == idNext) return true;
            return it.s == 2;
        }
        const clickChangeState = (tooth) => {
            let needUpdate = false;
            // 间隙不可改变
            if (props.name == toothTypeList[5]) return;
            if (tooth.s == 0) { 
                // 未选中状态, 都可以改变
                tooth.s = 1;
                tooth.t = [toothTypeList.indexOf(props.name)];
                needUpdate = true;
            } else {
                if (tooth.t.includes(1)) {
                    // 缺失优先级第一
                    if (props.name == toothTypeList[1]) {
                        tooth.s = 0;
                        tooth.t = [0];
                        needUpdate = true;
                    }    
                } else {

                    // 拔牙优先级第二
                    if (props.name == toothTypeList[1]) {
                        tooth.t = [1];
                        needUpdate = true;
                    } else if (props.name == toothTypeList[4]) {
                        if (tooth.t.includes(4)) tooth.t = tooth.t.filter((e) => e !== 4);
                        else tooth.t.push(4);
                        needUpdate = true;
                    } else if (props.name == toothTypeList[2]) {
                        if (tooth.t.includes(2)) tooth.t = tooth.t.filter((e) => e !== 2);
                        else tooth.t.push(2);
                        needUpdate = true;
                    } else if (props.name == toothTypeList[3]) {
                        if (tooth.t.includes(3)) tooth.t = tooth.t.filter((e) => e !== 3);
                        else tooth.t.push(3);
                        needUpdate = true;
                    }
                }
            }
            if (needUpdate) {
                if (tooth.t.length < 1) {
                    tooth.s = 0;
                    tooth.t = [0];
                }
                store.commit('teeth/setTeeth', tooth);
            }
            // store.commit('teeth/setTeeth', tooth);
            console.log('-click change state-', tooth, props.name)
        }
        const ud = reactive({
            type: toothTypeList[5],
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
            toothParentStyle,
            toothStyle,
            toothMissing,
            toothLock,
            toothExtract,
            checkInputDisabled,
            inputRightId,
            clickChangeState
        }
    },
})
</script>