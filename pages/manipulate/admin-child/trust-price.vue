<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view class="tn-text-lg">
			<view><text>该玩家的手头现金是：<text class="tn-text-bold" v-html="cash_on_hand + '&nbsp;'"></text>元</text></view>
			<view><text>该玩家的银行贷款是：<text class="tn-text-bold" v-html="debt_bank_loan + '&nbsp;'"></text>元</text></view>
			<view class="tn-margin-top-sm"><text>最多可投资：<text class="tn-text-bold" v-html="available_amount + '&nbsp;'"></text>万元</text><text v-if="available_amount<500">（不满足投资条件）</text></view>
			<view class="tn-flex tn-flex-row-center tn-margin-top-sm">
				<tn-number-box
					v-model="value"
					:step="100"
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
			<view class="tn-margin-top-sm"><text>已选择投资：<text class="tn-text-bold" v-html="value + '&nbsp;'"></text>万元</text></view>
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { GetUserInfo, BankerLoan, BuyTrustPrice } from 'config/api.js'

export default {
	props: {
		personal: {
			type: [String, Object],
			required: true
		}
	},
	data() {
		return {
			// 左图标
			leftIcon: 'medical',
			// 右图标
			rightIcon: 'medical',

			cash_on_hand: 0,
			debt_bank_loan: 0,

			available_amount: 0,
			min: 0,
			value: 0,
			max: 0
		}
	},

	computed: {
		userName() {
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				return `正在给 ${temp_obj.userName} 做信托投资：`
			}
			return '获取玩家信息失败，请重试！'
		}
	},

	watch: {
		// 侦听器的方式
		personal(newVal, oldVal) {
			// console.log('personal', newVal)
			this.calculate(newVal || { basic_info: {}, income: [], assets: [], debts: [] })
		}
	},

	created() {
		// 侦听器的方式
		this.calculate(this.personal || { basic_info: {}, income: [], assets: [], debts: [] })
	},

	onReady() {},
	methods: {
		calculate(newVal) {
			this.cash_on_hand = newVal.basic_info.cash_on_hand || 0
			this.debt_bank_loan = newVal.basic_info.debt_bank_loan || 0
			const temp_available_amount = this.cash_on_hand - this.debt_bank_loan
			this.available_amount = temp_available_amount > 0 ? Math.floor(temp_available_amount / 10000) : 0
			if (this.available_amount < 500) {
				this.max = this.min = this.value = 0
			} else {
				this.min = this.value = 500
				this.max = this.available_amount
			}
		},
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// 因为有步进选择器，都是整数，所以不用考虑小数点的情况。但要考虑投资的钱不满足起投金额的情况
			if (this.value < 500) {
				return uni.showToast({
					title: '不满足500万起投金额！',
					icon: 'error'
				})
			}
			const round = getApp().globalData.round
			if (round[0] === '0') {
				return uni.showToast({
					title: '获取玩家信息失败！',
					icon: 'error'
				})
			}
			if (getApp().globalData.appListId.find((item) => item.id === round[0]).isDead !== '0') {
				uni.showToast({
					title: '当前玩家已猝死！',
					icon: 'error'
				})
				return this.cancel()
			}
			BuyTrustPrice({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(round[0]),
				buy_number: this.value * 10000
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
