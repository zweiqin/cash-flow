<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view style="max-height: 65vh;overflow-y: auto;">
			<view class="tn-margin-top tn-margin-bottom">
				<tn-list-view :card="true" title="梦想列表" background-color="#EFEFEF">
					<tn-radio-group v-model="value">
						<tn-list-cell v-for="(item, index) in dreamList" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
							<view>
								<tn-radio :name="String(item.id)">
									{{ `${item.dream_name}( ${item.dream_cost / 10000} 万，${item.dream_energy} 精力)` }}
								</tn-radio>
							</view>
						</tn-list-cell>
					</tn-radio-group>
				</tn-list-view>
			</view>

			<view class="tn-flex tn-flex-row-around button">
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel()">取消</tn-button>
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm()">确定</tn-button>
			</view>
		</view>
	</view>
</template>

<script>
import { BuyDream } from 'config/api.js'

export default {
	data() {
		return {
			// 左图标
			leftIcon: 'empty-page',
			// 右图标
			rightIcon: 'empty-page',

			dreamList: getApp().globalData.dreamList,
			value: ''
		}
	},

	computed: {
		userName() {
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				return `正在给 ${temp_obj.userName} 买下梦想？`
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
			if (!this.value) {
				return uni.showToast({
					title: '请选择梦想！',
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
			BuyDream({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(round[0]),
				dream_id: Number(this.value)
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
