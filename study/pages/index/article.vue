<template>

	<!--    <div class="imageWrapper"  :style="userInfo_qrcode" ref="imageWrapper" @touchstart="gtouchstart()" @touchmove="gtouchmove()"-->
	<!--         @touchend="gtouchend()">-->
	<!--        <view v-show="screenshot">-->

	<!--            <img class="real_pic" v-if="dataURL" :src="dataURL" alt=""/>-->
	<!--            <div id="qrcode"  class="code" ref="imageWrapper1"></div>-->
	<!--            <img  class="userImg"  :src="$store.state.userInfo.headimgurl" alt="">-->
	<!--        </view>-->
	<!--        <slot>-->
	<view>
		<!--        <cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>-->
		<!--            <block slot="content">轮播图</block>-->
		<!--        </cu-custom>-->
		<!--                <view class="cu-bar search bg-white">-->
		<!--                    <view class="search-form round">-->
		<!--                        <text class="cuIcon-search"></text>-->
		<!--                        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text"-->
		<!--                               placeholder="搜索课程、文章等" confirm-type="search">-->
		<!--                    </view>-->
		<!--                    <view class="action">-->
		<!--                        <button class="cu-btn bg-green shadow-blur round" @click="test">搜索</button>-->
		<!--                    </view>-->
		<!--                </view>-->
 <!-- <video id="myVideo" src="http://img.cdn.qiniu.dcloud.net.cn/wap2appvsnative.mp4" @error="videoErrorCallback" :danmu-list="danmuList" -->
                    <!-- enable-danmu danmu-btn controls></video> -->
		<view class=" swiper-item-date">
			<view class="cu-bar bg-white">
				<view class="action margin-top">
					<text class="cuIcon-title" :class="'text-'+customTheme"></text>
					<text class="text-bold text-xl">{{swiperItemDate}}</text>
				</view>
			</view>
		</view>
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="4000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item @click="articleJump(index)" v-for="(item,index) in article" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item" style="box-shadow:0 10upx 40upx 0 rgba(0, 0, 0, 0.5)">
					<image :src="item.article_img_url" mode="aspectFill" type="image"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="padding-xs flex align-center swiper-item-title">
			<view class="flex-sub text-center">
				<text>{{swiperItemTitle}}</text>
			</view>
		</view>
		<view class="padding-xs flex align-center swiper-item-content">
			<view class="flex-sub text-center">
				<text class="text-gray">{{swiperItemContent}}</text>
			</view>
		</view>
	</view>
	<!--        </slot>-->
	<!--    </div>-->

</template>

<script>
	// import html2canvas from 'html2canvas'
	// import QRCode from 'qrcodejs2'
	// let timeOutEvent = 0
	export default {
		watch: {
			"$store.state.customTheme": function(newValue) {
				this.customTheme = newValue
			}
		},
		data() {
			return {
				//文章
				customTheme: '',
				article: [],
				screenshot: false,
				userInfo_qrcode: null,
				userImg: '',
				userInfo: '',
				dataURL: '',
				swiperItemDate: '',
				InputBottom: 0,
				cardCur: 0,
				swiperList: [],
				swiperItemTitle: '',
				swiperItemContent: '',
				dotStyle: false,
			};
		},
		onLoad() {
			this.customTheme = this.$store.state.customTheme
		},
		onReady() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.$http({
					url: '/navigation/articles',
				}).then(res => {
					this.article = res;
					this.swiperItemTitle = this.article[this.cardCur].article_title;
					this.swiperItemContent = this.article[this.cardCur].article_introduction;
					let date = this.article[this.cardCur].update_time.split('-');
					this.swiperItemDate = date[0] + '月' + date[1] + '日';
				})
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current;
				this.swiperItemTitle = this.article[this.cardCur].article_title;
				this.swiperItemContent = this.article[this.cardCur].article_introduction;
				let date = this.article[this.cardCur].update_time.split('-');
				this.swiperItemDate = date[0] + '月' + date[1] + '日';
			},
			articleJump(index) {
				uni.navigateTo({
					url: `../article/content?id=${this.article[index].article_id}`,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style scoped>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}

	.swiper-item-date {
		width: 100%
	}

	.swiper-item-title {
		width: 50%;
		margin: 13px auto 0 auto
	}

	.swiper-item-content {
		width: 50%;
		margin: auto
	}
	/* 机构列表 */
	.institution {
		display: flex;
	}
	
	.institution-img-card img {
		width: 150upx;
		height: 150upx;
	}
	
	.institution-info {
		width: 100%;
	}
	
	.institution-info .institution-detail .description {
		width: 250upx;
		float: left
	}
	
	.institution-info .institution-detail .distance {
		text-align: right;
	}
</style>
