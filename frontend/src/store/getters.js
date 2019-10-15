import { getters } from './types';
// import util from '../util';

export default {
  [getters.APIS]: ({ apis }) => apis,
  [getters.SELECTED_API_DATA]({ selected_api_data: selectedApiData }) {
    let data = selectedApiData;
    if (!data) return [];
    if (Array.isArray(selectedApiData)) [data] = selectedApiData;
    return data;
  },
  [getters.ALL_DATA]: ({ all_data: allData }) => ({ data: allData || {} }),
};
