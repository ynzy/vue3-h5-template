# vue3-h5-template

基于 Vue3+TypeScript+ Vue-Cli4.0 + vant ui + sass+ rem 适配方案+axios 封装 + jssdk 配置 + vconsole 移动端调试，构建手机端模板脚手架

[查看 demo](https://vue3-h5-template.vercel.app/) 建议手机端查看

### Node 版本要求

`Vue CLI` 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。

本示例 Node.js 12.14.0

### 项目结构

> vue-h5-template -- UI 主目录  
> ├── public -- 静态资源  
> ├ ├── favicon.ico -- 图标  
> ├ └── index.html -- 首页  
> ├── src -- 源码目录  
> ├ ├── api -- 后端交互的接口  
> ├ ├── assets -- 静态资源目录
> ├ ├── css
> ├ ├── index.scss -- 全局通用样式
> ├ ├── mixin.scss -- 全局 mixin
> ├ └── variables.scss -- 全局变量  
> ├ ├── components -- 封装的组件  
> ├ ├── config -- 环境配置  
> ├ ├── const -- 放 vue 页面的配置常量  
> ├ ├── filters -- 过滤器  
> ├ ├── plugins -- 插件  
> ├ └── route -- VUE 路由  
> ├ ├── index -- 路由入口  
> ├ └── router.config.js -- 路由表  
> ├ ├── store -- VUEX  
> ├ └── util -- 工具包  
> ├ ├── request.js -- axios 封装  
> ├ ├── vconsole.js -- 移动端调试插件
> ├ ├── jsApiList.js -- 微信 JS 接口列表
> ├ ├── wechatPlugin.js -- jssdk 插件配置
> ├ ├── storage.js -- 本地存储封装
> ├ └── util -- 工具包  
> ├ └── views -- 业务上的 vue 页面  
> ├ ├── layouts -- 路由布局页面(是否缓存页面)
> ├ └── home -- 公众号
> ├ ├── App.vue -- 根组件  
> ├ └── main.js -- 入口 js  
> ├── .env.development -- 开发环境  
> ├── .env.production -- 生产环境  
> ├── .env.staging -- 测试环境  
> ├── ..eslintrc.js -- ESLint 配置  
> ├── .gitignore -- git 忽略  
> ├── .postcssrc.js -- CSS 预处理配置(rem 适配)  
> ├── babel.config.js -- barbel 配置入口  
> ├── tsconfig.json -- vscode 路径引入配置
> ├── package.json -- 依赖管理  
> └── vue.config.js -- vue cli3 的 webpack 配置

### 启动项目

```bash

git clone https://github.com/ynzy/vue3-h5-template.git

cd vue3-h5-template

npm install

npm run serve
```

<span id="top">目录</span>

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

### <span id="vant">✅ 自动添加浏览器前缀 (有影响，废弃)</span>

```js
yarn add autoprefixer --dev
```

vue.config.js 添加配置

```js
const autoprefixer = require('autoprefixer')

css: {
	loaderOptions: {
		postcss: {
			plugins: [autoprefixer()]
		},
	}
},
```

报错：

```js
PostCSS plugin autoprefixer requires PostCSS 8
```

autoprefixer 版本过高,降低 autoprefixer 版本即可

执行

```js

yarn add postcss-loader autoprefixer@8.0.0 --dev
```

[参考地址](https://blog.csdn.net/candyyii/article/details/109055180)

[▲ 回顶部](#top)

### <span id="vant">✅ VantUI 组件按需加载 </span>

项目采用[Vant 自动按需引入组件 (推荐)](https://youzan.github.io/vant/v3/#/zh-CN/quickstart)下
面安装插件介绍：
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

### <span id="vuex">✅ Vuex 状态管理</span>

### <span id="axios">✅ Axios 封装及接口管理</span>

`utils/request.js` 封装 axios ,开发者需要根据后台接口做修改。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.hideloading` 是在 api 文件夹下的接口参数里设置，下文会讲
- `service.interceptors.response.use` 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

### <span id="router">✅ Vue-router </span>
