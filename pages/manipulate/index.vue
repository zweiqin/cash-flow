<template>
	<view class="template-outset">
		<view class="tn-flex layer-1">
			<view class="tn-flex-1 outermost-1">
				<!-- 顶层开始 -->
				<view class="tn-flex tn-padding-sm tn-margin-xs tn-radius bg-flex-shadow top">
					<!-- <tn-count-down :timestamp="900" :font-size="60" :separator-size="60"></tn-count-down> -->
					<view class="tn-flex tn-flex-center tn-flex-direction-column tn-flex-1 tn-bg-white tn-text-center tn-padding-xs tn-radius">
						<view class="tn-border-solid-bottom tn-bold-border"> <Timer @timing="changeTimer"></Timer> </view>
						<!-- <tn-count-to :start-val="90" :end-val="0" :duration="90000" :use-easing="false"></tn-count-to> -->
						<view class=""> <CountTo :font-size="2" font-unit="vh" :start-val="count_text" @change="changeCountTo"></CountTo> </view>
					</view>
					<view class="tn-flex-9">
						<HeadNavigationBar ref="RefHeadNav" @clickHead="showPopup" @notice="globalNotice"></HeadNavigationBar>
					</view>
				</view>
				<!-- 顶层结束 -->
				<!-- 中间层开始 -->
				<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle">
					<view class="tn-flex layer-2">
						<view class="tn-flex-1 innermost-3">
							<!-- 右s -->
							<!-- 弹出被动收到的模态框时，动态改变align-content，关闭房间按钮的height，其它按钮的width -->
							<view class="tn-flex tn-flex-direction-column tn-flex-wrap tn-padding-xs tn-radius bg-flex-shadow middle-r1" :style="{alignContent: align_content_btn}">
								<!-- 按钮s -->
								<view :style="{height: close_btn_height}">
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
								<view v-for="(item, index) in button_right" :key="index" class="tn-shadow-blur" style="z-index: 4;">
									<tn-button :shadow="true" :width="rest_btn_width" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing(item.meaning)">
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
					:z-index="5"
				>
					<view class="tn-height-full tn-flex tn-flex-row-right tn-flex-direction-column">
						<!-- <tn-button shape="round" width="220rpx" font-color="#080808">关闭弹窗</tn-button> -->
						<view class="tn-flex-1 popup-name">{{ popup_name }}的个人信息</view> <view class="" style="height: 75%;"><TableDataes ref="RefTableEject"></TableDataes></view>
						<view class="tn-flex-2"><Bottom ref="RefBottomEject"></Bottom></view>
					</view>
				</tn-popup>
			</view>

			<view> <tn-toast ref="toast" :z-index="8" @closed="closeToast()"></tn-toast> </view>

			<!-- 主动点击的模态框 -->
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
				:z-index="6"
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
					<DebitCard text="扣费抽卡" :is-free="0" @cancel="clickBtn" @submit="clickBtn"></DebitCard>
				</view>
				<view v-else-if="popup_significance === 'drawCard'">
					<DebitCard text="免费抽卡" :is-free="0" icon="add" @cancel="clickBtn" @submit="clickBtn"></DebitCard>
				</view>
				<view v-else-if="popup_significance === 'freeEnergy'">
					<FreeEnergy @cancel="clickBtn" @submit="clickBtn"></FreeEnergy>
				</view>
				<view v-else-if="popup_significance === 'anniversary'">
					<Anniversary @cancel="clickBtn" @submit="clickBtn"></Anniversary>
				</view>
				<view v-else-if="popup_significance === 'givesBirth'">
					<GivesBirth @cancel="clickBtn" @submit="clickBtn"></GivesBirth>
				</view>
			</tn-modal>

			<!-- 被动收到的模态框 -->
			<tn-modal
				v-model="is_show_model_pa"
				background-color="#E4E9EC"
				width="64%"
				padding="30rpx 26rpx"
				:radius="12"
				font-color="#BA7027"
				:font-size="35"
				:title="title_pa"
				:content="content_pa"
				:button="button_pa"
				:show-close-btn="close_btn_pa"
				:mask-closeable="mask_closeable_pa"
				:zoom="true"
				:custom="custom_pa"
				:z-index="2"
				@click="clickPaBtn"
			>
				<view v-if="popup_significance_pa === 'drawCard'">
					<DrawCard @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard>
				</view>
				<!-- <view v-else-if="popup_significance_pa === 'wasteMoney'">
					<WasteMoney @cancel="clickPaBtn" @submit="clickPaBtn"></WasteMoney>
				</view> -->
			</tn-modal>

		</view>
	</view>
</template>

<script>
import Timer from '@/components/timer/timer.vue'
import CountTo from '@/components/count-to/count-to.vue'
import HeadNavigationBar from '@/components/head-navigation-bar/head-navigation-bar.vue'
// import UpperLeft from '../game/user-child/upper-left.vue'
// import LowerLeft from '../game/user-child/lower-left.vue'
// import UpperMiddle from '../game/user-child/upper-middle.vue'
// import LowerMiddle from '../game/user-child/lower-middle.vue'
import TableDataes from '@/components/table/table-dataes.vue'
import Bottom from '@/components/table/bottom.vue'

// 封装的模态框的自定义内容的组件(主动)
import Next from './admin-child/next.vue'
import WasteMoney from './admin-child/waste-money.vue'
import PayOff from './admin-child/pay-off.vue'
import DeductMoney from './admin-child/deduct-money.vue'
import DebitCard from './admin-child/debit-card.vue' // 二合一
import FreeEnergy from './admin-child/free-energy.vue'
import Anniversary from './admin-child/anniversary.vue'
import GivesBirth from './admin-child/gives-birth.vue'

// 封装的模态框的自定义内容的组件(被动)
import DrawCard from '@/components/draw-card/draw-card.vue'

// 接口
import { GetCardCategoryList, GetUserInfo } from 'config/api.js'

// 公共的方法
import setRecord from 'utils/render-table/render-table.js'

export default {
	components: { Timer, CountTo, HeadNavigationBar, TableDataes, Bottom, Next, WasteMoney, PayOff, DeductMoney, DebitCard, FreeEnergy, Anniversary, GivesBirth, DrawCard },
	data() {
		return {
			// load_role: '',
			count_text: '等待下一轮',

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

			// 主动点击的模态框
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

			// 被动收到的模态框
			popup_significance_pa: '',
			is_show_model_pa: false,
			title_pa: '提示',
			content_pa: '',
			button_pa: [
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
			close_btn_pa: true,
			mask_closeable_pa: true,
			custom_pa: false,

			// 弹出被动收到的模态框时，动态改变的样式
			align_content_btn: 'space-around',
			close_btn_height: '100%',
			rest_btn_width: '30vw',

			toast_significance: '',

			popup_name: '',
			popup_id: '',
			show_popup: false
		}
	},

	watch: {
		is_show_model_pa(newVal, oldVal) {
			if (newVal) {
				this.align_content_btn = 'space-between'
				this.close_btn_height = 'auto'
				this.rest_btn_width = '15vw'
			} else {
				this.align_content_btn = 'space-around'
				this.close_btn_height = '100%'
				this.rest_btn_width = '30vw'
			}
		}
	},

	onLoad(options) {
		getApp().globalData.manipulate = this
		// this.load_role = options.role
		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			// if (this.load_role === 'admin') {
			uni.redirectTo({ url: '/pages/login-admin/index' })
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

		// 主动
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
			} else if (significance === 'drawCard') {
				this.popup_significance = 'drawCard'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'freeEnergy') {
				this.popup_significance = 'freeEnergy'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'anniversary') {
				this.popup_significance = 'anniversary'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'givesBirth') {
				this.popup_significance = 'givesBirth'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			}
		},
		// 被动收到的模态框
		handleManage(significance) {
			this.is_show_model_pa = false
			this.$nextTick(() => {
				if (significance === 'drawCard') {
					this.popup_significance_pa = 'drawCard'
					this.close_btn_pa = false
					this.mask_closeable_pa = false
					this.custom_pa = true
					this.is_show_model_pa = true
				}
			})
		},

		showPopup(name, id) {
			GetUserInfo({ game_user_id: id, game_id: getApp().globalData.gameId })
				.then((res) => {
					const data = res[1].data.data
					setRecord(data, 'Eject', this)
				})
				.catch((err) => {
					console.log(err)
				})
			this.show_popup = true
			this.popup_name = name
			this.popup_id = id
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
		syncAvatarStyle() {
			this.$refs.RefHeadNav.syncAvatarStyle()
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				this.count_text = `${temp_obj.userName}的回合`
			}
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
		clickPaBtn(event) {
			this.is_show_model_pa = false
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
