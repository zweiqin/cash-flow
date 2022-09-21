<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ content }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view>
			<view class="tn-margin-top tn-margin-bottom">
				<tn-list-view
					:card="true"
					title="玩家列表"
					background-color="#EFEFEF"
				>
					<tn-radio-group v-model="value" @change="radioGroupChange">

						<tn-list-cell v-for="(item,index) in appListId" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
							<view>
								<tn-radio :name="item.id">
									<text>用户{{ index+1 }}：</text>
									{{ `${item.userName}(${item.roleName})` }}
								</tn-radio>
							</view>
						</tn-list-cell>

					</tn-radio-group>
				</tn-list-view>
			</view>
		</view>

		<view>
			<!-- <tn-input v-model="money" type="text" placeholder="请输入金钱数量" :focus="true" :border="true" :show-right-icon="true" right-icon="reduce-circle" /> -->
			<tn-input v-model="money" type="number" placeholder="请输入金钱数量" :focus="true" :border="true" />
		</view>

		<view class="tn-flex tn-flex-row-around button">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">确定</tn-button>
		</view>
	</view>
</template>

<script>
import { DeductMoney } from 'config/api.js'

export default {
	data() {
		return {
			// 左图标
			leftIcon: 'reduce-circle',
			// 右图标
			rightIcon: 'reduce-circle',

			content: '正在给某玩家扣钱：',

			appListId: getApp().globalData.appListId,
			value: '',

			money: ''
		}
	},

	computed: {
	},

	onReady() {},
	methods: {
		radioGroupChange(name) {
			// console.log(name)
		},
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			if (!this.value) {
				return uni.showToast({
					title: '请选择玩家！',
					icon: 'error'
				})
			}
			if (!this.money || this.money.startsWith('0')) {
				return uni.showToast({
					title: '请输入正确的金钱数值！',
					icon: 'error'
				})
			}
			DeductMoney({
				game_id: Number(getApp().globalData.gameId),
				game_user_id: Number(this.value),
				money_number: Number(this.money)
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
		color: brown;
	}

	&__icon {
		font-size: 34rpx;
	}
}
.button {
	margin-top: 35rpx;
}
</style>
