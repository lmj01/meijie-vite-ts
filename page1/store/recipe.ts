export interface State {
    molar: { left: number, right: number };
    complains: CodeWithDescribe;
}
export interface IndexCode {
    left: boolean,
    code: number,
}
export interface CodeWithDescribe {
    code: Array<number>,
    describe: string,
}
const state: State = {
    molar: { left: 104, right: 204 }, // 左，右
    complains: { code: [], describe: '' }
}

const getters = {
    molar: (state: State) => state.molar,
}

const mutations = {
    setMolar: (state: State, ic: IndexCode) => {
        if (ic.left) {
            state.molar.left = ic.code;
        } else {
            state.molar.right = ic.code;
        }
    },
    setComplaints: (state: State, cd: CodeWithDescribe) => {
        state.complains.code = cd.code;
        state.complains.describe = cd.describe;
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