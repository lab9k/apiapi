import { actionTypes, mutationTypes } from './types'
export default {
  [actionTypes.FETCH_ALL] ({ commit }) {
    commit(mutationTypes.UPDATE_MODEL_LIST, [])
  }
}
