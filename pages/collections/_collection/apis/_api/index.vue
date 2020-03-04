<template>
  <v-container v-if="api"
               fluid>
    <h1 v-text="api.name"
        class="mb-5" />
    <v-sheet v-for="label in keys"
             :key="label">
      <v-textarea :value="valueFor(label).value"
                  :label="label"
                  :rows="valueFor(label).rows"
                  flat
                  readonly
                  filled
                  dense
                  auto-grow />
    </v-sheet>
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getterTypes, actionTypes, mutationTypes } from '~/store/api'
import { getterTypes as collectionGetters, actionTypes as collectionActions } from '~/store/collections'
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
    },
    keys () {
      return Object.keys(this.api)
    },
    valueFor () {
      return (key) => {
        const apiVal = this.api[key]
        const value = { value: apiVal, rows: 1 }
        if (Array.isArray(apiVal) || !apiVal.toUpperCase) {
          return {
            value: JSON.stringify(apiVal, null, 2)
          }
        }
        return value
      }
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('collections/' + collectionActions.FETCH_COLLECTION_BY_ID, params.collection)
    await store.dispatch('api/' + actionTypes.FETCH_API_BY_ID, params.api)
  },
  mounted () {
    this.setCrumbs([
      { label: this.$t('nav.home'), route: { name: 'index' } },
      { label: this.collection?.name, route: { name: 'collections-collection', params: { collection: this.collectionId } } },
      { label: this.api?.name }
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
