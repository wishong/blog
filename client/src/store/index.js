import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import state from './states';
import mutations from './mutations';


export default new Vuex.Store({
  state,
  mutations
})
