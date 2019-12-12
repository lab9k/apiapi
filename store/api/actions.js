import { actionTypes, mutationTypes } from './types'

export default {
  async [actionTypes.FETCH_APIS] ({ commit }) {
    try {
      const response = await fetch('/api/api')
      const apis = await response.json()
      commit(mutationTypes.UPDATE_API_LIST, apis)
    } catch (error) {
      commit(mutationTypes.UPDATE_API_LIST, [])
    }
  },
  async [actionTypes.FETCH_API_DATA] ({ commit }, { _id }) {
    const url = `/api/data/raw/${_id}`
    const response = await fetch(url)
    const data = await response.json()
    commit(mutationTypes.UPDATE_SELECTED_API_DATA, data)
  },
  async [actionTypes.INVOKE_ALL] ({ commit }) {
    try {
      const url = '/api/data'
      const response = await fetch(url)
      const json = await response.json()
      commit(mutationTypes.UPDATE_ALL_API_DATA, json)
    } catch (error) {
      commit(mutationTypes.UPDATE_ALL_API_DATA, [])
    }
  },
  async [actionTypes.CREATE_API] (undef, api) {
    try {
      const url = '/api/api'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(api),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      return null
    }
  },
  async [actionTypes.DELETE_API] ({ commit }, { _id }) {
    try {
      const url = `/api/api/${_id}`
      const response = await fetch(url, { method: 'DELETE' })
      const json = await response.json()
      if (json) {
        commit(mutationTypes.DELETE_LOCAL_API, _id)
      } else {
        throw new Error(json)
      }
    } catch (error) {
    }
  },
  async [actionTypes.FLUSH_CACHE] () {
    try {
      const url = '/api/server/flush'
      const response = await fetch(url, { method: 'POST' })
      const json = await response.json()
      return json.ok === 1
    } catch (error) {
      return false
    }
  }
}
