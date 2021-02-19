import { createStore } from 'vuex'
import { IHomeState } from './modules/Home/interface'
import { IIndexState } from './modules/Auth/interface'
import home from './modules/Home'
import auth from './modules/Auth'
// 全局状态
export interface IGlobalState {
	home: IHomeState
	auth: IIndexState
}

export interface IResponseType<P = {}> {
	code: number
	msg: string
	data: P
}

export default createStore({
	mutations: {},
	actions: {},
	modules: {
		home,
		auth
	}
})
