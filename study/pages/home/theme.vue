<template>
	<view >
		<swiper class="grace-swiper swiper2" autoplay="true" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#00B26A"
		 style="height:276upx" interval="5000">
			<swiper-item>
				<view style="width:100%; height:170px;overflow: hidden">
					<image style="width:100%; height:170px; object-fit:cover;transform: translateY(-25%)" :src="theme.head_img_url"
					 mode="widthFix"></image>
					<view class="title bg-img-shadow"><text class="bg-img-shadow-text">{{theme.theme}}</text></view>
				</view>
			</swiper-item>
		</swiper>


		<view class="" >
			<!-- 局部选项卡 -->
			<view class="grace-tab" style="">
				<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
					<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex === index ? 'grace-tab-current text-lg text-bold border-color-'+customTheme+' text-'+customTheme : '']"
					 :id="'tabTag-'+index" @tap="tabChange" :key="index">{{tab.name}}
					</view>
				</scroll-view>
				<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" style="width: 380px; margin: 0 auto; border-radius: 10px; top: 100px; left:50%; transform: translate(-50%, 0%); background-color: #FFFFFF;">
					<swiper-item class="tab-img" style="-webkit-overflow-scrolling:touch; ">
						<scroll-view :scroll-y="true" @scrolltolower="scrolltoBottom" :style="'height: '+(clientHeight?clientHeight+'px':'auto')">
							<view class="institution  margin-bottom margin" v-for="(item,index) in institutionList" :key="index" @click="institutionJump(item, index)">
								<view class="institution-img-card">
									<img :src="item.img_url" />
								</view>
								<view class="institution-info padding-left">
									<view class="text-base text-bold">{{item.name}}</view>
									<view class="institution-detail ">
										<view class=" description text-gray text-xs">
											<text class="description-text text-cut"> “{{item.description}}” </text>
										</view>
									</view>
									<view class="distance text-gray text-sm">
										<text>{{item.address?item.address:'地址未知'}}</text>
										<text>{{item.distance>=1000?(Math.floor(item.distance/1000)+'km'):'<1km'}}</text>
									</view>
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
	let temp = 1
	export default {
		data() {
			return {
				//列表高度
				clientHeight: '',
				customTheme: '',
				//顶部信息
				theme: {
					head_img_url: '',
					theme: ''
				},
				//顶部信息 end
				institutionList: '',
				swiperHeight: 'height:2800upx;',
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabs: [],
				titleShowId: 'tabTag-0',
				//分页
				page: 1,
				themeId: '',
				//分页 end
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme;
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			this.theme = this.$store.state.temp
			this.themeId = e.id
			this.getInstitution(this.themeId, this.page)
		},
		onReady() {

		},
		methods: {
			getInstitution(id, page) {
				let _this = this
				this.$http({
					url: '/theme/' + id + '/institutions/' + page,
					data: {
						longitude: this.$store.state.location.longitude,
						latitude: this.$store.state.location.latitude
					},
					v3: true
				}).then(res => {
					if(this.page<2){
					this.institutionList = res						
					}else{
						for (let i of res) {
							this.institutionList.push(i)
						}
					}
					this.page += 1
					uni.getSystemInfo({
						success: res1 => {
							_this.clientHeight = res1.windowHeight
						}
					})
				})
			},
			//项目列表滑动到底部
			scrolltoBottom(e) {
				if (temp) {
					temp = 0
					this.getInstitution(this.themeId, this.page)
					setTimeout(() => {
						temp = 1
					}, 1000);
				}
			},
			itemJump(index) {
				console.log(this.theme)
				console.log(index);
				uni.navigateTo({
					url: `../home/item?id=${this.theme.items[index].item_id}`,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			institutionJump(row, index) {
				uni.navigateTo({
					url: `./institution-normal?id=${row.institution_id}`,
				});
			},
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '') * 1;
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
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

	/* 机构列表 */
	.institution {
		display: flex;
		
		border-radius: 10rpx;
		padding-bottom: 30rpx;
		border-bottom: 1px solid #f3f4f6;;
	}

	.institution-img-card img {
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
	}

	.institution-info {
	width: 100%;
	display: flex;
	flex-flow: column;
	justify-content:space-between
		
	}

	.institution-info .institution-detail .description {
		width: 450upx;
		float: left
	}
	.description-text{
		color: #7f7f7f;
		padding: 3px 5px;
		border: 1px solid #B2B2B2;
		border-radius: 6rpx;
	}
	.distance{
		display: flex;
		justify-content: space-between;
	}
	.institution-info .institution-detail .distance {
		text-align: right;
	}

	.footer {
		margin-bottom: 14upx
	}
	.bg-img-shadow{
		height: 100% !important;
		background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)) !important;  
	}
	.bg-img-shadow-text{
		font-size: 24px;
		font-weight: bold;
		letter-spacing: 4px;
		line-height: 280upx;
	}
</style>
