<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered">负债</view>
		<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">自住房抵押贷款</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(200000) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">购车贷款</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(40000) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">信用卡负债</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(10000) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black">
				<view class="tn-flex-2 tn-text-left">额外负债</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(20000) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black tn-padding-top-sm">
				<view class="tn-flex-2 tn-text-left">房产抵押贷款</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(999994444444444) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black tn-padding-top-sm">
				<view class="tn-flex-2 tn-text-left">企业负债</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(9946874664444444) }}</view>
			</view>
			<view class="tn-flex tn-border-solid-bottom tn-border-black tn-padding-top-sm">
				<view class="tn-flex-2 tn-text-left">银行贷款（月息10%）</view>
				<view class="tn-flex-3 tn-text-right">{{ cutApart(999964568964444) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	data() {
		return {
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
