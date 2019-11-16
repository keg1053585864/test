<template>
	<view class="">
		<swiper class="grace-swiper swiper2" autoplay="true" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#00B26A"
		 style="height:276upx" interval="5000">

			<swiper-item>
				<view style="width:100%; height:170px;overflow: hidden">
					<image style="width:100%; height:170px; object-fit:cover;transform: translateY(-25%)" :src="location.location_head_img_url"
					 mode="widthFix"></image>
					<view class="title">{{location.location}}</view>
				</view>
			</swiper-item>
			<!--            <swiper-item>-->
			<!--                <navigator url=''>-->
			<!--                    <image src='https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/2.png' mode='widthFix'></image>-->
			<!--                    <view class="title">文本信息</view>-->
			<!--                </navigator>-->
			<!--            </swiper-item>-->
			<!--            <swiper-item>-->
			<!--                <navigator url=''>-->
			<!--                    <image src='https://graceui.oss-cn-beijing.aliyuncs.com/swiperimgs/3.png' mode='widthFix'></image>-->
			<!--                    <view class="title">文本信息</view>-->
			<!--                </navigator>-->
			<!--            </swiper-item>-->
		</swiper>


		<view class="">
			<!-- 局部选项卡 -->
			<view class="grace-tab" style="">
				<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
					<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex === index ? 'grace-tab-current text-lg text-bold border-color-'+customTheme+' text-'+customTheme : '']"
					 :id="'tabTag-'+index" @tap="tabChange" :key="index">{{tab.name}}
					</view>
				</scroll-view>
				<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange">
					<swiper-item class="tab-img" style="-webkit-overflow-scrolling:touch; ">
						<scroll-view :scroll-y="true" @scrolltolower="scrolltoBottom" :style="'height: '+(clientHeight?clientHeight+'px':'auto')">
							<view class="grace-card-view margin" style="box-shadow:0 8upx 25upx 0 rgba(0, 0, 0, 0.2)" v-for="(item,index) in location.items"
							 :key="index" @click="itemJump(index)">
								<view style="width:100%; height:300upx; overflow: hidden;position:relative;">
									<image style="width:100%; height:300upx;  margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;object-fit:cover;"
									 :src="item.item_head_img_url" mode="widthFix"></image>
								</view>
								<view class="card-content">
									{{item.item_name}}
								</view>
								<view class="footer">
									<view class="grace-icons icon-home"> 天数：{{item.duration}}</view>
									<view class="grace-icons icon-share"> 地点：{{location.location}}</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clientHeight: '',
				customTheme: '',
				location: '',
				swiperHeight: 'height:2800upx;',
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabs: [
					// {
					// name: '猎',
					// id: 'guowai'
					// },
					// {
					// name: '小贴士',
					// id: 'qita'
					// }
				],
				titleShowId: 'tabTag-0',

				//info
				info: {
					location_head_img_url: '',
					items: [],
				},
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme;
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			this.getInfo(e)
		},
		onReady() {

		},
		methods: {
			getInfo(e) {
				let _this = this
				this.$http({
					url: '/location/' + e.id
				}).then(res => {
					this.location = res
					uni.getSystemInfo({
						success: res1 => {
							_this.clientHeight = res1.windowHeight
						}
					})
				})
			},
			//项目列表滑动到底部
			scrolltoBottom(e) {
				// if (temp) {
				// 	temp = 0
				// 	let a = this.institutionList
				// 	let lastId = a[a.length - 1].institution_id
				// 	console.log(lastId)
				// 	this.getInstitutionInfo(lastId)
				// 	setTimeout(() => {
				// 		temp = 1
				// 	}, 1000);
				// }
			},
			itemJump(index) {
				console.log(this.location)
				console.log(index);
				uni.navigateTo({
					url: `../home/item?id=${this.location.items[index].item_id}`,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '')*1;
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
				console.log(index);
			}
		}
	}
</script>

<style>
	.grace-tab-swiper {
		height: 100%;
		position: absolute;
		margin-bottom: 50upx;
	}

	.swiper2 image {}

	.grace-icons {
		font-size: 12px !important
	}

	.grace-card-view {
		border-radius: 10upx;
		padding: 0;
		overflow: hidden
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

	.footer {
		margin-bottom: 14upx
	}
</style>
