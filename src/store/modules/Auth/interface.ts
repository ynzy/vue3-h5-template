import { IUserInfo } from '@/api/interface'

/**
 * 用户信息
 */
export interface IAuthState {
  userInfo: IUserInfo
  isAuth: boolean
  code: string
}
