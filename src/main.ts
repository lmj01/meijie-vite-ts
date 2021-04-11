import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store'
import i18nPlugin from './plugins/i18n'
import dragPlugin from './plugins/drag'

const app = createApp(App);
app.use(router);
app.use(store);
const i18nStrings = {
    greetings: {
        hi: 'Hallo!'
    }
}
app.use(i18nPlugin, i18nStrings)
app.use(dragPlugin)
app.mount('#app')
