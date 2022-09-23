<template>
	<view class="tn-text-center">
		<view class="tn-border-solid-bottom tn-border-purplered tn-text-bold pad-top">收入</view>
		<view class="tn-flex tn-flex-row-between tn-border-solid-bottom tn-border-purplered"> <view class="tn-flex-2 pad-top">项目</view> <view class="tn-flex-1 pad-top">现金流</view> </view>
		<view class="tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="writing-mode tn-flex-1">主 动 收 入</view>
			<view class="tn-flex tn-flex-direction-column" style="flex: 14;">
				<!-- 工作收入 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">工作收入</view>
					<view class="tn-flex-11">
						<view class="tn-flex tn-margin-right-sm tn-border-solid-bottom tn-border-black pad-top">
							<view class="tn-flex-6 tn-text-left">本人工资</view> <view class="tn-flex-5 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(in_salary) }}</view>
							<!-- style="line-height: 100%;vertical-align:text-bottom;" -->
						</view>
						<view class="tn-flex tn-margin-right-sm tn-border-solid-bottom tn-border-black pad-top">
							<view class="tn-flex-6 tn-text-left">配偶工资</view> <view class="tn-flex-5 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(in_partner) }}</view>
						</view>
					</view>
				</view>
				<!-- 副业收入 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">副业收入</view>
					<view class="tn-flex-11">
						<view v-for="item in income1" :key="item.id" class="tn-flex tn-margin-right-sm tn-border-solid-bottom tn-border-black pad-top">
							<view class="tn-flex-6 tn-text-left">{{ item.card_name }}</view> <view class="tn-flex-5 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="writing-mode tn-flex-1">被 动 收 入</view>
			<view class="tn-flex tn-flex-direction-column" style="flex: 14;">
				<!-- 金融 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">金融</view>
					<view class="tn-flex-11">
						<view class="tn-flex pad-top">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">代码</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">份数</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs"></view>
						</view>
						<view v-for="item in income2" :key="item.id" class="tn-flex pad-top">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ item.card_name }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
						</view>
						<!-- 重复测试s -->
						<!-- 重复测试s -->
					</view>
				</view>
				<!-- 房地产 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">房地产</view>
					<view class="tn-flex-11">
						<view class="tn-flex pad-top">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">代码</view>
								<!-- <view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">首付</view> -->
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm"></view>
						</view>
						<view v-for="item in income3" :key="item.id" class="tn-flex pad-top">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ item.card_name }}</view>
								<!-- <view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(item.num) }}</view> -->
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
						</view>
					</view>
				</view>
				<!-- 企业投资 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">企业投资</view>
					<view class="tn-flex-11">
						<view class="tn-flex pad-top">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">代码</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">首付</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm"></view>
						</view>
						<view v-for="item in income4" :key="item.id" class="tn-flex pad-top">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ item.card_name }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
						</view>
					</view>
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
			// test_num: 123456
			in_salary: 0,
			in_partner: 0,
			income1: [
				{
					id: 1,
					card_name: '无',
					value: 0
				}
			],
			income2: [
				{
					id: 1,
					card_name: '无',
					num: 0,
					value: 0
				}
			],
			income3: [
				{
					id: 1,
					card_name: '无',
					value: 0
				}
			],
			income4: [
				{
					id: 1,
					card_name: '无',
					num: 0,
					value: 0
				}
			]
		}
	},
	mounted() {
		// setTimeout(() => {
		// 	this.test_num = 546464654654
		// }, 2000)
	},
	methods: {
		cutApart,
		setIncome(obj) {
			this.in_salary = obj.in_salary
			this.in_partner = obj.in_partner
			obj.income1.length && (this.income1 = obj.income1)
			obj.income2.length && (this.income2 = obj.income2)
			obj.income3.length && (this.income3 = obj.income3)
			obj.income4.length && (this.income4 = obj.income4)
			// this.income1 = obj.income1.length ? obj.income1 : [ { id: 1, card_name: '无', value: 0 } ]
			// this.income2 = obj.income2.length ? obj.income2 : [ { id: 1, card_name: '无', num: 0, value: 0 } ]
			// this.income3 = obj.income3.length ? obj.income3 : [ { id: 1, card_name: '无', value: 0 } ]
			// this.income4 = obj.income4.length ? obj.income4 : [ { id: 1, card_name: '无', num: 0, value: 0 } ]
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
.writing-mode {
	writing-mode: vertical-lr;
}
</style>
