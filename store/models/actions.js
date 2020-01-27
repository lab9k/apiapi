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
      console.log(data)
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
  }
}
