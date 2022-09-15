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
					<text>月现金流：</text><text>{{ cutApart(cash_flow) }}</text>
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
					<text>被动收入：</text><text>{{ cutApart(passive_in) }}</text>
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
					<!-- 主管说要把存储改为现金 -->
					<text>现金：</text><text>{{ cutApart(cash_on_hand) }}</text>
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
					<text>精力：</text><text>{{ cutApart(energy) }}</text>
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
					<text>总收入：</text><text>{{ cutApart(basics_in) }}</text>
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
					<text>总支出：</text><text>{{ cutApart(basics_out) }}</text>
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
					<text>慈善：</text><text>{{ cutApart(charitable) }}</text>
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
				>none</tn-tag>
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
			charitable: 99
		}
	},
	mounted() {
	},
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
			opacity: 0;
			// flex: 0.5;
			// margin-bottom: -10px;
		}
	}

.layer-3 .bg-flex-shadow {
	// background-color: #ffb3ff;
}
</style>
