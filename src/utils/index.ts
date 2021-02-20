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
