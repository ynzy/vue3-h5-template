import request from '@/utils/request'
export interface IResponseType<P = {}> {
	code: number
	msg: string
	data: P
}
interface IUserInfo {
	id: string
	avator: string
}
interface IError {
	code: string
}
export const fetchUserInfo = () => {
	return request<IResponseType<IUserInfo>>({
		url: '/user/info',
		method: 'get',
		loading: true
	})
}
