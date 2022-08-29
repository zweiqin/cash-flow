<template>
	<!--
		组件思路：
		利用touch事件返回坐标值，赋值滑动视图，得到滑动视图跟随鼠标的效果，视觉上达到拖拽。
	-->
	<view class="">
		<!-- 可移动区域容器 -->
		<movable-area id="areaBox" ref="areaBox" class="movarea">
			<!-- 这块只是循环出固定内容，监听其元素touch事件获取坐标 -->
			<view class="appList">
				<view
					v-for="(appItem, index) in listData_c"
					:id="'appLi' + index"
					:key="appItem.name"
					class="app-li text-blue"
					:class="hoverClass === 'appLi' + index ? 'select' : ''"
					@touchstart="AppLi_touchstart(index, $event)"
					@touchmove="AppLi_touchmove"
					@touchend="AppLi_touchend(index)"
				>
					<text :class="['appIcon', appItem.appIcon]"></text> <text class="appName">{{ appItem.appName }}</text>
					<text class="appicon cuIcon-roundclosefill" :class="deleteAppID === appItem.appId && showDelete ? '' : 'hide'" @tap="deleteAppItem(index)"></text>
				</view>
				<!-- <view class="app-li text-blue" @tap="addAppItem"> <text class="appicon cuIcon-roundadd"></text> </view> -->
			</view>
			<!-- 滑块 -->
			<movable-view v-if="moviewShow" :animation="false" class="moveV text-blue" :x="moveX" :y="moveY" direction="all" :style="{ width: moveViewSize + 'px', height: 160 + 'rpx' }">
				<text :class="['appIcon', touchItem.appIcon]"></text> <text class="appName">{{ touchItem.appName }}</text>
			</movable-view>
		</movable-area>
		<!-- 新增模态 -->
		<!-- <Modal ref="addAppItem" title="添加" @confirm="confirm">
			<InputUnify ref="addAppInput" title="名字" placeholder="请输入应用名"></InputUnify>
		</Modal> -->
	</view>
</template>

<script>
// import InputUnify from "@/components/unify-input.vue"
export default {
	name: 'AppList',
	// components: {
	// 	InputUnify
	// },
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
			showDelete: false, // 删除按钮状态
			IsDeleteAfter: false, // 是否为删除后
			IsCancelDelete: false, // 是否为取消后
			moviewShow: false, // 滑块状态
			areaBoxInfo: null, // 保存滑动区域盒子dom信息
			inBoxXY: {}, // 鼠标在item中的坐标
			touchIndex: 0, // 被移动index
			touchItem: '', // 备份被移动item数据
			moveX: 0, // 相对滑动盒子的坐标
			moveY: 0, // 相对滑动盒子的坐标
			hoverClass: '',
			hoverClassIndex: null // 最终index
		}
	},
	computed: {
		moveViewSize() {
			if (this.areaBoxInfo && this.areaBoxInfo.width) {
				return this.areaBoxInfo.width / 5
			}
			return 0
		}
	},
	watch: {
		listData_c(val) {
			this.$emit('listChange', val)
		}
	},
	mounted() {
		// 获取dom信息
		this.resetListDom()
	},
	methods: {
		getDomInfo(id, callBack) {
			const query = uni.createSelectorQuery().in(this)
			query
				.select('#' + id)
				.boundingClientRect()
				.exec(function (res) {
					callBack(res[0])
				})
		},
		// 添加
		// addAppItem() {
		// 	this.$refs.addAppItem.ModalStatus()
		// },
		confirm() {
			const appItem = {
				appId: this.listData_c.length + 1,
				appIcon: 'cuIcon-pic',
				appName: this.$refs.addAppInput.value,
				appLink: ''
			}
			this.listData_c.push(appItem)
			this.$refs.addAppInput.resetVal()
			this.$nextTick(() => {
				this.resetListDom()
			})
		},
		AppLi_touchstart(index, event) {
			this.touchItem = this.listData_c[index]
			// 行为判断
			if (this.showDelete) {
				// 取消删除
				if (this.touchItem.appId != this.deleteAppID) {
					this.deleteAppID = null
					this.showDelete = false
					this.IsCancelDelete = true
				}
				// 删除
				// if(this.touchItem.appId==this.deleteAppID){
				// 	this.deleteAppItem(index)
				// }
			}
			// 过时触发（touchEnd中清除此定时器）
			this.Loop = setTimeout(() => {
				// 触感反馈（安卓上是150毫秒，ios无短触控反馈）
				uni.vibrateShort()
				this.showDelete = true
				this.deleteAppID = this.touchItem.appId
				// 拖动逻辑
				// 显示可移动方块
				this.moviewShow = true
				// 保存当前所选择的索引
				this.touchIndex = index
				// 设置可移动方块的初始位置为当前所选中图片的位置坐标
				this.moveX = this.listData_c[index].x
				this.moveY = this.listData_c[index].y
				var x = event.changedTouches[0].clientX - this.areaBoxInfo.left
				var y = event.changedTouches[0].clientY - this.areaBoxInfo.top
				// 保存鼠标在图片内的坐标
				this.inBoxXY = {
					x: x - this.listData_c[index].x,
					y: y - this.listData_c[index].y
				}
			}, 500)
		},
		AppLi_touchmove(event) {
			// 每次endTouch清除startTouch删除按钮定时器
			if (this.Loop) {
				clearTimeout(this.Loop)
				this.Loop = null
			}
			if (this.showDelete) {
				const areaBoxTop = this.areaBoxInfo.top
				const areaBoxLeft = this.areaBoxInfo.left
				// 重置为以拖拽盒子左上角为坐标原点
				var x = event.changedTouches[0].clientX - areaBoxLeft
				var y = event.changedTouches[0].clientY - areaBoxTop
				this.moveX = x - this.inBoxXY.x
				this.moveY = y - this.inBoxXY.y

				let setIng = false
				this.listData_c.forEach((item, idx) => {
					if (x > item.x && x < item.x + 80 && y > item.y && y < item.y + 80) {
						this.hoverClass = 'appLi' + idx
						this.hoverClassIndex = idx
						setIng = true
					}
				})
				// 都不存在代表脱离
				if (!setIng) {
					this.hoverClass = ''
					this.hoverClassIndex = null
				}
			}
		},
		AppLi_touchend(index) {
			if (!this.showDelete && !this.IsDeleteAfter && !this.IsCancelDelete) {
				this.getInto(this.touchItem.appName)
			} else {
				// 为下次getInto清除状态
				this.IsDeleteAfter = false
				this.IsCancelDelete = false
				// 移动结束隐藏可移动方块
				if (this.hoverClassIndex != null && this.touchIndex != this.hoverClassIndex) {
					this.$set(this.listData_c, this.touchIndex, this.listData_c[this.hoverClassIndex])
					this.$set(this.listData_c, this.hoverClassIndex, this.touchItem)
					this.showDelete = false
					this.resetListDom()
				}
				this.touchItem = ''
				this.moviewShow = false
				this.hoverClass = ''
				this.hoverClassIndex = null
			}

			// 每次endTouch清除startTouch删除按钮定时器
			if (this.Loop) {
				clearTimeout(this.Loop)
				this.Loop = null
			}
		},
		deleteAppItem(index) {
			this.listData_c.splice(index, 1)
			this.showDelete = false
			this.checkIndex = null
			this.IsDeleteAfter = true
			this.resetListDom()
		},
		getInto(appName) {
			uni.showToast({
				title: '进入' + appName,
				icon: 'none'
			})
		},
		resetListDom() {
			const _this = this
			this.getDomInfo('areaBox', (info) => {
				_this.areaBoxInfo = info
				// 设置区域内所有图片的左上角坐标
				_this.listData_c.forEach((item, idx) => {
					_this.getDomInfo('appLi' + idx, (res) => {
						item.x = res.left - info.left
						item.y = res.top - info.top
					})
				})
			})
		},
		boxClick() {
			this.deleteAppID = null
			this.showDelete = false
		}
	}
}
</script>

<style lang="scss">
.text-blue {
	color: #0081ff;
}
// .cuIcon-roundclosefill:before {
// 	content: '\e658';
// }

.movarea {
	width: 100%;
	height: auto;
	background-color: #fff;
}

.appList {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}

.app-li {
	width: 20%;
	// flex: 1;
	height: 160rpx;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 20rpx;
	position: relative;

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
		right: 12rpx;
		font-size: 36rpx;
		z-index: 2;

		&.hide {
			display: none;
		}
	}
}

.moveV {
	opacity: 0.8;
	z-index: 999;
	width: 100rpx;
	height: 160rpx;
	box-sizing: border-box;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 20rpx;

	.appIcon {
		font-size: 60rpx;
	}

	.appName {
		font-size: 24rpx;
	}
}

.select {
	// transform: scale(1.3);
	border-radius: 16rpx;
	border: 1px dashed #c0c0c0;
	color: #c0c0c0;
}
</style>
