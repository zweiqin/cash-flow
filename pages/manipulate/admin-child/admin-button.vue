<template>
	<!-- 弹出被动收到的模态框时，动态改变align-content，关闭房间按钮的height，其它按钮的width -->
	<view class="tn-flex tn-flex-direction-column tn-flex-nowrap tn-padding-xs tn-radius bg-flex-shadow middle-r1">
		<!-- 按钮s -->
		<!-- <view :style="{ height: close_btn_height }">
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
		<view v-for="(item, index) in button_right" :key="index" class="tn-shadow-blur" style="z-index: 2;">
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
		</view> -->

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="padding: 1vh 1vh; box-shadow: 0 0 0 0 #220088, -9rpx 0 10rpx 0 #220088 inset, 9rpx 0 10rpx 0 #220088 inset, 0 0 0 0 #220088;border-color:#220088">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('next')"
						>
							<text>下一位</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #2200aa, -9rpx 0 10rpx 0 #2200aa inset, 9rpx 0 10rpx 0 #2200aa inset, 0 0 0 0 #2200aa;border-color:#2200aa">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('wasteMoney')"
						>
							<text>送钱</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('payOff')"
						>
							<text>发工资</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 96px;"
							@click="handleProcessing('deductMoney')"
						>
							<text>扣钱（触犯规则）</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #4400cc, -9rpx 0 10rpx 0 #4400cc inset, 9rpx 0 10rpx 0 #4400cc inset, 0 0 0 0 #4400cc;border-color:#4400cc">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							style="min-width: 88px;" @click="handleProcessing('debitCard0副业')"
						><text>【小机会】副业</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							style="min-width: 88px;" @click="handleProcessing('debitCard0金融')"
						><text>【小机会】金融</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							style="min-width: 88px;" @click="handleProcessing('debitCard0房地产')"
						><text>【大机会】房地产</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							style="min-width: 88px;" @click="handleProcessing('debitCard0企业')"
						><text>【大机会】企业</text></tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #4400cc, -9rpx 0 10rpx 0 #4400cc inset, 9rpx 0 10rpx 0 #4400cc inset, 0 0 0 0 #4400cc;border-color:#4400cc">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">

				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							@click="handleProcessing('debitCard1行情')"
						><text>行情卡</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							@click="handleProcessing('debitCard1觉察')"
						><text>觉察卡</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							@click="handleProcessing('debitCard1相亲卡')"
						><text>相亲卡</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							@click="handleProcessing('debitCard1逆流')"
						><text>逆流卡</text></tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true" width="25vw" height="auto" background-color="tn-cool-bg-color-2"
							:font-size="2" font-unit="vh" padding="2vh 1vw" margin="0 2vh"
							@click="handleProcessing('debitCard1项目')"
						><text>项目卡</text></tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #5500ff, -9rpx 0 10rpx 0 #5500ff inset, 9rpx 0 10rpx 0 #5500ff inset, 0 0 0 0 #5500ff;border-color:#5500ff">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 75px;"
							@click="handleProcessing('freeEnergy')"
						>
							<text>休息 补充精力</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="auto"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 146px;"
							@click="handleProcessing('anniversary')"
						>
							<text>结婚纪念/结算日 补充精力</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #7744ff, -9rpx 0 10rpx 0 #7744ff inset, 9rpx 0 10rpx 0 #7744ff inset, 0 0 0 0 #7744ff;border-color:#7744ff">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('givesBirth')"
						>
							<text>生孩子</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="auto"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 210px;"
							@click="handleProcessing('heartbreak')"
						>
							<text>心碎（逆流失恋/离婚、顺流层离婚）</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('unemployment')"
						>
							<text>失业</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('fall')"
						>
							<text>破产</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #9f88ff, -9rpx 0 10rpx 0 #9f88ff inset, 9rpx 0 10rpx 0 #9f88ff inset, 0 0 0 0 #9f88ff;border-color:#9f88ff">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 50px;"
							@click="handleProcessing('charitable')"
						>
							<text>平流慈善</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 50px;"
							@click="handleProcessing('charity')"
						>
							<text>逆流慈善</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #ccbbff, -9rpx 0 10rpx 0 #ccbbff inset, 9rpx 0 10rpx 0 #ccbbff inset, 0 0 0 0 #ccbbff;border-color:#ccbbff">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('trustPrice')"
						>
							<text>做信托</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							@click="handleProcessing('riskInvestment')"
						>
							<text>做风投</text>
						</tn-button>
					</view>
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 50px;"
							@click="handleProcessing('riskReturn')"
						>
							<text>风投回报</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #ccccff, -9rpx 0 10rpx 0 #ccccff inset, 9rpx 0 10rpx 0 #ccccff inset, 0 0 0 0 #ccccff;border-color:#ccccff">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 50px;"
							@click="handleProcessing('dreamer')"
						>
							<text>买下梦想</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<view class="tn-width-full tn-text-center tn-border-dashed-top" style="margin-top: 1vh; padding: 1vh 1vh; box-shadow: 0 0 0 0 #ccddff, -9rpx 0 10rpx 0 #ccddff inset, 9rpx 0 10rpx 0 #ccddff inset, 0 0 0 0 #ccddff;border-color:#ccddff">
			<!-- 阴影位置：上左右下 -->
			<tn-scroll-list :indicator="false" style="padding-bottom: 0;">
				<view class="tn-flex">
					<view style="z-index: 2;">
						<tn-button
							:shadow="true"
							width="25vw"
							height="auto"
							background-color="tn-cool-bg-color-2"
							:font-size="2"
							font-unit="vh"
							padding="2vh 1.5vw"
							margin="0 2vh"
							style="min-width: 50px;"
							@click="handleProcessing('关闭房间')"
						>
							<text>关闭房间</text>
						</tn-button>
					</view>
				</view>
			</tn-scroll-list>
		</view>

		<!-- 按钮e -->
	</view>
</template>

<script>
export default {
	props: {
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
			]

		}
	},

	watch: {
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
	height: 100%;
	.tn-width-full {
		// box-shadow: 0 0 0 0!important;
		box-shadow: 0 0 0 0 #220088, -9rpx 0 10rpx 0 #220088 inset, 9rpx 0 10rpx 0 #220088 inset, 0 0 0 0 #220088!important;
		border-color:#220088!important;
		text {
			white-space: nowrap;
		}
	}
}
</style>
