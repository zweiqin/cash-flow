<template>
  <view
    v-if="showNotice"
    class="tn-notice-bar-class tn-notice-bar"
    :style="{
      borderRadius: radius + 'rpx'
    }"
  >
    <block v-if="mode === 'horizontal' && circular">
      <tn-row-notice
        :backgroundColor="backgroundColor"
        :fontColor="fontColor"
        :fontSize="fontSize"
        :fontUnit="fontUnit"
        :list="list"
        :show="show"
        :playStatus="playStatus"
        :leftIcon="leftIcon"
        :leftIconName="leftIconName"
        :leftIconSize="leftIconSize"
        :rightIcon="rightIcon"
        :rightIconName="rightIconName"
        :rightIconSize="rightIconSize"
        :closeBtn="closeBtn"
        :autoplay="autoplay"
        :radius="radius"
        :padding="padding"
        :speed="speed"
        @click="click"
        @close="close"
        @clickLeft="clickLeftIcon"
        @clickRight="clickRightIcon"
      ></tn-row-notice>
    </block>
    <block v-if="mode === 'vertical' || (mode === 'horizontal' && !circular)">
      <tn-column-notice
        :backgroundColor="backgroundColor"
        :fontColor="fontColor"
        :fontSize="fontSize"
        :fontUnit="fontUnit"
        :list="list"
        :show="show"
        :mode="mode"
        :playStatus="playStatus"
        :leftIcon="leftIcon"
        :leftIconName="leftIconName"
        :leftIconSize="leftIconSize"
        :rightIcon="rightIcon"
        :rightIconName="rightIconName"
        :rightIconSize="rightIconSize"
        :closeBtn="closeBtn"
        :autoplay="autoplay"
        :radius="radius"
        :padding="padding"
        :duration="duration"
        @click="click"
        @close="close"
        @clickLeft="clickLeftIcon"
        @clickRight="clickRightIcon"
        @end="end"
      ></tn-column-notice>
    </block>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-notice-bar',
    mixins: [componentsColorMixin],
    props: {
      // ???????????????
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // ????????????
      show: {
        type: Boolean,
        default: true
      },
      // ????????????
      // play -> ?????? paused -> ??????
      playStatus: {
        type: String,
        default: 'play'
      },
      // ????????????
      // horizontal -> ???????????? vertical -> ????????????
      mode: {
        type: String,
        default: 'horizontal'
      },
      // ????????????????????????
      leftIcon: {
        type: Boolean,
        default: true
      },
      // ?????????????????????
      leftIconName: {
        type: String,
        default: 'sound'
      },
      // ?????????????????????
      leftIconSize: {
        type: Number,
        default: 34
      },
      // ???????????????????????????
      rightIcon: {
        type: Boolean,
        default: false
      },
      // ?????????????????????
      rightIconName: {
        type: String,
        default: 'right'
      },
      // ?????????????????????
      rightIconSize: {
        type: Number,
        default: 26
      },
      // ????????????????????????
      closeBtn: {
        type: Boolean,
        default: false
      },
      // ??????
      radius: {
        type: Number,
        default: 0
      },
      // ?????????
      padding: {
        type: String,
        default: '18rpx 24rpx'
      },
      // ????????????
      autoplay: {
        type: Boolean,
        default: true
      },
      // ????????????
      duration: {
        type: Number,
        default: 2000
      },
      // ????????????????????????????????????????????????rpx
      speed: {
        type: Number,
        default: 160
      },
      // ????????????????????????????????????????????????
      circular: {
        type: Boolean,
        default: true
      },
      // ?????????????????????????????????
      autoHidden: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // ????????????show???false?????????autoHidden???true???list???????????????????????????
      showNotice() {
        if (this.show === false || (this.autoHidden && this.list.length === 0)) return false
        else return true
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      // ??????????????????
      click(index) {
        this.$emit('click', index)
      },
      // ?????????????????????
      close() {
        this.$emit('close')
      },
      // ?????????????????????
      clickLeftIcon() {
        this.$emit('clickLeft')
      },
      // ?????????????????????
      clickRightIcon() {
        this.$emit('clickRight')
      },
      // ????????????????????????
      end() {
        this.$emit('end')
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-notice-bar {
    overflow: hidden;
  }
</style>
