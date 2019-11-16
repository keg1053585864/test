<template>
	<view>
		<view class="grace-margin" :class="'bg-gradual-'+customTheme" style=";margin: 0;padding: 10upx">
			<view class="grace-list" style="width: 90%;margin: auto">
				<view class="items">
					<view class="icons ucenter-face" style="width: 150upx !important; height: 150upx !important;">
						<image style="border-radius:20upx;width: 130upx !important; height: 130upx !important;object-fit: cover;" :src="institution.img_url"></image>
					</view>
					<view class="body">
						<view class="title" style="color: white">{{institution.name}}</view>
						<view class="desc" style="color: white">{{institution.description}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-card-view title-icon padding-bottom">
			<view class="grace-icons icon-phone"><text class="margin-left">电话：</text>{{institution.phone}}</view>
			<view class="grace-icons icon-address"><text class="margin-left">地点：</text>{{institution.location}}</view>
		</view>
		<view v-if="institution.detail||institution.video_url" class="title-icon margin grace-card-view" style="transform: translateY(-60upx);box-shadow:0 10upx 40upx 0 rgba(0, 0, 0, 0.3);margin:50rpx 30rpx">
			<view v-if="institution.video_url" class="solid-bottom margin-bottom">
				<view class="action">
					<text class="cuIcon-title" :class="'text-'+customTheme"></text>视频介绍
				</view>
			</view>
			<video  v-if="institution.video_url" style="width: 100%;" :src="institution.video_url"></video>
			<view class="solid-bottom margin-bottom">
				<view class="action">
					<text class="cuIcon-title" :class="'text-'+customTheme"></text>课程列表
				</view>
			</view>
			<view class="cu-list menu-avatar margin-bottom" style="box-shadow: 0 8upx 20upx 0 rgba(0,0,0,0.1);border-radius: 20upx;">
				<view class="cu-item" style="padding-bottom: 10upx;" v-for="(item,index) in itemList" :key="index">
					<view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
						<image :src="institution.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
					</view>
					<view class="content" style="margin-left:10upx;">
						<view class="">
							<view class="text-bold">{{item.name}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut text-gray" style="line-height: 1.1">限制数：{{item.limit}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut" style="line-height: 1.1"><text style="">已报名数：{{item.apply_number}}</text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="solid-bottom margin-bottom">
				<view class="action">
					<text class="cuIcon-title" :class="'text-'+customTheme"></text>详情介绍
				</view>
			</view>
			<view v-html="institution.detail" style="-webkit-overflow-scrolling:touch; ">
			</view>
		</view>
	</view>
</template>

<script>
	let host
	export default {
		data() {
			return {
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
				itemList: '',
				institution_id: ''
			}
		},
		onLoad(e) {
			this.institution_id = e.id
			this.customTheme = this.$store.state.customTheme
			
			this.$http({
				url: '/activity_institution/' + this.institution_id,
				v2: true
			}).then(res => {
				res.detail = res.detail.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
				if (res.video_url&&(res.video_url.split('/page/')[1])) {
					res.video_url = (res.video_url.split('/page/')[1]).split('.html')[0]
					this.getVideoInfo(res.video_url)
				}else{
					res.video_url = ''
				}
				this.institution = res
			})
			this.getItemList(this.institution_id)
		},
		methods: {
			getItemList(e) {
				this.$http({
					url: `/activity_institution/${e}/items`,
					v2: true,
					loading: 'none'
				}).then(res => {
					this.itemList = res
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

<style>
</style>
