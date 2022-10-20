<template>
	<view>
		<view v-if="single">
			<!-- 对于项目卡，肯定是单人操作的（当前轮玩家操作），即single -->
			<!-- 对于其它类的卡，有些是单人操作的（当前轮玩家操作），即single -->
			<view v-if="currentExecute.executed.length!==appListId.length" class="tn-flex tn-flex-row-center tn-padding-sm"><text>当前玩家已做操作</text></view>
			<view v-else>
				<view class="tn-flex tn-flex-row-center tn-padding-top"><text>当前玩家还未做操作：</text></view>
				<view>
					<tn-scroll-list :indicator="false">
						<view class="tn-flex" style="margin: 0 auto;">
							<block v-for="(item, index) in 1" :key="index">
								<view class="tn-flex-1 tn-padding-sm tn-padding-xs tn-radius">
									<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
										<view class="icon3__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" :class="[$t.color.getRandomCoolBgClass(index)]">
											<view class="tn-icon-constellation"></view>
										</view>
										<view class="tn-color-black tn-text-lg tn-text-center">
											<text class="tn-text-ellipsis">{{ appListId.find((item) => item.id === round[0]).userName }}</text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</tn-scroll-list>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-if="advectionExecute.executed.length===0" class="tn-flex tn-flex-row-center tn-padding-sm"><text>所有玩家已做操作</text></view>
			<view v-else>
				<view class="tn-flex tn-flex-row-center tn-padding-top"><text>以下玩家还未做操作：</text></view>
				<view>
					<tn-scroll-list>
						<view class="tn-flex">
							<block v-for="(item, index) in advectionExecute.executed" :key="index">
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
	</view>
</template>

<script>
export default {
	props: {
		currentExecute: {
			type: Object,
			required: true
		},
		single: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			appListId: getApp().globalData.appListId,
			round: getApp().globalData.round
		}
	},
	computed: {
		// 未操作的，并去除了顺流层的那些人的人
		advectionExecute() {
			// 把在顺流层的用户去除掉
			return {
				executed: this.currentExecute.executed.filter((item) => this.advectionUsers.includes(item)),
				cardId: this.currentExecute.cardId
			}
		},
		// 平流层的用户
		advectionUsers() {
			return this.appListId.filter((item) => item.isRichCircle === '0').map((item) => item.userName)
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
