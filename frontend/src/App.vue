<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { actionTypes } from './store';

export default {
  name: 'App',
  components: { NavBar },
  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch(actionTypes.FETCH_APIS);
  },
};
</script>
