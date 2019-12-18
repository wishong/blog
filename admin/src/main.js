import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './network/http'
import './plugins/element.js'

// 富文本本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 登录页粒子
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.config.productionTip = false

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
