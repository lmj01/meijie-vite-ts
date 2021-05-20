import { createStore } from 'vuex'
import moduleRecipe from './recipe'
import moduleTeeth from './teeth'

const store = createStore({
    state: {
        title: 'this is global title',
    },
    mutations: {},
    actions: {},
    modules: {
        recipe: moduleRecipe,
        teeth: moduleTeeth,
    },
})
if (import.meta.env.DEV) {
    window.mjstore = store
}
export default store;