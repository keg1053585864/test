<template>
	<view class="grace-margin">
		<navigator class="imgsItem">
		</navigator>
		<view class="big-img margin-bottom">
			<view class="" style="margin-left: 6px;width: 100%">
				<view class="cu-bar bg-white">
					<view>
						<text class="cuIcon-title" :class="'text-'+customTheme"></text>
						<text class="text-bold text-xl">{{article.article_title}}</text>
					</view>
<!-- 					<view class="action fr">
						<navigator :url="'../component/comment?id='+article.article_id+'&type=2'" class="cuIcon-message cu-btn round"
						 :class="'bg-gradual-'+customTheme" style="padding:0 20upx;height:50upx;width: 130upx;">评论</navigator>
					</view> -->
				</view>
			</view>
		</view>
		<rich-text  id="asd" :nodes="article.content" style="" class="ql-editor article"> </rich-text>
		<view class="action" style="position: fixed; bottom: 100upx; right: 50upx;"><button class="cuIcon-usefull cu-btn round "
			 :class="'bg-gradual-'+customTheme" @click="scrollTop">顶部</button></view>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				customTheme: '',
				commentContent: "",
				article: ''
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme
			this.$http({
				url: '/article/' + e.id,
			}).then(res => {
				res.content = res.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
				this.article = res
			})
		},
		onReady() {

		},
		methods: {
			previewImage(e) {},
			scrollTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
</script>
<style>

</style>
<style scoped>
	/* .grace-footer{height:36px; padding:5px 0; display:flex; flex-wrap:nowrap;} */
	.grace-footer .submit-commnets {
		display: flex;
		width: 100%;
		margin-left: 16px;
		margin-right: 6px;
		flex-wrap: nowrap;
		background: #F8F8F8;
		border-radius: 36px;
		padding: 0 15px;
	}

	.grace-footer .submit-commnets .icons {
		width: 36px;
		height: 36px;
		font-size: 18px;
		line-height: 36px;
		text-align: center;
		flex-shrink: 0;
	}

	.grace-footer .submit-commnets input {
		width: 100%;
		height: 36px;
		line-height: 36px;
		background: none;
		font-size: 14px;
		margin: 0 5px;
	}

	.grace-footer .submit-btn {
		display: inline-block;
		padding: 0 12px;
		line-height: 36px;
		color: #3688FF;
		flex-shrink: 0;
		margin-right: 5px;
	}
</style>
