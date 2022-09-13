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
								<view style="height: 100%;">
									<tn-button
										:shadow="true" width="15vw" height="auto" background-color="tn-cool-bg-color-16"
										:font-size="40" :font-bold="true" padding="2vw 10rpx" margin="10rpx 0"
										@click="showModel(1)"
									>
										<text>关闭房间</text>
									</tn-button>
								</view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>下一位</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>送钱（玩家生孩子随礼）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>发工资</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>扣钱（触犯规则）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>扣费抽卡</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>免费抽卡</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>发免费精力</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>发收费精力</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>玩家生孩子</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>玩家选择结婚纪念（日）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>心碎（逆流层失恋/逆流层离婚/顺流层离婚）</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>逆流层失业</text>
								</tn-button> </view>
								<view> <tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
									<text>顺流层破产</text>
								</tn-button> </view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>用户做慈善</text>
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
				</tn-popup>
			</view>

			<view> <tn-toast ref="toast" @closed="closeToast()"></tn-toast> </view>

			<!-- 模态框 -->
			<tn-modal
				v-model="is_show_model"
				background-color="#E4E9EC"
				width="84%"
				padding="30rpx 26rpx"
				:radius="12"
				font-color="#BA7027"
				:font-size="35"
				title="提示"
				:content="content"
				:button="button"
				:show-close-btn="true"
				:mask-closeable="true"
				:zoom="true"
				:custom="false"
				@click="clickBtn"
			>
				<!-- <view v-if="custom">
						<view class="custom-modal-content">
							<tn-form :label-width="140">
								<tn-form-item label="手机号码" :border-bottom="false">
									<tn-input placeholder="请输入手机号码"></tn-input>
								</tn-form-item>
								<tn-form-item label="验证码" :border-bottom="false">
									<tn-input placeholder="请输入验证码"></tn-input>
									<view slot="right" class="tn-flex tn-flex-col-center tn-flex-row-center">
										<tn-button :font-size="20" padding="10rpx" height="46rpx" background-color="#01BEFF" font-color="tn-color-white">获取验证码</tn-button>
									</view>
								</tn-form-item>
							</tn-form>
						</view>
					</view> -->
			</tn-modal>

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
			load_role: '',
			show_popup: false,
			// 模态框
			is_show_model: false,
			button: [
				{
					text: '取消',
					backgroundColor: '#A4E82F',
					fontColor: '#FFFFFF'
				},
				{
					text: '确定',
					backgroundColor: 'tn-bg-indigo',
					fontColor: '#FFFFFF'
				}
			],
			button_order: '',
			content: '',

			toast_significance: ''
		}
	},

	onLoad(options) {
		this.load_role = options.role
	},
	onShow() {
		getApp().globalData.manipulate = this
		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			if (this.load_role === 'admin') {
				uni.navigateTo({ url: '/pages/login-admin/index' })
			} else {
				uni.navigateTo({ url: '/pages/index/index' })
			}
		}
	},
	onHide() {
		console.log('隐藏manipulate组件')
		getApp().globalData.manipulate = null
	},

	methods: {
		// cutApart,
		changeTimer(e) {
			// console.log(e)
		},
		// changeCountTo(e) {
		// 	// console.log(e)
		// },
		showPopup() {
			this.show_popup = true
		},
		globalNotice(title, content, icon, significance) {
			this.$refs.toast.show({
				title,
				content,
				icon,
				image: '',
				duration: 1500
			})
			if (significance) this.toast_significance = significance
		},
		showModel(num) {
			if (num === 1) {
				this.content = '确定要关闭房间吗？'
				this.button_order = 1
			}
			this.is_show_model = true
		},
		clickBtn(event) {
			this.is_show_model = false
			// console.log(event.index)
			if (event.index === 1) {
				if (this.button_order === 1) {
					getApp().globalData.send({
						method: 'stopGame',
						data: getApp().globalData.gameKey
					})
				}
			}
		},
		closeToast() {
			if (this.toast_significance === 'stopGame') {
				this.toast_significance = ''
				if (getApp().globalData.role === 'admin') {
					uni.navigateTo({ url: '/pages/login-admin/index' })
				} else {
					uni.navigateTo({ url: '/pages/index/index' })
				}
			}
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
