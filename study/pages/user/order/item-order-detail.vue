<template>
	<view>
	<view class="cu-bar" :class="'bg-gradual-'+customTheme">
		<text class="text-bold text-xl margin-left">订单详情</text>
		<!-- <view class="action" @click="setting"> -->
		<!-- <text class="cuIcon-settingsfill text-white"></text><text class="text-white margin-left-sm" v-if="footOption.delete"> 取 消</text> -->
		<!-- </view> -->
	</view>
	<view class="cu-list menu-avatar grace-card-view margin" style="border-radius: 20upx;">
		<view class="title-icon padding-bottom">
			<view class="grace-icons cuIcon-comment"><text class="margin-left">联系人：{{form.username}}</text></view>
			<view class="grace-icons cuIcon-moneybag"><text class="margin-left">联系方式：{{form.phone}}</text></view>
			<view class="grace-icons cuIcon-form"><text class="margin-left">价格：{{form.price}}</text></view>
			<view class="grace-icons cuIcon-time"><text class="margin-left">订单号：{{form.out_trade_no}}</text></view>
			<view class="grace-icons cuIcon-time"><text class="margin-left">下单时间：{{form.create_time}}</text></view>
		</view>
		<view class="text-bold padding-left">机构信息</view>
		<view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;">
			<view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
				<image :src="form.institution.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
			</view>
			<view class="content text-left">
				<view class="text-bold text-cut">{{form.institution.name}}</view>
				<!-- <view class="text-gray text-sm flex">
					<view class="text-cut text-gray" style="line-height: 1.1">{{item2.sponsor?item2.sponsor:'暂无信息'}}<text class=" text-pink text-bold"
						 style="margin-left: 50upx;">优惠￥{{item2.price}}</text></view>
				</view> -->
			</view>
		</view>
		<view class="text-bold padding-left margin-top">购买信息</view>
		<view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;">
			<view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
				<image :src="form.item.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
			</view>
			<view class="content">
				<view class="">
					<view class="text-bold">{{form.item.name}}</view>
				</view>
			</view>
		</view>
		<view v-if="form.parent_user" class="text-bold padding-left margin-top">邀请伙伴</view>
		<view v-if="form.parent_user" class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;">
			<view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
				<image :src="form.parent_user.avatar_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
			</view>
			<view class="content">
				<view class="">
					<view class="text-bold">{{form.parent_user.nickname}}</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customTheme:'',
				form: {

				}
			}
		},
		onLoad(e) {
			console.log(e,2333)
			this.customTheme = this.$store.state.customTheme
			this.getItemDetail(e.no)
		},
		methods: {
			getItemDetail(no) {
				this.$http({
					url: "/order/" + no,
					v3: true
				}).then(res=>{
					this.form = res
				})
			},
			itemJump(index, id) {
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
			}
		}
	}
</script>

<style>
</style>
