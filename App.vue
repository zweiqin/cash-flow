<script>
export default {
	globalData: {
		wsHandle: '',
		action: null,
		vm: null,
		init(createMsg = null, vm = null) {
			// console.log(this.ws)
			this.wsHandle = new WebSocket('ws://106.55.157.177:19999/v1/socket/Socket')
			this.wsHandle.onopen = this.onOpen
			// 服务端发送回来的其他消息
			this.wsHandle.onmessage = this.onMessage
			this.wsHandle.onerror = this.onError
			this.action = createMsg
			this.vm = vm
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
		},

		onMessage(evt) {
			const _this = getApp().globalData
			// console.log('收到消息', evt)
			console.log(JSON.parse(evt.data))
			const data = JSON.parse(evt.data)
			// 创房的时候只有banker一个人
			if (_this.action.method === 'createGame' && data.event === 'global_notice') {
				console.log(111)
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
