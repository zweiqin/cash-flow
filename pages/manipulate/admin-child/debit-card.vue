<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="5vh" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="5vh" @click="submit()">提交</tn-button>
		</view>

	</view>
</template>

<script>
import { DrawCard } from 'config/api.js'

export default {
	props: {
		cardDebit: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			// 左图标
			leftIcon: 'add',
			// 右图标
			rightIcon: 'add',
			radioList: getApp().globalData.cardCategoryList,
			draw: ''

		}
	},

	computed: {
		userName() {
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				return `正在给 ${temp_obj.userName} 抽卡：`
			}
			return '获取玩家信息失败，请重试！'
		}
	},
	created() {
		this.draw = this.radioList.find((item) => item.category_name === this.cardDebit.substring(1)).id
	},
	mounted() {
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		// 表单提交
		submit() {
			// console.log(this.model.payType)
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
			DrawCard({
				game_id: getApp().globalData.gameId,
				game_user_id: round[0],
				category_id: Number(this.draw),
				is_free: Number(this.cardDebit.substring(0, 1)) // 1免费，0收费
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
