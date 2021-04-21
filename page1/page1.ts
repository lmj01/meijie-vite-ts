import { createApp } from 'vue'
import App from '@/components/layout2/index.vue'
import router from './router'
import store from '../src/store'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')
