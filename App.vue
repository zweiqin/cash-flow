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
		isAdmin: '', // admin为true，user为false，其它为''
		gameKey: '',
		userName: '',
		// vm: null,
		admin: null,
		users: null,
		drag: null,
		// 用户加入游戏，管理员创建游戏和重新加入游戏。这三种情况
		init(actionMsg = null) {
			// console.log(this.ws)
			this.wsHandle = new WebSocket('ws://106.55.157.177:19999/v1/socket/Socket')
			this.wsHandle.onopen = this.onOpen
			// 服务端发送回来的其他消息
			this.wsHandle.onmessage = this.onMessage
			this.wsHandle.onerror = this.onError
			this.action = actionMsg
			// 判断是 管理员 还是用户 还是其它情况
			if (actionMsg && (actionMsg.method === 'createGame' || actionMsg.method === 'rejoinGame')) {
				this.isAdmin = true
				this.gameKey = actionMsg.data
			} else if (actionMsg && actionMsg.method === 'joinGame') {
				// 用户的登录的 actionMsg的data是一个对象，包含 用户名 和 房间号
				this.isAdmin = false
				this.gameKey = actionMsg.data.game_key
				this.userName = actionMsg.data.username
			} else {
				this.isAdmin = ''
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
				_this.wsHandle.send(JSON.stringify(_this.action))
			}
			if (_this.action.method === 'joinGame') {
				_this.wsHandle.send(JSON.stringify(_this.action))
			}
			if (_this.action.method === 'rejoinGame') {
				_this.wsHandle.send(JSON.stringify(_this.action))
			}
		},

		onMessage(evt) {
			const _this = getApp().globalData
			// console.log('收到消息', evt)
			console.log(JSON.parse(evt.data))
			const data = JSON.parse(evt.data)

			if (data.event === 'global_notice') {
				// （创房的时候只有banker一个人）管理员创建游戏后，创建游戏成功
				_this.admin && _this.admin.globalNotice('创建成功', '即将跳转到等待页面', 'success')

				if (data.data === '退出房间成功') {
					// 用户（在拖拽页面），退出房间成功
					_this.drag && _this.drag.globalNotice('提示', '退出房间成功', 'creative')
				} else {
				// 用户加入游戏后（对其它玩家），玩家1111进入房间
				// banker重新进入房间
				// 管理员拖拽后（对所有玩家），位置调整成功
					_this.drag && _this.drag.globalNotice('提示', data.data, 'creative')
				}

				// if(data.data==='位置调整成功'){
				// // 管理员拖拽后（对所有玩家），位置调整成功
				// 	_this.drag && _this.drag.globalNotice('提示', data.data, 'creative')
				// }

				// console.log(111)
			}

			if (data.event === 'error_msg') {
				// 管理员登录页面
				// 情况：管理员 创建或重新加入房间 的错误
				if (_this.action && _this.action.method === 'createGame') {
					// 房间已存在
					_this.admin && _this.admin.globalNotice('创建失败', data.data, 'cross-fill')
				} else if (_this.action && _this.action.method === 'rejoinGame') {
					// 已经加入房间
					_this.admin && _this.admin.globalNotice('重新加入失败', data.data, 'cross-fill')
				}

				// 用户登录页面
				// 情况：用户 加入房间失败
				if (_this.action && _this.action.method === 'joinGame') {
					// 已经加入房间 或 房间不存在
					_this.users && _this.users.syncUserList('加入失败', data.data, 'cross-fill')
				}

				// 拖拽页面
				if (_this.isAdmin === true) {
				// 情况：管理员拖拽失败
					_this.drag && _this.drag.globalNotice('提示', data.data, 'cross-fill')
				} else if (_this.isAdmin === false) {
				// 情况：用户 退出房间失败，此连接未加入任何房间 或 房间不存在
					_this.drag && _this.drag.globalNotice('提示', data.data, 'cross-fill')
				}
			}

			if (data.event === 'sync_user_list') {
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
		},

		onError() {
			console.log('出错了')
		}
	},

	onLaunch() {
		console.log('App Launch')
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
