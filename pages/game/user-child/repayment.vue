<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ title }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view class="tn-text-lg">
			<view><text>您还欠银行家：<text class="tn-text-bold" v-html="debt_bank_loan + '&nbsp;'"></text>元</text></view>
			<view class="tn-margin-top-sm"><text>您的手头现金：<text class="tn-text-bold" v-html="cash_on_hand + '&nbsp;'"></text>元</text></view>
			<view class="tn-flex tn-flex-row-center tn-margin-top-sm">
				<tn-input v-model="money" type="number" placeholder="请输入还款数量" :focus="true" :border="true" />
			</view>
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { GetUserInfo, Repayment } from 'config/api.js'

export default {
	props: {
		personal: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			// 标题
			title: '正在向banker还款：',
			// 左图标
			leftIcon: 'trust',
			// 右图标
			rightIcon: 'trust',

			cash_on_hand: 0,
			debt_bank_loan: 0,

			money: '' // 通过下面的watch，则这个money肯定是小于等于欠款数额的
		}
	},

	computed: {
	},

	watch: {
		money(newVal, oldVal) {
			// console.log(newVal, this.cash_on_hand, this.debt_bank_loan)
			if (Number(newVal) > this.debt_bank_loan) {
				this.$nextTick(() => {
					this.money = String(this.debt_bank_loan)
				})
			}
		},
		// 侦听器的方式
		personal(newVal, oldVal) {
			// console.log('personal', newVal)
			this.calculate(newVal)
		}
	},

	created() {
		// 侦听器的方式
		this.calculate(this.personal)

		// 重新获取数据的方式
		// GetUserInfo({ game_user_id: getApp().globalData.gameUserId, game_id: getApp().globalData.gameId })
		// 	.then((res) => {
		// 		if (res[1].data.status === 200) {
		// 			// console.log(res[1].data.data)
		// 			this.cash_on_hand = res[1].data.data.basic_info.cash_on_hand
		// 			this.debt_bank_loan = res[1].data.data.basic_info.debt_bank_loan
		// 		} else {
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err)
		// 	})
	},

	onReady() {},
	methods: {
		calculate(newVal) {
			this.cash_on_hand = newVal.basic_info.cash_on_hand
			this.debt_bank_loan = newVal.basic_info.debt_bank_loan
		},
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			// 应为上面的type已经限定为number，所以不用考虑NaN的情况
			if (Number(this.money) <= 0 || !Number.isInteger(Number(this.money))) {
				return uni.showToast({
					title: '请输入正确的数值！',
					icon: 'error'
				})
			} else if (Number(this.money) > this.cash_on_hand) {
				return uni.showToast({
					title: '现金不足！',
					icon: 'error'
				})
			}
			Repayment({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(getApp().globalData.gameUserId),
				money_number: Number(this.money)
			})
				.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
					if (res[1].data.status === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							duration: 450
						})
						this.$emit('submit', 1) // 只有1代表接口的操作是成功的
					} else {
						// this.$emit('submit', 2)
					}
				})
				.catch((err) => {
					console.log(err)
					// this.$emit('submit', 3)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.main_title {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 35rpx;
	margin-bottom: 50rpx;
	font-size: 36rpx;

	&__content {
		padding: 0 18rpx;
		font-weight: bold;
	}

	&__icon {
		font-size: 34rpx;
	}
}
.button {
	margin-top: 35rpx;
}
</style>
