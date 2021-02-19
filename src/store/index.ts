import { createStore } from 'vuex'
import getters from './getters'
import { IAuthState } from './modules/Auth/interface'
import auth from './modules/Auth'
// 全局状态
export interface IGlobalState {
	auth: IAuthState
}

const store = createStore<IGlobalState>({
	getters,
	modules: {
		auth
	}
})

export default store
