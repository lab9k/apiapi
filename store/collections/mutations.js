import { mutationTypes } from './types'
export default {
  [mutationTypes.UPDATE_COLLECTION_LIST] (state, collections) {
    state.collections = [...collections]
  }
}
