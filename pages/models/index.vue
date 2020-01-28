<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col lg="8">
        <model-list :models="models" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ModelList from '../../components/organisms/ModelList'
import page from '~/mixins/page'
import { getterTypes, actionTypes } from '~/store/models/types'

export default {
  name: 'Index',
  components: { ModelList },
  mixins: [page],
  head () {
    return {
      title: this.$t('nav.models')
    }
  },
  computed: {
    ...mapGetters('models', { models: getterTypes.ALL_MODELS })
  },
  async fetch ({ store }) {
    await store.dispatch('models/' + actionTypes.FETCH_ALL)
  },
  mounted () {
    this.setCrumbs([
      { label: this.$t('nav.home'), route: { name: 'index' } },
      { label: this.$t('nav.models'), route: { name: 'models' } }
    ])
  }
}
</script>

<style scoped>

</style>
