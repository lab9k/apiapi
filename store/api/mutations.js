import { slice, shuffle } from 'lodash'
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
    // TODO: adding all data at once can cause memory issues....
    // state.all_data = data
    state.all_data = shuffle(slice(data, 0, 250))
  },
  [mutationTypes.DELETE_LOCAL_API] (state, id) {
    console.debug(id, state.apis)
    state.apis = state.apis.filter(el => el._id !== id)
  }
}
