<template>
    <div class="mx-0 my-2 row">
        <label for="" class="col-sm-2 col-form-label">拥挤</label>
        <div class="col-sm-10">
            <SelectSingle name="crowd" :value="data" :code="ud.code1" @code="e=>updateSingleCode(e, null)" />
        </div>
        <div class="row" v-if="ud.hasChild">
            <label for="" class="col-sm-2 col-form-label">上颌</label>
            <div class="col-sm-10">
                <label for="" class="col-sm-2 col-form-label">{{ud.dLeft.data[0].name}}</label>
                <SelectSingle name="crowdLa" :value="ud.dLeft.data[0].data" :code="ud.codeLeft[0]" @code="e=>updateSingleCode(e, ud.dLeft.data[0].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dLeft.data[1].name}}</label>
                <SelectSingle name="crowdLb" :value="ud.dLeft.data[1].data" :code="ud.codeLeft[1]" @code="e=>updateSingleCode(e, ud.dLeft.data[1].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dLeft.data[2].name}}</label>
                <SelectSingle name="crowdLc" :value="ud.dLeft.data[2].data" :code="ud.codeLeft[2]" @code="e=>updateSingleCode(e, ud.dLeft.data[2].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dLeft.data[3].name}}</label>
                <SelectSingle name="crowdLd" :value="ud.dLeft.data[3].data" :code="ud.codeLeft[3]" @code="e=>updateSingleCode(e, ud.dLeft.data[3].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dLeft.data[4].name}}</label>
                <SelectMultiple class="w-25" :value="ud.dLeft.data[4].data" :indexs="ud.cLeft" @codes="e=>updateMultipleCode(e, ud.dLeft.data[4].code)" />
            </div>
            <label for="" class="col-sm-2 col-form-label">下颌</label>
            <div class="col-sm-10">
                <label for="" class="col-sm-2 col-form-label">{{ud.dRight.data[0].name}}</label>
                <SelectSingle name="crowdRa" :value="ud.dRight.data[0].data" :code="ud.codeRight[0]" @code="e=>updateSingleCode(e, ud.dRight.data[0].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dRight.data[1].name}}</label>
                <SelectSingle name="crowdRb" :value="ud.dRight.data[1].data" :code="ud.codeRight[1]" @code="e=>updateSingleCode(e, ud.dRight.data[1].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dRight.data[2].name}}</label>
                <SelectSingle name="crowdRc" :value="ud.dRight.data[2].data" :code="ud.codeRight[2]" @code="e=>updateSingleCode(e, ud.dRight.data[2].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dRight.data[3].name}}</label>
                <SelectSingle name="crowdRd" :value="ud.dRight.data[3].data" :code="ud.codeRight[3]" @code="e=>updateSingleCode(e, ud.dRight.data[3].code)" />
                <br />
                <label for="" class="col-sm-2 col-form-label">{{ud.dRight.data[4].name}}</label>
                <SelectMultiple class="w-25" :value="ud.dRight.data[4].data" :indexs="ud.cRight" @codes="e=>updateMultipleCode(e, ud.dRight.data[4].code)" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import SelectSingle from './SelectSingle.vue'
import SelectMultiple from './SelectMultiple.vue'
import { crowd } from '@/helpers/Recipe'
export default defineComponent({
    name: 'Crowd',
    components: {
        SelectSingle,
        SelectMultiple,
    },
    setup(props) {
        const store = useStore()
        const leftCodeSignature = 21000;
        const ud = reactive({            
            code1: null,
            codeLeft: [null, null, null, null],
            codeRight: [null, null, null, null],
            cLeft: [],
            cRight: [],
            code: store.getters['recipe/crowd'],
            dLeft: [],  // data left
            dRight: [], // data right
            hasChild: false,
        })
        const data = crowd();    
        const updateCode = (left, src, index) => {
            if (index < 0) {
                src.data.forEach((e) => {
                    if (ud.code.includes(e.code)) {
                        if (left) ud.cLeft.push(e.code);
                        else ud.cRight.push(e.code);
                    }
                })
            } else {
                src.data.forEach((e) => {
                    if (ud.code.includes(e.code)) {
                        if (left) ud.codeLeft[index] = e.code;
                        else ud.codeRight[index] = e.code;
                    }
                })
            }
        }            
        const updateCheckChildren = (code) => {
            let code1 = code - code % 10000;            
            ud.code1 = code1;
            const tmp = data.filter((d) => d.code == code1)[0];
            if (tmp && tmp.data) {
                ud.hasChild = true;
                ud.dLeft = tmp.data[0];
                ud.dRight = tmp.data[1];
                for (let i = 0; i < 4; i++) {
                    updateCode(true, ud.dLeft.data[i], i);
                    updateCode(false, ud.dRight.data[i], i);
                }
                updateCode(true, ud.dLeft.data[4], -1);
                updateCode(false, ud.dRight.data[4], -1);
            } else {
                ud.hasChild = false;
                ud.cLeft = [];
                ud.cRight = [];
                ud.codeLeft = [null, null, null, null];
                ud.codeRight = [null, null, null, null];
                ud.code = [ud.code1];
                store.commit('recipe/setCrowd', ud.code);
            }
        }
        const updateCrowdCode = () => {
            ud.code = [].concat(ud.codeLeft.filter((e)=>e))
                .concat(ud.codeRight.filter((e)=>e))
                .concat(ud.cLeft)
                .concat(ud.cRight)
            store.commit('recipe/setCrowd', ud.code);
        }
        const updateSingleCode = (code, targetCode) => {
            if (targetCode) {
                const code1 = targetCode - targetCode % 1000;
                const left = code1 == leftCodeSignature;
                let data1 = data[1].data.filter((d) => d.code == code1)[0].data;
                for (let i = 0; i < data1.length; i++) {
                    if (targetCode == data1[i].code) {
                        if (left) ud.codeLeft[i] = code;
                        else ud.codeRight[i] = code;
                        break;
                    }
                }
                updateCrowdCode();
            } else {
                ud.code1 = code;
                updateCheckChildren(code)
            }
        }
        const updateMultipleCode = (code, targetCode) => {
            if (Array.isArray(code)) {
                const code1 = targetCode - targetCode % 1000;
                const left = code1 == leftCodeSignature;
                if (left) ud.cLeft = code;
                else ud.cRight = code;
                updateCrowdCode();
            } else throw 'only support array in crowd';
        }
        updateCheckChildren(ud.code[0]);
        return {
            data,
            ud,
            updateSingleCode,
            updateMultipleCode,
        }
    },
})
</script>