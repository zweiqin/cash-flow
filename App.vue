<script>
// 接口
import { GetCardList, GetCardCategoryList } from 'config/api.js'

export default {
	globalData: {
		isReconnect: false,
		cardList: [],
		appListData: [
			// 拖拽页面的用户列表用到这个appListData数据
			// // 针对管理员 首次创房，这里写死 管理员一个人
			// {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker1'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker2'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker3'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker4'
			// }, {
			// 	appIcon: 'tn-icon-trusty',
			// 	appName: 'Banker5'
			// }
		],
		appListId: [
			// 两个游戏页面的上面的头像列表用到这个appListId数据
			// {
			// 	id: "169", // 游戏角色表主键
			// 	userName: '去',
			// 	roleId: "8", // 关联角色表主键
			// 	roleName: '护士'
			// },
			// {
			// 	id: "170",
			// 	userName: '玩家二号',
			// 	roleId: "7",
			// 	roleName: '产品经理'
			// }
		],
		// 当前轮的game_user_id和对应索引index，数据格式[game_user_id, index]
		// NextUser等接口用到这个数据，第二个元素用于同步顶部栏的头像显示效果
		round: ['0', '0'],
		// 有某个人抽到的那张卡的id：[data.game_user_id字符串, data.data.id数字]
		cardMsg: ['0', 0],
		// 大多数时候是一个对象，当前用户展示的卡牌的数据信息。三种情况：'',一个对象,undefined（找不到这张卡的时候）
		currentCard: '',
		cardCategoryList: [
			// {
			// 	'id': 4,
			// 	'category_name': '副业',
			// 	'price': 200,
			// 	'create_time': '2022-09-04 18:19:18'
			// },
			// {
			//     "id": 5,
			//     "category_name": "金融",
			//     "price": 200,
			//     "create_time": "2022-09-04 18:50:50"
			// },
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
		// app: '',
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
			// 当Browser接收到WebSocketServer端发送的关闭连接请求时，就会触发onclose消息。如果连接失败，发送、接收数据失败或者处理数据出现错误，browser会触发onerror消息;
			this.wsHandle.onclose = this.onClose
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
				// 管理员重新进入房间的时候，banker重新进入游戏，但由于是先globalNotice再syncUserList，所以会被覆盖
				_this.admin && _this.admin.globalNotice('创建成功', '即将跳转到等待页面', 'success', 'toDrag')

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

				// 在游戏里面，某玩家断线重连后，玩家xxx重新进入游戏
				// 玩家xxx使用xxxx卡牌成功
				_this.game && _this.game.globalNotice('提示', data.data, 'creative')
				_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')

				// console.log(111)
			}

			if (data.event === 'errorMsg') {
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
					// 已经加入房间 或 房间不存在 或 已经开始游戏,无法加入
						_this.users && _this.users.globalNotice('加入失败', data.data, 'cross-fill')
					}

					// 拖拽页面
					// 情况：用户 退出房间失败，此连接未加入任何房间 或 房间不存在
					_this.drag && _this.drag.globalNotice('提示', data.data, 'cross-fill')
				}

				// 游戏页面，其他情况
				_this.game && _this.game.globalNotice('提示', data.data, 'cross-fill')
				_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'cross-fill')
			}

			if (data.event === 'syncUserList') {
				// 用户 在登录页面 加入（或重新加入）游戏后（对用户自己），[xxx,xxx...]。可能跳转到等待页面，也可能是游戏页面
				_this.users && _this.users.globalNotice('加入成功', '即将跳转', 'success', 'toDrag')
				// 管理员 在登录页面 重新加入游戏后（对管理员自己），[xxx,xxx...]。可能跳转到等待页面，也可能是游戏页面
				_this.admin && _this.admin.globalNotice('重新进入成功', '即将跳转', 'success', 'toDrag')
				// sync_user_list返回的数组的排序
				_this.appListData = data.data.slice(1).map((item) => ({
					appIcon: 'tn-icon-trusty',
					appName: item
				}))
				// 还没开始游戏，实时同步 拖拽列表
				_this.drag && _this.drag.syncUserList()
				// // // 这里以后可能需要（appListData），现在采用的是appListId
				// // // 场景：开始游戏后，断线重连，其它用户能看到，实时同步 上面的头像列表
				// // _this.game && _this.game.syncUserList()
				// // // 场景：开始游戏后，断线重连，管理员能看到，实时同步 上面的头像列表
				// // _this.manipulate && _this.manipulate.syncUserList()
				if (_this.isReconnect) {
					// 在拖拽页面 断线重连的逻辑
					if (_this.drag) {
						_this.role = 'user' && uni.reLaunch({ url: '/pages/drag/index' })
						_this.role = 'admin' && uni.reLaunch({ url: '/pages/drag/index?role=admin' })
					}
					_this.isReconnect = false
					uni.hideLoading()
				}
			}

			if (data.event === 'stopGame') {
				// 管理员关闭房间后，广播给所有人，房间已关闭，游戏被管理员结束
				_this.drag && _this.drag.globalNotice('提示', data.data, 'home-vertical', 'stopGame')
				_this.game && _this.game.globalNotice('提示', data.data, 'home-vertical', 'stopGame')
				_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'home-vertical', 'stopGame')
				_this.appListId = []
				_this.appListData = []
				_this.round = ['0', '0']
				_this.cardMsg = ['0', 0]
				_this.currentCard = ''
				_this.action = null
				_this.role = ''
				_this.gameKey = ''
				_this.userName = ''
				_this.gameId = ''
				_this.gameUserId = ''
			}

			if (data.event === 'syncInfo') {
				_this.gameUserId = data.game_user_id
				_this.gameId = data.game_id
				_this.appListId = data.data.map((item) => ({ id: String(item.id), userName: item.username, roleId: String(item.role_id), roleName: item.role_name }))
				// console.log(data.data, _this.appListId, _this.appListData)
				// 管理员开始游戏后，（在拖拽页面）广播给所有人，data.data,[当前房间里的所有用户的数据，没有管理员，{},{},{}]。
				_this.drag && _this.drag.globalNotice('提示', '正在进入游戏', 'game', 'syncInfo')
				// 游戏已经开始，管理员或有用户 断线重连，（在登录页面(两个都是)）只发给断线重连的那个人，data.data,[当前房间里的所有用户的数据，没有管理员，{},{},{}]。 // 注意，这里的toGame或toManipulate，因为toast框关闭之后的操作toInterface是异步的，在关闭toast之前会覆盖掉toDrag（toast_significance）。注意是先syncUserList，再syncInfo
				_this.users && _this.users.globalNotice('toPlay')
				_this.admin && _this.admin.globalNotice('toPlay')
				if (_this.isReconnect) {
					// 在两个游戏页面 断线重连的逻辑
					_this.game && uni.reLaunch({ url: '/pages/game/index' })
					_this.manipulate && uni.reLaunch({ url: '/pages/manipulate/index?role=admin' })
					_this.isReconnect = false
					uni.hideLoading()
				}
			}

			if (data.event === 'myTurn') {
				// _this.round = [_this.appListId[data.data.index - 1].id, data.data.index]
				// 这里的game_user_id是指当前轮的玩家的用户id（统一都是）
				_this.round = [data.game_user_id, data.data.index]
				// 同步头像样式 并且 同步倒计时信息 并且 同步按钮按钮信息
				_this.game && _this.game.syncAvatarStyle()
				_this.manipulate && _this.manipulate.syncAvatarStyle()
				if (_this.round[0] === getApp().globalData.gameUserId) {
					_this.game && _this.game.globalNotice('提示', '轮到您了！', 'creative')
				} else {
					_this.game && _this.game.globalNotice('提示', '下一回合！', 'creative')
				}
				// 同步信息，并且关闭用户的游戏界面 里的 被动弹出的 抽卡 的模态框
				_this.game && _this.game.syncInfo('myTurn')
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'sendMoney') {
				// data: "banker发送现金1元给玩家去"，game_user_id: "xxx"（统一为那个收到钱的那个人） is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('好消息', `banker发现金${data.data.replace(/[^\d]/g, ' ')}元给您啦！`, 'lucky-money')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'payroll') {
				// data: "banker发工资2500元给玩家去"，game_user_id: "xxx"（统一为那个收到钱的那个人） is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('好消息', `banker发工资${data.data.replace(/[^\d]/g, ' ')}元给您啦！`, 'alipay')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'deductMoney') {
				// banker_action: false,data: "banker扣除逼玩家200元",event: "deductMoney",game_id: "166",game_user_id: "292",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('坏消息', `banker扣了您${data.data.replace(/[^\d]/g, ' ')}元钱！`, 'reduce-circle')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'drawCard') {
				// data: {id: 28}，game_user_id: "254"（统一为那个收到卡的那个人） is_all: true
				_this.cardMsg = [data.game_user_id, data.data.id]
				// _this.currentCard = _this.cardList.find((item) => item.id === _this.cardMsg[1])
				_this.currentCard = _this.cardList.find((item) => item.id === data.data.id)
				// _this.game && _this.game.handleManage('drawCard')
				// _this.manipulate && _this.manipulate.handleManage('drawCard')
				_this.game && _this.game.syncInfo('drawCard')
				_this.manipulate && _this.manipulate.syncInfo('drawCard')
			}

			if (data.event === 'receiveAuction') {
				// banker_action: false,data: {id: 21, category_id: 4, card_name: 'P02副业-办软件公司', type: 0, is_all: 0, …},event: "receiveAuction",game_id: "176",game_user_id: "311",is_all: false
				_this.cardMsg = [data.game_user_id, data.data.id]
				_this.currentCard = _this.cardList.find((item) => item.id === data.data.id)
				// _this.game && _this.game.handleManage('receiveAuction')
				// _this.manipulate && _this.manipulate.handleManage('receiveAuction')
				_this.game && _this.game.syncInfo('receiveAuction')
				_this.manipulate && _this.manipulate.syncInfo('receiveAuction')
			}

			if (data.event === 'confirmCard') {
				// banker_action: false,data: "玩家牛确认卡片房产投资-3室2厅1卫(3-2-1)成功",event: "confirmCard",game_id: "173",game_user_id: "311",is_all: true
				// banker_action: false,data: "玩家牛确认卡片个人逆流成功",event: "confirmCard",game_id: "198",game_user_id: "353",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('提示', data.data.replace(/^.{3}/, '您'), 'bankcard-fill')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'energize') {
				// banker_action: false，data: "玩家牛免费补充2点精力"，event: "energize"，game_id: "153"，game_user_id: ""，is_all: true
				// banker_action: false，data: "玩家牛补充2点精力，扣除一个月的总支出"，event: "energize"，game_id: "153"，game_user_id: "
				// banker_action: false，data: "玩家牛补充2点精力，从现金中扣除10%的总收入800元"，event: "energize"，game_id: "154"，game_user_id: ""，is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('提示', data.data.replace(/^.{3}/, '您'), 'battery-mid')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'haveBaby') {
				// banker_action: false，data: "玩家牛生了一个孩子"，event: "haveBaby"，game_id: "156"，game_user_id: ""，is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('恭喜', data.data.replace(/^.{3}/, '您'), 'battery-mid')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'heartBreak') {
				// banker_action: false，data: "玩家牛失恋了,消耗2点精力"，event: "heartBreak"，game_id: "184"，game_user_id: ""，is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('坏消息', data.data.replace(/^.{3}/, '您'), 'like-break')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'unemployment') {
				// banker_action: false,data: "玩家牛失业",event: "unemployment",game_id: "244",game_user_id: "433",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('坏消息', data.data.replace(/^.{3}/, '您'), 'job')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'bankrupt') {
				// banker_action: false,data: "玩家牛破产,下一轮重新开始沙盘推演",event: "bankrupt",game_id: "244",game_user_id: "433",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('坏消息', data.data.replace(/^.{3}/, '您'), 'empty-permission')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'doCharity') {
				// banker_action: false,data: "玩家牛做慈善，捐赠1500元",event: "doCharity",game_id: "164",game_user_id: "289",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('消息提醒', data.data.replace(/^.{3}/, '您'), 'praise')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'bankerLoan') {
				// banker_action: false,data: "玩家牛向银行贷款4200元",event: "bankerLoan",game_id: "165",game_user_id: "290",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('消息提醒', data.data.replace(/^.{3}/, '您'), 'count-fill')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'repayment') {
				// banker_action: false，data: "玩家牛向银行还款1元"，event: "repayment"，game_id: "166"，game_user_id: "291"，is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('消息提醒', data.data.replace(/^.{3}/, '您'), 'trust')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'givingMoney') {
				// banker_action: false，data: "玩家牛向玩家逼送钱100元"，event: "givingMoney"，game_id: "172"，game_user_id: "302"，is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('消息提醒', data.data.replace(/^.{3}/, '您'), 'lucky-money-fill')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'quitPartTime') {
				// banker_action: false,data: "玩家牛取消副业P17副业-翻译",event: "quitPartTime",game_id: "216",game_user_id: "388",is_all: true
				if (_this.gameUserId === data.game_user_id) {
					_this.game && _this.game.globalNotice('消息提醒', data.data.replace(/^.{3}/, '您'), 'empty-favor')
				} else {
					_this.game && _this.game.globalNotice('提示', data.data, 'creative')
					_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
				}
				_this.game && _this.game.syncInfo()
				_this.manipulate && _this.manipulate.syncInfo()
			}

			if (data.event === 'lookForJob') {
				// banker_action: true，data: "请掷骰子,如点数大于3即可恢复工作"，event: "lookForJob"，game_id: "183"，game_user_id: "323"，is_all: false
				// banker_action: false,data: "玩家牛恢复工作",event: "lookForJob",game_id: "184",game_user_id: "325",is_all: true
				if (data.banker_action) {
					if (_this.gameUserId === data.game_user_id) {
						_this.game && _this.game.globalNotice('消息提醒', data.data, 'con-leo')
					} else {
						_this.game && _this.game.globalNotice('提示', `玩家${_this.appListId.find((item) => item.id === data.game_user_id).userName}触发了找工作，正在等待该玩家掷骰子`, 'creative')
						_this.manipulate && _this.manipulate.globalNotice('提示', `玩家${_this.appListId.find((item) => item.id === data.game_user_id).userName}触发了找工作，正在等待该玩家掷骰子`, 'creative')
					}
					_this.manipulate && _this.manipulate.syncInfo('lookForJob')
				} else {
					if (_this.gameUserId === data.game_user_id) {
						_this.game && _this.game.globalNotice('好消息', data.data.replace(/^.{3}/, '您'), 'con-leo')
					} else {
						_this.game && _this.game.globalNotice('提示', data.data, 'creative')
						_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
					}
					_this.manipulate && _this.manipulate.syncInfo()
				}
				_this.game && _this.game.syncInfo()
			}

			if (data.event === 'litigate') {
				// banker_action: true,data: "请掷骰子,如点数大于3即可一次性获得原工资5倍现金收入",event: "litigate",game_id: "196",game_user_id: "349",is_all: false
				// banker_action: false,data: "玩家牛打官司成功,获得30000元现金",event: "lookForJob",game_id: "196",game_user_id: "349",is_all: true
				if (data.banker_action) {
					if (_this.gameUserId === data.game_user_id) {
						_this.game && _this.game.globalNotice('消息提醒', data.data, 'server')
					} else {
						_this.game && _this.game.globalNotice('提示', `玩家${_this.appListId.find((item) => item.id === data.game_user_id).userName}触发了打官司，正在等待该玩家掷骰子`, 'creative')
						_this.manipulate && _this.manipulate.globalNotice('提示', `玩家${_this.appListId.find((item) => item.id === data.game_user_id).userName}触发了打官司，正在等待该玩家掷骰子`, 'creative')
					}
					_this.manipulate && _this.manipulate.syncInfo('litigate')
				} else {
					if (_this.gameUserId === data.game_user_id) {
						_this.game && _this.game.globalNotice('好消息', data.data.replace(/^.{3}/, '您'), 'server')
					} else {
						_this.game && _this.game.globalNotice('提示', data.data, 'creative')
						_this.manipulate && _this.manipulate.globalNotice('提示', data.data, 'creative')
					}
					_this.manipulate && _this.manipulate.syncInfo()
				}
				_this.game && _this.game.syncInfo()
			}
		},

		onError() {
			console.log('出错了')
			const _this = getApp().globalData
			uni.showLoading({
				title: '断线了，正在重新连接......',
				mask: true
			})
			_this.isReconnect = true
			if (_this.action.method === 'createGame') {
				// console.log('发送')
				_this.action.method = 'rejoinGame'
				_this.init(_this.action)
			}
			if (_this.action.method === 'joinGame') {
				_this.init(_this.action)
			}
			if (_this.action.method === 'rejoinGame') {
				_this.init(_this.action)
			}
		},

		onClose() {
			console.log('关闭了')
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
		GetCardList({})
			.then((res) => {
				// console.log(res)
				// res[1]为类似axios封装改造好的数据，里面的data才是服务器真正的返回
				if (res[1].data.status === 200) {
					uni.setStorage({
						key: 'cards',
						data: res[1].data.data.items,
						success() {
							// console.log('success')
						}
					})
					uni.getStorage({
						key: 'cards',
						success: (res) => {
							this.globalData.cardList = res.data
							console.log(this.globalData.cardList)
						}
					})
				} else {
					this.globalData.users && this.globalData.users.globalNotice('提示', res[1].data.msg, 'warning-fill')
					this.globalData.admin && this.globalData.admin.globalNotice('提示', res[1].data.msg, 'warning-fill')
				}
			})
			.catch((err) => {
				console.log(err)
				this.globalData.users && this.globalData.users.globalNotice('提示', '网络错误！', 'warning-fill')
				this.globalData.admin && this.globalData.admin.globalNotice('提示', '网络错误！', 'warning-fill')
			})

		// uni.getStorage({
		// 	key: 'cards',
		// 	success(res) {
		// 		console.log(res.data)
		// 	}
		// })

		GetCardCategoryList({})
			.then((res) => {
				if (res[1].data.status === 200) {
					// console.log(res[1].data.data)
					this.globalData.cardCategoryList = res[1].data.data
				} else {
					this.globalData.users && this.globalData.users.globalNotice('提示', '获取游戏资源失败，请重试！', 'warning-fill')
					this.globalData.admin && this.globalData.admin.globalNotice('提示', '获取游戏资源失败，请重试！', 'warning-fill')
				}
			})
			.catch((err) => {
				console.log(err)
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
.pad-top {
	padding-top: 0.4vmin;
}
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import './tuniao-ui/index.scss';
@import './tuniao-ui/iconfont.css';
</style>
