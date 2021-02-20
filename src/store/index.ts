import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import { IAuthState } from './modules/Auth/interface'
import { ILinkState } from './modules/Link/interface'
import auth from './modules/Auth'
import link from './modules/Link'
// 全局状态
export interface IGlobalState {
  auth: IAuthState
  link: ILinkState
}

const store = createStore<IGlobalState>({
  modules: {
    auth,
    link
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: (state) => ({
        auth: state.auth,
        link: state.link
      })
    })
  ]
})

export default store
