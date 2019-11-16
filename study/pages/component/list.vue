<template>
	<view>
		<view v-if="type==1" class="cu-bar" :class="'bg-gradual-'+customTheme">
			<text class="text-bold text-xl margin-left">收 藏</text>
			<view class="action" @click="setting">
				<text class="cuIcon-settingsfill text-white"></text><text class="text-white margin-left-sm" v-if="footOption.delete">
					取 消</text>
			</view>
		</view>
		<view v-if="type==1" class="cu-list menu-avatar">

			<view class="cu-item" v-for="(item,index) in list" :key="index">
				<view class="cu-avatar radius lg" @click="itemJump(index,item.item_id)" style="border-radius: 10upx;">
					<image :src="item.item_head_img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
				</view>
				<view class="content" @click="itemJump(index,item.item_id)">
					<view class="">
						<view class="text-cut text-bold">{{item.item_name}}</view>
					</view>
					<!-- 				<view class="text-gray text-sm flex">
					<view class="text-cut">凯尔，你被自己的光芒变的盲目！</view>
				</view> -->
				</view>
				<view v-if="footOption.delete">
					<view class="action" @click="handleDelete(index,item.item_id,1)">
						<text class="cu-btn bg-red shadow-blur grace-border radius" style="padding: 0 10upx;width: 100upx;">删 除</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="type==3" class="cu-bar margin-bottom" :class="'bg-gradual-'+customTheme">
			<text class="text-bold text-xl margin-left">分享红包奖励</text>
			<!-- <view class="action" @click="setting"> -->
			<!-- <text class="cuIcon-settingsfill text-white"></text><text class="text-white margin-left-sm" v-if="footOption.delete"> 取 消</text> -->
			<!-- </view> -->
		</view>
		<view v-if="type==3" class=" menu-avatar">
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="cu-list menu-avatar bg-white">
					<view class=" padding-xs">
						<view class="flex  p-xs margin-bottom-sm mb-sm">
							<view class="flex-sub padding-left radius">
								<view class="cu-avatar radius lg" style="margin-top;30upx;border-radius: 10upx;" @click="itemJump(item.item_id)">
									<image :src="item.item.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
								</view>
							</view>
							<view class="flex-treble  margin-left" style="border-bottom: 2upx solid #f3f4f6" @click="itemJump(item.item_id)">
								<view class="text-lg flex text-bold" style="overflow: scroll;width: 280upx;white-space:nowrap;margin-top: 8upx;font-size: 28upx;">{{item.item.name.length>8?(item.item.name.substr(0,9)+'...'):item.item.name}}
								</view>
								<view>{{item.update_time}}</view>
							</view>
							<view class="flex-twice text-lg" style="padding-left: 130upx;border-bottom: 2upx solid #f3f4f6">订单完成
								<!-- <button v-if="item.status===1" class="cu-btn bg-gradual-red" style="padding:0 auto;height: 50upx;width:155upx;font-size: 28upx;transform: translateY(-10upx)"
								 @click="refund(item.order_id,index)">领取</button>
								<button v-if="item.status===-1" class="cu-btn" style="padding:0 auto;height: 50upx;width:155upx;font-size: 28upx;transform: translateY(-10upx)">已领取</button> -->
							</view>
						</view>
						<view class="flex  p-xs margin-bottom-sm mb-sm" style="border-bottom: 2upx solid #f3f4f6">
							<view class="flex-sub padding-left radius"></view>
							<view class="flex-treble  margin-left margin-bottom">
								<view class="text-lg flex" style="overflow: scroll;width:400upx;white-space:nowrap;margin-top: 8upx;transform: translateX(-130upx);font-size: 25upx;">
									<!-- <view class="icons ucenter-face" style="width: 50upx !important; height: 50upx !important; "> -->
										<!-- <image style="border-radius:10upx;width: 45upx !important; height: 45upx !important;object-fit: cover;" :src="item.user.avatar_url"></image> -->
									<!-- </view> -->
									{{item.username}} 已购买您分享的课程
								</view>
							</view>
							<view class="text-bold" style="padding-left: 0upx;margin-right: 20upx;">奖励 ￥ {{item.profit}}
							</view>
						</view>
					</view>
					<view class="flex  p-xs  mb-sm">
						<view class="flex-sub padding-left radius"></view>
						<view class="flex-treble  margin-left margin-bottom">
							<view class="text-lg flex" style="overflow: scroll;width: 280upx;white-space:nowrap;margin-top: 8upx"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="type==4" class="cu-bar" :class="'bg-gradual-'+customTheme">
			<text class="text-bold text-xl margin-left">消 息</text>

			<view class="action">
				<button class="text-white margin-left-sm margin-right cu-btn bg-white" style="color:#000000;" @click="allRead">全部已读</button>
				<text @click="setting" style="display: inline-block;" class="cuIcon-settingsfill text-white"></text><text @click="setting"
				 class="text-white margin-left-sm" v-if="footOption.delete">
					取 消</text>
			</view>
		</view>
		<view v-if="type==4" class=" menu-avatar">
			<view @click="rowClick(index,item)" class="" v-for="(item,index) in list" :key="index">
				<view class="cu-list menu-avatar bg-white">
					<view class=" padding-xs">
						<view class="flex  p-xs margin-bottom-sm mb-sm">
							<view class="flex-treble  margin-left" style="border-bottom: 2upx solid #f3f4f6">
								<view class="text-lg flex text-bold" :class="item.status===0?'text-pink':'text-black'" style="overflow: scroll;width: 100%;white-space:nowrap;margin-top: 8upx;font-size: 28upx;">{{item.content}}
								</view>
								<view>{{item.create_time}}</view>
							</view>
						</view>
						<view class="" style="border-bottom: 2upx solid #f3f4f6">
							<view class="text-lg margin-bottom" style="overflow: scroll;width:100%;white-space:nowrap;margin-top: 8upx;font-size: 25upx;position: relative;left: 30upx;">
								<button class="cu-btn">{{item.title}}</button>
								<button v-if="footOption.delete" @click="handleDelete(index,item.message_id,4)" class="cu-btn bg-gradual-red"
								 style="float: right;margin-right: 50upx;">删 除</button>
							</view>
							<!-- 							<view class="text-bold" style="padding-left: 0upx;margin-right: 20upx;float: right;display: inline-block;">

							</view> -->
						</view>
					</view>
					<view class="flex  p-xs  mb-sm">
						<view class="flex-sub padding-left radius"></view>
						<view class="flex-treble  margin-left margin-bottom">
							<view class="text-lg flex" style="overflow: scroll;width: 280upx;white-space:nowrap;margin-top: 8upx"></view>
						</view>
					</view>
				</view>
			</view>
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
	export default {
		data() {
			return {
				clientHeight: '',
				avatarUrl: this.$store.state.userInfo.avatarUrl,
				customTheme: '',
				type: 0,
				orderTab: [{
						name: '普通',
					},
					{
						name: '活动',
					},
				],
				list: [],
				footOption: {
					checkAll: 'cuIcon-round',
					delete: false
				},
				page1:1,
				page3:1,
				page4:1
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme
			this.type = e.type
			console.log(this.type)
			this.collectionGetlist(e)
		},
		methods: {
			collectionGetlist(e) {
				if (this.type == 1) {
					this.$http({
						url: '/collection/items',
					}).then(res => {
						this.list = res
					})
				} else if (this.type == 3) {
					this.$http({
						url: '/order/distributions/'+this.page3,
					}).then(res => {
						for(let i of res){
							this.list.push(i)
						}
						this.page3 += 1
					})
				} else if (this.type == 4) {
					this.$http({
						url: '/message/list',
					}).then(res => {
						for (let i of res) {
							i.content = i.content.split('，')[0]
						}
						this.list = res
					})
				}
			},
			setting() {
				if (this.footOption.delete) {
					this.footOption.delete = false
				} else {
					this.footOption.delete = true
				}
			},
			allRead() {
				let i = this.list.map(a => a.message_id);
				this.$http({
					url: '/message/multiple',
					method: 'PUT',
					data: {
						messages: i
					},
					loading: 'none'
				}).then(res => {
					for (let j of this.list) {
						j.status = 1
					};
				})
			},
			rowClick(index, row) {
				if (!(row.status)) {
					this.$http({
						url: '/message/' + row.message_id,
						method: 'PUT',
						loading: 'none'
					}).then(res => {
						this.list[index].status = 1;
					})
				}
			},
			handleDelete(index, e, type) {
				switch (type) {
					case 1:
						this.$http({
							url: '/collection/item/' + e,
							method: 'DELETE',
							loading: '删除中'
						}).then(res => {
							this.list.splice(index, 1)
						})
						break;
					case 4:
						this.$http({
							url: '/message',
							method: 'DELETE',
							data: {
								messages: e
							},
							loading: '删除中',
						}).then(res => {
							this.list.splice(index, 1)
						})
					default:
						break;
				}

			},
			checkAll() {
				if (this.footOption.checkAll === 'cuIcon-round') {
					this.footOption.checkAll = 'cuIcon-roundcheckfill'
				} else {
					this.footOption.checkAll = 'cuIcon-round'
				}
			},
			itemJump(index, id) {
				console.log(index,id)
				uni.navigateTo({
					url: `../home/item?id=${id}`,
					animationType: 'pop-in',
					animationDuration: 200
				});
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
			}
		}
	}
</script>
