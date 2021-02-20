import wx from 'weixin-js-sdk'
import { Toast, Dialog } from 'vant'
import store from '@/store'

const apiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'getLocation',
  'chooseWXPay',
  'scanQRCode'
]

export const useWxSdk = (jsApiList = apiList, url = store.getters.initLink) => {}
