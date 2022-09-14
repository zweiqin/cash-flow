<template>
	<view class="tn-text-center">
		<view class="tn-border-solid-bottom tn-border-purplered">收入</view>
		<view class="tn-flex tn-flex-row-between tn-border-solid-bottom tn-border-purplered"> <view class="tn-flex-2">项目</view> <view class="tn-flex-1">现金流</view> </view>
		<view class="tn-flex  tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="writing-mode tn-flex-1">主 动 收 入</view>
			<view class="tn-flex tn-flex-direction-column" style="flex: 14;">
				<!-- 工作收入 -->
				<view class="tn-flex-1 tn-flex">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">工作收入</view>
					<view class="tn-flex-11">
						<view class="tn-flex">
							<view class="tn-flex-6 tn-text-left">本人工资</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black">{{ cutApart(800000000000) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-text-left">配偶工资</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black">{{ cutApart(8001) }}</view>
						</view>
					</view>
				</view>
				<!-- 副业收入 -->
				<view class="tn-flex-1 tn-flex">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">副业收入</view>
					<view class="tn-flex-11">
						<view class="tn-flex">
							<view class="tn-flex-6 tn-text-left">xx副业工资</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black">{{ cutApart(8003) }}</view>
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
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">代码</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">份数</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs"></view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<!-- 重复测试s -->
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '888888' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(1000000) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-xs tn-border-solid-bottom tn-border-black">{{ cutApart(99999999999999) }}</view>
						</view>
						<!-- 重复测试s -->
					</view>
				</view>
				<!-- 房地产 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">房地产</view>
					<view class="tn-flex-11">
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">代码</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">首付</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm"></view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '0000001' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(28282828) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black">{{ cutApart(9999999999998) }}</view>
						</view>
					</view>
				</view>
				<!-- 企业投资 -->
				<view class="tn-flex-1 tn-flex tn-border-solid-bottom tn-border-purplered tn-padding-bottom-xs">
					<view class="tn-flex-3 tn-flex tn-flex-direction-column tn-flex-row-center">企业投资</view>
					<view class="tn-flex-11">
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">代码</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">首付</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm"></view>
						</view>
						<view class="tn-flex">
							<view class="tn-flex-6 tn-flex">
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ '0000444' }}</view>
								<view class="tn-flex-1 tn-border-solid-bottom tn-border-black tn-margin-right-xs">{{ cutApart(2828444) }}</view>
							</view>
							<view class="tn-flex-5 tn-text-right tn-margin-right-sm tn-border-solid-bottom tn-border-black">{{ cutApart(999999999997) }}</view>
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
		}
	},
	mounted() {
		// setTimeout(() => {
		// 	this.test_num = 546464654654
		// }, 2000)
	},
	methods: {
		cutApart
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
