export interface IIndexState {
	phone: string
	sms: string
	userInfo: IUserInfo
}

export interface IUserInfo {
	communitylist: ICommunity[]
	sessionId: string
	userId: string | number
}

export interface ICommunity {
	cityName: string
	cityCode: string
}

export interface ALoginData {
	appChannel: number
	mobile: string
	smsCode: string
}

export interface ACodeData {
	phone: string
}
