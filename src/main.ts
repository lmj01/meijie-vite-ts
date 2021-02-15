import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import i18nPlugin from './plugins/i18n'

const app = createApp(App);
app.use(router);
const i18nStrings = {
    greetings: {
        hi: 'Hallo!'
    }
}
app.use(i18nPlugin, i18nStrings)
app.mount('#app')
