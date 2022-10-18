<template>
	<view>
		<view v-if="currentExecute.executed.length===0" class="tn-flex tn-flex-row-center tn-padding-sm"><text>所有玩家已点击放弃按钮</text></view>
		<view v-else>
			<view class="tn-flex tn-flex-row-center tn-padding-sm"><text>以下玩家还未点击放弃按钮：</text></view>
			<view>
				<tn-scroll-list>
					<view class="tn-flex">
						<block v-for="(item, index) in currentExecute.executed" :key="index">
							<view class="tn-flex-1 tn-padding-sm tn-padding-xs tn-radius">
								<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
									<view class="icon3__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" :class="[$t.color.getRandomCoolBgClass(index)]">
										<view class="tn-icon-constellation"></view>
									</view>
									<view class="tn-color-black tn-text-lg tn-text-center">
										<text class="tn-text-ellipsis">{{ item }}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
				</tn-scroll-list>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		currentExecute: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.icon3 {
	&__item {
		width: 30%;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 30rpx;
		margin: 20rpx 10rpx;
		margin-top: 0;
		transform: scale(1);
		transition: transform 0.3s linear;
		transform-origin: center center;

		&--icon {
			width: 100rpx;
			height: 100rpx;
			font-size: 60rpx;
			border-radius: 25%;
			margin-bottom: 18rpx;
			position: relative;
			z-index: 1;

			&::after {
				content: ' ';
				position: absolute;
				z-index: -1;
				width: 100%;
				height: 100%;
				left: 0;
				bottom: 0;
				border-radius: inherit;
				opacity: 1;
				transform: scale(1, 1);
				background-size: 100% 100%;
				// background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg6.png);
			}
		}
	}
}
</style>
