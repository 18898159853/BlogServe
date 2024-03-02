import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store';
import '@/assets/css/index.scss'
import '@/assets/iconfont/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Highlight from '@/utils/highlight'
import "highlight.js/styles/atom-one-dark.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
// 引入使用主题的样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 实例化 Pinia
const app = createApp(App);
app.use(router).use(pinia).use(ElementPlus).use(Highlight).use(VMdPreviewHtml).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}