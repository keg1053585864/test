import Vue from 'vue'
import App from './App'
import store from './store'

import http from './common/request/index.js'

Vue.config.productionTip = false
Vue.prototype.$http = http


Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
