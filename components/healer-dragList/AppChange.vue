<template>
	<!--
		组件思路：
		利用touch事件返回坐标值，赋值滑动视图，得到滑动视图跟随鼠标的效果，视觉上达到拖拽。
	-->
	<view class="">
		<!-- 可移动区域容器 -->
		<view id="areaBox" class="movarea">
			<!-- 这块只是循环出固定内容，监听其元素touch事件 -->
			<view ref="appList" class="appList">
				<view
					v-for="(appItem, index) in listData_c"
					:id="'appLi' + index"
					:key="index"
					class="app-li text-blue"
					:class="touchIndex === index ? 'select' : ''"
					@tap="AppLi_click(index)"
				>
					<text :class="['appIcon', appItem.appIcon]"></text> <text class="appName">{{ appItem.appName }}</text>
					<!-- <text class="appicon cuIcon-roundclosefill tn-icon-close" :class="deleteAppID === index ? '' : 'hide'" @tap="deleteAppItem(index)"></text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppChange',
	props: {
		listData: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			listData_c: this.listData, // 缓存props，(不建议直接修改props)
			// CheckAppId: null,
			deleteAppID: null, // 触发删除的itemID
			touchIndex: '', // 被点击index
			touchItem: '', // 备份被点击的item数据
			isClickFirst: false // data3: 0; 是否点击第一次，为false则说明是第一次点击
		}
	},
	computed: {},
	watch: {
		listData(val) {
			this.listData_c = val
			// console.log(this.listData_c)
		}
		// listData_c(val) {
		// 	// console.log(this.listData_c)
		// 	this.$emit('listChange', val)
		// }
	},
	mounted() {},
	methods: {
		AppLi_click(index) {
			if (getApp().globalData.role === 'admin') {
				if (!this.isClickFirst) {
					// 第一次点击
					this.deleteAppID = index
					this.touchIndex = index
					this.touchItem = this.listData_c[index]
					this.isClickFirst = !this.isClickFirst
				} else {
					// 第二次点击
					[this.listData_c[index], this.listData[this.touchIndex]] = [this.listData[this.touchIndex], this.listData_c[index]]
					this.touchIndex = ''
					this.deleteAppID = ''
					this.isClickFirst = !this.isClickFirst
					this.$emit('listChange', this.listData_c)
				}
			}
			// console.log(event)
		},

		deleteAppItem(index) {
			this.listData_c.splice(index, 1)
		}

		// getInto(appName) {
		// 	uni.showToast({
		// 		title: '进入' + appName,
		// 		icon: 'none'
		// 	})
		// }
	}
}
</script>

<style lang="scss">
.text-blue {
	// color: #0081ff;
	color: #ffe4e1;
}
// .cuIcon-roundclosefill:before {
// 	content: '踢出';
// }
.tn-icon-close {
	color: white;
}
.tn-icon-close:after {
	content: '踢出';
}

.movarea {
	width: 100%;
	height: auto;
}

.appList {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 32rpx;
	// opacity: 0.99;
}

.app-li {
	width: 33.33%;
	// flex: 1;
	height: 160rpx;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 20rpx;
	position: relative;
	border: 1px solid rgba(0, 0, 0, 0);
	// box-sizing: border-box;

	.appIcon {
		font-size: 60rpx;
	}

	.appName {
		font-size: 24rpx;
	}

	.cuIcon-roundadd {
		font-size: 60rpx;
		color: #cccccc;
	}

	.cuIcon-roundclosefill {
		position: absolute;
		top: 12rpx;
		right: 25%;
		font-size: 28rpx;
		background-color: #ff1493;
		border-radius: 20% 0 0 20%;
		opacity: 0.9;
		z-index: 2;

		&.hide {
			display: none;
		}
	}
}

.select {
	// transform: scale(1.3);
	border-radius: 16rpx;
	border: 1px dashed #c0c0c0;
	color: #c0c0c0;
}
</style>
