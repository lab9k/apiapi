<template>
  <v-container>
    <v-row align="center">
      <v-btn
        @click="flushCache"
        color="danger"
        :loading="loadingFlushBtn"
        class="mr-4"
      >flush cache</v-btn><span :class="flushTextColor">{{ flushMessage }}</span>
    </v-row>
  </v-container>
</template>
<script>
import { actions } from '@/store/types';

export default {
  name: 'ServerManagement',
  data() {
    return {
      loadingFlushBtn: false,
      flushMessage: '',
      flushSuccess: true,
    };
  },
  computed: {
    flushTextColor() {
      return this.flushSuccess ? 'green--text text--lighten-1' : 'red--text text--lighten-1';
    },
  },
  methods: {
    async flushCache() {
      this.loadingFlushBtn = true;
      this.flushSuccess = await this.$store.dispatch(actions.FLUSH_CACHE);
      if (this.flushSuccess) {
        this.flushMessage = 'cache successfully flushed';
      } else {
        this.flushMessage = 'Something went wrong. Cache not flushed';
      }
      this.loadingFlushBtn = false;
    },
  },
};
</script>
