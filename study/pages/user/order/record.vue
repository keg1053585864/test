<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" style="box-shadow:  0 0 20upx 0 rgba(0,0,0,0.1);position: relative;z-index: 100;"
		 scroll-with-animation>
			<view class="cu-item" :class="index==tabCurrentIndex?'text-'+customTheme+' cur text-bold text-lg':''" v-for="(item,index) in orderTab"
			 :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="menu-avatar padding-top">
			<swiper :style="'height: '+(clientHeight1?clientHeight1+'px':'auto')" :current="tabCurrentIndex" @change="swiperChange">
				<swiper-item>
					<scroll-view :scroll-y="true" :style="'height: '+(clientHeight1?clientHeight1+'px':'auto')" @scrolltolower="scrolltoBottom1">
						<view class="" v-for="(item1,index) in orderTab[0].list" :key="index">
							<view class="cu-list menu-avatar bg-white">
								<view class=" padding-xs margin-bottom">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-sub padding-left radius">
											<view class="cu-avatar radius lg" style="margin-top;30upx;border-radius: 10upx;" @click="itemJump(index,item1.item.item_id)">
												<image :src="item1.item.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
											</view>
										</view>
										<view class="flex-treble  margin-left" style="border-bottom: 1upx solid #f3f4f6" @click="itemJump(index,item1.item.item_id)">
											<view class="text-lg flex text-bold" style="overflow: scroll;width: 280upx;white-space:nowrap;margin-top: 8upx;font-size: 28upx;"><text
												 class="text-cut">{{item1.item.name}}</text>
											</view>
											<view>{{item1.create_time}}</view>
										</view>
										<view class="flex-twice text-lg" style="padding-left: 130upx;border-bottom: 1upx solid #f3f4f6;">
											<span v-if='item1.status!==0'>订单已完成</span>
											<span v-else>订单待支付</span>
											<span></span>
											<!-- <button v-if="item1.status===1" class="cu-btn bg-gradual-red" style="padding:0 auto;height: 50upx;width:155upx; font-size: 28upx;transform: translateY(-10upx);" -->
											 <!-- @click="refund(item1.order_id,index)">退款</button> -->
											<!-- <button v-if="item1.status===-1" class="cu-btn" style="padding:0 auto;height: 50upx;width:155upx; font-size: 28upx;transform: translateY(-10upx)">已退款</button> -->
											<!-- <button v-if="item1.status===-2" class="cu-btn" style="padding:0 auto;height: 50upx;width:155upx; font-size: 28upx;transform: translateY(-10upx)">申请退款中</button> -->
										</view>
									</view>
									<view class="flex  p-xs margin-bottom-sm mb-sm" style="border-bottom: 1upx solid #f3f4f6">
										<view class="flex-sub padding-left radius"></view>
<!-- 										<view class="flex-treble  margin-left margin-bottom">
											<view class="text-lg flex" style="overflow: scroll;width: 500upx;white-space:nowrap;margin-top: 8upx;transform: translateX(-100upx);font-size: 25upx;">单号:
												{{item1.out_trade_no}}
											</view>
										</view> -->
										<view class="text-bold" style="padding-left: 0upx;margin-right: 20upx;">￥ {{item1.price}}
										</view>
									</view>
									<view class="margin-right" style="float: right" @click="itemOrderDetail(item1,index)">查看详情</view>
								</view>
								<view class="flex  p-xs  mb-sm">
									<view class="flex-sub padding-left radius"></view>
									<view class="flex-treble  margin-left margin-bottom">
										<view class="text-lg flex" style="overflow: scroll;width: 280upx;white-space:nowrap;margin-top: 8upx"></view>
									</view>
								</view>
							</view>
							<view class="dividing-line"></view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-y="true" :style="'height: '+(clientHeight2?clientHeight2+'px':'auto')" @scrolltolower="scrolltoBottom2">
						<view class="cu-list menu-avatar grace-card-view margin" style="border-radius: 20upx;" v-for="(item1,index) in orderTab[1].list"
						 :key="index">
							<view class="title-icon padding-bottom">
								<view class="grace-icons cuIcon-comment"><text class="margin-left">活动名称：{{item1.description}}</text></view>
								<view class="grace-icons cuIcon-moneybag"><text class="margin-left">价格：{{item1.price}}</text></view>
								<view class="grace-icons cuIcon-form"><text class="margin-left"> 订单号：{{item1.out_trade_no}}</text></view>
								<view class="grace-icons cuIcon-time"><text class="margin-left"> 订单时间：{{item1.update_time}}</text></view>
							</view>
							<view v-if="item1.gifts.length" class="text-bold padding-left">已赠送的优惠券</view>
							<view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item2,index) in item1.gifts"
							 :key="index">
								<view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
									<image :src="item2.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
								</view>
								<view class="content text-left">
									<view class="text-bold text-cut">{{item2.name}}</view>
									<view class="text-gray text-sm flex">
										<view class="text-cut text-gray" style="line-height: 1.1">{{item2.sponsor?item2.sponsor:'暂无信息'}}<text class=" text-pink text-bold"
											 style="margin-left: 50upx;">优惠￥{{item2.price}}</text></view>
									</view>
								</view>
							</view>
							<view class="text-bold padding-left">已购买的课程</view>
							<view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item2,index) in item1.items"
							 :key="index">
								<view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
									<image :src="item2.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
								</view>
								<view class="content">
									<view class="">
										<view class="text-bold">{{item2.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 		<view class="cu-bar foot input">
            <view class="action" @click="checkAll">
                <text :class="footOption.checkAll"></text><text class="text-grey">全选</text>
            </view>
            <view class="action">
            </view>
            <button class="cu-btn bg-green shadow-blur">删除</button>
        </view> -->
	</view>
</template>

<script>
	let temp = 1
	export default {
		data() {
			return {
				clientHeight1: '',
				clientHeight2: '',
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				avatarUrl: this.$store.state.userInfo.avatarUrl,
				customTheme: '',
				type: 0,
				orderTab: [{
						name: '普通订单',
						list: []
					},
					{
						name: '活动订单',
						list: []
					}
				],
				footOption: {
					checkAll: 'cuIcon-round',
					delete: false
				},
				//分页
				normalPage: 1,
				activityPage: 1
				//分页 end
			}
		},
		onLoad() {
			this.customTheme = this.$store.state.customTheme
			uni.getSystemInfo({
				success: res1 => {
					this.clientHeight1 = 800
				}
			})
			this.getOrderList()
			this.getPCCList() //亲子卡parent-child-card
		},
		methods: {
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
			//页面切换 end
			//页面滑动到底部
			scrolltoBottom1() {
				if (temp) {
					temp = 0
					this.getOrderList()
					setTimeout(() => {
						temp = 1
					}, 1000);
				}
			},
			scrolltoBottom2() {
				if (temp) {
					temp = 0
					this.getPCCList()
					setTimeout(() => {
						temp = 1
					}, 1000);
				}
			},
			//页面滑动到底部 end
			getOrderList() {
				this.$http({
					url: '/order/list/' + this.normalPage,
				}).then(res => {
					for (let i of res) {
						this.orderTab[0].list.push(i)
					}
					this.normalPage += 1
					uni.getSystemInfo({
						success: res1 => {
							this.clientHeight1 = res1.windowHeight
						}
					})
				})
			},
			getPCCList() {
				this.$http({
					url: '/activity_order/list/' + this.activityPage,
					v3: true,
					loading: 'none'
				}).then(res => {
					for (let i of res) {
						this.orderTab[1].list.push(i)
					}
					this.activityPage += 1
					uni.getSystemInfo({
						success: res1 => {
							this.clientHeight2 = res1.windowHeight
						}
					})
				})
			},
			// setting() {
			// 	if (this.footOption.delete) {
			// 		this.footOption.delete = false
			// 	} else {
			// 		this.footOption.delete = true
			// 	}
			// },
			itemJump(index, id) {
				var index = index
				var id = id
				if (this.type == 2) {
					uni.navigateTo({
						url: `/pages/home/item?id=${id}&order_id=${this.list[index].order_id}`,
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else {
					uni.navigateTo({
						url: `/pages/home/item?id=${id}`,
						animationType: 'pop-in',
						animationDuration: 200
					});
				}
			},
			refund(e, index) {
				this.$http({
					url: '/order/' + e + '/refund',
					method: 'PUT',
					loading: 'none'
				}).then(res => {
					this.list[index].status = -2
					uni.showToast({
						title: '已申请退款',
						duration: 2000,
					});
				})
			},
			itemOrderDetail(e, index) {
				uni.navigateTo({
					url: `/pages/user/order/item-order-detail?no=${e.out_trade_no}`
				});
			}
		}
	}
</script>
<style>
	.dividing-line {
		width: 100%;
		height: 5px;
		background: #f3f4f6;
		margin: 0;
	}
</style>
