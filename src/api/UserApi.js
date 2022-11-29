import {
	Service
} from '@/utils/Service'

//注册
export function register(phone, password) {
	return Service({
		url: '/user/register',
		params: {
			phone: phone,
			password: password
		}
	})
}
//登录
export function login(phone, password) {
	return Service({
		url: '/user/login',
		params: {
			phone: phone,
			password: password
		}
	})
}
//获取验证码
export function getCode(phone) {
	return Service({
		url: '/user/getCode',
		params: {
			phone: phone
		}
	})
}

//校验验证码
export function verification(phone, code) {
	return Service({
		url: '/user/verification',
		params: {
			phone: phone,
			code: code
		}
	})
}
//发送邮件
export function sendEmail(email) {
	return Service({
		url: '/user/sendEmail',
		params: {
			email: email
		}
	})
}

//校验邮件
export function confirmEmail(email, code) {
	return Service({
		url: '/user/confirmEmail',
		params: {
			email: email,
			code: code
		}
	})
}

//获取用户信息
export function getUserInfo() {
	return Service({
		url: '/user',
		method: 'get'
	})
}

//获取用户信息
export function resetPwd(password) {
	return Service({
		url: '/user/resetPwd',
		params: {
			password: password
		}
	})
}

//修改信息
export function editInfo(avatar, username) {
	return Service({
		url: '/user/editInfo',
		params: {
			avatar: avatar,
			username: username
		}
	})
}

//全部用户
export function allUser() {
	return Service({
		url: '/user/all',
		method: 'get'
	})
}

export function Interdiction(id) {
	return Service({
		url: '/user/Interdiction',
		params: {
			uid: id
		}
	})
}
