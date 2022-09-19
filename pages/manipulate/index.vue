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
						<view class="tn-flex tn-flex-row-center tn-flex-wrap tn-text-center">
							<view v-for="(item,index) in appListId" :key="item.id" class="tn-padding-xs tn-padding-left-xl" @click="showPopup(item.userName, item.id)">
								<view style="width: 3.2vw;height: 3.2vw;margin:0 auto 5px;border-radius: 50%;" :class="(round[1]-1) === index ? 'my-turn' : ''"> <tn-avatar icon="constellation" size="3.2vw"></tn-avatar> </view>
								<view>{{ item.userName }}</view>
								<view>{{ item.roleName }}</view>
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
										:shadow="true"
										width="15vw"
										height="auto"
										background-color="tn-cool-bg-color-16"
										:font-size="40"
										:font-bold="true"
										padding="2vw 10rpx"
										margin="10rpx 0"
										@click="handleProcessing('关闭房间')"
									>
										<text>关闭房间</text>
									</tn-button>
								</view>
								<view v-for="(item, index) in button_right" :key="index">
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing(item.meaning)">
										<text>{{ item.name }}</text>
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
					<view class="tn-height-full tn-flex tn-flex-row-right tn-flex-direction-column">
						<!-- <tn-button shape="round" width="220rpx" font-color="#080808">关闭弹窗</tn-button> -->
						<view class="tn-flex-1 popup-name">{{ popup_name }}的个人信息</view> <view class="" style="height: 75%;"><TableDataes ref="RefTableEject"></TableDataes></view>
						<view class="tn-flex-2"><Bottom ref="RefBottomEject"></Bottom></view>
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
				:title="title"
				:content="content"
				:button="button"
				:show-close-btn="close_btn"
				:mask-closeable="mask_closeable"
				:zoom="true"
				:custom="custom"
				:z-index="2"
				@click="clickBtn"
			>
				<view v-if="popup_significance === 'next'">
					<Next @cancel="clickBtn" @submit="clickBtn"></Next>
				</view>
				<view v-else-if="popup_significance === 'wasteMoney'">
					<WasteMoney @cancel="clickBtn" @submit="clickBtn"></WasteMoney>
				</view>
				<view v-else-if="popup_significance === 'payOff'">
					<PayOff @cancel="clickBtn" @submit="clickBtn"></PayOff>
				</view>
				<view v-else-if="popup_significance === 'deductMoney'">
					<DeductMoney @cancel="clickBtn" @submit="clickBtn"></DeductMoney>
				</view>
				<view v-else-if="popup_significance === 'debitCard'">
					<DebitCard @cancel="clickBtn"></DebitCard>
				</view>
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
import TableDataes from '@/components/table/table-dataes.vue'
import Bottom from '@/components/table/bottom.vue'
// import cutApart from '@/utils/cut-apart/cut-apart.js'

// 封装的模态框的自定义内容的组件
import Next from './admin-child/next.vue'
import WasteMoney from './admin-child/waste-money.vue'
import PayOff from './admin-child/pay-off.vue'
import DeductMoney from './admin-child/deduct-money.vue'

import DebitCard from './admin-child/debit-card.vue'

// 接口
import { GetCardCategoryList, GetUserInfo } from 'config/api.js'

// 公共的方法
import setRecord from 'utils/render-table/render-table.js'

export default {
	components: { Timer, TableDataes, Bottom, Next, WasteMoney, PayOff, DeductMoney, DebitCard },
	data() {
		return {
			// load_role: '',

			// 按钮列表
			button_right: [
				{
					name: '下一位',
					meaning: 'next'
				}, {
					name: '送钱',
					meaning: 'wasteMoney'
				}, {
					name: '发工资',
					meaning: 'payOff'
				}, {
					name: '扣钱（触犯规则）',
					meaning: 'deductMoney'
				}, {
					name: '扣费抽卡',
					meaning: 'debitCard'
				}, {
					name: '免费抽卡',
					meaning: 'drawCard'
				}, {
					name: '玩家休息精力补充',
					meaning: 'freeEnergy'
				}, {
					name: '玩家选择结婚纪念（日）/结算日的精力补充',
					meaning: 'anniversary'
				}, {
					name: '玩家生孩子',
					meaning: 'givesBirth'
				}, {
					name: '心碎（逆流层失恋/逆流层离婚/顺流层离婚）',
					meaning: 'heartbreak'
				}, {
					name: '逆流层失业',
					meaning: 'unemployment'
				}, {
					name: '顺流层破产',
					meaning: 'bankruptcy'
				}, {
					name: '用户做慈善',
					meaning: 'charitable'
				}
			],

			show_popup: false,

			// 模态框
			popup_significance: '',
			is_show_model: false,
			title: '提示',
			content: '',
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
			close_btn: true,
			mask_closeable: true,
			custom: false,

			toast_significance: '',

			// appListData: getApp().globalData.appListData,
			appListId: getApp().globalData.appListId,
			round: getApp().globalData.round,

			popup_name: ''
		}
	},

	onLoad(options) {
		getApp().globalData.manipulate = this
		// this.load_role = options.role
		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			// if (this.load_role === 'admin') {
			// uni.redirectTo({ url: '/pages/login-admin/index' })
			// } else {
			// uni.redirectTo({ url: '/pages/index/index' })
			// }
		} else {
			this.getCardCategoryList()
		}
	},
	onShow() {
		// getApp().globalData.manipulate = this
	},
	onHide() {
		console.log('隐藏manipulate组件')
		// getApp().globalData.manipulate = null
	},
	onUnload() {
		console.log('卸载manipulate组件')
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

		getCardCategoryList() {
			GetCardCategoryList({})
				.then((res) => {
					// console.log(res[1].data.data)
					getApp().globalData.cardCategoryList = res[1].data.data
				})
				.catch((err) => {
					console.log(err)
				})
		},

		handleProcessing(significance) {
			if (significance === '关闭房间') {
				this.popup_significance = '关闭房间'
				this.title = '提示'
				this.content = '确定要关闭房间吗？'
				// this.button = false
				this.close_btn = true
				this.mask_closeable = true
				this.custom = false
				this.is_show_model = true
			} else if (significance === 'next') {
				this.popup_significance = 'next'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'wasteMoney') {
				this.popup_significance = 'wasteMoney'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'payOff') {
				this.popup_significance = 'payOff'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'deductMoney') {
				this.popup_significance = 'deductMoney'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'debitCard') {
				this.popup_significance = 'debitCard'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			}
		},

		showPopup(name, id) {
			// this.appListId = getApp().globalData.appListId
			GetUserInfo({ game_user_id: id, game_id: getApp().globalData.gameId })
			// GetUserInfo({ id: 31, game_id: 22 })
				.then((res) => {
					// console.log(res[1].data.data)
					const data = res[1].data.data
					setRecord(data, 'Eject', this)
				})
				.catch((err) => {
					console.log(err)
				})
			this.show_popup = true
			this.popup_name = name
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
		// syncUserList() {
		// 	this.appListData = getApp().globalData.appListData
		// 	// console.log(this.appListData)
		// },
		syncAvatarStyle() {
			// 同步头像样式
			this.round = getApp().globalData.round
		},
		// 关闭模态框触发
		clickBtn(event) {
			this.is_show_model = false
			// console.log(event)
			if (this.popup_significance === '关闭房间') {
				if (event.index === 1) {
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
					uni.redirectTo({ url: '/pages/login-admin/index' })
				} else {
					uni.redirectTo({ url: '/pages/index/index' })
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
				.my-turn {
					box-shadow: 0px -5px 10px 0px #ff0000, -6px 0px 6px 0px #ff0000, 6px 0px 6px 0px #ff0000, 0px 5px 19px 0px #ff0000;
				}
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

		.popup-name {
			padding-top: 55rpx;
			font-size: 40rpx;
			font-weight: 700;
			color: #ffffff;
			text-align: center;
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
