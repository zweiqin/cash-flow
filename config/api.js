// 获取获取全部卡列表的所有信息
export const GetCardList = (data) => uni.request({
	url: '/card/GetCardList', // 仅为示例，并非真实接口地址。
	method: 'GET',
	data,
	custom: {
		auth: false
	}
})

// 获取9种卡的列表信息
export const GetCardCategoryList = (data) => uni.request({
	url: '/card_category/GetCardCategoryList', // 仅为示例，并非真实接口地址。
	method: 'GET',
	data,
	custom: {
		auth: false
	}
})

// 获取具体某人的游戏资料信息
export const GetUserInfo = (data) => uni.request({
	url: '/game_user/GetUserInfo', // 仅为示例，并非真实接口地址。
	method: 'GET',
	data,
	custom: {
		auth: false
	}
})

// banker
// 下一位。开始游戏时要点下一位用户id传0，才真正开始
export const NextUser = (data) => uni.request({
	url: '/game_user/NextUser', // 仅为示例，并非真实接口地址。
	method: 'GET',
	data,
	custom: {
		auth: false
	}
})

// banker给当前回合的那个人发钱
export const SendMoney = (data) => uni.request({
	url: '/game_user/SendMoney', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前回合的那个人发工资
export const Payroll = (data) => uni.request({
	url: '/game_user/Payroll', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给某个人 扣钱
export const DeductMoney = (data) => uni.request({
	url: '/game_user/DeductMoney', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// 指定某人来进行抽卡
export const DrawCard = (data) => uni.request({
	url: '/card/DrawCard', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家进行休息精力补充
export const EnergizeRest = (data) => uni.request({
	url: '/game_user/EnergizeRest', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家进行结婚纪念日/结算日的精力补充
export const EnergizeNormal = (data) => uni.request({
	url: '/game_user/EnergizeNormal', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家进行生孩子
export const HaveBaby = (data) => uni.request({
	url: '/game_user/HaveBaby', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家进行心碎
export const HeartBreak = (data) => uni.request({
	url: '/game_user/HeartBreak', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user被抽到卡后，确认卡牌
export const ConfirmCard = (data) => uni.request({
	url: '/card/ConfirmCard', // 仅为示例，并非真实接口地址。
	method: 'POST',
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
