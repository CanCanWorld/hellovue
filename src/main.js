import {createApp, ref} from 'vue'
import App from './App.vue'

import axios from "axios";
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

let app = createApp(App);
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios = axios
