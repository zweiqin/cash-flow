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
import * as com from 'config/api.js'

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
		if (this.sign === 'next') {
			this.leftIcon = this.rightIcon = 'star'
			this.title = '是否结束当前回合？'
			this.api = 'NextUser'
		} else if (this.sign === 'payOff') {
			this.leftIcon = this.rightIcon = 'alipay'
			this.api = 'Payroll'
			if (flag)	this.title = `确定给 ${temp_obj.userName} 发工资吗？`
		} else if (this.sign === 'freeEnergy') {
			this.leftIcon = this.rightIcon = 'battery-mid'
			this.api = 'EnergizeRest'
			if (flag)	this.title = `确定给 ${temp_obj.userName} 发 休息精力 吗？`
		} else if (this.sign === 'anniversary') {
			this.leftIcon = this.rightIcon = 'caring'
			this.api = 'EnergizeNormal'
			if (flag)	this.title = `确定给 ${temp_obj.userName} 进行 纪念日/结算日 的精力补充吗？`
		} else if (this.sign === 'givesBirth') {
			this.leftIcon = this.rightIcon = 'baby-fill'
			this.api = 'HaveBaby'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 生孩子吗？`
		} else if (this.sign === 'heartbreak') {
			this.leftIcon = this.rightIcon = 'like-break'
			this.api = 'HeartBreak'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 心碎吗？`
		} else if (this.sign === 'unemployment') {
			this.leftIcon = this.rightIcon = 'job'
			this.api = 'Unemployment'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 在逆流层失业吗？`
		} else if (this.sign === 'fall') {
			this.leftIcon = this.rightIcon = 'empty-permission'
			this.api = 'Bankrupt'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 破产吗？`
		} else if (this.sign === 'bankruptcy') {
			this.leftIcon = this.rightIcon = '待做待做待做待做待做待做待做待做待做待做'
			this.api = '待做待做待做待做待做待做待做待做待做待做'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 待做待做待做待做待做待做待做待做？`
		} else if (this.sign === 'charitable') {
			this.leftIcon = this.rightIcon = 'praise'
			this.api = 'DoCharity'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 做平流层的慈善吗？`
		} else if (this.sign === 'charity') {
			this.leftIcon = this.rightIcon = 'praise-fill'
			this.api = 'TODO'
			if (flag)	this.title = `确定让 ${temp_obj.userName} 做顺流层的慈善吗？`
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
			if (this.api !== 'NextUser') {
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
			} else {
				uni.showLoading({
					title: '请稍等...',
					mask: true
				})
			}
			com[this.api]({
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
