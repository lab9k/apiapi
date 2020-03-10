import { getterTypes } from './types'

export default {
  [getterTypes.APIS]: ({ apis }) => apis,
  [getterTypes.SELECTED_API_DATA] ({ selected_api_data: selectedApiData }) {
    let data = selectedApiData
    if (!data) { return {} }
    if (Array.isArray(selectedApiData)) { [data] = selectedApiData }
    return data
  },
  [getterTypes.SELECTED_API_RAW_DATA]: ({ selected_api_data: selectedApiData }) => {
    if (Array.isArray(selectedApiData)) {
      return selectedApiData[0]
    }
    return selectedApiData
  },
  [getterTypes.ALL_DATA]: ({ all_data: allData }) => ({ data: allData || {} })
}
