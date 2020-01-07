import { forEach } from 'lodash'
import { actionTypes, mutationTypes } from './types'
export default {
  async [actionTypes.FETCH_ALL] ({ commit }) {
    try {
      const url = `${process.env.baseUrl}/api/collection`
      const response = await fetch(url)
      const collections = await response.json()
      forEach(collections, doc => commit(mutationTypes.UPDATE_COLLECTION_LIST, doc))
    } catch (e) {
      console.error('Could not retrieve collections')
      commit(mutationTypes.UPDATE_COLLECTION_LIST, null)
    }
  },
  async [actionTypes.CREATE] ({ commit }, collection) {
    try {
      const url = `${process.env.baseUrl}/api/collection`
      const response = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(collection),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
      return await response.json()
    } catch (e) {
      console.error(e)
      return null
    }
  },
  async [actionTypes.FETCH_COLLECTION_BY_ID] ({ commit }, id) {
    try {
      const url = `${process.env.baseUrl}/api/collection/${id}`
      const response = await fetch(url)
      const doc = await response.json()
      commit(mutationTypes.UPDATE_COLLECTION_LIST, doc)
      return doc
    } catch (e) {
      commit(mutationTypes.UPDATE_COLLECTION_LIST, null)
      return null
    }
  }
}
