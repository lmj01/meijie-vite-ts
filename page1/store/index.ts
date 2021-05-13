import { createStore } from 'vuex'
import moduleRecipe from './recipe'

const store = createStore({
    state: {
        title: 'this is global title',
    },
    mutations: {},
    actions: {},
    modules: {
        recipe: moduleRecipe,
    },
})
if (import.meta.env.DEV) {
    window.mjstore = store
}
export default store;