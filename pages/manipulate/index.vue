<template>
	<view class="template-outset">
		<view class="tn-flex layer-1">
			<view class="tn-flex-1 outermost-1">
				<!-- 顶层开始 -->
				<view class="tn-flex tn-margin-xs tn-radius bg-flex-shadow top" style="padding: 1vh;">
					<!-- <tn-count-down :timestamp="900" :font-size="60" :separator-size="60"></tn-count-down> -->
					<view class="tn-flex tn-flex-center tn-flex-direction-column tn-bg-white tn-text-center tn-radius" style="width: 10.6vh;padding: 0.5vh;">
						<view class="tn-border-solid-bottom tn-bold-border"> <Timer @timing="changeTimer"></Timer> </view>
						<!-- <tn-count-to :start-val="90" :end-val="0" :duration="90000" :use-easing="false"></tn-count-to> -->
						<view> <CountTo :font-size="2" font-unit="vh" :start-val="count_text" @change="changeCountTo"></CountTo> </view>
					</view>
					<view class="tn-flex-1" style="background-color: #e8ccff;position: relative;z-index: 6;width: 0;margin: 0 1vh;"> <HeadNavigationBar ref="RefHeadNav" @clickHead="showPopup"></HeadNavigationBar> </view>
					<view>
						<HeadHelp @clickBtn="handleHelp"></HeadHelp>
					</view>
				</view>
				<!-- 顶层结束 -->
				<!-- 中间层开始 -->
				<view class="tn-padding-xs tn-margin-xs tn-radius bg-flex-shadow middle">
					<view class="layer-2">
						<view class="innermost-3">
							<!-- 右s -->
							<!-- <AdminButton :is-show-model-pa="is_show_model_pa" @clickBtn="handleProcessing"></AdminButton> -->
							<AdminButton @clickBtn="handleProcessing"></AdminButton>
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

			<view> <tn-toast ref="toast" :is-clickable="true" :mask="false" :z-index="8" @closed="closeToast()"></tn-toast> </view>

			<view>
				<!-- 压屏窗-->
				<tn-landscape
					:show="is_show_landscape"
					:close-btn="true"
					close-color="#E83A30"
					:close-size="60"
					:close-position="close_position"
					:close-bottom="-80"
					:z-index="7"
					@close="clickLanBtn"
				>
					<view v-if="lan_significance === 'showNowCard'"><Cards :card="currentCard"></Cards></view>
					<view v-else-if="lan_significance === 'showAllCard'"><image src="https://tnuiimage.tnkjapp.com/landscape/2022-new-year.png" mode="widthFix"></image>1111 </view>
				</tn-landscape>
			</view>

			<view>
				<!-- 主动点击的模态框 -->
				<tn-modal
					v-model="is_show_model"
					background-color="#E4E9EC"
					width="50%"
					height="100%"
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
					<view v-if="popup_significance === 'next'"> <DuplicateCom sign="next" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'wasteMoney'"> <WasteMoney @cancel="clickBtn" @submit="clickBtn"></WasteMoney> </view>
					<view v-else-if="popup_significance === 'payOff'"> <DuplicateCom sign="payOff" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'deductMoney'"> <DeductMoney @cancel="clickBtn" @submit="clickBtn"></DeductMoney> </view>
					<view v-else-if="popup_significance === 'debitCard'"> <DebitCard :card-debit="card_debit" @cancel="clickBtn" @submit="clickBtn"></DebitCard> </view>
					<!-- <view v-else-if="popup_significance === 'drawCard'"> <DebitCard text="免费抽卡" :is-free="1" icon="add" @cancel="clickBtn" @submit="clickBtn"></DebitCard> </view> -->
					<view v-else-if="popup_significance === 'freeEnergy'"> <DuplicateCom sign="freeEnergy" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'anniversary'"> <DuplicateCom sign="anniversary" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'givesBirth'"> <DuplicateCom sign="givesBirth" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'heartbreak'"> <DuplicateCom sign="heartbreak" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'unemployment'"> <DuplicateCom sign="unemployment" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'fall'"> <DuplicateCom sign="fall" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'charitable'"> <DuplicateCom sign="charitable" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'charity'"> <DuplicateCom sign="charity" @cancel="clickBtn" @submit="clickBtn"></DuplicateCom> </view>
					<view v-else-if="popup_significance === 'trustPrice'"> <TrustPrice :personal="turn_info" @cancel="clickBtn" @submit="clickBtn"></TrustPrice> </view>
					<view v-else-if="popup_significance === 'riskInvestment'"> <RiskInvestment @cancel="clickBtn" @submit="clickBtn"></RiskInvestment> </view>
					<view v-else-if="popup_significance === 'riskReturn'"> <RiskReturn @cancel="clickBtn" @submit="clickBtn"></RiskReturn> </view>
					<view v-else-if="popup_significance === 'dreamer'"> <Dreamer @cancel="clickBtn" @submit="clickBtn"></Dreamer> </view>
				</tn-modal>
			</view>

			<view v-show="!is_stow">
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
					:z-index="3"
					@click="clickPaBtn"
				>
					<view v-if="popup_significance_pa === 'drawCard'"> <DrawCard ref="RefDrawCard" classification="drawCard" @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard> </view>
					<view v-else-if="popup_significance_pa === 'receiveAuction'">
						<DrawCard ref="RefDrawCard" classification="receiveAuction" @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard>
					</view>
					<view v-else-if="popup_significance_pa === 'lookForJob'"> <ConfirmPoints classification="lookForJob" @submit="clickPaBtn"></ConfirmPoints> </view>
					<view v-else-if="popup_significance_pa === 'litigate'"> <ConfirmPoints classification="litigate" @submit="clickPaBtn"></ConfirmPoints> </view>
				</tn-modal>
			</view>

			<view v-if="is_stow && popup_significance_pa === 'drawCard' && is_show_model_pa">
				<!-- 重新显示抽卡组件的悬浮按钮-->
				<nav-index-button :right="150" @click="is_stow=false"></nav-index-button>
			</view>

		</view>
	</view>
</template>

<script>
import Timer from '@/components/timer/timer.vue'
import CountTo from '@/components/count-to/count-to.vue'
import HeadNavigationBar from '@/components/head-navigation-bar/head-navigation-bar.vue'
import HeadHelp from '@/components/head-help/head-help.vue'
// import UpperLeft from '../game/user-child/upper-left.vue'
// import LowerLeft from '../game/user-child/lower-left.vue'
// import UpperMiddle from '../game/user-child/upper-middle.vue'
// import LowerMiddle from '../game/user-child/lower-middle.vue'
import TableDataes from '@/components/table/table-dataes.vue'
import AdminButton from './admin-child/admin-button.vue'
import Bottom from '@/components/table/bottom.vue'

// 封装的模态框的自定义内容的组件(主动)
import DuplicateCom from './admin-child/duplicate-com.vue'
// import Next from './admin-child/next.vue'
import WasteMoney from './admin-child/waste-money.vue'
// import PayOff from './admin-child/pay-off.vue'
import DeductMoney from './admin-child/deduct-money.vue'
import DebitCard from './admin-child/debit-card.vue' // 二合一
// import FreeEnergy from './admin-child/free-energy.vue'
// import Anniversary from './admin-child/anniversary.vue'
// import GivesBirth from './admin-child/gives-birth.vue'
// import Heartbreak from './admin-child/heartbreak.vue'
import TrustPrice from './admin-child/trust-price.vue'
import RiskInvestment from './admin-child/risk-investment.vue'
import RiskReturn from './admin-child/risk-return.vue'
import Dreamer from './admin-child/dreamer.vue'

// 封装的模态框的自定义内容的组件(被动)
import DrawCard from '@/components/draw-card/draw-card.vue'
import ConfirmPoints from './admin-child/confirm-points.vue'

// 压屏窗
import Cards from '@/components/cards/cards.vue'

// 重新显示抽卡组件的悬浮按钮
import NavIndexButton from '@/libs/components/nav-index-button.vue'

// 接口
import { GetUserInfo, NextUser } from 'config/api.js'

// 公共的方法
import setRecord from 'utils/render-table/render-table.js'

export default {
	components: {
		Timer,
		CountTo,
		HeadNavigationBar,
		HeadHelp,
		TableDataes,
		AdminButton,
		Bottom,
		DuplicateCom,
		WasteMoney,
		DeductMoney,
		DebitCard,
		TrustPrice,
		RiskInvestment,
		RiskReturn,
		Dreamer,
		DrawCard,
		ConfirmPoints,
		Cards,
		NavIndexButton
	},
	data() {
		return {
			currentCard: getApp().globalData.currentCard,
			// load_role: '',
			count_text: '等待下一轮',
			turn_info: '',

			// 压窗屏
			lan_significance: '',
			is_show_landscape: false,
			close_position: '',

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

			// 传入DebitCard组件
			card_debit: '',

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
			is_stow: true,

			toast_significance: '',

			popup_name: '',
			popup_id: '',
			show_popup: false
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
		//
		} else {
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
	mounted() {
		this.syncAvatarStyle()
	},

	methods: {
		// cutApart,
		changeTimer(e) {
			// console.log(e)
		},
		// changeCountTo(e) {
		// 	// console.log(e)
		// },

		// 压屏窗
		handleHelp(significance) {
			if (significance === 'showNowCard') {
				this.lan_significance = 'showNowCard'
				this.close_position = 'bottom'
				this.currentCard = getApp().globalData.currentCard
				this.is_show_landscape = true
			} else if (significance === 'showAllCard') {
				this.lan_significance = 'showAllCard'
				this.close_position = 'bottom'
				this.is_show_landscape = true
			}
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
			} else if (significance.startsWith('debitCard')) {
				this.popup_significance = 'debitCard'
				this.card_debit = significance.substring(9)
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
			} else if (significance === 'heartbreak') {
				this.popup_significance = 'heartbreak'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'unemployment') {
				this.popup_significance = 'unemployment'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'fall') {
				this.popup_significance = 'fall'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'charitable') {
				this.popup_significance = 'charitable'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'charity') {
				this.popup_significance = 'charity'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'trustPrice') {
				this.popup_significance = 'trustPrice'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'riskInvestment') {
				this.popup_significance = 'riskInvestment'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'riskReturn') {
				this.popup_significance = 'riskReturn'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			} else if (significance === 'dreamer') {
				this.popup_significance = 'dreamer'
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
						this.is_stow = false
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
					} else if (significance === 'lookForJob') {
						this.popup_significance_pa = 'lookForJob'
						this.close_btn_pa = false
						this.mask_closeable_pa = false
						this.custom_pa = true
						this.is_show_model_pa = true
					} else if (significance === 'litigate') {
						this.popup_significance_pa = 'litigate'
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
				if (String(id) === getApp().globalData.round[0]) {
					setRecord(this.turn_info, 'Eject', this)
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
			} else if (String(id) === getApp().globalData.round[0]) {
				if (this.show_popup) {
					// 点的是当前轮玩家，并且 有被或主 和 无被主 的情况一样
					// 如果是开着
					this.show_popup = false
					this.popup_name = ''
					this.popup_id = ''
					setTimeout(() => {
						this.$nextTick(() => {
							this.show_popup = true
							this.popup_name = name
							this.popup_id = id
							this.$nextTick(() => {
								setRecord(this.turn_info, 'Eject', this)
							})
						})
					}, 300)
				} else {
					// 如果是关着
					this.show_popup = true
					this.popup_name = name
					this.popup_id = id
					this.$nextTick(() => {
						setRecord(this.turn_info, 'Eject', this)
					})
				}
			} else if (this.show_popup) {
				// 点的不是当前轮玩家，并且 有被或主 和 无被主 的情况一样
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

			// if (String(id) === getApp().globalData.round[0]) {
			// 	this.show_popup = true
			// 	this.popup_name = name
			// 	this.popup_id = id
			// 	this.$nextTick(() => {
			// 		setRecord(this.turn_info, 'Eject', this)
			// 	})
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
				this.count_text = `${temp_obj.userName}的回合`
			}
		},
		syncExecute() {
			this.$refs.RefDrawCard && this.$refs.RefDrawCard.syncExecute()
		},
		clickLanBtn(event) {
			this.is_show_landscape = false
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
			if (event === 'stow') {
				this.is_stow = true
			} else {
				this.is_show_model_pa = false
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
		},
		syncInfo(meaning) {
			if (meaning === 'myTurn') {
				// 下一回合时，管理员不能看到抽卡或转让卡的那个被动的模态框了
				if (this.is_show_model_pa && (this.popup_significance_pa === 'drawCard' || this.popup_significance_pa === 'receiveAuction')) {
					this.clickPaBtn()
				}
			} else if (meaning === 'lookForJob') {
				this.handleManage('lookForJob')
			} else if (meaning === 'litigate') {
				this.handleManage('litigate')
			} else if (meaning === 'NextUser') {
				console.log('管理员游戏界面触发：', getApp().globalData.gameId)
				return NextUser({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(getApp().globalData.round[0])
				})
					.then((res) => {
						if (res[1].data.status === 200) {
						} else {
						}
					})
					.catch((err) => {
						console.log(err)
					})
			} else if (meaning === 'deadUser') {
				this.clickBtn()
			}
			if (getApp().globalData.round[0] !== '0') {
				GetUserInfo({ game_user_id: getApp().globalData.round[0], game_id: getApp().globalData.gameId })
					.then((res) => {
						const data = res[1].data.data
						this.turn_info = data
						this.show_popup && this.showPopup(this.popup_name, this.popup_id, 0)
						if (meaning === 'drawCard') {
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
				// flex: 1;
				// height: 20vh;
				// overflow: auto;
				overflow-x: hidden;
				overflow-y: auto;
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
						height: 100%;
						overflow-y: auto;
						background-color: #ffb3ff;
						&::-webkit-scrollbar {
							/*滚动条整体样式*/
							display: block;
							width: 10rpx !important; /*高宽分别对应横竖滚动条的尺寸*/
							height: 0rpx !important;
							// border: 10rpx solid red;
							// background-color: #666666;
						}
						&::-webkit-scrollbar-track {
							/*滚动条里面轨道*/
							background: #ededed;
							border-radius: 10rpx;
						}
						&::-webkit-scrollbar-thumb {
							/*滚动条里面小方块*/
							border-radius: 10rpx;
							background-color: #666666;
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
