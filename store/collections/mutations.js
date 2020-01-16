import { mutationTypes } from './types'
export default {
  [mutationTypes.UPDATE_COLLECTION_LIST] (state, doc) {
    if (!doc) { return }
    const current = state.collections.find(el => el._id === doc._id) || {}
    // Fetch_all has API strings, whereas fetch_by_id has API objects
    // We don't want to lose the object data when we fetch all collections again.
    if (current.apis && current.apis.length && typeof current.apis[0] === 'object' &&
        doc.apis && doc.apis.length && typeof doc.apis[0] === 'string') {
      doc.apis = current.apis
    }

    state.collections = [...state.collections.filter(el => el._id !== doc._id), doc]
  },
  [mutationTypes.DELETED_COLLECTION] (state, doc) {
    state.collections = [...state.collections.filter(el => el._id !== doc._id)]
  }
}
