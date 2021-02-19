
import axios from 'axios'
import qs from 'qs'
import { ALoginData, ACodeData } from './interface'

// 获取手机验证码
export const getSmsCode = <T>(data: ACodeData) => axios.post<T, T>(`sms/v1/sendValidCode`, qs.stringify(data))

// 登录
export const onLogin = <T>(data: ALoginData) => axios.post<T, T>(`app/login`, data)