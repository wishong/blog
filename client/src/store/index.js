import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleInfo: {},
    des: ''
  },
  mutations: {
    getArticleInfo(state, artcile) {
      state.des = 'DESCRIBE';
      state.articleInfo = artcile;
    },
    clearArticleInfo(state) {
      state.des = '';
      state.articleInfo = {};
    }
  },
  actions: {
  },
  modules: {
  }
})
