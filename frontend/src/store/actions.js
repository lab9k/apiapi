import { actions, mutations } from './types';

export default {
  async [actions.FETCH_APIS]({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/api');
      const apis = await response.json();
      commit(mutations.UPDATE_API_LIST, apis);
    } catch (error) {
      commit(mutations.UPDATE_API_LIST, []);
    }
  },
  async [actions.FETCH_API_DATA]({ commit }, { name }) {
    const url = `http://localhost:3000/api/devices/${name}`;
    const response = await fetch(url);
    const data = await response.json();
    commit(mutations.UPDATE_SELECTED_API_DATA, data);
  },
  async [actions.INVOKE_ALL]({ commit }) {
    try {
      const url = 'http://localhost:3000/api/invoke';
      const response = await fetch(url);
      const json = await response.json();
      commit(mutations.UPDATE_ALL_API_DATA, json);
    } catch (error) {
      commit(mutations.UPDATE_ALL_API_DATA, []);
    }
  },
  async [actions.CREATE_API](undef, api) {
    try {
      const url = 'http://localhost:3000/api';
      console.log(api);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(api),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  },
};
