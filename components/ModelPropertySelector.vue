<template>
  <v-container fluid>
    <v-row v-for="(path) in properties" :key="path"
           justify="start">
      <v-col lg="4">
        <v-text-field :label="$t('models.path')"
                      :value="path"
                      readonly />
      </v-col>
      <v-col lg="4">
        <v-text-field :label="$t('models.hint')"
                      @input="updatePath(path,'hint', $event)"
                      @change="updatePath(path,'hint', $event)" />
      </v-col>
      <v-col lg="4">
        <v-text-field :label="$t('models.default')"
                      @input="updatePath(path,'default', $event)"
                      @change="updatePath(path,'default', $event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getPaths } from '../util/paths'

export default {
  name: 'ModelPropertySelector',
  components: { },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dataModel: []
    }
  },
  computed: {
    properties () {
      return getPaths(this.model, 'root')
    }
  },
  watch: {
    model: {
      handler () {
        this.dataModel = this.properties.map(path => ({ path }))
      },
      immediate: true
    }
  },
  methods: {
    updatePath (path, type, event) {
      this.dataModel.find(modelPath => modelPath.path === path)[type] = event
    }
  }
}
</script>

<style scoped>

</style>
