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
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { GetUserInfo, xxx } from 'config/api.js'

export default {
	data() {
		return {
			// 标题
			title: '正在向banker贷款：',
			// 左图标
			leftIcon: 'count-fill',
			// 右图标
			rightIcon: 'count-fill',

			in_salary: 0,
			available_credit: 0,
			available_amount: 0,
			min: 1,
			value: 1,
			max: 0
		}
	},

	computed: {
		selected_loan() {
			return this.value * this.in_salary
		}
	},

	created() {
		GetUserInfo({ game_user_id: getApp().globalData.gameUserId, game_id: getApp().globalData.gameId })
			.then((res) => {
				if (res[1].data.status === 200) {
					// console.log(res[1].data.data)
					this.in_salary = res[1].data.data.basic_info.in_salary
					this.available_credit = this.in_salary * 10 - res[1].data.data.basic_info.debt_bank_loan
					this.max = Math.floor(this.available_credit / this.in_salary)
					this.available_amount = this.max * this.in_salary
				} else {
				}
			})
			.catch((err) => {
				console.log(err)
			})
	},

	onReady() {},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			const round = getApp().globalData.round
			xxx({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(round[0]),
				money_number: Number(this.money)
			})
				.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
					if (res[1].data.status === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'success'
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
