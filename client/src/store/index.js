import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleInfo: {
      categoryId: {
        name: ""
      }
    },
  },
  mutations: {
    getArticleInfo(state, artcile) {
      state.articleInfo = artcile;
    },
    clearArticleInfo(state) {
      state.articleInfo = {};
    }
  },
  actions: {
  },
  modules: {
  }
})
