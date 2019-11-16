<template>
  <view>
    <view class="cu-bar bg-gradual-red">
      <text class="text-bold text-xl margin-left">购入流程</text>
    </view>
    <view class="bg-white padding">
      <view class="cu-steps">
        <view class="cu-item" :class="index>active?'':'text-green'" v-for="(item,index) in activeList" :key="index">
          <text class="num" :data-index="index + 1"></text> {{item.name}}
        </view>
      </view>
    </view>
    <view>
      <view v-if="active===-1" :class="slideAction" class="cu-list menu-avatar">
        <view class="">
          <!-- 局部选项卡 -->
          <scroll-view scroll-x class="bg-white nav" style="box-shadow:  0 0 20upx 0 rgba(0,0,0,0.1);position: relative;z-index: 100;"
                       scroll-with-animation @scrolltolower="scrolltoRight">
            <view class="cu-item" style="height: 10upx;" :class="index==tabCurrentIndex?'text-green cur':''" v-for="(item,index) in institutionList"
                  :key="index" @tap="tabSelect" :data-id="index">
              {{item.name}}
            </view>
          </scroll-view>
          <swiper :style="'height: '+(clientHeight?clientHeight+'px':'auto')" :current="tabCurrentIndex" @change="swiperChange">
            <swiper-item v-for="(item,index) in institutionList" :key="index">
              <scroll-view style="padding-bottom: 100upx;" :scroll-y="true" :style="'height: '+(clientHeight?clientHeight+'px':'auto')"
                           @scrolltolower="scrolltoBottom">
                <view class="cu-list menu-avatar">
                  <view v-if="index===0" class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item1,index1) in item.items"
                        :key="index+'-'+index1">
                    <view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
                      <image :src="item1.institution_img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
                    </view>
                    <navigator class="content" style="margin-left:10upx;" :url="'/pages/home/institution-activity?id='+item1.institution_id">
                      <view class="">
                        <view class="text-bold">{{item1.name}}</view>
                      </view>
                      <view class="text-sm flex">
                        <view class="text-cut" :class="item1.apply_number<item1.limit?'text-gray':'text-pink'" style="line-height: 1.1">已报名：({{item1.apply_number}}/{{item1.limit}})</view>
                      </view>
                      <view class="text-sm flex text-gray">
                        <view class="text-cut" style="line-height: 1.1"><text class="text-green">机构：{{item1.institution_name}}</text></view>
                      </view>
                    </navigator>
                    <view class="icon-btn">
                      <view v-if="item1.apply_number<item1.limit" class="icon grace-icons text-blue text-xl margin-right" style="padding:40upx;"
                            :class="(form.items.indexOf(item1.item_id))>-1?'cuIcon-squarecheckfill':'cuIcon-square'" @tap="itemSelectCheck(index,item,index1,item.items[index1])"></view>
                    </view>
                  </view>
                  <view v-if="index!==0" class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item1,index1) in item.items"
                        :key="index+'-'+index1">
                    <view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
                      <image :src="item.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
                    </view>
                    <navigator class="content" style="margin-left:10upx;" :url="'/pages/home/institution?id='+item.institution_id">
                      <view class="">
                        <view class="text-bold">{{item1.name}}</view>
                      </view>
                      <view class="text-sm flex">
                        <view class="text-cut" :class="item1.apply_number<item1.limit?'text-gray':'text-pink'" style="line-height: 1.1">已报名：({{item1.apply_number}}/{{item1.limit}})</view>
                      </view>
                      <view class="text-sm flex text-gray">
                        <view class="text-cut" style="line-height: 1.1"><text class="text-green">机构：{{item.name}}</text></view>
                      </view>
                    </navigator>
                    <view v-if="item1.apply_number<item1.limit" class="icon-btn">
                      <view class="icon grace-icons text-blue text-xl padding margin-right" :class="(form.items.indexOf(item1.item_id))>-1?'cuIcon-squarecheckfill':'cuIcon-square'"
                            @tap="itemSelectCheck(index,item,index1,item.items[index1])"></view>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view v-if="active===0" :class="slideAction" class="cu-list menu-avatar">
        <view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item,index) in giftList" :key="index">
          <view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
            <image :src="item.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
          </view>
          <view class="content" style="margin-left:10upx">
            <view class="">
              <view class="text-bold">{{item.name}}</view>
            </view>
            <view class="text-gray text-sm flex">
              <view class="text-cut text-gray" style="line-height: 1.1">{{item.sponsor?item.sponsor:'暂无信息'}}</view>
            </view>
            <view class="text-gray text-sm flex">
              <view class="text-cut" style="line-height: 1.1">剩余{{item.amount}}<text class=" text-pink text-bold" style="margin-left: 50upx;">价值￥{{item.price}}</text></view>
            </view>
          </view>
          <view class="icon-btn">
            <view class="icon grace-icons text-blue text-lg margin-right" :class="item.check?'cuIcon-squarecheckfill':'cuIcon-square'"
                  style="padding:40upx;" @tap="giftSelectCheck(index,item)"></view>
          </view>
        </view>
      </view>
      <view v-if="active===1" :class="slideAction" class="cu-list menu-avatar">
        <!-- <view class="cu-form-group"> -->
          <!-- <view class="title">家长姓名</view> -->
          <!-- <input v-model.trim="form.parent_name"></input> -->
        <!-- </view> -->
        <view class="cu-form-group">
          <view class="title">学员姓名</view>
          <input v-model.trim="form.student_name"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">年龄</view>
          <input type="number" v-model.trim="form.student_age"></input>

        </view>
        <view class="cu-form-group">
          <view class="title"> 联系电话</view>
          <input type="number" v-model.trim="form.phone"></input>
          <view class="cu-capsule radius">
            <view class='cu-tag bg-blue '>
              +86
            </view>
            <view class="cu-tag line-blue">
              中国大陆
            </view>
          </view>
          <!-- 							<view class="cu-form-group">
        <view class="title">验证码</view>
        <input name="input"></input>
        <button class='cu-btn bg-green shadow'>发送</button>
    </view> -->
        </view>
      </view>
      <view v-if="active===2" :class="slideAction" class="cu-list menu-avatar" style="padding-bottom: 100upx">
        <view class="grace-card-view title-icon padding-bottom margin" style="border-radius: 20upx;">
          <!-- <view class="grace-icons cuIcon-people"><text class="margin-left">家长姓名：{{form.parent_name}}</text></view> -->
          <view class="grace-icons cuIcon-friendfavor"><text class="margin-left">学员姓名：{{form.student_name}}（{{form.student_age}}岁）</text></view>
          <view class="grace-icons icon-phone"><text class="margin-left"> 联系电话：{{form.phone}}</text></view>
          <view class="margin-left"><text class="margin-left text-pink">温馨提示：购买前请务必核对好您的联系信息！</text></view>
        </view>
        <view v-if="form.gifts.length" class="text-bold padding-left">已选择的礼品</view>
        <view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item,index) in giftSelectDetail"
              :key="index">
          <view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
            <image :src="item.img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
          </view>
          <view class="content" style="margin-left:10upx">
            <view class="">
              <view class="text-bold">{{item.name}}</view>
            </view>
            <view class="text-gray text-sm flex">
              <view class="text-cut text-gray" style="line-height: 1.1">{{item.sponsor?item.sponsor:'暂无信息'}}</view>
            </view>
            <view class="text-gray text-sm flex">
              <view class="text-cut" style="line-height: 1.1">剩余{{item.amount}}<text class=" text-pink text-bold" style="margin-left: 50upx;">价值￥{{item.price}}</text></view>
            </view>
          </view>
        </view>
        <view class="text-bold padding-left">已选择的课程</view>
        <view class="cu-item" style="margin-top: 10upx; padding-bottom: 10upx;" v-for="(item,index) in itemSelectDetail"
              :key="index">
          <view class="cu-avatar radius lg" style="border-radius: 10upx;height: 110upx;width: 110upx;">
            <image :src="item.institution_img_url" style="width: 100%;height: 100%;border-radius: 10upx;"></image>
          </view>
          <view class="content" style="margin-left:10upx">
            <view class="">
              <view class="text-bold">{{item.name}}</view>
            </view>
            <view class="text-gray text-sm flex">
              <view class="text-cut text-gray" style="line-height: 1.1">限制数：{{item.limit}}</view>
            </view>
            <view class="text-gray text-sm flex">
              <view class="text-cut" style="line-height: 1.1"><text style="">已报名数：{{item.apply_number}}</text></view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="active===3" :class="slideAction" class="cu-list menu-avatar" style="padding-bottom: 100upx">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xsl">
            <text class=" cuIcon-roundcheckfill text-green"></text>
          </view>
          <view class="padding text-lg">您的订单已支付成功</view>
          <button class="cu-btn shadow-blur bg-gradual-green margin-right" @tap="home">返 回 首 页</button>
          <button class="cu-btn shadow-blur bg-gradual-green margin-left" @tap="back">返 回 分 享</button>
        </view>
      </view>
    </view>
    <view v-if="active!==3" class="grace-margin footer-option">
      <view class="grace-footer">
        <view class="icon-btn" @click="lastStep">
          <view disabled class="icon grace-icons cuIcon-back_android" style="color: #F8006D;font-weight: bold;font-size: 35upx"></view>
          <view disabled class="text" style="color: #F8006D;">返 回</view>
        </view>
        <button class="submit bg-gradual-red" type="warn" @click="nextStep">{{active===2?'确认支付':'下一步'}}</button>
      </view>
    </view>
  </view>
</template>

<script>
  let temp = 1 //用于滑动的延时
  export default {
    data() {
      return {
        isDisabled: '',
        clientHeight: '',
        firstStep: true,
        avatarUrl: this.$store.state.userInfo.avatarUrl,
        customTheme: '',
        //步骤列表
        activeList: [{
          name: '课程选择'
        }, {
          name: '礼品'
        }, {
          name: '信息补充'
        }, {
          name: '完成'
        }],
        active: -1,
        slideAction: '',
        //礼品列表
        giftList: [],
        //机构课程Tab列表
        scrollLeft: 0,
        tabCurrentIndex: 0,
        swiperCurrentIndex: 0,
        institutionList: [{
          name: '全部',
          items: []
        }],
        itemList: [],
        activity_id: '',
        form: {
          activity_id: '',
          // parent_name: '',
          student_name: '',
          student_age: '',
          phone: '',
          items: [],
          gifts: [],
        },
        giftSelectDetail: [],
        itemSelectDetail: [],
        //分页
        page0: 1,
        page1: 1,
        page2: 1
      }
    },
    onLoad(e) {
      this.activity_id = e.id
      this.form.activity_id = e.id
      this.customTheme = this.$store.state.customTheme
      this.getgiftList()
      this.getItemList()
      this.getInstitutionList()
    },
    methods: {

      scrolltoBottom(e) {
        if (temp && this.tabCurrentIndex === 0) {
          temp = 0
          this.getItemList()
          setTimeout(() => {
            temp = 1
          }, 1000);
        }
      },
      scrolltoRight(e) {
        if (temp) {
          temp = 0
          this.getInstitutionList()
          setTimeout(() => {
            temp = 1
          }, 1000);
        }
      },
      giftSelectCheck(index, row) {
        row.check = !row.check
        if (row.check) {
          this.giftSelectDetail.push(row)
          this.form.gifts.push(row.gift_id)
        } else {
          let i = this.form.gifts.indexOf(row.gift_id)
          this.giftSelectDetail.splice(i, 1)
          this.form.gifts.splice(i, 1)
        }
      },
      itemSelectCheck(index, row, index1, row1) {
        let i = this.form.items.indexOf(row1.item_id)
        if (i === -1) {
          if (this.form.items.length === this.$store.state.temp) {
            uni.showModal({
              title: '提示',
              content: '最多只能选择'+this.$store.state.temp+'门课程',
              showCancel: false,
              confirmText: '知道了'
            });
            return
          }
          if (row.img_url) {
            row1.institution_img_url = row.img_url
          }
          if ((this.itemSelectDetail.findIndex(x => x.institution_img_url === row1.institution_img_url)) >= 0) {
            uni.showModal({
              title: '提示',
              content: '同个机构下只能选择1门课程',
              showCancel: false,
              confirmText: '知道了'
            });
            return
          }
          this.itemSelectDetail.push(row1)
          this.form.items.push(row1.item_id)
        } else {
          this.itemSelectDetail.splice(i, 1)
          this.form.items.splice(i, 1)
        }
      },
      // scrolltolower(e) {
      // 	let lastId = this.institutionList[this.institutionList.length - 1].institution_id;
      // 	getInstitutionList(lastId)
      // },
      tabSelect(e) {
        let index = e.currentTarget.dataset.id
        this.swiperCurrentIndex = index
        this.tabCurrentIndex = index
      },
      swiperChange(e) {
        let index = e.detail.current;
        this.scrollLeft = index * 60
        this.tabCurrentIndex = index;
        this.swiperCurrentIndex = index;
        console.log(this.scrollLeft)
      },
      getgiftList(e) {
        this.$http({
          url: `/activity/${this.activity_id}/gifts/${this.page2}`,
          v2: true
        }).then(res => {
          this.giftList = res
          for (let i of this.giftList) {
            this.$set(i, 'check', false)
          }
        })
      },
      getItemList() {
        this.$http({
          url: `/activity/${this.activity_id}/items/${this.page1}`,
        }).then(res => {
          if (this.page1 < 2) {
            this.institutionList[0].items = res
            for (let i of this.institutionList[0].items) {
              this.$set(i, 'check', false)
            }
          } else {
            for (let i of res) {
              this.$set(i, 'check', false)
              this.institutionList[0].items.push(i)
            }
          }
          this.page1 += 1
        })
      },
      getInstitutionList() {
        this.$http({
          url: `/activity/${this.activity_id}/institutions/${this.page0}/withItems`,
          v2: true
        }).then(res => {
          for (let i of res) {
            for (let j of i.items) {
              j.check = false
            }
            this.institutionList.push(i)
          }
          this.page0 += 1
          uni.getSystemInfo({
            success: res1 => {
              this.clientHeight = res1.windowHeight - 190
            }
          })
        })
      },
      itemJump(index, id) {
        if (this.type == 2) {
          uni.navigateTo({
            url: `../home/item?id=${id}&order_id=${this.list[index].order_id}`,
            animationType: 'pop-in',
            animationDuration: 200
          });
        } else {
          uni.navigateTo({
            url: `../home/item?id=${id}`,
            animationType: 'pop-in',
            animationDuration: 200
          });
        }
      },
      lastStep() {
        if (this.active === -1) {
          uni.navigateBack()
        }
        this.slideAction = 'slide-back',
          setTimeout(() => {
            this.active = this.active == this.activeList.length - 1 ? 0 : this.active - 1
            this.slideAction = 'fade-in'
          }, 350);
      },
      nextStep() {
        console.log(temp)
        if (temp) {
          temp = 0
          setTimeout(() => {
            temp = 1
            console.log(temp, 'okay')
          }, 1000)
          if (this.active === -1 && this.form.items.length < 1) {
          	uni.showModal({
          		title: '提示',
          		content: '请至少选择1门课程',
          		showCancel: false,
          		confirmText: '知道了'
          	});
          	return
          }
          if (this.active === 1 && (!this.form.student_name || !this.form.student_age || !this.form
            .phone)) {
            uni.showModal({
              title: '提示',
              content: '请完善信息，以方便我们与您联系',
              showCancel: false,
              confirmText: '知道了'
            });
            return
          }
          if (this.active === 1 && this.form.phone.length !== 11 && ((typeof(this.form.phone * 1)) === 'number')) {
            uni.showModal({
              title: '提示',
              content: '联系电话格式不正确，请再次核对',
              showCancel: false,
              confirmText: '知道了'
            });
            return
          }
          if (this.active === 2) {
            this.pay()
            return
          }
          this.slideAction = 'slide-next',
            setTimeout(() => {
              this.active = this.active == this.activeList.length - 1 ? 0 : this.active + 1
              this.slideAction = 'fade-in'
            }, 350)
        }
      },
      pay() {
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
              _this.$http({
                url: '/activity_order/' + res.out_trade_no + '/message',
                loading: 'none',
				alert:'none'
              })
              _this.slideAction = 'slide-next',
                setTimeout(() => {
                  _this.active = _this.active == _this.activeList.length - 1 ? 0 : _this.active + 1
                  _this.slideAction = 'fade-in'
                }, 350)
            }
          });
        }
        if (this.$store.state.extra) {
          this.form.extra = this.$store.state.extra.split('&')[1]
        }
        console.log(this.$store.state.extra)
        this.$http({
          url: '/activity_order',
          v3: true,
          method: 'POST',
          data: this.form,
          loading: 'none'
        }).then(res => {
          payment(res)
        })
      },
      home() {
        uni.reLaunch({
          url: '/pages/index/index'
        });
      },
      back() {
        uni.navigateBack()
      }







    }
  }
</script>
<style scoped>
  swiper-item {
    overflow: scroll;
  }

  .slide-next {
    animation: slideNext .4s;
    animation-timing-function: ease-in;
  }

  @keyframes slideNext {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-130%);
    }
  }

  .slide-back {
    animation: slideBack .4s;
    animation-timing-function: ease-in;
  }

  @keyframes slideBack {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(130%);
    }
  }

  .fade-in {
    animation: fadeIn .3s;
    animation-timing-function: ease-in;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
