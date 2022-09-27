<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
			</view>
		</view>

		<!-- 卡片cards组件 -->
		<view class="card-container"> <Cards :card="currentCard"></Cards> </view>

		<view v-if="role === 'user'" class="tn-padding-top tn-text-xxl">
			<view v-if="currentCard.category_id === 4 || currentCard.category_id === 6 || currentCard.category_id === 8">
				<view>
					<view v-if="currentCard.card_name.includes('2室0厅1卫')"></view>
					<view v-else-if="currentCard.card_name.startsWith('P14')"></view>
					<view v-else>
						<view v-if="is_drew" class="card-container">
							<view>
								<text>是否转让：</text>
								<tn-radio-group v-model="is_transfer" :size="36" width="auto" :wrap="false">
									<tn-radio :name="'0'" :label-size="38">不转让</tn-radio>
									<tn-radio :name="'1'" :label-size="38">转让</tn-radio>
								</tn-radio-group>
							</view>
							<view v-if="is_transfer === '1'">
								<text>转让给：</text>
								<tn-radio-group v-model="person_transfer" :size="36" width="auto" :wrap="false">
									<tn-radio v-for="item in appListId" :key="item.id" :name="item.id" :label-size="38">{{ `${item.userName}(${item.roleName})` }}</tn-radio>
								</tn-radio-group>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view v-if="is_transfer === '0'">
						<view v-if="currentCard.card_name.startsWith('C01') || currentCard.card_name.startsWith('C02') || currentCard.card_name.startsWith('C03') || currentCard.card_name.startsWith('C06')" class="tn-flex tn-flex-row-center tn-margin-top">
							<tn-number-box
								v-model="quantity" :step="1" :min="0" :max="3"
								:input-width="140" :input-height="60" :font-size="40" :disabled-input="true"
								:disabled="false" :long-press="false" background-color="#dddddd" font-color="#00aaaa"
							></tn-number-box>
						</view>
					</view>
				</view>
				<view>
					<view v-if="currentCard.card_name.startsWith('P14')">
						<!-- 判断是否有购车贷款，有就 有可以购买的按钮 -->
						<view v-if="personal.basic_info.out_car_loan > 0" class="tn-flex tn-flex-row-around tn-margin-top">
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">{{
								is_transfer === '1' ? '确定' : currentCard.category_id === 6 ? '购买' : '投资'
							}}</tn-button>
						</view>
						<view v-else class="tn-flex tn-flex-row-around tn-margin-top">
							<view class="tn-margin-bottom-sm"><text>抱歉，您没有购车贷款，不能投资该副业！</text></view>
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
						</view>
					</view>
					<view v-else>
						<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-margin-top">
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">{{
								is_transfer === '1' ? '确定' : currentCard.category_id === 6 ? '购买' : '投资'
							}}</tn-button>
						</view>
						<view v-else class="tn-flex tn-flex-row-around tn-margin-top">
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
						</view>
					</view>
				</view>
			</view>

			<view v-else-if="currentCard.category_id === 5">
				<view v-if="currentCard.card_name.includes('新股上市')">
					<view v-if="is_drew" class="card-container">
						<view>
							<text>是否转让：</text>
							<tn-radio-group v-model="is_transfer" :size="36" width="auto" :wrap="false">
								<tn-radio :name="'0'" :label-size="38">不转让</tn-radio>
								<tn-radio :name="'1'" :label-size="38">转让</tn-radio>
							</tn-radio-group>
						</view>
						<view v-if="is_transfer === '0'"> <tn-input v-model="quantity" type="number" placeholder="在此输入购买股数" :focus="true" :border="true" /> </view>
						<view v-else>
							<text>转让给：</text>
							<tn-radio-group v-model="person_transfer" :size="36" width="auto" :wrap="false">
								<tn-radio v-for="item in appListId" :key="item.id" :name="item.id" :label-size="38">{{ `${item.userName}(${item.roleName})` }}</tn-radio>
							</tn-radio-group>
						</view>
					</view>
					<view>
						<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-margin-top">
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">{{ is_transfer === '1' ? '确定' : '购买' }}</tn-button>
						</view>
						<view v-else class="tn-flex tn-flex-row-around tn-margin-top">
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
						</view>
					</view>
				</view>
				<view v-else>
					<view>
						<view v-if="currentCard.card_name.startsWith('股票交易')">
							<tn-input v-model="quantity" type="number" placeholder="在此输入购买股数" :focus="true" :border="true" />
						</view>
						<view v-else-if="currentCard.card_name.startsWith('银行') || currentCard.card_name.startsWith('基金交易') || currentCard.card_name.startsWith('互联网')">
							<tn-input v-model="quantity" type="number" placeholder="在此输入购买股数" :focus="true" :border="true" />
						</view>
						<view v-else-if="currentCard.card_name.startsWith('投资黄金')">
							<tn-input v-model="quantity" type="number" placeholder="在此输入购买克数" :focus="true" :border="true" />
						</view>
					</view>
					<view>
						<view class="tn-flex tn-flex-row-around tn-margin-top">
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
							<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">{{ is_transfer === '1' ? '确定' : '购买' }}</tn-button>
						</view>
					</view>
				</view>
			</view>

			<view v-else-if="currentCard.category_id === 11"></view>

			<view v-else-if="currentCard.category_id === 12 || currentCard.category_id === 10">
				<view>
					<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-margin-top">
						<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">放弃</tn-button>
						<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm()">{{ currentCard.category_id === 12 ? '使用' : '投资' }}</tn-button>
					</view>
					<view v-else class="tn-flex tn-flex-row-around tn-margin-top">
						<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
					</view>
				</view>
			</view>

			<view v-else-if="currentCard.category_id === 9 || currentCard.category_id === 7">
				<view>
					<view v-if="currentCard.category_id === 9">
						<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-margin-top">
							<text>恭喜，您结婚啦！</text>
						</view>
					</view>
					<view v-if="currentCard.category_id === 7">
						<view v-if="currentCard.card_name.startsWith('个人') && is_drew" class="tn-flex tn-flex-row-around tn-margin-top">
							<text>注意：您抽到了一张个人逆流卡！</text>
						</view>
						<view v-if="currentCard.card_name.startsWith('团体')" class="tn-flex tn-flex-row-around tn-margin-top">
							<text>注意：团体逆流来了！</text>
						</view>
					</view>
					<view class="tn-flex tn-flex-row-around tn-margin-top">
						<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
					</view>
				</view>
			</view>

		</view>
		<view v-else class="tn-flex tn-flex-row-around tn-margin-top">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
		</view>
	</view>
</template>

<script>
// 一开始采用的是九张卡九个组件的方式，后面因为卡片的信息都统一在name和desc属性上，所以组件的重复度变高，就可以封装成单独的组件。另外，之所以封装成统一的cards组件，是因为考虑到卡片（cards组件）可能在不同的组件里用到，譬如用户可能要查询单独的卡片的信息，这里就要在其它组件里用到cards组件了
// <!-- 副业 -->
// <!-- 金融 -->
// <!-- 房地产 -->
// <!-- 企业 -->
// <!-- 行情 -->
// <!-- 觉察 -->
// <!-- 相亲 -->
// <!-- 逆流 -->
// <!-- 项目 -->
// import SideHustle from '@/components/cards/side-hustle.vue'
// import Finance from '@/components/cards/finance.vue'
// import RealEstate from '@/components/cards/real-estate.vue'
// import Enterprise from '@/components/cards/enterprise.vue'
// import Quotation from '@/components/cards/quotation.vue'
// import Perceive from '@/components/cards/perceive.vue'
// import BlindDate from '@/components/cards/blind-date.vue'
// import Backset from '@/components/cards/backset.vue'
// import Project from '@/components/cards/project.vue'
import Cards from '@/components/cards/cards.vue'

// 接口
import { ConfirmCard, TransferCard } from 'config/api.js'

export default {
	// components: { SideHustle, Finance, RealEstate, Enterprise, Quotation, Perceive, BlindDate, Backset, Project },
	components: { Cards },
	props: {
		personal: {
			type: Object,
			required: false,
			default() {
				return { basic_info: {}, income: [], assets: [], debts: [] }
			}
		},
		classification: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			role: getApp().globalData.role,

			// 不同卡的不同的要填的内容，表单
			is_transfer: '0',
			person_transfer: '',
			quantity: '',

			// 左图标
			leftIcon: 'bankcard-fill',
			// 右图标
			rightIcon: 'bankcard-fill',
			// 这个人是否抽到卡的那个人
			is_drew: false,
			cardMsg: getApp().globalData.cardMsg,
			currentCard: getApp().globalData.currentCard,
			appListId: getApp().globalData.appListId.filter((item) => item.id !== getApp().globalData.gameUserId)
		}
	},

	computed: {
		userName() {
			const temp_obj = getApp().globalData.appListId.find((item) => item.id === this.cardMsg[0])
			if (temp_obj) {
				if (this.is_drew) {
					if (this.classification === 'drawCard') {
						return '您抽到了这张卡：'
					} else if (this.classification === 'receiveAuction') {
						return '您收到了这张卡：'
					}
				} else if (this.classification === 'drawCard') {
					return `玩家 ${temp_obj.userName} 抽到了一张卡：`
				} else if (this.classification === 'receiveAuction') {
					return `玩家 ${temp_obj.userName} 收到了一张卡：`
				}
			}
			return '获取玩家信息失败，请重试！'
		}
	},

	created() {
		this.is_drew = this.cardMsg[0] === getApp().globalData.gameUserId
		if (this.currentCard.card_name.startsWith('C01') || this.currentCard.card_name.startsWith('C02') || this.currentCard.card_name.startsWith('C03') || this.currentCard.card_name.startsWith('C06')) {
			this.quantity = 0
		}
		// console.log(this.currentCard)
	},
	onReady() {},

	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm() {
			// console.log(this.money)
			// // 多一份保险，判断抽到的这张卡有没有放到storage里面
			// if (!this.currentCard) {
			// 	return uni.showToast({
			// 		title: '获取卡牌信息失败！',
			// 		icon: 'error'
			// 	})
			// }
			if (this.is_transfer === '1') {
				if (!this.person_transfer) {
					return uni.showToast({
						title: '请选择要转让的人！',
						icon: 'error'
					})
				}
				TransferCard({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(getApp().globalData.gameUserId),
					card_id: this.cardMsg[1],
					receiver_id: Number(this.person_transfer)
				})
					.then((res) => {
						// console.log(res)
						// console.log(res[1].data.data)
						if (res[1].data.status === 200) {
							uni.showToast({
								title: '操作成功！',
								icon: 'success'
							})
							this.$emit('submit', 1) // 只有1代表接口的操作是成功的
						} else {
							// this.$emit('submit', 2)
						}
					})
					.catch((err) => {
						console.log(err)
						// this.$emit('submit', 3)
					})
			} else {
				if (this.currentCard.category_id === 4) {
				} else if (this.currentCard.category_id === 5) {
					if (Number(this.quantity) <= 0 || !Number.isInteger(Number(this.quantity))) {
						return uni.showToast({
							title: '请输入正确的数值！',
							icon: 'error'
						})
					}
					if (this.currentCard.card_name.includes('新股上市') && (Number(this.quantity) < 100 || Number(this.quantity) > 1000)) {
						return uni.showToast({
							title: '购买范围为100~1000股！',
							icon: 'error'
						})
					}
					if (
						(this.currentCard.card_name.includes('新股上市') ||
							this.currentCard.card_name.startsWith('股票交易') ||
							// this.currentCard.card_name.startsWith('银行') ||
							// this.currentCard.card_name.startsWith('基金交易') ||
							// this.currentCard.card_name.startsWith('互联网') ||
							this.currentCard.card_name.startsWith('投资黄金')) &&
						Number(this.quantity) % 100 !== 0
					) {
						return uni.showToast({
							title: '请购买100的整数倍！',
							icon: 'error'
						})
					}
				} else if (this.currentCard.category_id === 6) {
				} else if (this.currentCard.category_id === 8) {
					if (this.currentCard.card_name.startsWith('C01') || this.currentCard.card_name.startsWith('C02') || this.currentCard.card_name.startsWith('C03') || this.currentCard.card_name.startsWith('C06')) {
						if (!this.quantity || Number(this.quantity) === 0) {
							return uni.showToast({
								title: '请选择正确的台数！',
								icon: 'error'
							})
						}
					}
				} else if (this.currentCard.category_id === 11) {
				} else if (this.currentCard.category_id === 12) {
				} else if (this.currentCard.category_id === 9) {
				} else if (this.currentCard.category_id === 7) {
				} else if (this.currentCard.category_id === 10) {
				}
				ConfirmCard({
					game_id: getApp().globalData.gameId,
					game_user_id: getApp().globalData.gameUserId,
					card_id: String(this.cardMsg[1]),
					buy_number: Number(this.quantity)
				})
					.then((res) => {
						// console.log(res)
						// console.log(res[1].data.data)
						if (res[1].data.status === 200) {
							uni.showToast({
								title: '操作成功！',
								icon: 'success'
							})
							this.$emit('submit', 1) // 只有1代表接口的操作是成功的
						} else {
							// this.$emit('submit', 2)
						}
					})
					.catch((err) => {
						console.log(err)
						// this.$emit('submit', 3)
					})
			}
		}

	}
}
</script>

<style lang="scss" scoped>
.main_title {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 35rpx;
	margin-bottom: 50rpx;
	font-size: 36rpx;

	&__content {
		padding: 0 18rpx;
		font-weight: bold;
	}

	&__icon {
		font-size: 34rpx;
	}
}
.card-container {
	width: 55vmin;
	// height: 65vmin;
	margin: 0 auto;
}
// .button {
// 	margin-top: 35rpx;
// }
</style>
