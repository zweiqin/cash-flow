<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ content }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view style="max-height: 65vh;overflow-y: auto;">
			<view class="tn-padding-top tn-padding-bottom">
				<tn-list-view
					:card="true"
					title="副业列表"
					background-color="#EFEFEF"
				>
					<tn-radio-group v-model="value">

						<block v-if="sideline_list.length!==0">
							<tn-list-cell v-for="(item,index) in sideline_list" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
								<view>
									<tn-radio :name="String(item.id)">
										<text>副业{{ index+1 }}：</text>
										{{ `${item.card_name}(收入：${item.value} 元/月)(可获得精力：${Math.abs(item.energy)})` }}
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

			<!-- <view>
			<tn-input v-model="money" type="number" placeholder="请输入金钱数量" :focus="true" :border="true" />
		</view> -->

			<view class="tn-flex tn-flex-row-around tn-padding-top">
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">确定</tn-button>
			</view>
		</view>
	</view>
</template>

<script>
import { QuitPartTime } from 'config/api.js'

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
			leftIcon: 'empty-favor',
			// 右图标
			rightIcon: 'empty-favor',

			content: '正在放弃某副业：',

			value: ''

			// money: ''
		}
	},

	computed: {
		sideline_list() {
			return this.personal.income.filter((item) => item.class === 5)
		}
	},

	watch: {
	},

	created() {
	},

	onReady() {},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			if (!this.value) {
				return uni.showToast({
					title: '请选择副业！',
					icon: 'error'
				})
			}
			// if (Number(this.money) <= 0 || !Number.isInteger(Number(this.money))) {
			// 	return uni.showToast({
			// 		title: '请输入正确的金钱数值！',
			// 		icon: 'error'
			// 	})
			// }
			// if (Number(this.money) > this.cash_on_hand) {
			// 	return uni.showToast({
			// 		title: '现金不足！',
			// 		icon: 'error'
			// 	})
			// }
			QuitPartTime({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(getApp().globalData.gameUserId),
				part_time_id: Number(this.value)
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
</style>
