import { IGlobalState } from '@/store/index'

const getters = {
	userInfo: (state: IGlobalState) => state.auth.userInfo
}
export default getters
