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
						<view class="">
							<CountTo :font-size="2" font-unit="vh" :start-val="count_text" :end-val="0" :duration="90000" :use-easing="false" @change="changeCountTo"></CountTo>
						</view>
					</view>
					<view class="tn-flex-9"> <HeadNavigationBar ref="RefHeadNav" @clickHead="showPopup"></HeadNavigationBar> </view>
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
							<userButton ref="RefUserButton" @clickBtn="handleProcessing"></userButton>
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
				:z-index="6"
				@click="clickBtn"
			>
				<view v-if="popup_significance === 'loan'"> <Loan :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></Loan> </view>
				<view v-else-if="popup_significance === 'repayment'"> <Repayment :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></Repayment> </view>
				<view v-else-if="popup_significance === 'giveMoney'"> <GiveMoney :personal="my_info" @cancel="clickBtn" @submit="clickBtn"></GiveMoney> </view>
				<view v-else-if="popup_significance === 'litigate'"> <JobRelated :personal="my_info" sign="litigate" @cancel="clickBtn" @submit="clickBtn"></JobRelated> </view>
				<view v-else-if="popup_significance === 'hunting'"> <JobRelated :personal="my_info" sign="hunting" @cancel="clickBtn" @submit="clickBtn"></JobRelated> </view>
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
					<DrawCard :personal="my_info" classification="drawCard" @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard>
				</view>
				<view v-else-if="popup_significance_pa === 'receiveAuction'">
					<DrawCard :personal="my_info" classification="receiveAuction" @cancel="clickPaBtn" @submit="clickPaBtn"></DrawCard>
				</view>
			</tn-modal>
		</view>
	</view>
</template>

<script>
import Timer from '@/components/timer/timer.vue'
import CountTo from '@/components/count-to/count-to.vue'
import HeadNavigationBar from '@/components/head-navigation-bar/head-navigation-bar.vue'
// import UpperLeft from '@/components/table/upper-left.vue'
// import LowerLeft from '@/components/table/lower-left.vue'
// import UpperMiddle from '@/components/table/upper-middle.vue'
// import LowerMiddle from '@/components/table/lower-middle.vue'
import TableDataes from '@/components/table/table-dataes.vue'
import userButton from './user-child/user-button.vue'
import Bottom from '@/components/table/bottom.vue'

// 封装的模态框的自定义内容的组件(主动)
import Loan from './user-child/loan.vue'
import Repayment from './user-child/repayment.vue'
import GiveMoney from './user-child/give-money.vue'
// import Litigate from './user-child/litigate.vue'
// import Hunting from './user-child/hunting.vue'
import JobRelated from './user-child/job-related.vue'

// 封装的模态框的自定义内容的组件(被动)
import DrawCard from '@/components/draw-card/draw-card.vue'

// 接口
import { GetUserInfo } from 'config/api.js'

// 公共的方法
import setRecord from 'utils/render-table/render-table.js'

export default {
	components: { Timer, CountTo, HeadNavigationBar, TableDataes, Bottom, userButton, DrawCard, Loan, Repayment, GiveMoney, JobRelated },
	data() {
		return {
			// load_role: '',
			count_text: '等待下一轮',
			my_info: '',
			tableClass: '',

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

		showPopup(name, id) {
			if (String(id) === getApp().globalData.gameUserId) {
				if (this.is_show_model_pa) {
					this.show_popup = true
					this.popup_name = name
					this.popup_id = id
					this.$nextTick(() => {
						setRecord(this.my_info, 'Eject', this)
					})
				} else {
					this.tableClass = 'table-ani'
					setTimeout(() => {
						this.tableClass = ''
					}, 2000)
				}
			} else {
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
			}
		},
		globalNotice(title, content, icon, significance) {
			this.$refs.toast.show({
				title,
				content,
				icon,
				image: '',
				duration: 2000
			})
			if (significance) this.toast_significance = significance
		},
		syncAvatarStyle() {
			this.$refs.RefHeadNav.syncAvatarStyle()
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
				// 下一回合时，所有（或上一回合）用户不能看到 打官司和找工作 的那个主动的模态框了
				if (this.is_show_model && (this.popup_significance === 'litigate') || this.popup_significance === 'hunting') {
					this.clickBtn()
				}
			}
			// if (meaning === 'closeAc' && this.is_show_model && (this.popup_significance === 'loan' || this.popup_significance === 'repayment' || this.popup_significance === 'giveMoney')) this.is_show_model = false
			GetUserInfo({ game_user_id: getApp().globalData.gameUserId, game_id: getApp().globalData.gameId })
				.then((res) => {
					const data = res[1].data.data
					setRecord(data, 'Main', this)
					this.my_info = data
					this.show_popup && this.showPopup(this.popup_name, this.popup_id)
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
