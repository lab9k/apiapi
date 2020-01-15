import { mutationTypes } from './types'
export default {
  [mutationTypes.UPDATE_COLLECTION_LIST] (state, doc) {
    if (!doc) { return }
    state.collections = [...state.collections.filter(el => el._id !== doc._id), doc]
  },
  [mutationTypes.DELETED_COLLECTION] (state, doc) {
    state.collections = [...state.collections.filter(el => el._id !== doc._id)]
  }
}
