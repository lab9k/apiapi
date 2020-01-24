import { mutationTypes } from './types'
export default {
  [mutationTypes.UPDATE_MODEL_LIST] (state, data) {
    state.models = [...data]
  }
}
