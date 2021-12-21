const prodConfig = require('./prod.config')
const defaultSettings = require('./src/config/env.' + process.env.VUE_APP_ENV + '.ts')
console.log(defaultSettings.title)
// page title
const name = defaultSettings.title || 'vue mobile template'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  // lintOnSave: true, // lint检查
  lintOnSave: !IS_PROD, // lint检查
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  // publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: process.env.OUTPUT_DIR, //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 9020, // 端口
    open: false, // 启动后打开浏览器
    disableHostCheck: true, // 绕过主机检查，解决Invalid Host header问题
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
    //配置跨域
    // proxy: {
    //   '/api': {
    //       target: "https://test.xxx.com",
    //       // ws: true, // 是否启用websockets
    //       changOrigin:true, // 开启代理，在本地创建一个虚拟服务端
    //       pathRewrite:{
    //           '^/api':'/'
    //       }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      // 配置 less主题
      // less: {
      //   modifyVars: {
      //    // 直接覆盖变量
      // 'text-color': '#111',
      // 'border-color': '#eee',
      //     // 通过 less 文件覆盖（文件路径为绝对路径）
      //     hack: `true; @import "${path.join(__dirname, './src/theme/var.less')}";`
      //   }
      // },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "@/assets/css/mixin.scss";
          @import "@/assets/css/variables.scss";
					$cdn: "${defaultSettings.$cdn}";
          `
      }
    }
  },
  configureWebpack: (config) => {
    config.name = name
    // 生产环境配置
    if (IS_PROD) {
      config['performance'] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
  chainWebpack: (config) => {
    // ts-import-plugin 配置
    // prodConfig.mergeConfig(config)
    // 别名
    prodConfig.resolveAlias(config)
    // 生产环境
    config.when(IS_PROD, (config) => {
      // 单独打包第三方模块
      prodConfig.optimization(config)
      // 打包分析
      // prodConfig.webpackReport(config)
      // gZip压缩
      // prodConfig.assetsGzip(config)
      // 代码压缩
      // prodConfig.codeUglify(config)
    })
  }
}
