(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/theme"],{"0150":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{customTheme:"",theme:"",swiperHeight:"height:2800upx;",tabCurrentIndex:0,swiperCurrentIndex:0,tabs:[{name:"研学行程",id:"guowai"}],titleShowId:"tabTag-0",info:{theme_head_img_url:"",items:[]}}},onLoad:function(e){this.customTheme=this.$store.state.customTheme,t.showLoading({title:"数据加载中",mask:!0}),this.getInfo(e)},onReady:function(){},methods:{getInfo:function(t){var e=this;this.$http({url:"/theme/"+t.id}).then(function(t){e.theme=t})},itemJump:function(e){console.log(this.theme," at pages\\home\\theme.vue:92"),console.log(e," at pages\\home\\theme.vue:93"),t.navigateTo({url:"../home/item?id=".concat(this.theme.items[e].item_id),animationType:"pop-in",animationDuration:200})},tabChange:function(t){var e=t.target.id.replace("tabTag-","");this.swiperCurrentIndex=e,this.tabCurrentIndex=e,this.titleShowId="tabTag-"+e},swiperChange:function(t){var e=t.detail.current;this.tabCurrentIndex=e,this.titleShowId="tabTag-"+e,console.log(e," at pages\\home\\theme.vue:110")}}};e.default=n}).call(this,n("6e42")["default"])},"2e73":function(t,e,n){"use strict";n.r(e);var a=n("cca2"),i=n("a24d");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("433b");var u=n("2877"),r=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},"433b":function(t,e,n){"use strict";var a=n("a5d8"),i=n.n(a);i.a},a24d:function(t,e,n){"use strict";n.r(e);var a=n("0150"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},a5d8:function(t,e,n){},cca2:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}},[["2f12","common/runtime","common/vendor"]]]);