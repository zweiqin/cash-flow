<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered">支出</view>
		<view class="tn-flex tn-border-solid-bottom tn-border-purplered">
			<view class="tn-flex-2 tn-flex tn-flex-direction-column tn-flex-row-center tn-border-solid-right tn-border-black">生活支出</view>
			<view class="tn-flex-3">
				<view class="tn-flex tn-border-solid-bottom tn-border-black">
					<view class="tn-flex-1">孩子</view>
					<view class="tn-flex-3">{{ cutApart(9888) }} 个 ×</view>
					<view class="tn-flex-2 tn-text-right tn-margin-right-sm">{{ cutApart(2000) }}</view>
				</view>
				<view class="tn-flex tn-border-solid-bottom tn-border-black">
					<view class="tn-flex-1">本人</view>
					<view class="tn-flex-5 tn-text-right tn-margin-right-sm">{{ cutApart(1000) }}</view>
				</view>
				<view class="tn-flex">
					<view class="tn-flex-1">配偶</view>
					<view class="tn-flex-5 tn-text-right tn-margin-right-sm">{{ cutApart(6666666666666) }}</view>
				</view>
			</view>
		</view>
		<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">税金</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(100) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">自住房贷款支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(2000) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">房租支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(0) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">购车贷款支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(800) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">信用卡支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(300) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">额外负债支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(100) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">保险支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(222222222222) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">健康支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(111111111111) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">银行贷款利息支出</view>
				<view class="tn-flex-3 tn-text-right tn-margin-right-sm">{{ cutApart(555555555555555) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	data() {
		return {
			// test: getApp().globalData.test
		}
	},
	mounted() {
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
</style>
