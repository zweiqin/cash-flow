<template>
	<view class="tn-text-center tn-padding-left-sm tn-padding-right-sm">
		<view class="tn-border-solid-bottom tn-border-purplered tn-text-bold pad-top">资产</view>
		<view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">觉察投资</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">权益</view>
				</view>
				<view v-for="item in asset1" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-center tn-flex-row-center">{{ item.card_name }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-center tn-flex-row-center">{{ getEquity(item.card_id) }}</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">股票代码</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">每股成本</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">股数</view>
				</view>
				<view v-for="item in asset2" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">房地产代码</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">数量</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">价值</view>
				</view>
				<view v-for="item in asset3" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">项目代码</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm">投资金额</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">被动收入</view>
				</view>
				<view v-for="item in asset4" :key="item.id" class="tn-flex pad-top">
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black">{{ item.card_name }}</view>
					<view class="tn-flex-4 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.value) }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(item.num) }}</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex pad-top">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black">信托投资</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm">信托被动收入</view>
				</view>
				<view class="tn-flex pad-top">
					<view class="tn-flex-2 tn-border-solid-bottom tn-border-black tn-flex tn-flex-col-center tn-flex-row-center">{{ trust_price }}</view>
					<view class="tn-flex-3 tn-border-solid-bottom tn-border-black tn-margin-left-sm tn-flex tn-flex-col-center tn-flex-row-center">{{ cutApart(trust_price * 0.01) }}</view>
				</view>
			</view>
			<view class="tn-border-solid-bottom tn-border-purplered tn-padding-bottom-sm">
				<view class="tn-flex tn-border-solid-bottom tn-border-black pad-top">
					<view class="tn-flex-2 tn-text-left">风投资金</view>
					<view class="tn-flex-3 tn-text-right tn-flex tn-flex-col-bottom tn-flex-row-right">{{ cutApart(venture_capital) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import cutApart from '@/utils/cut-apart/cut-apart.js'
export default {
	data() {
		return {
			asset1: [ {
				id: 1,
				card_name: '无',
				card_id: 0
			} ],
			asset2: [ {
				id: 1,
				card_name: '无',
				num: 0,
				value: 0
			} ],
			asset3: [ {
				id: 1,
				card_name: '无',
				num: 0,
				value: 0
			} ],
			asset4: [ {
				id: 1,
				card_name: '无',
				num: 0,
				value: 0
			} ],
			trust_price: 0,
			venture_capital: 0,
			cardList: getApp().globalData.cardList
		}
	},
	mounted() {},
	methods: {
		cutApart,
		setAssets(obj) {
			// 这种方法由1变成0的时候有漏洞，即不会重新赋值
			// obj.asset1.length && (this.asset1 = obj.asset1)
			// obj.asset2.length && (this.asset2 = obj.asset2)
			// obj.asset3.length && (this.asset3 = obj.asset3)
			// obj.asset4.length && (this.asset4 = obj.asset4)
			// 改进方法，无论如何都要赋值
			this.asset1 = obj.asset1.length ? obj.asset1 : [ { id: 1, card_name: '无', card_id: 0 } ]
			this.asset2 = obj.asset2.length ? obj.asset2 : [ { id: 1, card_name: '无', num: 0, value: 0 } ]
			this.asset3 = obj.asset3.length ? obj.asset3 : [ { id: 1, card_name: '无', num: 0, value: 0 } ]
			this.asset4 = obj.asset4.length ? obj.asset4 : [ { id: 1, card_name: '无', num: 0, value: 0 } ]
			this.trust_price = obj.trust_price
			this.venture_capital = obj.venture_capital
			this.cardList = getApp().globalData.cardList
		},
		getEquity(id) {
			const temp_obj = this.cardList.find((item) => item.id === id)
			// console.log(this.asset1, temp_obj) // .substring(1, temp_info[0].length - 1)
			return temp_obj ? temp_obj.describe.match(/\[(.+?)\]/g)[0] : '未知'
		}
	}
}
</script>

<style lang="scss" scoped>
.tn-text-center {
	height: 100%;
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
}
</style>
