<template>
  <v-container>
    <v-row>
      <v-col
        v-for="api in collection.apis"
        :key="api.name"
        lg="4"
        md="6"
        sm="12"
        xs="12"
        cols="12">
        <api-card :api="api" />
      </v-col>
      <v-col
        lg="4"
        md="6"
        sm="12"
        xs="12"
        cols="12">
        <v-card>
          <v-card-actions>
            <v-container>
              <v-row justify="center">
                <v-btn :to="{ name: 'create', params: { forCollection: collection._id } }">
                  <v-icon color="success">
                    mdi-plus-circle
                  </v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiCard from './ApiCard'
export default {
  name: 'ApiList',
  components: { ApiCard },
  props: {
    collection: {
      required: true,
      type: Object
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
