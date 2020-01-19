<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col lg="8">
        <collection-list :collections="collections" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionList from '../components/organisms/CollectionList'
import { actionTypes, getterTypes } from '../store/collections/types'
import page from '~/mixins/page'

export default {
  name: 'Home',
  components: { CollectionList },
  mixins: [page],
  head () {
    return {
      title: this.$t('nav.home')
    }
  },
  computed: {
    ...mapGetters('collections', { collections: getterTypes.ALL_COLLECTIONS })
  },
  async fetch ({ store }) {
    await store.dispatch('collections/' + actionTypes.FETCH_ALL)
  },
  mounted () {
    this.setCrumbs(null)
  }
}
</script>
