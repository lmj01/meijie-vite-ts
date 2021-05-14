export interface State {
    molar: { left: number, right: number };
    spacing: { left: number, right: number };
    mesioDistal: { left: Array<number>, right: Array<number> };
    complaints: CodesWithDescribe;
    remote: CodesWithDescribe;
    dentalArch: number;
    overjet: number;
    anteriorCrossbite: Array<number>;
    anteriorEdge2Edge: Array<number>;
    posteriorCrossbite: number;
    midline: number;
    specialDescribe: string;
    overbite: CodesWithDescribe;
}
export interface TwoCodeOption {
    left: boolean,
    code: number,
}
export interface TwoCodesOption {
    left: boolean,
    codes: Array<number>,
}
export interface AnteriorOption {
    crossbite: boolean,
    codes: Array<number>,
}
export interface CodesWithDescribe {
    code: Array<number>,
    describe: string,
}
const state: State = {
    // 默认数据
    molar: { left: 104, right: 204 }, // 现磨牙关系
    spacing: { left: 1100, right: 2100 }, // 间隙 左就是上颌，右就是下颌
    mesioDistal: { left: [1600], right: [2600] }, // 矢状向关系
    complaints: { code: [], describe: '' }, // 牙弓
    remote: { code: [1], describe: '' }, // 远程
    overbite: { code: [1000], describe: ''}, // 覆𬌗
    dentalArch: 300, // 牙弓治疗 
    overjet: 100, // 覆盖
    anteriorCrossbite: [300], // 前牙反𬌗
    anteriorEdge2Edge: [300], // 前牙对刃𬌗
    posteriorCrossbite: 300, // 后牙
    midline: 100, // 中线
    specialDescribe: '', // 特殊说明
    // 测试数据
    // complaints: { code: [1,9], describe: 'test' }, // 牙弓
    // mesioDistal: { left: [1501, 1502], right: [2600] }, // 矢状向关系
    // overbite: { code: [4201], describe: ''}, // 覆𬌗
    // overbite: { code: [4400], describe: 'sdfs'}, // 覆𬌗
}

const getters = {
    molar: (state: State) => {
        return (left: boolean) => {
            if (left) return state.molar.left;
            return state.molar.right;
        }
    },
    spacing: (state: State) => {
        return (left: boolean) => {
            if (left) return state.spacing.left;
            return state.spacing.right;
        }
    },
    mesioDistal: (state: State) => {
        return (left: boolean) => {
            if (left) return state.mesioDistal.left;
            return state.mesioDistal.right;
        }
    },
    dentalArch: (state: State) => state.dentalArch,
    overjet: (state: State) => state.overjet,
    midline: (state: State) => state.midline,
    specialDescribe: (state: State) => state.specialDescribe,
    posterior: (state: State) => state.posteriorCrossbite,
    anterior: (state: State) => {
        return (isCrossbite: boolean) => {
            if (isCrossbite) return state.anteriorCrossbite;
            return state.anteriorEdge2Edge;
        }
    },
    complaints: (state: State) => {
        return (isCode: boolean) => {
            if (isCode) return state.complaints.code;
            else return state.complaints.describe;
        }
    },
    remote: (state: State) => {
        return (isCode: boolean) => {
            if (isCode) return state.remote.code;
            else return state.remote.describe;
        }
    },
    overbite: (state: State) => {
        return (isCode: boolean) => {
            if (isCode) return state.overbite.code;
            else return state.overbite.describe;
        }
    },
}

const mutations = {
    setMolar: (state: State, tco: TwoCodeOption) => {
        if (tco.left) {
            state.molar.left = tco.code;
        } else {
            state.molar.right = tco.code;
        }
    },
    setSpacing: (state: State, tco: TwoCodeOption) => {
        if (tco.left) {
            state.spacing.left = tco.code;
        } else {
            state.spacing.right = tco.code;
        }
    },
    setMesioDistal: (state: State, ic: TwoCodesOption) => {
        if (ic.left) {
            state.mesioDistal.left = ic.codes;
        } else {
            state.mesioDistal.right = ic.codes;
        }
    },
    setComplaints: (state: State, cd: CodesWithDescribe) => {
        state.complaints.code = cd.code;
        state.complaints.describe = cd.describe;
    },
    setRemote: (state: State, cd: CodesWithDescribe) => {
        state.remote.code = cd.code;
        state.remote.describe = cd.describe;
    },
    setOverbite: (state: State, cd: CodesWithDescribe) => {
        state.overbite.code = cd.code;
        state.overbite.describe = cd.describe;
    },
    setDentalArch: (state: State, code: number) => {
        state.dentalArch = code;
    },
    setOverjet: (state: State, code: number) => {
        state.overjet = code;
    },
    setSpecialDescribe: (state: State, describe: string) => {
        state.specialDescribe = describe;
    },
    setMidline: (state: State, code: number) => {
        state.midline = code;
    },
    setPosterior: (state: State, code: number) => {
        state.posteriorCrossbite = code;
    },
    setAnterior: (state: State, ao: AnteriorOption) => {
        if (ao.crossbite) state.anteriorCrossbite = ao.codes;
        else state.anteriorEdge2Edge = ao.codes;
    },
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