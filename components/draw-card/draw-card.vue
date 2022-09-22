<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<!-- 卡片cards组件 -->
		<view class="card-container"> <Cards :card="currentCard"></Cards> </view>

		<view v-if="is_drew" class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">使用</tn-button>
		</view>
		<view v-else class="tn-flex tn-flex-row-around button"> <tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button> </view>
	</view>
</template>

<script>
// 一开始采用的是九张卡九个组件的方式，后面因为卡片的信息都统一在name和desc属性上，所以组件的重复度变高，就可以封装成单独的组件。另外，之所以封装成统一的cards组件，是因为考虑到卡片（cards组件）可能在不同的组件里用到，譬如用户可能要查询单独的卡片的信息，这里就要在其它组件里用到cards组件了
// <!-- 副业 -->
// <!-- 金融 -->
// <!-- 房地产 -->
// <!-- 企业 -->
// <!-- 行情 -->
// <!-- 觉察 -->
// <!-- 相亲 -->
// <!-- 逆流 -->
// <!-- 项目 -->
// import SideHustle from '@/components/cards/side-hustle.vue'
// import Finance from '@/components/cards/finance.vue'
// import RealEstate from '@/components/cards/real-estate.vue'
// import Enterprise from '@/components/cards/enterprise.vue'
// import Quotation from '@/components/cards/quotation.vue'
// import Perceive from '@/components/cards/perceive.vue'
// import BlindDate from '@/components/cards/blind-date.vue'
// import Backset from '@/components/cards/backset.vue'
// import Project from '@/components/cards/project.vue'
import Cards from '@/components/cards/cards.vue'

// 接口
import { ConfirmCard } from 'config/api.js'

export default {
	// components: { SideHustle, Finance, RealEstate, Enterprise, Quotation, Perceive, BlindDate, Backset, Project },
	components: { Cards },
	data() {
		return {
			// 左图标
			leftIcon: 'bankcard-fill',
			// 右图标
			rightIcon: 'bankcard-fill',
			// 这个人是否抽到卡的那个人
			is_drew: false,
			cardMsg: getApp().globalData.cardMsg,
			currentCard: getApp().globalData.currentCard
		}
	},

	computed: {
		userName() {
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === this.cardMsg[0])
			if (temp_obj) {
				if (this.cardMsg[0] === getApp().globalData.gameUserId) {
					return '您抽到了这张卡：'
				}
				return `玩家 ${temp_obj.userName} 抽到了一张卡`
			}
			return '获取玩家信息失败，请重试！'
		}
	},

	created() {
		this.is_drew = this.cardMsg[0] === getApp().globalData.gameUserId
		// console.log(this.currentCard)
	},
	onReady() {},

	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			// // 多一份保险，判断抽到的这张卡有没有放到storage里面
			// if (!this.currentCard) {
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
.card-container {
	width: 55vmin;
	// height: 65vmin;
	margin: 0 auto;
}
.button {
	margin-top: 35rpx;
}
</style>
