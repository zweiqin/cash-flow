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
				return `您好，管理员！`
			}
			return `您好，${getApp().globalData.userName}!`
		}
	},

	onLoad(options) {
		this.load_role = options.role
		// console.log(options)
	},
	onShow() {
		getApp().globalData.drag = this
		this.appListData = getApp().globalData.appListData
		// console.log(window.location.pathname, window.location.href, window.location.hash)
		// console.log(window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.length))
		// if (getApp().globalData.wsHandle === '') {
		// 	if (window.location.href.substring(window.location.href.indexOf('=') + 1, window.location.href.length) === 'admin') {
		// 		uni.navigateTo({ url: '/pages/login-admin/index' })
		// 	} else {
		// 		uni.navigateTo({ url: '/pages/index/index' })
		// 	}
		// }

		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			if (this.load_role === 'admin') {
				uni.navigateTo({ url: '/pages/login-admin/index' })
			} else {
				uni.navigateTo({ url: '/pages/index/index' })
			}
		}
	},
	onHide() {
		console.log('隐藏drag组件')
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
					uni.navigateTo({ url: '/pages/login-admin/index' })
				} else {
					uni.navigateTo({ url: '/pages/index/index' })
				}
			} else if (this.toast_significance === 'syncInfo') {
				// this.toast_significance = ''
				if (getApp().globalData.role === 'admin') {
					uni.navigateTo({ url: '/pages/manipulate/index?role=admin' })
				} else {
					uni.navigateTo({ url: '/pages/game/index' })
				}
			}
		}
		// stopGame() {
		// }
	}
}
</script>

<style lang="scss" scoped>
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

/* 流星*/
.tn-satr {
	position: fixed;
	width: 100%;
	height: 600px;
	overflow: hidden;
	flex-shrink: 0;
	// z-index: 998;
}

.stars {
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 400px;
}

.star {
	border-radius: 50%;
	background: #ffffff;
	box-shadow: 0px 0px 6px 0px rgba(255, 255, 255, 0.8);
}

.small-stars .star {
	position: absolute;
	width: 3px;
	height: 3px;
}
.small-stars .star:nth-child(2n) {
	opacity: 0;
	-webkit-animation: star-blink 1.2s linear infinite alternate;
	animation: star-blink 1.2s linear infinite alternate;
}
.small-stars .star:nth-child(1) {
	left: 40px;
	bottom: 50px;
}
.small-stars .star:nth-child(2) {
	left: 200px;
	bottom: 40px;
}
.small-stars .star:nth-child(3) {
	left: 60px;
	bottom: 120px;
}
.small-stars .star:nth-child(4) {
	left: 140px;
	bottom: 250px;
}
.small-stars .star:nth-child(5) {
	left: 400px;
	bottom: 300px;
}
.small-stars .star:nth-child(6) {
	left: 170px;
	bottom: 80px;
}
.small-stars .star:nth-child(7) {
	left: 200px;
	bottom: 360px;
	-webkit-animation-delay: 0.2s;
	animation-delay: 0.2s;
}
.small-stars .star:nth-child(8) {
	left: 250px;
	bottom: 320px;
}
.small-stars .star:nth-child(9) {
	left: 300px;
	bottom: 340px;
}
.small-stars .star:nth-child(10) {
	left: 130px;
	bottom: 320px;
	-webkit-animation-delay: 0.5s;
	animation-delay: 0.5s;
}
.small-stars .star:nth-child(11) {
	left: 230px;
	bottom: 330px;
	-webkit-animation-delay: 7s;
	animation-delay: 7s;
}
.small-stars .star:nth-child(12) {
	left: 300px;
	bottom: 360px;
	-webkit-animation-delay: 0.3s;
	animation-delay: 0.3s;
}
@-webkit-keyframes star-blink {
	50% {
		width: 3px;
		height: 3px;
		opacity: 1;
	}
}
@keyframes star-blink {
	50% {
		width: 3px;
		height: 3px;
		opacity: 1;
	}
}
.medium-stars .star {
	position: absolute;
	width: 3px;
	height: 3px;
	opacity: 0;
	-webkit-animation: star-blink 1.2s ease-in infinite alternate;
	animation: star-blink 1.2s ease-in infinite alternate;
}
.medium-stars .star:nth-child(1) {
	left: 300px;
	bottom: 50px;
}
.medium-stars .star:nth-child(2) {
	left: 400px;
	bottom: 40px;
	-webkit-animation-delay: 0.4s;
	animation-delay: 0.4s;
}
.medium-stars .star:nth-child(3) {
	left: 330px;
	bottom: 300px;
	-webkit-animation-delay: 0.2s;
	animation-delay: 0.2s;
}
.medium-stars .star:nth-child(4) {
	left: 460px;
	bottom: 300px;
	-webkit-animation-delay: 0.9s;
	animation-delay: 0.9s;
}
.medium-stars .star:nth-child(5) {
	left: 300px;
	bottom: 150px;
	-webkit-animation-delay: 1.2s;
	animation-delay: 1.2s;
}
.medium-stars .star:nth-child(6) {
	left: 440px;
	bottom: 120px;
	-webkit-animation-delay: 1s;
	animation-delay: 1s;
}
.medium-stars .star:nth-child(7) {
	left: 200px;
	bottom: 140px;
	-webkit-animation-delay: 0.8s;
	animation-delay: 0.8s;
}
.medium-stars .star:nth-child(8) {
	left: 30px;
	bottom: 480px;
	-webkit-animation-delay: 0.3s;
	animation-delay: 0.3s;
}
.medium-stars .star:nth-child(9) {
	left: 460px;
	bottom: 400px;
	-webkit-animation-delay: 1.2s;
	animation-delay: 1.2s;
}
.medium-stars .star:nth-child(10) {
	left: 150px;
	bottom: 10px;
	-webkit-animation-delay: 1s;
	animation-delay: 1s;
}
.medium-stars .star:nth-child(11) {
	left: 420px;
	bottom: 450px;
	-webkit-animation-delay: 1.2s;
	animation-delay: 1.2s;
}
.medium-stars .star:nth-child(12) {
	left: 340px;
	bottom: 180px;
	-webkit-animation-delay: 1.1s;
	animation-delay: 1.1s;
}
@keyframes star-blink {
	50% {
		width: 4px;
		height: 4px;
		opacity: 1;
	}
}
.star-fall {
	position: relative;
	border-radius: 2px;
	width: 80px;
	height: 2px;
	overflow: hidden;
	-webkit-transform: rotate(-20deg);
	transform: rotate(-20deg);
}
.star-fall:after {
	content: '';
	position: absolute;
	width: 50px;
	height: 2px;
	background: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0)), to(rgba(255, 255, 255, 0.4)));
	background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.4) 100%);
	left: 100%;
	-webkit-animation: star-fall 3.6s linear infinite;
	animation: star-fall 3.6s linear infinite;
}

.star-fall:nth-child(1) {
	left: 80px;
	bottom: -100px;
}
.star-fall:nth-child(1):after {
	-webkit-animation-delay: 2.4s;
	animation-delay: 2.4s;
}

.star-fall:nth-child(2) {
	left: 200px;
	bottom: -200px;
}
.star-fall:nth-child(2):after {
	-webkit-animation-delay: 2s;
	animation-delay: 2s;
}

.star-fall:nth-child(3) {
	left: 430px;
	bottom: -50px;
}
.star-fall:nth-child(3):after {
	-webkit-animation-delay: 3.6s;
	animation-delay: 3.6s;
}

.star-fall:nth-child(4) {
	left: 400px;
	bottom: 100px;
}
.star-fall:nth-child(4):after {
	-webkit-animation-delay: 0.2s;
	animation-delay: 0.2s;
}

@-webkit-keyframes star-fall {
	20% {
		left: -100%;
	}
	100% {
		left: -100%;
	}
}

@keyframes star-fall {
	20% {
		left: -100%;
	}
	100% {
		left: -100%;
	}
}

/* 波浪*/
.template-outset {
	background-image: linear-gradient(to top, #4c3fae 20%, #6e26ba 80%);
	width: 100vw;
	height: 100vh;
}
</style>
