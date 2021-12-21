import request from '@/utils/request'
import { IResponseType, IJsSdk } from './interface'

/**
 * 前端微信授权
 */
import { config } from '@/config'

export const fetchWeChatAuth = () => {
  const redirectHref =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    config.APPID +
    '&redirect_uri=' +
    encodeURIComponent(location.href.split('?')[0]) +
    '&response_type=code&scope=snsapi_userinfo&state=' +
    'STATE' +
    '#wechat_redirect'
  return redirectHref
}

/**
 * 服务端进行微信授权，回调返回token以及前端路由参数
 * get请求
 * @param {*} route 页面路由 location.href
 */
export const wechatRedirect = () => {
  console.log(`${config.baseApi}/wx/authorize?${location.href}`)
  return `${config.baseApi}/wx/authorize?route=${location.href}`
}

/**
 * JS-SDK使用权限签名算法
 */
type TParams = { url: string }
export const wxJssdk = (params: TParams) => {
  return request<IResponseType<IJsSdk>>({
    url: '/wx/jssdk',
    method: 'get',
    params,
    loading: false
  })
}
