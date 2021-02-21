import { IUserInfo } from '@/api/interface'
import { IGlobalState } from '@/store/index'

const getters = {
  userInfo: (state: IGlobalState) => state.auth.userInfo,
  initLink: (state: IGlobalState) => state.link.initLink
}
export default getters
