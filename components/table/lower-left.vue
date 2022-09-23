<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered tn-text-bold pad-top">支出</view>
		<view class="tn-flex tn-border-solid-bottom tn-border-purplered">
			<view class="tn-flex-2 tn-flex tn-flex-direction-column tn-flex-row-center tn-border-solid-right tn-border-black">生活支出</view>
			<view class="tn-flex-3">
				<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
					<view class="tn-flex-1">孩子</view>
					<view class="tn-flex-3 tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(child_num) }} 个 ×</view>
					<view class="tn-flex-2 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_child) }}</view>
				</view>
				<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
					<view class="tn-flex-1">本人</view>
					<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_personal) }}</view>
				</view>
				<view class="tn-flex pad-top">
					<view class="tn-flex-1">配偶</view>
					<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_partner) }}</view>
				</view>
			</view>
		</view>
		<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">税金</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_tax) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">自住房贷款支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_self_housing) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">房租支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_rent) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">购车贷款支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_car_loan) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">信用卡支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_credit_card) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">额外负债支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_additional_liabilities) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">保险支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_insuraunce) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">健康支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_healthy) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
				<view class="tn-flex-2 tn-text-left">银行贷款利息支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(out_bank_loan_interest) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	data() {
		return {
			child_num: 0,
			out_child: 0,
			out_personal: 0,
			out_partner: 0,
			out_tax: 0,
			out_self_housing: 0,
			out_rent: 0,
			out_car_loan: 0,
			out_credit_card: 0,
			out_additional_liabilities: 0,
			out_insuraunce: 0,
			out_healthy: 0,
			out_bank_loan_interest: 0
		}
	},
	mounted() {
	},
	methods: {
		cutApart,
		setExpenditure(obj) {
			this.child_num = obj.child_num
			this.out_child = obj.out_child
			this.out_personal = obj.out_personal
			this.out_partner = obj.out_partner
			this.out_tax = obj.out_tax
			this.out_self_housing = obj.out_self_housing
			this.out_rent = obj.out_rent
			this.out_car_loan = obj.out_car_loan
			this.out_credit_card = obj.out_credit_card
			this.out_additional_liabilities = obj.out_additional_liabilities
			this.out_insuraunce = obj.out_insuraunce
			this.out_healthy = obj.out_healthy
			this.out_bank_loan_interest = obj.out_bank_loan_interest
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
