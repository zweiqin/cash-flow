<template>
	<!-- 弹出被动收到的模态框时，动态改变align-content，关闭房间按钮的height，其它按钮的width -->
	<view class="tn-flex tn-flex-direction-column tn-flex-wrap tn-padding-xs tn-radius bg-flex-shadow middle-r1" :style="{ alignContent: align_content_btn, height: height }">
		<!-- 按钮s -->
		<view :style="{ height: close_btn_height }">
			<tn-button
				:shadow="true"
				width="15vw"
				height="auto"
				background-color="tn-cool-bg-color-16"
				:font-size="40"
				:font-bold="true"
				padding="2vw 10rpx"
				margin="10rpx 0"
				@click="handleProcessing('关闭房间')"
			>
				<text>关闭房间</text>
			</tn-button>
		</view>
		<view v-for="(item, index) in button_right" :key="index" class="tn-shadow-blur" style="z-index: 4;">
			<tn-button
				:shadow="true"
				:width="rest_btn_width"
				height="auto"
				background-color="tn-cool-bg-color-2"
				:font-size="28"
				padding="28rpx 10rpx"
				margin="10rpx 0"
				@click="handleProcessing(item.meaning)"
			>
				<text>{{ item.name }}</text>
			</tn-button>
		</view>
		<!-- 按钮e -->
	</view>
</template>

<script>
export default {
	props: {
		isShowModelPa: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			// 按钮列表
			button_right: [
				{
					name: '下一位',
					meaning: 'next'
				},
				{
					name: '送钱',
					meaning: 'wasteMoney'
				},
				{
					name: '发工资',
					meaning: 'payOff'
				},
				{
					name: '扣钱（触犯规则）',
					meaning: 'deductMoney'
				},
				{
					name: '抽卡',
					meaning: 'debitCard'
				},
				{
					name: '玩家休息精力补充',
					meaning: 'freeEnergy'
				},
				{
					name: '玩家选择结婚纪念（日）/结算日的精力补充',
					meaning: 'anniversary'
				},
				{
					name: '玩家生孩子',
					meaning: 'givesBirth'
				},
				{
					name: '心碎（逆流层失恋/逆流层离婚/顺流层离婚）',
					meaning: 'heartbreak'
				},
				{
					name: '逆流层失业',
					meaning: 'unemployment'
				},
				{
					name: '玩家破产',
					meaning: 'fall'
				},
				{
					name: '玩家做平流慈善',
					meaning: 'charitable'
				},
				{
					name: '玩家做顺流慈善',
					meaning: 'charity'
				},
				{
					name: '玩家做信托',
					meaning: 'trustPrice'
				},
				{
					name: '玩家做风投',
					meaning: 'riskInvestment'
				},
				{
					name: '玩家的风投回报',
					meaning: 'riskReturn'
				},
				{
					name: '玩家买下梦想',
					meaning: 'dreamer'
				}
			],

			// 弹出被动收到的模态框时，动态改变的样式
			align_content_btn: 'space-around',
			close_btn_height: '100%',
			rest_btn_width: '30vw',
			height: '100%'
		}
	},

	watch: {
		isShowModelPa(newVal, oldVal) {
			if (newVal) {
				this.align_content_btn = 'space-between'
				this.close_btn_height = '0'
				this.rest_btn_width = '20vw'
				this.height = '200%'
			} else {
				this.align_content_btn = 'space-around'
				this.close_btn_height = '100%'
				this.rest_btn_width = '30vw'
				this.height = '100%'
			}
		}
	},

	methods: {
		handleProcessing(significance) {
			this.$emit('clickBtn', significance)
		}
	}
}
</script>

<style lang="scss" scoped>
.middle-r1 {
	// flex: 1;
	// height: 100%;
	min-height: 100%;
	max-height: 1250rpx;
	// overflow-y: auto; //父组件加了，这里就不用加了，否则没效果
	// align-content: flex-end;
	// transition: all 3s;
	& > view:first-child {
		transition: height 0.6s;
	}
	.tn-shadow-blur {
		transition: width 0.6s;
	}
}
</style>
