import { createStore } from 'vuex'
import moduleLogin from './login'

const store = createStore({
    state: {
        title: 'this is global title',
    },
    mutations: {},
    actions: {},
    modules: {
        login: moduleLogin,
    },
})
export default store;