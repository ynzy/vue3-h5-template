import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { config } from '@/config'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'amfe-flexible'
// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant'

// 使用mock数据
if (config.mock) {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App)
app.use(vantPlugins)
app.use(store)
app.use(router)
app.mount('#app')
