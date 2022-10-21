<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view>
			<view class="tn-text-xl">请选择玩家要投资的金额：</view>
			<tn-radio-group v-model="money" :size="36" width="auto" :wrap="true">
				<tn-radio v-for="(item,index) in moneyList" :key="index" :name="String(item)" :label-size="38">
					<text>{{ item }}元（{{ item / 10000 }} 万）</text>
				</tn-radio>
			</tn-radio-group>
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { BuyVentureCapital } from 'config/api.js'

export default {
	data() {
		return {
			// 左图标
			leftIcon: 'statistics',
			// 右图标
			rightIcon: 'statistics',

			money: '',
			moneyList: [1000000, 5000000, 10000000]
		}
	},

	computed: {
		userName() {
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				return `正在给 ${temp_obj.userName} 做风险投资：`
			}
			return '获取玩家信息失败，请重试！'
		}
	},

	onReady() {},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			if (!this.money) {
				return uni.showToast({
					title: '请选择投资金额！',
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
			BuyVentureCapital({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(round[0]),
				buy_number: Number(this.money)
			})
				.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
					if (res[1].data.status === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							duration: 800
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
