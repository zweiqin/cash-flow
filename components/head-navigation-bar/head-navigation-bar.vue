<template>
	<view class="tn-flex tn-flex-row-center tn-flex-wrap tn-text-center">
		<view v-for="(item, index) in appListId" :key="item.id" class="tn-padding-xs tn-padding-left-xl" @click="showPopup(item.userName, item.id)">
			<view style="width: 3.2vw;height: 3.2vw;margin:0 auto 5px;border-radius: 50%;" :class="round[1] - 1 === index ? 'my-turn' : ''">
				<tn-avatar icon="constellation" size="3.2vw"></tn-avatar>
			</view>
			<view>{{ item.userName }}</view> <view>{{ item.roleName }}</view>
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
			if (getApp().globalData.role === 'user') {
				if (this.round[0] === getApp().globalData.gameUserId) {
					this.$emit('notice', '提示', '轮到您了！', 'creative')
					// this.globalNotice('提示', '轮到您了！', 'creative')
				} else {
					this.$emit('notice', '提示', '下一回合！', 'creative')
					// this.globalNotice('提示', '下一回合！', 'creative')
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.my-turn {
	box-shadow: 0px -5px 10px 0px #ff0000, -6px 0px 6px 0px #ff0000, 6px 0px 6px 0px #ff0000, 0px 5px 19px 0px #ff0000;
}
</style>
