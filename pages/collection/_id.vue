<template>
  <v-container>
    <p>{{ collection.name }}</p>
    <p>{{ collection.description }}</p>
    <api-list :collection="collection" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiList from '../../components/ApiList.vue'
import { getterTypes, actionTypes } from '~/store/collections'

export default {
  name: 'CollectionDetail',
  components: { ApiList },
  data () {
    return {
      id: this.$route.params.id,
      collection: { name: '', description: '', apis: [], _id: '' }
    }
  },
  computed: {
    ...mapGetters('collections', { collections: getterTypes.ALL_COLLECTIONS })
  },
  mounted () {
    this.getCollectionById(this.id).then(doc => (this.collection = doc))
  },
  methods: {
    ...mapActions('collections', { getCollectionById: actionTypes.FETCH_COLLECTION_BY_ID })
  }
}
</script>

<style scoped>

</style>
