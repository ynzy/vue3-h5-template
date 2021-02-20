export interface IResponseType<P = {}> {
  code: number
  msg: string
  data: P
}

// 用户信息
export interface IUserInfo {
  author?: string
  avator?: string
  projectAddress?: string
  demoUrl?: string
  demoCodeUrl?: string
}
