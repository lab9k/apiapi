<template>
  <v-card>
    <v-toolbar :elevation="0"
               color="grey lighten-3">
      <v-toolbar-title v-t="'models.name'" />
      <v-spacer />
      <v-btn :to="{name:'models-create'}"
             icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col v-for="model in models"
               :key="model.name" md="4">
          <model-card :model="model" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer />
      <v-btn :to="{name:'models-create'}"
             text>
        <v-icon>mdi-plus</v-icon> <span v-t="'actions.add'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ModelCard from '../ModelCard'
export default {
  name: 'ModelList',
  components: { ModelCard },
  props: { models: { required: true, type: Array } }
}
</script>

<style scoped>

</style>
