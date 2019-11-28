<template>
  <v-container>
    <v-btn :to="'api'" v-text="$tc('api')" />
    <v-btn @click="invokeAll" v-text="$t('invoke_all')" class="ml-5" />
    <j-s-o-n-view :data="allData" v-if="jsonVisible" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { JSONView } from 'vue-json-component'
import { actionTypes, getterTypes } from '~/store/api'

export default {
  name: 'Home',
  components: { JSONView },
  computed: {
    ...mapGetters({ allData: 'api/' + getterTypes.ALL_DATA }),
    jsonVisible () {
      return Object.keys(this.allData.data).length > 0
    }
  },
  methods: {
    ...mapActions({ invokeAll: 'api/' + actionTypes.INVOKE_ALL })
  }
}
</script>
