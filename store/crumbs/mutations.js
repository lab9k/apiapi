import { mutationTypes } from '~/store/crumbs/types'

export default {
  [mutationTypes.SET_BREADCRUMBS] (state, data) {
    state.crumbs = data
  }
}
