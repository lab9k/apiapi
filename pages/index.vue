<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col lg="8">
        <collection-list :collections="collections" />
      </v-col>
      <v-col lg="4">
        <model-list :models="models" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionList from '../components/organisms/CollectionList'
import { actionTypes, getterTypes } from '../store/collections/types'
import { getterTypes as modelGetters } from '../store/models/types'
import ModelList from '../components/organisms/ModelList'
import page from '~/mixins/page'

export default {
  name: 'Home',
  components: { ModelList, CollectionList },
  mixins: [page],
  head () {
    return {
      title: this.$t('nav.home')
    }
  },
  computed: {
    ...mapGetters('collections', { collections: getterTypes.ALL_COLLECTIONS }),
    ...mapGetters('models', { models: modelGetters.ALL_MODELS })
  },
  async fetch ({ store }) {
    await store.dispatch('collections/' + actionTypes.FETCH_ALL)
    await store.dispatch('models/' + actionTypes.FETCH_ALL)
  },
  mounted () {
    this.setCrumbs(null)
  }
}
</script>
