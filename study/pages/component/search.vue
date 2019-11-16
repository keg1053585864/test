<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索课程等" :focus="focus" @blur="blur" v-model.trim="searchContent" />
			</view>
			<view class="action">
				<button class="cu-btn shadow-blur round" :class="'bg-gradual-'+customTheme" @click="searchNow">搜索</button>
			</view>
		</view>
		<view class="grace-margin">
			<view class="grace-card-view" style="box-shadow:0 8upx 25upx 0 rgba(0, 0, 0, 0.2)" v-for="(item,index) in searchResult"
			 :key="index" @click="itemJump(item.item_id)">
				<view style="width:100%; height:300upx; overflow: hidden;position:relative;">
					<image style="width:100%; height:300upx;  margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;object-fit:cover;"
					 :src="item.img_url" mode="widthFix"></image>
				</view>
				<view class="card-content">
					{{item.name}}
				</view>
				<view class="footer">
					<view class="grace-icons icon-home"> 天数：{{item.duration}}</view>
					<view class="grace-icons icon-share"> 地点：{{item.location}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let temp = 1
	export default {
		data() {
			return {
				customTheme: '',
				focus: false,
				searchContent: '',
				searchResult: [],
				page: 1
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme;
			this.searchContent = e.e
			this.searchNow()
		},
		onReady() {

		},
		onReachBottom() {
			if (temp) {
				temp = 0
				this.searchNow()
				setTimeout(() => {
					temp = 1
				}, 1000);
			}
		},
		methods: {
			searchNow() {
				this.$http({
					url: '/item/search/' + this.page,
					data: {
						keyword: this.searchContent
					}
				}).then(res => {
					for (let i of res) {
						this.searchResult.push(i)
					}
					this.page += 1
				})
			},
			blur() {
				this.focus = false
			},
			itemJump(id) {
				uni.navigateTo({
					url: `../home/item?id=${id}`,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style>
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
