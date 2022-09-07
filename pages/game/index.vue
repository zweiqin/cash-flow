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
						<view> <CountTo :start-val="90" :end-val="0" :duration="90000" :use-easing="false" @change="changeCountTo"></CountTo> </view>
					</view>
					<view class="tn-flex-9">
						<view class="tn-flex tn-flex-col-center tn-flex-row-center tn-flex-wrap  tn-text-center">
							<view class="tn-margin-xs" @click="showPopup()">
								<view> <tn-avatar :src="src"></tn-avatar> </view> <view>1号</view>
							</view>
							<view class="tn-margin-xs" @click="showPopup()">
								<view> <tn-avatar :src="src"></tn-avatar> </view> <view>2号</view>
							</view>
							<view class="tn-margin-xs" @click="showPopup()">
								<view> <tn-avatar :src="src"></tn-avatar> </view> <view>3号</view>
							</view>
							<view class="tn-margin-xs" @click="showPopup()">
								<view> <tn-avatar :src="src"></tn-avatar> </view> <view>4号</view>
							</view>
							<view class="tn-margin-xs" @click="showPopup()">
								<view> <tn-avatar :src="src"></tn-avatar> </view> <view>5号</view>
							</view>
							<view class="tn-margin-xs" @click="showPopup()">
								<view> <tn-avatar :src="src"></tn-avatar> </view> <view>6号</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 顶层结束 -->
				<!-- 中间层开始 -->
				<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle">
					<view class="tn-flex layer-2">
						<view class="tn-flex-3 innermost-1">
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
						<view class="tn-flex-3 innermost-2">
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
						<view class="tn-flex-1 innermost-3">
							<!-- 右s -->
							<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle-r1">
								<!-- 按钮s -->
								<view> <tn-button :shadow="true" width="100%" height="4vh" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">下一位</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="100%" height="4vh" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">贷款</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="100%" height="4vh" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">还款</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="100%" height="4vh" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
									<text style="white-space:nowrap;">送钱</text>
								</tn-button> </view>
								<view>
									<tn-button :shadow="true" width="100%" height="4vh" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
										<text style="white-space:nowrap;">被辞退：打官司</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="100%" height="4vh" background-color="tn-cool-bg-color-2" padding="0 10rpx" margin="10rpx 0">
										<text style="white-space:nowrap;">失业后：找工作</text>
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
				<view class="tn-no-padding tn-margin-xs tn-radius bg-flex-shadow bottom">
					<!-- 底层格子开始 -->
					<Bottom></Bottom>
					<!-- 底层格子结束 -->
				</view>
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
import CountTo from '@/components/count-to/count-to.vue'
import UpperLeft from './user-child/upper-left.vue'
import LowerLeft from './user-child/lower-left.vue'
import UpperMiddle from './user-child/upper-middle.vue'
import LowerMiddle from './user-child/lower-middle.vue'
import Bottom from './user-child/bottom.vue'
// import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	components: { Timer, CountTo, UpperLeft, LowerLeft, UpperMiddle, LowerMiddle, Bottom },
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
					.innermost-1 {
						display: flex;
						flex-direction: column;
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
					.innermost-3 {
						display: flex;
						flex-direction: column;
						.middle-r1 {
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
				}
			}
			.bottom {
				flex: 2;
				// height: 20vh;
				overflow: auto;
			}
		}
	}
}

/* 内容容器 start */
.outermost-1 > .bg-flex-shadow:nth-child(-n + 2) {
	background-color: #e8ccff;
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
.innermost-3 > .bg-flex-shadow {
	background-color: #ffb3ff;
}
/* 内容容器 end */
</style>
