<template>
	<view class="template-outset">
		<view class="tn-flex layer-1">
			<view class="tn-flex-1 outermost-1">
				<!-- 顶层开始 -->
				<view class="tn-padding-sm tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur top">
					<tn-count-down :timestamp="900" :font-size="60" :separator-size="60" :show-hours="false"></tn-count-down>
				</view>
				<!-- 顶层结束 -->
				<!-- 中间层开始 -->
				<view class="tn-padding-sm tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur middle">
					<view class="tn-flex layer-2">
						<view class="tn-flex-3 innermost-1">
							<!-- 左s -->
							<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur middle-l1">eaves</view>
							<view class="tn-padding-xs tn-margin-left-xs tn-margin-right-xs tn-margin-top-sm tn-margin-bottom-xs tn-radius bg-flex-shadow tn-shadow-blur middle-l2">编号对比</view>
							<!-- 左e -->
						</view>
						<view class="tn-flex-3 innermost-2">
							<!-- 中s -->
							<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur middle-m1">识别能读</view>
							<view class="tn-padding-xs tn-margin-left-xs tn-margin-right-xs tn-margin-top-sm tn-margin-bottom-xs tn-radius bg-flex-shadow tn-shadow-blur middle-m2">阿巴瑟啊</view>
							<!-- 中e -->
						</view>
						<view class="tn-flex-1 innermost-3">
							<!-- 右s -->
							<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur middle-r1">挨打v</view>
							<!-- 右e -->
						</view>
					</view>
				</view>
				<!-- 中间层结束 -->
				<!-- 底层开始 -->
				<view class="tn-no-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur bottom">
					<!-- 底层格子开始 -->
					<!-- <view class="tn-flex tn-flex-row-around tn-margin-top-xs layer-3"> -->
					<view class="tn-flex tn-flex-row-around layer-3">
						<view class="justify-content-item">
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>月现金流：</text><text>999999999999</text>
								</tn-tag>
							</view>
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur" style="margin-top: 5rpx;">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>被动收入：</text><text>99999999999999</text>
								</tn-tag>
							</view>
						</view>

						<view class="justify-content-item">
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>存款：</text><text>10200000000</text>
								</tn-tag>
							</view>
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur" style="margin-top: 5rpx;">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>精力：</text><text>103</text>
								</tn-tag>
							</view>
						</view>

						<view class="justify-content-item">
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>总收入：</text><text>104</text>
								</tn-tag>
							</view>
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur" style="margin-top: 5rpx;">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>总支出：</text><text>105</text>
								</tn-tag>
							</view>
						</view>

						<view class="justify-content-item">
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>
									<text>慈善：</text><text>1111111111111111</text>
								</tn-tag>
							</view>
							<view class="tn-padding-xs tn-radius bg-flex-shadow tn-shadow-blur" style="margin-top: 5rpx;">
								<tn-tag
									width="22vw"
									height="64rpx"
									shape="circleRight"
									background-color="rgba(1, 190, 255, 0.8)"
									:font-size="1.7"
									font-unit="vw"
									font-color="tn-color-white"
									margin="2rpx 2rpx"
								>none</tn-tag>
							</view>
						</view>
					</view>
					<!-- 底层格子结束 -->
				</view>
				<!-- <view class="tn-padding-xl tn-margin-left-xs tn-margin-right-xs tn-margin-top-sm tn-margin-bottom-xs tn-radius bg-flex-shadow tn-shadow-blur">xxxxx</view> -->
				<!-- 底层结束 -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
/* 波浪*/
.template-outset {
	width: 100vw;
	height: 100vh;
	font-family: SimHei, sans-serif, monospace;
	background-image: linear-gradient(to top, #4c3fae 20%, #6e26ba 80%);
	.layer-1 {
		.outermost-1 {
			display: flex;
			flex-direction: column;
			height: 100vh;
			.top {
				flex: 1;
				// height: 20vh;
			}
			.middle {
				flex: 12;
				// height: 60vh;
				.layer-2 {
					height: 100%;
					.innermost-1 {
						display: flex;
						flex-direction: column;
						// height: 100%;
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
				}
			}
			.bottom {
				flex: 1;
				// height: 20vh;
				.layer-3 {
					height: 100%;
					background-color: rgba(68, 68, 68, 0.4);
					border-radius: 36rpx;
					// opacity: 0.5;
					.justify-content-item {
						display: flex;
						flex-direction: column;
						& > view {
							flex: 1;
						}
						.tn-tag {
							justify-content: space-between;
							font-weight: 700;
						}
					}
					& > .justify-content-item:last-child > view:last-child {
						// display: none;
						opacity: 0;
						// flex: 0.5;
						// margin-bottom: -10px;
					}
				}
			}
		}
	}
}

/* 内容容器 start */
.outermost-1 > .bg-flex-shadow:nth-child(-n + 2) {
	background-color: #e8ccff;
}
.innermost-1 > .bg-flex-shadow {
	background-color: #ffb3ff;
}
.innermost-2 > .bg-flex-shadow {
	background-color: #ffb3ff;
}
.innermost-3 > .bg-flex-shadow {
	background-color: #ffb3ff;
}
.layer-3 .bg-flex-shadow {
	// background-color: #ffb3ff;
}
/* 内容容器 end */
</style>
