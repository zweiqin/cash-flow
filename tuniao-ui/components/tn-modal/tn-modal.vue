<template>
	<view v-if="value" class="tn-modal-class tn-modal">
		<tn-popup
			v-model="value"
			mode="center"
			:popup="false"
			:border-radius="radius"
			:width="width"
			:zoom="zoom"
			:safe-area-inset-bottom="safeAreaInsetBottom"
			:mask-closeable="maskCloseable"
			:z-index="zIndex"
			:close-btn="showCloseBtn"
			@close="close"
		>
			<!-- 内容 -->
			<view
				class="tn-modal__box"
				:class="[
					backgroundColorClass
				]"
				:style="[boxStyle]"
			>
				<!-- 不是自定义弹框内容 -->
				<view v-if="!custom">
					<view v-if="title && title !== ''" class="tn-modal__box__title">{{ title }}</view>
					<view
						class="tn-modal__box__content"
						:class="[
							fontColorClass,
							contentClass
						]"
						:style="contentStyle"
					>{{ content }}</view>
					<view v-if="button && button.length" class="tn-modal__box__btn-box" :class="[button.length != 2 ? 'tn-flex-direction-column' : '']">
						<block v-for="(item, index) in button" :key="index">
							<tn-button
								width="100%"
								height="68rpx"
								:font-size="26"
								:background-color="item.backgroundColor || ''"
								:font-color="item.fontColor || ''"
								:plain="item.plain || false"
								:shape="item.shape || 'round'"
								:class="[
									button.length > 2 ? 'tn-margin-bottom' : ''
								]"
								:style="{
									width: button.length != 2 ? '80%' : '46%'
								}"
								@click="handleClick(index)"
							>
								{{ item.text }}
							</tn-button>
						</block>
					</view>
				</view>
				<view v-else>
					<slot></slot>
				</view>
			</view>
		</tn-popup>
	</view>
</template>

<script>
import componentsColorMixin from '../../libs/mixin/components_color.js'
export default {
	name: 'TnModal',
	mixins: [ componentsColorMixin ],
	props: {
		// 显示控制
		value: {
			type: Boolean,
			default: false
		},
		// 弹框宽度
		width: {
			type: String,
			default: '84%'
		},
		// 内边距
		padding: {
			type: String,
			default: ''
		},
		// 圆角
		radius: {
			type: Number,
			default: 12
		},
		// 标题
		title: {
			type: String,
			default: ''
		},
		// 内容
		content: {
			type: String,
			default: ''
		},
		// 按钮内容 设置参数与button组件的参数一致
		// {
		//   text: '确定',
		//   backgroundColor: 'red',
		//   fontColor: 'white',
		//   plain: true,
		//   shape: ''
		// }
		button: {
			type: Array,
			default: () => []
		},
		safeAreaInsetBottom: {
      	type: Boolean,
      	default: false
		},
		// 点击遮罩是否可以关闭
		maskCloseable: {
			type: Boolean,
			default: true
		},
		// 是否显示右上角关闭按钮
		showCloseBtn: {
			type: Boolean,
			default: false
		},
		// 放大动画
		zoom: {
			type: Boolean,
			default: true
		},
		// 自定义弹框内容
		custom: {
			type: Boolean,
			default: false
		},
		// 弹框的z-index
		zIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {

		}
	},
	computed: {
		boxStyle() {
			const style = {}

			if (this.padding) {
				style.padding = this.padding
			}
			if (this.backgroundColorStyle) {
				style.backgroundColor = this.backgroundColorStyle
			}

			return style
		},
		contentClass() {
			let clazz = ''
			if (this.title) {
				clazz += ' tn-margin-top'
			} else {
				clazz += ' tn-modal__box__content--no-title'
			}

			return clazz
		},
		contentStyle() {
			const style = {}

			if (this.fontSize) {
				style.fontSize = this.fontSize + this.fontUnit
			}
			if (this.fontColorStyle) {
				style.color = this.fontColorStyle
			}

			return style
		}
	},
	methods: {
		// 处理按钮点击事件
		handleClick(index) {
			if (!this.value) return
			this.$emit('click', {
				index: Number(index)
			})
		},
		// 处理关闭事件
		close() {
			this.$emit('cancel')
			this.$emit('input', false)
		}
	}
}
</script>

<style lang="scss" scoped>

  .tn-modal {

    &__box {
      position: relative;
      box-sizing: border-box;
      background-color: #FFFFFF;
      padding: 40rpx 64rpx;

      &__title {
        text-align: center;
        font-size: 34rpx;
        color: #333;
        padding-top: 20rpx;
        font-weight: bold;
      }

      &__content {
        text-align: center;
        padding-bottom: 30rpx;
        color: $tn-font-color;
        font-size: 28rpx;

        &--no-title {
          padding-bottom: 0rpx !important;
        }
      }

      &__btn-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__content ~ &__btn-box {
        margin-top: 30rpx;
      }
    }
  }

</style>
