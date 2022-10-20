<template>
	<view class="template-outset">
		<view class="tn-flex layer-1">
			<view class="tn-flex-1 outermost-1">
				<!-- 顶层开始 -->
				<view class="tn-flex tn-margin-xs tn-radius bg-flex-shadow top" style="padding: 1vh;">
					<!-- <view class="tn-bg-blue">1111111111111</view>
					<view class="tn-flex-1 tn-bg-red" style="width: 0;">000000000000000000000000009</view>
					<view class="tn-bg-blue">9222222222222</view> -->
					<view class="tn-flex tn-flex-center tn-flex-direction-column tn-text-center tn-radius" style="width: 10.6vh;padding: 0.5vh;">
						<view class="tn-border-solid-bottom tn-bold-border"> <Timer @timing="changeTimer"></Timer> </view>
						<view> <CountTo :font-size="2" font-unit="vh" :start-val="count_text" :end-val="0" :duration="90000" :use-easing="false" @change="changeCountTo"></CountTo> </view>
					</view>
					<view class="tn-flex-1" style="background-color: #e8ccff;position: relative;z-index: 6;width: 0vw;margin: 0 1vh;"> <HeadNavigationBar ref="RefHeadNav" @clickHead="showPopup"></HeadNavigationBar> </view>
					<view>
						<HeadHelp @clickBtn="handleHelp"></HeadHelp>
					</view>
				</view>
				<!-- 顶层结束 -->
				<!-- 中间层开始 -->
				<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle">
					<view class="tn-flex layer-2">
						<!-- 四个表格s -->
						<view class="tn-flex-6" :class="tableClass"> <TableDataes ref="RefTableMain"></TableDataes> </view>
						<!-- 四个表格e -->
						<view class="tn-flex-1 tn-padding-xs innermost-3">
							<!-- 右s -->
							<UserButton ref="RefUserButton" @clickBtn="handleProcessing"></UserButton>
							<!-- 右e -->
						</view>
					</view>
				</view>
				<!-- 中间层结束 -->
				<!-- 底层开始 -->
				<view class="tn-no-padding tn-margin-xs tn-radius bg-flex-shadow bottom">
					<!-- 底层格子开始 -->
					<Bottom ref="RefBottomMain"></Bottom>
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
					height="85%"
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

			<view> <tn-toast ref="toast" :is-clickable="true" :mask="false" :z-index="9" @closed="closeToast()"></tn-toast> </view>

			<view>
				<!-- 压屏窗-->
				<tn-landscape
					:show="is_show_landscape"
					:close-btn="close_btn_lan"
					close-color="#E83A30"
					:close-size="60"
					:close-position="close_position"
					:close-bottom="-80"
					:z-index="7"
					@close="clickLanBtn"
				>
					<view v-if="lan_significance === 'showNowCard'"><Cards :card="currentCard"></Cards></view>
					<view v-else-if="lan_significance === 'showAllCard'"><image src="https://tnuiimage.tnkjapp.com/landscape/2022-new-year.png" mode="widthFix"></image>1111 </view>
					<view v-else-if="lan_significance === 'showJournal'">
						<Journal></Journal>
					</view>
				</tn-landscape>
			</view>

			<view>
				<!-- 主动点击的模态框 -->
				<tn-modal
					v-model="is_show_model"
					background-color="#E4E9EC"
					width="60%"
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
					:z-index="4"
					@click="clickBtn"
				>
					<view v-if="popup_significance === 'loan'"> <Loan :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></Loan> </view>
					<view v-else-if="popup_significance === 'repayment'"> <Repayment :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></Repayment> </view>
					<view v-else-if="popup_significance === 'giveMoney'"> <GiveMoney :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></GiveMoney> </view>
					<view v-else-if="popup_significance === 'redeem'"> <Redeem :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></Redeem> </view>
					<view v-else-if="popup_significance === 'abandonSideline'"> <AbandonSideline :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></AbandonSideline> </view>
					<view v-else-if="popup_significance === 'litigate'"> <JobRelated :personal="my_info" sign="litigate" @cancel="clickBtn" @submit="clickBtn"></JobRelated> </view>
					<view v-else-if="popup_significance === 'hunting'"> <JobRelated :personal="my_info" sign="hunting" @cancel="clickBtn" @submit="clickBtn"></JobRelated> </view>
				</tn-modal>
			</view>

			<view>
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
						<DrawCard ref="RefDrawCard" :personal="my_info" classification="drawCard" @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard>
					</view>
					<view v-else-if="popup_significance_pa === 'receiveAuction'">
						<DrawCard ref="RefDrawCard" :personal="my_info" classification="receiveAuction" @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard>
					</view>
				</tn-modal>
			</view>
		</view>
	</view>
</template>

<script>
import Timer from '@/components/timer/timer.vue'
import CountTo from '@/components/count-to/count-to.vue'
import HeadNavigationBar from '@/components/head-navigation-bar/head-navigation-bar.vue'
import HeadHelp from '@/components/head-help/head-help.vue'
// import UpperLeft from '@/components/table/upper-left.vue'
// import LowerLeft from '@/components/table/lower-left.vue'
// import UpperMiddle from '@/components/table/upper-middle.vue'
// import LowerMiddle from '@/components/table/lower-middle.vue'
import TableDataes from '@/components/table/table-dataes.vue'
import UserButton from './user-child/user-button.vue'
import Bottom from '@/components/table/bottom.vue'

// 封装的模态框的自定义内容的组件(主动)
import Loan from './user-child/loan.vue'
import Repayment from './user-child/repayment.vue'
import GiveMoney from './user-child/give-money.vue'
import Redeem from './user-child/redeem.vue'
import AbandonSideline from './user-child/abandon-sideline.vue'
// import Litigate from './user-child/litigate.vue'
// import Hunting from './user-child/hunting.vue'
import JobRelated from './user-child/job-related.vue'

// 封装的模态框的自定义内容的组件(被动)
import DrawCard from '@/components/draw-card/draw-card.vue'

// 压屏窗
import Cards from '@/components/cards/cards.vue'
import Journal from '@/components/journal/journal.vue'

// 接口
import { GetUserInfo, RichCircle, ConfirmBillionaire } from 'config/api.js'

// 公共的方法
import setRecord from 'utils/render-table/render-table.js'

export default {
	components: { Timer, CountTo, HeadNavigationBar, HeadHelp, TableDataes, Bottom, UserButton, DrawCard, Loan, Repayment, GiveMoney, JobRelated, Redeem, AbandonSideline, Cards, Journal },
	data() {
		return {
			currentCard: getApp().globalData.currentCard,
			// load_role: '',
			count_text: '等待下一轮',
			my_info: '',
			tableClass: '',

			// 压窗屏
			lan_significance: '',
			is_show_landscape: false,
			close_position: '',
			close_btn_lan: true,

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
			// popup_significance_pa: 'drawCard',
			// is_show_model_pa: true,
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
			// custom_pa: true,

			toast_significance: '',

			popup_name: '',
			popup_id: '',
			show_popup: false
		}
	},

	onLoad(options) {
		getApp().globalData.game = this
		// this.load_role = options.role
		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			// if (this.load_role === 'admin') {
			// 	uni.redirectTo({ url: '/pages/login-admin/index' })
			// } else {
			uni.redirectTo({ url: '/pages/index/index' })
			// }
		} else {
			// 用户进入游戏后，获取用户数据
			this.syncInfo()
		}
	},
	onShow() {
		// getApp().globalData.game = this
	},
	onHide() {
		console.log('隐藏game组件')
		// getApp().globalData.game = null
	},
	onUnload() {
		console.log('卸载game组件')
		getApp().globalData.game = null
	},
	mounted() {
		this.syncAvatarStyle()
	},

	methods: {
		// cutApart,
		changeTimer(e) {
			// console.log(e)
		},
		changeCountTo(e) {
			// console.log(e)
		},

		// 压屏窗
		handleHelp(significance) {
			if (significance === 'showNowCard') {
				this.lan_significance = 'showNowCard'
				this.close_btn_lan = true
				this.close_position = 'bottom'
				this.currentCard = getApp().globalData.currentCard
				this.is_show_landscape = true
			} else if (significance === 'showAllCard') {
				this.lan_significance = 'showAllCard'
				this.close_btn_lan = false
				// this.close_position = 'rightTop'
				this.is_show_landscape = true
			} else if (significance === 'showJournal') {
				this.lan_significance = 'showJournal'
				this.close_btn_lan = false
				// this.close_position = 'rightTop'
				this.is_show_landscape = true
			}
		},

		// 主动
		handleProcessing(significance) {
			// if (significance === '关闭房间') {
			// 	this.popup_significance = '关闭房间'
			// 	this.title = '提示'
			// 	this.content = '确定要关闭房间吗？'
			// 	// this.button = false
			// 	this.close_btn = true
			// 	this.mask_closeable = true
			// 	this.custom = false
			// 	this.is_show_model = true
			// } else
			// this.globalNotice('提示', 'xxxxxh啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦', 'creative') // 用于测试消息框
			if (significance === 'loan') {
				this.popup_significance = 'loan'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'repayment') {
				this.popup_significance = 'repayment'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'giveMoney') {
				this.popup_significance = 'giveMoney'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'redeem') {
				this.popup_significance = 'redeem'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'abandonSideline') {
				this.popup_significance = 'abandonSideline'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'litigate') {
				this.popup_significance = 'litigate'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'hunting') {
				this.popup_significance = 'hunting'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			}
		},
		// 被动收到的模态框
		handleManage(significance) {
			this.is_show_model_pa = false
			if (significance) {
				this.$nextTick(() => {
					if (significance === 'drawCard') {
						this.popup_significance_pa = 'drawCard'
						this.close_btn_pa = false
						this.mask_closeable_pa = false
						this.custom_pa = true
						this.is_show_model_pa = true
					} else if (significance === 'receiveAuction') {
						this.popup_significance_pa = 'receiveAuction'
						this.close_btn_pa = false
						this.mask_closeable_pa = false
						this.custom_pa = true
						this.is_show_model_pa = true
					}
				})
			}
		},

		showPopup(name, id, status) {
			if (status === 0) {
				if (String(id) === getApp().globalData.gameUserId) {
					setRecord(this.my_info, 'Eject', this)
				} else {
					GetUserInfo({ game_user_id: id, game_id: getApp().globalData.gameId })
						.then((res) => {
							const data = res[1].data.data
							setRecord(data, 'Eject', this)
						})
						.catch((err) => {
							console.log(err)
						})
				}
			} else if (String(id) === getApp().globalData.gameUserId) {
				// 点的是自己
				if (this.is_show_model_pa || this.is_show_model) {
					if (this.show_popup) {
						this.show_popup = false
						this.popup_name = ''
						this.popup_id = ''
					} else {
						this.show_popup = true
						this.popup_name = name
						this.popup_id = id
						this.$nextTick(() => {
							setRecord(this.my_info, 'Eject', this)
						})
					}
				} else if (this.show_popup) {
					// 应该没这种情况
					this.show_popup = false
					this.popup_name = ''
					this.popup_id = ''
					this.tableClass = 'table-ani'
					setTimeout(() => {
						this.tableClass = ''
					}, 2000)
				} else {
					this.tableClass = 'table-ani'
					setTimeout(() => {
						this.tableClass = ''
					}, 2000)
				}
			} else if (this.show_popup) {
				// 点的是别人，并且 有被或主 和 无被主 的情况一样
				// 如果是开着
				this.show_popup = false
				this.popup_name = ''
				this.popup_id = ''
				setTimeout(() => {
					this.$nextTick(() => {
						this.show_popup = true
						this.popup_name = name
						this.popup_id = id
						GetUserInfo({ game_user_id: id, game_id: getApp().globalData.gameId })
							.then((res) => {
								const data = res[1].data.data
								setRecord(data, 'Eject', this)
							})
							.catch((err) => {
								console.log(err)
							})
					})
				}, 300)
			} else {
				// 如果是关着
				this.show_popup = true
				this.popup_name = name
				this.popup_id = id
				GetUserInfo({ game_user_id: id, game_id: getApp().globalData.gameId })
					.then((res) => {
						const data = res[1].data.data
						setRecord(data, 'Eject', this)
					})
					.catch((err) => {
						console.log(err)
					})
			}
			// if (String(id) === getApp().globalData.gameUserId) {
			// 	if (this.is_show_model_pa) {
			// 		this.show_popup = true
			// 		this.popup_name = name
			// 		this.popup_id = id
			// 		this.$nextTick(() => {
			// 			setRecord(this.my_info, 'Eject', this)
			// 		})
			// 	} else {
			// 		this.tableClass = 'table-ani'
			// 		setTimeout(() => {
			// 			this.tableClass = ''
			// 		}, 2000)
			// 	}
			// } else {
			// 	GetUserInfo({ game_user_id: id, game_id: getApp().globalData.gameId })
			// 		.then((res) => {
			// 			const data = res[1].data.data
			// 			setRecord(data, 'Eject', this)
			// 		})
			// 		.catch((err) => {
			// 			console.log(err)
			// 		})
			// 	this.show_popup = true
			// 	this.popup_name = name
			// 	this.popup_id = id
			// }
		},

		globalNotice(title, content, icon, significance) {
			this.$refs.toast.show({
				title,
				content,
				icon,
				image: '',
				duration: 3200
			})
			if (significance) this.toast_significance = significance
		},
		syncAvatarStyle() {
			this.$refs.RefHeadNav.syncAvatarStyle()
			this.$refs.RefDrawCard && this.$refs.RefDrawCard.syncAvatarStyle()
			const temp_id = getApp().globalData.round[0]
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === temp_id)
			if (temp_obj) {
				if (temp_id === getApp().globalData.gameUserId) {
					this.count_text = 90
				} else {
					this.count_text = `${temp_obj.userName}的回合`
				}
			}
			this.$refs.RefUserButton.syncButton()
		},
		clickLanBtn(event) {
			this.is_show_landscape = false
		},
		clickPaBtn(event) {
			this.is_show_model_pa = false
		},
		// 关闭模态框触发
		clickBtn(event) {
			this.is_show_model = false
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
		},
		syncInfo(meaning) {
			if (meaning === 'myTurn') {
				// 下一回合时，所有用户都不能看到抽卡或转让卡的那个被动的模态框了
				if (this.is_show_model_pa && (this.popup_significance_pa === 'drawCard' || this.popup_significance_pa === 'receiveAuction')) {
					this.clickPaBtn()
				}
				// 下一回合时，所有（或上一回合）用户不能看到 打官司和找工作和放弃某副业 的那个主动的模态框了
				if (this.is_show_model && (this.popup_significance === 'litigate' || this.popup_significance === 'hunting' || this.popup_significance === 'abandonSideline')) {
					this.clickBtn()
				}
			}
			// if (meaning === 'closeAc' && this.is_show_model && (this.popup_significance === 'loan' || this.popup_significance === 'repayment' || this.popup_significance === 'giveMoney')) this.is_show_model = false
			GetUserInfo({ game_user_id: getApp().globalData.gameUserId, game_id: getApp().globalData.gameId })
				.then((res) => {
					const data = res[1].data.data
					setRecord(data, 'Main', this)
					this.my_info = data
					this.show_popup && this.showPopup(this.popup_name, this.popup_id, 0)
					if (!data.basic_info.is_rich_circle && (data.basic_info.passive_in > data.basic_info.basics_out)) {
						RichCircle({
							game_id: Number(getApp().globalData.gameId),
							game_user_id: Number(getApp().globalData.gameUserId)
						})
							.then((res) => {
								if (res[1].data.status === 200) {
								} else {
								}
							})
							.catch((err) => {
								console.log(err)
							})
					} else if (meaning !== 'victory' && data.basic_info.is_rich_circle && (data.basic_info.cash_on_hand - data.basic_info.debt_bank_loan > 100000000)) {
						ConfirmBillionaire({
							game_id: Number(getApp().globalData.gameId),
							game_user_id: Number(getApp().globalData.gameUserId)
						})
							.then((res) => {
								if (res[1].data.status === 200) {
								} else {
								}
							})
							.catch((err) => {
								console.log(err)
							})
					} else if (meaning === 'drawCard') {
						this.handleManage('drawCard')
					} else if (meaning === 'receiveAuction') {
						this.handleManage('receiveAuction')
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}

	}
}
</script>

<style lang="scss" scoped>
@keyframes table-ani {
	0% {
		opacity: 0.4;
		box-shadow: 0 0 10px 3px #ff0000;
	}
	25% {
		opacity: 1;
		box-shadow: none;
	}
	50% {
		opacity: 0.4;
		box-shadow: 0 0 10px 3px #ff0000;
	}
	75% {
		opacity: 1;
		box-shadow: none;
	}
	100% {
		opacity: 0.4;
		box-shadow: 0 0 10px 3px #ff0000;
	}
}

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
				// flex: 1;
				// height: 20vh;
				overflow-x: hidden;
				overflow-y: auto;
				// white-space: nowrap;
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
					.table-ani {
						animation: table-ani 2s 1;
					}
					.innermost-3 {
						// display: flex;
						// flex-direction: column;
						.middle-r1 {
							// flex: 1;
						}
					}
				}
			}
			.bottom {
				flex: 2;
				// height: 20vh;
				overflow: auto;
			}
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
.innermost-3 > .bg-flex-shadow {
	background-color: #ffb3ff;
}
/* 内容容器 end */
</style>
