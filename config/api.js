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

// 获取（梦想表）所有梦想的列表信息
export const GetDreamList = (data) => uni.request({
	url: '/dream/GetDreamList', // 仅为示例，并非真实接口地址。
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

// 获取当前轮数
export const GetCurrentUser = (data) => uni.request({
	url: '/game_user/GetCurrentUser', // 仅为示例，并非真实接口地址。
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

// banker给当前轮的玩家进行顺流层失业
export const Unemployment = (data) => uni.request({
	url: '/game_user/Unemployment', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家进行平流层的结算破产
export const Bankrupt = (data) => uni.request({
	url: '/game_user/Bankrupt', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家做平流层的慈善
export const DoCharity = (data) => uni.request({
	url: '/game_user/DoCharity', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家做顺流层的慈善
export const RichCircleCharity = (data) => uni.request({
	url: '/game_user/RichCircleCharity', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家做信托投资
export const BuyTrustPrice = (data) => uni.request({
	url: '/game_user/BuyTrustPrice', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家做风险投资
export const BuyVentureCapital = (data) => uni.request({
	url: '/game_user/BuyVentureCapital', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家做风险投资回报
export const ConfirmVentureCapital = (data) => uni.request({
	url: '/game_user/ConfirmVentureCapital', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker给当前轮的玩家买下梦想
export const BuyDream = (data) => uni.request({
	url: '/game_user/BuyDream', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker选择是否成功找到工作
export const ConfirmJob = (data) => uni.request({
	url: '/game_user/ConfirmJob', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// banker选择打官司是否成功
export const ConfirmLitigate = (data) => uni.request({
	url: '/game_user/ConfirmLitigate', // 仅为示例，并非真实接口地址。
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

// user向银行家贷款
export const BankerLoan = (data) => uni.request({
	url: '/game_user/BankerLoan', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user向银行家还款
export const Repayment = (data) => uni.request({
	url: '/game_user/Repayment', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user向其他user送钱
export const GivingMoney = (data) => uni.request({
	url: '/game_user/GivingMoney', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user赎回金融产品
export const GetBackFinance = (data) => uni.request({
	url: '/game_user/GetBackFinance', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user放弃某副业（取消副业）
export const QuitPartTime = (data) => uni.request({
	url: '/game_user/QuitPartTime', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user被抽到卡后，转让卡牌
export const TransferCard = (data) => uni.request({
	url: '/game_user/TransferCard', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user被辞退后，打官司
export const Litigate = (data) => uni.request({
	url: '/game_user/Litigate', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// user失业后，找工作
export const LookForJob = (data) => uni.request({
	url: '/game_user/LookForJob', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// 在每次GetUserInfo的时候，判断是否满足进入顺流层的条件，是则发送请求，告知后端
export const RichCircle = (data) => uni.request({
	url: '/game_user/RichCircle', // 仅为示例，并非真实接口地址。
	method: 'POST',
	data,
	custom: {
		auth: false
	}
})

// 在每次GetUserInfo的时候，判断是否满足现金减银行贷款之后大于1亿，是则发送请求，告知后端
export const ConfirmBillionaire = (data) => uni.request({
	url: '/game_user/ConfirmBillionaire', // 仅为示例，并非真实接口地址。
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
