import { createApp } from 'vue'
import App from '@/components/layout2/index.vue'
import router from './router'
import store from './store'
import pluginScroll from '../src/plugins/scroll'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(pluginScroll)
app.mount('#app')
