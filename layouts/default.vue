<template>
  <v-app>
    <NavBar />
    <v-content>
      <breadcrumbs />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import Breadcrumbs from '~/components/molecules/breadcrumbs'

export default {
  name: 'App',
  components: { Breadcrumbs, NavBar }
}
</script>
