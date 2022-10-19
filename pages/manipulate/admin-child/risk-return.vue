<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view>
			<view v-for="(item, index) in diceList" :key="index" class="tn-text-xl">
				<view>请选择第 {{ index + 1 }} 颗骰子的点数：</view>
				<view class="tn-flex tn-flex-wrap" @click="clickView(item, $event)">
					<view v-for="(part, i) in 6" :key="i">
						<tn-button
							:data-value="i + 1" shape="icon" :plain="item[0] === i + 1 ? false : true"
							:border-bold="true" :background-color="item[0] === i + 1 ? item[1] : '#01BEFF'"
							margin="10rpx 10rpx"
						>{{ i + 1 }}</tn-button>
					</view>
					<!-- <tn-button shape="icon" :plain="true" :border-bold="true" background-color="tn-cool-bg-color-7" margin="10rpx 10rpx">6</tn-button>
					<tn-button shape="icon" :plain="true" :border-bold="true" background-color="#01BEFF" margin="10rpx 10rpx">6</tn-button>
					<tn-button shape="icon" :plain="true" :border-bold="true" background-color="#01BEFF" margin="10rpx 10rpx">6</tn-button>
					<tn-button shape="icon" :plain="true" :border-bold="true" background-color="#01BEFF" margin="10rpx 10rpx">6</tn-button>
					<tn-button shape="icon" :plain="true" :border-bold="true" background-color="#01BEFF" margin="10rpx 10rpx">6</tn-button>
					<tn-button shape="icon" :plain="true" :border-bold="true" background-color="#01BEFF" margin="10rpx 10rpx">6</tn-button> -->
				</view>
			</view>
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="5vh" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="5vh" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { ConfirmVentureCapital } from 'config/api.js'

export default {
	data() {
		return {
			// 左图标
			leftIcon: 'statistics-fill',
			// 右图标
			rightIcon: 'statistics-fill',

			diceList: [[0, 'tn-cool-bg-color-5'], [0, 'tn-cool-bg-color-6'], [0, 'tn-cool-bg-color-7']]
		}
	},

	computed: {
		userName() {
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				return `正在给 ${temp_obj.userName} 做风投的回报：`
			}
			return '获取玩家信息失败，请重试！'
		}
	},

	onReady() {},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		clickView(item, e) {
			// console.log(item, e)
			if (e.target.dataset.value) {
				item[0] = e.target.dataset.value
				this.$forceUpdate()
				// console.log(this.diceList)
			}
		},
		confirm() {
			console.log(this.diceList.reduce((prev, cur, index, arr) => prev + cur[0], 0))
			if (this.diceList.some((item) => item[0] === 0)) {
				return uni.showToast({
					title: '请选择骰子点数！',
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
			ConfirmVentureCapital({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(round[0]),
				sell_number: this.diceList.reduce((prev, cur, index, arr) => prev + cur[0], 0)
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
