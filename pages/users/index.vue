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
			<view class="user-info__avatar tn-flex tn-flex-col-center tn-flex-row-center"> <view class="user-info__nick-name">现金流</view> </view>
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
							<view class="login__info__item__input__content"> <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入房间号码" /> </view>
						</view>

						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon"> <view class="tn-icon-my"></view> </view>
							<view class="login__info__item__input__content"> <input placeholder-class="input-placeholder" placeholder="请输入用户名" /> </view>
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
				:plain="true" :block-repeat-click="true" shape="round" background-color="#FFFFFF"
				font-color="#FFFFFF" width="50%" height="100rpx" margin="0 25%"
			>进入游戏</tn-button>
		</view>

		<!-- <view class="tnwave waveAnimation">
			<view class="waveWrapperInner bgTop"> <view class="wave waveTop" style="background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-2.png')"></view> </view>
			<view class="waveWrapperInner bgMiddle"> <view class="wave waveMiddle" style="background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-2.png')"></view> </view>
			<view class="waveWrapperInner bgBottom"> <view class="wave waveBottom" style="background-image: url('https://tnuiimage.tnkjapp.com/wave/wave-1.png')"></view> </view>
		</view> -->

		<!-- 回到首页悬浮按钮-->
		<!-- <nav-index-button></nav-index-button> -->
	</view>
</template>

<script>
// import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
// import NavIndexButton from '@/libs/components/nav-index-button.vue'
export default {
	name: 'TemplateWave',
	// mixins: [template_page_mixin],
	// components: { NavIndexButton },
	data() {
		return {
			// 是否显示密码
			// showPassword: false
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
// @import '@/static/css/templatePage/custom_nav_bar.scss';

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
		margin: 0 50rpx;
		margin-top: 55rpx;
		padding: 30rpx 51rpx;
		padding-bottom: 0;
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
