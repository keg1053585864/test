<template>
	<view style="width: 100%;height:auto; position: absolute">
		<view class="grace-margin" :class="'bg-gradual-'+customTheme" style=";margin: 0;padding: 10upx">
			<view class="grace-list" style="width: 90%;margin: auto">
				<view class="items">
					<view v-if="userInfo.nickName" class="icons ucenter-face">
						<image :src="userInfo.avatarUrl" mode="widthFix"></image>
					</view>
					<view v-if="userInfo.nickName" class="body">
						<view class="title" style="color: white">{{userInfo.nickName}}</view>
						<!-- <view class="desc" style="color: white">User ID: test</view> -->
					</view>
					<view v-if="!userInfo.nickName" class="icons ucenter-face">
						<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAnFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+TINBkAAAAM3RSTlMAwIAQ70BgMN8gv6Bwr9CQUJ/PPkvtAr0aEfGPXDkK2qsmFvbnmWtlRRzhsXdWxqOGt9IGCa8BAAAIP0lEQVR42uzby26dMBAG4ME3bO6Htkqr7Cq1VdXlvP+7NYoqNcfHxBD4B5D4VlEWQcMw4zEmdLlcLpfL5XI5hU8v1KuXH0o6oeBUVXHMVDf1iU6jbFrP7xifnabDK589z9AeO5agPM/WWjqo8sbLeEcHZCtezig6mNDyx/iBDkQr/rjqOOuLNbzKUZ6vZ16rCrS/MPJ6Zv9KcYb/Offj5XhaV6jGWkuvrLVKFZ4n3WhPDU8olKUUPaiO01pNu7l9aJAKTTqWUTKSfBy+0ZQVesOPKtqHWzM+aWWOUieJOIyj+XR/jEgsP+g1LVIWHGtImjYc8eUWXa8kYVWye64f07wmUc1WK7Pudi2TkiOOaKtIBhLkV8QR01HJG01imnVxxKKc9CRFm03jIN3t1LlqvlPTWqXBjyr5pbDY/k9aElEBarPfISUB0S21x6YkXyEtbcOKpySAmn4tnZIaNK2GqBPCGX7DA+5QJtOY7ZSDLbOOwNooIaiUjISl44TARupAUA75IBeZDQ7sWj3yLhUEBcx+3BE1AQ38Rkdbq8V2ij321Y0TWxNH7P5HR70dJqAv1Ao14AG9tVbpIjnfdazQSlLA26PQSuKhJRLfKkMoGt8dlUi1W/wBQJPaJp7xKnZiuD5d3jW+bcWjEGEYdBnGLaUjjEKi/44CFykkpi2Jd//11OnV2QpRCRyVVEKBoJu8Yokeb+HncEHmCKOEf8dVCR2PdVFKAhEyIZ5QLPijjlrsmxHHjHx3ahiz58l/1hGANdhpQioNbkutojiw1GPfOt87wImt6Klmuf/8Qz2earrOXe77rx9VMeGPsotvUU1wyQPwn4bf9fR7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"
						 mode="widthFix"></image>
					</view>
<!-- 					<view v-if="userInfo.nickName" class="body">
						<view class="action" style="float: right;margin-right: 40upx">
							<button class="cu-btn shadow-blur round" style="padding: 15upx 40upx 15upx 30upx; background-color: #FFFFFF"
							 @tap="showModal" data-target="DialogModal1" @click="config"><text class="cuIcon-settingsfill" style="margin-right: 10upx;"></text>设置</button>
						</view>
					</view> -->
					<view class="body" v-if="!userInfo.nickName">
						<view class="action" style="float: right;margin-right: 40upx">
							<button class="cu-btn bg-white shadow-blur round  background-color: #FFFFFF" @click="signIn">登陆/注册</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-margin" style="margin:0;background-color: white;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
			<view class="grace-box-banner">
				<!-- <navigator :url="userInfo.nickName?'../component/list?type=1':''" class="garce-items">
					<view class="line1">{{info.collections?info.collections:0}}</view>
					<view class="line2">收 藏</view>
				</navigator> -->
				<view class="garce-items" @click="test">
					<view class="line1" style="transform: translateX(-15upx)">￥ {{info.amount?info.amount:'0.00'}}</view>
					<view class="line2">钱 包</view>
				</view>
			</view>
		</view>

		<!--设置列表 -->
		<view>
			<view class="grace-margin" style="width: auto;border-radius: 5px;margin:15px 13px 80px 13px;background-color: #fff; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
				<view class="grace-list" style="margin: 0 10px;width: 96%">

					<!--		                    <navigator class="items">-->
					<!--		                        <view class="icons grace-icons icon-wallet grace-green"></view>-->
					<!--		                        <view class="body">-->
					<!--		                            <view class="title"></view>-->
					<!--		                        </view>-->
					<!--		                        <view class="arrow-right"></view>-->
					<!--		                    </navigator>-->
					<navigator class="items" :url="userInfo.nickName?'/pages/user/order/record':''">
						<view class="icons grace-icons icon-wallet text-yellow text-bold"></view>
						<view class="body">
							<view class="title">订单记录</view>
						</view>
						<view class="arrow-right"></view>
					</navigator>
					<navigator class="items" :url="userInfo.nickName?'../component/list?type=3':''">
						<view class="icons grace-icons icon-share text-red text-bold"></view>
						<view class="body">
							<view class="title">分享红包奖励</view>
						</view>
						<view class="arrow-right"></view>
					</navigator>
<!-- 					<navigator class="items" :url="userInfo.nickName?'../component/list?type=4':''">
						<view class="icons grace-icons cuIcon-notice grace-blue-sky"></view>
						<view class="body">
							<view class="title">消息
								<text v-if="info.unreadNumber" class="cuIcon-title" style="color:red;font-size: 35upx"></text>
								<text class="grace-badge bg-gradual-red">{{info.msg}}</text>
							</view>
						</view>
						<view class="arrow-right"></view>
					</navigator> -->




					<!--							<navigator class="items">-->
					<!--		                    <view class="icons grace-icons icon-wallet grace-green"></view>-->
					<!--		                    <view class="body">-->
					<!--		                        <view class="title">我的钱包</view>-->
					<!--		                    </view>-->
					<!--		                    <view class="arrow-right"></view>-->
					<!--		                </navigator>-->
					<!--		                    <navigator class="items" @click="test">-->
					<!--		                        <view class="icons grace-icons icon-article grace-blue-sky"></view>-->
					<!--		                        <view class="body">-->
					<!--		                            <view class="title">我的文章</view>-->
					<!--		                        </view>-->
					<!--		                        <view class="arrow-right"></view>-->
					<!--		                    </navigator>-->
					<!--		                    <navigator class="items" @click="test">-->
					<!--		                        <view class="icons grace-icons cuIcon-footprint grace-blue"></view>-->
					<!--		                        <view class="body">-->
					<!--		                            <view class="title">我的足迹-->

					<!--		                            </view>-->
					<!--		                        </view>-->
					<!--		                        <view class="arrow-right"></view>-->
					<!--		                    </navigator>-->
					<navigator class="items" :url="userInfo.nickName?'../component/form':''">
						<view class="icons grace-icons icon-user text-green"></view>
						<view class="body">
							<view class="title">个人信息</view>
						</view>
						<view class="arrow-right"></view>
					</navigator>
				</view>
			</view>
		</view>



		<!-- 对话框 -->
		<view class="cu-bar bg-white margin-top">
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content text-bold">主题颜色</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in colorList" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub"> <text class="cuIcon-ellipse " :class="'text-'+item.color" style="padding-right: 10upx"></text>{{item.label}}</view>
									<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
									 :value="item.color"></radio>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn" :class="'line-'+customTheme+' text-'+customTheme" @tap="hideModal">取 消</button>
							<button class="cu-btn margin-left" :class="'bg-gradual-'+customTheme" @tap="hideModal" @click="confirmSetting">确
								定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="authorityDialog=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view @click="cancelSignIn">
						<view class="action">

							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
				</view>
				<view class="padding-xl">
					您还未登陆，请先登陆后在进行操作
				</view>
				<view class="cu-bar bg-white">

					<!-- 	<view class="action margin flex-sub text-red">
						<navigator target="miniProgram" @click="cancelAuth">拒绝授权</navigator>
					</view> -->
					<button class="cu-btn bg-red shadow-blur" style="margin-left: 110upx" @click="cancelSignIn">暂不登陆</button>
					<button class="cu-btn bg-green shadow-blur" style="margin-right: 110upx" @getuserinfo="authorize" open-type="getUserInfo"
					 bindgetuserinfo="getUserInfo">立即登陆</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "user",
		data() {
			return {
				customTheme: '',
				modalName: null,
				authorityDialog: null,
				setting: {
					color: ''
				},
				info: {
					mark: 0,
					money: 0,
					library: 0,
					collections: '',
					amount: ''
				},
				userInfo: {
					nickName: '',
					avatarUrl: '',
					userId: '',
				},
				colorList: [
					{
						color: 'black',
						label: '墨黑'
					},
					{
						color: 'blue',
						label: '靛青（默认）'
					},
					{
						color: 'red',
						label: '魅红'
					},
					{
						color: 'orange',
						label: '鎏金'
					},
					{
						color: 'montana',
						label: '墨蓝'
					},
					{
						color: 'green',
						label: '翠柳'
					},
					{
						color: 'purple',
						label: '惑紫'
					},
					{
						color: 'pink',
						label: '霞彩'
					}
				]
			}
		},
		
		onLoad() {
			this.customTheme = this.$store.getters.customTheme
			console.log(this.$store.getters.customThemes)
			if (this.$store.state.token) {
				this.$http({
					url: '/user/info'
				}).then(res => {
					this.info = res
				})

			}
			this.userInfo = this.$store.state.userInfo;
		},
		watch: {
			"$store.state.customTheme": function(newValue) {
				this.customTheme = newValue
			}
		},
		methods: {
			confirmSetting() {
				uni.setStorageSync('customTheme', this.setting.color)
				this.$store.commit('customTheme', uni.getStorageSync('customTheme'));
			},
			RadioChange(e) {
				this.setting.color = e.detail.value
				console.log(this.setting.color)
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			hideAuthorityDialog(e) {
				this.authorityDialog = null
			},
			signIn() {
				this.authorityDialog = 'DialogModal2'
			},
			cancelSignIn() {
				this.authorityDialog = null
			},
			getUnreadNumber() {
				this.$http({
					url: '/message/unreadNumber',
					alert: 'none',
					loading: 'none'
				}).then(res => {
					this.$set(this.info, 'unreadNumber', res.sum)
					this.$store.commit('unreadNumber', res.sum)
				})
			},
			authorize() {
				uni.login({
					provider: 'weixin',
					success: code => {
						uni.getUserInfo({
							provider: 'weixin',
							success: info => {
								this.$http({
									url: '/user/login',
									method: 'POST',
									data: {
										code: code.code,
										nickname: info.userInfo.nickName,
										avatar_url: info.userInfo.avatarUrl
									},
									loading: 'none'
								}).then(res => {
									this.$store.commit('userInfo', info.userInfo)
									this.$store.commit('token', res.token)
									this.$http({
										url: '/user/identity',
										loading: 'none'
									}).then(res => {
										if (res.username && res.phone) {
											uni.reLaunch({
												url: './user'
											});
										} else {
											uni.reLaunch({
												url: '../component/form'
											});
										}
									})
								})
							}
						});
					}
				})
			}
		}
	}
</script>
<style>
	.ucenter-face {
		width: 120upx !important;
		height: 120upx !important;
	}

	.ucenter-face image {
		width: 120upx !important;
		height: 120upx !important;
	}

	.ucenter-line {
		width: 100%;
		height: 10px;
		background: #F4F5F6;
		margin: 8px 0;
	}
</style>
