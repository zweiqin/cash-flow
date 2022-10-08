<template>
	<view class="tn-padding-xs tn-radius bg-flex-shadow middle-r1">
		<!-- 按钮s -->
		<!-- <view> <tn-button :shadow="true" width="95%" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
			<text style="white-space:nowrap;">下一位</text>
		</tn-button> </view> -->
		<view class="tn-shadow-blur" style="z-index: 4;"> <tn-button :disabled="me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('loan')">
			<text style="">贷款</text>
		</tn-button> </view>
		<view class="tn-shadow-blur" style="z-index: 4;"> <tn-button :disabled="me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('repayment')">
			<text style="">还款</text>
		</tn-button> </view>
		<view class="tn-shadow-blur" style="z-index: 4;"> <tn-button :disabled="me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('giveMoney')">
			<text style="">送钱</text>
		</tn-button> </view>
		<view class="tn-shadow-blur" style="z-index: 4;"> <tn-button :disabled="me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('redeem')">
			<text style="">赎回金融产品</text>
		</tn-button> </view>
		<view class="tn-shadow-blur" style="z-index: 4;"> <tn-button :disabled="!is_turn||me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('abandonSideline')">
			<text style="">放弃某副业</text>
		</tn-button> </view>
		<view class="tn-shadow-blur" style="z-index: 4;"><tn-button :disabled="!is_turn||me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('litigate')">
			<text style="">被辞退：打官司</text>
		</tn-button></view>
		<view class="tn-shadow-blur" style="z-index: 4;"><tn-button :disabled="!is_turn||me.isDead!=='0'" :shadow="true" width="95%" height="auto" background-color="tn-cool-bg-color-2" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('hunting')">
			<text style="">失业后：找工作</text>
		</tn-button></view>
		<!-- 按钮e -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 是否轮到本人
			is_turn: getApp().globalData.gameUserId === getApp().globalData.round[0],
			me: getApp().globalData.appListId.find((item) => item.id === getApp().globalData.gameUserId) || {}
		}
	},

	methods: {
		handleProcessing(significance) {
			this.$emit('clickBtn', significance)
		},
		syncButton() {
			this.is_turn = getApp().globalData.gameUserId === getApp().globalData.round[0]
			this.me = getApp().globalData.appListId.find((item) => item.id === getApp().globalData.gameUserId) || {}
		}
	}
}
</script>

<style>
	.middle-r1{
		/* box-sizing: border-box; */
		height: 100%;
		overflow: auto;
	}

</style>
