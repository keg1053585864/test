<template>
	<view>
		<view class="cu-bar" :class="'bg-gradual-'+customTheme">
			<text class="text-bold text-xl margin-left">个人信息</text>
			<!-- <view class="action" @click="setting"> -->
			<!-- <text class="cuIcon-settingsfill text-white"></text><text class="text-white margin-left-sm" v-if="footOption.delete"> 取 消</text> -->
			<!-- </view> -->
		</view>
		<view class="grace-margin">
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">电话</view>
				<input type="number" v-model.trim="phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<!-- 		<view class="cu-form-group">
            <view class="title">验证码</view>
            <input name="input"></input>
            <button class='cu-btn bg-green shadow'>发送</button>
        </view> -->
		</view>
		<view class="action grace-margin"><button class="cu-btn text-lg" style="width: 100%;" :class="'bg-gradual-'+customTheme"
			 @click="submit">更
				新</button></view>
		<view class="action" style="position: fixed; bottom: 100upx; right: 30upx;"><button class="cuIcon-usefull cu-btn round"
			 :class="'bg-gradual-'+customTheme" @click="backHome">返回首页</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customTheme: '',
				username: '',
				phone: '',
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme;
		},
		onReady() {
			this.$http({
				url: '/user/identity',
			}).then(res => {
				this.username = res.username;
				this.phone = res.phone
			})
		},
		methods: {
			submit() {
				this.$http({
					url: '/user/complete',
					method: 'PUT',
					data: {
						username: this.username,
						phone: this.phone * 1
					},
					loading: 'none'
				}).then(() => {
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
				})
			},
			back() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			},
			backItem() {
				this.$http({
					url: '/user/complete',
					method: 'PUT',
					data: {
						username: this.username,
						phone: this.phone * 1
					}
				}).then(res => {
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1,
							animationType: 'pop-out',
							animationDuration: 200
						});
					}, 1000)
				})
			},
			backHome() {
				uni.reLaunch({
					url: '../index/index'
				});
			}
		}
	}
</script>

<style>
</style>
