<template>
  <v-container fluid>
    <h1 v-text="collection.name"
        class="mb-5" />
    <p v-text="collection.description" />
    <p>
      This collection maps to <router-link :to="{ name: 'models-model', params: { model: collection.model._id } }">
        {{ collection.model.name }}
      </router-link>
    </p>
    <v-row>
      <v-col lg="8">
        <api-list :collection-id="collection._id"
                  :apis="collection.apis"
                  :uploads="collection.uploads" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import page from '~/mixins/page'
import ApiList from '~/components/organisms/ApiList.vue'
import { actionTypes, getterTypes } from '~/store/collections'

export default {
  name: 'CollectionDetail',
  components: { ApiList },
  mixins: [page],
  head () {
    return {
      title: this.collection.name
    }
  },
  data () {
    return {
      id: this.$route.params.collection
    }
  },
  computed: {
    ...mapGetters('collections', {
      collectionById: getterTypes.COLLECTION_BY_ID
    }),
    collection () {
      return this.collectionById(this.id)
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('collections/' + actionTypes.FETCH_COLLECTION_BY_ID, params.collection)
  },
  mounted () {
    this.setCrumbs([{ label: this.$t('nav.home'), route: { name: 'index' } }, { label: this.collection.name }])
  }
}
</script>
