<template>
  <v-app>
    <NavBar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>
