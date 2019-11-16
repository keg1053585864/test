<template>
    <view class="tarbar">
        <view
            class=".tarbar-list"
            :style="{
                background: tabBar.backgroundColor,
                color: tabBar.color,
                'border-top': tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
                'border-bottom': tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
            }"
        >
            <view class="tarbar-list-ul">
                <view class="tarbar-list-li" :class="index == 2 ? 'tarbar-list-li-center' : ''" v-for="(item, index) in tabBar.list" :key="index" @click.top="setSelected(index)">
                    <block v-if="index != 2">
                        <view class="tarbar-list-li-icon"><image :src="selected == index ? item.selectedIconPath : item.iconPath" mode=""></image></view>
                        <view class="tarbar-list-li-name">{{ item.text }}</view>
                    </block>
                    <block v-else>
                        <view class="tarbar-list-li-icon"><image :src="item.selectedIconPath" mode=""></image></view>
                    </block>
                </view>
            </view>
        </view>
        <block v-if="isShowMask"><release-popup @close-mask="closeMask"></release-popup></block>
    </view>
</template>

<script>
import releasePopup from './popup.vue';
export default {
    components: {
        'release-popup': releasePopup
    },
    props: ['selected'],
    data() {
        return {
            tabBar: {
                color: '#ccc',
                selectedColor: '#E84351',
                borderStyle: '#ccc',
                backgroundColor: '#fff',
                position: 'bottom',
                list: [
                    {
                        pagePath: '/pages/index/index',
                        iconPath: '/static/tarbar/home1.png',
                        selectedIconPath: '/static/tarbar/home2.png',
                        text: '首页'
                    },
                    {
                        pagePath: '/pages/foodie/foodie',
                        iconPath: '/static/tarbar/foodie1.png',
                        selectedIconPath: '/static/tarbar/foodie2.png',
                        text: '吃什么'
                    },
                    {
                        pagePath: '/pages/releaseBtn/releaseBtn',
                        iconPath: '',
                        selectedIconPath: '/static/tarbar/release.png'
                    },
                    {
                        pagePath: '/pages/discover/discover',
                        iconPath: '/static/tarbar/discover1.png',
                        selectedIconPath: '/static/tarbar/discover2.png',
                        text: '发现'
                    },
                    {
                        pagePath: '/pages/personal/personal',
                        iconPath: '/static/tarbar/personal1.png',
                        selectedIconPath: '/static/tarbar/personal2.png',
                        text: '我的'
                    }
                ]
            },
            oldSelected: 0, // 记录之前访问的索引; 值为2的时候显示遮罩
            isShowMask: false
        };
    },
    onLoad() {},
    methods: {
        setSelected(index) {
            console.log(index);
            if (index != 2) {
                uni.switchTab({
                    url: this.tabBar.list[index].pagePath
                });
            } else {
                this.isShowMask = true;
            }
            this.$forceUpdate();
        },
        closeMask() {
            this.isShowMask = false;
        }
    }
};
</script>

<style>
.tarbar {
    width: 100%;
    z-index: 9999;
    position: fixed;
}
.tarbar-list {
    width: 100%;
    height: 120upx;
    background: #4d586f;
    position: fixed;
    left: 0;
    bottom: 0;
}
.tarbar-list-ul {
    width: 100%;
    height: 100%;
    padding: 20upx 50upx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.tarbar-list-li {
    width: 80upx;
    height: 80upx;
}
.tarbar-list-li-icon {
    width: 50upx;
    height: 50upx;
    margin: 0 auto;
}
.tarbar-list-li-icon image {
    width: 50upx;
    height: 50upx;
}
.tarbar-list-li-name {
    width: 100%;
    text-align: center;
    line-height: 30upx;
    font-size: 20upx;
    height: 30upx;
}
.tarbar-list-li-center {
    width: 100upx;
}
.tarbar-list-li-center .tarbar-list-li-icon,
.tarbar-list-li-center .tarbar-list-li-icon image {
    width: 90upx;
    height: 60upx;
}
</style>

custom-tarbar.vue