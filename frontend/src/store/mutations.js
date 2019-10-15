import { mutations } from './types';

export default {
  [mutations.UPDATE_API_LIST](state, data) {
    state.apis = [...data];
  },
  [mutations.UPDATE_SELECTED_API_DATA](state, data) {
    state.selected_api_data = data;
  },
  [mutations.CLEAR_SELECTION](state) {
    state.selected_api_data = null;
  },
  [mutations.UPDATE_ALL_API_DATA](state, data) {
    state.all_data = data;
  },
};
