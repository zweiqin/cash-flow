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
					<text>月现金流：</text><text>{{ cutApart(99999999999) }}</text>
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
					<text>被动收入：</text><text>{{ cutApart(999999999998) }}</text>
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
					<text>存款：</text><text>{{ cutApart(10200000000) }}</text>
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
					<text>精力：</text><text>{{ cutApart(103) }}</text>
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
					<text>总收入：</text><text>{{ cutApart(104) }}</text>
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
					<text>总支出：</text><text>{{ cutApart(105) }}</text>
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
					<text>慈善：</text><text>{{ cutApart(1111111111111) }}</text>
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
		}
	},
	mounted() {
	},
	methods: {
		cutApart
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
