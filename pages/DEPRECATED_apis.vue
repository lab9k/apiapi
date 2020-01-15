<template>
  <v-container>
    <v-row>
      <v-col
        v-for="api in apis"
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
                <v-btn :to="{ name: 'create' }">
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
import { actionTypes, getterTypes } from '~/store/api'
import ApiCard from '@/components/ApiCard.vue'

export default {
  name: 'DeprecatedApiList',
  components: { ApiCard },
  computed: {
    ...mapGetters({ apis: 'api/' + getterTypes.APIS })
  },
  async fetch ({ store }) {
    await store.dispatch('api/' + actionTypes.FETCH_APIS)
  }
}
</script>
