(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-admin-index"],{"0509":function(t,n,i){"use strict";i.r(n);var e=i("ee52"),a=i("6f6f");for(var o in a)"default"!==o&&function(t){i.d(n,t,(function(){return a[t]}))}(o);i("ab72");var r,s=i("f0c5"),l=Object(s["a"])(a["default"],e["b"],e["c"],!1,null,"3ca8d756",null,!1,e["a"],r);n["default"]=l.exports},"0c25":function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/**\r\n * 下方引入的为Tuniao UI的集成样式文件，为scss预处理器，其中包含了一些"tn-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * Tuniao UI自定义的css类名和scss变量，均以"tn-"开头，不会造成冲突，请放心使用 \r\n */.tn-tag[data-v-46c7aed6]{vertical-align:middle;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;font-family:Helvetica Neue,Helvetica,sans-serif;white-space:nowrap}.tn-tag--fillet-left[data-v-46c7aed6]{border-radius:%?50?% 0 0 %?50?%}.tn-tag--fillet-right[data-v-46c7aed6]{border-radius:0 %?50?% %?50?% 0}.tn-tag--plain[data-v-46c7aed6]{background-color:initial!important;background-image:none}.tn-tag--plain.tn-round[data-v-46c7aed6]{border-radius:%?1000?%!important}.tn-tag--plain.tn-radius[data-v-46c7aed6]{border-radius:%?12?%!important}.tn-tag--origin-left[data-v-46c7aed6]{-webkit-transform-origin:0 center;transform-origin:0 center}.tn-tag--origin-right[data-v-46c7aed6]{-webkit-transform-origin:100% center;transform-origin:100% center}',""]),t.exports=n},"1e6e":function(t,n,i){"use strict";i.r(n);var e=i("82c3"),a=i("8681");for(var o in a)"default"!==o&&function(t){i.d(n,t,(function(){return a[t]}))}(o);i("2996");var r,s=i("f0c5"),l=Object(s["a"])(a["default"],e["b"],e["c"],!1,null,"46c7aed6",null,!1,e["a"],r);n["default"]=l.exports},2996:function(t,n,i){"use strict";var e=i("9a8d"),a=i.n(e);a.a},"36d4":function(t,n,i){"use strict";var e=i("4ea4");i("caad"),i("baa5"),i("fb6a"),i("a9e3"),i("2532"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e(i("d343")),o={mixins:[a.default],options:{virtualHost:!0},name:"tn-tag",props:{index:{type:[Number,String],default:"0"},shape:{type:String,default:""},size:{type:String,default:""},width:{type:String,default:""},height:{type:String,default:""},padding:{type:String,default:""},margin:{type:String,default:"0"},plain:{type:Boolean,default:!1},originLeft:{type:Boolean,default:!1},originRight:{type:Boolean,default:!1}},computed:{tagClass:function(){var t="";switch(this.shape){case"radius":t+=" tn-radius";break;case"circle":t+=" tn-round";break;case"circleLeft":t+=" tn-tag--fillet-left";break;case"circleRight":t+=" tn-tag--fillet-right";break}if(this.plain&&(t+=" tn-tag--plain tn-border-solid",""!==this.backgroundColor&&this.backgroundColor.includes("tn-bg"))){var n=this.backgroundColor.slice(this.backgroundColor.lastIndexOf("-")+1);t+=" tn-border-".concat(n)}return this.originLeft&&(t+=" tn-tag--origin-left"),this.originRight&&(t+=" tn-tag--origin-right"),t},tagStyle:function(){var t={};switch(this.size){case"sm":t.padding="0 12rpx",t.fontSize="20rpx",t.height="32rpx";break;case"lg":t.padding="0 20rpx",t.fontSize="28rpx",t.height="62rpx";break;default:t.padding="0 16rpx",t.fontSize="24rpx",t.height="48rpx";break}return t.width=this.width||"120rpx",t.height=this.height||t.height,t.padding=this.padding||t.padding,this.margin&&(t.margin=this.margin),this.fontColorStyle&&(t.color=this.fontColorStyle),0!==this.fontSize&&(t.fontSize=this.fontSize+this.fontUnit),this.backgroundColorClass||(t.backgroundColor=this.plain?"":this.backgroundColorStyle||"#FFFFFF",this.plain&&(t.borderColor=this.backgroundColorStyle||"#080808")),t}},data:function(){return{}},methods:{handleClick:function(){this.$emit("click",{index:Number(this.index)}),this.$emit("tap",{index:Number(this.index)})}}};n.default=o},"40a8":function(t,n,i){"use strict";var e=i("4ea4");i("cb29"),i("fb6a"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e(i("d4ec")),o=e(i("bee2")),r=i("a0a0"),s=function(){function t(n,i){(0,a.default)(this,t),this.x=n,this.y=i,this.r=1+2*Math.random(),this.sx=2*Math.random()-1,this.sy=2*Math.random()-1}return(0,o.default)(t,[{key:"draw",value:function(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.closePath(),t.fillStyle="#fff",t.fill()}},{key:"move",value:function(t,n){this.x+=this.sx,this.y+=this.sy,(this.x>t||this.x<0)&&(this.sx=-this.sx),(this.y>n||this.y<0)&&(this.sy=-this.sy)}},{key:"drawLine",value:function(t,n){var i=this.x-n.x,e=this.y-n.y,a=Math.sqrt(i*i+e*e);if(a<100){var o=(100-a)/300*1;t.beginPath(),t.moveTo(this.x,this.y),t.lineTo(n.x,n.y),t.closePath(),t.strokeStyle="rgba(255, 255, 255, "+o+")",t.strokeWidth=1,t.stroke()}}}]),t}(),l=uni.getSystemInfoSync(),c=400,d=1e3,u={name:"LoginAdmin",data:function(){return{ctx:null,screenWidth:l.screenWidth,screenHeight:l.screenHeight,timer:null,points:[],currentModeIndex:0,modeSliderStyle:{left:0},toast_significance:"",new_num:"",old_num:"",today:""}},onLoad:function(t){uni.getStorage({key:"token",success:function(t){console.log(t),t.data&&t.data.token||uni.redirectTo({url:"/pages/register/index"})},fail:function(t){console.log(t),uni.redirectTo({url:"/pages/register/index"})}}),getApp().globalData.admin=this,this.from=t.from||"";for(var n=0;n<80;n++)this.points.push(new s(Math.random()*c,Math.random()*d));this.ctx=uni.createCanvasContext("star_canvas"),this.gameloop(),this.getToday()},onUnload:function(){clearTimeout(this.timer),console.log("卸载admin组件"),getApp().globalData.admin=null},onShow:function(){},onHide:function(){console.log("隐藏admin组件")},watch:{currentModeIndex:function(t){var n=uni.upx2px(238);this.modeSliderStyle.left="".concat(n*t,"px")}},methods:{gameloop:function(){this.timer=setTimeout(this.gameloop,100),this.paint()},paint:function(){this.ctx.clearRect(0,0,c,d);for(var t=0;t<this.points.length;t++){this.points[t].move(c,d),this.points[t].draw(this.ctx);for(var n=t+1;n<this.points.length;n++)this.points[t].drawLine(this.ctx,this.points[n])}this.ctx.draw()},modeSwitch:function(t){this.currentModeIndex=t},getToday:function(){var t=new Date,n=String(t.getFullYear()).substring(2),i=String(t.getMonth()+1),e=String(t.getDate());i=i.length>1?i:"0"+i,e=e.length<2?"0"+e:e,this.today=n+i+e},createGame:function(){if(0===this.currentModeIndex){if(4!==this.new_num.length)return this.globalNotice("提示","请输入房间号后四位","tip-fill");getApp().globalData.init({method:"createGame",data:this.today+this.new_num})}else if(1===this.currentModeIndex){if(4!==this.old_num.length)return this.globalNotice("提示","请输入房间号后四位","tip-fill");getApp().globalData.init({method:"rejoinGame",data:this.today+this.old_num})}},globalNotice:function(t,n,i,e){if("toPlay"===t)return this.toast_significance="toPlay";this.$refs.toast.show({title:t,content:n,icon:i,image:"",duration:1500}),e&&(this.toast_significance=e)},toInterface:function(){"toDrag"===this.toast_significance?uni.redirectTo({url:"/pages/drag/index?role=admin"}):"toPlay"===this.toast_significance&&(0,r.GetCurrentUser)({game_id:getApp().globalData.gameId}).then((function(t){200===t[1].data.status&&(getApp().globalData.round=[t[1].data.data.game_user_id,t[1].data.data.index],uni.redirectTo({url:"/pages/manipulate/index?role=admin"}))})).catch((function(t){console.log(t)}))},getIntRandomValue:function(){var t=this.$t.number.randomInt(0,9999);this.new_num=(Array(4).join(0)+t).slice(-4)}}};n.default=u},"6f6f":function(t,n,i){"use strict";i.r(n);var e=i("40a8"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,(function(){return e[t]}))}(o);n["default"]=a.a},"82c3":function(t,n,i){"use strict";var e;i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"tn-tag-class tn-tag",class:[t.tagClass,t.backgroundColorClass,t.fontColorClass],style:[t.tagStyle],on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handleClick.apply(void 0,arguments)}}},[t._t("default")],2)},o=[]},8681:function(t,n,i){"use strict";i.r(n);var e=i("36d4"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,(function(){return e[t]}))}(o);n["default"]=a.a},"9a8d":function(t,n,i){var e=i("0c25");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("a929b25e",e,!0,{sourceMap:!1,shadowMode:!1})},a59f:function(t,n,i){var e=i("d520");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("6f580915",e,!0,{sourceMap:!1,shadowMode:!1})},ab72:function(t,n,i){"use strict";var e=i("a59f"),a=i.n(e);a.a},cb29:function(t,n,i){var e=i("23e7"),a=i("81d5"),o=i("44d2");e({target:"Array",proto:!0},{fill:a}),o("fill")},d520:function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/**\r\n * 下方引入的为Tuniao UI的集成样式文件，为scss预处理器，其中包含了一些"tn-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * Tuniao UI自定义的css类名和scss变量，均以"tn-"开头，不会造成冲突，请放心使用 \r\n */\r\n/* 粒子背景 start*/.template-login1[data-v-3ca8d756]{background:linear-gradient(90deg,#892fe8,#3d7eff);min-height:100vh}.mycanvas[data-v-3ca8d756]{position:absolute;background-size:cover;width:100vw;height:100vh;justify-content:center;flex-direction:column;color:#fff}.login[data-v-3ca8d756]{position:relative;height:100%;z-index:1\r\n  /* 内容 start */\r\n  /* 切换 start */\r\n  /* 切换 end */\r\n  /* 登录注册信息 start */\r\n  /* 登录注册信息 end */\r\n  /* 登录方式切换 start */\r\n  /* 登录方式切换 end */\r\n  /* 内容 end */}.login__wrapper[data-v-3ca8d756]{padding-top:%?100?%;padding-bottom:%?100?%;width:100%}.login__wrapper .login-tag[data-v-3ca8d756]{margin-bottom:%?20?%;font-weight:700;letter-spacing:.3em}.login__mode[data-v-3ca8d756]{position:relative;margin:0 auto;width:%?476?%;height:%?77?%;background-color:hsla(0,0%,100%,.2);backdrop-filter:blur(%?6?%);-webkit-backdrop-filter:blur(%?6?%);box-shadow:%?0?% %?10?% %?50?% %?0?% rgba(0,3,72,.1);border-radius:%?39?%}.login__mode__item[data-v-3ca8d756]{height:%?77?%;width:100%;line-height:%?77?%;text-align:center;font-size:%?31?%;color:#fff;letter-spacing:.5em;text-indent:.5em;z-index:2;transition:all .4s}.login__mode__item--active[data-v-3ca8d756]{font-weight:700;color:#fff}.login__mode__slider[data-v-3ca8d756]{position:absolute;height:inherit;width:calc(%?476?% / 2);border-radius:inherit;box-shadow:%?0?% %?18?% %?72?% %?18?% rgba(0,195,255,.1);z-index:1;transition:all .3s cubic-bezier(.68,-.55,.265,1.55)}.login__info[data-v-3ca8d756]{margin:0 auto;margin-top:%?55?%;padding:%?30?% %?51?%;padding-bottom:0;width:80vmin;border-radius:%?20?%;background-color:hsla(0,0%,100%,.2);backdrop-filter:blur(%?6?%);-webkit-backdrop-filter:blur(%?6?%);border:%?2?% solid hsla(0,0%,100%,.1);box-shadow:%?0?% %?10?% %?50?% %?0?% rgba(0,3,72,.1)}.login__info__item__input[data-v-3ca8d756]{margin-top:%?59?%;margin-bottom:%?50?%;width:100%;height:%?77?%;border:%?1?% solid #fff;border-radius:%?39?%}.login__info__item__input__left-icon[data-v-3ca8d756]{width:10%;font-size:%?44?%;margin-left:%?20?%;color:#fff}.login__info__item__input__content[data-v-3ca8d756]{width:50%;padding-left:%?10?%}.login__info__item__input__content--verify-code[data-v-3ca8d756]{width:56%}.login__info__item__input__content uni-input[data-v-3ca8d756]{font-size:%?24?%;color:#fff}.login__info__item__input__right-button[data-v-3ca8d756]{font-size:%?20?%;color:#fff}.login__info__item__button[data-v-3ca8d756]{margin-top:%?5?%;margin-bottom:%?39?%;width:100%;height:%?77?%;text-align:center;font-size:%?31?%;font-weight:700;line-height:%?77?%;letter-spacing:1em;text-indent:1em;border-radius:%?100?%;color:#fff;background-color:hsla(0,0%,100%,.2)}[data-v-3ca8d756] .input-placeholder{font-size:%?24?%;color:#e6e6e6}',""]),t.exports=n},ee52:function(t,n,i){"use strict";i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return e}));var e={tnTag:i("1e6e").default,tnButton:i("0199").default,tnToast:i("28cb").default},a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"template-login1"},[i("v-uni-canvas",{staticClass:"mycanvas",style:"width:"+t.screenWidth+"px;height:"+t.screenHeight+"px;",attrs:{"canvas-id":"star_canvas"}}),i("v-uni-view",{staticClass:"login"},[i("v-uni-view",{staticClass:"login__wrapper"},[i("v-uni-view",{staticClass:"login-tag"},[i("tn-tag",{attrs:{"background-color":"tn-cool-bg-color-3","font-color":"tn-color-white",margin:"1vw 45vw",width:"10vw",shape:"radius"}},[t._v("管理员")])],1),i("v-uni-view",{staticClass:"login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center"},[i("v-uni-view",{staticClass:"login__mode__item tn-flex-1",class:[{"login__mode__item--active":0===t.currentModeIndex}],on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.modeSwitch(0)}}},[t._v("创建房间")]),i("v-uni-view",{staticClass:"login__mode__item tn-flex-1",class:[{"login__mode__item--active":1===t.currentModeIndex}],on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.modeSwitch(1)}}},[t._v("重进房间")]),i("v-uni-view",{staticClass:"login__mode__slider tn-cool-bg-color-15--reverse",style:[t.modeSliderStyle]})],1),i("v-uni-view",{staticClass:"login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center"},[0===t.currentModeIndex?[i("v-uni-view",{staticClass:"login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left"},[i("v-uni-view",{staticClass:"tn-flex-1 login__info__item__input__left-icon"},[i("v-uni-view",{staticClass:"tn-icon-home-capsule"})],1),i("v-uni-view",{staticClass:"tn-flex-5 tn-flex login__info__item__input__content"},[i("v-uni-view",{staticClass:"tn-text-lg tn-color-white tn-text-bold",staticStyle:{"padding-right":"5px","letter-spacing":"2px"}},[t._v(t._s(t.today))]),i("v-uni-input",{attrs:{type:"number",maxlength:"4","placeholder-class":"input-placeholder",placeholder:"请输入房间号码后四位"},model:{value:t.new_num,callback:function(n){t.new_num=n},expression:"new_num"}})],1),i("v-uni-view",{staticClass:"tn-flex-4 login__info__item__input__right-button"},[i("v-uni-view",{staticClass:"tn-margin-right-sm",staticStyle:{float:"right"}},[i("tn-button",{attrs:{"background-color":"#01BEFF","font-color":"#FFFFFF"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.getIntRandomValue()}}},[t._v("获取随机号")])],1)],1)],1)]:t._e(),1===t.currentModeIndex?[i("v-uni-view",{staticClass:"login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left"},[i("v-uni-view",{staticClass:"tn-flex-1 login__info__item__input__left-icon"},[i("v-uni-view",{staticClass:"tn-icon-home-capsule"})],1),i("v-uni-view",{staticClass:"tn-flex-5 tn-flex login__info__item__input__content"},[i("v-uni-view",{staticClass:"tn-text-lg tn-color-white tn-text-bold",staticStyle:{"padding-right":"5px","letter-spacing":"2px"}},[t._v(t._s(t.today))]),i("v-uni-input",{attrs:{type:"number",maxlength:"4","placeholder-class":"input-placeholder",placeholder:"请输入房间号码后四位"},model:{value:t.old_num,callback:function(n){t.old_num=n},expression:"old_num"}})],1)],1)]:t._e(),i("v-uni-view",{staticClass:"login__info__item__button tn-cool-bg-color-7--reverse",attrs:{"hover-class":"tn-hover","hover-stay-time":150},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.createGame()}}},[t._v(t._s(0===t.currentModeIndex?"创建房间":"重进房间"))])],2)],1)],1),i("v-uni-view",[i("tn-toast",{ref:"toast",on:{closed:function(n){arguments[0]=n=t.$handleEvent(n),t.toInterface()}}})],1)],1)},o=[]}}]);