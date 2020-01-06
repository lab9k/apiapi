import { actionTypes, mutationTypes } from './types'
export default {
  async [actionTypes.FETCH_ALL] ({ commit }) {
    try {
      const url = `${process.env.baseUrl}/api/collection`
      const response = await fetch(url)
      const collections = await response.json()
      commit(mutationTypes.UPDATE_COLLECTION_LIST, collections)
    } catch (e) {
      console.error('Could not retrieve collections')
      commit(mutationTypes.UPDATE_COLLECTION_LIST, [])
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
  }
}
