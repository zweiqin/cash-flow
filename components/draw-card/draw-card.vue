<template>
	<view>
		<view>
			<view class="main_title">
				<view v-if="leftIcon" class="main_title__icon main_title__icon--left" :class="[`tn-icon-${leftIcon}`]"></view> <view class="main_title__content">{{ userName }}</view>
				<view v-if="rightIcon" class="main_title__icon main_title__icon--right" :class="[`tn-icon-${rightIcon}`]"></view>
				<view v-if="role === 'admin'">
					<tn-button background-color="tn-bg-teal" font-color="tn-color-white" height="5vmax" margin="0 0 0 100rpx" @click="cancel('stow')">收起</tn-button>
				</view>
			</view>
		</view>
		<!-- <view class="highest-container"> -->
		<view class="container">

			<!-- 卡片cards组件 -->
			<view class="card-container"> <Cards :card="currentCard"></Cards> </view>

			<view v-if="role === 'user' && me.isDead==='0'" class="tn-padding-top tn-text-xxl">
				<!-- 对于没进入顺流层的（那群）人来说 -->
				<view v-if="!personal.basic_info.is_rich_circle">

					<view v-if="currentCard.category_id === 4 || currentCard.category_id === 6 || currentCard.category_id === 8">
						<view>
							<view v-if="currentCard.card_name.includes('2室0厅1卫')"></view>
							<view v-else-if="currentCard.card_name.startsWith('P14')"></view>
							<view v-else>
								<view v-if="is_drew" class="card-container">
									<view>
										<text>是否转让：</text>
										<tn-radio-group v-model="is_transfer" :size="36" width="auto" :wrap="true">
											<tn-radio :name="'0'" :label-size="38">不转让</tn-radio>
											<tn-radio :name="'1'" :label-size="38">转让</tn-radio>
										</tn-radio-group>
									</view>
									<view v-if="is_transfer === '1'">
										<text>转让给：</text>
										<tn-radio-group v-model="person_transfer" :size="36" width="auto" :wrap="true">
											<tn-radio v-for="item in appListId" :key="item.id" :name="item.id" :label-size="38" :disabled="item.isDead!=='0'">
												<text v-if="item.isDead!=='0'">（猝死）</text>{{ `${item.userName}(${item.roleName})` }}
											</tn-radio>
										</tn-radio-group>
									</view>
								</view>
							</view>
						</view>
						<view>
							<view v-if="is_transfer === '0' && is_drew">
								<view v-if="currentCard.card_name.startsWith('C01') || currentCard.card_name.startsWith('C02') || currentCard.card_name.startsWith('C03') || currentCard.card_name.startsWith('C06')" class="tn-flex tn-flex-row-center tn-padding-top">
									<tn-number-box
										v-model="quantity" :step="1" :min="1" :max="3"
										:input-width="140" :input-height="60" :font-size="40" :disabled-input="true"
										:disabled="false" :long-press="false" background-color="#dddddd" font-color="#00aaaa"
									></tn-number-box>
								</view>
							</view>
						</view>
						<view>
							<view v-if="currentCard.card_name.startsWith('P14')">
								<!-- 判断是否有购车贷款，有就 有可以购买的按钮 -->
								<view v-if="personal.basic_info.out_car_loan > 0" class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">{{
										is_transfer === '1' ? '确定' : currentCard.category_id === 6 ? '购买' : '投资'
									}}</tn-button>
								</view>
								<view v-else class="tn-padding-top">
									<view><text>抱歉，您没有购车贷款，不能投资该副业！</text></view>
									<view class="tn-flex tn-flex-row-around tn-padding-top">
										<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel('currentExecute')">关闭</tn-button>
									</view>
								</view>
							</view>
							<view v-else>
								<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">{{
										is_transfer === '1' ? '确定' : currentCard.category_id === 6 ? '购买' : '投资'
									}}</tn-button>
								</view>
								<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
								</view>
							</view>
						</view>
					</view>

					<view v-else-if="currentCard.category_id === 5">
						<view v-if="currentCard.card_name.includes('新股上市')">
							<view v-if="is_drew" class="card-container">
								<view>
									<text>是否转让：</text>
									<tn-radio-group v-model="is_transfer" :size="36" width="auto" :wrap="true">
										<tn-radio :name="'0'" :label-size="38">不转让</tn-radio>
										<tn-radio :name="'1'" :label-size="38">转让</tn-radio>
									</tn-radio-group>
								</view>
								<view v-if="is_transfer === '0'"> <tn-input v-model="quantity" type="number" placeholder="在此输入购买股数" :focus="true" :border="true" @click="showKeyboard('quantity')" /> </view>
								<view v-else>
									<text>转让给：</text>
									<tn-radio-group v-model="person_transfer" :size="36" width="auto" :wrap="true">
										<tn-radio v-for="item in appListId" :key="item.id" :name="item.id" :label-size="38" :disabled="item.isDead!=='0'">
											<text v-if="item.isDead!=='0'">（猝死）</text>{{ `${item.userName}(${item.roleName})` }}
										</tn-radio>
									</tn-radio-group>
								</view>
							</view>
							<view>
								<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">{{ is_transfer === '1' ? '确定' : '购买' }}</tn-button>
								</view>
								<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
								</view>
							</view>
						</view>
						<view v-else>
							<view>
								<view v-if="currentCard.card_name.startsWith('股票交易')">
									<view>
										<tn-subsection :list="['买', '卖']" mode="button" :border-radius="50" animation-type="cubic-bezier" @change="handleBusiness"></tn-subsection>
									</view>
									<view class="tn-padding-top">
										<view v-if="is_sell">
											<view class="tn-padding-bottom">
												<tn-list-view :card="true" title="可卖出的金融产品列表" background-color="#EFEFEF">
													<tn-radio-group v-model="sell_id">
														<block v-if="marketable_shares.length!==0">
															<tn-list-cell
																v-for="(item,index) in marketable_shares" :key="item.id" :arrow="false"
																:arrow-right="false" :unlined="false" :line-left="true" :line-right="true"
															>
																<view>
																	<tn-radio :name="String(item.id)">
																		<text>批次{{ index+1 }}：</text>
																		{{ `${item.card_name}(每股成本：${item.value})(股数：${item.num})` }}
																	</tn-radio>
																</view>
															</tn-list-cell>
														</block>
														<block v-else>
															<tn-list-cell :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
																<view>
																	<text>无</text>
																</view>
															</tn-list-cell>
														</block>
													</tn-radio-group>
												</tn-list-view>
											</view>
											<view v-if="marketable_shares.length!==0">
												<tn-input v-model="sell_number" type="number" placeholder="在此输入卖出股数" :focus="true" :border="true" @click="showKeyboard('sell_number')" />
											</view>
										</view>
										<view v-else>
											<tn-input v-model="quantity" type="number" placeholder="在此输入购买股数" :focus="true" :border="true" @click="showKeyboard('quantity')" />
										</view>
									</view>
								</view>
								<view v-else-if="currentCard.card_name.startsWith('银行') || currentCard.card_name.startsWith('基金交易') || currentCard.card_name.startsWith('互联网')">
									<tn-input v-model="quantity" type="number" placeholder="在此输入购买份数" :focus="true" :border="true" @click="showKeyboard('quantity')" />
								</view>
								<view v-else-if="currentCard.card_name.startsWith('投资黄金')">
									<tn-input v-model="quantity" type="number" placeholder="在此输入购买克数" :focus="true" :border="true" @click="showKeyboard('quantity')" />
								</view>
							</view>
							<view>
								<view class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">{{ is_transfer === '1' ? '确定' : is_sell === 1 ? '卖出' : '购买' }}</tn-button>
								</view>
							</view>
						</view>
					</view>

					<view v-else-if="currentCard.category_id === 11">
						<view v-if="product_list===null">
							<view class="tn-flex tn-flex-row-around tn-padding-top">
								<text>注意：该行情卡已影响到您的财富报表！</text>
							</view>
							<view class="tn-flex tn-flex-row-around tn-padding-top">
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
							</view>
						</view>
						<view v-else>
							<view class="tn-padding-bottom">
								<tn-list-view :card="true" title="可卖出的金融产品列表" background-color="#EFEFEF">
									<tn-radio-group v-model="sell_id">
										<block v-if="product_list.length!==0">
											<tn-list-cell
												v-for="(item,index) in product_list" :key="item.id" :arrow="false"
												:arrow-right="false" :unlined="false" :line-left="true" :line-right="true"
											>
												<view>
													<tn-radio :name="String(item.id)">
														<text>批次{{ index+1 }}：</text>
														{{ `${item.card_name}(${currentCard.card_name.startsWith('房产行情')?'价值':'成本价'}：${item.value})(数量：${item.num})` }}
													</tn-radio>
												</view>
											</tn-list-cell>
										</block>
										<block v-else>
											<tn-list-cell :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
												<view>
													<text>无</text>
												</view>
											</tn-list-cell>
										</block>
									</tn-radio-group>
								</tn-list-view>
							</view>
							<view v-if="!currentCard.card_name.startsWith('房产行情') && product_list.length!==0">
								<tn-input v-model="sell_number" type="number" placeholder="在此输入卖出数量" :focus="true" :border="true" @click="showKeyboard('sell_number')" />
							</view>
							<view>
								<view class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">卖出</tn-button>
								</view>
							</view>
						</view>
					</view>

					<view v-else-if="currentCard.category_id === 12">
						<view v-if="currentCard.card_name.startsWith('团体觉察')">
							<view class="tn-flex tn-flex-row-around tn-padding-top">
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">使用</tn-button>
							</view>
						</view>
						<view v-else>
							<view v-if="is_drew">
								<view class="card-container">
									<view v-if="currentCard.describe.includes('免费抽取一张机会卡')">
										<text>（免费）选择一种机会卡：</text>
										<tn-radio-group v-model="cards_obtained" :size="25" width="auto" :wrap="true">
											<tn-radio v-for="item in opportunity_list" :key="item" :name="item" :disabled="false" :label-size="38">
												{{ ((item==='副业' || item==='金融') ? '【小机会】':'【大机会】') + item }}
											</tn-radio>
										</tn-radio-group>
									</view>
									<!-- <view v-else-if="currentCard.describe.includes('抽取一张行情卡')"></view> -->
									<view v-else-if="currentCard.describe.includes('未婚玩家可选择结婚')">
										<view v-if="personal.basic_info.is_married === 0">
											<view><text>您还未结婚，使用该卡之后则抽取一张相亲卡！</text></view>
										</view>
										<view v-else>
											<view><text>您已经结婚了，使用该卡之后可获得2点精力！</text></view>
										</view>
									</view>
									<view v-else-if="currentCard.describe.includes('购买一张机会卡') || currentCard.describe.includes('抽取一张相亲卡送给场上')">
										<view v-if="currentCard.describe.includes('购买一张机会卡')" class="tn-padding-bottom">
											<text>选择购买一种机会卡：</text>
											<tn-radio-group v-model="cards_obtained" :size="25" width="auto" :wrap="true">
												<tn-radio v-for="item in opportunity_list" :key="item" :name="item" :disabled="false" :label-size="38">
													{{ ((item==='副业' || item==='金融') ? '【小机会】':'【大机会】') + item }}
												</tn-radio>
											</tn-radio-group>
										</view>
										<view>
											<tn-list-view :card="true" title="其 他/她 玩家列表" background-color="#EFEFEF">
												<tn-radio-group v-model="person_give">
													<block v-if="appListId.length!==0">
														<tn-list-cell v-for="(item,index) in appListId" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
															<view>
																<tn-radio :name="item.id" :disabled="item.isDead!=='0'">
																	<text v-if="item.isDead!=='0'">（猝死）</text>
																	<text>用户{{ index+1 }}：</text>
																	{{ `${item.userName}(${item.roleName})` }}
																</tn-radio>
															</view>
														</tn-list-cell>
													</block>
													<block v-else>
														<tn-list-cell :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
															<view><text>无</text></view>
														</tn-list-cell>
													</block>
												</tn-radio-group>
											</tn-list-view>
										</view>
									</view>
								</view>
								<view>
									<view v-if="currentCard.describe.includes('已婚的玩家执行此卡') && personal.basic_info.is_married === 0">
										<view><text>抱歉，您还未结婚，不能使用该卡！</text></view>
										<view class="tn-flex tn-flex-row-around tn-padding-top">
											<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel('currentExecute')">关闭</tn-button>
										</view>
									</view>
									<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
										<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
										<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">使用</tn-button>
									</view>
								</view>
							</view>
							<view v-else>
								<view class="tn-flex tn-flex-row-around tn-padding-top">
									<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
								</view>
							</view>
						</view>
					</view>

					<view v-else-if="currentCard.category_id === 9 || currentCard.category_id === 7">
						<view>
							<view v-if="currentCard.category_id === 9">
								<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-padding-top">
									<text>恭喜，您结婚啦！</text>
								</view>
							</view>
							<view v-if="currentCard.category_id === 7">
								<view v-if="currentCard.card_name.startsWith('个人') && is_drew" class="tn-flex tn-flex-row-around tn-padding-top">
									<text>注意：您抽到了一张个人逆流卡！</text>
								</view>
								<view v-if="currentCard.card_name.startsWith('团体')" class="tn-flex tn-flex-row-around tn-padding-top">
									<text>注意：团体逆流来了！</text>
								</view>
							</view>
							<view class="tn-flex tn-flex-row-around tn-padding-top">
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
							</view>
						</view>
					</view>

					<!-- 针对项目卡 -->
					<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
						<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
					</view>

				</view>
				<!-- 对于进入顺流层的（那群）人来说 -->
				<view v-else>

					<view v-if="currentCard.category_id === 10">
						<view>
							<view v-if="is_drew" class="tn-flex tn-flex-row-around tn-padding-top">
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="cancel('currentExecute')">放弃</tn-button>
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" height="8vmax" @click="confirm('currentExecute')">投资</tn-button>
							</view>
							<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
								<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
							</view>
						</view>
					</view>
					<!-- 针对除项目卡的其它卡 -->
					<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
						<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
					</view>

				</view>

			</view>
			<view v-else-if="role === 'user' && me.isDead==='1'" class="tn-flex tn-flex-row-around tn-padding-top">
				<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" height="8vmax" @click="cancel()">关闭</tn-button>
			</view>
			<!-- 管理员展示 -->
			<view v-else>
				<AdminOperation :current-execute="currentExecute" @cancel="cancel"></AdminOperation>
			</view>

		</view>
		<!-- </view> -->

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
import AdminOperation from '@/components/admin-operation/admin-operation.vue'

// 接口
import { AbandonCard, ConfirmCard, TransferCard } from 'config/api.js'

export default {
	// components: { SideHustle, Finance, RealEstate, Enterprise, Quotation, Perceive, BlindDate, Backset, Project },
	components: { Cards, AdminOperation },
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
			is_sell: 0,
			quantity: '',
			sell_number: '',
			sell_id: '',
			cards_obtained: '',
			person_give: '',
			opportunity_list: ['副业', '金融', '房地产', '企业'],
			// 左图标
			leftIcon: 'bankcard-fill',
			// 右图标
			rightIcon: 'bankcard-fill',
			// 这个人是否抽到卡的那个人
			is_drew: false,
			cardMsg: getApp().globalData.cardMsg,
			currentCard: getApp().globalData.currentCard,
			appListId: getApp().globalData.appListId.filter((item) => item.id !== getApp().globalData.gameUserId),
			me: getApp().globalData.appListId.find((item) => item.id === getApp().globalData.gameUserId) || {},
			currentExecute: getApp().globalData.currentExecute

			// keyboard_data: ''
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
		},
		marketable_shares() {
			return this.personal.assets.filter((item) => item.card_name === this.currentCard.card_name)
		},
		product_list() {
			if (this.currentCard.category_id === 11 && (this.currentCard.card_name.startsWith('房产行情') || this.currentCard.card_name.startsWith('股票行情') || this.currentCard.card_name.startsWith('黄金上涨') || this.currentCard.card_name.startsWith('牛市来袭'))) {
				// keys之后的数字是字符串的形式。对象的特性，键都是字符串。
				const temp_arr = Object.keys(JSON.parse(this.currentCard.relation_card))
				return this.personal.assets.filter((item) => temp_arr.includes(String(item.card_id)))
			}
			return null
		}
	},

	created() {
		// console.log(this.currentCard)
		// console.log(this.cardMsg[0], getApp().globalData.gameUserId, this.is_drew)
		this.is_drew = this.cardMsg[0] === getApp().globalData.gameUserId
		if (this.currentCard.card_name.startsWith('C01') || this.currentCard.card_name.startsWith('C02') || this.currentCard.card_name.startsWith('C03') || this.currentCard.card_name.startsWith('C06')) {
			this.quantity = 1
		}
		// console.log(this.currentCard)
	},
	mounted() {
		if (this.currentCard.category_id === 9 || this.currentCard.category_id === 7 || (this.currentCard.category_id === 11 && (this.currentCard.card_name.startsWith('房屋拆迁') || this.currentCard.card_name.startsWith('股市黑天鹅') || this.currentCard.card_name.startsWith('基金业绩') || this.currentCard.card_name.startsWith('贷款利率') || this.currentCard.card_name.startsWith('互联网借贷') || this.currentCard.card_name.startsWith('租房行情')))) {
			// (this.role === 'user') && this.is_drew && this.confirm()
			this.is_drew && this.confirm()
		}
	},
	onReady() {},

	methods: {
		// 弹出键盘
		showKeyboard(parameter) {
			// uni.hideKeyboard()
			// getApp().globalData.game && getApp().globalData.game.showKeyboard()
			// // getApp().globalData.manipulate && getApp().globalData.manipulate.showKeyboard()
			// this.keyboard_data = parameter
		},
		// onChangeKeyboard(e) {
		// 	this[this.keyboard_data] += e
		// },
		// onBackspace() {
		// 	if (!this[this.keyboard_data]) return
		// 	this[this.keyboard_data] = this[this.keyboard_data].substring(0, this[this.keyboard_data].length - 1)
		// },
		handleBusiness(e) {
			// console.log(e)
			this.is_sell = e.index
		},
		cancel(meaning) {
			if (meaning === 'currentExecute') {
				AbandonCard({
					game_id: getApp().globalData.gameId,
					game_user_id: getApp().globalData.gameUserId,
					card_id: String(this.cardMsg[1])
				})
					.then((res) => {
						if (res[1].data.status === 200) {
							this.$emit('cancel')
						} else {
							uni.showToast({
								title: '操作失败！',
								icon: 'success'
								// duration: 450
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			} else if (meaning === 'stow') {
				this.$emit('cancel', 'stow')
			} else {
				this.$emit('cancel')
			}
		},
		syncAvatarStyle() {
			this.me = getApp().globalData.appListId.find((item) => item.id === getApp().globalData.gameUserId) || {}
			this.appListId = getApp().globalData.appListId.filter((item) => item.id !== getApp().globalData.gameUserId)
		},
		syncExecute() {
			this.currentExecute = getApp().globalData.currentExecute
		},
		confirm(meaning) {
			if (meaning === 'currentExecute') {
				AbandonCard({
					game_id: getApp().globalData.gameId,
					game_user_id: getApp().globalData.gameUserId,
					card_id: String(this.cardMsg[1])
				})
					.then((res) => {
						if (res[1].data.status === 200) {
							// this.$emit('cancel')
						} else {
							uni.showToast({
								title: '操作失败！',
								icon: 'success'
								// duration: 450
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
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
								// duration: 450
							})
							this.$emit('submit', 1) // 只有1代表接口的操作是成功的
						} else {
						}
					})
					.catch((err) => {
						console.log(err)
						// this.$emit('submit', 3)
					})
			} else {
				let temp_buy_number, temp_sell_number, temp_sell_id, temp_category_id, temp_receiver_id
				if (this.currentCard.category_id === 4) {
					temp_buy_number = temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
				} else if (this.currentCard.category_id === 5) {
					// 除了不需要有input框来填的
					if (!this.currentCard.card_name.startsWith('外汇交易') && !this.currentCard.card_name.startsWith('大病医疗保险')) {
						if (this.is_sell) {
							if (Number(this.sell_number) <= 0 || !Number.isInteger(Number(this.sell_number))) {
								return uni.showToast({
									title: '请输入正确的数值！',
									icon: 'error'
								})
							}
							if (this.currentCard.card_name.startsWith('股票交易') && Number(this.sell_number) % 100 !== 0) {
								return uni.showToast({
									title: '请卖出100的整数倍！',
									icon: 'error'
								})
							}
							temp_sell_number = Number(this.sell_number)
							temp_sell_id = this.sell_id
							temp_buy_number = ''
						} else {
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
							if ((this.currentCard.card_name.includes('新股上市') ||
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
							temp_buy_number = this.quantity
							temp_sell_number = temp_sell_id = ''
						}
						temp_category_id = temp_receiver_id = ''
					} else {
						temp_buy_number = 1
						temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
					}
				} else if (this.currentCard.category_id === 6) {
					temp_buy_number = temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
				} else if (this.currentCard.category_id === 8) {
					if (this.currentCard.card_name.startsWith('C01') || this.currentCard.card_name.startsWith('C02') || this.currentCard.card_name.startsWith('C03') || this.currentCard.card_name.startsWith('C06')) {
						// if (!this.quantity || Number(this.quantity) === 0) {
						if (!this.quantity) {
							return uni.showToast({
								title: '请选择正确的台数！',
								icon: 'error'
							})
						}
						temp_buy_number = this.quantity
					} else {
						temp_buy_number = 1
					}
					temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
				} else if (this.currentCard.category_id === 11) {
					if (this.product_list === null) {
						temp_buy_number = temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
					} else {
						// if (Number(this.sell_number) <= 0 || !Number.isInteger(Number(this.sell_number))) {
						// 	return uni.showToast({
						// 		title: '请检查输入是否正确！',
						// 		icon: 'error'
						// 	})
						// }
						// if (!this.currentCard.card_name.startsWith('房产行情') && Number(this.sell_number) % 100 !== 0) {
						// 	return uni.showToast({
						// 		title: '请卖出100的整数倍！',
						// 		icon: 'error'
						// 	})
						// }
						// 因为卖房产时，定为不需要传数量，故作修改
						if (!this.currentCard.card_name.startsWith('房产行情')) {
							if (Number(this.sell_number) <= 0 || !Number.isInteger(Number(this.sell_number))) {
								return uni.showToast({
									title: '请检查输入是否正确！',
									icon: 'error'
								})
							} else if (Number(this.sell_number) % 100 !== 0) {
								return uni.showToast({
									title: '请卖出100的整数倍！',
									icon: 'error'
								})
							}
							temp_sell_number = Number(this.sell_number)
						} else {
							temp_sell_number = ''
						}
						temp_sell_id = this.sell_id
						temp_buy_number = ''
					}
				} else if (this.currentCard.category_id === 12) {
					if (this.currentCard.describe.includes('免费抽取一张机会卡') || this.currentCard.describe.includes('购买一张机会卡') || this.currentCard.describe.includes('抽取一张相亲卡送给场上')) {
						if (!this.currentCard.describe.includes('抽取一张相亲卡送给场上')) {
							if (!this.cards_obtained) {
								return uni.showToast({
									title: '请选择机会卡！',
									icon: 'error'
								})
							}
						}
						if (!this.currentCard.describe.includes('免费抽取一张机会卡')) {
							if (!this.person_give) {
								return uni.showToast({
									title: '请选择要赠送的玩家！',
									icon: 'error'
								})
							}
						}
						if (this.currentCard.describe.includes('免费抽取一张机会卡')) {
							temp_category_id = getApp().globalData.cardCategoryList.find((item) => item.category_name.includes(this.cards_obtained)).id
							temp_receiver_id = ''
						} else if (this.currentCard.describe.includes('购买一张机会卡')) {
							temp_category_id = getApp().globalData.cardCategoryList.find((item) => item.category_name.includes(this.cards_obtained)).id
							temp_receiver_id = this.person_give
						} else if (this.currentCard.describe.includes('抽取一张相亲卡送给场上')) {
							temp_category_id = ''
							temp_receiver_id = this.person_give
						}
					} else {
						temp_category_id = temp_receiver_id = ''
					}
					temp_buy_number = temp_sell_number = temp_sell_id = ''
				} else if (this.currentCard.category_id === 9) {
					temp_buy_number = temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
				} else if (this.currentCard.category_id === 7) {
					temp_buy_number = temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
				} else if (this.currentCard.category_id === 10) {
					temp_buy_number = temp_sell_number = temp_sell_id = temp_category_id = temp_receiver_id = ''
				}
				ConfirmCard({
					game_id: getApp().globalData.gameId,
					game_user_id: getApp().globalData.gameUserId,
					card_id: String(this.cardMsg[1]),
					buy_number: Number(temp_buy_number),
					sell_number: Number(temp_sell_number),
					sell_id: temp_sell_id,
					category_id: String(temp_category_id),
					receiver_id: temp_receiver_id
				})
					.then((res) => {
						// console.log(res)
						// console.log(res[1].data.data)
						if (res[1].data.status === 200) {
							// 先判断是否是强制性的卡牌，不是就有操作成功提示框
							if (!(this.currentCard.category_id === 9 || this.currentCard.category_id === 7 || (this.currentCard.category_id === 11 && (this.currentCard.card_name.startsWith('房屋拆迁') || this.currentCard.card_name.startsWith('股市黑天鹅') || this.currentCard.card_name.startsWith('基金业绩') || this.currentCard.card_name.startsWith('贷款利率') || this.currentCard.card_name.startsWith('互联网借贷') || this.currentCard.card_name.startsWith('租房行情'))))) {
								uni.showToast({
									title: '操作成功！',
									icon: 'success'
									// duration: 450
								})
								// 再判断是否是可以重复执行的卡牌，不是则那个模态框只显示一次
								// if (!(this.currentCard.category_id === 5 && !this.currentCard.card_name.includes('新股上市') && (this.currentCard.card_name.startsWith('股票交易') || this.currentCard.card_name.startsWith('银行') || this.currentCard.card_name.startsWith('基金交易') || this.currentCard.card_name.startsWith('互联网')))) {
								if (!(this.currentCard.category_id === 5 && !this.currentCard.card_name.startsWith('外汇交易') && !this.currentCard.card_name.startsWith('大病医疗保险')) && !(this.currentCard.category_id === 11 && !this.currentCard.card_name.startsWith('房屋拆迁') && !this.currentCard.card_name.startsWith('股市黑天鹅') && !this.currentCard.card_name.startsWith('基金业绩') && !this.currentCard.card_name.startsWith('贷款利率') && !this.currentCard.card_name.startsWith('互联网借贷') && !this.currentCard.card_name.startsWith('租房行情'))) {
									// 其它（显示一次的）卡牌可以执行
									this.$emit('submit', 1) // 只有1代表接口的操作是成功的
								}
							}
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
	margin-top: 28rpx;
	margin-bottom: 25rpx;
	font-size: 36rpx;

	&__content {
		padding: 0 18rpx;
		font-weight: bold;
	}

	&__icon {
		font-size: 34rpx;
	}
}
// .highest-container{
// 	max-height: 65vh;
// 	overflow-y: hidden;
	.container {
		max-height: 58vh;
		overflow-y: auto;
		&::-webkit-scrollbar {
			/*滚动条整体样式*/
			display: block;
			width: 10rpx !important; /*高宽分别对应横竖滚动条的尺寸*/
			height: 0rpx !important;
			// border: 10rpx solid red;
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
		.card-container {
			width: 55vmin;
			// height: 65vmin;
			margin: 0 auto;
		}
	}
// }

// .button {
// 	margin-top: 35rpx;
// }
</style>
