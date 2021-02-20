const path = require('path')
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

const resolve = dir => path.join(__dirname, dir)

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

module.exports = {
	mergeConfig,
	resolveAlias
}
