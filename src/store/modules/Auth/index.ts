import { Module } from 'vuex'
import { IGlobalState, IResponseType } from '../../index'
import { IIndexState, IUserInfo } from './interface'
import * as Types from './types'
import * as API from './api'

const state: IIndexState = {
	// 方便测试写死测试手机号验证码
	phone: '13201010003',
	sms: '116688',
	userInfo: {
		userId: '',
		communitylist: [],
		sessionId: 'string'
	}
}

const login: Module<IIndexState, IGlobalState> = {
	namespaced: true,
	state,
	actions: {
		async [Types.GET_SMS_CODE]({ state }) {
			return API.getSmsCode<IResponseType>({
				phone: state.phone
			})
		},
		async [Types.ON_LOGIN]({ state }) {
			return API.onLogin<IResponseType>({
				appChannel: 0,
				mobile: state.phone,
				smsCode: state.sms
			})
		}
	},
	mutations: {
		[Types.SAVE_PHONE](state, phone: string) {
			state.phone = phone
		},
		[Types.SAVE_SMS_CODE](state, sms: string) {
			state.sms = sms
		},
		[Types.SAVE_USER_INFO](state, info: IUserInfo) {
			state.userInfo.communitylist = info.communitylist
			state.userInfo.sessionId = info.sessionId
			state.userInfo.userId = info.userId
		}
	}
}

export default login
