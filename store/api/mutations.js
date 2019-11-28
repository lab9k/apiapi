import { mutationTypes } from './types'

export default {
  [mutationTypes.UPDATE_API_LIST] (state, data) {
    state.apis = [...data]
  },
  [mutationTypes.UPDATE_SELECTED_API_DATA] (state, data) {
    state.selected_api_data = data
  },
  [mutationTypes.CLEAR_SELECTION] (state) {
    state.selected_api_data = null
  },
  [mutationTypes.UPDATE_ALL_API_DATA] (state, data) {
    state.all_data = data
  },
  [mutationTypes.DELETE_LOCAL_API] (state, name) {
    state.apis = state.apis.filter(el => el.name !== name)
  }
}
