<template>
	<!-- <view class="tn-flex tn-flex-row-around tn-margin-top-xs layer-3"> -->
	<view class="tn-flex tn-flex-row-around layer-3">
		<view class="justify-content-item">
			<view class="tn-padding-xs tn-radius bg-flex-shadow">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>月现金流：</text><text :class="cash_flow < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(cash_flow) }}</text>
				</tn-tag>
			</view>
			<view class="tn-padding-xs tn-radius bg-flex-shadow" style="margin-top: 5rpx;">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>被动收入：</text><text :class="passive_in < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(passive_in) }}</text>
				</tn-tag>
			</view>
		</view>

		<view class="justify-content-item">
			<view class="tn-padding-xs tn-radius bg-flex-shadow">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>现金：</text><text :class="cash_on_hand < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(cash_on_hand) }}</text>
				</tn-tag>
			</view>
			<view class="tn-padding-xs tn-radius bg-flex-shadow" style="margin-top: 5rpx;">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>精力：</text><text :class="energy < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(energy) }}</text>
				</tn-tag>
			</view>
		</view>

		<view class="justify-content-item">
			<view class="tn-padding-xs tn-radius bg-flex-shadow">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>总收入：</text><text :class="basics_in < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(basics_in) }}</text>
				</tn-tag>
			</view>
			<view class="tn-padding-xs tn-radius bg-flex-shadow" style="margin-top: 5rpx;">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>总支出：</text><text :class="basics_out < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(basics_out) }}</text>
				</tn-tag>
			</view>
		</view>

		<view class="justify-content-item">
			<view class="tn-padding-xs tn-radius bg-flex-shadow">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0.8)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<text>慈善：</text><text :class="charitable < 0 ? 'tn-color-red' : 'tn-color-white'">{{ cutApart(charitable) }}</text>
				</tn-tag>
			</view>
			<view class="tn-padding-xs tn-radius bg-flex-shadow" style="margin-top: 5rpx;">
				<tn-tag
					width="22vw"
					height="4.2vh"
					shape="circleRight"
					background-color="rgba(1, 190, 255, 0)"
					:font-size="1.7"
					font-unit="vw"
					font-color="tn-color-white"
					margin="2rpx 2rpx"
				>
					<!-- none -->
					<view class="tn-flex tn-flex-wrap tn-flex-row-right" style="width: 20vw;">
						<tn-badge background-color="#0000FF" font-color="#FFFF33" :absolute="false" :translate-center="false" right="0">
							<text>{{ is_unemploy ? '失业' : '在工作' }}</text>
						</tn-badge>
						<tn-badge background-color="#0000FF" font-color="#FFFF33" :absolute="false" :translate-center="false" right="0" top="38rpx">
							<text>{{ rest_num === 0 ? '剩2次免费精力休息' : rest_num === 1 ? '剩1次免费精力休息' : '免费休息次数用光' }}</text>
						</tn-badge>
					</view>
				</tn-tag>
			</view>
		</view>
	</view>
</template>

<script>
import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	data() {
		return {
			cash_flow: 99,
			passive_in: 99,
			cash_on_hand: 99,
			energy: 99,
			basics_in: 99,
			basics_out: 99,
			charitable: 99,
			is_unemploy: 0,
			rest_num: 0
		}
	},
	mounted() {},
	methods: {
		cutApart,
		setButtom(obj) {
			this.cash_flow = obj.cash_flow
			this.passive_in = obj.passive_in
			this.cash_on_hand = obj.cash_on_hand
			this.energy = obj.energy
			this.basics_in = obj.basics_in
			this.basics_out = obj.basics_out
			this.charitable = obj.charitable
			this.is_unemploy = obj.is_unemploy
			this.rest_num = obj.rest_num
			// console.log(this.employ, this.rest)
		}
	}
}
</script>

<style lang="scss" scoped>
.layer-3 {
	height: 100%;
	font-family: SimHei, sans-serif, monospace;
	background-color: rgba(68, 68, 68, 0.4);
	border-radius: 36rpx;
	// opacity: 0.5;
	.justify-content-item {
		display: flex;
		flex-direction: column;
		& > view {
			flex: 1;
		}
		.tn-tag {
			justify-content: space-between;
			font-weight: 700;
		}
	}
	& > .justify-content-item:last-child > view:last-child {
		// display: none;
		// opacity: 0;
		// flex: 0.5;
		// margin-bottom: -10px;
		// overflow: auto;
	}
}

.layer-3 .bg-flex-shadow {
	// background-color: #ffb3ff;
}
</style>
