/**
 * @description [ axios 请求封装]
 */
import store from '@/store'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
// import { Message, Modal } from 'view-design' // UI组件库
import router from '@/router'

declare module 'axios' {
	export interface AxiosRequestConfig {
		/**
		 * @description 设置为true，则会在请求过程中显示loading动画，直到请求结束才消失
		 */
		loading?: boolean
	}
}
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
	timeout: 5000,
	withCredentials: true // send cookies when cross-domain requests
	// headers: {
	// clear cors
	// 'Cache-Control': 'no-cache',
	// Pragma: 'no-cache'
	// }
})

// Request interceptors
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// Add Authorization header to every request, you can add other custom headers here
		// 在此处添加请求头等，如添加 token
		if (store.state.token) {
			config.headers['Authorization'] = `Bearer ${store.state.token}`
		}
		if (config.loading) {
			// 加载动画
		}
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

// Response interceptors
service.interceptors.response.use(
	async (response: AxiosResponse) => {
		store.commit('setError', { status: false, message: '' })
		// await new Promise(resovle => setTimeout(resovle, 3000))
		store.commit('setLoading', false)
		const res = response.data
		// console.log(res)
		if (res.code !== 0) {
			// ;(Message as any).error({
			//   content: res.info || 'Error',
			//   duration: 5,
			//   background: true
			// })

			if (res.code === 401 || res.code === 403 || res.code === 408) {
				// 警告提示窗
				// ;(Modal as any).warning({
				//   // Modal.confirm({
				//   title: '提示',
				//   content: `你已被登出，可以取消继续留在该页面，或者重新登录`,
				//   okText: '确定',
				//   cancalText: '取消',
				//   width: 300,
				//   onOk: () => {
				//     setTimeout(() => {
				//       ;(Modal as any).remove()
				//       ;(Modal as any).info('退出成功')
				//       // 可在此处清空token等操作
				//       router.push('/') // 跳转到登录页，具体根据项目路由修改
				//     }, 2000)
				//   }
				// })
			}
			// 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
			return Promise.reject(new Error(res.msg || 'Error'))
		} else {
			// 注意返回值
			return response.data
		}
	},
	(e: any) => {
		store.commit('setLoading', false)
		console.log(e.response)
		const { error } = e.response.data
		store.commit('setError', { status: true, message: error })
		if (e && e.response) {
			switch (e.response.status) {
				case 400:
					e.message = '请求错误(400)'
					break
				case 401:
					e.message = '未授权,请登录(401)'
					break
				case 403:
					e.message = '拒绝访问(403)'
					break
				case 404:
					e.message = `请求地址出错: ${e.response.config.url}`
					break
				case 405:
					e.message = '请求方法未允许(405)'
					break
				case 408:
					e.message = '请求超时(408)'
					break
				case 500:
					e.message = '服务器内部错误(500)'
					break
				case 501:
					e.message = '服务未实现(501)'
					break
				case 502:
					e.message = '网络错误(502)'
					break
				case 503:
					e.message = '服务不可用(503)'
					break
				case 504:
					e.message = '网络超时(504)'
					break
				case 505:
					e.message = 'HTTP版本不受支持(505)'
					break
				default:
					e.message = `连接错误: ${e.message}`
			}
		} else {
			e.message = '连接到服务器失败，请联系管理员'
		}
		// ;(Message as any).error({
		//   content: error.info || error.message || 'Error',
		//   duration: 5,
		//   background: true
		// })
		return Promise.reject(error)
	}
)

export default service
