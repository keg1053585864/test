<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">文本</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>文字大小
			</view>
		</view>
		<view class="bg-white padding-lr">
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">60</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<text class=" cuIcon-roundcheckfill text-green"></text>
					</view>
					<view class="padding">用于图标、数字等特大显示</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">40</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-sl padding">
						<text class=" cuIcon-roundcheckfill text-green"></text>
					</view>
					<view class="padding">用于图标、数字等较大显示</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">22</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xxl padding">
						<text class="text-price text-red">80.00</text>
					</view>
					<view class="padding">用于金额数字等信息</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">18</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xl padding">
						<text class="text-black text-bold">您的订单已提交成功！</text>
					</view>
					<view class="padding">页面大标题，用于结果页等单一信息页</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">16</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-lg padding">
						<text class="text-black">ColorUI组件库</text>
					</view>
					<view class="padding">页面小标题，首要层级显示内容</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">14</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-df padding">专注视觉的小程序组件库</view>
					<view class="padding">页面默认字号，用于摘要或阅读文本</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="padding">12</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-sm padding">
						<text class="text-grey">衬衫的价格是9磅15便士</text>
					</view>
					<view class="padding">页面辅助信息，次级内容等</view>
				</view>
			</view>
			<view class="padding-xs flex align-center">
				<view class="padding">10</view>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xs padding">
						<text class="text-gray">我于杀戮之中绽放 亦如黎明中的花朵</text>
					</view>
					<view class="padding">说明文本，标签文字等关注度低的文字</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>文字颜色
			</view>
		</view>
		<view class="grid col-5 padding-sm">
			<view class="padding-sm" v-for="(item,index) in ColorList" :key="index">
				<view class="text-center" :class="'text-' + item.name">
				 	{{item.title}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>文字阴影
			</view>
		</view>
		<view class="grid col-5 padding-sm">
			<view class="padding-sm" v-for="(item,index) in ColorList" :key="index">
				<view class="text-center text-shadow" :class="'text-' + item.name">
					<view class="cuIcon-ellipse text-xxl"></view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>文字截断
			</view>
		</view>
		<view class="padding bg-white">
			<view class="text-cut padding bg-grey radius" style="width:220px">我于杀戮之中绽放 ,亦如黎明中的花朵</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>文字对齐
			</view>
		</view>
		<view class="padding bg-white">
			<view class="text-left padding">我于杀戮之中绽放 ,亦如黎明中的花朵</view>
			<view class="text-center padding">我于杀戮之中绽放 ,亦如黎明中的花朵</view>
			<view class="text-right padding">我于杀戮之中绽放 ,亦如黎明中的花朵</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>特殊文字
			</view>
		</view>
		<view class="padding text-center">
			<view class="padding-lr bg-white">
				<view class="solid-bottom padding">
					<text class="text-price">80.00</text>
				</view>
				<view class="padding">价格文本，利用伪元素添加"¥"符号</view>
			</view>
			<view class="padding-lr bg-white margin-top">
				<view class="solid-bottom padding">
					<text class="text-Abc">color Ui</text>
				</view>
				<view class="padding">英文单词首字母大写</view>
			</view>
			<view class="padding-lr bg-white margin-top">
				<view class="solid-bottom padding">
					<text class="text-ABC">color Ui</text>
				</view>
				<view class="padding">全部字母大写</view>
			</view>
			<view class="padding-lr bg-white margin-top">
				<view class="solid-bottom padding">
					<text class="text-abc">color Ui</text>
				</view>
				<view class="padding">全部字母小写</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ColorList: this.ColorList,
			};
		}
	}
</script>

<style>

</style>
