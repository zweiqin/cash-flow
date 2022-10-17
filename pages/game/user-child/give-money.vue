<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ content }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view style="max-height: 65vh;overflow-y: auto;">
			<view>
				<view class="tn-margin-top-sm tn-margin-bottom tn-text-lg">
					<text>您的手头现金：<text class="tn-text-bold" v-html="cash_on_hand + '&nbsp;'"></text>元</text>
				</view>
				<view class="tn-margin-top tn-margin-bottom">
					<tn-list-view
						:card="true"
						title="其 他/她 玩家列表"
						background-color="#EFEFEF"
					>
						<tn-radio-group v-model="value" @change="radioGroupChange">

							<block v-if="appListId.length!==0">
								<tn-list-cell v-for="(item,index) in appListId" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
									<view>
										<tn-radio :name="item.id">
											<text>用户{{ index+1 }}：</text>
											{{ `${item.userName}(${item.roleName})` }}
										</tn-radio>
									</view>
								</tn-list-cell>
							</block>

							<block v-else>
								<tn-list-cell :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
									<view>
										<text>无</text>
									</view>
								</tn-list-cell>
							</block>

						</tn-radio-group>
					</tn-list-view>
				</view>
			</view>

			<view>
				<tn-input v-model="money" type="number" placeholder="请输入金钱数量" :focus="true" :border="true" />
			</view>

			<view class="tn-flex tn-flex-row-around button">
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">确定</tn-button>
			</view>
		</view>
	</view>
</template>

<script>
import { GivingMoney } from 'config/api.js'

export default {
	props: {
		personal: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			// 左图标
			leftIcon: 'lucky-money-fill',
			// 右图标
			rightIcon: 'lucky-money-fill',

			content: '正在给某玩家送钱：',

			cash_on_hand: 0,

			appListId: getApp().globalData.appListId.filter((item) => item.id !== getApp().globalData.gameUserId),
			value: '',

			money: ''
		}
	},

	computed: {
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
		// 			this.cash_on_hand = res[1].data.data.basic_info.cash_on_hand
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
		},
		radioGroupChange(name) {
			// console.log(name)
		},
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			if (!this.value) {
				return uni.showToast({
					title: '请选择玩家！',
					icon: 'error'
				})
			}
			if (Number(this.money) <= 0 || !Number.isInteger(Number(this.money))) {
				return uni.showToast({
					title: '请输入正确的金钱数值！',
					icon: 'error'
				})
			}
			if (Number(this.money) > this.cash_on_hand) {
				return uni.showToast({
					title: '现金不足！',
					icon: 'error'
				})
			}
			if (this.personal.basic_info.is_rich_circle) {
				return uni.showToast({
					title: '您已进入顺流层，无法送钱！',
					icon: 'error'
				})
			}
			GivingMoney({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(getApp().globalData.gameUserId),
				receiver_id: Number(this.value),
				money_number: Number(this.money)
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
		color: brown;
	}

	&__icon {
		font-size: 34rpx;
	}
}
.button {
	margin-top: 35rpx;
}
</style>
