const Mock = require('mockjs')

const tokens = {
	admin: {
		token: 'admin-token'
	},
	editor: {
		token: 'editor-token'
	}
}

const users = {
	'admin-token': Mock.mock({
		id: '@id',
		username: '@cname()',
		author: '@first',
		date: '@date()',
		avatar: "@image('200x200','red','#fff','avatar')",
		description: '@paragraph()',
		ip: '@ip()',
		email: '@email()'
	}),
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		name: 'Normal Editor'
	}
}

module.exports = [
	// user login
	{
		url: '/vue-h5/user/login',
		type: 'post',
		response: config => {
			const { username } = config.body
			const token = tokens[username]

			// mock error
			// if (!token) {
			// 	return {
			// 		code: 60204,
			// 		message: 'Account and password are incorrect.'
			// 	}
			// }

			return {
				code: 0,
				data: token,
				msg: '登录成功'
			}
		}
	},

	// get user info
	{
		url: '/vue-h5/user/info.*',
		type: 'get',
		response: config => {
			const { token } = config.query
			const info = users['admin-token']
			// mock error
			// if (!info) {
			// 	return {
			// 		code: 50008,
			// 		message: 'Login failed, unable to get user details.'
			// 	}
			// }

			return {
				code: 0,
				data: info,
				msg: '登录成功'
			}
		}
	},

	// user logout
	{
		url: '/vue-h5/user/logout',
		type: 'post',
		response: _ => {
			return {
				code: 20000,
				data: 'success'
			}
		}
	}
]
