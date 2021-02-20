import { Module } from 'vuex'
import { IGlobalState } from '@/store/index'
import { IAuthState } from '@/store/modules/Auth/interface'
import * as Types from '@/store/modules/Auth/types'

const state: IAuthState = {
  userInfo: {}
}

const login: Module<IAuthState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SAVE_USER_INFO](state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async [Types.SAVE_USER_INFO]({ commit }, data) {
      return commit(Types.SAVE_USER_INFO, data)
    }
  }
}

export default login
