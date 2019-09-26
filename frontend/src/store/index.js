import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: [
      { name: 'Hello' },
      { name: 'world' },
    ],
  },
  mutations,
  actions,
  getters,
});

export { mutations as mutationTypes, actions as actionTypes, getters as getterTypes } from './types';
