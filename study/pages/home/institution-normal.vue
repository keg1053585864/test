<template>
	<view >
		<view class="grace-margin bg-img-shadow"  style=";margin: 0;padding: 30upx 30upx 100upx">
			<view class="grace-list" style="width: 90%;margin: auto">
				<view class="items">
					<view class="icons ucenter-face" style="width: 150upx !important; height: 150upx !important;">
						<image style="border-radius:20upx;width: 130upx !important; height: 130upx !important;object-fit: cover;" :src="institution.img_url"></image>
					</view>
					<view class="body">
						<view class="title text-lg" style="color: white; font-weight: bold;">{{institution.name}}</view>
						<view class="desc text-sm" style="color: #999">{{institution.description}}</view>
						<view class="desc" style="color: #999">地点: {{institution.address}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="position: relative; bottom: 30px;">
			<scroll-view scroll-x class="bg-white nav" style="width: 95%; box-shadow:  0 -10 20upx 0 rgba(0,0,0,0.1);position: relative;z-index: 100;  margin: 0 auto; border-radius: 10px;"
				 scroll-with-animation>
					<view class="cu-item" :class="index==tabCurrentIndex?'text-'+customTheme+' cur text-bold text-lg':''" v-for="(item,index) in tabList"
					 :key="index" @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
				<swiper :style="'height: '+(clientHeight1?clientHeight1+'px':'auto')" :current="tabCurrentIndex" @change="swiperChange">
			
					<swiper-item>
						<scroll-view :scroll-y="true" :style="'height: '+(clientHeight1?clientHeight1+'px':'auto')" @scrolltolower="scrolltoBottom">
							<view class="menu-avatar">
								<view class="grace-card-view margin" style="box-shadow:0 8upx 25upx 0 rgba(0, 0, 0, 0.2)" v-for="(item,index) in itemList"
								 :key="index" @click="itemJump(item,index)">
									<view style="width:100%; height:300upx; overflow: hidden;position:relative;">
										<image style="width:100%; height:300upx;  margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;object-fit:cover;"
										 :src="item.img_url" mode="widthFix"></image>
									</view>
									<view class="card-content">
										{{item.name}}
									</view>
									<view class="footer">
										<view class="grace-icons icon-home">{{item.duration==0?'长期':('天数：'+item.duration) }}</view>
										<view class="grace-icons icon-share"> 地点：{{item.location}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
								<swiper-item>
						<!-- <view class="grace-card-view title-icon padding"> -->
						<!-- <view class="grace-icons icon-phone"><text class="margin-left">电话：</text>{{institution.phone}}</view> -->
						<!-- </view> -->
						<view v-if="institution.detail||institution.video_url" class="title-icon grace-card-view margin-top grace-card-view-text">
							<view v-if="institution.video_url" class="solid-bottom margin-bottom">
								<view class="action">
									<text class="cuIcon-title" :class="'text-'+customTheme"></text>视频介绍
								</view>
							</view>
							<video v-if="institution.video_url" style="width: 100%;" :src="institution.video_url"></video>
							<!-- 	<view class="solid-bottom margin-bottom">
								<view class="action">
									<text class="cuIcon-title" :class="'text-'+customTheme"></text>详情介绍
								</view>
							</view> -->
							<view v-html="institution.detail" style="-webkit-overflow-scrolling:touch; ">
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
</template>

<script>
	let host
	let temp = 1
	export default {
		data() {
			return {
				//页面切换
				tabList: [
					{
						name: '项目列表',
						list: []
					},
					{
						name: '机构详情',
						list: []
					}
				],
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				clientHeight1: '',
				clientHeight2: '',
				//页面切换 end
				customTheme: '',
				institution: {
					name: '',
					contact: '',
					phone: '',
					img_url: '',
					video_url: '',
					description: '',
					detail: '',
					location: ''
				},
				itemList: [],
				institution_id: '',
				//分页
				page: 1
			}
		},
		onLoad(e) {
			this.institution_id = e.id
			this.customTheme = this.$store.state.customTheme
			this.getItemList()
			this.$http({
				url: '/institution/' + this.institution_id,
				v3: true
			}).then(res => {
				res.detail = res.detail.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
				if (res.video_url && (res.video_url.split('/page/')[1])) {
					res.video_url = (res.video_url.split('/page/')[1]).split('.html')[0]
					this.getVideoInfo(res.video_url)
				} else {
					res.video_url = ''
				}
				this.institution = res
				uni.getSystemInfo({
					success: res1 => {
						this.clientHeight1 = res1.windowHeight
					}
				})
			})
		},
		methods: {
			//课程滑动到最底部
			scrolltoBottom(e) {
				if (temp) {
					temp = 0
					this.getItemList()
					setTimeout(() => {
						temp = 1
					}, 1000);
				}
			},
			//页面切换
			tabSelect(e) {
				let index = e.currentTarget.dataset.id
				this.swiperCurrentIndex = index
				this.tabCurrentIndex = index
			},
			swiperChange(e) {
				let index = e.detail.current;
				this.tabCurrentIndex = index;
				this.swiperCurrentIndex = index;
			},
			//课程跳转
			itemJump(row, index) {
				uni.navigateTo({
					url: '../home/item?id=' + row.item_id,
				});
			},
			//课程跳转 end
			getItemList() {
				this.$http({
					url: '/institution/' + this.institution_id + '/items/' + this.page,
					v3: true,
				}).then(res => {
					for (let i of res) {
						this.itemList.push(i)
					}
					this.page += 1
				})
			},
			getVideoInfo(vid) {
				let that = this;
				let urlString = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=' + vid;
				wx.request({
					url: urlString,
					success: function(res) {
						console.log(res);
						let dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
						let dataJson1 = dataJson.replace(/;qwe/, '');
						let data = JSON.parse(dataJson1);
						let fn_pre = data.vl.vi[0].lnk
						host = data['vl']['vi'][0]['ul']['ui'][0]['url']
						let streams = data['fl']['fi']
						let seg_cnt = data['vl']['vi'][0]['cl']['fc']
						if (parseInt(seg_cnt) == 0) {
							seg_cnt = 1
						}
						if (streams.length > 2) {
							let part_format_id = streams[streams.length - 1]['id'];
							for (let i = 1; i < (seg_cnt + 1); i++) {
								let filename = fn_pre + '.p' + (part_format_id % 10000) + '.' + i + '.mp4';
								that.requestVideoUrls(part_format_id, vid, filename);
							}
						} else {
							let part_format_id = streams[streams.length - 1]['id'];
							for (let i = 1; i < (seg_cnt + 1); i++) {
								let filename = fn_pre + '.mp4';
								that.requestVideoUrls(part_format_id, vid, filename);
							}
						}
					}
				})
			},
			requestVideoUrls: function(part_format_id, vid, fileName) {
				let keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid +
					"&filename=" + fileName + "&appver=3.2.19.333"
				let that = this;
				wx.request({
					url: keyApi,
					success: function(res) {
						let dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
						let dataJson1 = dataJson.replace(/;qwe/, '');
						let data = JSON.parse(dataJson1);
						if (data.key != undefined) {
							let vkey = data['key']
							let url = host + fileName + '?vkey=' + vkey;
							console.log(String(url), host)
							that.institution.video_url = String(url)
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	/* 项目信息 */
	.grace-card-view {
		border-radius: 10upx;
		padding: 0;
		
		overflow: hidden
	}
	.grace-card-view-text{
		margin: 30upx;
		box-shadow: none;
	}
	
	.grace-card-view image {
		width: 100%;
	}

	.card-content {
		margin: 0 20upx;
		width: auto;
		padding-bottom: 10upx
	}

	.grace-icons {
		font-size: 24upx !important
	}
	.bg-img-shadow{
		background-size: cover;
		background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://cdn.demo.fastadmin.net/assets/addons/vote/img/banner.jpg);
	}
</style>
