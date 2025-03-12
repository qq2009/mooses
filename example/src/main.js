import '@mooses/theme/reset-pc.css';
import '@mooses/theme/bootstrap-grid.css';
import 'element-plus/dist/index.css';
import '@mooses/video-client/index';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from '@/App.vue';

import Router from '@/router';
const app = createApp(App);

app.use(ElementPlus, { locale: zhCn }).use(Router);
app.mount('#app');

localStorage.setItem('token','1111');
// 监听刷新关闭都可以
window.onbeforeunload = (event) => {
    const token = localStorage.getItem('token');
    debugger;
    fetch('http://localhost:3000/test',{ method: 'POST' });
}
