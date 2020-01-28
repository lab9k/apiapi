import { actionTypes, mutationTypes } from './types'

export default {
  async [actionTypes.FETCH_ALL] ({ commit }) {
    try {
      const url = `${process.env.baseUrl}/api/models`
      const res = await fetch(url)
      const json = await res.json()
      commit(mutationTypes.UPDATE_MODEL_LIST, json)
    } catch (e) {
      return false
    }
  },
  async [actionTypes.SAVE_MODEL] ({ commit }, data) {
    try {
      const url = `${process.env.baseUrl}/api/models`
      const res = await fetch(url, { method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      return await res.json()
    } catch (e) {
      return false
    }
  },
  async [actionTypes.DELETE_MODEL] ({ commit }, id) {
    try {
      const url = `${process.env.baseUrl}/api/models/${id}`
      const res = await fetch(url, { method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      commit(mutationTypes.REMOVE_MODEL, id)
      return await res.json()
    } catch (e) {
      return false
    }
  }
}
