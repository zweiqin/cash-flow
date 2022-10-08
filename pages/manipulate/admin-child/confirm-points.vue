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
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm(0)">否</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm(1)">是</tn-button>
		</view>

	</view>
</template>

<script>
import { ConfirmJob, ConfirmLitigate } from 'config/api.js'
const com = { ConfirmJob, ConfirmLitigate }

export default {
	props: {
		classification: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			// 标题
			title: '',
			// 左图标
			leftIcon: '',
			// 右图标
			rightIcon: '',

			api: ''

		}
	},
	created() {
		// console.log(com)
		const temp_id = getApp().globalData.round[0]
		const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
		let flag = true
		if (!temp_obj) {
			this.title = '获取玩家信息失败，请重试！'
			flag = false
		}
		if (this.classification === 'lookForJob') {
			this.leftIcon = this.rightIcon = 'con-leo'
			this.api = 'ConfirmJob'
			if (flag)	this.title = `（找工作）用户 ${temp_obj.userName} 掷骰子的点数是否大于3？`
		} else if (this.classification === 'litigate') {
			this.leftIcon = this.rightIcon = 'server'
			this.api = 'ConfirmLitigate'
			if (flag)	this.title = `（打官司）用户 ${temp_obj.userName} 掷骰子的点数是否大于3？`
		}
	},

	onReady() {
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm(num) {
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

			com[this.api]({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(round[0]),
				is_success: num
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
    }

    &__icon {
      font-size: 34rpx;
    }
  }
</style>
