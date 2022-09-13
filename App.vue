<script>
export default {
	globalData: {
		appListData: [
			// // 针对管理员 首次创房，这里写死 管理员一个人
			// {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker'
			// }
		],
		wsHandle: '',
		// 用户加入游戏，管理员创建游戏和重新加入游戏。这三种情况的action
		action: null,
		role: '', // role为admin 或 user，其它为''
		gameKey: '',
		userName: '',
		gameId: '', // 管理员为数字字符串，用户为数字字符串
		gameUserId: '', // 管理员为空字符串，用户为数字字符串
		// vm: null,
		admin: null,
		users: null,
		drag: null,
		game: null,
		manipulate: null,
		// 用户加入游戏，管理员创建游戏和重新加入游戏。这三种情况
		init(actionMsg = null) {
			// console.log(this.ws)
			this.wsHandle = new WebSocket('ws://192.168.0.74:19999/v1/socket/Socket')
			this.wsHandle.onopen = this.onOpen
			// 服务端发送回来的其他消息
			this.wsHandle.onmessage = this.onMessage
			this.wsHandle.onerror = this.onError
			this.action = actionMsg
			// 判断是 管理员 还是用户 还是其它情况
			if (actionMsg && (actionMsg.method === 'createGame' || actionMsg.method === 'rejoinGame')) {
				this.role = 'admin'
				this.gameKey = actionMsg.data
			} else if (actionMsg && actionMsg.method === 'joinGame') {
				// 用户的登录的 actionMsg的data是一个对象，包含 用户名 和 房间号
				this.role = 'user'
				this.gameKey = actionMsg.data.game_key
				this.userName = actionMsg.data.username
			} else {
				this.role = ''
			}
			// this.vm = vm
		},

		onOpen() {
			const _this = getApp().globalData
			console.log('连接成功')
			// console.log(_this.action)
			// this.wsHandle.send()
			if (_this.action.method === 'createGame') {
				// console.log('发送')
				_this.send(_this.action)
			}
			if (_this.action.method === 'joinGame') {
				_this.send(_this.action)
			}
			if (_this.action.method === 'rejoinGame') {
				_this.send(_this.action)
			}
		},

		onMessage(evt) {
			const _this = getApp().globalData
			// console.log('收到消息', evt)
			console.log(JSON.parse(evt.data))
			const data = JSON.parse(evt.data)

			if (data.event === 'globalNotice') {
				// （创房的时候只有banker一个人）管理员创建游戏后，创建游戏成功
				_this.admin && _this.admin.globalNotice('创建成功', '即将跳转到等待页面', 'success')

				// 用户加入游戏后（对其它玩家），玩家1111进入房间
				// banker重新进入房间
				// 管理员拖拽后（对所有玩家），位置调整成功
				// 用户（在拖拽页面），退出房间成功，xxx退出房间
				// 管理员开始游戏后，开始游戏中... 和 游戏开始
				_this.drag && _this.drag.globalNotice('提示', data.data, 'creative')

				// if(data.data==='位置调整成功'){
				// // 管理员拖拽后（对所有玩家），位置调整成功
				// 	_this.drag && _this.drag.globalNotice('提示', data.data, 'creative')
				// }

				// console.log(111)
			}

			if (data.event === 'errorMsg') {
			// if (data.event === 'error_msg') {
				if (_this.role === 'admin') {
					// 管理员登录页面
					// 情况：管理员 创建或重新加入房间 的错误
					if (_this.action && _this.action.method === 'createGame') {
						// 房间已存在
						_this.admin && _this.admin.globalNotice('创建失败', data.data, 'cross-fill')
					} else if (_this.action && _this.action.method === 'rejoinGame') {
						// 已经加入房间
						_this.admin && _this.admin.globalNotice('重新加入失败', data.data, 'cross-fill')
					}

					// 拖拽页面
					// 情况：管理员拖拽失败
					// 情况：管理员关闭房间后，房间内无连接
					// 情况：管理员开始游戏后，此房间已经开始游戏
					_this.drag && _this.drag.globalNotice('提示', data.data, 'cross-fill')
				} else if (_this.role === 'user') {
					// 用户登录页面
					// 情况：用户 加入房间失败
					if (_this.action && _this.action.method === 'joinGame') {
					// 已经加入房间 或 房间不存在
						_this.users && _this.users.syncUserList('加入失败', data.data, 'cross-fill')
					}

					// 拖拽页面
					// 情况：用户 退出房间失败，此连接未加入任何房间 或 房间不存在
					_this.drag && _this.drag.globalNotice('提示', data.data, 'cross-fill')
				}
			}

			if (data.event === 'syncUserList') {
			// if (data.event === 'sync_user_list') {
				// 用户 在登录页面 加入游戏后（对用户自己），[xxx,xxx...]
				_this.users && _this.users.syncUserList('加入成功', '即将跳转到等待页面', 'success')
				// 管理员 在登录页面 重新加入游戏后（对管理员自己），[xxx,xxx...]
				_this.admin && _this.admin.globalNotice('重新进入成功', '即将跳转到等待页面', 'success')
				// sync_user_list返回的数组的排序
				_this.appListData = data.data.slice(1).map((item) => ({
					appIcon: 'tn-icon-trusty',
					appName: item
				}))
				_this.drag && _this.drag.syncUserList()
				// _this.action = null
			}

			if (data.event === 'stopGame') {
				// 管理员关闭房间后，广播给所有人，房间已关闭
				_this.drag && _this.drag.globalNotice('提示', data.data, 'home-vertical', 'stopGame')
				_this.game && _this.game.globalNotice('提示', data.data, 'home-vertical', 'stopGame')
				_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'home-vertical', 'stopGame')
			}

			if (data.event === 'syncInfo') {
				// 管理员开始游戏后，广播给所有人，[]。
				_this.drag && _this.drag.globalNotice('提示', '正在进入游戏', 'game', 'syncInfo')
				_this.gameUserId = data.game_user_id
				_this.gameId = data.game_id
			}
		},

		onError() {
			console.log('出错了')
		},

		send(sendMsg) {
			if (typeof sendMsg === 'string') {
				this.wsHandle.send(sendMsg)
			} else if (typeof sendMsg === 'object') {
				const messages = JSON.stringify(sendMsg)
				this.wsHandle.send(messages)

				if (messages.method === 'quitGame') {
					// 关闭websocket连接
					this.wsHandle.close()
				}
			}
		}
	},

	onLaunch() {
		console.log('App Launch')
		uni.request({
			url: 'http://192.168.0.74:19999/v1/card/GetCardList', // 仅为示例，并非真实接口地址。
			// data: {
			//     text: 'uni.request'
			// },
			// header: {
			//     'custom-header': 'hello' //自定义请求头信息
			// },
			success: (res) => {
				uni.setStorage({
					key: 'cards',
					data: res.data
					// success() {
					// 	console.log('success')
					// }
				})
				// uni.getStorage({
				// 	key: 'cards',
				// 	success(res) {
				// 		console.log(res.data)
				// 	}
				// })
				// console.log(res.data)
			}
		})
	},
	onShow() {
		console.log('App Show')
	},
	onHide() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import './tuniao-ui/index.scss';
@import './tuniao-ui/iconfont.css';
</style>
