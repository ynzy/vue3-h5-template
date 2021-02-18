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

module.exports = {
	mergeConfig
}
