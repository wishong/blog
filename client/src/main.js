import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import './plugins/element.js'
import 'normalize.css'
import './assets/css/iconfont/iconfont.css'

// 富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
