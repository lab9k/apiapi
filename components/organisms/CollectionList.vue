<template>
  <v-card>
    <v-toolbar :elevation="0"
               color="grey lighten-3">
      <v-toolbar-title v-t="'collections.name'" />
      <v-spacer />
      <v-btn :to="{name:'collection-create'}"
             icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col v-for="collection in collections"
               :key="collection.name" md="4">
          <collection-card :collection="collection" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer />
      <v-btn :to="{name:'collection-create'}"
             text>
        <v-icon>mdi-plus</v-icon> <span v-t="'collections.add'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CollectionCard from '../CollectionCard'

export default {
  name: 'Collectionlist',
  components: { CollectionCard },
  props: {
    collections: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
