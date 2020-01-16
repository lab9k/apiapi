import { mapMutations } from 'vuex'
import { mutationTypes } from '~/store/crumbs'

export default {
  methods: {
    ...mapMutations('crumbs', {
      setCrumbs: mutationTypes.SET_BREADCRUMBS
    })
  }
}
