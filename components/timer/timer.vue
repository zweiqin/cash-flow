<template>
	<view class="count_down">
		<text>{{ hours1 }}</text>
		<text>{{ hours }}</text>
		<text>:</text>
		<text>{{ minutes1 }}</text>
		<text>{{ minutes }}</text>
		<text>:</text>
		<text>{{ second1 }}</text>
		<text>{{ second }}</text>
	</view>
</template>

<script>
export default {
	name: 'Timer',
	props: {
		auto: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			Number: 0,
			hours: 0,
			hours1: 0,
			minutes: 0,
			minutes1: 0,
			second: 0,
			second1: 0,
			countDown1: 0,
			interval: null
		}
	},
	watch: {
		Number(val) {
			this.countDown1 = this.Number
			this.countDown(this.Number)
			this.$emit('timing', this.Number)
		}
	},
	created() {
		if (this.auto) {
			this.interval = setInterval(() => {
				this.Number++
			}, 1000)
		}
	},
	methods: {
		reset() {
			clearInterval(this.interval)
			this.Number = 0
			this.hours = 0
			this.hours1 = 0
			this.minutes = 0
			this.minutes1 = 0
			this.second = 0
			this.second1 = 0
			this.countDown1 = 0
			this.interval = setInterval(() => {
				this.Number++
			}, 1000)
		},
		start() {
			this.interval = setInterval(() => {
				this.Number++
			}, 1000)
		},
		clear() {
			clearInterval(this.interval)
		},
		countDown(countDown) {
			if (countDown > 3599) {
				const h = parseInt(countDown / 3600)
				const hour = h.toString().split('')
				if (hour.length == 1) {
					this.hours = hour[0]
					this.hours1 = 0
				} else {
					this.hours1 = hour[0]
					this.hours = hour[1]
				}
				const d = parseInt((countDown % 3600) / 60)
				const minute = d.toString().split('')
				if (minute.length == 1) {
					this.minutes = minute[0]
					this.minutes1 = 0
				} else {
					this.minutes1 = minute[0]
					this.minutes = minute[1]
				}
				const dd = countDown % 60
				const numbers = dd.toString().split('')
				if (numbers.length == 1) {
					this.second1 = 0
					this.second = numbers[0]
				} else {
					this.second1 = numbers[0]
					this.second = numbers[1]
				}
			} else if (countDown > 59) {
				const d = parseInt(countDown / 60)
				const minute = d.toString().split('')
				if (minute.length == 1) {
					this.minutes = minute[0]
					this.minutes1 = 0
				} else {
					this.minutes1 = minute[0]
					this.minutes = minute[1]
				}
				const dd = countDown % 60
				const numbers = dd.toString().split('')
				if (numbers.length == 1) {
					this.second1 = 0
					this.second = numbers[0]
				} else {
					this.second1 = numbers[0]
					this.second = numbers[1]
				}
			} else {
				this.minutes = 0
				this.minutes1 = 0
				const numbers = countDown.toString().split('')
				if (numbers.length == 1) {
					this.second = numbers[0]
					this.second1 = 0
				} else {
					this.second1 = numbers[0]
					this.second = numbers[1]
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.count_down{
	display: flex;
	align-items: center;
	margin-bottom: 4rpx;
	justify-content: center;
	// justify-content: flex-start;
	text{
		display: block;
		color:black;
		margin-right: 6rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
	.maohao{
		padding: 0 10rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
}
</style>
