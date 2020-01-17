import type from './types';

const mutations = {
  [type.GET_ARTICLEINFO](state, artcile) {
    state.articleInfo = artcile;
  },
  [type.CLEAR_ARTICLEINFO](state) {
    state.articleInfo = {};
  }
}

export default mutations;