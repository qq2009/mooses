import '@mooses/theme/reset-pc.css';
import '@mooses/theme/bootstrap-grid.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from '@/App.vue';

import Router from '@/router';
const app = createApp(App);

app.use(ElementPlus).use(Router);
app.mount('#app');
