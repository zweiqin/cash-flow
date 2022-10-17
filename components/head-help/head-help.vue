<template>
	<view class="tn-height-full tn-bg-orangeyellow tn-flex tn-flex-direction-column tn-flex-row-center tn-text-bold tn-flex-col-center">
		<view><text style="font-size: 3vh;">{{ game_key }}</text></view>
		<view class="tn-width-full tn-flex tn-flex-row-around">
			<view><tn-button :plain="true" :border-bold="true" background-color="#eb56b6" height="auto" padding=".2vh" margin="0" @click="handleHelp('showNowCard')"><text class="tn-icon-assort-fill" style="font-size: 2vh;color: #494183;"></text></tn-button></view>
			<view><tn-button :plain="true" :border-bold="true" background-color="#eb56b6" height="auto" padding=".2vh" margin="0" @click="handleHelp('showAllCard')"><text class="tn-icon-assort" style="font-size: 2vh;color: #494183;"></text></tn-button></view>
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
