import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import models from './models';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: [],
    selected_api_data: null,
    all_data: {},
  },
  mutations,
  actions,
  getters,
  modules: {
    models,
  },
});

export {
  mutations as mutationTypes,
  actions as actionTypes,
  getters as getterTypes,
} from './types';
