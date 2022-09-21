<template>
	<!-- 副业 -->
	<view class="tn-flex tn-flex-direction-column tn-flex-row-between tn-text-center tn-text-bold tn-color-white container" style="border-radius: 20rpx;">
		<view class="container-top tn-text-md">
			<view>{{ card_name_top }}</view> <view>{{ card_name_bottom }}</view>
		</view>
		<view class="container-among">{{ card.describe }}</view>
		<view class="container-middle">
			<hr />
			<!-- ☆○●★ -->
			<view><text>副业投资：☆ {{ card.out }}</text></view>
			<view><text>副业收入：☆ {{ card.in }}</text></view>
			<view><text>精力：{{ card.energy }}</text></view>
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
	background-color: #42267A;
	overflow: auto;
	.container-top {
		padding: 3vmin 0;
	}
	.container-among {
		padding: 0 3vmin;
	}
	.container-middle {
		margin: 3vmin 0;
		padding: 1.5vmin;
		background-color: #6E3BBC;
		hr:first-child {
			margin-bottom: 1.8vmin;
		}
		hr:last-child {
			margin-top: 1.8vmin;
		}
		hr {
		background-color: #4C2992;
			opacity: 0.3;
		}
	}
	.container-bottom {
		padding-bottom: 2vmin;
	}
}
</style>
