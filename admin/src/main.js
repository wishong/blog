import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.prototype.$http = http;

Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
  computed: {
    uploadURL() {
      return this.$http.defaults.baseURL + '/uploads/article'
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
