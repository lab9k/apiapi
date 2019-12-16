<template>
  <v-card>
    <v-card-text>
      <p v-text="api.name"
         class="display-1 text--primary" />
      <p>
        {{ $t('adjective') }}
      </p>
      <div class="text--primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, labore
        perferendis?
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'detail-id', params: { id: api._id } }"
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
