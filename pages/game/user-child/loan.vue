<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ title }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view class="tn-text-lg">
			<view><text>您的可用额度是：<text class="tn-text-bold" v-html="available_credit + '&nbsp;'"></text>元</text></view>
			<view class="tn-margin-top-sm"><text>最多可贷款：<text class="tn-text-bold" v-html="available_amount + '&nbsp;'"></text>元</text></view>
			<view class="tn-flex tn-flex-row-center tn-margin-top-sm">
				<tn-number-box
					v-model="value"
					:step="1"
					:min="min"
					:max="max"
					:input-width="140"
					:input-height="60"
					:font-size="40"
					:disabled-input="true"
					:disabled="false"
					:long-press="false"
					background-color="#dddddd"
					font-color="#00aaaa"
				></tn-number-box>
			</view>
			<view class="tn-margin-top-sm"><text>已选择贷款：<text class="tn-text-bold" v-html="selected_loan + '&nbsp;'"></text>元</text></view>
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { BankerLoan } from 'config/api.js'

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
			title: '正在向banker贷款：',
			// 左图标
			leftIcon: 'count-fill',
			// 右图标
			rightIcon: 'count-fill',

			cash_flow: 0,
			available_credit: 0,
			available_amount: 0,
			min: 1,
			value: 1,
			max: 0
		}
	},

	computed: {
		// 计算属性的方式
		// cash_flow() {
		// 	if (this.personal.basic_info.cash_flow > 0) {
		// 		return this.personal.basic_info.cash_flow
		// 	}
		// 	return 0
		// },
		// available_credit() {
		// 	const temp_available_credit = this.cash_flow * 10 - this.personal.basic_info.debt_bank_loan
		// 	if (temp_available_credit > 0) {
		// 		return temp_available_credit
		// 	}
		// 	return 0
		// },
		// available_amount() {
		// 	return this.max * this.cash_flow
		// },
		// min() {
		// 	if (this.available_credit === 0) {
		// 		this.value = 0
		// 		return 0
		// 	}
		// 	return 1
		// },
		// max() {
		// 	return Math.floor((this.available_credit / this.cash_flow) || 0)
		// },
		selected_loan() {
			return this.value * this.cash_flow
		}
	},

	watch: {
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
		// 			// if (res[1].data.data.basic_info.cash_flow > 0) this.cash_flow = res[1].data.data.basic_info.cash_flow
		// 			// const temp_available_credit = this.cash_flow * 10 - res[1].data.data.basic_info.debt_bank_loan
		// 			// if (temp_available_credit > 0) this.available_credit = temp_available_credit
		// 			// if (this.available_credit === 0) this.min = this.value = 0
		// 			// this.max = Math.floor((this.available_credit / this.cash_flow) || 0)
		// 			// this.available_amount = this.max * this.cash_flow
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
			this.cash_flow = newVal.basic_info.cash_flow > 0 ? newVal.basic_info.cash_flow : 0

			let temp_available_credit
			if (this.personal.assets.findIndex((item) => item.card_name.startsWith('个人觉察') && item.card_name.includes('人脉')) === -1) {
				temp_available_credit = this.cash_flow * 10 - newVal.basic_info.debt_bank_loan
			} else {
				temp_available_credit = this.cash_flow * 40 - newVal.basic_info.debt_bank_loan
			}

			this.available_credit = temp_available_credit > 0 ? temp_available_credit : 0
			if (this.available_credit === 0) this.min = this.value = 0
			this.max = Math.floor((this.available_credit / this.cash_flow) || 0)
			this.available_amount = this.max * this.cash_flow
		},
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.selected_loan)
			// 因为有步进选择器，都是整数，所以不用考虑小数点的情况。但要考虑借的钱为0的情况
			if (this.selected_loan === 0) {
				return uni.showToast({
					title: '请正确地贷款！',
					icon: 'error'
				})
			}
			BankerLoan({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(getApp().globalData.gameUserId),
				money_number: this.selected_loan
			})
				.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
					if (res[1].data.status === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'success'
							// duration: 450
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
