import { actionTypes } from './types'

export default {
  async [actionTypes.UPLOAD_FILE_DATA] ({ commit }, { uploadModel, collectionId }) {
    try {
      const url = `${process.env.baseUrl}/api/uploads/${collectionId}`
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(uploadModel),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        } })
      return await res.json()
    } catch (e) {
      return false
    }
  }
}
