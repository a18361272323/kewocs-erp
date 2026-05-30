import { createApp } from 'vue'
import App from './App.vue'

// Vant 全局注册 + 样式
import vant from 'vant'
import 'vant/lib/index.css'

// DESIGN.md Linear dark theme
import '../src/styles/theme.css'
import '../src/styles/index.css'

const app = createApp(App)
app.use(vant)

// DESIGN.md Linear dark theme
document.documentElement.classList.add('dark')
app.mount('#app')
