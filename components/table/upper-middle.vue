<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered tn-text-bold pad-top">资产</view>
		<view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">觉察投资</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">权益</view>
				</view>
				<view v-for="item in asset1" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-bottom tn-flex-row-center">{{ item.card_name }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-center">未知</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">股票代码</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">每股成本</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">股数</view>
				</view>
				<view v-for="item in asset2" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">房地产代码</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">每月收入</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">价值</view>
				</view>
				<view v-for="item in asset3" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
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
			asset1: [ {
				id: 1,
				card_name: '无'
			} ],
			asset2: [ {
				id: 1,
				card_name: '无',
				num: 0,
				value: 0
			} ],
			asset3: [ {
				id: 1,
				card_name: '无',
				num: 0,
				value: 0
			} ]
		}
	},
	mounted() {
	},
	methods: {
		cutApart,
		setAssets(obj) {
			obj.asset1.length && (this.asset1 = obj.asset1)
			obj.asset2.length && (this.asset2 = obj.asset2)
			obj.asset3.length && (this.asset3 = obj.asset3)
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
