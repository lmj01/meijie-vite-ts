import {login} from '@/apis/login'
export interface State {
    token: string | null;
    loginInfo: Object,
}

const state: State = {
    // 如果刷新页面，直接获取本地的token作为请求标识
    token: sessionStorage.getItem('token'),
    loginInfo: {},
}

const getters = {
    info: (state: State) => state.loginInfo,
    token: (state: State) => state.token,
}

const mutations = {
    setToken: (state: State, token: string) => {
        state.token = token;
    },
    setLogin: (state: State, info: Object) => {
        state.loginInfo = info;
    }
}

const actions = {
    login({ commit }, data:Object) {
        return new Promise((resolve, reject) => {
            return login(data)
            .then((res:Object)=>{
                commit('setLogin', res);
                // 覆盖本地的token
                commit('setToken', res.token);
                sessionStorage.setItem('token', res.token);                
                console.log('login ok');
                resolve(res);
            })
            .catch((err:any) => {
                console.log('login fail');
                reject(err);
            })
        })
    },
    logout() {

    }
}

export default {
    namespaced: true,    
    state,
    getters,
    mutations,
    actions,
}