import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store';
import '@/assets/css/index.scss'
import '@/assets/iconfont/index.css' 
import Navbar from '@/components/Navbar.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 实例化 Pinia
const app = createApp(App);
app.component('Navbar', Navbar)
app.use(router).use(pinia).use(ElementPlus,{
  locale: zhCn,
}).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}