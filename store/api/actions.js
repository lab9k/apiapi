import { actionTypes, mutationTypes } from './types'

export default {
  async [actionTypes.FETCH_APIS] ({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/api')
      const apis = await response.json()
      commit(mutationTypes.UPDATE_API_LIST, apis)
    } catch (error) {
      commit(mutationTypes.UPDATE_API_LIST, [])
    }
  },
  async [actionTypes.FETCH_API_DATA] ({ commit }, { name }) {
    const url = `http://localhost:3000/api/devices/${name}`
    const response = await fetch(url)
    const data = await response.json()
    commit(mutationTypes.UPDATE_SELECTED_API_DATA, data)
  },
  async [actionTypes.INVOKE_ALL] ({ commit }) {
    try {
      const url = 'http://localhost:3000/api/invoke'
      const response = await fetch(url)
      const json = await response.json()
      commit(mutationTypes.UPDATE_ALL_API_DATA, json)
    } catch (error) {
      commit(mutationTypes.UPDATE_ALL_API_DATA, [])
    }
  },
  async [actionTypes.CREATE_API] (undef, api) {
    try {
      const url = 'http://localhost:3000/api'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(api),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      return null
    }
  },
  async [actionTypes.DELETE_API] ({ commit }, { name }) {
    try {
      const url = `http://localhost:3000/api/${name}`
      const response = await fetch(url, { method: 'DELETE' })
      const json = await response.json()
      if (json.ok === 1) {
        commit(mutationTypes.DELETE_LOCAL_API, name)
      } else {
        throw new Error(json)
      }
    } catch (error) {
    }
  },
  async [actionTypes.FLUSH_CACHE] () {
    try {
      const url = 'http://localhost:3000/api/flush'
      const response = await fetch(url, { method: 'POST' })
      const json = await response.json()
      return json.ok === 1
    } catch (error) {
      return false
    }
  }
}
