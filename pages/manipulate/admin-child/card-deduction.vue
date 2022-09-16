<template>
	<view>

		<tn-form ref="form" :model="model" :error-type="errorType" :label-position="labelPosition" :label-width="labelWidth" :label-align="labelAlign">

			<tn-form-item label="卡种类：" prop="payType" :label-position="labelPosition" :label-align="labelAlign">
				<tn-radio-group v-model="model.payType" :width="radioWidth" :wrap="radioWrap" @change="radioGroupChange">
					<tn-radio v-for="(item, index) in radioList" :key="index" :name="String(item.id)" :disabled="false">{{ item.category_name }}</tn-radio>
				</tn-radio-group>
			</tn-form-item>

		</tn-form>
		<view class="tn-flex">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="100%" @click="cancel()">取消</tn-button>
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="100%" @click="submit()">提交</tn-button>
		</view>
	</view>
</template>

<script>
import { DrawCard } from 'config/api.js'

export default {
	data() {
		return {
			model: {
				payType: ''
			},
			// errorType: ['message', 'border-bottom', 'toast'],
			errorType: [ 'message' ],
			labelPosition: 'left',
			labelWidth: 140,
			labelAlign: 'right',
			radioWidth: 'auto',
			radioWrap: false,
			radioList: getApp().globalData.cardCategoryList,

			rules: {
				payType: [
					{
						required: true,
						message: '请选择卡种类',
						trigger: 'change'
					}
				]
			}

		}
	},
	onReady() {
		this.$refs.form.setRules(this.rules)
	},
	methods: {
		// 单选项值改变事件
		radioGroupChange(event) {
			console.log(event)
			this.model.payType = event
		},
		cancel() {
			this.$emit('cancel')
		},
		// 表单提交
		submit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					// 这里的验证有问题
					// 验证通过
					// this.$t.message.toast('请勾选协议')
					console.log(this.model)
					DrawCard({
						game_id: getApp().globalData.gameId,
						game_user_id: getApp().globalData.appListId[0],
						category_id: this.model.payType
					})
						.then((res) => {
							console.log(res[1].data.data)
						})
						.catch((err) => {
							console.log(err)
						})
				}
			})
		}

	}
}
</script>

<style>
</style>
