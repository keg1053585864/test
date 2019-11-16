<template>
  <view>
    <!--局部选项卡-->
    <view class="grace-tab" style="height: 100%;">
     <!-- <scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
        <view v-for="(tab, index) in tabs" :class="[tabCurrentIndex === index ? 'grace-tab-current text-lg text-bold border-color-'+customTheme+' text-'+customTheme : '']"
              :id="'tabTag-'+index" @tap="tabChange" :key="index">{{tab.name}}
        </view>
      </scroll-view> -->
      <swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" style="-webkit-overflow-scrolling:touch; ">
        <!--tab1-->
        <swiper-item class="tab-img" style="-webkit-overflow-scrolling:touch; ">
          <!-- <view style="width:100%; height:300upx;overflow: hidden;" @click="previewImage(form.img_url)">
                        <image style="width:100%; height:300upx; object-fit:cover;transform: translateY(-25%)" :src="form.img_url"
                         mode="widthFix"></image> -->
          <view style="width:100%; height:auto;overflow: hidden;" @click="previewImage(form.img_url)">
            <image style="" :src="form.img_url" mode="widthFix"></image>
          </view>

          <!-- </view> -->
          <view class="bg-white margin-left margin-right text-center text-lg" style="font-weight: bold;">
            {{form.name}}
          </view>
          <view class="bg-white margin-left margin-right text-center">
            {{form.introduction}}
          </view>
          <view class="grace-card-view title-icon">

            <view class="footer info">
              <view class="grace-icons icon-home"> 天数：{{form.duration}}</view>
              <view class="grace-icons icon-safe"> 地点：{{form.location}}</view>
            </view>
            <view class="footer info">
              <view>{{(new Date(form.start_date + 8 * 3600*1000)).toJSON().substr(0, 10).replace('T', ' ').replace(/-/g, '-')}}　至　{{(new Date(form.end_date + 8 * 3600 * 1000)).toJSON().substr(0, 10).replace('T', ' ').replace(/-/g, '-')}}</view>
            </view>
            <view class="text-center">
              参考价：
              <text class="price" :class="'text-'+customTheme" style="font-weight: bold;"> {{form.price}} </text>
               元/人
            </view>
          </view>
          <view class="dividing-line" v-if="teachers[0]"></view>
          <!--老师信息-->
          <swiper v-if="teachers[0]" style="height: 140upx;padding: 0" autoplay="true" interval="3000">
            <swiper-item v-for="(item,index) in teachers" style="">
              <view class="grace-margin teacher-card grace-list" style="padding: 0;">
                <view @click="teacherJump(index)" class="items" style="margin: 0">
                  <view class="icons ucenter-face">
                    <image :src="item.img_url" style="height: 100%;"></image>
                  </view>
                  <view class="body">
                    <view class="title">{{item.name}}</view>
                    <view class="desc"><text class="tab round" :class="'bg-gradual-'+customTheme">相关职称</text>{{(item.teacher_title.toString().length)<13?item.teacher_title.toString():(item.teacher_title.toString().substr(0,12)+'...')}}
                    </view>
                  </view>
                  <view class="arrow-right"></view>
                </view>
              </view>
            </swiper-item>
          </swiper>
          <!-- <view class="dividing-line"></view> -->
          <!-- 					<view class="teacher-card grace-list" style="padding: 0">
                        <navigator :url="'../component/comment?id='+form.item_id+'&type=1'" hover-class="navigator-hover" class="items">
                            <view class="title">
                                    <text>
                                    <text class="">评分：</text>
                                    <text class="cuIcon-favor" style="color: #f4c000"></text>
                                    <text class="cuIcon-favor" style="color: #f4c000"></text>
                                    <text class="cuIcon-favor" style="color: #f4c000"></text>
                                    <text class="cuIcon-favor" style="color: #f4c000"></text>
                                    <text class="cuIcon-favor" style="color: #f4c000"></text>
                                </text> -->
          <!-- <text>查看评论</text> -->
          <!-- </view> -->
          <!-- <view class="arrow-right"></view> -->
          <!-- </navigator> -->
          <!-- </view> -->
          <view class="dividing-line"></view>
          <view class="ql-editor" v-html="form.detail" style="-webkit-overflow-scrolling:touch;height: auto ">
          </view>
        </swiper-item>
        <!-- 机构信息 -->
        <!--        <swiper-item class="tab-img" style="-webkit-overflow-scrolling:touch; ">
          <view :class="'bg-gradual-'+customTheme" style=";margin: 0;padding: 10upx">
            <view class="grace-list" style="width: 90%;margin: auto">
              <view class="items">
                <view class="icons ucenter-face" style="width: 150upx !important; height: 150upx !important">
                  <image style="border-radius:20upx;width: 130upx !important; height: 130upx !important;" :src="institutionInfo.img_url"
                         mode="widthFix"></image>
                </view>
                <view class="body">
                  <view class="title" style="color: white">{{institutionInfo.name}}</view>
                  <view class="desc" style="color: white">{{institutionInfo.description}}</view>
                </view>
              </view>
            </view>
          </view>
          <view class="title-icon margin grace-card-view" style="transform: translateY(-40upx);box-shadow:0 10upx 40upx 0 rgba(0, 0, 0, 0.3);">
            <view class="ql-editor" v-html="institutionInfo.detail" style="-webkit-overflow-scrolling:touch; ">
            </view>
          </view>
        </swiper-item> -->
      </swiper>
    </view>
    <view class="cu-modal" :class="modalName=='Image'?'show':''" @tap="hideModal">
      <view class="cu-dialog" style="background: none;width: auto;" @tap.stop="">
        <view style="min-height:300upx;">
          <wm-poster @hideLoading="hideLoading" style="min-height: 600upx;" v-if="ifPosterInfo" LineType=[1,true] :Referrer="userInfo+' 推荐给你'"
                     ref="child" QrSrc="" imgSrc="" @success="getPosterInfo" :Title="form.name+' '+form.introduction" :PriceTxt="'参考价:￥'+form.price"></wm-poster>
        </view>
        <view class="cu-bar" style="background:none">
          <button class="cu-btn  shadow-blur bg-gradual-green" style="min-width: 80%" @tap="save"><text class="cuIcon-down"
                                                                                                        style="margin-right: 10upx"></text>保存至相册分享给好友</button>
          <view v-if="ifPosterInfo" style="margin: 0 0 0 0; width: 20%;padding: 0 0 0 10upx">
            <button class="cu-btn  shadow-blur bg-gradual-red" style="min-width: 100%;" @tap="hideModal">关闭</button>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-modal" :class="authorityDialog=='DialogModal2'?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">温馨提示</view>
          <view @click="cancelSignIn">
            <view class="action">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
        </view>
        <view class="padding-xl">
          您还未登陆，请先登陆后在进行操作
        </view>
        <view class="cu-bar bg-white">
          <button class="cu-btn bg-red shadow-blur" style="margin-left: 110upx" @click="cancelSignIn">暂不登陆</button>
          <button class="cu-btn bg-green shadow-blur" style="margin-right: 110upx" @getuserinfo="authorize" open-type="getUserInfo"
                  bindgetuserinfo="getUserInfo">立即登陆</button>
        </view>
      </view>
    </view>
    <!-- 订单信息补充表弹框 -->
    <view class="cu-modal" :class="payFormDialog=='payFormDialog'?'show':''" @click="HidePayFormInput">
      <view class="cu-dialog" style="text-align: left;" @click.stop="">
        <form @submit="pay" report-submit="true">
          <view class="cu-form-group">
            <view class="title">请填写联系信息</view>
          </view>
          <view class="cu-form-group">
            <view class="title">联系人</view>
            <input v-model.trim="payForm.username"></input>
          </view>
          <view class="cu-form-group">
            <view class="title">联系电话</view>
            <input type="number" v-model.trim="payForm.phone"></input>
            <view class="cu-capsule radius">
              <view class='cu-tag bg-blue '>
                +86
              </view>
              <view class="cu-tag line-blue">
                中国大陆
              </view>
            </view>
          </view>
          <view class="icon-btn margin">
            <view :class="'text-'+customTheme" @click="saveAsDefault" style="display:inline-block">
              <text class="icon grace-icons text-xl" :class="isSaveAsDefault?'cuIcon-squarecheckfill':'cuIcon-square'">设为默认并保存</text></view>
            <button class="cu-btn" style="float: right;color:#FFFFFF" :class="'bg-gradual-'+customTheme" form-type="submit"
                    type="default">确定并支付</button>
          </view>
        </form>
      </view>
    </view>
    <!-- 分享按钮 -->
    <button @click="share" data-target="Image" class="cu-btn action bg-gradual-red ;" style="position: fixed; bottom: 200upx;right: 0;width: 200upx;z-index: 100;border-radius:100upx 0 0 100upx;">
      <view class="round" style="border: solid 5upx #FFFFFF;transform: translate(-68upx,0)">
        <view class="cuIcon-moneybag text-white" style="width: 47upx;height: 47upx;font-size: 40upx;transform: translateY(1px);margin-left: 3upx;"></view>
		<view @click="share" data-target="Image" class="text-white" style="margin: auto;transform: translate(70upx,0);min-width: 100upx;position: fixed; bottom: 5px;right: -50px;width: 200upx;z-index: 101;">分享有奖</view>
      </view>
    </button>
    
    <!--底部选项-->
    <view class="grace-margin footer-option">
      <view class="grace-footer">
        <view class="icon-btn" @click="home">
          <view disabled class="icon grace-icons icon-home" style="color: #304156"></view>
          <view disabled class="text" style="color: #304156">首页</view>
        </view>
        <view class="icon-btn" @click="toInstitution">
          <view class="icon grace-icons icon-back" style="color: #304156"> </view>
          <view class="text" style="color: #304156">机构</view>
        </view>
<!--        <view class="icon-btn" @click="favorite">
          <view class="icon grace-icons icon-shoucang" :style="favoriteActive"></view>
          <view class="text" :style="favoriteActive">收藏</view>
        </view> -->
		<button class="icon-btn bg-white" open-type="contact">
			<view class="icon grace-icons icon-microphone" style="color: #304156;"></view>
			<view style="color: #304156;width: 100%;" class="text bg-white">客服</view>
		</button>
        <button class="submit " type="warn" @click="payFormInput" :class="'bg-gradual-'+customTheme">立即购入</button>
      </view>
    </view>
  </view>
</template>
<script>
  import wmPoster from "../component/wm-poster.vue"
  import graceDialog from '../../graceUI/components/graceDialog.vue';
  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === val) return i;
    }
    return -1;
  };
  export default {
    components: {
      graceDialog: graceDialog,
      wmPoster: wmPoster
    },
    watch: {
      "$store.state.customTheme": function(newValue) {
        this.customTheme = newValue
      }
    },
    data() {
      return {
        previewImageUrl: '',
        customTheme: '',
        ifPosterInfo: true,
        tempFilePath: '',
        userInfo: '',
        tempTarget: '',
        posterImg: '',
        form: '',
        // 对话框
        modalName: null,
        authorityDialog: null,

        payFormDialog: null,
        payForm: {
          username: '',
          phone: '',
          item_id: ''
        },
        isSaveAsDefault: false,
        //老师数据
        teachers: [],
        //tab info
        titleShowId: 'tabTag-0',
        show4: false,
        tabCurrentIndex: 0,
        swiperCurrentIndex: 0,
        activeHeight: 'height: auto',
        contentHeight: [],
        /* 机构信息 */
        institutionInfo: '',
        tabs: [{
          name: '项目介绍',
          id: 1
        }
          // {
          //   name: '机构信息',
          //   id: 3
          // },
        ],
        //底部功能栏
        favoriteActive: '',
        onLoadParams: '',
        extra: '',
        buildinParams: ''
      }
    },
    onLoad(e) {
      this.buildinParams = e
      console.log('buildin params are', e)
      this.customTheme = this.$store.state.customTheme
      this.onLoadParams = e
    },
    onShow() {

    },
    onReady() {
      let e = this.onLoadParams
      if (e.scene) {
        setTimeout(() => {
          e.scene = decodeURIComponent(e.scene)
          this.$store.commit('extra', e.scene);
          setTimeout(() => {
            this.isScene(e);
          })
        }, 1000)
      } else {
        this.isScene(e)
      }
    },
    onShareAppMessage(res) {
      if (res.from === 'button') { // 来自页面内分享按钮
      }
      return {
        title: this.form.name,
        path: 'pages/home/item?id=' + this.form.item_id,
        imageUrl: this.tempFilePath,
      }
    },
    methods: {
      isScene(e) {
        this.itemGetbyid(e)
        if (this.$store.state.userInfo.nickName) {
          this.userInfo = this.$store.state.userInfo.nickName
        }
      },
      //对话框方法
      hideModal(e) {
        this.ifPosterInfo = false;
        this.modalName = null;
        this.tempFilePath = ''
      },
      cancelSignIn() {
        this.authorityDialog = null
      },
      authorize() {
        let e = this.onLoadParams
        uni.login({
          provider: 'weixin',
          success: code => {
            uni.getUserInfo({
              provider: 'weixin',
              success: info => {
                this.$http({
                  url: '/user/login',
                  method: 'POST',
                  data: {
                    code: code.code,
                    nickname: info.userInfo.nickName,
                    avatar_url: info.userInfo.avatarUrl,
                  },
                  loading: 'none'
                }).then(res => {
                  this.$store.commit('userInfo', info.userInfo)
                  this.$store.commit('token', res.token)
                  uni.reLaunch({
                    url: './item?id=' + (e.id ? e.id : e.scene.split('&')[0])
                  });
                })
              }
            })
          }
        })
      },
      //获取项目信息方法
      itemGetbyid(e) {
        this.$http({
          url: '/item/' + (e.id ? e.id : e.scene.split('&')[0]),
        }).then(res => {
          res.detail = res.detail.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
          this.form = res;
          if (this.form.isCollected) {
            this.favoriteActive = 'color: palevioletred'
          }
          this.$store.commit('posterSrc', this.form.img_url)
          this.$store.commit('qrSrc', this.form.img_url)
          let temp = ''
          for (let i = 0; i < this.form.teachers.length; i++) {
            temp += '&teacherIds[' + i + ']=' + this.form.teachers[i]
          };
          this.$http({
            url: '/teachers?' + temp.substr(1)
          }).then(res => {
            this.teachers = res
          })
        })
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
        if (!this.institutionInfo) {
          this.getInstitutionInfo()
        }
      },
      teacherJump(index) {
        this.$store.commit('temp', this.teachers[index])
        uni.navigateTo({
          url: './teacher',
        })
      },
      HidePayFormInput() {
        this.payFormDialog = null
      },
      payFormInput() {
        if (!this.$store.state.userInfo.nickName) {
          this.authorityDialog = 'DialogModal2'
          return
        }
        this.isSaveAsDefault = uni.getStorageSync('payForm')
        if (this.isSaveAsDefault) {
          this.$http({
            url: '/user/identity',
            loading: 'none'
          }).then(res => {
            this.payForm.username = res.username;
            this.payForm.phone = res.phone
            this.payFormDialog = 'payFormDialog'
          })
        } else {
          this.$http({
            url: '/user/identity',
            loading: 'none'
          }).then(res => {
            if (res.phone && res.username) {
              this.payForm.username = res.username;
              this.payForm.phone = res.phone
              this.payFormDialog = 'payFormDialog'
            } else {
              this.payFormDialog = 'payFormDialog'
            }
          })
        }
      },
      saveAsDefault() {
        this.isSaveAsDefault = !this.isSaveAsDefault
        if (this.isSaveAsDefault) {
          uni.setStorageSync('payForm', true)
          this.$http({
            url: '/user/complete',
            method: 'PUT',
            data: {
              username: this.payForm.username,
              phone: this.payForm.phone * 1
            },
            loading: 'none'
          }).catch(err => {
            this.isSaveAsDefault = !this.isSaveAsDefault
          })
        } else {
          uni.setStorageSync('payForm', false)
        }
      },
      pay(e) {
        if (!this.payForm.phone || (!this.payForm.username)) {
          uni.showModal({
            title: '提示',
            content: '请完善信息，以方便我们与您联系',
            showCancel: false,
            confirmText: '知道了'
          });
          return
        }
        let _this = this

        function payment(res) {
          uni.requestPayment({
            provider: 'wxpay',
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: 'MD5',
            paySign: res.paySign,
            success: msg => {
              _this.payFormDialog = null
              _this.$http({
                url: '/order/' + res.out_trade_no + '/message',
                v3: true,
                loading: 'none'
              }).then(res => {
                uni.navigateTo({
                  url: './pay-success'
                })
              }).catch(err => {
                uni.navigateTo({
                  url: './pay-success'
                })
              })
            }
          });
        }
        this.payForm.item_id = this.form.item_id
        if (this.$store.state.extra) {
          this.payForm.extra = this.$store.state.extra.split('&')[1]
        }
        if (this.buildinParams.order_id) {
          this.$http({
            url: '/order/' + this.buildinParams.order_id,
            method: 'PUT'
          }).then(res => {
            payment(res)
          })
        } else {
          this.$http({
            url: '/order',
            method: 'POST',
            data: this.payForm,
            loading: 'none',
          }).then(res => {
            payment(res)
          })
        }
      },
      share(e) {
        this.ifPosterInfo = true;
        this.$http({
          url: '/item/'+this.form.item_id+'/share',
          loading: 'none'
        }).then(res => {
          this.extra = res.extra
          this.$store.commit('qrSrc', res.url);
          this.tempTarget = e.currentTarget.dataset.target;
          this.modalName = this.tempTarget
          this.$refs.child.OnCanvas();
          setTimeout(() => {
            uni.showLoading({
              title: "海报生成中",
              mask: true
            })
          }, 100)
        })

      },
      getPosterInfo(e) {
        this.tempFilePath = e.tempFilePath
      },
      hideLoading() {
        uni.hideLoading()
      },
      save() {
        uni.saveImageToPhotosAlbum({
          filePath: this.tempFilePath,
          success: () => {
            uni.showToast({
              title: '海报已保存到相册，可分享给好友',
              icon: 'none',
              duration: 2500
            });
          }
        });
      },
      shareTo() {
        setTimeout(() => {
          uni.previewImage({
            urls: [this.tempFilePath],
            longPressActions: {
              itemList: ['发送给朋友', '保存图片', '收藏'],
              success: function(data) {},
              fail: function(err) {}
            }
          });
        });
      },
      favorite() {
        if (this.favoriteActive) {
          this.$http({
            url: '/collection/item/' + this.form.item_id,
            method: 'DELETE',
            loading: 'none'
          }).then(res => {
            this.favoriteActive = ''
          })
        } else {
          this.$http({
            url: '/collection/item',
            method: 'POST',
            data: {
              item_id: this.form.item_id
            },
            loading: 'none'
          }).then(res => {
            this.favoriteActive = 'color: palevioletred'
          })
        }
      },

      //机构信息
      // getInstitutionInfo() {
      //   this.$http({
      //     url: '/institution/' + this.form.institution_id,
      //     v2: true
      //   }).then(res => {
      //     res.detail = res.detail.replace(/\<img/gi, '<img style="width:100%; height:auto" ')
      //     this.institutionInfo = res;
      //   })
      // },
      home() {
        uni.reLaunch({
          url: '../index/index'
        });
      },
      toInstitution() {
        uni.navigateTo({
          url: `./institution-normal?id=${this.form.institution_id}`,
        });
      },
      cancelAuth() {
        this.authorityDialog = null
      },
      previewImage(e) {
        this.previewImageUrl = e
        uni.previewImage({
          urls: [this.previewImageUrl],
          longPressActions: {
            itemList: ['发送给朋友', '保存图片', '收藏'],
          },
        });
      }
    }
  }
</script>
<style>
  .grace-tab-swiper {
    height: 100%;
    position: absolute;
    padding-bottom: 100upx;
  }

  .tab-img {
    overflow: auto;
    padding: 8upx 0;
  }

  .tab-img image {
    width: 100%;
  }

  /*tab1*/
  .title-icon {
    border-radius: 10upx;
    padding: 0;
    margin: 6upx 20upx 15upx 20upx;
    overflow: hidden;
  }

  .title-icon .info {
    box-shadow: none;
    border-bottom: 2upx solid #f3f4f6;
  }

  .grace-icons {
    font-size: 24upx !important
  }

  .dividing-line {
    width: 100%;
    height: 5px;
    background: #f3f4f6;
    margin: 0;
  }


  .teacher-card {
  ;
    width: 90%;
    margin: 0 auto;
  }

  .teacher-card .desc {
    margin-top: 14upx;
    color: black
  }

  .teacher-card .tab {
    color: white;
    background-color: #3688FF;
    border-radius: 40upx;
    padding: 8upx 20upx;
    margin-right: 20upx
  }

  .content1 {
    padding: 12px;
    text-align: center;
    line-height: 50px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .content1 .title {
    padding-left: 15upx;
    margin-top: 20upx
  }

  .content1 .text {
    padding-left: 15upx
  }


  /*tab3*/
  .content2 {
    word-wrap: break-word
  }


  /*tab3*/
  .priceNotes {
    margin-left: 12upx;
    width: 100%
  }

  .priceNotes .cu-bar {
    min-height: 80upx
  }

  .priceNotes+view {
    word-wrap: break-word
  }

  /* 图片形式 */
  .footer-option .submit {
    width: 40%
  }

  .inputTitle .grace-items {
    border-radius: 4px;
    line-height: 50px;
    color: #3688FF;
    padding: 5px 15px
  }

  .inputTitle .grace-label {
    float: left;
    color: #3688FF
  }

  .inputTitle .grace-dialog-btns button {
    font-size: 30upx
  }

  .redpack {
    font-size: 28upx;
    animation: sizeChange 3s infinite;
    animation-timing-function: ease;
    /*Safari 和 Chrome:*/
    -webkit-animation-timing-function: ease-in;
    -webkit-animation: sizeChange 3s infinite;
  }

  @keyframes sizeChange {
    0% {
      font-size: 34upx;
    }

    50% {
      font-size: 37upx;
    }

    100% {
      font-size: 34upx;
    }
  }

  @-webkit-keyframes sizeChange {
    0% {
      font-size: 35upx;
    }

    50% {
      font-size: 37upx;
    }

    100% {
      font-size: 35upx;
    }
  }
</style>
