<template>
	<view class="tn-flex tn-flex-row-center tn-flex-wrap tn-text-center">
		<view v-for="(item, index) in appListId" :key="item.id" class="tn-padding-xs tn-padding-left-xl" @click="showPopup(item.userName, item.id)">
			<view style="width: 2.2vh;height: 2.2vh;margin:0 auto 5px;border-radius: 50%;" :class="round[1] - 1 === index ? 'my-turn' : ''">
				<tn-avatar icon="constellation" size="2.2vh"></tn-avatar>
			</view>
			<view class="tn-text-bold" style="font-size: 1.8vh;">{{ item.userName }}</view>
			<view class="pad-top tn-text-bold tn-color-brown" style="font-size: 1.6vh;">{{ item.roleName }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		// appListData: getApp().globalData.appListData,
			appListId: getApp().globalData.appListId,
			round: getApp().globalData.round
		}
	},
	onLoad(options) {
	// this.appListId = getApp().globalData.appListId
	},
	// syncUserList() {
	// 	this.appListData = getApp().globalData.appListData
	// 	// console.log(this.appListData)
	// },
	methods: {
		showPopup(userName, id) {
			this.$emit('clickHead', userName, id)
		},
		syncAvatarStyle() {
		// 同步头像样式
			this.round = getApp().globalData.round
		}
	}
}
</script>

<style lang="scss" scoped>
.my-turn {
	box-shadow: 0px -5px 10px 0px #ff0000, -6px 0px 6px 0px #ff0000, 6px 0px 6px 0px #ff0000, 0px 5px 19px 0px #ff0000;
}
</style>
