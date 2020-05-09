import types from './types';

const mutations = {
  [types.GET_ARTICLEINFO](state, article) {
    state.articleInfo = article;
  },
  [types.CLEAR_ARTICLEINFO](state) {
    state.articleInfo = {};
  }
}

export default mutations;