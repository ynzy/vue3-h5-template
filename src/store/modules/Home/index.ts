import { Module } from 'vuex'
import { IGlobalState, IResponseType } from '../../index'
import * as Types from './types'
import { IHomeState } from './interface'
import * as API from './api'

const state: IHomeState = {
	cityList: [],
	currentCommunity: {
		communityId: '',
		communityName: ''
	},
	commonlyUsedDoor: {
		doorControlId: '',
		doorControlName: ''
	},
	accessControlList: []
}

const home: Module<IHomeState, IGlobalState> = {
	namespaced: true,
	state,
	mutations: {},
	actions: {}
}

export default home
