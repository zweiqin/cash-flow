<template>
	<!-- <view class="tn-width-full tn-flex tn-flex-row-around tn-flex-nowrap tn-text-center"> -->

	<view class="tn-width-full tn-height-full tn-text-center tn-border-dashed-left tn-border-dashed-right tn-border-purplered" style="box-shadow: 0 0 0 0 purple, -9rpx 0 10rpx 0 purple inset, 9rpx 0 10rpx 0 purple inset, 0 0 0 0 purple;">
		<!-- max-width: 28vh; background-color: #fff;padding-left: 10vw;position: relative;z-index: 60; -->
		<!-- 阴影位置：上左右下 -->
		<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
			<!-- <view class="tn-flex tn-padding" style="max-width: 20vw;">
				<block v-for="(item, index) in 20" :key="index">
					<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view class="icon3__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" :class="[$t.color.getRandomCoolBgClass(index)]">
								<view class="tn-icon-gloves-fill"></view>
							</view>
							<view class="tn-color-black tn-text-lg tn-text-center">
								<text class="tn-text-ellipsis">傻北</text>
							</view>
						</view>
					</view>
				</block>
			</view> -->
			<view class="tn-flex">
				<view v-for="(item, index) in appListId" :key="item.id" class="tn-padding-left-xs" style="position: relative;width: 9vh;padding-top: 0.3vh;" @click="showPopup(item.userName, item.id)">
					<view style="width: 2.2vh;height: 2.2vh;margin:0 auto 0.3vh;border-radius: 50%;" :class="round[1] - 1 === index ? 'my-turn' : ''">
						<tn-avatar icon="constellation" size="2.2vh"></tn-avatar>
					</view>
					<view class="tn-text-bold tn-text-ellipsis" :class="item.isRichCircle === '1' ? 'tn-color-indigo' : ''" style="font-size: 1.8vh;max-width: 8.8vh">{{
						item.isRichCircle === '1' ? '★' + item.userName : item.userName
					}}</view>
					<view class="pad-top tn-text-bold tn-text-ellipsis tn-color-brown" style="font-size: 1.6vh;max-width: 9vh">{{ item.roleName }}</view>
					<view v-if="item.isDead === '1'" style="position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);width: auto;">
						<tn-badge background-color="#f92c37" font-color="#FFFFFF" :font-size="1.5" font-unit="vh" :absolute="false" :translate-center="false">
							<view class="" style="max-width: 6vh;white-space: nowrap;" v-html="'下局<br />再战'"></view>
						</tn-badge>
					</view>
				</view>
			</view>
		</tn-scroll-list>
	</view>

	<!-- </view> -->
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
			this.appListId = getApp().globalData.appListId
		}
	}
}
</script>

<style lang="scss" scoped>
.my-turn {
	// box-shadow: 0px -5px 10px 0px #ff0000, -6px 0px 6px 0px #ff0000, 6px 0px 6px 0px #ff0000, 0px 5px 19px 0px #ff0000;
	box-shadow: 0px 0px 0px 0px #ff0000, -5px 0px 1px 0px #ff0000, 5px 0px 1px 0px #ff0000, 0px 6px 4px 0px #ff0000;
}
</style>
