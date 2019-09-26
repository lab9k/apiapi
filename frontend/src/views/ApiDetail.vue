<template>
  <div>
    <p>Name is: {{ api.name }}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ApiDetail',
  computed: {
    ...mapGetters(['apis']),
    api() {
      return this.apis.find(el => el.name === this.$route.params.name);
    },
  },
};
</script>
