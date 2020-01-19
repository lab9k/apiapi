<template>
  <v-card>
    <v-card-title v-text="collection.name"
                  class="headline" />
    <v-card-text>
      <p v-text="collection.description" />
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'collections-collection', params:{collection:collection._id} }"
             color="secondary" outlined>
        {{ $t('actions.details') }}
      </v-btn>
      <v-btn @click="deleteCollection(collection._id)" color="error"
             outlined>
        {{ $t('actions.delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { actionTypes } from '~/store/collections'
export default {
  name: 'CollectionCard',
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('collections', { deleteCollection: actionTypes.DELETE_COLLECTION })
  }
}
</script>

<style scoped>

</style>
