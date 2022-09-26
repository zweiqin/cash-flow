<template>
	<view>

		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view>
				<view class="main_title__content">{{ title }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view class="tn-flex tn-flex-row-around">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">确定</tn-button>
		</view>

	</view>
</template>

<script>
import { NextUser, Payroll, EnergizeRest, EnergizeNormal, HaveBaby, HeartBreak } from 'config/api.js'

export default {
	props: {
		sign: {
			type: String,
			require: true
		}
	},
	data() {
		return {
			// 标题
			title: '',
			// 左图标
			leftIcon: '',
			// 右图标
			rightIcon: ''

		}
	},
	created() {
		const temp_id = getApp().globalData.round[0]
		const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
		if (this.sign === 'next') {
			this.leftIcon = this.rightIcon = 'star'
			this.title = '是否结束当前回合？'
		} else if (this.sign === 'payOff') {
			this.leftIcon = this.rightIcon = 'alipay'
			if (temp_obj) {
				this.title = `确定给 ${temp_obj.userName} 发工资吗？`
			} else {
				this.title = '获取玩家信息失败，请重试！'
			}
		} else if (this.sign === 'freeEnergy') {
			this.leftIcon = this.rightIcon = 'battery-mid'
			if (temp_obj) {
				this.title = `确定给 ${temp_obj.userName} 发 休息精力 吗？`
			} else {
				this.title = '获取玩家信息失败，请重试！'
			}
		} else if (this.sign === 'anniversary') {
			this.leftIcon = this.rightIcon = 'caring'
			if (temp_obj) {
				this.title = `确定给 ${temp_obj.userName} 进行 纪念日/结算日 的精力补充吗？`
			} else {
				this.title = '获取玩家信息失败，请重试！'
			}
		} else if (this.sign === 'givesBirth') {
			this.leftIcon = this.rightIcon = 'baby-fill'
			if (temp_obj) {
				this.title = `确定让 ${temp_obj.userName} 生孩子吗？`
			} else {
				this.title = '获取玩家信息失败，请重试！'
			}
		} else if (this.sign === 'heartbreak') {
			this.leftIcon = this.rightIcon = 'like-break'
			if (temp_obj) {
				this.title = `确定让 ${temp_obj.userName} 心碎吗？`
			} else {
				this.title = '获取玩家信息失败，请重试！'
			}
		}
	},

	onReady() {
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			const round = getApp().globalData.round
			if (this.sign === 'next') {
				NextUser({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(round[0])
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
			} else if (this.sign === 'payOff') {
				if (round[0] === '0') {
					return uni.showToast({
						title: '获取玩家信息失败！',
						icon: 'error'
					})
				}
				Payroll({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(round[0])
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
			} else if (this.sign === 'freeEnergy') {
				if (round[0] === '0') {
					return uni.showToast({
						title: '获取玩家信息失败！',
						icon: 'error'
					})
				}
				EnergizeRest({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(round[0])
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
			} else if (this.sign === 'anniversary') {
				if (round[0] === '0') {
					return uni.showToast({
						title: '获取玩家信息失败！',
						icon: 'error'
					})
				}
				EnergizeNormal({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(round[0])
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
			} else if (this.sign === 'anniversary') {
				if (round[0] === '0') {
					return uni.showToast({
						title: '获取玩家信息失败！',
						icon: 'error'
					})
				}
				HaveBaby({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(round[0])
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
			} else if (this.sign === 'anniversary') {
				if (round[0] === '0') {
					return uni.showToast({
						title: '获取玩家信息失败！',
						icon: 'error'
					})
				}
				HeartBreak({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(round[0])
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
</style>
