<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered tn-text-bold pad-top">负债</view>
		<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">自住房抵押贷款</view>
				<view class="tn-flex-3 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(debt_self_housing) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">购车贷款</view>
				<view class="tn-flex-3 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(debt_car_loan) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">信用卡负债</view>
				<view class="tn-flex-3 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(debt_credit_card) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">额外负债</view>
				<view class="tn-flex-3 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(debt_additional_liabilities) }}</view>
			</view>

			<view>
				<view class="tn-flex tn-border-solid-bottom tn-border-black tn-padding-top-sm">
					<view class="tn-flex-2 tn-text-left">房产抵押贷款</view>
					<view class="tn-flex-3 tn-text-right"></view>
				</view>
				<view v-for="item in debt1" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-2 tn-text-left tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-3 tn-text-right tn-margin-left-sm tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
				</view>
			</view>

			<view>
				<view class="tn-flex tn-border-solid-bottom tn-border-black tn-padding-top-sm">
					<view class="tn-flex-2 tn-text-left">企业负债</view>
					<view class="tn-flex-3 tn-text-right"></view>
				</view>
				<view v-for="item in debt2" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-2 tn-text-left tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-3 tn-text-right tn-margin-left-sm tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
				</view>
			</view>

			<view>
				<view class="tn-flex tn-border-solid-bottom tn-border-black tn-padding-top-sm">
					<!-- 月息因为 人脉的觉察卡 会发生变化，这里先不显示 -->
					<!-- <view class="tn-flex-2 tn-text-left">银行贷款（月息10%）</view> -->
					<view class="tn-flex-2 tn-text-left">银行贷款</view>
					<view class="tn-flex-3 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(debt_bank_loan) }}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	data() {
		return {
			debt_self_housing: 0,
			debt_car_loan: 0,
			debt_credit_card: 0,
			debt_additional_liabilities: 0,
			debt1: [ {
				id: 1,
				card_name: '房产',
				value: 0
			} ],
			debt2: [ {
				id: 1,
				card_name: '企业',
				value: 0
			} ],
			debt_bank_loan: 0
		}
	},
	mounted() {
	},
	methods: {
		cutApart,
		setLiabilities(obj) {
			this.debt_self_housing = obj.debt_self_housing
			this.debt_car_loan = obj.debt_car_loan
			this.debt_credit_card = obj.debt_credit_card
			this.debt_additional_liabilities = obj.debt_additional_liabilities
			this.debt1 = obj.debt1.length ? obj.debt1 : [ { id: 1, card_name: '房产', value: 0 } ]
			this.debt2 = obj.debt2.length ? obj.debt2 : [ { id: 1, card_name: '企业', value: 0 } ]
			this.debt_bank_loan = obj.debt_bank_loan
		}
	}
}
</script>

<style lang="scss" scoped>
.tn-text-center {
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		/*滚动条整体样式*/
		display: block;
		width: 10rpx !important; /*高宽分别对应横竖滚动条的尺寸*/
		height: 0rpx !important;
		// border: 10rpx solid red;
	}
	&::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		background: #ededed;
		border-radius: 10rpx;
	}
	&::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10rpx;
		background-color: #666666;
	}
}
</style>
