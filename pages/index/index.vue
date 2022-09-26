<template>
	<view class="template-outset">
		<!-- 顶部自定义导航 -->
		<!-- <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar> -->

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

		<!-- 头像用户信息 -->
		<view class="user-info__container tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
			<!-- <view class="user-info__avatar tn-flex tn-flex-col-center tn-flex-row-center">
				<view class="tn-shadow-blur" style="background-image:url('https://tnuiimage.tnkjapp.com/logo/tuniao.png');width: 170rpx;height: 170rpx;background-size: cover;"> </view>
			</view> -->
			<view class="user-info__avatar tn-flex tn-flex-col-center tn-flex-row-center"> <view class="user-info__nick-name">财富流</view> </view>
			<!-- <view class="user-info__nick-name">图鸟UI</view> -->
		</view>

		<view class="login">
			<view class="login__wrapper">
				<view class="login-tag"> <tn-tag background-color="tn-cool-bg-color-3" font-color="tn-color-white" margin="1vw 45vw" width="10vw" shape="radius">用户</tn-tag> </view>

				<!-- 输入框内容-->
				<view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
					<!-- 用户进入房间 -->
					<block>
						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">

							<view class="login__info__item__input__left-icon"> <view class="tn-icon-home-capsule"></view> </view>

							<view class="tn-flex login__info__item__input__content">

								<view class="tn-text-lg tn-color-white tn-text-bold" style="padding-right: 5px;;letter-spacing: 2px;">{{ today }}</view> <input v-model="game_key" type="number" maxlength="4" placeholder-class="input-placeholder" placeholder="请输入房间号码后四位" />

							</view>

						</view>

						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-my"></view> </view>
							<view class="login__info__item__input__content"> <input v-model="user_name" placeholder-class="input-placeholder" placeholder="请输入您的中文昵称" /> </view>
							<!-- <view class="login__info__item__input__content"> <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入用户名" /> </view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view> -->
						</view>

					</block>
				</view>

			</view>
		</view>

		<!-- <view class="tn-text-center tn-color-gray--disabled" style="padding: 60vh 0 0 0;">
			<view class="" style="font-size: 45rpx;"> 图鸟UI，不止于此 </view> <view class="tn-color-gray--disabled tn-text-df tn-padding-top"> 新触动 新感受 新创意 </view>
		</view> -->

		<view class="game-enter" style="padding: 12rpx 200rpx;z-index: 999;position: relative;">
			<tn-button
				:plain="true"
				:block-repeat-click="true" shape="round" background-color="#FFFFFF" font-color="#FFFFFF"
				width="50%" height="100rpx" margin="0 25%" @click="joinGame()"
			>进入游戏</tn-button>
		</view>

		<!-- <view class="tnwave waveAnimation">
			<view class="waveWrapperInner bgTop"> <view class="wave waveTop" style="background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-2.png')"></view> </view>
			<view class="waveWrapperInner bgMiddle"> <view class="wave waveMiddle" style="background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-2.png')"></view> </view>
			<view class="waveWrapperInner bgBottom"> <view class="wave waveBottom" style="background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-1.png')"></view> </view>
		</view> -->

		<!-- 回到首页悬浮按钮-->
		<!-- <nav-index-button></nav-index-button> -->

		<view>
			<tn-toast ref="toast" @closed="toInterface()"></tn-toast>
		</view>

	</view>
</template>

<script>
// import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
// import NavIndexButton from '@/libs/components/nav-index-button.vue'

// 接口
import { GetCurrentUser } from 'config/api.js'
export default {
	name: 'Index',
	// mixins: [template_page_mixin],
	// components: { NavIndexButton },
	data() {
		return {
			// 是否显示密码
			// showPassword: false
			user_name: '',
			game_key: '',
			toast_icon: '',
			today: ''
		}
	},
	onLoad() {
		getApp().globalData.users = this
		this.getToday()
	},
	onShow() {
		// getApp().globalData.users = this
	},
	onHide() {
		console.log('隐藏users组件')
		// getApp().globalData.users = null
	},
	onUnload() {
		console.log('卸载users组件')
		getApp().globalData.users = null
	},

	methods: {
		getToday() {
			const date = new Date()
			const year = String(date.getFullYear()).substring(2)
			let month = String(date.getMonth() + 1)
			let day = String(date.getDate())
			// console.log(date, year, month, day)
			month = month.length > 1 ? month : '0' + month
			day = day.length < 2 ? '0' + day : day
			this.today = year + month + day
		},

		joinGame() {
			if (this.game_key.length !== 4) return this.globalNotice('提示', '请输入房间号后四位', 'tip-fill')
			if (!/^[\u4E00-\u9FA5]+$/.test(this.user_name)) return this.globalNotice('提示', '请输入中文名称', 'tip-fill')
			getApp().globalData.init({
				method: 'joinGame',
				data: { username: this.user_name, game_key: this.today + this.game_key } // 房间秘钥
			})
		},
		globalNotice(title, content, icon, significance) {
			if (title === 'toPlay') return this.toast_significance = 'toPlay'
			this.$refs.toast.show({
				title,
				content,
				icon,
				image: '',
				duration: 1500
			})
			if (significance) this.toast_significance = significance
			// this.todrag()
		},
		toInterface() {
			// console.log('xxx')
			if (this.toast_significance === 'toDrag') {
				// this.toast_significance = ''
				uni.redirectTo({
					url: '/pages/drag/index'
				})
			} else if (this.toast_significance === 'toPlay') {
				// this.toast_significance = ''
				GetCurrentUser({
					game_id: getApp().globalData.gameId
				})
					.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
						if (res[1].data.status === 200) {
							getApp().globalData.round = [res[1].data.data.game_user_id, res[1].data.data.index]
							uni.redirectTo({ url: '/pages/game/index' })
						} else {
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}

	}
}
</script>

<style lang="scss" scoped>
// @import '@/static/css/templatePage/custom_nav_bar.scss';
@import '@/static/css/star/star.scss';

/* 用户信息 start */
.user-info {
	&__container {
		position: absolute;
		top: 100rpx;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	&__avatar {
		width: 200rpx;
		height: 80rpx;
		border: 8rpx solid rgba(255, 255, 255, 0.05);
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
	}

	&__nick-name {
		color: #33ccff;
		margin-top: 5rpx;
		font-size: 36rpx;
		font-weight: 600;
		text-align: center;
	}
}
/* 用户信息 end */

/* 登录 start */
.login {
	position: relative;
	// height: 100%;
	z-index: 1;

	/* 内容 start */
	&__wrapper {
		padding-top: 200rpx;
		padding-bottom: 100rpx;
		width: 100%;
		.login-tag {
			margin-bottom: 20rpx;
			font-weight: 700;
			letter-spacing: 0.3em;
		}
	}

	/* 登录注册信息 start */
	&__info {
		margin: 0 auto;
		margin-top: 55rpx;
		padding: 30rpx 51rpx;
		padding-bottom: 0;
		width: 80vmin;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(6rpx);
		-webkit-backdrop-filter: blur(6rpx);
		border: 2rpx solid rgba(255, 255, 255, 0.1);
		box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);

		&__item {
			&__input {
				margin-top: 59rpx;
				margin-bottom: 50rpx;
				width: 100%;
				height: 77rpx;
				border: 1rpx solid #ffffff;
				border-radius: 39rpx;

				&__left-icon {
					width: 10%;
					font-size: 44rpx;
					margin-left: 20rpx;
					color: #ffffff;
				}

				&__content {
					width: 80%;
					padding-left: 10rpx;

					&--verify-code {
						width: 56%;
					}

					input {
						font-size: 24rpx;
						color: #ffffff;
						// letter-spacing: 0.1em;
					}
				}

				&__right-icon {
					width: 10%;
					font-size: 44rpx;
					margin-right: 20rpx;
					color: #ffffff;
				}

				&__right-verify-code {
					width: 34%;
					margin-right: 20rpx;
				}
			}
		}
	}
	/* 登录注册信息 end */
	/* 内容 end */
}

.game-enter {
}

/deep/.input-placeholder {
	font-size: 24rpx;
	color: #e6e6e6;
}
/* 登录 end */

/* 波浪*/
.template-outset {
	background-image: linear-gradient(to top, #4c3fae 20%, #6e26ba 80%);
	width: 100vw;
	height: 100vh;
}
// @keyframes move_wave {
// 	0% {
// 		transform: translateX(0) translateZ(0) scaleY(1);
// 	}
// 	50% {
// 		transform: translateX(-25%) translateZ(0) scaleY(1);
// 	}
// 	100% {
// 		transform: translateX(-50%) translateZ(0) scaleY(1);
// 	}
// }
// .tnwave {
// 	overflow: hidden;
// 	position: absolute;
// 	left: 0;
// 	right: 0;
// 	bottom: 0;
// 	top: 0;
// 	margin: auto;
// }
// .waveWrapperInner {
// 	position: absolute;
// 	width: 100%;
// 	overflow: hidden;
// 	height: 100%;
// }
// .wave {
// 	position: absolute;
// 	left: 0;
// 	width: 200%;
// 	height: 100%;
// 	background-repeat: repeat no-repeat;
// 	background-position: 0 bottom;
// 	transform-origin: center bottom;
// }

// .bgTop {
// 	opacity: 0.4;
// }
// .waveTop {
// 	background-size: 50% 45px;
// }
// .waveAnimation .waveTop {
// 	animation: move_wave 4s linear infinite;
// }

// .bgMiddle {
// 	opacity: 0.6;
// }
// .waveMiddle {
// 	background-size: 50% 40px;
// }
// .waveAnimation .waveMiddle {
// 	animation: move_wave 3.5s linear infinite;
// }

// .bgBottom {
// 	opacity: 0.95;
// }
// .waveBottom {
// 	background-size: 50% 35px;
// }
// .waveAnimation .waveBottom {
// 	animation: move_wave 2s linear infinite;
// }
</style>
