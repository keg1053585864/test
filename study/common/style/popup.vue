<template>
    <view class="mask">
        <view class="mask-top">
            <view class="mask-title">唯美食与爱不可辜负</view>
            <view class="mask-desc">对于美食的热爱，如果用一句话来形容，那就是：唯美食与爱不可辜负。</view>
            <view class="mask-btn">
                <view class="mask-btn-list" v-for="(item, index) in btnList" :key="index" @click.stop="toRelease(index)">
                    <view class="mask-btn-list-icon iconfont" :class="item.icon"></view>
                    <view class="mask-btn-list-name">{{ item.name }}</view>
                </view>
            </view>
        </view>
        <view class="mask-close iconfont iconfabu-guanbi" @click.stop="closeMask"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            btnList: [
                { icon: 'iconfabu-fashipin', name: '发视频' },
                { icon: 'iconfabu-facaipu', name: '发菜谱' },
                { icon: 'iconfabu-shaimeishi', name: '晒美食' },
                { icon: 'iconfabu-caogaoxiang', name: '草稿箱' }
            ]
        };
    },
    methods: {
        closeMask() {
            this.$emit('close-mask');
        },
        toRelease(index) {
            let url = '';
            if (index == 1) {
                url = '';
            } else if (index == 2) {
                url = '/pages/release/release';
            } else if (index == 3) {
                url = '';
            } else {
                url = '';
            }
            if (!url) {
                this.getMessage('敬请期待', 0);
                return;
            }
            uni.navigateTo({
                url: url
            });
        },
        getMessage(title, icon = 0, duration = 2000, mask = true) {
            icon = icon == 1 ? 'success' : icon == 2 ? 'loading' : 'none';
            uni.showToast({
                title: title,
                icon: icon,
                duration: duration,
                mask: mask
            });
        }
    }
};
</script>

<style>
.mask {
    padding: 100upx 80upx 0;
    width: 100%;
    height: 100vh;
    background: #f6f7f7;
    position: relative;
    box-sizing: border-box;
    /* left: 0;
    top: 0; */
}
.mask-top {
    width: 100%;
    color: #595656;
}
.mask-title {
    height: 100upx;
    line-height: 100upx;
    font-size: 50upx;
}
.mask-desc {
    width: 100%;
    height: 260upx;
    line-height: 50upx;
    font-size: 30upx;
}
.mask-btn {
    width: 100%;
    height: 560upx;
    padding: 0 10upx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    box-sizing: border-box;
}
.mask-btn-list {
    width: 260upx;
    height: 260upx;
    border-radius: 20upx;
    background: #007aff;
    padding: 70upx;
    box-sizing: border-box;
}
.mask-btn-list:nth-child(1) {
    background: -webkit-linear-gradient(30deg, #fadde9, #eb68a3); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(30deg, #fadde9, #eb68a3); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(30deg, #fadde9, #eb68a3); /* Firefox 3.6 - 15 */
    background: linear-gradient(30deg, #fadde9, #eb68a3); /* 标准的语法（必须放在最后） */
    color: #5d163a;
}
.mask-btn-list:nth-child(2) {
    background: -webkit-linear-gradient(30deg, #d7e378, #1eb7b6); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(30deg, #d7e378, #1eb7b6); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(30deg, #d7e378, #1eb7b6); /* Firefox 3.6 - 15 */
    background: linear-gradient(30deg, #d7e378, #1eb7b6); /* 标准的语法（必须放在最后） */
    color: #113d41;
}
.mask-btn-list:nth-child(3) {
    background: -webkit-linear-gradient(30deg, #a7daf6, #7b4d9b); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(30deg, #a7daf6, #7b4d9b); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(30deg, #a7daf6, #7b4d9b); /* Firefox 3.6 - 15 */
    background: linear-gradient(30deg, #a7daf6, #7b4d9b); /* 标准的语法（必须放在最后） */
    color: #2a274c;
}
.mask-btn-list:nth-child(4) {
    background: -webkit-linear-gradient(30deg, #ffef01, #ee7437); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(30deg, #ffef01, #ee7437); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(30deg, #ffef01, #ee7437); /* Firefox 3.6 - 15 */
    background: linear-gradient(30deg, #ffef01, #ee7437); /* 标准的语法（必须放在最后） */
    color: #562f15;
}
.mask-btn-list-icon {
    width: 100%;
    height: 70upx;
    line-height: 70upx;
    text-align: center;
    font-size: 50upx;
}
.mask-btn-list-name {
    width: 100%;
    height: 50upx;
    line-height: 50upx;
    text-align: center;
    font-size: 30upx;
}
.mask-close {
    width: 80upx;
    height: 80upx;
    position: absolute;
    left: 50%;
    margin-left: -40upx;
    bottom: 40upx;
    font-size: 50upx;
    line-height: 80upx;
    text-align: center;
    color: #595656;
}
</style>

release-popup.vue