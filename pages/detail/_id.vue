<template>
  <div v-if="api">
    <h1 v-text="api.name" />
    <v-btn @click="loadData" v-t="'actions.load'" />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getterTypes, actionTypes, mutationTypes } from '~/store/api'

export default {
  name: 'ApiDetail',
  components: {},
  data () {
    return {
      ...this.$route.params
    }
  },
  computed: {
    ...mapGetters({ apis: 'api/' + getterTypes.APIS }),
    api () {
      return this.apis.find(el => el._id === this.id)
    }
  },
  mounted () {},
  beforeDestroy () {
    this.clear()
  },
  methods: {
    ...mapActions({ fetchData: 'api/' + actionTypes.FETCH_API_DATA }),
    ...mapMutations({ clear: 'api/' + mutationTypes.CLEAR_SELECTION }),
    loadData () {
      this.fetchData({ name: this.id })
    }
  }
}
</script>
