import types from './types';

const mutations = {
  [types.GET_ARTICLEINFO](state, artcile) {
    state.articleInfo = artcile;
  },
  [types.CLEAR_ARTICLEINFO](state) {
    state.articleInfo = {};
  }
}

export default mutations;