<template>
	<view class="tn-flex tn-flex-direction-column tn-flex-row-between tn-text-center tn-text-bold tn-color-white container" style="border-radius: 20rpx;">
		<view class="container-top tn-text-md">
			<view>{{ card_name_top }}</view> <view>{{ card_name_bottom }}</view>
		</view>
		<view class="container-among">{{ card.describe }}</view>
		<view class="container-middle">
			<hr />
			<!-- ☆○●★ -->
			<view><text>首付：☆ {{ card.assets_num }}</text></view>
			<view><text>房产总价：☆ {{ card.assets_value }}</text></view>
			<view><text>抵押贷款：☆ {{ card.liabilit }}</text></view>
			<!-- <view><text>价格范围：☆ {{ card.range }}</text></view> -->
			<view><text>价格范围：☆ 未知</text></view>
			<view><text>被动收入：☆ {{ card.in }}/月</text><text v-html="'&nbsp;&nbsp;'"></text><text>精力：{{ card.energy }}</text></view>
			<hr />
		</view>
		<view class="container-bottom"><text>财富想自由，多推财富流。</text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			card: '',
			card_name_top: '',
			card_name_bottom: ''
		}
	},

	computed: {},
	created() {
		this.card = getApp().globalData.currentCard
		const temp_arr = this.card.card_name.split('-')
		this.card_name_top = temp_arr[0]
		this.card_name_bottom = temp_arr[1]
	},
	mounted() {},
	methods: {}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	background-color: #364570;
	overflow: auto;
	.container-top {
		padding: 8px 0;
	}
	.container-among {
		padding: 0 8px;
	}
	.container-middle {
		margin: 8px 0;
		padding: 8px;
		background-color: #273650;
		hr:first-child {
			margin-bottom: 5px;
		}
		hr:last-child {
			margin-top: 5px;
		}
		hr {
			opacity: 0.3;
		}
	}
	.container-bottom {
		padding-bottom: 8px;
	}
}
</style>
