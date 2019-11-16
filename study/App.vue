<script>
	import http from './common/request/index.js'
	export default {
		onLaunch: async function() {
			this.$store.commit('customTheme', (uni.getStorageSync('customTheme')) ? uni.getStorageSync('customTheme') : 'blue');
			console.log('App Launch');
			uni.showLoading({
				title: '数据加载中'
			});
			this.authorize()
			// setInterval(() => {
			// 	this.authorize();
			// 	let a = new Date()
			// 	console.log(this.$store.state.token, a)
			// }, 1000 * 60 * 60);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async authorize() {
				function fn1() {
					return new Promise(resolve => {
						uni.login({
							provider: 'weixin',
							success: code => {
								resolve(code)
							}
						})
					})
				}
				let code = (await fn1()).code;

				function fn2() {
					return new Promise(resolve => {
						uni.getUserInfo({
							provider: 'weixin',
							success: info => {
								http({
									url: '/user/login',
									method: 'POST',
									data: {
										code: code,
										nickname: info.userInfo.nickName,
										avatar_url: info.userInfo.avatarUrl,
									},
									loading: 'none'
								}).then(res => {
									resolve({
										token: res.token,
										info: info.userInfo
									});
								})
							}
						});
					})
				}
				let result = await fn2()
				this.$store.commit('userInfo', result.info);
				this.$store.commit('token', result.token)
			}
		}
	}
</script>

<style>
	/* 每个页面公共css */
	@import "./graceUI/graceIcons.css";
	@import "./graceUI/graceUI.css";
	@import "./colorUI/colorui/icon.css";
	@import "./colorUI/colorui/main.css";
	@import "./quill/quill.core.css";
	@import "./quill/quill.snow.css";
	@import "./quill/quill.bubble.css";

	html,
	body {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		background-color: rgb(255, 255, 255);
	}
</style>
