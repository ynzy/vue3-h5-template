declare namespace WeixinJsSdk {
  /** **************************************************************************
   * Type definations
   ****************************************************************************/
  type JSApis =
    | 'updateAppMessageShareData'
    | 'updateTimelineShareData'
    | 'onMenuShareTimeline'
    | 'onMenuShareAppMessage'
    | 'onMenuShareQQ'
    | 'onMenuShareWeibo'
    | 'onMenuShareQZone'
    | 'startRecord'
    | 'stopRecord'
    | 'onVoiceRecordEnd'
    | 'playVoice'
    | 'pauseVoice'
    | 'stopVoice'
    | 'onVoicePlayEnd'
    | 'uploadVoice'
    | 'downloadVoice'
    | 'chooseImage'
    | 'previewImage'
    | 'uploadImage'
    | 'downloadImage'
    | 'translateVoice'
    | 'getNetworkType'
    | 'openLocation'
    | 'getLocation'
    | 'hideOptionMenu'
    | 'showOptionMenu'
    | 'hideMenuItems'
    | 'showMenuItems'
    | 'hideAllNonBaseMenuItem'
    | 'showAllNonBaseMenuItem'
    | 'closeWindow'
    | 'scanQRCode'
    | 'chooseWXPay'
    | 'openProductSpecificView'
    | 'addCard'
    | 'chooseCard'
    | 'openCard'
    | 'checkJsApi'
    | 'onRecordEnd'
    | 'openWXDeviceLib'
    | 'closeWXDeviceLib'
    | 'configWXDeviceWiFi'
    | 'getWXDeviceInfos'
    | 'sendDataToWXDevice'
    | 'startScanWXDevice'
    | 'stopScanWXDevice'
    | 'connectWXDevice'
    | 'disconnectWXDevice'
    | 'getWXDeviceTicket'
    | 'WeixinJSBridgeReady'
    | 'onWXDeviceBindStateChange'
    | 'onWXDeviceStateChange'
    | 'onScanWXDeviceResult'
    | 'onReceiveDataFromWXDevice'
    | 'onWXDeviceBluetoothStateChange'

  type Menus =
    | 'menuItem:exposeArticle' // 举报
    | 'menuItem:setFont' // 调整字体
    | 'menuItem:dayMode' // 日间模式
    | 'menuItem:nightMode' // 夜间模式
    | 'menuItem:refresh' // 刷新
    | 'menuItem:profile' // 查看公众号（已添加）
    | 'menuItem:addContact' // 查看公众号（未添加）
    | 'menuItem:share:appMessage' // 发送给朋友
    | 'menuItem:share:timeline' // 分享到朋友圈
    | 'menuItem:share:qq' // 分享到 QQ
    | 'menuItem:share:weiboApp' // 分享到 Weibo
    | 'menuItem:favorite' // 收藏
    | 'menuItem:share:facebook' // 分享到 Facebook
    | 'menuItem:share:QZone' // 分享到 QQ 空间
    | 'menuItem:editTag' // 编辑标签
    | 'menuItem:delete' // 删除
    | 'menuItem:copyUrl' // 复制链接
    | 'menuItem:originPage' // 原网页
    | 'menuItem:readMode' // 阅读模式
    | 'menuItem:openWithQQBrowser' // 在QQ浏览器中打开
    | 'menuItem:openWithSafari' // 在Safari中打开
    | 'menuItem:share:email' // 邮件
    | 'menuItem:share:brand' // 一些特殊公众号

  type scanTypes =
    | 'qrCode' // 二维码
    | 'barCode' // 一维码

  type ImageSize = 'original' | 'compressed'
  type SourceType = 'album' | 'camera'

  /** **************************************************************************
   * Interface definations
   ****************************************************************************/

  interface ConfigOptions {
    /**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，
     * 可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     */
    debug?: boolean

    /**
     * 公众号的唯一标识
     */
    appId: string

    /**
     * 生成签名的时间戳
     */
    timestamp: string | number

    /**
     * 生成签名的随机串
     */
    nonceStr: string

    /**
     * 签名
     */
    signature: string

    /**
     * 需要使用的JS接口列表
     */
    jsApiList: JSApis[]
    /* beta */
    beta?: boolean
    [x: string]: any
  }

  /**
   * 所有接口通过wx对象(也可使用jWeixin对象)来调用，参数是一个对象，
   * 除了每个接口本身需要传的参数之外，还有以下通用参数
   */
  interface Callbacks {
    /**
     * 接口调用成功时执行的回调函数。
     */
    success?: (res: any) => void

    /**
     * 接口调用失败时执行的回调函数。
     */
    fail?: (res: any) => void

    /**
     * 接口调用完成时执行的回调函数，无论成功或失败都会执行。
     */
    complete?: (res: any) => void

    /**
     * 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
     */
    cancel?: (res: any) => void
  }

  interface MenuCallbacks extends Callbacks {
    /**
     * 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
     */
    trigger?: (res: any) => void
  }

  interface CheckJsApiOptions extends Callbacks {
    /**
     * 需要检测的JS接口列表
     */
    jsApiList: JSApis[]
  }
  interface ShareOptions {
    /**
     * 分享标题
     */
    title: string
    /**
     * 分享描述
     */
    desc?: string
    /**
     * 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     */
    link: string

    /**
     * 分享图标
     */
    imgUrl?: string
  }
  interface OnMenuShareTimelineOptions extends MenuCallbacks, ShareOptions {}
  interface UpdateAppMessageShareData extends MenuCallbacks, ShareOptions {}
  interface UpdateTimelineShareData extends MenuCallbacks, ShareOptions {}
  interface OnMenuShareAppMessageOptions extends OnMenuShareTimelineOptions {
    /**
     * 分享描述
     */
    desc?: string

    /**
     * 分享类型,music、video或link，不填默认为link
     */
    type?: 'music' | 'video' | 'link'

    /**
     * 如果type是music或video，则要提供数据链接，默认为空
     */
    dataUrl?: string
  }

  interface OnMenuShareQQ extends OnMenuShareTimelineOptions {
    /**
     * 分享描述
     */
    desc?: string
  }

  interface OnMenuShareWeibo extends OnMenuShareTimelineOptions {
    /**
     * 分享描述
     */
    desc?: string
  }

  interface OnMenuShareQZone extends OnMenuShareTimelineOptions {
    /**
     * 分享描述
     */
    desc?: string
  }

  interface ChooseImageOptions extends Callbacks {
    /**
     * 一次可选择图片数量
     *
     * 默认为 9
     */
    count?: number

    /**
     * 可以指定是原图还是压缩图，默认二者都有
     */
    sizeType?: ImageSize[]

    /**
     * 可以指定来源是相册还是相机，默认二者都有
     */
    sourceType?: SourceType[]
  }

  interface PreviewImageOptions extends Callbacks {
    /**
     * 当前显示图片的 http 链接
     */
    current: string

    /**
     * 需要预览的图片 http 链接列表
     */
    urls: string[]
  }

  interface UploadImageOptions extends Callbacks {
    /**
     * 需要上传的图片的本地ID，由chooseImage接口获得
     */
    localId: string

    /**
     * 显示进度提示
     */
    isShowProgressTips?: boolean
  }

  interface DownloadImageOptions extends Callbacks {
    /**
     * 需要下载的图片的服务器端ID，由uploadImage接口获得
     */
    serverId: string

    /**
     * 显示进度提示
     */
    isShowProgressTips?: boolean
  }

  interface GetLocalImgDataOptions extends Callbacks {
    /**
     * 图片的localID
     */
    localId: string
  }

  interface LocalVoiceOptions extends Callbacks {
    /**
     * 本地ID，由 stopRecord 接口获得
     */
    localId: string
  }

  interface UploadVoiceOptions extends LocalVoiceOptions {
    /**
     * 显示进度提示
     */
    isShowProgressTips?: boolean
  }

  interface DownloadVoiceOptions extends Callbacks {
    /**
     * 需要下载的音频的服务器端ID，由uploadVoice接口获得
     */
    serverId: string

    /**
     * 显示进度提示
     */
    isShowProgressTips?: boolean
  }

  interface OpenLocationOptions extends Callbacks {
    /**
     * 纬度，浮点数，范围为90 ~ -90
     */
    latitude: number

    /**
     * 经度，浮点数，范围为180 ~ -180。
     */
    longitude: number

    /**
     * 位置名
     */
    name: string

    /**
     * 地址详情说明
     */
    address: string

    /**
     * 地图缩放级别,整形值,范围从1~28。默认为最大
     */
    scale?: number

    /**
     * 在查看位置界面底部显示的超链接,可点击跳转
     */
    infoUrl?: string
  }

  interface GetLocationOptions extends Callbacks {
    /**
     * 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
     */
    type: 'wgs84' | 'gcj02'
  }

  interface StartSearchBeacons {
    /**
     * 摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
     */
    ticket: string
  }

  interface MenuOptions {
    menuList: Menus[]
  }

  interface ScanQRCodeOptions extends Callbacks {
    /**
     * 默认为0，扫描结果由微信处理，1则直接返回扫描结果
     */
    needResult?: 0 | 1

    /**
     * 可以指定扫二维码还是一维码，默认二者都有
     */
    scanType?: scanTypes[]
  }

  interface OpenProductSpecificViewOptions {
    /**
     * 商品id
     */
    productId: string

    /**
     *  0.默认值，普通商品详情页
     *  1.扫一扫商品详情页
     *  2.小店商品详情页
     */
    viewType: 0 | 1 | 2
  }

  interface ChooseCardOptions extends Callbacks {
    /**
     * 门店Id
     */
    shopId?: string

    /**
     * 卡券类型
     */
    cardType?: string

    /**
     * 卡券Id
     */
    cardId?: string

    /**
     * 卡券签名时间戳
     */
    timestamp: number

    /**
     * 卡券签名随机串
     */
    nonceStr: string

    /**
     * 签名方式，默认'SHA1'
     */
    signType: 'SHA1'

    /**
     * 卡券签名
     */
    cardSign: string
  }

  interface AddCard {
    cardId: string
    cardExt: string
  }

  interface AddCardOptions extends Callbacks {
    cardList: AddCard[]
  }

  interface OpenCard {
    cardId: string
    code: string
  }

  interface OpenCardOptions extends Callbacks {
    cardList: OpenCard[]
  }

  interface ChooseWXPayOptions extends Callbacks {
    /**
     * 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
     * 但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
     */
    timestamp: string

    /**
     * 支付签名随机串，不长于 32 位
     */
    nonceStr: string

    /**
     * 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
     */
    package: string

    /**
     * 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
     */
    signType: 'SHA1' | 'MD5'

    /**
     * 支付签名
     */
    paySign: string
  }

  /** **************************************************************************
   * 配置方法
   ****************************************************************************/

  /**
   * 注入权限验证配置
   * 所有需要使用 JS-SDK 的页面必须先注入配置信息，否则将无法调用。
   * （同一个 url 仅需调用一次，对于变化 url 的 SPA 的 web app 可在每次url变化时进行调用,
   * 目前 Android 微信客户端不支持 pushState 的 H5 新特性，
   * 所以使用 pushState 来实现 web app 的页面会导致签名失败，
   * 此问题会在 Android6.2中修复。）
   */
  function config(options: ConfigOptions): void

  /**
   * 处理成功验证
   *
   * config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
   * config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
   * 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
   * 则可以直接调用，不需要放在ready函数中。
   */
  function ready(callback: () => void): void

  /**
   * 处理失败验证
   *
   * config信息验证失败会执行error函数，如签名过期导致验证失败，
   * 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
   * 对于SPA可以在这里更新签名。
   */
  function error(callback: (res: any) => void): void

  /**
   * 判断当前客户端版本是否支持指定JS接口
   *
   * 备注：checkJsApi接口是客户端6.0.2新引入的一个预留接口，
   * 第一期开放的接口均可不使用checkJsApi来检测。
   */
  function checkJsApi(options: CheckJsApiOptions): void

  /** **************************************************************************
   * 分享接口
   ****************************************************************************/

  /**
   * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
   */
  function updateAppMessageShareData(options: UpdateAppMessageShareData): void
  /**
   * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
   */
  function updateTimelineShareData(options: UpdateTimelineShareData): void
  /**
   * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）

   */
  function onMenuShareTimeline(options: OnMenuShareTimelineOptions): void

  /**
   * 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
   */
  function onMenuShareAppMessage(options: OnMenuShareAppMessageOptions): void

  /**
   * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareQQ(options: OnMenuShareQQ): void

  /**
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareWeibo(options: OnMenuShareWeibo): void

  /**
   * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareQZone(options: OnMenuShareQZone): void

  /** **************************************************************************
   * 图像接口
   ****************************************************************************/

  /**
   * 拍照或从手机相册中选图接口
   */
  function chooseImage(options: ChooseImageOptions): void

  /**
   * 预览图片接口
   */
  function previewImage(options: PreviewImageOptions): void

  /**
   * 上传图片接口
   *
   * 备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
   */
  function uploadImage(options: UploadImageOptions): void

  /**
   * 下载图片接口
   */
  function downloadImage(options: DownloadImageOptions): void

  /**
   * 获取本地图片接口
   */
  function getLocalImgData(options: GetLocalImgDataOptions): void

  /** **************************************************************************
   * 音频接口
   ****************************************************************************/

  /**
   * 开始录音接口
   */
  function startRecord(): void

  /**
   * 停止录音接口
   */
  function stopRecord(options: Callbacks): void

  /**
   * 监听录音自动停止接口
   */
  function onVoiceRecordEnd(options: Callbacks): void

  /**
   * 播放语音接口
   */
  function playVoice(options: LocalVoiceOptions): void

  /**
   * 暂停播放接口
   */
  function pauseVoice(options: LocalVoiceOptions): void

  /**
   * 停止播放接口
   */
  function stopVoice(options: LocalVoiceOptions): void

  /**
   * 监听语音播放完毕接口
   */
  function onVoicePlayEnd(options: Callbacks): void

  /**
   * 上传语音接口
   */
  function uploadVoice(options: UploadVoiceOptions): void

  /**
   * 下载语音接口
   */
  function downloadVoice(options: DownloadVoiceOptions): void

  /** **************************************************************************
   * 智能接口
   ****************************************************************************/

  /**
   * 识别音频并返回识别结果接口
   */
  function translateVoice(options: UploadVoiceOptions): void

  /** **************************************************************************
   * 设备信息
   ****************************************************************************/

  /**
   * 获取网络状态接口
   */
  function getNetworkType(options: Callbacks): void

  /** **************************************************************************
   * 地理信息
   ****************************************************************************/

  /**
   * 使用微信内置地图查看位置接口
   */
  function openLocation(options: OpenLocationOptions): void

  /**
   * 获取地理位置接口
   */
  function getLocation(options: GetLocationOptions): void

  /** **************************************************************************
   * 摇一摇周边
   ****************************************************************************/

  /**
   * 开启查找周边ibeacon设备接口
   */
  function startSearchBeacons(options: StartSearchBeacons): void

  /**
   * 关闭查找周边ibeacon设备接口
   */
  function stopSearchBeacons(options: Callbacks): void

  /**
   * 监听周边ibeacon设备接口
   *
   * 备注：上述摇一摇周边接口使用注意事项及更多返回结果说明，请参考：摇一摇周边获取设备信息
   */
  function onSearchBeacons(options: Callbacks): void

  /** **************************************************************************
   * 界面操作
   ****************************************************************************/

  /**
   * 关闭当前网页窗口接口
   */
  function closeWindow(): void

  /**
   * 批量隐藏功能按钮接口
   */
  function hideMenuItems(options: MenuOptions): void

  /**
   * 批量显示功能按钮接口
   */
  function showMenuItems(options: MenuOptions): void

  /**
   * 隐藏所有非基础按钮接口
   */
  function hideAllNonBaseMenuItem(): void

  /**
   * 显示所有功能按钮接口
   */
  function showAllNonBaseMenuItem(): void

  /** **************************************************************************
   * 微信扫一扫
   ****************************************************************************/

  /**
   * 调起微信扫一扫接口
   */
  function scanQRCode(options: ScanQRCodeOptions): void

  /** **************************************************************************
   * 微信小店
   ****************************************************************************/

  /**
   * 跳转微信商品页接口
   */
  function openProductSpecificView(options: OpenProductSpecificViewOptions): void

  /** **************************************************************************
   * 微信卡券
   ****************************************************************************/

  /**
   * 拉取适用卡券列表并获取用户选择信息
   */
  function chooseCard(options: ChooseCardOptions): void

  /**
   * 批量添加卡券接口
   */
  function addCard(options: AddCardOptions): void

  /**
   * 查看微信卡包中的卡券接口
   */
  function openCard(options: OpenCardOptions): void

  /** **************************************************************************
   * 微信支付
   ****************************************************************************/

  /**
   * 发起一个微信支付请求
   */
  function chooseWXPay(options: ChooseWXPayOptions): void
}

declare module 'weixin-js-sdk' {
  export = WeixinJsSdk
}
