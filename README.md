# vue3-h5-template

基于 Vue3+TypeScript+ Vue-Cli4.0 + vant ui + sass+ rem 适配方案+axios 封装 + jssdk 配置 + vconsole 移动端调试，构建手机端模板脚手架

* 项目地址：[github](https://github.com/ynzy/vue3-h5-template)
* 掘金地址：[掘金](https://juejin.cn/post/6931630327211229198)
* 简书地址：[简书](https://www.jianshu.com/p/adb0983830f6)

[查看 demo](https://vue3-h5-template.vercel.app/) 建议手机端查看

### Node 版本要求

`Vue CLI` 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。

本示例 Node.js 12.14.0
### 项目结构
```js
vue-h5-template -- UI 主目录  
├── public -- 静态资源  
├ ├── favicon.ico -- 图标  
├ └── index.html -- 首页  
├── src -- 源码目录  
├ ├── api -- 后端交互的接口  
├ ├── assets -- 静态资源目录
├ ├ ├── css
├ ├ ├── index.scss -- 全局通用样式
├ ├ ├── mixin.scss -- 全局 mixin
├ ├ └── variables.scss -- 全局变量  
├ ├── components -- 封装的组件  
├ ├── config -- 环境配置  
├ ├── hooks -- vue3 Hooks
├ ├── model -- 类型声明文件
├ ├── const -- 放 vue 页面的配置常量  
├ ├── plugins -- 插件  
├ ├── route -- VUE 路由  
├ ├ ├── index -- 路由入口  
├ ├ └── router.config.js -- 路由表  
├ ├── store -- VUEX  
├ ├── utils -- 工具包  
├ ├ ├── request.js -- axios 封装
├ ├ └── storage.js -- 本地存储封装
├ ├── views -- 业务上的 vue 页面  
├ ├ ├── layouts -- 路由布局页面(是否缓存页面)
├ ├ ├── tabBar -- 底部菜单页面
├ ├ └── orther -- 其他页面
├ ├── App.vue -- 根组件  
├ ├── main.ts -- 入口 ts  
├ ├── shims-axios.d.ts -- axios 声明文件  
├ └── shims-vue.d.ts -- vue 组件声明文件
├── .env.development -- 开发环境  
├── .env.production -- 生产环境  
├── .env.staging -- 测试环境  
├── .eslintrc.js -- ESLint 配置  
├── .gitignore -- git 忽略  
├── .postcssrc.js -- CSS 预处理配置(rem 适配)  
├── babel.config.js -- barbel 配置入口  
├── tsconfig.json -- vscode 路径引入配置
├── package.json -- 依赖管理  
└── vue.config.js -- vue cli4 的 webpack 配置
```
### 启动项目

```bash

git clone https://github.com/ynzy/vue3-h5-template.git

cd vue3-h5-template

npm install

npm run serve
```

## <span id="top">目录</span>
* [√配置多环境变量](#env)
* [√rem 适配方案](#rem)
* [√VantUI 组件按需加载](#vant)
* [√Sass 全局样式](#sass)
* [√适配苹果底部安全距离](#phonex)
* [√使用 Mock 数据](#mock)
* [√Axios 封装及接口管理](#axios)
* [√Vuex 状态管理](#vuex)
* [√Vue-router](#router)
* [√Webpack 4 vue.config.js 基础配置](#base)
* [√配置 alias 别名](#alias)
* [√配置 proxy 跨域](#proxy)
* [√配置 打包分析](#bundle)
* [√externals 引入 cdn 资源](#externals)
* [√去掉 console.log](#console)
* [√splitChunks 单独打包第三方模块](#chunks)
* [√gzip 压缩](#gzip)
* [√uglifyjs 压缩](#uglifyjs)
* [√vconsole 移动端调试](#vconsole)
* [√动态设置 title](#dyntitle)
* [√本地存储 storage 封装](#storage)
* [√配置 Jssdk](#jssdk)
* [√Eslint + Pettier 统一开发规范](#pettier)

### <span id="env">✅ 配置多环境变量 </span>

`package.json` 里的 `scripts` 配置 `serve` `stage` `build`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run serve` 启动本地 , 执行 `development`
- 通过 `npm run stage` 启动测试 , 执行 `development`
- 通过 `npm run prod` 启动开发 , 执行 `development`
- 通过 `npm run stageBuild` 打包测试 , 执行 `staging`
- 通过 `npm run build` 打包正式 , 执行 `production`

```javascript
"scripts": {
  "serve": "vue-cli-service serve --open",
  "stage": "cross-env NODE_ENV=dev vue-cli-service serve --mode staging",
  "prod": "cross-env NODE_ENV=dev vue-cli-service serve --mode production",
  "stageBuild": "vue-cli-service build --mode staging",
  "build": "vue-cli-service build",
}
```

##### 配置介绍

&emsp;&emsp;以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。  
&emsp;&emsp;比如,`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。  
&emsp;&emsp;除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`
在项目根目录中新建`.env.*`

- .env.development 本地开发环境配置

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'development'

```

- .env.staging 测试环境配置

```bash
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'staging'
```

- .env.production 正式环境配置

```bash
 NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'production'
```

这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV `development` `staging` `production`  
变量我们统一在 `src/config/env.*.ts` 里进行管理。

这里有个问题，既然这里有了根据不同环境设置变量的文件，为什么还要去 config 下新建三个对应的文件呢？  
**修改起来方便，不需要重启项目，符合开发习惯。**

config/index.js

```javascript
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
const config = require('./env.' + process.env.VUE_APP_ENV)
module.exports = config
```

并且定义了接口类型，方便我们调用的时候可以自动识别参数

配置对应环境的变量，拿本地环境文件 `env.development.js` 举例，用户可以根据需求修改

```javascript
// 本地环境配置
module.exports = {
	title: 'vue-h5-template',
	baseUrl: 'http://localhost:9018', // 项目地址
	baseApi: 'https://test.xxx.com/api', // 本地api请求地址
	APPID: 'xxx',
	APPSECRET: 'xxx'
}
```

##### 调用 config

```js
import config from '@/config/index'
setup() {
  console.log('环境配置', config)
}
```

[▲ 回顶部](#top)

### <span id="rem">✅ rem 适配方案 </span>

不用担心，项目已经配置好了 `rem` 适配, 下面仅做介绍：

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [amfe-flexible](https://github.com/cuth/postcss-pxtorem) 用于设置 `rem` 基准值

```js
yarn add postcss-pxtorem --dev
yarn add amfe-flexible --save
```

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
	plugins: {
		autoprefixer: {
			overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
		},
		'postcss-pxtorem': {
			rootValue: 37.5,
			propList: ['*']
		}
	}
}
```

我采用了`amfe-flexible`进行设置 rem，看 Github 上说这个更好一些，使用哪个自行参考

```js
// main.ts
// 移动端适配
import 'amfe-flexible'
```

更多详细信息： [vant](https://youzan.github.io/vant/#/zh-CN/quickstart#jin-jie-yong-fa)

**新手必看，老鸟跳过**

很多小伙伴会问我，适配的问题。

我们知道 `1rem` 等于`html` 根元素设定的 `font-size` 的 `px` 值。Vant UI 设置 `rootValue: 37.5`,你可以看到在 iPhone 6 下
看到 （`1rem 等于 37.5px`）：

```html
<html data-dpr="1" style="font-size: 37.5px;"></html>
```

切换不同的机型，根元素可能会有不同的`font-size`。当你写 css px 样式时，会被程序换算成 `rem` 达到适配。

因为我们用了 Vant 的组件，需要按照 `rootValue: 37.5` 来写样式。

举个例子：设计给了你一张 750px \* 1334px 图片，在 iPhone6 上铺满屏幕,其他机型适配。

- 当`rootValue: 70` , 样式 `width: 750px;height: 1334px;` 图片会撑满 iPhone6 屏幕，这个时候切换其他机型，图片也会跟着撑
  满。
- 当`rootValue: 37.5` 的时候，样式 `width: 375px;height: 667px;` 图片会撑满 iPhone6 屏幕。

也就是 iphone 6 下 375px 宽度写 CSS。其他的你就可以根据你设计图，去写对应的样式就可以了。

当然，想要撑满屏幕你可以使用 100%，这里只是举例说明。

```html
<img class="image" src="https://imgs.solui.cn/weapp/logo.png" />

<style>
	/* rootValue: 75 */
	.image {
		width: 750px;
		height: 1334px;
	}
	/* rootValue: 37.5 */
	.image {
		width: 375px;
		height: 667px;
	}
</style>
```

[▲ 回顶部](#top)

### <span id="vant">✅ VantUI 组件按需加载 </span>

项目采用[Vant 自动按需引入组件 (推荐)](https://youzan.github.io/vant/v3/#/zh-CN/quickstart)下
面安装插件介绍：

一般来说 ts 使用的是方案二，但是我在用的过程中有一些问题，所以采用了方案一

方案一：

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 `babel` 插件，它会在编译过程中将
`import` 的写法自动转换为按需引入的方式

#### 安装插件

```bash
npm i babel-plugin-import -D
```

在`babel.config.js` 设置

```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
	[
		'import',
		{
			libraryName: 'vant',
			libraryDirectory: 'es',
			style: true
		},
		'vant'
	]
]
module.exports = {
	presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
	plugins
}
```

方案二：
[ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin)用于 TypeScript 的模块化导入插件

`yarn add ts-import-plugin --dev` 然后在 vue.config.js 中加入

```js
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
// * 三方ui在ts下按需加载的实现
const mergeConfig = config => {
	config.module
		.rule('ts')
		.use('ts-loader')
		.tap(options => {
			options = merge(options, {
				transpileOnly: true,
				getCustomTransformers: () => ({
					before: [
						tsImportPluginFactory({
							libraryName: 'vant',
							libraryDirectory: 'es',
							style: true
						})
					]
				}),
				compilerOptions: {
					module: 'es2015'
				}
			})
			return options
		})
}
```

#### 使用组件

项目在 `src/plugins/vant.js` 下统一管理组件，用哪个引入哪个，无需在页面里重复引用

```javascript
// 按需全局引入 vant组件
import { App as VM } from 'vue'
import { Button, Cell, CellGroup, Icon } from 'vant'

const plugins = [Button, Icon, Cell, CellGroup]

export const vantPlugins = {
	install: function(vm: VM) {
		plugins.forEach(item => {
			vm.component(item.name, item)
		})
	}
}
```

[▲ 回顶部](#top)

### <span id="sass">✅ Sass 全局样式</span>

使用`dart-sass`, 安装速度比较快，大概率不会出现安装不成功

每个页面自己对应的样式都写在自己的 .vue 文件之中 `scoped` 它顾名思义给 css 加了一个域的概念。

```html
<style lang="scss">
	/* global styles */
</style>

<style lang="scss" scoped>
	/* local styles */
</style>
```

#### 目录结构

vue-h5-template 所有全局样式都在 `@/src/assets/css` 目录下设置

```bash
├── assets
│   ├── css
│   │   ├── index.scss               # 全局通用样式
│   │   ├── reset.scss               # 清除浏览器默认样式
│   │   ├── mixin.scss               # 全局mixin
│   │   └── variables.scss           # 全局变量
```

vue.config.js 添加全局样式配置

```json
css: {
	loaderOptions: {
		scss: {
			// 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
			// 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
			prependData: `
				@import "assets/css/mixin.scss";
				@import "assets/css/variables.scss";
				`
			// $cdn: "${defaultSettings.$cdn}";
		}
	}
},
```

设置 js 中可以访问 `$cdn`,`.vue` 文件中使用`this.$cdn`访问

```javascript
// 引入全局样式
import '@/assets/css/index.scss'

// 设置 js中可以访问 $cdn
// 引入cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn
```

在 css 和 js 使用

```html
<script>
	console.log(this.$cdn)
</script>
<style lang="scss" scoped>
	.logo {
		width: 120px;
		height: 120px;
		background: url($cdn+'/weapp/logo.png') center / contain no-repeat;
	}
</style>
```

[▲ 回顶部](#top)

#### 自定义 vant-ui 样式

现在我们来说说怎么重写 `vant-ui` 样式。由于 `vant-ui` 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能
加 `scoped`，但你又想只覆盖这个页面的 `vant` 样式，你就可在它的父级加一个 `class`，用命名空间来解决问题。

```css
.about-container {
	/* 你的命名空间 */
	.van-button {
		/* vant-ui 元素*/
		margin-right: 0px;
	}
}
```

#### 父组件改变子组件样式 深度选择器

当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `::v-deep` 来实现：

```scss
<style scoped>
::v-deep .a {
	.b { /* ... */ }
}
</style>
```

[▲ 回顶部](#top)

### <span id="phonex">✅ 适配苹果底部安全距离</span>

index.html 的 meta 指定了 viewport-fit=cover

[vant 中自带底部安全距离参数](https://youzan.github.io/vant/v3/#/zh-CN/advanced-usage)

```js
<!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
<!-- 开启顶部安全区适配 -->
<van-nav-bar safe-area-inset-top />

<!-- 开启底部安全区适配 -->
<van-number-keyboard safe-area-inset-bottom />
```

如果不用 vant 中的适配，也可以自己写，我在 scss 中写了通用样式

```scss
.fixIphonex {
	padding-bottom: $safe-bottom !important;
	&::after {
		content: '';
		position: fixed;
		bottom: 0 !important;
		left: 0;
		height: calc(#{$safe-bottom} + 1px);
		width: 100%;
		background: #ffffff;
	}
}
```

[▲ 回顶部](#top)

### <span id="mock">✅ 使用 Mock 数据 </span>

mock 请求的封装采用的是 [vue-element-admin 的 mock 请求封装](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/mock-api.html#swagger)，直接拿来用就可以了

- mock.js

```js
const Mock = require('mockjs')

const user = require('./user')
// const role = require('./role')
// const article = require('./article')
// const search = require('./remote-search')

// const mocks = [...user, ...role, ...article, ...search]
const mocks = [...user]
// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
	// mock patch
	// https://github.com/nuysoft/Mock/issues/300
	Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
	Mock.XHR.prototype.send = function() {
		if (this.custom.xhr) {
			this.custom.xhr.withCredentials = this.withCredentials || false

			if (this.responseType) {
				this.custom.xhr.responseType = this.responseType
			}
		}
		this.proxy_send(...arguments)
	}

	function XHR2ExpressReqWrap(respond) {
		return function(options) {
			let result = null
			if (respond instanceof Function) {
				const { body, type, url } = options
				// https://expressjs.com/en/4x/api.html#req
				result = respond({
					method: type,
					body: JSON.parse(body),
					query: url
				})
			} else {
				result = respond
			}
			return Mock.mock(result)
		}
	}

	for (const i of mocks) {
		Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
	}
}

module.exports = {
	mocks,
	mockXHR
}
```

- user.js

```js
const tokens = {
	admin: {
		token: 'admin-token'
	},
	editor: {
		token: 'editor-token'
	}
}

const users = {
	'admin-token': {
		roles: ['admin'],
		introduction: 'I am a super administrator',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		name: 'Super Admin'
	},
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		name: 'Normal Editor'
	}
}

module.exports = [
	// user login
	{
		url: '/vue-h5/user/login',
		type: 'post',
		response: config => {
			const { username } = config.body
			const token = tokens[username]

			// mock error
			// if (!token) {
			// 	return {
			// 		code: 60204,
			// 		message: 'Account and password are incorrect.'
			// 	}
			// }

			return {
				code: 20000,
				data: token,
				msg: '登录成功'
			}
		}
	},

	// get user info
	{
		url: '/vue-h5/user/info.*',
		type: 'get',
		response: config => {
			const { token } = config.query
			const info = users['admin-token']
			// mock error
			// if (!info) {
			// 	return {
			// 		code: 50008,
			// 		message: 'Login failed, unable to get user details.'
			// 	}
			// }

			return {
				code: 20000,
				data: info,
				msg: '登录成功'
			}
		}
	},

	// user logout
	{
		url: '/vue-h5/user/logout',
		type: 'post',
		response: _ => {
			return {
				code: 20000,
				data: 'success'
			}
		}
	}
]
```

- main.js
  如果不需要使用，去除掉这段代码就可以了

```js
// 使用mock数据
if (config.mock) {
	const { mockXHR } = require('../mock')
	mockXHR()
}
```

- 接口请求

```js
onMounted(() => {
	axios
		.get('/vue-h5/user/info')
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.error(err)
		})
})
```

### <span id="axios">✅ Axios 封装及接口管理</span>

`utils/request.js` 封装 axios ,开发者需要根据后台接口做修改。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.hideloading` 是在 api 文件夹下的接口参数里设置，下文会讲
- `service.interceptors.response.use` 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

```ts
/**
 * @description [ axios 请求封装]
 */
import store from '@/store'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
// import { Message, Modal } from 'view-design' // UI组件库
import { Dialog, Toast } from 'vant'
import router from '@/router'
// 根据环境不同引入不同api地址
import config from '@/config'

const service = axios.create({
	baseURL: config.baseApi + '/vue-h5', // url = base url + request url
	timeout: 5000,
	withCredentials: false // send cookies when cross-domain requests
	// headers: {
	// 	// clear cors
	// 	'Cache-Control': 'no-cache',
	// 	Pragma: 'no-cache'
	// }
})

// Request interceptors
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// 加载动画
		if (config.loading) {
			Toast.loading({
				message: '加载中...',
				forbidClick: true
			})
		}
		// 在此处添加请求头等，如添加 token
		// if (store.state.token) {
		// config.headers['Authorization'] = `Bearer ${store.state.token}`
		// }
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

// Response interceptors
service.interceptors.response.use(
	async (response: AxiosResponse) => {
		// await new Promise(resovle => setTimeout(resovle, 3000))
		Toast.clear()
		const res = response.data
		if (res.code !== 0) {
			// token 过期
			if (res.code === 401) {
				// 警告提示窗
				return
			}
			if (res.code == 403) {
				Dialog.alert({
					title: '警告',
					message: res.msg
				}).then(() => {})
				return
			}
			// 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
			return Promise.reject(new Error(res.msg || 'Error'))
		} else {
			// 注意返回值
			return response.data
		}
	},
	(error: any) => {
		Toast.clear()
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求错误(400)'
					break
				case 401:
					error.message = '未授权,请登录(401)'
					break
				case 403:
					error.message = '拒绝访问(403)'
					break
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`
					break
				case 405:
					error.message = '请求方法未允许(405)'
					break
				case 408:
					error.message = '请求超时(408)'
					break
				case 500:
					error.message = '服务器内部错误(500)'
					break
				case 501:
					error.message = '服务未实现(501)'
					break
				case 502:
					error.message = '网络错误(502)'
					break
				case 503:
					error.message = '服务不可用(503)'
					break
				case 504:
					error.message = '网络超时(504)'
					break
				case 505:
					error.message = 'HTTP版本不受支持(505)'
					break
				default:
					error.message = `连接错误: ${error.message}`
			}
		} else {
			if (error.message == 'Network Error') {
				error.message == '网络异常，请检查后重试！'
			}
			error.message = '连接到服务器失败，请联系管理员'
		}
		Toast(error.message)
		// store.auth.clearAuth()
		store.dispatch('clearAuth')
		return Promise.reject(error)
	}
)

export default service
```

#### 接口管理

在`src/api` 文件夹下统一管理接口

- 你可以建立多个模块对接接口, 比如 `home.ts` 里是首页的接口这里讲解 `authController.ts`
- `url` 接口地址，请求的时候会拼接上 `config` 下的 `baseApi`
- `method` 请求方法
- `data` 请求参数 `qs.stringify(params)` 是对数据系列化操作
- `loading` 默认 `false`,设置为 `true` 后，显示 loading ui 交互中有些接口需要让用户感知

```ts
import request from '@/utils/request'
export interface IResponseType<P = {}> {
	code: number
	msg: string
	data: P
}
interface IUserInfo {
	id: string
	avator: string
}
interface IError {
	code: string
}
export const fetchUserInfo = () => {
	return request<IResponseType<IUserInfo>>({
		url: '/user/info',
		method: 'get',
		loading: true
	})
}
```

#### 如何调用

由于`awaitWrap`类型推导很麻烦，所以还是采用 try catch 来捕获错误，既能捕获接口错误，也能捕获业务逻辑错误

```js
onMounted(async () => {
	try {
		let res = await fetchUserInfo()
		console.log(res)
	} catch (error) {
		console.log(error)
	}
})
```

[▲ 回顶部](#top)

### <span id="vuex">✅ Vuex 状态管理</span>

目录结构

```bash
├── store
│   ├── modules
│   ├── |── Auth
│   ├── ├── ├── index.ts
│   ├── ├── ├── interface.ts
│   ├── ├── └── types.ts
│   ├── index.ts
│   ├── getters.ts
```

类型定义

- 模块类型

interface.ts

```ts
import { IUserInfo } from '@/api/interface'

/**
 * 用户信息
 */
export interface IAuthState {
	userInfo: IUserInfo
}
```

index.ts

```ts
import { Module } from 'vuex'
import { IGlobalState } from '@/store/index'
import { IAuthState } from '@/store/modules/Auth/interface'
import * as Types from '@/store/modules/Auth/types'

const state: IAuthState = {
	userInfo: {}
}

const login: Module<IAuthState, IGlobalState> = {
	namespaced: true,
	state,
	mutations: {
		[Types.SAVE_USER_INFO](state, data) {
			state.userInfo = data
		}
	},
	actions: {
		async [Types.SAVE_USER_INFO]({ commit }, data) {
			return commit(Types.SAVE_USER_INFO, data)
		}
	}
}

export default login
```

- 全局 store 类型

将模块类型导入到 index.ts,定义全局类型

```ts
import { IAuthState } from './modules/Auth/interface'

export interface IGlobalState {
	auth: IAuthState
}

const store = createStore<IGlobalState>({
	getters,
	modules: {
		auth
	}
})

export default store
```

`main.ts` 引入

```javascript
import { createApp } from 'vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')
```

使用

```ts
import { fetchUserInfo } from '@/api/authController.ts'
import { useStore } from 'vuex'
import * as Types from '@/store/modules/Auth/types'
import { IGlobalState } from '@/store'

export default defineComponent({
	name: 'about',
	props: {},
	setup(props) {
		const store = useStore<IGlobalState>()
		const userInfo = computed(() => {
			return store.state.auth.userInfo
		})
		onMounted(async () => {
			try {
				let res = await fetchUserInfo()
				if (res.code !== 0) return new Error(res.msg)
				// Action 通过 store.dispatch 方法触发
				store.dispatch(`auth/${Types.SAVE_USER_INFO}`, res.data)
			} catch (error) {
				console.log(error)
			}
		})
		return {
			userInfo
		}
	}
})
```

[▲ 回顶部](#top)

### <span id="router">✅ Vue-router </span>

本案例主要采用 `history` 模式，开发者根据需求修改 `mode` `base`

前往:[vue.config.js 基础配置](#base)

```ts
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

export default router
```

```ts
import { RouteRecordRaw } from 'vue-router'

export const constantRouterMap: Array<RouteRecordRaw> = [
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
				path: '/demo',
				name: 'Dome',
				component: () => import(/* webpackChunkName: "tabbar" */ '@/views/tabBar/dome/index.vue'),
				meta: { title: '首页', keepAlive: false, showTab: true }
			},
			{
				path: '/about',
				name: 'About',
				component: () => import(/* webpackChunkName: "tabbar" */ '@/views/tabBar/about/index.vue'),
				meta: { title: '关于我', keepAlive: false, showTab: true }
			}
		]
	}
]
```

更多:[Vue Router](https://next.router.vuejs.org/zh/index.html)

[▲ 回顶部](#top)

### <span id="base">✅ Webpack 4 vue.config.js 基础配置 </span>

如果你的 `Vue Router` 模式是 hash

```javascript
publicPath: './',
```

如果你的 `Vue Router` 模式是 history 这里的 publicPath 和你的 `Vue Router` `base` **保持一直**

```javascript
publicPath: '/app/',
```

```javascript
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
	// publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
	publicPath: '/app/', // 署应用包时的基本 URL。  vue-router history模式使用
	outputDir: 'dist', //  生产环境构建文件的目录
	assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
	lintOnSave: !IS_PROD,
	productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	devServer: {
		port: 9020, // 端口号
		open: false, // 启动后打开浏览器
		overlay: {
			//  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
			warnings: false,
			errors: true
		}
		// ...
	}
}
```

[▲ 回顶部](#top)

### <span id="alias">✅ 配置 alias 别名 </span>

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
	chainWebpack: config => {
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('api', resolve('src/api'))
			.set('views', resolve('src/views'))
			.set('components', resolve('src/components'))
	}
}
```

[▲ 回顶部](#top)

### <span id="proxy">✅ 配置 proxy 跨域 </span>

如果你的项目需要跨域设置，你需要打来 `vue.config.js` `proxy` 注释 并且配置相应参数

<u>**!!!注意：你还需要将 `src/config/env.development.js` 里的 `baseApi` 设置成 '/'**</u>

```javascript
module.exports = {
	devServer: {
		// ....
		proxy: {
			//配置跨域
			'/api': {
				target: 'https://test.xxx.com', // 接口的域名
				// ws: true, // 是否启用websockets
				changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	}
}
```

使用 例如: `src/api/home.js`

```javascript
export function getUserInfo(params) {
	return request({
		url: '/api/userinfo',
		method: 'post',
		data: qs.stringify(params)
	})
}
```

[▲ 回顶部](#top)

### <span id="bundle">✅ 配置 打包分析 </span>

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	chainWebpack: config => {
		// 打包分析
		if (IS_PROD) {
			config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
				{
					analyzerMode: 'static'
				}
			])
		}
	}
}
```

```bash
npm run build
```

[▲ 回顶部](#top)

### <span id="externals">✅ 配置 externals 引入 cdn 资源 </span>

这个版本 CDN 不再引入，我测试了一下使用引入 CDN 和不使用,不使用会比使用时间少。网上不少文章测试 CDN 速度块，这个开发者可
以实际测试一下。

另外项目中使用的是公共 CDN 不稳定，域名解析也是需要时间的（如果你要使用请尽量使用同一个域名）

因为页面每次遇到`<script>`标签都会停下来解析执行，所以应该尽可能减少`<script>`标签的数量 `HTTP`请求存在一定的开销，100K
的文件比 5 个 20K 的文件下载的更快，所以较少脚本数量也是很有必要的

暂时还没有研究放到自己的 cdn 服务器上。

```javascript
const defaultSettings = require('./src/config/index.js')
const name = defaultSettings.title || 'vue mobile template'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// externals
const externals = {
	vue: 'Vue',
	'vue-router': 'VueRouter',
	vuex: 'Vuex',
	vant: 'vant',
	axios: 'axios'
}
// CDN外链，会插入到index.html中
const cdn = {
	// 开发环境
	dev: {
		css: [],
		js: []
	},
	// 生产环境
	build: {
		css: ['https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.css'],
		js: [
			'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
			'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
			'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
			'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
			'https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js'
		]
	}
}
module.exports = {
	configureWebpack: config => {
		config.name = name
		// 为生产环境修改配置...
		if (IS_PROD) {
			// externals
			config.externals = externals
		}
	},
	chainWebpack: config => {
		/**
		 * 添加CDN参数到htmlWebpackPlugin配置中
		 */
		config.plugin('html').tap(args => {
			if (IS_PROD) {
				args[0].cdn = cdn.build
			} else {
				args[0].cdn = cdn.dev
			}
			return args
		})
	}
}
```

在 public/index.html 中添加

```javascript
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %>
     <!-- 使用CDN加速的JS文件，配置在vue.config.js下 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
```

[▲ 回顶部](#top)

### <span id="console">✅ 去掉 console.log </span>

保留了测试环境和本地环境的 `console.log`

```bash
npm i -D babel-plugin-transform-remove-console
```

在 babel.config.js 中配置

```javascript
// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)
const plugins = [
	[
		'import',
		{
			libraryName: 'vant',
			libraryDirectory: 'es',
			style: true
		},
		'vant'
	]
]
// 去除 console.log
if (IS_PROD) {
	plugins.push('transform-remove-console')
}

module.exports = {
	presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'entry' }]],
	plugins
}
```

[▲ 回顶部](#top)

### <span id="chunks">✅ splitChunks 单独打包第三方模块</span>

```javascript
module.exports = {
	chainWebpack: config => {
		config.when(IS_PROD, config => {
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// 将 runtime 作为内联引入不单独存在
						inline: /runtime\..*\.js$/
					}
				])
				.end()
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					// cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'),
						minChunks: 3, //  被至少用三次以上打包分离
						priority: 5, // 优先级
						reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
					},
					node_vendors: {
						name: 'chunk-libs',
						chunks: 'initial', // 只打包初始时依赖的第三方
						test: /[\\/]node_modules[\\/]/,
						priority: 10
					},
					vantUI: {
						name: 'chunk-vantUI', // 单独将 vantUI 拆包
						priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
						test: /[\\/]node_modules[\\/]_?vant(.*)/
					}
				}
			})
			config.optimization.runtimeChunk('single')
		})
	}
}
```

[▲ 回顶部](#top)

### <span id="gzip">✅ gzip 压缩</span>

可能会报错，安装低版本
参考地址[https://www.cnblogs.com/wuzhiquan/p/14179388.html](https://www.cnblogs.com/wuzhiquan/p/14179388.html)

```js
// * 打包gzip
const assetsGzip = config => {
	config.plugin('compression-webpack-plugin').use(require('compression-webpack-plugin'), [
		{
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.html$|\.json$|\.css/,
			threshold: 10240, // 只有大小大于该值的资源会被处理 10240
			minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
			deleteOriginalAssets: true // 删除原文件
		}
	])
}
```

[▲ 回顶部](#top)

### <span id="uglifyjs">✅ uglifyjs 压缩</span>

需要注意，使用此插件，需要把 es6 代码转成 es5 代码，此项目没有使用

```js
// * 代码压缩
const codeUglify = config => {
	config.plugin('uglifyjs-webpack-plugin').use(require('uglifyjs-webpack-plugin'), [
		{
			uglifyOptions: {
				//生产环境自动删除console
				compress: {
					drop_debugger: true,
					drop_console: false,
					pure_funcs: ['console.log']
				}
			},
			sourceMap: false,
			parallel: true
		}
	])
}
```

[▲ 回顶部](#top)

### <span id="vconsole">✅ vconsole 移动端调试 </span>

参考地址：https://github.com/AlloyTeam/AlloyLever
参考地址：https://www.cnblogs.com/liyinSakura/p/9883777.html

```ts
<!-- MobileConsole -->
<template>
	<teleport to="#vconsole">
		<div class="vc-tigger" @click="toggleVc"></div>
	</teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, reactive } from 'vue'
import VConsole from 'vconsole'
import config from '@/config'
import { useDOMCreate } from '@/hooks/useDOMCreate'
interface IState {
	lastClickTime: number
	count: number
	limit: number
	vConsole: any
}
export default defineComponent({
	name: 'MobileConsole',
	props: {},
	setup() {
		useDOMCreate('vconsole')
		const state = reactive<IState>({
			lastClickTime: 0,
			count: 0,
			limit: ['production', 'prod'].includes(config.env || '') ? 5 : 0,
			vConsole: null
		})
		const hasClass = (obj: HTMLElement | null, cls: string) => {
			return obj?.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
		}
		const addClass = (obj: HTMLElement | null, cls: string) => {
			if (!hasClass(obj, cls)) obj?.classList.add(cls)
		}
		const removeClass = (obj: HTMLElement | null, cls: string) => {
			if (hasClass(obj, cls)) {
				obj?.classList.remove(cls)
			}
		}
		const toggleClass = (obj: HTMLElement | null, cls: string) => {
			if (hasClass(obj, cls)) {
				removeClass(obj, cls)
			} else {
				addClass(obj, cls)
			}
		}
		const toggleVc = () => {
			const nowTime = new Date().getTime()
			if (nowTime - state.lastClickTime < 3000) {
				state.count++
			} else {
				state.count = 0
			}
			state.lastClickTime = nowTime
			if (state.count >= state.limit) {
				if (!state.vConsole) {
					state.vConsole = new VConsole()
				}
				let vconDom = document.getElementById('__vconsole')
				toggleClass(vconDom, 'vconsole_show')
				state.count = 0
			}
		}
		onUnmounted(() => {
			state.vConsole = null
		})
		return {
			toggleVc
		}
	}
})
</script>
<style lang="scss" scoped>
.vc-tigger {
	position: fixed;
	top: 0;
	left: 0;
	width: 20px;
	height: 20px;
	background: red;
}
</style>

```

- 在组件中设置暗门，点击几次显示 vconsole
  - 在 app.vue 中通过 limit 进行设置
  - 开发测试环境点击一次就可显示
  - 生产环境点击 5 次

#### teleport

官方文档:[https://v3.cn.vuejs.org/guide/teleport.html](https://v3.cn.vuejs.org/guide/teleport.html)

以前的弹框之类的组件哪里引用，dom 元素就在哪里，它可以帮助我们把这些代码从组件代码中分离开，方便我们更好查看 dom 元素组成

useDOMCreate 可以帮助我们便捷创建 dom 元素，这样就不需要在 index.html 去创建 teleport 需要的 dom 元素了

[▲ 回顶部](#top)

### <span id="dyntitle">✅ 动态设置 title </span>

```js
export const useDocumentTitle = (title: string) => {
	document.title = title
}
```

router/index.ts 使用

```ts
router.beforeEach((to, from, next) => {
	useDocumentTitle(to.meta.title)
	next()
})
```

[▲ 回顶部](#top)

### <span id="storage">✅ 本地存储 storage 封装 </span>

案例在：dome/storage/index.vue 下

引用：

```js
import { storage } from '@/utils/storage'
```

调用：

```js
storage.set('data', originalData.value)
storageData.value = storage.get('data')
```

[▲ 回顶部](#top)

### <span id="jssdk">✅ 配置 Jssdk </span>

TODO： 待更新

安装：

```bash
yarn add weixin-js-sdk
```

类型声明写在了 model/weixin-js-sdk.d.ts

由于苹果浏览器只识别第一次进入的路由，所以需要先处理下配置使用的 url

- router.ts
此处的jssdk配置仅供演示，正常业务逻辑需要配合后端去写
```ts
import { isWeChat } from '../utils/index'
import { fetchWeChatAuth } from '@/api/WxController'
import { getQueryParams, phoneModel } from '@/utils'
import store from '@/store'

// 路由开始进入
router.beforeEach((to, from, next) => {
  //! 解决ios微信下，分享签名不成功的问题,将第一次的进入的url缓存起来。
  if (window.entryUrl === undefined) {
    window.entryUrl = location.href.split('#')[0]
  }
	const { code } = getQueryParams<IQueryParams>()
		// 微信浏览器内微信授权登陆
		// && !store.state.auth.userInfo.name
		if (isWeChat()) {
			if (code) {
				store.commit('auth/STE_ISAUTH', true)
				store.commit('auth/STE_CODE', code)
			}
			if (!store.state.auth.isAuth) {
				location.href = fetchWeChatAuth()
			}
		}
  next()
})
router.afterEach((to, from, next) => {
  let url
  if (phoneModel() === 'ios') {
    url = window.entryUrl
  } else {
    url = window.location.href
  }
	// 保存url
  store.commit('link/SET_INIT_LINK', url)
})
```

store/Link
```ts
import { Module } from 'vuex'
import { IGlobalState } from '@/store/index'
import { ILinkState } from '@/store/modules/Link/interface'

const state: ILinkState = {
  initLink: ''
}

const login: Module<ILinkState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    ['SET_INIT_LINK'](state, data) {
      console.log(data)
      state.initLink = data
    }
  },
  actions: {}
}

export default login
```
由于window没有entryUrl变量，需要声明文件进行声明

typings.ts
```ts
declare interface Window {
  entryUrl: any
}
```

创建 hooks 函数

hooks/useWxJsSdk.ts

每个页面使用jssdk，都需要调用一次useWxJsSdk,然后再使用其他封装的函数

调用：

```ts
```

[▲ 回顶部](#top)

### <span id="pettier">✅ Eslint + Pettier 统一开发规范 </span>

参考Typescript的[代码检查](https://ts.xcatliu.com/engineering/lint.html)

VScode 安装 `eslint` `prettier` `vetur` 插件

在文件 `.prettierrc` 里写 属于你的 pettier 规则
或者`prettier.config.js`

```js
module.exports =  {
  "wrap_line_length": 120,
  "wrap_attributes": "auto",
  "eslintIntegration":true,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ],
	// 一行最多 100 字符
	printWidth: 100,
	// 使用 4 个空格缩进
	tabWidth: 2,
	// 不使用缩进符，而使用空格
	useTabs: false,
	// 行尾需要有分号
	semi: true,
	// 使用单引号
	singleQuote: true,
	// 对象的 key 仅在必要时用引号
	quoteProps: 'as-needed',
	// jsx 不使用单引号，而使用双引号
	jsxSingleQuote: false,
	// 末尾不需要逗号
	trailingComma: 'none',
	// 大括号内的首尾需要空格
	bracketSpacing: true,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 箭头函数，只有一个参数的时候，也需要括号 avoid
	arrowParens: 'always',
	// 每个文件格式化的范围是文件的全部内容
	rangeStart: 0,
	rangeEnd: Infinity,
	// 不需要写文件开头的 @prettier
	requirePragma: false,
	// 不需要自动在文件开头插入 @prettier
	insertPragma: false,
	// 使用默认的折行标准 always
	proseWrap: 'preserve',
	// 根据显示样式决定 html 要不要折行
	htmlWhitespaceSensitivity: 'css',
	// 换行符使用 lf auto
	endOfLine: 'lf'
}
```
.eslintrc.js 配置
```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0 // TODO
  }
};

```

Vscode setting.json 设置

```json
{
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[tavascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 保存时用eslint格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 两者会在格式化js时冲突，所以需要关闭默认js格式化程序
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "vetur.format.defaultFormatter.html": "none",
  // js/ts程序用eslint，防止vetur中的prettier与eslint格式化冲突
  "vetur.format.defaultFormatter.js": "none",
  "vetur.format.defaultFormatter.ts": "none",
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  // "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    }
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

[▲ 回顶部](#top)

# 鸣谢 ​

[vue-h5-template](https://github.com/sunniejs/vue-h5-template)
[vue-cli4-config](https://github.com/staven630/vue-cli4-config)
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
