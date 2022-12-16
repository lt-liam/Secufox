import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
//import 'ant-design-vue/dist/antd.dark.less'

const app = createApp(App);
app.use(Antd).mount('#app');
