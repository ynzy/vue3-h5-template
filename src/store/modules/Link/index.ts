import { Module } from 'vuex'
import { IGlobalState } from '@/store/index'
import { ILinkState } from '@/store/modules/Link/interface'

const state: ILinkState = {
  initLink: ''
}

const login: Module<ILinkState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    ['SET_INIT_LINK'](state, data) {
      console.log(data)
      state.initLink = data
    }
  },
  actions: {}
}

export default login
