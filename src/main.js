import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store';
import '@/assets/css/index.scss'
import Navbar from '@/components/Navbar.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 实例化 Pinia
const app = createApp(App);
app.component('Navbar', Navbar)
app.use(router).use(pinia).use(ElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}