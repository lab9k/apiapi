<template>
  <v-app>
    <NavBar />
    <v-content>
      <div class="pt-10">
        <nuxt />
      </div>
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
