<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view class="card-container">
			<RealEstate></RealEstate>
		</view>

		<view v-if="is_drew" class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">使用</tn-button>
		</view>
		<view v-else class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
		</view>
	</view>
</template>

<script>
import RealEstate from '@/components/cards/real-estate.vue'
import { ConfirmCard } from 'config/api.js'

export default {
	components: { RealEstate },
	data() {
		return {
			// 左图标
			leftIcon: 'bankcard-fill',
			// 右图标
			rightIcon: 'bankcard-fill',
			// 这个人是否抽到卡的那个人
			is_drew: false,
			// card: ''
			cardMsg: getApp().globalData.cardMsg

		}
	},

	computed: {
		userName() {
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === this.cardMsg[0])
			if (temp_obj) {
				return `玩家 ${temp_obj.userName} 抽到了一张卡`
			}
			return '获取玩家信息失败，请重试！'
		}
	},

	created() {
		getApp().globalData.currentCard = getApp().globalData.cardList.find((item) => item.id === this.cardMsg[1])
		this.is_drew = this.cardMsg[0] === getApp().globalData.gameUserId
		// this.card = getApp().globalData.cardList.find((item) => item.id === cardMsg[1])
	},
	onReady() {},

	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			// // 多一份保险，判断抽到的这张卡有没有放到storage里面
			// if (!this.card) {
			// 	return uni.showToast({
			// 		title: '获取卡牌信息失败！',
			// 		icon: 'error'
			// 	})
			// }
			ConfirmCard({
				game_id: getApp().globalData.gameId,
				game_user_id: this.cardMsg[0],
				card_id: String(this.cardMsg[1])
			})
				.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
					if (res[1].data.status === 200) {
						uni.showToast({
							title: '操作成功！',
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
.card-container{
	width: 45vmin;
	// height: 65vmin;
	margin: 0 auto;
}
.button {
	margin-top: 35rpx;
}
</style>
