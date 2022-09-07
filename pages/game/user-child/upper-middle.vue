<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered">资产</view>
		<view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">觉察投资</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">权益</view>
				</view>
				<view class="tn-flex">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">个人觉察（股票投资）</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">股票收益增加300000000000%</view>
				</view>
				<view class="tn-flex">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">个人觉察（股票投资）</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">股票收益增加300000000000%</view>
				</view>
				<view class="tn-flex">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">个人觉察（股票投资）</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">股票收益增加300000000000%</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">股票代码</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">每股成本</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">股数</view>
				</view>
				<view class="tn-flex">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">jjjjjjjjjjjj</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">{{ cutApart(6969696669969) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">{{ cutApart(969696969696) }}</view>
				</view>
				<view class="tn-flex">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">avdsvcsd</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">{{ cutApart(4465546) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">{{ cutApart(4687846) }}</view>
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
