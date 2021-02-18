import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/layouts/index.vue'),
		redirect: '/home',
		meta: {
			title: '首页',
			keepAlive: false
		},
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import(/* webpackChunkName: "tabbar" */ '@/views/tabBar/home/index.vue'),
				meta: { title: '首页', keepAlive: false, showTab: true }
			},
			{
				path: '/about',
				name: 'About',
				component: () => import(/* webpackChunkName: "tabbar" */ '@/views/tabBar/about/index.vue'),
				meta: { title: '关于我', keepAlive: false, showTab: true }
			}
		]
	},
	{
		path: '/rem',
		name: 'Rem',
		component: () => import(/* webpackChunkName: "about" */ '../views/Rem.vue')
	},
	{
		path: '/scssConfig',
		name: 'ScssConfig',
		component: () => import(/* webpackChunkName: "about" */ '../views/ScssConfig.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
