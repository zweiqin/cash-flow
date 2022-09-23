<template>
	<view class="tn-flex tn-flex-direction-column tn-flex-row-between tn-text-center tn-text-bold tn-color-white container" :class="card_bg" style="border-radius: 20rpx;">
		<view v-if="card_name_text" class="tn-bg-orangeyellow card-name-text">
			<view class="card-text">
				<text class="tn-color-gray">{{ card_name_text }}</text>
			</view>
		</view>
		<view class="container-top tn-text-md">
			<view>{{ card_name_top }}</view> <view>{{ card_name_bottom }}</view>
		</view>
		<view class="container-among">{{ desc }}</view>
		<view class="container-middle">
			<hr />
			<!-- ☆○●★ -->
			<!-- <view><text>首付：☆ {{ card.assets_num }}</text></view>
			<view><text>房产总价：☆ {{ card.assets_value }}</text></view>
			<view><text>抵押贷款：☆ {{ card.liabilit }}</text></view>
			<view><text>价格范围：☆ 未知</text></view>
			<view><text>被动收入：☆ {{ card.in }}/月</text><text v-html="'&nbsp;&nbsp;'"></text><text>精力：{{ card.energy }}</text></view> -->
			<view v-for="(item,index) in card_info" :key="index">
				<text>{{ item }}</text>
			</view>
			<hr />
		</view>
		<view class="container-bottom"><text>财富想自由，多推财富流。</text></view>
	</view>
</template>

<script>
export default {
	props: {
		card: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			card_bg: '',
			card_name_top: '',
			card_name_bottom: '',
			card_name_text: false,
			card_info: [],
			desc: ''
		}
	},

	computed: {},
	created() {
		switch (this.card.category_id) {
			case 4:
				this.card_bg = 'side-hustle'
				break
			case 5:
				this.card_bg = 'finance'
				break
			case 6:
				this.card_bg = 'real-estate'
				break
			case 8:
				this.card_bg = 'enterprise'
				break
			case 11:
				this.card_bg = 'quotation'
				break
			case 12:
				this.card_bg = 'perceive'
				break
			case 9:
				this.card_bg = 'blind-date'
				break
			case 7:
				this.card_bg = 'backset'
				break
			case 10:
				this.card_bg = 'project'
		}
		const temp_arr = this.card.card_name.split('/')

		// 不用这种方式，考虑到temp_arr[0]里可能有多个-
		// const temp_name = temp_arr[0].split('-')
		// this.card_name_top = temp_name[0]
		// this.card_name_bottom = temp_name[1]

		const name_arr = temp_arr[0].match(/([^-]*)-(.*)/)
		if (name_arr) {
			this.card_name_top = name_arr[1].substring(0, name_arr[1].length)
			this.card_name_bottom = name_arr[2]
		} else {
			this.card_name_top = temp_arr[0]
		}

		this.card_name_text = temp_arr[1] || false
		let temp_info = this.card.describe.match(/\[(.+?)\]/g)
		if (temp_info) {
			temp_info = temp_info[0].substring(1, temp_info[0].length - 1)
			this.card_info = temp_info.split(' ')
			// console.log(temp_info, this.card_info)
			const temp_desc = this.card.describe.match(/(\S*)\[/)
			// if (temp_desc) {
			this.desc = this.card.describe.match(/(\S*)\[/)[1]
			// }
		} else {
			this.desc = this.card.describe
		}
	},
	mounted() {},
	methods: {}
}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: auto;
	.card-name-text {
		position: absolute;
		top: 0;
		left: 0;
		width: 14vmin;
		height: 12vmin;
		border-radius: 0 0 80% 0;
		.card-text{
			margin-left: -1vmin;
			margin-top: 4vmin;
			transform: rotateZ(-50deg); /*旋转*/
			text {
				white-space: nowrap;
				text-align: center;
			}
		}
	}
	.container-top {
		padding: 6vmin 0;
	}
	.container-among {
		padding: 0 6vmin;
	}
	.container-middle {
		margin: 3vmin 0;
		padding: 1.5vmin 6vmin;
		background-color: #273650;
		hr:first-child {
			margin-bottom: 1.8vmin;
		}
		hr:last-child {
			margin-top: 1.8vmin;
		}
		hr {
			opacity: 0.6;
		}
	}
	.container-bottom {
		padding-bottom: 3vmin;
	}
}

// <!-- 副业 -->4
.side-hustle {
	background-color: #42267a;
	.container-middle {
		background-color: #6e3bbc;
		hr {
			background-color: #4c2992;
		}
	}
}

// <!-- 金融 -->5
.finance {
	background-color: #571a17;
	.container-middle {
		background-color: #db641f;
		hr {
			background-color: #661808;
		}
	}
}

// <!-- 房地产 -->6
.real-estate {
	background-color: #364570;
	.container-middle {
		background-color: #273650;
		hr {
			background-color: #8e8f93;
		}
	}
}

// <!-- 企业 -->8
.enterprise {
	background-color: #29295f;
	.container-middle {
		background-color: #1a1a32;
		hr {
			background-color: #8e8f93;
		}
	}
}

// <!-- 行情 -->11
.quotation {
	background-color: #514d4c;
	.container-middle {
		background-color: #537b70;
		hr {
			background-color: #36494c;
		}
	}
}

// <!-- 觉察 -->12
.perceive {
	background-color: #226c41;
	.container-middle {
		background-color: #51bf80;
		hr {
			background-color: #09672b;
		}
	}
}

// <!-- 相亲 -->9
.blind-date-male {
	background-color: #175ca7;
	.container-middle {
		background-color: #3c93e2;
		hr {
			background-color: #195caa;
		}
	}
}
.blind-date-female {
	background-color: #d30055;
	.container-middle {
		background-color: #980035;
		hr {
			background-color: #d00058;
		}
	}
}
.blind-date {
	background-color: #ea9d9d;
	.container-middle {
		background-color: #c80000;
		hr {
			background-color: #ffffff;
		}
	}
}

// <!-- 逆流 -->7
.backset {
	background-color: #463138;
	.container-middle {
		background-color: #69678f;
		hr {
			background-color: #231f3c;
		}
	}
}

// <!-- 项目 -->10
.project {
	background-color: #8f752b;
	.container-middle {
		background-color: #d3b143;
		hr {
			background-color: #906f12;
		}
	}
}
</style>
