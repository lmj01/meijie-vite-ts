import {login} from '@/apis/login'
export interface State {
    token: string | null;
    loginInfo: Object,
}

const state: State = {
    token: sessionStorage.getItem('token'),
    loginInfo: {},
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
    login(state, data:Object) {
        console.log('action login', data);
        return new Promise((resolve, reject) => {
            login(data).then(res=>{
                console.log(res);
            })
        })
    },
    logout() {

    }
}

export default {
    namespaced: true,    
    state,
    mutations,
    actions,
}