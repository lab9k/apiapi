<template>
  <v-card>
    <v-card-title v-text="api.name"
                  class="headline" />
    <v-card-text>
      <p>
        {{ api.name }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'collections-collection-apis-api', params: { api: api._id, collection: collectionId } }"
             color="secondary" outlined>
        {{ $t('actions.details') }}
      </v-btn>
      <v-btn @click="deleteApi" color="error"
             outlined>
        {{ $t('actions.delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import { actionTypes } from '~/store/api'

export default {
  name: 'ApiCard',
  props: {
    api: {
      type: Object,
      required: true
    },
    collectionId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      delete: 'api/' + actionTypes.DELETE_API
    }),
    deleteApi () {
      this.delete(this.api)
    }
  }
}
</script>
