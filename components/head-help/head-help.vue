<template>
	<view class="tn-height-full tn-text-bold tn-flex tn-flex-row-between tn-flex-col-center" style="width: 29.2vh;">

		<view><tn-button
			:plain="true" :border-bold="true" background-color="#eb56b6" width="6.3vh"
			height="6.3vh" padding=".2vh" margin="0" :font-size="2"
			font-unit="vh" @click="handleHelp('showJournal')"
		>
			<!-- <text class="tn-icon-notice-fill" style="font-size: 2vh;color: #494183;"></text> -->
			<view style="min-width: 30px;">日志</view>
		</tn-button></view>

		<view><tn-button
			:plain="true" :border-bold="true" background-color="#eb56b6" width="6.3vh"
			height="6.3vh" padding=".2vh" margin="0" :font-size="2"
			font-unit="vh" @click="handleHelp('showNowCard')"
		>
			<!-- <text class="tn-icon-assort-fill" style="font-size: 2vh;color: #494183;"></text> -->
			<view style="min-width: 30px;">
				<view>最近</view>
				<view>卡牌</view>
			</view>
		</tn-button></view>

		<view><tn-button
			:plain="true" :border-bold="true" background-color="#eb56b6" width="6.3vh"
			height="6.3vh" padding=".2vh" margin="0" :font-size="2"
			font-unit="vh" @click="handleHelp('showAllCard')"
		>
			<!-- <text class="tn-icon-assort" style="font-size: 2vh;color: #494183;"></text> -->
			<view style="min-width: 30px;">规则</view>
		</tn-button></view>

		<view style="margin-left: 1vh;text-align: center;">
			<text>房号</text>
			<br>
			<text style="font-size: 3vh;">{{ game_key }}</text>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			game_key: getApp().globalData.gameKey.substring(6)
		}
	},

	methods: {
		handleHelp(significance) {
			this.$emit('clickBtn', significance)
		}
	}
}
</script>

<style>
</style>
