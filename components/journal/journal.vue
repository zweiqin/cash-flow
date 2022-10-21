<template>
	<view class="tn-bg-white tn-flex tn-flex-direction-column tn-flex-row-between" style="overflow-y: auto;width: 60vw;height: 65vh;padding: 1vh;">
		<view>
			<tn-tabs :list="scrollList" :current="current" background-color="#FFFFFF" @change="tabChange"></tn-tabs>
		</view>
		<view>
			<view v-for="(item,index) in log_list" :key="index">
				<tn-list-view :card="true" :title="`第${item[0].batch}轮`" background-color="#EFEFEF">
					<block>
						<tn-list-cell
							v-for="(part,i) in item" :key="i" :arrow="false"
							:arrow-right="false" :unlined="false" :line-left="true" :line-right="true"
						>
							<view>
								<text :class="part.log_info.startsWith('轮到玩家')&&part.log_info.endsWith('回合')?'tn-color-blue':''">{{ part.log_info }}</text>
							</view>
						</tn-list-cell>
					</block>
				</tn-list-view>
			</view>
		</view>

		<view class="tn-flex tn-flex-row-around tn-flex-col-center tn-bg-white" style="position: sticky;bottom: 0;">
			<view><tn-button background-color="tn-main-gradient-indigo--light" margin="10rpx 10rpx" @click="changePage('up')">上一页</tn-button></view>
			<view>
				{{ `第${page}页 / 共${Math.ceil(total/5)}页` }}
			</view>
			<view><tn-button background-color="tn-main-gradient-indigo--single" font-color="rgba(255, 255, 255, 0.8)" margin="10rpx 10rpx" @click="changePage('down')">下一页</tn-button></view>
		</view>
	</view>
</template>

<script>
import { GetLogList } from 'config/api.js'

export default {
	props: {
	},
	data() {
		return {
			page: 1,
			// limit: 5,
			log_list: [
				// [
				// 	{
				// 		'id': 1131,
				// 		'log_info': 'banker发工资1000元给玩家仓鼠',
				// 		'game_user_id': 184,
				// 		'game_id': 117,
				// 		'create_time': '2022-10-20 15:52:37',
				// 		'batch': 78
				// 	}
				// ],
				// [
				// 	{
				// 		'id': 1118,
				// 		'log_info': '玩家仓鼠与邻家女孩结婚了',
				// 		'game_user_id': 184,
				// 		'game_id': 117,
				// 		'create_time': '2022-10-20 15:51:16',
				// 		'batch': 76
				// 	},
				// 	{
				// 		'id': 1117,
				// 		'log_info': '玩家仓鼠抽到了邻家女孩',
				// 		'game_user_id': 184,
				// 		'game_id': 117,
				// 		'create_time': '2022-10-20 15:51:16',
				// 		'batch': 76
				// 	}
				// ]
			],
			total: 1,
			current: 0,
			scrollList: [ { name: '全部' } ].concat(getApp().globalData.appListId.map((item) => ({ name: item.userName }))),
			appListId: getApp().globalData.appListId
		}
	},

	computed: {
	},

	watch: {
	},

	created() {
		// console.log(this.log_list)
		this.changePage()
	},

	onReady() {},
	methods: {
		// tab选项卡切换
		tabChange(index) {
			this.current = index
			// console.log(this.current)
			this.changePage()
		},
		changePage(meaning) {
			if (meaning === 'up') this.page - 1 === 0 ? this.$t.message.toast('已经是第一页~') : this.page--
			if (meaning === 'down') this.page === Math.ceil(this.total / 5) ? this.$t.message.toast('已经是最后一页~') : this.page++
			GetLogList({
				game_id: Number(getApp().globalData.gameId),
				// game_id: 117,
				game_user_id: this.current === 0 ? '' : this.appListId[this.current - 1].id,
				page: String(this.page),
				limit: '5'
			})
				.then((res) => {
					// console.log(res)
					// console.log(res[1].data.data)
					if (res[1].data.status === 200) {
						// uni.showToast({
						// 	title: '操作成功',
						// 	icon: 'success'
						// })
						// console.log(res)
						this.log_list = res[1].data.data.items || []
						this.total = res[1].data.data.total || 1
						// console.log(this.log_list)
					} else {
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
</style>
