import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import router from './router/index'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router);
app.use(Toast);
app.component('v-select', vSelect)
app.use(createPinia());
app.mount('#app');
