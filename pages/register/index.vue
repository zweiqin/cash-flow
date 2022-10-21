<template>
	<view class="template-login2">

		<view class="login">

			<view class="login__wrapper">
				<!-- 登录/注册切换 -->
				<view class="login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
					<view class="login__mode__item tn-flex-1" :class="[{'login__mode__item--active': currentModeIndex === 0}]" @tap.stop="modeSwitch(0)">
						登录
					</view>
					<view class="login__mode__item tn-flex-1" :class="[{'login__mode__item--active': currentModeIndex === 1}]" @tap.stop="modeSwitch(1)">
						注册
					</view>

					<!-- 滑块-->
					<view class="login__mode__slider tn-cool-bg-color-15--reverse" :style="[modeSliderStyle]"></view>
				</view>

				<!-- 输入框内容-->
				<view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
					<!-- 登录 -->
					<block v-if="currentModeIndex === 0">
						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-phone"></view>
							</view>
							<view class="login__info__item__input__content">
								<input v-model="login_phone" type="number" maxlength="11" placeholder-class="input-placeholder" placeholder="请输入登录手机号码" />
							</view>
						</view>

						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-code"></view>
							</view>
							<view class="login__info__item__input__content login__info__item__input__content--verify-code">
								<input v-model="register_code" type="number" placeholder-class="input-placeholder" placeholder="请输入验证码" />
							</view>
							<view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" size="sm" padding="5rpx 10rpx" width="100%" shape="round">{{ tips }}</tn-button>
							</view>
						</view>

					</block>
					<!-- 注册 -->
					<block v-if="currentModeIndex === 1">
						<view class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-phone"></view>
							</view>
							<view class="login__info__item__input__content">
								<input v-model="register_phone" type="number" maxlength="11" placeholder-class="input-placeholder" placeholder="请输入注册手机号码" />
							</view>
						</view>

					</block>

					<view class="login__info__item__button tn-cool-bg-color-7--reverse" hover-class="tn-hover" :hover-stay-time="150" @click="register()">{{ currentModeIndex === 0 ? '登录' : '注册' }}</view>

				</view>

			</view>

		</view>

		<!-- 验证码倒计时 -->
		<tn-verification-code
			ref="code"
			unique-key="login-demo-2"
			:seconds="60"
			@change="codeChange"
		>
		</tn-verification-code>
	</view>
</template>

<script>
// 接口
import { CreateBanker, SendSms, LoginSms } from 'config/api.js'

export default {
	name: 'Register',
	data() {
		return {
			// 当前选中的模式
			currentModeIndex: 0,
			// 模式选中滑块
			modeSliderStyle: {
				left: 0
			},
			// 倒计时提示文字
			tips: '获取验证码',
			login_phone: '',
			register_code: '',
			register_phone: ''
		}
	},
	onLoad(options) {
		uni.removeStorage({
			key: 'token',
			success(res) {
				console.log('移除token成功')
			}
		})
	},
	onUnload() {
	},

	watch: {
		currentModeIndex(value) {
			const sliderWidth = uni.upx2px(476 / 2)
			this.modeSliderStyle.left = `${sliderWidth * value}px`
		}
	},
	methods: {
		register() {
			if (this.currentModeIndex === 0) {
				// 登录
				if (this.login_phone.length !== 11) return this.$t.message.toast('请输入正确的手机号码')
				if (this.register_code.length !== 6) return this.$t.message.toast('请输入正确的验证码')
				getApp().globalData.phone = this.login_phone
				LoginSms({
					phone: this.login_phone,
					code: this.register_code
				})
					.then((res) => {
						if (res[1].data.status === 200) {
							this.$t.message.toast('登录成功')
							uni.setStorageSync('token', res[1].data.data)
							setTimeout(() => {
								uni.redirectTo({ url: '/pages/login-admin/index' })
							}, 2000)
						} else {
							// this.$t.message.toast('登录失败')
						}
					})
					.catch((err) => {
						console.log(err)
					})
			} else if (this.currentModeIndex === 1) {
				// 注册
				if (this.register_phone.length !== 11) return this.$t.message.toast('请输入正确的手机号码')
				CreateBanker({
					phone: this.register_phone
				})
					.then((res) => {
						if (res[1].data.status === 200) {
							this.$t.message.toast('注册成功')
							this.currentModeIndex = 0
						} else {
							// this.$t.message.toast('注册失败')
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},

		// 切换模式
		modeSwitch(index) {
			this.currentModeIndex = index
		},
		// 获取验证码
		getCode() {
			if (this.$refs.code.canGetCode) {
				this.$t.message.loading('正在获取验证码')
				SendSms({
					phone: this.login_phone
				})
					.then((res) => {
						if (res[1].data.status === 200) {
							this.$t.message.closeLoading()
							this.$t.message.toast('验证码已经发送')
							// 通知组件开始计时
							this.$refs.code.start()
						} else {
						}
					})
					.catch((err) => {
						console.log(err)
					})
			} else {
				this.$t.message.toast(this.$refs.code.secNum + '秒后再重试')
			}
		},
		// 获取验证码倒计时被修改
		codeChange(event) {
			this.tips = event
		}
	}
}
</script>

<style lang="scss" scoped>
  /* 背景 start*/
  .template-login2 {
    background: linear-gradient(90deg, #892FE8, #3D7EFF);
    min-height: 100vh
  }

  .login {
    position: relative;
    height: 100%;
    z-index: 1;

    /* 内容 start */
    &__wrapper {
      padding-top: 100rpx;
      width: 100%;
    }

    /* 切换 start */
    &__mode {
      position: relative;
      margin: 0 auto;
      width: 476rpx;
      height: 77rpx;
      background-color: rgba(255,255,255,0.2);
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
        color: #FFFFFF;
        letter-spacing: 1em;
        text-indent: 1em;
        z-index: 2;
        transition: all 0.4s;

        &--active {
          font-weight: bold;
          color: #FFFFFF;
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
      margin: 0 50rpx;
      margin-top: 105rpx;
      padding: 30rpx 51rpx;
      padding-bottom: 0;
      border-radius: 20rpx;
      background-color: rgba(255,255,255,0.2);
      backdrop-filter: blur(6rpx);
      -webkit-backdrop-filter: blur(6rpx);
      border: 2rpx solid rgba(255, 255, 255, 0.1);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);

      &__item {

        &__input {
          margin-top: 59rpx;
          width: 100%;
          height: 77rpx;
          border: 1rpx solid #FFFFFF;
          border-radius: 39rpx;

          &__left-icon {
            width: 10%;
            font-size: 44rpx;
            margin-left: 20rpx;
            color: #FFFFFF;
          }

          &__content {
            width: 80%;
            padding-left: 10rpx;

            &--verify-code {
              width: 56%;
            }

            input {
              font-size: 24rpx;
              color: #FFFFFF;
              // letter-spacing: 0.1em;
            }
          }

          &__right-icon {
            width: 10%;
            font-size: 44rpx;
            margin-right: 20rpx;
            color: #FFFFFF;
          }

          &__right-verify-code {
            width: 34%;
            margin-right: 20rpx;
          }
        }

        &__button {
          margin-top: 75rpx;
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
          color: #FFFFFF;
          background-color: rgba(255,255,255,0.2);
          // border: 2rpx solid #FFFFFF;
        }

      }
    }
    /* 登录注册信息 end */
    /* 内容 end */

  }

  /deep/.input-placeholder {
    font-size: 24rpx;
    color: #E6E6E6;
  }

</style>
