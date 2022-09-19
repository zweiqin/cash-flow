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
import { NextUser } from 'config/api.js'

export default {
	data() {
		return {
			// 标题
			title: '是否结束当前回合？',
			// 左图标
			leftIcon: 'star',
			// 右图标
			rightIcon: 'star'

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
			NextUser({
				game_id: getApp().globalData.gameId,
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
