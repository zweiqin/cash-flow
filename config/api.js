// 获取验证码
export const GetUserInfo = (data) => uni.request({
	url: '/game_user/GetUserInfo', // 仅为示例，并非真实接口地址。
	method: 'GET',
	data,
	custom: {
		auth: false
	}
})

// // 下面为通过uview组件库进行封装：
// const http = uni.$u.http

// post请求，注意：post请求的第二个参数为请求参数params，而第三个参数才为配置项
// get请求，注意：get请求的配置等，都在第二个参数中

// // 获取验证码
// export const getCode = (data) => http.get(`http://xy_face.agait.cn/api/sendSms`, {
// 	params: data,
// 	custom: {
// 		auth: false
// 	}
// })

// // 登录(获取token和用户信息)
// export const Login = (data) => http.post('/Login', data, {
// 	custom: {
// 		auth_py: true
// 	}
// })

// // 预约记录

// // 人脸预约列表
// export const getFaceList = (data) => http.get('/api/getAppointList', {
// 	params: data,
// 	custom: {
// 		auth_py: true
// 	}
// })
// // 人脸预约审核
// export const checkFace = (data) => http.put(`/api/updateAudit`, data, {
// 	custom: {
// 		auth_py: true
// 	}
// })

// // 我的
// export const getUserRouter = (data) => http.get(`/admin/GetMenuById`, {
// 	params: data,
// 	custom: {
// 		auth_py: true
// 	}
// })

// // 获取系统所有插件列表
// export const getPluginList = (data) => http.get('/api/getMerPlugin', {
// 	params: data,
// 	custom: {
// 		auth_py: true
// 	}
// })

// // 查询该商户是否已经在智慧平台开启该插件
// export const checkPlugin = (data) => http.get('https://apiframe.agait.cn/api/v1/admin/plug/merChant/modular/', {
// 	params: data,
// 	custom: {
// 		auth: true,
// 		toast: false,
// 		catch: true
// 	}
// })

// // 设备管理
// export const getMechineList = (data) => http.get('/api/machineList', {
// 	params: data,
// 	custom: {
// 		auth_py: true
// 	}
// })
// // 开闸
// export const openDoor = (data) => http.post(`/api/door`, data, {
// 	custom: {
// 		auth_py: true
// 	}
// })

// export default {
// 	http
// }
