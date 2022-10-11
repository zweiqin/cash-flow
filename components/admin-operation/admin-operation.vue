<template>
	<view>
		<view v-if="currentCard.category_id === 7">
			<view v-if="currentCard.card_name.startsWith('团体') && currentCard.card_name.includes('病毒传染')">
				<view class="tn-padding-top">
					<tn-list-view
						:card="true"
						title="请选择掷骰子点数小于或等于3的玩家(可多选)："
						background-color="#EFEFEF"
					>
						<tn-checkbox-group v-model="sick_arr">

							<tn-list-cell v-for="(item,index) in appListId" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
								<view>
									<tn-checkbox :name="item.id" :disabled="item.isDead!=='0'">
										<text v-if="item.isDead!=='0'">（猝死）</text>
										<text>用户{{ index+1 }}：</text>
										{{ `${item.userName}(${item.roleName})` }}
									</tn-checkbox>
								</view>
							</tn-list-cell>

						</tn-checkbox-group>
					</tn-list-view>
				</view>
				<view class="tn-flex tn-flex-row-around tn-padding-top">
					<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">关闭</tn-button>
					<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm('sick')">确定</tn-button>
				</view>
			</view>
			<view v-if="currentCard.card_name.startsWith('团体') && currentCard.card_name.includes('公司裁员')">
				<view class="tn-padding-top">
					<tn-list-view
						:card="true"
						title="请选择掷骰子点数小于或等于3的玩家(逐个操作)："
						background-color="#EFEFEF"
					>
						<tn-radio-group v-model="dismissal">

							<tn-list-cell v-for="(item,index) in appListId" :key="item.id" :arrow="false" :arrow-right="false" :unlined="false" :line-left="true" :line-right="true">
								<view>
									<tn-radio :name="item.id" :disabled="item.isDead!=='0'">
										<text v-if="item.isDead!=='0'">（在顺流层）</text>
										<text v-if="item.isRichCircle!=='0'">（猝死）</text>
										<text>用户{{ index+1 }}：</text>
										{{ `${item.userName}(${item.roleName})` }}
									</tn-radio>
								</view>
							</tn-list-cell>

						</tn-radio-group>
					</tn-list-view>
				</view>
				<view class="tn-flex tn-flex-row-around tn-padding-top">
					<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="cancel()">关闭</tn-button>
					<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="30%" @click="confirm('unemployment')">确定</tn-button>
				</view>
			</view>
			<view v-else class="tn-flex tn-flex-row-around tn-padding-top"> <tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button> </view>
		</view>
		<view v-else class="tn-flex tn-flex-row-around tn-padding-top">
			<tn-button background-color="#01BEFF" font-color="#FFFFFF" width="50%" @click="cancel()">关闭</tn-button>
		</view>
	</view>
</template>

<script>
// 接口
import { Sick, Unemployment } from 'config/api.js'

export default {
	data() {
		return {
			currentCard: getApp().globalData.currentCard,
			appListId: getApp().globalData.appListId,
			sick_arr: [],
			dismissal: ''
		}
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},
		confirm(meaning) {
			// console.log(this.sick_arr)
			if (meaning === 'sick') {
				if (this.sick_arr.length === 0) {
					return uni.showToast({
						title: '请选择玩家！',
						icon: 'error'
					})
				}
				Sick({
					game_id: Number(getApp().globalData.gameId),
					game_user_list: this.sick_arr
				})
					.then((res) => {
					// console.log(res)
						if (res[1].data.status === 200) {
							uni.showToast({
								title: '操作成功',
								icon: 'success'
							})
							this.cancel()
						} else {
						}
					})
					.catch((err) => {
						console.log(err)
					})
			} else if (meaning === 'unemployment') {
				if (!this.dismissal) {
					return uni.showToast({
						title: '请选择玩家！',
						icon: 'error'
					})
				}
				Unemployment({
					game_id: Number(getApp().globalData.gameId),
					game_user_id: Number(this.dismissal)
				})
					.then((res) => {
					// console.log(res)
						if (res[1].data.status === 200) {
							this.dismissal = ''
							uni.showToast({
								title: '操作成功',
								icon: 'success'
							})
						} else {
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

<style></style>
