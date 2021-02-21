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
