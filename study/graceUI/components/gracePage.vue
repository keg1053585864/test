<template>
	<view class="grace-sbody">
		<!-- 头部导航 -->
		<view v-if="customHeader">
			<view class="grace-page-header" :style="{'z-index':headerIndex, background:headerBG}">
				<!-- 沉浸式状态栏 -->
				<view class="grace-page-status-bar" :style="{height:statusBarHeight+'px', background:statusBarBG}"></view>
				<!-- 头部核心 -->
				<view class="grace-page-header-nav" :style="{height:headerHeight+'px'}">
					<view class="grace-header-main">
						<slot name="gHeader"></slot>
					</view>
					<view :style="{width:BoundingWidth, height:'10px'}"></view>
				</view>
			</view>
			<!-- 占位 view -->
			<view :style="{width:'100%', height:(statusBarHeight + headerHeight) + 'px'}"></view>
		</view>
		<!-- 页面主体 -->
		<view class="grace-page-body"><slot name="gBody"></slot></view>
		<!-- 页面底部 -->
		<view class="grace-page-footer" :style="{'z-index':footerIndex}">
			<slot name="gFooter"></slot>
			<!-- iphoneX 占位 view -->
			<!-- #ifndef APP-PLUS -->
			<view :style="{width:'100%', height:iphoneXButtomHeight+'px'}"></view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
export default{
	props:{
		customHeader : {
			type : Boolean,
			default : true
		},
		headerHeight : {
			type : Number,
			default : 44
		},
		headerIndex : {
			type : Number,
			default : 999
		},
		headerBG : {
			type : String,
			default : 'none'
		},
		statusBarBG : {
			type : String,
			default : 'none'
		},
		footerIndex : {
			type : Number,
			default : 999
		},
	},
	data() {
		return {
			statusBarHeight : 0,
			iphoneXButtomHeight:0,
			BoundingWidth : '0px'
		}
	},
	created:function(){
		try {
		    var res = uni.getSystemInfoSync();
			var iPhoneXBottom = 0;
			res.model = res.model.replace(' ', '');
			if(res.model.indexOf('iPhoneX') != -1){
				this.iphoneXButtomHeight = uni.upx2px(50);
			}
		} catch (e){
		    return null;
		}
		if(!this.customHeader){return ;}
		// #ifndef MP-ALIPAY
			this.statusBarHeight = res.statusBarHeight;
			// #ifdef MP-WEIXIN
			// 小程序胶囊按钮
			var res  = uni.getMenuButtonBoundingClientRect();
			this.BoundingWidth = (res.width + 20) + 'px';
		// #endif
		// #endif
	}
}
</script>
<style>
.grace-sbody{display:flex; flex-direction:column; flex:1;}
.grace-page-header{width:100%; position:fixed; left:0; top:0; z-index:99; background:#FFFFFF;}
.grace-page-status-bar{width:100%; height:0;}
.grace-page-header-nav{width:100%; display:flex; flex-direction:row; flex-wrap:nowrap; height:44px; align-items:center;}
.grace-header-main{width:300rpx; flex:auto;}
.grace-page-body{width:100%;}
.grace-page-footer{width:100%; position:fixed; left:0; bottom:0; z-index:99;}
</style>