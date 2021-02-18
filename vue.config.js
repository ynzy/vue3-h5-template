const path = require('path')
const autoprefixer = require('autoprefixer')
// const defaultSettings = require('./src/config/index.js')
const defaultSettings = require('./src/config/env.' + process.env.VUE_APP_ENV + '.ts')
console.log(defaultSettings)

const resolve = dir => path.join(__dirname, dir)
// page title
const name = defaultSettings.title || 'vue mobile template'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
	lintOnSave: false,
	publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
	outputDir: 'dist', //  生产环境构建文件的目录
	assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
	productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	devServer: {
		port: 9020, // 端口
		open: false, // 启动后打开浏览器
		overlay: {
			//  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
			warnings: false,
			errors: true
		}
		// proxy: {
		//   //配置跨域
		//   '/api': {
		//       target: "https://test.xxx.com",
		//       // ws:true,
		//       changOrigin:true,
		//       pathRewrite:{
		//           '^/api':'/'
		//       }
		//   }
		// }
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [autoprefixer()]
			}
		}
	}
}
