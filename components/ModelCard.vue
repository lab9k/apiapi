<template>
  <v-card>
    <v-card-title v-text="model.name"
                  class="headline text-no-wrap" />
    <v-card-text>
      <p v-text="model.description" />
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'models-model', params: { model: model._id } }"
             color="secondary"
             outlined>
        {{ $t('actions.details') }}
      </v-btn>
      <v-btn @click="deleteModel(model._id)"
             color="error" outlined>
        {{ $t('actions.delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { actionTypes } from '../store/models/types'
export default {
  name: 'ModelCard',
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('models', { deleteModel: actionTypes.DELETE_MODEL })
  }
}
</script>

<style scoped>

</style>
