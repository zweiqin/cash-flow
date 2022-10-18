// OBJECT 参数说明
// 参数名	类型	必填	默认值	说明	平台差异说明
// url	String	是		开发者服务器接口地址	
// data	Object/String/ArrayBuffer	否		请求的参数	App 3.3.7 以下不支持 ArrayBuffer 类型
// header	Object	否		设置请求的 header，header 中不能设置 Referer。	App、H5端会自动带上cookie，且H5端不可手动修改
// method	String	否	GET	有效值详见下方说明	
// timeout	Number	否	60000	超时时间，单位 ms	H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
// dataType	String	否	json	如果设为 json，会尝试对返回的数据做一次 JSON.parse	
// responseType	String	否	text	设置响应的数据类型。合法值：text、arraybuffer	支付宝小程序不支持
// sslVerify	Boolean	否	true	验证 ssl 证书	仅App安卓端支持（HBuilderX 2.3.3+），不支持离线打包
// withCredentials	Boolean	否	false	跨域请求时是否携带凭证（cookies）	仅H5支持（HBuilderX 2.6.15+）
// firstIpv4	Boolean	否	false	DNS解析时优先使用ipv4	仅 App-Android 支持 (HBuilderX 2.8.0+)
// success	Function	否		收到开发者服务器成功返回的回调函数	
// fail	Function	否		接口调用失败的回调函数	
// complete	Function	否		接口调用结束的回调函数（调用成功、失败都会执行）

// uni.request({
//     url: '/request/login', //仅为示例，并非真实接口地址。
//     success: (res) => {
//         console.log(res.data);
//         // 打印： {code:1,...}
//     }
// });


// OBJECT 参数说明
// 参数名	类型	必填	默认值	说明	平台差异说明
// invoke	Function	否		拦截前触发	
// success	Function	否		成功回调拦截	
// fail	Function	否		失败回调拦截	
// complete	Function	否		完成回调拦截	


module.exports = (vm) => {
	uni.addInterceptor('request', {
		invoke(args) {
			// console.log(args)
			// request 触发前拼接 url 
			args.url = 'http://106.55.157.177:19999/v1' + args.url
			// args.url = 'http://192.168.0.74:19999/v1' + args.url
			// args.url = 'http://192.168.0.8:19999/v1' + args.url
			try {
				args.data = args.data || {}
				if (args?.custom?.auth) {
					// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
					// args.header.token = vm.$store.state.userInfo.token
					const token = uni.getStorageSync('token');
					args.header.Authorization = token
				} else if (args?.custom?.auth_py) {
					//添加给python接口用的，token键值为token
					const token = uni.getStorageSync('token');
					args.header.token = token
				}
			} catch (e) {
				//TODO handle the exception
				return Promise.reject(args)
			}
		},
		success(args) {
			// 请求成功后，修改code值为1
			// args.data.code = 1
			// console.log(args)
			/* 对响应成功做点什么 可使用async await 做异步操作*/
			const data = args.data
			if (data.status !== 200) {
				// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
				uni.showToast({
					title: data.data? data.data : `${data.msg}。${data.data}`,
					icon: 'error'
				})
				// return Promise.resolve(data)
				// return Promise.reject(data)
				// return Promise.reject(new Error(data))
				// return new Error(data) // 正常返回
				// throw Error(data) // [system] Error: [object Object]
				return {
					msg: data.msg,
					status: data.status
				}
				// return data
				// throw data
			}
			return data.data ? data.data : {}
		},
		fail(err) {
			// console.log('interceptor-fail',err)
				uni.showToast({
					title: '网络错误！',
					icon: 'error'
				})
			return Promise.reject(err)
		},
		complete(res) {
			// console.log('interceptor-complete',res)
		}
	})
}


// // 下面为通过uview组件库进行封装：
// // 此vm参数为页面的实例，可以通过它引用vuex中的变量
// module.exports = (vm) => {
// 	// 初始化请求配置
// 	uni.$u.http.setConfig((config) => {
// 		/* config 为默认全局配置*/
// 		config.baseURL = 'http://xy_face.agait.cn/'; /* 根域名 */
// 		// config.baseURL = 'http://192.168.0.74:10003' /* 根域名 */
// 		return config
// 	})

// 	// 请求拦截
// 	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
// 		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
// 		config.data = config.data || {}
// 		// 根据custom参数中配置的是否需要token，添加对应的请求头
// 		if (config?.custom?.auth) {
// 			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
// 			// config.header.token = vm.$store.state.userInfo.token
// 			const token = uni.getStorageSync('token');
// 			config.header.Authorization = token
// 		} else if (config?.custom?.auth_py) {
// 			//添加给python接口用的，token键值为token
// 			const token = uni.getStorageSync('token');
// 			config.header.token = token
// 		}
// 		return config
// 	}, config => { // 可使用async await 做异步操作
// 		return Promise.reject(config)
// 	})

// 	// 响应拦截
// 	uni.$u.http.interceptors.response.use((response) => {
// 		/* 对响应成功做点什么 可使用async await 做异步操作*/
// 		const data = response.data
// 		// 自定义参数
// 		const custom = response.config?.custom
// 		if (data.status !== 200 && data.code !== 200) {
// 			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
// 			if (custom.toast !== false) {
// 				uni.$u.toast(data.msg)
// 				return Promise.reject(data)
// 			}
// 			// 如果需要catch返回，则进行reject
// 			if (custom?.catch) {
// 				return Promise.reject(data)
// 			} else {
// 				// 否则返回一个pending中的promise，请求不会进入catch中
// 				return new Promise(() => {})
// 			}
// 		}
// 		return data.data ? data.data : {}
// 	}, (response) => {
// 		// 对响应错误做点什么 （statusstatus !== 200）
// 		return Promise.reject(response)
// 	})
// }
