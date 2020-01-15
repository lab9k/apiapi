<template>
  <main>
    <v-container fluid>
      <h1 v-t="collection.name"
          class="mb-5" />
      <p v-text="collection.description" />
      <v-row>
        <v-col lg="8">
          <api-list :collection-id="collection._id"
                    :apis="collection.apis" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiList from '../../components/organisms/ApiList.vue'
import { actionTypes, getterTypes } from '~/store/collections'

export default {
  name: 'CollectionDetail',
  components: { ApiList },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters('collections', {
      collections: getterTypes.ALL_COLLECTIONS,
      collectionById: getterTypes.COLLECTION_BY_ID
    }),
    collection () {
      return this.collectionById(this.id)
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('collections/' + actionTypes.FETCH_COLLECTION_BY_ID, params.id)
  }
}
</script>

<style scoped>

</style>
