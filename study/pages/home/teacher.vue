<template>
	<view>
		<view class="grace-margin" :class="'bg-gradual-'+customTheme" style=";margin: 0;padding: 10upx">
			<view class="grace-list" style="width: 90%;margin: auto">
				<view class="items">
					<view class="icons ucenter-face" style="width: 150upx !important; height: 150upx !important;">
						<image style="border-radius:20upx;width: 130upx !important; height: 130upx !important;object-fit: cover;" :src="teacher.teacher_img_url"></image>
					</view>
					<!-- 	<view class="icons ucenter-face" style="width: 150upx !important; height: 150upx !important">
						<image style="border-radius:20upx;width: 130upx !important; height: 130upx !important;" :src="teacher.teacher_img_url"
						 mode="widthFix"></image>
					</view> -->
					<view class="body">
						<view class="title" style="color: white">{{teacher.teacher_name}}</view>
						<view class="desc" style="color: #E1E1E1">{{teacher.teacher_title.toString()}} </view>
						<view class="desc" style="color: white">{{teacher.teacher_introduction}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="teacher.teacher_detail" class="title-icon margin grace-card-view" style="transform: translateY(-60upx);box-shadow:0 10upx 40upx 0 rgba(0, 0, 0, 0.3)">
			<view style="-webkit-overflow-scrolling:touch; ">
				{{teacher.teacher_detail}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customTheme: '',
				teacher: {
					teacher_detail: '',
					teacher_id: '',
					teacher_img_url: '',
					teacher_introduction: '',
					teacher_name: '',
					teacher_title: []
				}
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme
		},
		onReady() {
			this.teacher = this.$store.state.temp
		},
		methods: {

		}
	}
</script>

<style>
</style>
