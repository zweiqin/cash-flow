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
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm()">确定</tn-button>
		</view>

	</view>
</template>

<script>
import { Litigate, LookForJob } from 'config/api.js'
const com = { Litigate, LookForJob }

export default {
	props: {
		personal: {
			type: Object,
			required: true
		},
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
			rightIcon: '',

			api: ''

		}
	},
	created() {
		// console.log(com)
		if (this.sign === 'litigate') {
			this.leftIcon = this.rightIcon = 'server'
			// await发送请求，判断是否有那张被辞退的逆流卡

			this.title = '确定要打官司吗？'
			this.api = 'Litigate'
		} else if (this.sign === 'hunting') {
			this.leftIcon = this.rightIcon = 'con-leo'
			this.title = `确定要找工作吗？`
			this.api = 'LookForJob'
		}
	},

	onReady() {
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// 判断是否有那张被辞退的逆流卡

			// 判断是否失业
			if (!this.personal.basic_info.is_unemploy) {
				return uni.showToast({
					title: '您还未失业！',
					icon: 'error'
				})
			}
			com[this.api]({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(getApp().globalData.gameUserId)
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
