<template>
  <div>
    <v-btn
      v-for="(api,i) in apis"
      :key="api.name"
      :to="{ name: 'api-detail', params: { name: api.name }}"
    >{{i}}: {{api.name}}</v-btn>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ApiList',
  computed: {
    ...mapGetters(['apis']),
  },
};
</script>
