<template>
  <v-app>
    <NavBar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from '~/components/NavBar.vue'
import { actionTypes } from '~/store/api'

export default {
  name: 'App',
  components: { NavBar },
  data: () => ({}),
  mounted () {
    this.fetchApis()
  },
  methods: {
    ...mapActions({
      fetchApis: 'api/' + actionTypes.FETCH_APIS
    })
  }
}
</script>
