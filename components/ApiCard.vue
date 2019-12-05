<template>
  <v-card>
    <v-card-text>
      <p v-text="api.name" class="display-1 text--primary" />
      <p v-t="'adjective'" />
      <div class="text--primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, labore
        perferendis?
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :to="{ name: 'detail-id', params: { id: api._id } }"
        v-t="'actions.details'"
        color="secondary"
        outlined
      />
      <v-btn
        @click="deleteApi"
        v-t="'actions.delete'"
        color="error"
        outlined
      />
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
