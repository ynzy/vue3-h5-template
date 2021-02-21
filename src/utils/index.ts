/**
 * 处理await成功失败信息
 * 参考：https://juejin.cn/post/6844903767129718791
 * @param {*} promise
 */

export function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, null]>((err) => [err, null])
}

/**
 * 判断是安卓还是iOS
 */
export const phoneModel = () => {
  const u = navigator.userAgent
  const app = navigator.appVersion
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) return 'android'
  if (isiOS) return 'ios'
}
/**
 * 判断是否是微信浏览器
 */
export const isWeChat = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = navigator.userAgent
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  return !!ua.match(/MicroMessenger/i)
}
