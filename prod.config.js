const path = require('path')
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

const resolve = dir => path.join(__dirname, dir)

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

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
							style: name => `${name}/style/less`
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

// 别名 alias
const resolveAlias = config => {
	config.resolve.alias
		.set('@', resolve('src'))
		.set('assets', resolve('src/assets'))
		.set('api', resolve('src/api'))
		.set('views', resolve('src/views'))
		.set('components', resolve('src/components'))
}

// * 公共代码抽离
const optimization = config => {
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

module.exports = {
	mergeConfig,
	resolveAlias,
	optimization
}
