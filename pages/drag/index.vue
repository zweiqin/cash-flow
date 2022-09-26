<template>
	<view class="template-outset">
		<!-- 流星-->
		<view class="tn-satr">
			<view class="sky"></view>
			<view class="stars">
				<view class="falling-stars"> <view class="star-fall"></view> <view class="star-fall"></view> <view class="star-fall"></view> <view class="star-fall"></view> </view>
				<view class="small-stars">
					<view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view>
					<view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view>
				</view>
				<view class="medium-stars">
					<view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view>
					<view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view> <view class="star"></view>
				</view>
			</view>
		</view>

		<view class="tn-flex tn-flex-direction-column tn-padding-xl container">
			<view class="waiting">{{ welcome }}</view>
			<view v-if="appListData.length > 0" class="around-list"> <AppChange :list-data="appListData" @listChange="listChange"></AppChange></view>
			<view v-if="appListData.length === 0" class="waiting">正在等待玩家进入房间…</view>

			<view class="tn-flex tn-flex-row-right button-area">
				<view v-if="role === 'user'" class="">
					<tn-button :shadow="true" width="100%" height="100rpx" background-color="tn-main-gradient-indigo" margin="10rpx 0" @click="quitGame()">退出房间</tn-button>
				</view>
				<view v-if="role === 'admin'" class="">
					<view>
						<tn-button :shadow="true" size="lg" width="100%" height="100rpx" background-color="tn-main-gradient-indigo" margin="10rpx 0" @click="showModel(0)">开始游戏</tn-button>
					</view>
					<view>
						<tn-button :shadow="true" size="lg" width="100%" height="100rpx" background-color="tn-main-gradient-indigo" margin="10rpx 0" @click="showModel(1)">关闭房间</tn-button>
					</view>
				</view>
			</view>
		</view>

		<view> <tn-toast ref="toast" @closed="closeToast()"></tn-toast> </view>

		<!-- 模态框 -->
		<tn-modal
			v-model="is_show_model"
			background-color="#E4E9EC"
			width="84%"
			padding="30rpx 26rpx"
			:radius="12"
			font-color="#BA7027"
			:font-size="35"
			title="提示"
			:content="content"
			:button="button"
			:show-close-btn="true"
			:mask-closeable="true"
			:zoom="true"
			:custom="false"
			@click="clickBtn"
		>
			<!-- <view v-if="custom">
				<view class="custom-modal-content">
					<tn-form :label-width="140">
						<tn-form-item label="手机号码" :border-bottom="false">
							<tn-input placeholder="请输入手机号码"></tn-input>
						</tn-form-item>
						<tn-form-item label="验证码" :border-bottom="false">
							<tn-input placeholder="请输入验证码"></tn-input>
							<view slot="right" class="tn-flex tn-flex-col-center tn-flex-row-center">
								<tn-button :font-size="20" padding="10rpx" height="46rpx" background-color="#01BEFF" font-color="tn-color-white">获取验证码</tn-button>
							</view>
						</tn-form-item>
					</tn-form>
				</view>
			</view> -->
		</tn-modal>

	</view>
</template>

<script>
import AppChange from '@/components/healer-dragList/AppChange.vue'
export default {
	components: { AppChange },
	data() {
		return {
			load_role: '',
			appListData: [
				// {
				// 	// appId: 1,
				// 	appIcon: 'tn-icon-trusty',
				// 	appName: 'Banker'
				// },
				// {
				// 	// appId: 2,
				// 	appIcon: 'tn-icon-con-cancer',
				// 	appName: '用户2'
				// },
				// {
				// 	// appId: 3,
				// 	appIcon: 'tn-icon-zodiac-niu',
				// 	appName: '用户3'
				// },
				// {
				// 	// appId: 4,
				// 	appIcon: 'tn-icon-zodiac-hu',
				// 	appName: '用户4'
				// },
				// {
				// 	// appId: 5,
				// 	appIcon: 'cuIcon-pic',
				// 	appName: '用户5'
				// },
				// {
				// 	// appId: 6,
				// 	appIcon: 'cuIcon-cart',
				// 	appName: '用户6'
				// }
			],

			role: getApp().globalData.role,

			// 模态框
			is_show_model: false,
			button: [
				{
					text: '取消',
					backgroundColor: '#A4E82F',
					fontColor: '#FFFFFF'
				},
				{
					text: '确定',
					backgroundColor: 'tn-bg-indigo',
					fontColor: '#FFFFFF'
				}
			],
			button_order: '',
			content: '',

			toast_significance: ''
		}
	},

	computed: {
		welcome() {
			if (getApp().globalData.role === 'admin') {
				return `您好，管理员！房间号为 ${getApp().globalData.gameKey}`
			}
			return `您好，${getApp().globalData.userName}!`
		}
	},

	onLoad(options) {
		getApp().globalData.drag = this
		this.load_role = options.role
		// console.log(options)
	},
	onShow() {
		// getApp().globalData.drag = this
		this.appListData = getApp().globalData.appListData
		// console.log(window.location.pathname, window.location.href, window.location.hash)
		// console.log(window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.length))
		// if (getApp().globalData.wsHandle === '') {
		// 	if (window.location.href.substring(window.location.href.indexOf('=') + 1, window.location.href.length) === 'admin') {
		// 		uni.redirectTo({ url: '/pages/login-admin/index' })
		// 	} else {
		// 		uni.redirectTo({ url: '/pages/index/index' })
		// 	}
		// }

		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			if (this.load_role === 'admin') {
				uni.redirectTo({ url: '/pages/login-admin/index' })
			} else {
				uni.redirectTo({ url: '/pages/index/index' })
			}
		}
	},
	onHide() {
		console.log('隐藏drag组件')
		// getApp().globalData.drag = null
	},
	onUnload() {
		console.log('卸载drag组件')
		getApp().globalData.drag = null
	},

	methods: {
		listChange(option) {
			// console.log('listChange', option)
			const temp_arr = [ 'banker' ]
			option.forEach((item) => {
				temp_arr.push(item.appName)
			})
			getApp().globalData.send({
				method: 'dragUser',
				data: {
					user_list: temp_arr,
					game_key: getApp().globalData.gameKey
				}
			})
		},
		globalNotice(title, content, icon, significance) {
			this.$refs.toast.show({
				title,
				content,
				icon,
				image: '',
				duration: 1500
			})
			if (significance) this.toast_significance = significance
		},
		syncUserList() {
			this.appListData = getApp().globalData.appListData
			// console.log(this.appListData)
		},
		quitGame() {
			getApp().globalData.send({
				method: 'quitGame',
				data: {
					username: getApp().globalData.userName,
					game_key: getApp().globalData.gameKey
				}
			})
		},
		showModel(num) {
			if (num === 0) {
				if (getApp().globalData.appListData.length < 1) {
					return this.$refs.toast.show({
						title: '提醒',
						content: '人数不足，不能开始游戏',
						icon: 'lock',
						image: '',
						duration: 2000
					})
				}
				this.content = '确定要开始游戏吗？'
				this.button_order = 0
			} else if (num === 1) {
				this.content = '确定要关闭房间吗？'
				this.button_order = 1
			}
			this.is_show_model = true
		},
		clickBtn(event) {
			this.is_show_model = false
			// console.log(event.index)
			if (event.index === 1) {
				if (this.button_order === 0) {
					getApp().globalData.send({
						method: 'startGame',
						data: getApp().globalData.gameKey
					})
				} else if (this.button_order === 1) {
					getApp().globalData.send({
						method: 'stopGame',
						data: getApp().globalData.gameKey
					})
				}
			}
		},
		closeToast() {
			if (this.toast_significance === 'stopGame') {
				// this.toast_significance = ''
				if (getApp().globalData.role === 'admin') {
					uni.redirectTo({ url: '/pages/login-admin/index' })
				} else {
					uni.redirectTo({ url: '/pages/index/index' })
				}
			} else if (this.toast_significance === 'syncInfo') {
				// this.toast_significance = ''
				if (getApp().globalData.role === 'admin') {
					uni.redirectTo({ url: '/pages/manipulate/index?role=admin' })
				} else {
					uni.redirectTo({ url: '/pages/game/index' })
				}
			}
		}
		// stopGame() {
		// }
	}
}
</script>

<style lang="scss" scoped>
@import '@/static/css/star/star.scss';

.container {
	// padding: 40vmin;
	.around-list {
		// margin-left: 35vw;
		// margin-right: 5vw;
		// padding-top: 10vw;
	}
	.waiting {
		margin-bottom: 100rpx;
		font-size: 40rpx;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
	}
}

/* 波浪*/
.template-outset {
	background-image: linear-gradient(to top, #4c3fae 20%, #6e26ba 80%);
	width: 100vw;
	height: 100vh;
}
</style>
