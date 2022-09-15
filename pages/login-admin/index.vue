<template>
	<view class="template-login1">
		<!-- 顶部自定义导航 -->
		<!-- <tn-nav-bar fixed alpha customBack>
			<view slot="back" class="tn-custom-nav-bar__back" @click="goBack"> <text class="icon tn-icon-left"></text> <text class="icon tn-icon-home-capsule-fill"></text> </view>
		</tn-nav-bar> -->

		<canvas canvas-id="star_canvas" class="mycanvas" :style="'width:' + screenWidth + 'px;height:' + screenHeight + 'px;'"></canvas>

		<view class="login">
			<!-- 顶部背景图片-->
			<!-- <view class="login__bg login__bg--top">
        <image class="bg" src="https://tnuiimage.tnkjapp.com/login/1/login_top2.jpg" mode="widthFix"></image>
      </view>
      <view class="login__bg login__bg--top">
        <image class="rocket rocket-sussuspension" src="https://tnuiimage.tnkjapp.com/login/1/login_top3.png" mode="widthFix"></image>
      </view> -->

			<view class="login__wrapper">
				<view class="login-tag"> <tn-tag background-color="tn-cool-bg-color-3" font-color="tn-color-white" margin="1vw 45vw" width="10vw" shape="radius">管理员</tn-tag> </view>
				<!-- 登录/注册切换 -->
				<view class="login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
					<view class="login__mode__item tn-flex-1" :class="[{ 'login__mode__item--active': currentModeIndex === 0 }]" @tap.stop="modeSwitch(0)"> 创建房间 </view>
					<view class="login__mode__item tn-flex-1" :class="[{ 'login__mode__item--active': currentModeIndex === 1 }]" @tap.stop="modeSwitch(1)"> 重进房间 </view>

					<!-- 滑块-->
					<view class="login__mode__slider tn-cool-bg-color-15--reverse" :style="[modeSliderStyle]"></view>
				</view>

				<!-- 输入框内容-->
				<view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
					<!-- 创建房间 -->
					<block v-if="currentModeIndex === 0">
						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-home-capsule"></view> </view>
							<view class="login__info__item__input__content"> <input v-model="new_num" type="number" maxlength="4" placeholder-class="input-placeholder" placeholder="请输入房间号码后四位" /> </view>
							<view class="login__info__item__input__right-button" @click="showPassword = !showPassword">
								<view class="tn-margin-right-sm">
									<tn-button size="sm" background-color="#01BEFF" font-color="#FFFFFF" @click="getIntRandomValue">获取整数随机值</tn-button>
								</view>
							</view>
						</view>
						<!-- <view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-phone"></view> </view>
							<view class="login__info__item__input__content"> <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入登录手机号码" /> </view>
						</view>

						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-lock"></view> </view>
							<view class="login__info__item__input__content"> <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码" /> </view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view> -->
					</block>
					<!-- 重进房间 -->
					<block v-if="currentModeIndex === 1">
						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-home-capsule"></view> </view>
							<view class="login__info__item__input__content"> <input v-model="old_num" type="number" maxlength="4" placeholder-class="input-placeholder" placeholder="请输入房间号码后四位" /> </view>
						</view>
						<!--
						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-code"></view> </view>
							<view class="login__info__item__input__content login__info__item__input__content--verify-code">
								<input placeholder-class="input-placeholder" placeholder="请输入验证码" />
							</view>
							<view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
								<tn-button backgroundColor="#01BEFF" fontColor="#FFFFFF" size="sm" padding="5rpx 10rpx" width="100%" shape="round">{{ tips }}</tn-button>
							</view>
						</view>

						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-lock"></view> </view>
							<view class="login__info__item__input__content"> <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码" /> </view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view> -->
					</block>

					<view class="login__info__item__button tn-cool-bg-color-7--reverse" hover-class="tn-hover" :hover-stay-time="150" @click="createGame()">{{
						currentModeIndex === 0 ? '创建房间' : '重进房间'
					}}</view>

					<!-- <view v-if="currentModeIndex === 0" class="login__info__item__tips">忘记密码?</view> -->
				</view>

				<!-- 其他登录方式 -->
				<!-- <view class="login__way tn-flex tn-flex-col-center tn-flex-row-center">
					<view class="tn-padding-sm tn-margin-xs">
						<view class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-green tn-color-white">
							<view class="tn-icon-wechat-fill"></view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs">
						<view class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-red tn-color-white"> <view class="tn-icon-sina"></view> </view>
					</view>
					<view class="tn-padding-sm tn-margin-xs">
						<view class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-blue tn-color-white"> <view class="tn-icon-qq"></view> </view>
					</view>
				</view> -->
			</view>

			<!-- 底部背景图片-->
			<!-- <view class="login__bg login__bg--bottom">
        <image src="https://tnuiimage.tnkjapp.com/login/1/login_bottom_bg.jpg" mode="widthFix"></image>
      </view> -->
		</view>

		<!-- 验证码倒计时 -->
		<!-- <tn-verification-code ref="code" uniqueKey="login-demo-2" :seconds="60" @change="codeChange"> </tn-verification-code> -->

		<view>
			<tn-toast ref="toast" @closed="toInterface()"></tn-toast>
		</view>

	</view>
</template>

<script>
// import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

const Point = class {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.r = 1 + Math.random() * 2
		this.sx = Math.random() * 2 - 1
		this.sy = Math.random() * 2 - 1
	}

	draw(ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
		ctx.closePath()
		ctx.fillStyle = '#fff'
		ctx.fill()
	}

	move(w, h) {
		this.x += this.sx
		this.y += this.sy
		if (this.x > w || this.x < 0) this.sx = -this.sx
		if (this.y > h || this.y < 0) this.sy = -this.sy
	}

	drawLine(ctx, p) {
		const dx = this.x - p.x
		const dy = this.y - p.y
		const d = Math.sqrt(dx * dx + dy * dy)
		if (d < 100) {
			var alpha = ((100 - d) / 300) * 1
			ctx.beginPath()
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(p.x, p.y)
			ctx.closePath()
			ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'
			ctx.strokeWidth = 1
			ctx.stroke()
		}
	}
}

const sysinfo = uni.getSystemInfoSync()
const w = 400
const h = 1000

export default {
	name: 'LoginAdmin',
	// mixins: [template_page_mixin],
	data() {
		return {
			ctx: null,
			screenWidth: sysinfo.screenWidth,
			screenHeight: sysinfo.screenHeight,
			timer: null,
			points: [],

			// 当前选中的模式
			currentModeIndex: 0,
			// 模式选中滑块
			modeSliderStyle: {
				left: 0
			},
			toast_significance: '',
			// 是否显示密码
			// showPassword: false,
			// 倒计时提示文字
			// tips: '获取验证码'
			new_num: '',
			old_num: ''
		}
	},
	onLoad(options) {
		this.from = options.from || ''

		for (let i = 0; i < 80; i++) {
			this.points.push(new Point(Math.random() * w, Math.random() * h))
		}
		this.ctx = uni.createCanvasContext('star_canvas')
		// console.log(points)

		this.gameloop() // 进行
		// this.ctx.setFillStyle('red')
		// this.ctx.fillRect(200, 300, 50, 50)
		// this.ctx.draw()
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onShow() {
		getApp().globalData.admin = this
	},
	onHide() {
		console.log('隐藏admin组件')
		getApp().globalData.admin = null
	},

	watch: {
		currentModeIndex(value) {
			const sliderWidth = uni.upx2px(476 / 2)
			this.modeSliderStyle.left = `${sliderWidth * value}px`
		}
	},
	methods: {
		/** 粒子进行*/

		gameloop() {
			this.timer = setTimeout(this.gameloop, 100)
			// console.log('gameloop')
			this.paint()
		},

		/** 清空画布*/

		paint() {
			this.ctx.clearRect(0, 0, w, h)
			for (var i = 0; i < this.points.length; i++) {
				this.points[i].move(w, h)
				this.points[i].draw(this.ctx)
				for (var j = i + 1; j < this.points.length; j++) {
					this.points[i].drawLine(this.ctx, this.points[j])
				}
			}
			this.ctx.draw()
		},
		// 切换模式
		modeSwitch(index) {
			this.currentModeIndex = index
			this.showPassword = false
		},
		// 获取验证码
		// getCode() {
		// 	if (this.$refs.code.canGetCode) {
		// 		this.$t.message.loading('正在获取验证码')
		// 		setTimeout(() => {
		// 			this.$t.message.closeLoading()
		// 			this.$t.message.toast('验证码已经发送')
		// 			// 通知组件开始计时
		// 			this.$refs.code.start()
		// 		}, 2000)
		// 	} else {
		// 		this.$t.message.toast(this.$refs.code.secNum + '秒后再重试')
		// 	}
		// },
		// 获取验证码倒计时被修改
		// codeChange(event) {
		// 	this.tips = event
		// }

		createGame() {
			// console.log(getApp().globalData.wsHandle)
			if (this.currentModeIndex === 0) {
				getApp().globalData.init({
					method: 'createGame',
					data: this.new_num // 房间秘钥
				})
			} else if (this.currentModeIndex === 1) {
				getApp().globalData.init({
					method: 'rejoinGame',
					data: this.old_num // 房间秘钥
				})
			}
			// console.log(getApp().globalData.wsHandle)
			// getApp().globalData.wsHandle.send({})
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
		},
		toInterface() {
			// console.log('xxx')
			if (this.toast_significance === 'toDrag') {
				// this.toast_significance = ''
				uni.navigateTo({
					url: '/pages/drag/index?role=admin'
				})
			} else if (this.toast_significance === 'toPlay') {
				// this.toast_significance = ''
				uni.navigateTo({ url: '/pages/manipulate/index?role=admin' })
			}
		}

	}
}
</script>

<style lang="scss" scoped>
// @import '@/static/css/templatePage/custom_nav_bar.scss';

/* 粒子背景 start*/
.template-login1 {
	background: linear-gradient(90deg, #892fe8, #3d7eff);
	min-height: 100vh;
}
// .template-login2:before {
// 		content: "";
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		bottom: 0;
//     right: 0;
// 		-webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(black));
// 		-webkit-mask-image: linear-gradient(to bottom, transparent, black);
// 		        mask-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(black));
// 		        mask-image: linear-gradient(to bottom, transparent, black);
// 		background: -webkit-gradient(linear, left top, right top, from(#E72F8C), to(#892FE8));
// 		background: linear-gradient(90deg, #E72F8C, #892FE8);
//   }

.mycanvas {
	position: absolute;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	flex-direction: column;
	color: #fff;
}

.login {
	position: relative;
	height: 100%;
	z-index: 1;

	/* 内容 start */
	&__wrapper {
		padding-top: 100rpx;
		padding-bottom: 100rpx;
		width: 100%;
		.login-tag {
			margin-bottom: 20rpx;
			font-weight: 700;
			letter-spacing: 0.3em;
		}
	}

	/* 切换 start */
	&__mode {
		position: relative;
		margin: 0 auto;
		width: 476rpx;
		height: 77rpx;
		background-color: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(6rpx);
		-webkit-backdrop-filter: blur(6rpx);
		box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
		border-radius: 39rpx;

		&__item {
			height: 77rpx;
			width: 100%;
			line-height: 77rpx;
			text-align: center;
			font-size: 31rpx;
			color: #ffffff;
			letter-spacing: 0.5em;
			text-indent: 0.5em;
			z-index: 2;
			transition: all 0.4s;

			&--active {
				font-weight: bold;
				color: #ffffff;
			}
		}

		&__slider {
			position: absolute;
			height: inherit;
			width: calc(476rpx / 2);
			border-radius: inherit;
			box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
			z-index: 1;
			transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}
	}
	/* 切换 end */

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

				// &__right-icon {
				// 	width: 10%;
				// 	font-size: 44rpx;
				// 	margin-right: 20rpx;
				// 	color: #ffffff;
				// }

				&__right-button {
					width: 10%;
					font-size: 44rpx;
					margin-right: 20rpx;
					color: #ffffff;
				}

				// &__right-verify-code {
				// 	width: 34%;
				// 	margin-right: 20rpx;
				// }
			}

			&__button {
				margin-top: 5rpx;
				margin-bottom: 39rpx;
				width: 100%;
				height: 77rpx;
				text-align: center;
				font-size: 31rpx;
				font-weight: bold;
				line-height: 77rpx;
				letter-spacing: 1em;
				text-indent: 1em;
				border-radius: 100rpx;
				color: #ffffff;
				background-color: rgba(255, 255, 255, 0.2);
				// border: 2rpx solid #FFFFFF;
			}

			// &__tips {
			// 	margin: 30rpx 0;
			// 	color: #ffffff;
			// }
		}
	}
	/* 登录注册信息 end */

	/* 登录方式切换 start */
	// &__way {
	// 	margin: 0 auto;
	// 	margin-top: 110rpx;

	// 	&__item {
	// 		&--icon {
	// 			width: 77rpx;
	// 			height: 77rpx;
	// 			font-size: 50rpx;
	// 			border-radius: 100rpx;
	// 			margin-bottom: 18rpx;
	// 			position: relative;
	// 			z-index: 1;

	// 			&::after {
	// 				content: ' ';
	// 				position: absolute;
	// 				z-index: -1;
	// 				width: 100%;
	// 				height: 100%;
	// 				left: 0;
	// 				bottom: 0;
	// 				border-radius: inherit;
	// 				opacity: 1;
	// 				transform: scale(1, 1);
	// 				background-size: 100% 100%;
	// 				background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg5.png);
	// 			}
	// 		}
	// 	}
	// }
	/* 登录方式切换 end */
	/* 内容 end */
}

/deep/.input-placeholder {
	font-size: 24rpx;
	color: #e6e6e6;
}
</style>
