import urlConfig from '@/common/config.js'
import store from "../../store.js"
let request
// const headers = {}
const PORT1 = '/baseinfo'

let init = {
	url: '',
	method: 'GET',
	data: '',
	loading: '数据加载中',
}
request = async e => {
	function response() {
		if (e.loading !== 'none') {
			uni.showLoading({
				title: e.loading ? e.loading : init.loading
			})
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: urlConfig + e.url,
				method: e.method,
				data: e.data,
				header: {
					token: store.state.token
				},
				success: res => {
					console.log(res)
					uni.hideLoading()
					if (res.statusCode < 300) {
						resolve(res.data)
						return
					}
					if (e.alert !== 'none' && res.data.errorCode) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
					}
					reject(new Error(res.data.errorCode))
				},
				fail: err => {
					uni.hideLoading()
					uni.showToast({
						title: '请检查网络',
						icon: 'none',
					});
					resolve(err)
				}
			})
		})
	}
	return (await response())
}

export default request
