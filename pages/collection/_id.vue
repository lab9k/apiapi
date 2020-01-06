<template>
  <v-container>
    <p>{{ collection.name }}</p>
    <p>{{ collection.description }}</p>
    <p>TODO: apis in collection</p>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '~/store/collections'
export default {
  name: 'CollectionDetail',
  data () {
    return {
      ...this.$route.params
    }
  },
  computed: {
    ...mapGetters('collections', { collections: getterTypes.ALL_COLLECTIONS }),
    collection () {
      return this.collections.find(el => el._id === this.id)
    }
  }
}
</script>

<style scoped>

</style>
