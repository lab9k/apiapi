<template>
  <v-container>
    <v-btn :to="'api'">Api's</v-btn>
    <v-btn
      @click="invokeAll"
      class="ml-5"
    >invoke all</v-btn>
    <j-s-o-n-view
      :data="all_data"
      v-if="jsonVisible"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { JSONView } from 'vue-json-component';
import { actions, getters } from '../store/types';

export default {
  name: 'home',
  components: { JSONView },
  computed: {
    ...mapGetters([getters.ALL_DATA]),
    jsonVisible() {
      return Object.keys(this.all_data.data).length > 0;
    },
  },
  methods: {
    invokeAll() {
      this.$store.dispatch(actions.INVOKE_ALL);
    },
  },
};
</script>
