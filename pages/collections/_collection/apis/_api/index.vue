<template>
  <v-container v-if="api"
               fluid>
    <h1 v-text="api.name"
        class="mb-5" />
    <a :href="api.url"
       v-text="api.url" />
    <div class="mt-5">
      <v-btn @click="loadData">
        {{ $t('actions.load') }}
      </v-btn>
    </div>
    <v-row>
      <v-col>
        {{ selectedData }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getterTypes, actionTypes, mutationTypes } from '~/store/api'
import { getterTypes as collectionGetters } from '~/store/collections'
import page from '~/mixins/page'

export default {
  name: 'ApiDetail',
  components: {},
  mixins: [page],
  head () {
    return {
      title: this.api.name
    }
  },
  data () {
    return {
      collectionId: this.$route.params.collection,
      apiId: this.$route.params.api
    }
  },
  computed: {
    ...mapGetters('api', {
      apis: getterTypes.APIS,
      selectedData: getterTypes.SELECTED_API_DATA
    }),
    ...mapGetters('collections', { collectionById: collectionGetters.COLLECTION_BY_ID }),
    api () {
      return this.apis.find(el => el._id === this.apiId)
    },
    collection () {
      return this.collectionById(this.collectionId)
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('api/' + actionTypes.FETCH_API_BY_ID, params.api)
  },
  mounted () {
    this.setCrumbs([
      { label: this.$t('nav.home'), route: { name: 'index' } },
      { label: this.collection.name, route: { name: 'collections-collection', params: { collection: this.collectionId } } },
      { label: this.api.name }
    ])
  },
  beforeDestroy () {
    this.clear()
  },
  methods: {
    ...mapActions('api', { fetchData: actionTypes.FETCH_API_DATA }),
    ...mapMutations('api', { clear: mutationTypes.CLEAR_SELECTION }),
    loadData () {
      this.fetchData(this.apiId)
    }
  }
}
</script>
