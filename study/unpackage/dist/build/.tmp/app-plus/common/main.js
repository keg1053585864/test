(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"144f":function(n,e,t){},"1bea":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(t("a34a")),r=u(t("b65b"));function u(n){return n&&n.__esModule?n:{default:n}}function a(n,e,t,o,r,u,a){try{var i=n[u](a),c=i.value}catch(s){return void t(s)}i.done?e(c):Promise.resolve(c).then(o,r)}function i(n){return function(){var e=this,t=arguments;return new Promise(function(o,r){var u=n.apply(e,t);function i(n){a(u,o,r,i,c,"next",n)}function c(n){a(u,o,r,i,c,"throw",n)}i(void 0)})}}var c={onLaunch:function(){var e=i(o.default.mark(function e(){var t=this;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$store.commit("customTheme",n.getStorageSync("customTheme")?n.getStorageSync("customTheme"):"montana"),console.log("App Launch"," at App.vue:6"),n.showLoading({title:"数据加载中"}),this.authorize(),setInterval(function(){t.authorize();var n=new Date;console.log(t.$store.state.token,n," at App.vue:14")},36e5);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),onShow:function(){console.log("App Show"," at App.vue:18")},onHide:function(){console.log("App Hide"," at App.vue:21")},methods:{authorize:function(){var e=i(o.default.mark(function e(){var t,u,a,i;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=function(){return new Promise(function(e){n.getUserInfo({provider:"weixin",success:function(n){(0,r.default)({url:"/user/login",method:"POST",data:{code:u,nickname:n.userInfo.nickName,avatar_url:n.userInfo.avatarUrl},loading:"none"}).then(function(t){e({token:t.token,info:n.userInfo})})}})})},t=function(){return new Promise(function(e){n.login({provider:"weixin",success:function(n){e(n)}})})},e.next=4,t();case 4:return u=e.sent.code,e.next=7,a();case 7:i=e.sent,this.$store.commit("userInfo",i.info),this.$store.commit("token",i.token);case 10:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}};e.default=c}).call(this,t("6e42")["default"])},b30c:function(n,e,t){"use strict";t.r(e);var o=t("1bea"),r=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,function(){return o[n]})}(u);e["default"]=r.a},e5cd:function(n,e,t){"use strict";var o=t("144f"),r=t.n(o);r.a},ec88:function(n,e,t){"use strict";t.r(e);var o=t("b30c");for(var r in o)"default"!==r&&function(n){t.d(e,n,function(){return o[n]})}(r);t("e5cd");var u,a,i=t("2877"),c=Object(i["a"])(o["default"],u,a,!1,null,null,null);e["default"]=c.exports}},[["4b45","common/runtime","common/vendor"]]]);