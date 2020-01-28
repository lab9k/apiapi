import { mutationTypes } from './types'
export default {
  [mutationTypes.UPDATE_MODEL_LIST] (state, data) {
    state.models = [...data]
  },
  [mutationTypes.REMOVE_MODEL] (state, id) {
    state.models = state.models.filter(el => el._id !== id)
  }
}
