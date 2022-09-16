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
							<view v-for="(item,index) in appListData" :key="item.appName" class="tn-padding-xs tn-padding-left-xl" @click="showPopup(item.appName,index)">
								<view> <tn-avatar :src="src" size="3.2vw"></tn-avatar> </view> <view>{{ item.appName }}</view>
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
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>下一位</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>送钱（玩家生孩子随礼）</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>发工资</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>扣钱（触犯规则）</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0" @click="handleProcessing('扣费抽卡')">
										<text>扣费抽卡</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>免费抽卡</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>发免费精力</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>发收费精力</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>玩家生孩子</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>玩家选择结婚纪念（日）</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>心碎（逆流层失恋/逆流层离婚/顺流层离婚）</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>逆流层失业</text>
									</tn-button>
								</view>
								<view>
									<tn-button :shadow="true" width="30vw" height="auto" background-color="tn-cool-bg-color-2" :font-size="28" padding="2vw 10rpx" margin="10rpx 0">
										<text>顺流层破产</text>
									</tn-button>
								</view>
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
				<view v-if="popup_significance === '扣费抽卡'">
					<CardDeduction @cancel="clickBtn"></CardDeduction>
				</view>
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
import TableDataes from '@/components/table/table-dataes.vue'
import Bottom from '@/components/table/bottom.vue'
// import cutApart from '@/utils/cut-apart/cut-apart.js'

import CardDeduction from './admin-child/card-deduction.vue'

import { GetUserInfo, GetCardCategoryList } from 'config/api.js'
export default {
	components: { Timer, TableDataes, Bottom, CardDeduction },
	data() {
		return {
			load_role: '',
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

			appListData: getApp().globalData.appListData,

			popup_name: ''
		}
	},

	onLoad(options) {
		this.load_role = options.role
		this.getCardCategoryList()
	},
	onShow() {
		getApp().globalData.manipulate = this
		// 应对管理员或用户 在当前页面进行刷新，判断应该跳回到用户登录页还是管理员登录页
		if (getApp().globalData.wsHandle === '') {
			// if (this.load_role === 'admin') {
			uni.redirectTo({ url: '/pages/login-admin/index' })
			// } else {
			// uni.redirectTo({ url: '/pages/index/index' })
			// }
		}
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
			} else if (significance === '扣费抽卡') {
				this.popup_significance = '扣费抽卡'
				this.close_btn = false
				this.mask_closeable = false
				this.custom = true
				this.is_show_model = true
			}
		},

		showPopup(name, index) {
			// this.appListId = getApp().globalData.appListId
			GetUserInfo({ id: getApp().globalData.appListId[index], game_id: getApp().globalData.gameId })
			// GetUserInfo({ id: 31, game_id: 22 })
				.then((res) => {
					// console.log(res[1].data.data)
					const data = res[1].data.data
					this.setRecord(data, 'Eject')
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
		syncUserList() {
			this.appListData = getApp().globalData.appListData
			// console.log(this.appListData)
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
		},
		// 根据后端返回的数据，和具体的那一个整体（那两个子组件：四个表table 和 底部栏bottom），来进行数据渲染（调用子组件内部的方法）
		setRecord(data, refFragment) {
			// console.log(this.$refs.RefTableMain.$children[0].$children[0].$children[0].$children[0])
			// console.log(this.$refs.RefTableMain.$children[0].$children[0].$children[1].$children[0])
			// console.log(this.$refs.RefTableMain.$children[0].$children[1].$children[0].$children[0])
			// console.log(this.$refs.RefTableMain.$children[0].$children[1].$children[1].$children[0])
			// this.$refs.RefTableMain.$children[0].$children[0].$children[0].$children[0].setIncome({})
			// this.$refs.RefTableMain.$children[0].$children[0].$children[1].$children[0].setExpenditure({})
			// this.$refs.RefTableMain.$children[0].$children[1].$children[0].$children[0].setAssets({})
			// this.$refs.RefTableMain.$children[0].$children[1].$children[1].$children[0].setLiabilities({})
			// this.$refs.RefBottomMain.setButtom({})
			const income1 = data.income.filter((item) => item.class === 5).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
			const income2 = data.income.filter((item) => item.class === 6).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
			const income3 = data.income.filter((item) => item.class === 1).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
			const income4 = data.income.filter((item) => item.class === 3).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
			this.$refs[`RefTable${refFragment}`].$children[0].$children[0].$children[0].$children[0].setIncome({
				in_salary: data.basic_info.in_salary,
				in_partner: data.basic_info.in_partner,
				income1,
				income2,
				income3,
				income4
			})
			this.$refs[`RefTable${refFragment}`].$children[0].$children[0].$children[1].$children[0].setExpenditure({
				child_num: data.basic_info.child_num,
				out_child: data.basic_info.out_child,
				out_personal: data.basic_info.out_personal,
				out_partner: data.basic_info.out_partner,
				out_tax: data.basic_info.out_tax,
				out_self_housing: data.basic_info.out_self_housing,
				out_rent: data.basic_info.out_rent,
				out_car_loan: data.basic_info.out_car_loan,
				out_credit_card: data.basic_info.out_credit_card,
				out_additional_liabilities: data.basic_info.out_additional_liabilities,
				out_insuraunce: data.basic_info.out_insuraunce,
				out_healthy: data.basic_info.out_healthy,
				out_bank_loan_interest: data.basic_info.out_bank_loan_interest
			})
			const asset1 = data.assets.filter((item) => item.class === 4).map((item) => ({ id: item.id, card_name: item.card_name }))
			const asset2 = data.assets.filter((item) => item.class === 2).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
			const asset3 = data.assets.filter((item) => item.class === 1).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
			this.$refs[`RefTable${refFragment}`].$children[0].$children[1].$children[0].$children[0].setAssets({
				asset1,
				asset2,
				asset3
			})
			const debt1 = data.assets.filter((item) => item.class === 1).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
			const debt2 = data.assets.filter((item) => item.class === 3).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
			this.$refs[`RefTable${refFragment}`].$children[0].$children[1].$children[1].$children[0].setLiabilities({
				debt_self_housing: data.basic_info.child_num,
				debt_car_loan: data.basic_info.child_num,
				debt_credit_card: data.basic_info.child_num,
				debt_additional_liabilities: data.basic_info.child_num,
				debt1,
				debt2,
				debt_bank_loan: data.basic_info.debt_bank_loan
			})
			this.$refs[`RefBottom${refFragment}`].setButtom({
				cash_flow: data.basic_info.cash_flow,
				passive_in: data.basic_info.passive_in,
				cash_on_hand: data.basic_info.cash_on_hand,
				energy: data.basic_info.energy,
				basics_in: data.basic_info.basics_in,
				basics_out: data.basic_info.basics_out
				// charitable: data.basic_info.charitable
			})
			// console.log(this.$refs.RefTableMain)
			// console.log(this.$refs.RefBottomMain)
			// console.log(this.$refs.RefTableEject.$children[0].$children[0].$children[0].$children[0])
			// console.log(this.$refs.RefTableEject.$children[0].$children[0].$children[1].$children[0])
			// console.log(this.$refs.RefTableEject.$children[0].$children[1].$children[0].$children[0])
			// console.log(this.$refs.RefTableEject.$children[0].$children[1].$children[1].$children[0])
			// this.$refs.RefTableEject.$children[0].$children[0].$children[0].$children[0].setIncome({})
			// this.$refs.RefTableEject.$children[0].$children[0].$children[1].$children[0].setExpenditure({})
			// this.$refs.RefTableEject.$children[0].$children[1].$children[0].$children[0].setAssets({})
			// this.$refs.RefTableEject.$children[0].$children[1].$children[1].$children[0].setLiabilities({})
			// this.$refs.RefBottomMain.setButtom({})
			// console.log(this.$refs.RefTableEject)
			// console.log(this.$refs.RefBottomEject)
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
