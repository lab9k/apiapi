<template>
  <v-container>
    <v-row>
      <v-col
        v-for="collection in collections"
        :key="collection.name"
        lg="4"
        md="6"
        sm="12"
        xs="12"
        cols="12">
        <collection-card :collection="collection" />
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
                <v-btn :to="{name:'collection-create'}">
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
import { mapGetters } from 'vuex'
import CollectionCard from '../../components/CollectionCard'
import { getterTypes, actionTypes } from '~/store/collections'

export default {
  name: 'Collections',
  components: { CollectionCard },
  computed: {
    ...mapGetters({ collections: 'collections/' + getterTypes.ALL_COLLECTIONS })
  },
  async fetch ({ store }) {
    await store.dispatch('collections/' + actionTypes.FETCH_ALL)
  }
}
</script>

<style scoped>

</style>
