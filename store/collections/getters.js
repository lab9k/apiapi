import { getterTypes } from './types'
export default {
  [getterTypes.ALL_COLLECTIONS]: ({ collections }) => collections,
  [getterTypes.COLLECTION_BY_ID]: ({ collections }) => id => collections.find(c => c._id === id)
}
