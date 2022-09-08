<template>
	<view class="template-outset">
		<view class="tn-flex layer-1">
			<view class="tn-flex-1 outermost-1">
				<!-- 顶层开始 -->
				<view class="tn-flex tn-padding-sm tn-margin-xs tn-radius bg-flex-shadow top">
					<!-- <tn-count-down :timestamp="900" :font-size="60" :separator-size="60"></tn-count-down> -->
					<view class="tn-flex tn-flex-center tn-flex-direction-column tn-flex-1 tn-bg-white tn-text-center">
						<view class="tn-border-solid-bottom tn-bold-border"> <Timer @timing="changeTimer"></Timer> </view>
						<!-- <tn-count-to :start-val="90" :end-val="0" :duration="90000" :use-easing="false"></tn-count-to> -->
						<!-- <view class=""> <CountTo :font-size="40" :start-val="90" :end-val="0" :duration="90000" :use-easing="false" @change="changeCountTo"></CountTo> </view> -->
					</view>
					<view class="tn-flex-9">
						<view class="tn-flex tn-flex-row-center tn-flex-wrap  tn-text-center">
							<view class="tn-padding-xs" @click="showPopup()">
								<view> <tn-avatar :src="src" size="sm"></tn-avatar> </view> <view>1号</view>
							</view>
							<view class="tn-padding-xs" @click="showPopup()">
								<view> <tn-avatar :src="src" size="sm"></tn-avatar> </view> <view>2号</view>
							</view>
							<view class="tn-padding-xs" @click="showPopup()">
								<view> <tn-avatar :src="src" size="sm"></tn-avatar> </view> <view>3号</view>
							</view>
							<view class="tn-padding-xs" @click="showPopup()">
								<view> <tn-avatar :src="src" size="sm"></tn-avatar> </view> <view>4号</view>
							</view>
							<view class="tn-padding-xs" @click="showPopup()">
								<view> <tn-avatar :src="src" size="sm"></tn-avatar> </view> <view>5号</view>
							</view>
							<view class="tn-padding-xs" @click="showPopup()">
								<view> <tn-avatar :src="src" size="sm"></tn-avatar> </view> <view>6号</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 顶层结束 -->
				<!-- 中间层开始 -->
				<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle">
					<view class="tn-flex layer-2">
						<view class="tn-flex-1 innermost-3">
							<!-- 右s -->
							<view class="tn-flex tn-flex-direction-column tn-flex-wrap tn-flex-col-bottom tn-padding-xs tn-radius bg-flex-shadow middle-r1">
								<!-- 按钮s -->
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">下一位</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">送钱（玩家生孩子随礼）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">发工资</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">扣钱（触犯规则）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">扣费抽卡</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">免费抽卡</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">发免费精力</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">发收费精力</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">玩家生孩子</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">玩家选择结婚纪念（日）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">心碎（逆流层失恋/逆流层离婚/顺流层离婚）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">逆流层失业</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">顺流层破产</text>
								</tn-button> </view>
								<view>
									<tn-button :shadow="true" width="30vw" height="65rpx" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
										<text style="white-space:nowrap;">用户做慈善</text>
									</tn-button>
								</view>
								<!-- 按钮e -->
							</view>
							<!-- 右e -->
						</view>
					</view>
				</view>
				<!-- 中间层结束 -->
				<!-- 底层开始 -->
				<!-- <view class="tn-no-padding tn-margin-xs tn-radius bg-flex-shadow bottom"> -->
				<!-- 底层格子开始 -->
				<!-- <Bottom></Bottom> -->
				<!-- 底层格子结束 -->
				<!-- </view> -->
				<!-- <view class="tn-padding-xl tn-margin-left-xs tn-margin-right-xs tn-margin-top-sm tn-margin-bottom-xs tn-radius bg-flex-shadow">xxxxx</view> -->
				<!-- 底层结束 -->
			</view>

			<view>
				<tn-popup
					v-model="show_popup"
					:margin-top="100"
					length="50%"
					mode="bottom"
					background-color="#ffb3ff"
					height="90%"
					:border-radius="23"
					:close-btn="true"
					close-btn-icon="close"
					close-btn-position="top-right"
					:mask-closeable="true"
				>
					<view>
						<tn-button shape="round" width="220rpx" font-color="#080808">关闭弹窗</tn-button>
					</view>
				</tn-popup></view>

		</view>
	</view>
</template>

<script>
import Timer from '@/components/timer/timer.vue'
// import CountTo from '@/components/count-to/count-to.vue'
// import UpperLeft from '../game/user-child/upper-left.vue'
// import LowerLeft from '../game/user-child/lower-left.vue'
// import UpperMiddle from '../game/user-child/upper-middle.vue'
// import LowerMiddle from '../game/user-child/lower-middle.vue'
// import Bottom from './user-child/bottom.vue'
// import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	components: { Timer },
	data() {
		return {
			show_popup: false
		}
	},
	methods: {
		// cutApart,
		changeTimer(e) {
			// console.log(e)
		},
		changeCountTo(e) {
			// console.log(e)
		},
		showPopup() {
			this.show_popup = true
		}
	}
}
</script>

<style lang="scss" scoped>
/* 波浪*/
.template-outset {
	width: 100vw;
	height: 100vh;
	font-size: 1.4vw;
	// font-size: 2.08vh;
	// font-size: 28rpx;
	font-family: SimHei, sans-serif, monospace;
	background-image: linear-gradient(to top, #4c3fae 20%, #6e26ba 80%);
	.vertical-align {
		vertical-align: middle;
	}
	.layer-1 {
		.outermost-1 {
			display: flex;
			flex-direction: column;
			width: 100vw;
			height: 100vh;
			.top {
				flex: 1;
				// height: 20vh;
				overflow: auto;
			}
			.middle {
				flex: 10;
				// height: 60vh;
				overflow: auto;
				.layer-2 {
					// width: 100vw;
					height: 100%;
					// .innermost-1 {
					// 	display: flex;
					// 	flex-direction: column;
					// 	.middle-l1 {
					// 		flex: 1;
					// 	}
					// 	.middle-l2 {
					// 		flex: 1;
					// 	}
					// }
					// .innermost-2 {
					// 	display: flex;
					// 	flex-direction: column;
					// 	.middle-m1 {
					// 		flex: 1;
					// 	}
					// 	.middle-m2 {
					// 		flex: 1;
					// 	}
					// }
					.innermost-3 {
						// display: flex;
						// flex-direction: column;
						.middle-r1 {
							// flex: 1;
							height: 100%;
							// align-content: flex-end;
						}
					}

					// .middle-l1,
					// .middle-l2,
					// .middle-m1,
					// .middle-m2 {
					// 	overflow-y: hidden;
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
					// }
				}
			}
			// .bottom {
			// 	flex: 2;
			// 	// height: 20vh;
			// 	overflow: auto;
			// }
		}
	}
}

/* 内容容器 start */
.outermost-1 > .bg-flex-shadow:nth-child(-n + 2) {
	background-color: #e8ccff;
}
// .innermost-1 > .bg-flex-shadow {
// 	background-color: beige;
// 	// background-color: #ffb3ff;
// 	// background-color: red;
// }
// .innermost-2 > .bg-flex-shadow {
// 	background-color: beige;
// 	// background-color: #ffb3ff;
// }
.innermost-3 > .bg-flex-shadow {
	background-color: #ffb3ff;
}
/* 内容容器 end */
</style>
