<template>
  <v-container>
    <v-row>
      <v-col
        lg="4"
        md="6"
        sm="12"
        xs="12"
        cols="12"
        v-for="api in apis"
        :key="api.name"
      >
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
            <v-btn :to="{ name: 'api-detail', params: { name: api.name } }">details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        lg="4"
        md="6"
        sm="12"
        xs="12"
        cols="12"
      >
        <v-card>
          <v-card-actions>
            <v-container>
              <v-row justify="center">
                <v-btn :to="{ name: 'create' }">
                  <v-icon color="success">mdi-plus-circle</v-icon>
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
import { mapGetters } from 'vuex';
import { actionTypes } from '../store';

export default {
  name: 'ApiList',
  computed: {
    ...mapGetters(['apis']),
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_APIS);
  },
};
</script>
