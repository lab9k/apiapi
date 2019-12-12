<template>
  <v-container>
    <v-btn :to="'apis'">
      {{ $t('nav.apis') }}
    </v-btn>
    <v-btn @click="invokeAll"
           class="ml-5">
      {{ $t('invoke_all') }}
    </v-btn>
    <j-s-o-n-view :data="allData"
                  v-if="jsonVisible" />
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
