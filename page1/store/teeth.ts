const toothList = [
    18, 17, 16, 15, 14, 13, 12, 11,
    21, 22, 23, 24, 25, 26, 27, 28,
    48, 47, 46, 45, 44, 43, 42, 41,
    31, 32, 33, 34, 35, 36, 37, 38
]
const typeList = ['', 'missing','restrictMove','restrictAttach','extract','spacing']
export interface TeethItem { 
    v: number, // value 牙位
    s: number, // 状态 0默认，1选中的，2禁用
    t: number, // 类别 0默认，1缺失，2不可移动，3不可附加，4拔除，5预留间隙
}
export interface State {
    teeth: Array<TeethItem>;
}
const state: State = {
    // 默认数据
    teeth: toothList.map((e) => ({v: e, s: 0, t: 0})), // 牙齿数据
    // 测试数据
}

const getters = {
    teeth: (state: State) => state.teeth,
    upper: (state: State) => {
        const a = state.teeth.filter((e) => e.v >= 21 && e.v <= 28);
        const b = state.teeth.filter((e) => e.v >= 11 && e.v <= 18);
        return a.concat(b);
    },
    lower: (state: State) => {
        const c = state.teeth.filter((e) => e.v >= 41 && e.v <= 48);
        const d = state.teeth.filter((e) => e.v >= 31 && e.v <= 38);
        return c.concat(d);
    }
}

const mutations = {
    setTeeth: (state: State, ti: TeethItem) => {
        const tooth = state.teeth.filter((e) => e.v == ti.v)[0]
        if (tooth) {
            tooth.t = ti.t;
            tooth.s = ti.s;
        }
    },
    initTeeth: (state: State, type: number) => {

    }
}

const actions = {
    login({ commit }, data:Object) {
        
    },
}

export default {
    namespaced: true,    
    state,
    getters,
    mutations,
    actions,
}