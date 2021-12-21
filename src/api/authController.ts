import request from '@/utils/request'
import { IResponseType, IUserInfo } from './interface'

/**
 * 获取用户信息
 */
export const fetchUserInfo = () => {
  return request<IResponseType<IUserInfo>>({
    url: '/user/info',
    method: 'get',
    loading: true
  })
}
