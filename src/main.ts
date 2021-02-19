import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from '@/config'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'amfe-flexible'
// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (config.mock) {
	const { mockXHR } = require('../mock')
	mockXHR()
}

const app = createApp(App)
app.use(vantPlugins)
app.use(store)
app.use(router)
app.mount('#app')
