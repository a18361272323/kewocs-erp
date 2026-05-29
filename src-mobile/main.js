import { createApp } from 'vue'
import App from './App.vue'

// Vant 全局注册 + 样式
import vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(vant)
app.mount('#app')
