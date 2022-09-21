<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<!-- 副业 -->
		<view v-if="currentCard.id===4" class="card-container">
			<SideHustle></SideHustle>
		</view>
		<!-- 金融 -->
		<view v-else-if="currentCard.id===5" class="card-container">
			<Finance></Finance>
		</view>
		<!-- 房地产 -->
		<view v-else-if="currentCard.id===6" class="card-container">
			<RealEstate></RealEstate>
		</view>
		<!-- 企业 -->
		<view v-else-if="currentCard.id===8" class="card-container">
			<Enterprise></Enterprise>
		</view>
		<!-- 行情 -->
		<view v-else-if="currentCard.id===11" class="card-container">
			<Quotation></Quotation>
		</view>
		<!-- 觉察 -->
		<view v-else-if="currentCard.id===12" class="card-container">
			<Perceive></Perceive>
		</view>
		<!-- 相亲 -->
		<view v-else-if="currentCard.id===9" class="card-container">
			<BlindDate></BlindDate>
		</view>
		<!-- 逆流 -->
		<view v-else-if="currentCard.id===7" class="card-container">
			<Backset></Backset>
		</view>
		<!-- 项目 -->
		<view v-else-if="currentCard.id===10" class="card-container">
			<Project></Project>
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
import SideHustle from '@/components/cards/side-hustle.vue'
import Finance from '@/components/cards/finance.vue'
import RealEstate from '@/components/cards/real-estate.vue'
import Enterprise from '@/components/cards/enterprise.vue'
import Quotation from '@/components/cards/quotation.vue'
import Perceive from '@/components/cards/perceive.vue'
import BlindDate from '@/components/cards/blind-date.vue'
import Backset from '@/components/cards/backset.vue'
import Project from '@/components/cards/project.vue'

// 接口
import { ConfirmCard } from 'config/api.js'

export default {
	components: { SideHustle, Finance, RealEstate, Enterprise, Quotation, Perceive, BlindDate, Backset, Project },
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
