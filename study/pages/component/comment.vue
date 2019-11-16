<template>
	<view>
		<view class="text-center" :class="'bg-gradual-'+customTheme" style="border-radius: 15upx; margin: 10upx 8upx 0upx 8upx;box-shadow: 0 20upx 40upx 0 rgba(0, 0, 0, 0.1);">
			<text class="cuIcon-title margin-right"></text>
			<text class="text-bold text-lg margin-right">评 论 区</text>
		</view>
		<view class="grace-margin">
			<!-- 评论区 start -->
			<view class="grace-comments">
				<view class="items" v-for="(item,index) in commentList" :key="index">
					<view class="face">
						<image :src="item.user.avatar_url" mode="widthFix"></image>
					</view>
					<view class="body">
						<view class="header">
							<text>{{item.user.nickname}}</text><text :class="item.status?'grace-icons icon-zan zan':'grace-icons icon-zan'"
							 @click="thumb(index,item.status)"><text class="thumb_up_count">{{item.thumb_up_count}}</text></text>
						</view>
						<view class="info">
							<text style="transform: translateY(-15upx);">{{item.create_time}}</text>
							<view class="cuIcon-more more" @tap="optionDialog(index)"></view>
						</view>
						<view class="imgs" v-if="item.comment_img_url.length">
							<view v-for="(innerItem,imgIndex) in item.comment_img_url" :key="imgIndex">
								<image :src="item.comment_img_url[imgIndex]" @click="previewImage(item.comment_img_url[imgIndex])" mode="widthFix"></image>
							</view>
						</view>
						<view class="content comment" @click="comment(index,item.comment_id)">{{item.comment_detail}}</view>
						<view class="dividing-line-half"></view>
						<view class="subComment" v-for="(innerItem,innerIndex) in item.sub_comments" :key="innerIndex" @click="subComment(index,innerIndex,innerItem.from_user_id,innerItem.from_user.nickname,item.comment_id)">
							<text class="text-blue">{{innerItem.from_user.nickname}} </text>{{innerItem.to_user_id?' 回复 ':''}}<text class="text-blue">{{innerItem.to_user?innerItem.to_user.nickname:''}}</text>：{{innerItem.sub_comment_detail}}
							<text class='delete' @click="subCommentDelete(index,innerIndex)" v-if="userId==innerItem.from_user_id">删除</text>
						</view>
						<view class="dividing-line"></view>
					</view>

				</view>

				<view class="cu-modal" :class="modalName=='Image'?'show':''" @tap="hideModal">
					<view class="cu-dialog" style="height: 90%;">
						<view class="bg-img zoomImg" :style="zoomImg">
							<view class="cu-bar justify-end text-white">
								<view class="action" @tap="hideModal">
									<text class="cuIcon-close" style="color: white"></text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<graceDialog class="inputTitle" title="操 作" :show="showOptionDialog" v-on:closeDialog="closeOptionDialog">
					<view slot="btns">
						<view class="grace-dialog-btns">
							<!--                        <view>-->
							<!--                            <button type="primary" @tap="share" style="color:#00B26A;">-->
							<!--                                <text class="grace-icons icon-share" style="margin-right:10upx; color:#00B26A;"></text>分享-->
							<!--                            </button>-->
							<!--                        </view>-->
							<view><button type="primary" @tap="closeOptionDialog">取消</button></view>
							<view><button type="primary" class="text-blue" style="color: rgb(249, 0, 0);" @tap="commentDelete">删除</button></view>
						</view>
					</view>
				</graceDialog>
			</view>
			<view class="text-center">
				<text class="">没有更多消息</text>
			</view>
			<!-- 评论区 end -->
			<view style="height:100upx;"></view>
			<!-- 底部回复start -->
			<view class="grace-footer align-center">
				<view class="submit-commnets align-center action">

					<button :style="uploadMark" class="cuIcon-add cu-btn icon-write icons padding" @click="imgUpload">

					</button>
					<input type="text" :placeholder="placeholder" v-model.trim="commentContent" :focus="focus" @blur="blur" />
				</view>
				<view class="submit-btn" @tap="submitComments">发表</view>
			</view>
			<!-- 底部回复end -->
		</view>
	</view>
</template>

<script>
	import urlConfig from '@/common/config.js'
	import graceDialog from '../../graceUI/components/graceDialog.vue';
	export default {
		name: "comment",
		components: {
			graceDialog: graceDialog
		},
		data() {
			return {
				previewImageUrl: '',
				customTheme: '',
				userId: '',
				type: '',
				item_id: '',
				article_id: '',
				reqParams: '',
				zoomImg: '',
				modalName: null,
				commentList: [],
				showOptionDialog: false,
				optionIndex: '',
				uploadMark: '',
				commentImg: [],
				commentContent: '',
				commentIndex: '',
				focus: false,
				placeholder: '说点什么吧 ...'
			}
		},
		onLoad(e) {
			this.customTheme = this.$store.state.customTheme
			console.log(e.id, e.type);
			this.userId = this.$store.state.userInfo.userId;
			this.type = e.type
			if (e.type == 1) {
				this.item_id = e.id * 1
				this.reqParams = {
					item_id: this.item_id
				}
				this.commentGetbyitemid(e, '/item/' + this.item_id + '/comments')
			} else if (e.type == 2) {
				this.article_id = e.id * 1
				this.reqParams = {
					article_id: this.article_id
				}
				this.commentGetbyitemid(e, '/article/' + this.article_id + '/comments')
			}

		},
		onReady() {
			console.log(this.$store.state.userInfo)
		},
		methods: {
			commentGetbyitemid(e, getBy) {
				this.$http({
					url: getBy,
				}).then(res => {
					this.commentList = res.reverse()
				})
			},
			zoomImgSet(index, imgIndex) {
				let i = this.commentList[index].comment_img_url[imgIndex];
				this.zoomImg = `background-image: url(${i})`;
				console.log(this.zoomImg)
			},
			showModal(e) {
				console.log(e);
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//点赞
			thumb(index, status) {
				let i = status ? 'DELETE' : 'POST';
				this.$http({
					url: '/thumb',
					method: i,
					data: {
						comment_id: this.commentList[index].comment_id
					},
					loading: 'none'
				}).then(res => {
					this.commentList[index].status = !status;
					this.commentList[index].thumb_up_count += status ? -1 : 1
				})
			},
			comment(index, comment_id) {
				//检索位置和被回复人的昵称信息（主层）
				this.commentIndex = [index, 0, '', '', comment_id];
				this.placeholder = `回复 ${this.commentList[index].user.nickname}`;
				this.focus = true
			},
			subComment(index, innerIndex, from_user_id, from_user_name, comment_id) {
				//检索位置和被回复人的昵称信息（层中层）
				this.commentIndex = [index, innerIndex, from_user_id, from_user_name, comment_id];
				setTimeout(() => {
					console.log(this.commentIndex)
				}, 10);
				this.placeholder = `回复 ${from_user_name}`;
				this.focus = true
			},
			blur() {
				this.placeholder = '说点什么吧 ...'
				this.focus = false;
				setTimeout(()=>{
					this.commentIndex = ''
				},1500)
			},
			imgUpload() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title: '图片上传中'
						});
						console.log(1, tempFilePaths[0]);
						uni.compressImage({
							src: tempFilePaths[0],
							quality: 80,
							success: compressImageRes => {
								uni.uploadFile({
									url: urlConfig + '/user/upload',
									filePath: compressImageRes.tempFilePath,
									header: {
										token: this.$store.state.token
									},
									name: 'file',
									formData: {
										user_id: this.userId
									},
									success: (uploadFileRes) => {
										let data = uploadFileRes.data
										if (data.errorCode) {
											uni.showToast({
												title: data.msg,
												icon: 'none'
											})
										} else {
											this.commentImg[0] = JSON.parse(uploadFileRes.data).url;
											this.uploadMark = 'color:red'
											uni.hideLoading()
										}
									},
									fail: (err) => {
										uni.showToast({
											title: '上传失败',
											icon: 'none'
										})
									}
								});
							}
						})
					}
				});
			},
			submitComments() {
				if (this.commentContent || this.commentImg[0]) {
					this.focus = false;
					if (this.commentIndex.length) {
						this.subCommentAdd()
					} else {
						this.commentAdd();
					}
				} else {
					uni.showToast({
						title: '评论不能为空',
						icon: 'none'
					});
				}
			},
			commentAdd() {
				this.reqParams.comment_detail = this.commentContent;
				this.reqParams.comment_img_url = this.commentImg;
				this.$http({
					url: '/comment',
					method: 'POST',
					data: this.reqParams,
					laoding: '发送中'
				}).then(res => {
					this.commentList.unshift({
						comment_id: res.comment_id,
						comment_img_url: this.commentImg,
						comment_detail: this.commentContent,
						user_id: this.userId,
						create_time: res.create_time,
						thumb_up_count: 0,
						user: {
							nickname: this.$store.state.userInfo.nickName,
							avatar_url: this.$store.state.userInfo.avatarUrl
						},
						sub_comments: [],
						status: false,
					});
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					this.commentImg = []
					this.uploadMark = ''
					this.commentContent = ''
				})
			},
			subCommentAdd() {
				this.$http({
					url: '/sub_comment',
					method: 'POST',
					data: {
						comment_id: this.commentIndex[4],
						sub_comment_detail: this.commentContent,
						to_user_id: this.commentIndex[2] ? this.commentIndex[2] : '',
					},
					loading: '发送中'
				}).then(res => {
					this.commentList[this.commentIndex[0]].sub_comments.push({
						sub_comment_id: res.sub_comment_id,
						sub_comment_detail: this.commentContent,
						from_user_id: this.userId,
						to_user_id: this.commentIndex[2] ? this.commentIndex[2] : '',
						create_time: res.create_time,
						from_user: {
							user_id: this.userId,
							nickname: this.$store.state.userInfo.nickName,
						},
						to_user: {
							user_id: this.commentIndex[2] ? this.commentIndex[2] : '',
							nickname: this.commentIndex[2] ? this.commentIndex[3] : '',
							avatar_url: null,
							institution_id: null
						}
					});
					this.commentContent = ''
				})
			},
			subCommentDelete(index, innerIndex) {
				this.$http({
					url: '/sub_comment/' + this.commentList[index].sub_comments[innerIndex].sub_comment_id,
					method: 'DELETE',
					loading: '删除中'
				}).then(res => {
					this.commentList[index].sub_comments.splice(innerIndex, 1)
				})
			},
			optionDialog(index) {
				this.optionIndex = index;
				this.showOptionDialog = true;
			},
			closeOptionDialog() {
				this.showOptionDialog = false;
			},
			commentDelete() {
				this.$http({
					url: '/comment/' + this.commentList[this.optionIndex].comment_id,
					method: 'DELETE',
					loading: '删除中'
				}).then(res => {
					this.commentList.splice(this.optionIndex, 1);
					this.closeOptionDialog();
				})
			},
			previewImage(e) {
				this.previewImageUrl = e
				console.log(e)
				uni.previewImage({
					urls: [this.previewImageUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
					}
				});
			},
		}
	}
</script>

<style scoped>
	.comment {
		font-size: .8rem;
		padding-bottom: 10upx;
	}

	.dividing-line {
		width: 100%;
		height: 2upx;
		background: #f3f4f6;
		margin: 0;
	}

	.dividing-line-half {
		width: 50%;
		height: 2upx;
		background: #f3f4f6;
		margin: 0;
	}

	.thumb_up_count {
		margin-right: 12upx
	}

	.more {
		padding-right: 12upx
	}

	.grace-footer {
		height: 90upx;
		padding: 10upx 0;
		display: flex;
		flex-wrap: nowrap;
	}

	.grace-footer .submit-commnets {
		display: flex;
		width: 100%;
		margin-left: 30upx;
		flex-wrap: nowrap;
		background: #F8F8F8;
		border-radius: 36upx;
		padding: 0 15upx 0 0
	}

	.grace-footer .submit-commnets .icons {
		width: 30upx;
		height: 30upx;
		font-size: 30upx;
		line-height: 36upx;
		text-align: center;
		flex-shrink: 0;
		font-weight: bolder;
	}

	.grace-footer .submit-commnets input {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		background: none;
		font-size: 30upx;
		margin-left: 10upx;
	}

	.grace-footer .submit-btn {
		display: inline-block;
		padding: 0 30upx;
		line-height: 60upx;
		color: #3688FF;
		flex-shrink: 0
	}

	.subComment .delete {
		float: right;
		padding-right: 8upx;
		color: #0081ff
	}

	.imgs {
		display: flow-root
	}

	.imgs view {
		float: left;
		box-shadow: 0 2upx 12upx 0 rgba(0, 0, 0, 0.1);
		border-radius: 20upx
	}

	.inputTitle .grace-dialog-btns button {
		font-size: 30upx
	}

	.zoomImg {
		height: 100%
	}
</style>
