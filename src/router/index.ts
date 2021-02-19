import { createRouter, createWebHistory } from 'vue-router'
import { constantRouterMap } from './router.config'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	// 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
	routes: constantRouterMap
})

// 路由开始进入
router.beforeEach((to, from, next) => {
	next()
})

router.afterEach((to, from, next) => {})

export default router
