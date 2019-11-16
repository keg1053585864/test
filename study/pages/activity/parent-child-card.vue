<template>
	<view>
		<!--局部选项卡-->
		<view class="grace-tab" style="height: 100%;">
			<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
				<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex === index ? 'grace-tab-current text-lg text-bold border-color-'+customTheme+' text-'+customTheme : '']"
				 :id="'tabTag-'+index" @tap="tabChange" :key="index">{{tab.name}}
				</view>
			</scroll-view>
			<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" style="-webkit-overflow-scrolling:touch; ">
				<!--tab1-->
				<swiper-item class="tab-img" style="-webkit-overflow-scrolling:touch; ">
					<view style="width:100%; height:auto;overflow: hidden;" @click="previewImage(form.cover_img_url)">
						<image style="" :src="form.cover_img_url" mode="widthFix"></image>
					</view>
					<view style="margin: 10upx;">
						<view class="bg-gradual-red" style="height: 120upx;width: 65%;border-radius: 20upx;float: left; ">
							<view class="text-white text-bold margin-left" style="transform: translateY(10upx);">￥
								<text class="text-bold text-xl">{{form.price.split('.')[0]}}</text>
								.{{form.price.split('.')[1]}}
								<text class="text-sm" style="text-decoration: line-through;padding-left: 10upx;">
									￥{{form.original_price}}
								</text>
							</view>
							<view class="text-white margin-left text-sm padding-left" style="padding-top: 10px;">
								<!-- {{form}} -->
								<text style="font-weight: bold;">{{form.name}}</text>
								
							</view>
						</view>
						<view class="" style="width: 35%;text-align: center;height: 120upx;padding-left: 20upx;float: left;margin-top: 10upx;">

							<view v-if="deadline[0]>=0">


								<view class="text-pink text-bold" style="padding: 0;margin: 0;">距离活动结束还有</view>
								<!-- 								<view v-if='deadline[0]' class="text-lg text-pink" style="padding: 0;margin: 0;">
                                      <text>
                                          <text class="bg-pink text-white" style="display: inline-block;border-radius: 10upx;width: 55upx;height: 60upx;text-align: center;vertical-align: middle;">
                                              {{deadline[0]<10?('0'+deadline[0]):deadline[0]}}
                                          </text>
                                          日
                                      </text>
                                      <text class="bg-pink text-white" style="display: inline-block;border-radius: 10upx;width: 55upx;height: 60upx;text-align: center;vertical-align: middle;">
                                          {{deadline[1]<10?('0'+deadline[1]):deadline[1]}}
                                      </text>
                                      <text style="text-align: center;">时</text>
                                      <text class="bg-pink text-white" style="display: inline-block;border-radius: 10upx;width: 55upx;height: 60upx;text-align: center;vertical-align: middle;">
                                          {{deadline[2]<10?('0'+deadline[2]):deadline[2]}}
                                      </text>
                                  </view> -->
								<view class="text-lg text-pink" style="padding: 0;margin: 0;">
									<text class="bg-pink text-white" style="display: inline-block;border-radius: 10upx;width: 55upx;height: 60upx;text-align: center;vertical-align: middle; line-height: 33px;">
										{{(deadline[1]+(24*deadline[0]))<10?('0'+deadline[1]):(deadline[1]+(24*deadline[0]))}}
									</text><text class="text-bold" style="margin: 10upx;">:</text>
									<text class="bg-pink text-white" style="display: inline-block;border-radius: 10upx;width: 55upx;height: 60upx;text-align: center;vertical-align: middle; line-height: 33px">
										{{deadline[2]<10?('0'+deadline[2]):deadline[2]}}
									</text><text class="text-bold" style="margin: 10upx;">:</text>
									<text>
										<text class="bg-pink text-white" style="display: inline-block;border-radius: 10upx;width: 55upx;height: 60upx;text-align: center;vertical-align: middle;line-height: 33px">
											{{deadline[3]<10?('0'+deadline[3]):deadline[3]}}
										</text>
									</text>
								</view>
							</view>
							<view v-if="deadline[0]<0" class="text-pink text-bold text-xl" style="padding: 0;margin: 0;height: 100upx;line-height: 100upx;letter-spacing: 2upx;">活动已结束</view>
						</view>
					</view>
					<view class="bg-white margin-left margin-right text-center">
						<h3>{{form.name}}</h3>
					</view>
					<view class="bg-white margin-left margin-right text-center">
						{{form.description}}
					</view>
					<view class="dividing-line"></view>
					<!--礼品信息-->
					<swiper v-if="giftList.length" style="height: 160upx;padding: 0" autoplay="true" interval="3000">
						<swiper-item v-for="(item,index) in giftList" style="">
							<view class="grace-margin teacher-card grace-list" style="padding: 0;height: 350upx;">
								<view @click="teacherJump(index)" class="items" style="margin: 12px 0;background-color: #FEEFFF;border-radius: 10upx;padding: 10upx;">
									<view class="margin-left" style="width: 70%;position: relative;border-radius: 15upx;">
										<view class="text-bold text-lg text-pink" style="margin-top: 10upx;">
											{{item.name}}
										</view>
										<view class="" style="color:#666666">{{item.sponsor?item.sponsor:'暂无信息'}}</view>
										<view style="position: absolute;top:-20upx;right:-10upx;width: 20upx;height: 20upx; background: #FFFFFF;z-index: 10;border-radius: 10upx;"></view>
										<view style="position: absolute;bottom:-20upx;right:-10upx;width: 20upx;height: 20upx; background: #FFFFFF;z-index: 10;border-radius: 10upx;"></view>
									</view>
									<view style="width: 30%;text-align: center;border-left:2upx dashed #DD524D">
										<view class="text-bold text-lg text-pink ">￥{{item.price.split('.')[0]}}元</view>
										<button class="cu-btn bg-pink round" style="padding: 10upx 40upx;height: 50upx;width: 150upx;margin: auto 20upx;"
										 @click="jumpToSelect">
											领 取
										</button>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view v-if="giftList.length" class="dividing-line"></view>
					<view class="grace-card-view title-icon  margin" style="letter-spacing: 2upx;;border-radius: 10upx;">
						<view class="text-gray" style="padding: 10upx 10upx 0 30upx;">TA们都在逛</view>
						<view class="padding-left">
							<img v-for="(item,index) in form.views" class="avatarImg" :key="index" :src="form.views[index]" />
							<img class="bg-gray avatarImg" style="box-shadow: 0 5upx 10upx rgba(0,0,0,0.2)" src="data:image/png;base64,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" />
							<button class="cu-btn shadow-blur round bg-gradual-orange" style="font-size: 25upx;margin-right: 10upx; float: right;height: 55upx"
							 @click="share" data-target="Image">邀请赚￥{{form.profit}}</button>
						</view>
					</view>
					<!-- <view class="dividing-line"></view> -->
					<!-- <view class="teacher-card grace-list" style="padding: 0"> -->
					<!-- <navigator :url="'../component/comment?id='+form.item_id+'&type=1'" hover-class="navigator-hover" class="items"> -->
					<!-- <view class="title"> -->
					<!-- <text> -->
					<!-- <text class="">评分：</text> -->
					<!-- <text class="cuIcon-favor" style="color: #f4c000"></text> -->
					<!-- <text class="cuIcon-favor" style="color: #f4c000"></text> -->
					<!-- <text class="cuIcon-favor" style="color: #f4c000"></text> -->
					<!-- <text class="cuIcon-favor" style="color: #f4c000"></text> -->
					<!-- <text class="cuIcon-favor" style="color: #f4c000"></text> -->
					<!-- </text> -->
					<!-- 			<text>查看评论</text>
                      </view> -->
					<!-- <view class="arrow-right"></view> -->
					<!-- </navigator> -->
					<!-- </view> -->
					<view style="padding: 0 20upx">
						<video :autoplay="videoAutoPlay" :loop="true" v-if="isVideoActive" style="width: 100%" :src="institutionList[videoTabCurrentIndex].video_url"></video></view>
					<scroll-view scroll-x class="bg-white nav" style="position: relative;z-index: 100;" scroll-with-animation
					 @scrolltolower="scrolltoRight">
						<view class="cu-item" style="height: 10upx;" :class="index==videoTabCurrentIndex?'text-green cur':''" v-for="(item,index) in institutionList"
						 :key="index" @tap="videoTabSelect" :data-id="index">
							<view style="width: 100%">
								<image :src="item.img_url" style="width: 190upx;height: 190upx; border-radius: 10upx;margin: 30upx auto 0 auto;display: block;"></image>
								<view class="text-center" style="letter-spacing: 0.6;">{{item.name}}</view>
							</view>
						</view>
					</scroll-view>
					<view class="dividing-line"></view>
					<!-- <view class="title-icon"> -->
					<view class="ql-editor" v-html="form.detail" style="-webkit-overflow-scrolling:touch;height: auto "></view>
					<!-- </view> -->
				</swiper-item>
				<!-- 机构信息 -->
				<swiper-item class="tab-img" style="-webkit-overflow-scrolling:touch; ">
					<scroll-view :scroll-y="true" @scrolltolower="scrolltoBottom" :style="'height: '+(clientHeight?clientHeight+'px':'auto')">
						<view class="margin">
							<navigator v-for="(item,index) in institutionList" :key="index" :url="'../home/institution-activity?id='+item.institution_id"
							 class="institution-card" style="width: 50%;;display: inline-block">
								<view style=" box-shadow: 0 4upx 20upx 4upx rgba(0,0,0,0.1);;border-radius: 20upx;overflow: hidden;margin: 10upx;">
									<img style="object-fit: contain; height: 300upx; width: 100%;" :src="item.img_url"></img>
									<view class="text-bold text-gray" style="text-align: center;margin-bottom: 10upx;">
										{{item.name}}
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''" @tap="hideModal">
			<view class="cu-dialog" style="background: none;width: auto;" @tap.stop="">
				<view style="min-height:300upx;">
					<wm-poster @hideLoading="hideLoading" style="min-height: 600upx;" v-if="ifPosterInfo" LineType=[1,true] :Referrer="userInfo+' 推荐给你'"
					 ref="child" QrSrc="" imgSrc="" @success="getPosterInfo" :Title="form.name+' '+form.description" :PriceTxt="'参考价:￥'+ '298.00'"></wm-poster>
				</view>
				<view class="cu-bar" style="background:none">
					<button class="cu-btn  shadow-blur bg-gradual-green" style="min-width: 80%;" @tap="save"><text class="cuIcon-down"
						 style="margin-right: 10upx"></text>保存至相册分享给好友</button>
					<view v-if="ifPosterInfo" style="margin: 0 0 0 0; width: 20%;padding: 0 0 0 10upx">
						<button class="cu-btn  shadow-blur bg-gradual-red" style="min-width: 100%;" @tap="hideModal">关闭</button>
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
		<!-- 分享按钮 -->

		<button @click="share" data-target="Image" class="cu-btn action bg-gradual-red ;" style="position: fixed; bottom: 200upx;right: 0;width: 200upx;z-index: 100;border-radius:100upx 0 0 100upx;">
			<view class="round" style="border: solid 5upx #FFFFFF;transform: translate(-68upx,0)">
				<view class="cuIcon-moneybag text-white" style="width: 47upx;height: 47upx;font-size: 40upx;transform: translateY(1px);margin-left: 3upx;"></view>
				<view @click="share" data-target="Image" class="text-white" style="margin: auto;transform: translate(70upx,0);min-width: 100upx;position: fixed; bottom: 5px;right: -50px;width: 200upx;z-index: 101;">
					分享有奖
				</view>
			</view>
			
		</button>
		
		<!--底部选项-->
		<view v-if="favoriteActive" :class="favoriteActive?'favoriteShow':''" style="position: absolute;z-index: 9999;bottom: 140upx;left: 220upx;">
			<view class="icon grace-icons icon-shoucang likeRain7" style="color: #DB3C75;transform: translateX(-35upx) translateY(55upx) rotate(-10deg) scale(3);"></view>
			<view class="icon grace-icons icon-shoucang likeRain6" style="color: #DB3C75;transform: translateX(40upx) translateY(45upx) rotate(-25deg) scale(2.5);"></view>
			<view class="icon grace-icons icon-shoucang likeRain5" style="color: #DB3C75;transform: translateX(-20upx) translateY(50upx) rotate(20deg) scale(1.9);"></view>
			<view class="icon grace-icons icon-shoucang likeRain4" style="color: #DB3C75;transform: translateX(30upx) translateY(55upx) rotate(-17deg) scale(1.4);"></view>
			<view class="icon grace-icons icon-shoucang likeRain3" style="color: #DB3C75;transform: translateX(-15upx) translateY(45upx) rotate(15deg) scale(1);"></view>
			<view class="icon grace-icons icon-shoucang likeRain2" style="color: #DB3C75;transform: translateX(10upx) translateY(30upx) rotate(-10deg) scale(0.8);"></view>
			<view class="icon grace-icons icon-shoucang likeRain1" style="color: #DB3C75;transform: translateX(-5upx) translateY(30upx) rotate(7deg) scale(0.7);"></view>
		</view>
		<view class="grace-margin footer-option">
			<view class="grace-footer">
				<view class="icon-btn" @click="home">
					<view disabled class="icon grace-icons icon-home" style="color: #00B26A"></view>
					<view disabled class="text" style="color: #00B26A">首页</view>
				</view>
				<view class="icon-btn" @click="favorite">

					<view class="icon grace-icons icon-shoucang like" style="color: #DB3C75"></view>
					<view class="text" style="color: #DB3C75">{{form.thumb_up_count}}点赞</view>
				</view>
				<button class="icon-btn bg-white" open-type="contact">
					<view class="icon grace-icons cuIcon-service" style="color: #0081FF;"></view>
					<!-- <view  >客服</view> -->
					<view style="color: #0081FF;width: 100%;" class="text bg-white">客服</view>
				</button>
				<button v-if="deadline[0]>=0" class="submit " type="warn" @click="jumpToSelect" :class="'bg-gradual-'+customTheme">选择课程</button>
				<button v-if="deadline[0]<0" disabled class="submit" type="warn" :class="'bg-gradual-'+customTheme">选择课程</button>
			</view>
		</view>
	</view>
</template>
<script>
	import wmPoster from "../component/wm-poster.vue"
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	let host
	let temp = 1 //用于滑动的延时
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] === val) return i;
		}
		return -1;
	};
	export default {
		components: {
			graceDialog: graceDialog,
			wmPoster: wmPoster
		},
		watch: {
			"$store.state.customTheme": function(newValue) {
				this.customTheme = newValue
			}
		},
		data() {
			return {
				//视频滚动区
				videoAutoPlay: false,
				isVideoActive: 1,
				videoTabCurrentIndex: 0,
				videoSwiperCurrentIndex: 0,
				//机构页面高度
				clientHeight: '',
				//活动ID
				activity_id: '',
				previewImageUrl: '',
				customTheme: '',
				ifPosterInfo: true,
				tempFilePath: '',
				userInfo: '',
				tempTarget: '',
				posterImg: '',

				form: {
					thumb_up_count: ''
				},
				deadline: [0, 0, 0, 0],
				// 对话框
				modalName: null,
				authorityDialog: null,
				//
				//老师数据
				giftList: [],
				//tab info
				titleShowId: 'tabTag-0',
				show4: false,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				activeHeight: 'height: auto',
				contentHeight: [],
				/* 机构信息 */
				institutionList: [],
				tabs: [{
						name: '活动介绍',
						id: 1
					},
					{
						name: '机构信息',
						id: 3
					},
				],
				//底部功能栏
				favoriteActive: false,
				likeAmount: 0,
				onLoadParams: '',
				extra: '',
				buildinParams: '',
				//分页
				page: 1
			}
		},
		onLoad(e) {
			this.customTheme = 'pink'
			console.log('buildin params are', e)
			this.activity_id = e.id
			// this.buildinParams = e
			this.onLoadParams = e
		},
		onShow() {

		},
		beforeDestroy() {
			if (this.likeAmount) {
				this.$http({
					url: `/activity/${this.activity_id}/up/${this.likeAmount}`,
					v2: true,
					method: 'PUT',
					loading: 'none'
				})
			}
		},
		onReady() {
			let e = this.onLoadParams
			if (e.scene) {
				setTimeout(() => {
					e.scene = decodeURIComponent(e.scene)
					this.activity_id = e.scene.split('&')[0]
					this.$store.commit('extra', e.scene);
					setTimeout(() => {
						this.isScene(e);
					})
				}, 1000)
			} else {
				this.isScene(e)
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.form.name,
				path: 'pages/activity/parent-child-card?id=' + this.activity_id,
				imageUrl: this.form.cover_img_url,
			}
		},
		methods: {
			//视频滚动区域
			scrolltoRight() {
				if (temp) {
					temp = 0
					this.getInstitutionInfo()
					setTimeout(() => {
						temp = 1
					}, 1000);
				}
			},
			videoTabSelect(e) {
				if (!this.videoAutoPlay) {
					this.videoAutoPlay = true
				}
				this.isVideoActive = 0
				this.isVideoActive = 1
				let index = e.currentTarget.dataset.id
				this.videoSwiperCurrentIndex = index
				this.videoTabCurrentIndex = index
				let i = this.institutionList[index];
				if (i.video_url && (i.video_url.split('/page/')[1])) {
					i.video_url = (i.video_url.split('/page/')[1]).split('.html')[0]
					this.getVideoInfo(i.video_url, index)
				}
			},

			isScene(e) {
				this.itemGetbyid(e)
				if (this.$store.state.userInfo.nickName) {
					this.userInfo = this.$store.state.userInfo.nickName
				}
			},
			//对话框方法
			hideModal(e) {
				this.ifPosterInfo = false;
				this.modalName = null;
				this.tempFilePath = ''
			},
			cancelSignIn(e) {
				this.authorityDialog = null
			},
			authorize() {
				let e = this.onLoadParams
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
										avatar_url: info.userInfo.avatarUrl,
									},
									loading: 'none'
								}).then(res => {
									this.$store.commit('userInfo', info.userInfo)
									this.$store.commit('token', res.token)
									uni.reLaunch({
										url: './parent-child-card?id=' + (e.id ? e.id : e.scene.split('&')[0])
									});
								})
							}
						})
					}
				})
			},
			//获取项目信息方法
			itemGetbyid(e) {
				this.$http({
					url: '/activity/' + (e.id ? e.id : e.scene.split('&')[0]),
				}).then(res => {
					res.detail = res.detail.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
					console.log(res, 233333)
					this.form = res;
					this.$store.commit('posterSrc', this.form.cover_img_url)
					this.$store.commit('qrSrc', this.form.cover_img_url)
					setInterval(() => {
						TimeDown(this.form.end_date+86400000);
					}, 1000);
					let _this = this

					function TimeDown(endDateStr) {
						//结束时间
						let endDate = new Date(endDateStr * 1);
						//当前时间
						let nowDate = new Date();
						//相差的总秒数
						let totalSeconds = parseInt((endDate - nowDate) / 1000);
						//天数
						let days = Math.floor(totalSeconds / (60 * 60 * 24));
						//取模（余数）
						let modulo = totalSeconds % (60 * 60 * 24);
						//小时数
						let hours = Math.floor(modulo / (60 * 60));
						modulo = modulo % (60 * 60);
						//分钟
						let minutes = Math.floor(modulo / 60);
						//秒
						let seconds = modulo % 60;
						//输出到页面
						_this.deadline = [days, hours, minutes, seconds]
						//延迟一秒执行自己
					}
					this.getInstitutionInfo()
					this.$http({
						url: `/activity/${this.activity_id}/gifts/${1}`,
						alert:'none'
					}).then(res => {
						this.giftList = res
					})
				})
			},
			tabChange: function(e) {
				let index = e.target.id.replace('tabTag-', '') * 1;
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				let index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
				if (!this.institutionList.length) {
					this.getInstitutionInfo()
				}
			},
			jumpToSelect() {
				if (!this.$store.state.userInfo.nickName) {
					this.authorityDialog = 'DialogModal2'
					return
				}
				this.$store.state.temp = this.form.max_items
				uni.navigateTo({
					url: './component/pageList?id=' + this.activity_id,
				})
			},
			pay() {
				let _this = this

				function payment(res) {
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.package,
						signType: 'MD5',
						paySign: res.paySign,
						success: function(msg) {
							uni.showToast({
								title: "支付成功",
								icon: "success"
							});
						}
					});
				}

				let data = this.$store.state.extra ? {
					item_id: this.form.item_id,
					extra: (this.$store.state.extra.split('&')[1])
				} : {
					item_id: this.form.item_id,
				}
				if (this.buildinParams.order_id) {
					this.$http({
						url: '/order/' + this.buildinParams.order_id,
						method: 'PUT'
					}).then(res => {
						payment(res)
					})
				} else {
					this.$http({
						url: '/order',
						method: 'POST',
						data: data,
						loading: 'none'
					}).then(res => {
						payment(res)
					})
				}
			},
			share(e) {
				if (this.deadline[0] < 0) {
					uni.showModal({
						title: '提示',
						content: '活动已结束',
						showCancel: false,
						confirmText: '知道了'
					});
					return
				}
				this.ifPosterInfo = true;
				this.$http({
					url: `/activity/${this.activity_id}/share`,
					method: 'POST',
					v2: true,
					loading: 'none'
				}).then(res => {
					this.extra = res.extra
					this.$store.commit('qrSrc', res.url);
					this.tempTarget = e.currentTarget.dataset.target;
					this.modalName = this.tempTarget
					this.$refs.child.OnCanvas();
					setTimeout(() => {
						uni.showLoading({
							title: "海报生成中",
							mask: true
						})
					}, 100)
				})

			},
			getPosterInfo(e) {
				this.tempFilePath = e.tempFilePath
			},
			hideLoading() {
				uni.hideLoading()
			},
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: this.tempFilePath,
					success: () => {
						this.hideModal()
						uni.showToast({
							title: '海报已保存到相册，可分享给好友',
							icon: 'none',
							duration: 2500
						});
					}
				});
			},
			shareTo() {
				setTimeout(() => {
					uni.previewImage({
						urls: [this.tempFilePath],
						longPressActions: {
							itemList: ['发送给朋友', '保存图片', '收藏'],
							success: function(data) {},
							fail: function(err) {}
						}
					});
				});
			},
			favorite() {
				if (!this.favoriteActive) {
					this.form.thumb_up_count += 1
					this.favoriteActive = true
					setTimeout(() => {
						this.favoriteActive = false
						this.likeAmount += 1
					}, 2000);
				}
			},
			//获取视频链接
			getVideoInfo(vid, index) {
				let that = this;
				let urlString = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=' + vid;
				wx.request({
					url: urlString,
					success: function(res1) {
						let dataJson = res1.data.replace(/QZOutputJson=/, '') + "qwe";
						let dataJson1 = dataJson.replace(/;qwe/, '');
						let data = JSON.parse(dataJson1);
						console.log(data)
						let fn_pre = data.vl.vi[0].lnk
						host = data['vl']['vi'][0]['ul']['ui'][0]['url']
						let streams = data['fl']['fi']
						let seg_cnt = data['vl']['vi'][0]['cl']['fc']
						if (parseInt(seg_cnt) == 0) {
							seg_cnt = 1
						}
						// let best_quality = streams[streams.length - 1]['name'];
						if (streams.length > 2) {
							let part_format_id = streams[streams.length - 1]['id'];
							for (let i = 1; i < (seg_cnt + 1); i++) {
								let filename = fn_pre + '.p' + (part_format_id % 10000) + '.' + i + '.mp4';
								that.requestVideoUrls(part_format_id, vid, filename, index);
							}
						} else {
							let part_format_id = streams[streams.length - 1]['id'];
							for (let i = 1; i < (seg_cnt + 1); i++) {
								let filename = fn_pre + '.mp4';
								that.requestVideoUrls(part_format_id, vid, filename, index);
							}
						}
					}
				})
			},
			requestVideoUrls: function(part_format_id, vid, fileName, index) {
				let keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid +
					"&filename=" + fileName + "&appver=3.2.19.333"
				let that = this;
				wx.request({
					url: keyApi,
					success: function(res2) {
						let dataJson = res2.data.replace(/QZOutputJson=/, '') + "qwe";
						let dataJson1 = dataJson.replace(/;qwe/, '');
						let data = JSON.parse(dataJson1);
						console.log(data)
						if (data.key != undefined) {
							let vkey = data['key']
							let url = host + fileName + '?vkey=' + vkey;
							console.log(String(url), host)
							that.institutionList[index].video_url = String(url)
						}
					}
				})
			},
			//机构信息
			getInstitutionInfo() {
				this.$http({
					url: `/activity/${this.activity_id}/institutions/${this.page}`,
					loading: 'none'
				}).then(res => {
					if (this.page < 2) {
						this.institutionList = res;
						let i = this.institutionList[0];
						if (i.video_url && (i.video_url.split('/page/')[1])) {
							i.video_url = (i.video_url.split('/page/')[1]).split('.html')[0]
							this.getVideoInfo(i.video_url, 0)
						}
					} else {
						for (let i of res) {
							this.institutionList.push(i)
						}
					}
					this.page += 1
					let _this = this
					uni.getSystemInfo({
						success: res1 => {
							_this.clientHeight = res1.windowHeight
						}
					})
				})
			},
			//机构列表滑动到底部
			scrolltoBottom(e) {
				if (temp) {
					temp = 0
					this.getInstitutionInfo()
					setTimeout(() => {
						temp = 1
					}, 1000);
				}
			},
			home() {
				uni.reLaunch({
					url: '../index/index'
				});
			},
			cancelAuth() {
				this.authorityDialog = null
			},
			previewImage(e) {
				this.previewImageUrl = e
				uni.previewImage({
					urls: [this.previewImageUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
					},
				});
			}
		}
	}
</script>
<style>
	.grace-tab-swiper {
		height: 100%;
		position: absolute;
		padding-bottom: 150upx;
	}

	.tab-img {
		overflow: auto;
		padding: 8upx 0;
	}

	.tab-img image {
		width: 100%;
	}

	/*tab1*/
	.title-icon {
		border-radius: 10upx;
		padding: 0;
		margin: 6upx 20upx 15upx 20upx;
		overflow: hidden;
	}

	.title-icon .info {
		box-shadow: none;
		border-bottom: 2upx solid #f3f4f6;
	}

	.grace-icons {
		font-size: 24upx !important
	}

	.dividing-line {
		width: 100%;
		height: 5px;
		background: #f3f4f6;
		margin: 0;
	}


	.teacher-card {
		;
		width: 90%;
		margin: 0 auto;
	}

	.teacher-card .desc {
		margin-top: 14upx;
		color: black
	}

	.teacher-card .tab {
		color: white;
		background-color: #3688FF;
		border-radius: 40upx;
		padding: 8upx 20upx;
		margin-right: 20upx
	}

	.avatarImg {
		width: 50upx !important;
		height: 50upx !important;
		;
		border-radius: 50upx
	}

	.content1 {
		padding: 12px;
		text-align: center;
		line-height: 50px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.content1 .title {
		padding-left: 15upx;
		margin-top: 20upx
	}

	.content1 .text {
		padding-left: 15upx
	}


	/*tab3*/
	.content2 {
		word-wrap: break-word
	}


	/*tab3*/
	.priceNotes {
		margin-left: 12upx;
		width: 100%
	}

	.priceNotes .cu-bar {
		min-height: 80upx
	}

	.priceNotes+view {
		word-wrap: break-word
	}

	/* 图片形式 */
	.footer-option .submit {
		width: 40%
	}

	.inputTitle .grace-items {
		border-radius: 4px;
		line-height: 50px;
		color: #3688FF;
		padding: 5px 15px
	}

	.inputTitle .grace-label {
		float: left;
		color: #3688FF
	}

	.inputTitle .grace-dialog-btns button {
		font-size: 30upx
	}

	.favoriteShow {
		animation: favoriteShow 2s;
	}

	@keyframes favoriteShow {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	/* 	.favoriteHide {
          animation: favoriteHide .5s;
      }

      @keyframes favoriteHide {
          0% {
              opacity: 0;
          }

          100% {
              opacity: 1;
          }
      } */

	.likeRain1 {
		animation: likeRain1 1s infinite;
	}

	@keyframes likeRain1 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.likeRain2 {
		animation: likeRain2 1s infinite;
	}

	@keyframes likeRain2 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.likeRain3 {
		animation: likeRain3 1.1s infinite;
	}

	@keyframes likeRain3 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.likeRain4 {
		animation: likeRain4 1.2s infinite;
	}

	@keyframes likeRain4 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.likeRain5 {
		animation: likeRain5 1.3s infinite;
	}

	@keyframes likeRain5 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.likeRain6 {
		animation: likeRain6 1.4s infinite;
	}

	@keyframes likeRain6 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.likeRain7 {
		animation: likeRain7 1.5s infinite;
	}

	@keyframes likeRain7 {
		0% {
			opacity: 1;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.like {
		animation: sizeChange 2.5s infinite reverse;
	}

	@keyframes sizeChange {
		0% {
			transform: scale(1.4);
			opacity: 1;
		}

		50% {
			transform: scale(1.8);
			opacity: .75;
		}

		100% {
			transform: scale(1.4);
			opacity: 1;
		}
	}
</style>
