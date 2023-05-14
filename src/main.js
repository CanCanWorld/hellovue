import {createApp, ref} from 'vue'
import App from './App.vue'
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

let app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios = axios
