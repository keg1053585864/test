import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: {},
		posterSrc: '',
		qrSrc: '',
		token: '',
		extra: '',
		customTheme: 'montana',
		unreadNumber:'',
		location:{
			longitude: '116.46',
			latitude: '39.92'
		},
		temp: '',//1.在从单个项目详情点击教师的时候提交一次
				 //2.点击首页进入主题后传输顶部图片提交一次
				 //3.活动点击选择课程时传输max_item提交一次
	},
	mutations: {
		userInfo(state, param) {
			state.userInfo = param
		},
		posterSrc(state, param) {
			state.posterSrc = param
		},
		qrSrc(state, param) {
			state.qrSrc = param
		},
		token(state, param) {
			state.token = param
		},
		extra(state, param) {
			state.extra = param
		},
		// customTheme(state, param) {
		// 	state.customTheme = param
		// },
		// unreadNumber(state,param){
		// 	state.unreadNumber = param
		// },
		temp(state, param) {
			state.temp = param
		}
	},
	actions: {

	},
	getters: {
		customTheme(state) {
			return state.customTheme+''
		}
	}
})
