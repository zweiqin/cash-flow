<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<view style="max-height: 65vh;overflow-y: auto;">
			<tn-form ref="form" :model="model" :error-type="errorType" :label-position="labelPosition" :label-width="labelWidth" :label-align="labelAlign">

				<tn-form-item label="卡种类：" prop="payType" :label-position="labelPosition" :label-align="labelAlign">
					<view>
						<tn-radio-group v-model="model.payType" :size="58" :width="radioWidth" :wrap="true" @change="radioGroupChange">
							<view style="width: 480rpx">
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='副业').id),0])" :disabled="false" :label-size="48">【小机会】副业</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='金融').id),0])" :disabled="false" :label-size="48">【小机会】金融</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='房地产').id),0])" :disabled="false" :label-size="48">【大机会】房地产</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='企业').id),0])" :disabled="false" :label-size="48">【大机会】企业</tn-radio>
							</view>
							<view style="width: 250rpx">
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='行情').id),1])" :disabled="false" :label-size="45">行情卡</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='觉察').id),1])" :disabled="false" :label-size="45">觉察卡</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='相亲卡').id),1])" :disabled="false" :label-size="45">相亲卡</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='逆流').id),1])" :disabled="false" :label-size="45">逆流卡</tn-radio>
								<tn-radio :name="JSON.stringify([String(radioList.find((item)=>item.category_name==='项目').id),1])" :disabled="false" :label-size="45">项目卡</tn-radio>
							</view>
						</tn-radio-group>
					</view>
				</tn-form-item>
			</tn-form>

			<view class="tn-flex tn-flex-row-around button">
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">取消</tn-button>
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="submit()">提交</tn-button>
			</view>
		</view>

	</view>
</template>

<script>
import { DrawCard } from 'config/api.js'

export default {
	props: {
		// text: {
		// 	type: String,
		// 	required: true
		// },
		// isFree: {
		// 	type: Number,
		// 	required: true
		// }
		// icon: {
		// 	type: String,
		// 	default: 'reduce-square'
		// }
	},
	data() {
		return {
			// 左图标
			leftIcon: 'add',
			// 右图标
			rightIcon: 'add',
			model: {
				payType: ''
			},
			// errorType: ['message', 'border-bottom', 'toast'],
			errorType: [ 'message' ],
			labelPosition: 'left',
			labelWidth: 140,
			labelAlign: 'right',
			radioWidth: 'auto',
			radioList: getApp().globalData.cardCategoryList,

			rules: {
				payType: [
					{
						required: true,
						message: '请选择卡种类！',
						trigger: 'change'
					}
				]
			}

		}
	},

	computed: {
		userName() {
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				return `正在给 ${temp_obj.userName} 抽卡：`
			}
			return '获取玩家信息失败，请重试！'
		}
	},
	created() {
		// this.leftIcon = this.rightIcon = this.icon
	},
	mounted() {
		this.$refs.form.setRules(this.rules)
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		// 单选项值改变事件
		radioGroupChange(event) {
			// console.log(event, this.model.payType)
			// this.model.payType = event
		},
		// 表单提交
		submit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					// 验证通过
					// this.$t.message.toast('请勾选协议')
					// console.log(this.model.payType)
					if (!this.model.payType) {
						return uni.showToast({
							title: '请选择卡种类！',
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
					const temp_arr = JSON.parse(this.model.payType)
					DrawCard({
						game_id: getApp().globalData.gameId,
						game_user_id: round[0],
						category_id: temp_arr[0],
						is_free: temp_arr[1] // 1免费，0收费
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
