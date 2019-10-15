<template>
  <div v-if="api">
    <p>Name is: {{ api.name }}</p>
    <v-btn @click="loadData">load</v-btn>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getterTypes, actionTypes, mutationTypes } from '../store';

export default {
  name: 'ApiDetail',
  components: {},
  computed: {
    ...mapGetters([getterTypes.APIS, getterTypes.SELECTED_API_DATA]),
    api() {
      return this.apis.find((el) => el.name === this.apiName);
    },
    apiName() {
      return this.$route.params.name;
    },
  },
  mounted() {},
  methods: {
    loadData() {
      this.$store.dispatch(actionTypes.FETCH_API_DATA, { name: this.apiName });
    },
  },
  beforeDestroy() {
    this.$store.commit(mutationTypes.CLEAR_SELECTION);
  },
};
</script>
