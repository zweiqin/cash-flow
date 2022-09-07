# smh-timer

一个轻量级计时器插件

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法

在 ``template`` 中使用组件

```html
<smh-timer ref="timer" @timing="timing" :auto="true"></smh-timer>

methods: {
	timing(second){
		//实时返回计时时间
		console.log(second)
	},
	reset(){
		//重置计时器
		this.$refs.timer.reset()
	},
	start(){
		//手动开启计时器
		this.$refs.timer.start()
	},
	clear(){
		//停止计时器
		this.$refs.timer.clear()
	},
}
```


## API

### smh-timer Props

|属性名	|类型		|默认值	|说明				|
|:-:	|:-:		|:-:	|:-:				|
|auto	|Boolean	|true		|是否自动开启计时器|

### smh-timer Events
|事件名	|说明			|返回值|
|:-:	|:-:			|:-:  |
|@timing|计时器实时返回事件|Int|
|@reset|重置定时器事件(refs方式调用)|无|
|@start|开启定时器事件(refs方式调用)|无|
|@clear|清除定时器事件(refs方式调用)|无|

