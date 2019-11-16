<template>
  <view>
    <view class="bg-white" style="width: 100%;height: auto;">
      <view>
        <view class="search-form round bg-white" style="position: fixed;top:0;padding-top:10upx;width: 100%;z-index: 4;"
              @click="setLocation">
          <text class="cuIcon-locationfill text-base margin-left text-bold" :class="'text-'+customTheme"></text>
          <text class="text-base text-black">{{location.name}}</text>
          <text class="cuIcon-right"></text>
        </view>
      </view>
      <view class="cu-bar search bg-white" style="position: fixed;top:50upx;width: 100%;z-index: 3;">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input @focus="searchFocus" @blur="blur" :focus="focus" :adjust-position="true" type="text" placeholder="搜索课程等"
                 v-model.trim="searchContent" confirm-type="search">
        </view>
        <view class="action">
          <button class="cu-btn shadow-blur round" :class="'bg-gradual-'+customTheme" @click="searchNow">搜 索</button>
        </view>
      </view>
    </view>
    <view class="grace-margin" style="margin-top: 175upx" v-show="noSearch">
      <!--顶部轮播图1-->
      <swiper class="grace-swiper swiper1" autoplay="true" indicator-dots indicator-color="rgba(255, 255, 255, 1)" style="overflow: hidden;"
              indicator-active-color="#3688FF" interval="3000">
        <swiper-item v-for="(item,index) in banner" :key="index" @click="bannerJump(item,index)" style="border-radius: 20upx;overflow: hidden">
          <view class="grace-img-in" style="border-radius: 20upx;overflow: hidden;">
            <view style="width:100%; height:170px;overflow: hidden;border-radius: 20upx;overflow: hidden;">
              <image style="width:100%; height:170px; object-fit:cover;box-shadow:0 8upx 25upx 0 rgba(0, 0, 0, 0.2);" :src="item.img_url"
                     mode="widthFix"></image>
            </view>
          </view>
        </swiper-item>
      </swiper>
	  
      <!--横向轮播图-->
	  		
      <!-- <view class="grace-title main-title text-bold text-lg" style="margin: 30upx 10upx 15upx 10upx;">热门目的地</view> -->
      <!-- <scroll-view class="grace-scroll-x padding-bottom" scroll-x> -->
      <!-- <view class="items" v-for="(item,index) in navigation.locations" :key="index"> -->
      <!-- <image :src="item.location_topic_img_url" @click="locationJump(index)"></image> -->
      <!-- <view style="		line-height: 48upx; -->
      <!-- font-size: 28upx; -->
      <!-- margin: 0; -->
      <!-- padding: 0; -->
      <!-- position: absolute; -->
      <!-- z-index: 1; -->
      <!-- width: 100%; -->
      <!-- overflow: hidden; -->
      <!-- margin-left: 10upx; -->
      <!-- color: white; -->
      <!-- bottom: 0">{{item.location}}</view> -->
      <!-- </view> -->
      <!-- </scroll-view> -->
      <!-- <view class="bg-gray " style="width: 120%;height: 20upx;transform: translateX(-10%)"></view> -->
      <!-- <view class="grace-box-banner margin-top grace-box-shadow grace-border-radius-small" @click="test"> -->
      <!-- <grace-speaker :vertical="false" :interval="5000" iconClass="grace-icons icon-gonggao" msgs="测试测试测试"></grace-speaker> -->
      <!-- </view> -->
      <!-- 主题列表 -->
      <!-- <view class="bg-gray" style="width: 100%;height: 20upx;"></view> -->
      <view class="grace-news-list">
        <view class="grace-title text-bold text-xl" style="margin: 70upx 10upx 5upx 0upx;">看一看</view>
        <view class="title-content text-base">六大教育板块，为您提供真正有价值的新教育</view>
        <view class="imgs margin-bottom">
          <view class="category-img" v-for="(item,index) in theme" :key="index">
            <image class="img" :src="item.topic_img_url" @click="themeJump(item,index)">
            </image>
            <!-- <view>{{item.theme?item.theme:'未命名'}}</view> -->
          </view>
        </view>
        <!--列表栏目-->
        <view class="grace-title text-bold text-xl" style="margin: 70upx 10upx 5upx 0upx;">去学习</view>
        <view class="title-content text-base">一样的世界，不一样的学习方式</view>
        <!-- <view class="grace-card-view" style="box-shadow:0 8upx 25upx 0 rgba(0, 0, 0, 0.2)" v-for="(item,index) in navigation.items"
                 :key="index" @click="itemJump(index)">
                    <view style="width:100%; height:300upx; overflow: hidden;position:relative;">
                        <image style="width:100%; height:300upx;  margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;object-fit:cover;"
                         :src="item.item_head_img_url" mode="widthFix"></image>
                    </view>
                    <view class="card-content">
                        {{item.item_name}}
                    </view>
                    <view class="footer">
                        <view class="grace-icons icon-home"> 天数：{{item.duration}}</view>
                        <view class="grace-icons icon-share"> 地点：{{item.location}}</view>
                    </view>
                </view> -->
        <view class="institution  padding margin-bottom" v-for="(item,index) in institution" :key="index" @click="institutionJump(item,index)">
          <view class="institution-img-card">
            <img :src="item.img_url" />
          </view>
          <view class="institution-info padding-left">
            <view class="text-base text-bold" style="letter-spacing: 1px;">{{item.name}}</view>
			<view style="width:150rpx;">
				<graceStar :starnum="4" :cantap="false" font-size="24rpx" ></graceStar>
			</view>
            <view class="institution-detail ">
				<view class=" description text-gray text-xs">
					<text class="description-text text-cut"> “{{item.description}}” </text>
				</view>
            </view>
			<view class="distance text-gray text-sm">
				<text>{{item.address?item.address:'地址未知'}}</text>
				<text>{{item.distance>=1000?(Math.floor(item.distance/1000)+'km'):'<1km'}}</text>
			</view>
            <!-- <view class="text-gray">暂无评分</view> -->
            <!-- <view> -->
            <!-- <view class="solid-bottom text-gray institution-item" v-for="(item1,index) in 5" :key="index"> -->
            <!-- <text>￥10 课程标题</text> -->
            <!-- </view> -->
            <!-- <view v-if="!item0.isFold" class="institution-item text-gray">查看更多</view> -->
            <!-- </view> -->
            <!-- <view class="isFold" :class="item0.isFold?'cuIcon-unfold':'cuIcon-fold'" @click="unFlodItem">{{item0.isFold?'展开':'收起'}}</view> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  let temp = 1
  import amap from '../../common/map/amap-wx.js';
  import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
  import graceStar from "../../graceUI/components/graceStar.vue";

  export default {
    name: "index1",
    watch: {
      "$store.state.customTheme": function(newValue) {
        this.customTheme = newValue
      }
    },
    data() {
      return {
        //高德地图sdk参数
        amapPlugin: null,
        key: '820ff2213924c04f7e4dc891190b1c1e',
        //高德地图sdk参数 end
        customTheme: '',
        focus: false,
        noSearch: true,
        searchContent: '',
        //定位
        location: {
          longitude: '116.46',
          latitude: '39.92',
          name: '加载中…'
        },
        banner: [],
        theme: [],
        // speakerMsgs: [{
        // 		title: "公告测试1",
        // 		opentype: "navigate"
        // 	},
        // 	{
        // 		title: "公告测试2",
        // 		opentype: "switchTab"
        // 	}
        // ],
        institution: [],
        page: 1,
      }
    },
    components: {
      graceSpeaker,
	  graceStar,
    },
    onLoad() {
      //初始化高德地图SDK实例对象
      this.amapPlugin = new amap.AMapWX({
        key: this.key
      });
      //初始化高德地图SDK实例对象 end
      this.customTheme = this.$store.state.customTheme
      this.getBanner()
      this.getThemeList()
      this.getRegeo()
      this.getInstitutioinInfo()
    },
    onReachBottom() {
      if (temp) {
        temp = 0
        this.getInstitutioinInfo()
        setTimeout(() => {
          temp = 1
        }, 1000);
      }
    },
    onShow() {
      this.searchContent = '';
    },
    methods: {
      //获取当前地址信息
      getRegeo() {
        this.amapPlugin.getRegeo({
          success: res => {
            this.location.longitude = res[0].longitude
            this.location.latitude = res[0].latitude
            this.location.name = res[0].desc;
            this.location.address = res[0].name;
            this.$store.state.location.longitude = res[0].longitude
            this.$store.state.location.latitude = res[0].latitude
            this.page = 1
            this.getInstitutioinInfo()
          },
          fail: res => {
            this.location.name = '暂未获取';
          }
        });
      },
      setLocation() {
        let _this = this
        uni.chooseLocation({
          success: function(res) {
            if (res.name) {
              _this.location.name = res.name
              _this.location.address = res.address
              _this.location.latitude = res.latitude
              _this.location.longitude = res.longitude
              _this.$store.state.location.longitude = res.longitude
              _this.$store.state.location.latitude = res.latitude
              this.page = 1
              _this.getInstitutioinInfo()
            }
          }
        });
      },
      getBanner() {
        this.$http({
          url: '/banner/list',
          v3: true
        }).then(res => {
          this.banner = res
        })
      },
      getThemeList() {
        this.$http({
          url: '/theme/list',
          v3: true
        }).then(res => {
          this.theme = res
        })
      },
      getInstitutioinInfo() {
        this.$http({
          url: '/institution/list/' + this.page,
          data: {
            longitude: this.location.longitude,
            latitude: this.location.latitude
          },
        }).then(res => {
          for (let i of res) {
            this.institution = res
          }
          this.page += 1
        })
      },
      // getInfo() {
      // 	this.$http({
      // 		url: '/navigation'
      // 	}).then(res => {
      // 		res.items = []
      // 		this.navigation = res
      // 		this.getItemList()
      // 	})
      // },
      getItemList() {
        this.$http({
          url: '/item/list/0',
          v2: true,
          loading: 'none'
        }).then(res => {
          this.navigation.items = res
        })
        // uni.re({
        // 	url:'/item/list/0'
        // }).then(res=>{
        // 	this.navigation = res.items
        // })
      },
      searchFocus() {
        this.focus = true
        this.noSearch = false
      },
      searchNow() {
        uni.navigateTo({
          url: `../component/search?e=${this.searchContent}`,
          animationType: 'pop-in',
          animationDuration: 200
        });
      },
      blur() {
        this.focus = false;
        this.noSearch = true
      },
      bannerJump(row, index) {
        uni.navigateTo({
          url: row.url
        });
      },
      // locationJump(index) {
      // 	console.log(index, this.navigation.locations[index].location_id)
      // 	uni.navigateTo({
      // 		url: `../home/location?id=${this.navigation.locations[index].location_id}`,
      // 		animationType: 'pop-in',
      // 		animationDuration: 200
      // 	});
      // },
      themeJump(row, index) {
        let a = {
          head_img_url: row.head_img_url,
          theme: row.theme
        }
        this.$store.state.temp = a
        uni.navigateTo({
          url: `../home/theme?id=${row.theme_id}`,
        });
      },
      itemJump(index) {
        uni.navigateTo({
          url: `../home/item?id=${this.navigation.items[index].item_id}`,
        });
      },
      institutionJump(row, index) {
        uni.navigateTo({
          url: `../home/institution-normal?id=${row.institution_id}`,
        });
      },
      unFlodItem() {

      }
    }
  }
</script>
<style scoped>
  .swiper1 {
    height: 276upx;
  }

  .swiper1 image {
    width: 690upx;
    height: 276upx;
    border-radius: 10upx;
  }

  .main-title {
    margin-top: 20upx;
    margin-bottom: 15upx;
    padding: 0 0 7upx 0
  }

  .grace-scroll-x .items {
    /* overflow: hidden; */
    object-fit: cover;
    height: 168upx;
    margin: 0 7upx;
    padding: 0;
    border-radius: 10upx;
    line-height: 0;
    overflow: hidden;
    position: relative;
  }

  .grace-scroll-x .items image {
    width: 300upx;
    height: 100%;
    /* height: 200upx; */
    border-radius: 10upx;
  }

  .grace-box-banner {
    margin: 0 0 14upx 0;
    padding: 6upx 20upx 0 20upx
  }

  .grace-news-list .grace-title {
    padding: 0;
	letter-spacing: 1px;
  }

  .grace-news-list .imgs {
    margin: 20px 0;
  }

  .category-img {
    width: 224upx;
    margin: 0;
    padding: 5upx 5upx;
    height: 160upx;
    /* border-radius: 10upx; */
    line-height: 0;
    /* overflow: hidden; */
    position: relative;
  }

  .category-img image {
    margin: 0;
    width: 224upx !important;
    height: 150upx;
    position: absolute;
    border-radius: 5upx !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  .category-img view {
    line-height: 48upx;
    font-size: 28upx;
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    text-align: center;
    bottom: 0
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

	.title-content{
		color:#999
	}
	
  .institution {
    display: flex;
	border-radius: 10rpx;
	border-bottom: 1px solid #f3f4f6;;
  }
	.title-content{
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
  .institution-info .institution-detail .distance {
    text-align: right;
  }
	.distance{
		display: flex;
		justify-content: space-between;
	}
  .institution-info .institution-item {
    padding: 10upx 0;
  }

  .institution-info .isFold {
    width: 100%;
    letter-spacing: 5upx;
  }

  .footer {
    margin-bottom: 14upx
  }
</style>
