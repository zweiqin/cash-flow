<template>
	<!-- 中间层开始 -->
	<!-- <view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle"> -->
	<!-- <view class="tn-flex layer-2"> -->
	<view class="tn-flex" style="height: 100%;">
		<view class="tn-flex-1 innermost-1">
			<!-- 左s -->
			<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle-l1">
				<!-- 左上s -->
				<UpperLeft></UpperLeft>
				<!-- 左上e -->
			</view>
			<view class="tn-padding-xs tn-margin-left-xs tn-margin-right-xs tn-margin-top-sm tn-margin-bottom-xs tn-radius bg-flex-shadow middle-l2">
				<!-- 左下s -->
				<LowerLeft></LowerLeft>
				<!-- 左下e -->
			</view>
			<!-- 左e -->
		</view>
		<view class="tn-flex-1 innermost-2">
			<!-- 中s -->
			<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle-m1">
				<!-- 中上s -->
				<UpperMiddle></UpperMiddle>
				<!-- 中上e -->
			</view>
			<view class="tn-padding-xs tn-margin-left-xs tn-margin-right-xs tn-margin-top-sm tn-margin-bottom-xs tn-radius bg-flex-shadow middle-m2">
				<!-- 中下s -->
				<LowerMiddle></LowerMiddle>
				<!-- 中下e -->
			</view>
			<!-- 中e -->
		</view>
	</view>
	<!-- <view class="tn-flex-1 tn-padding-xs innermost-3"> -->
	<!-- 右s -->
	<!-- <userButton></userButton> -->
	<!-- 右e -->
	<!-- </view> -->
	<!-- </view> -->
	<!-- </view> -->
	<!-- 中间层结束 -->
</template>

<script>
import UpperLeft from './upper-left.vue'
import LowerLeft from './lower-left.vue'
import UpperMiddle from './upper-middle.vue'
import LowerMiddle from './lower-middle.vue'
export default {
	components: { UpperLeft, LowerLeft, UpperMiddle, LowerMiddle },
	data() {
		return {}
	},

	onLoad(options) {},
	onShow() {},
	onHide() {},

	methods: {}
}
</script>

<style lang="scss" scoped>
.innermost-1 {
	display: flex;
	flex-direction: column;
	// height: 100%;
	.middle-l1 {
		flex: 1;
	}
	.middle-l2 {
		flex: 1;
	}
}
.innermost-2 {
	display: flex;
	flex-direction: column;
	.middle-m1 {
		flex: 1;
	}
	.middle-m2 {
		flex: 1;
	}
}

.middle-l1,
.middle-l2,
.middle-m1,
.middle-m2 {
	overflow-y: hidden;
	// &::-webkit-scrollbar {
	// 	/*滚动条整体样式*/
	// 	display: block;
	// 	width: 10rpx !important; /*高宽分别对应横竖滚动条的尺寸*/
	// 	height: 0rpx !important;
	// 	// border: 10rpx solid red;
	// }
	// &::-webkit-scrollbar-track {
	// 	/*滚动条里面轨道*/
	// 	background: #ededed;
	// 	border-radius: 10rpx;
	// }
	// &::-webkit-scrollbar-thumb {
	// 	/*滚动条里面小方块*/
	// 	border-radius: 10rpx;
	// 	background-color: #666666;
	// }
}

.innermost-1 > .bg-flex-shadow {
	background-color: beige;
	// background-color: #ffb3ff;
	// background-color: red;
}
.innermost-2 > .bg-flex-shadow {
	background-color: beige;
	// background-color: #ffb3ff;
}
</style>
