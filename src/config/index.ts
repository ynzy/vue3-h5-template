export interface IConfig {
	env?: string // 开发环境
	title?: string // 项目title
	baseUrl?: string // 项目地址
	baseApi?: string // api请求地址
	APPID?: string // 公众号appId  一般放在服务器端
	APPSECRET?: string // 公众号appScript 一般放在服务器端
	$cdn: string // cdn公共资源路径
}

// 根据环境引入不同配置 process.env.NODE_ENV
const config: IConfig = require('./env.' + process.env.VUE_APP_ENV)
export default config
