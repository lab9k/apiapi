<template>
  <v-card>
    <v-card-text>
      <p v-text="collection.name"
         class="display-1 text--primary" />
      <p>
        {{ $t('adjective') }}
      </p>
      <div class="text--primary">
        {{ collection.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'collection-id', params:{id:collection._id} }"
             color="secondary" outlined>
        {{ $t('actions.details') }}
      </v-btn>
      <v-btn @click="deleteCollection" color="error"
             outlined>
        {{ $t('actions.delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CollectionCard',
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteCollection () {
      console.log(this.collection)
    }
  }
}
</script>

<style scoped>

</style>
