<template>
  <v-card>
    <v-card-text>
      <p class="display-1 text--primary">
        {{ api.name }}
      </p>
      <p>adjective</p>
      <div class="text--primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, labore
        perferendis?
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :to="{ name: 'detail-id', params: { id: api._id } }"
        color="secondary"
        outlined
      >
        details
      </v-btn>
      <v-btn
        @click="deleteApi"
        color="error"
        outlined
      >
        delete
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
