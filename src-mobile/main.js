import { createApp } from 'vue'
import App from './App.vue'

import vant from 'vant'
import 'vant/lib/index.css'

import '../src/styles/theme.css'
import '../src/styles/index.css'

const app = createApp(App)
app.use(vant)

// 移动端固定暖色主题，无需暗色切换
document.documentElement.className = 'light-warm'
app.mount('#app')