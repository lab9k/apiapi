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
import defaults from 'lodash/defaults'
import { getPaths } from '@/util/paths'

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
      dataPaths: []
    }
  },
  computed: {
    properties () {
      return getPaths(this.model, 'root').map(el => el.substr(5))
    }
  },
  watch: {
    model: {
      handler () {
        this.dataPaths = this.properties.map(path => defaults({ path }, { hint: '', default: '' }))
        this.$emit('update', this.dataPaths.map(el => defaults({ ...el }, { hint: '', default: '' })))
      },
      immediate: true
    }
  },
  methods: {
    updatePath (path, type, event) {
      this.dataPaths.find(modelPath => modelPath.path === path)[type] = event
      this.$emit('update', this.dataPaths.map(el => defaults({ ...el }, { hint: '', default: '' })))
    }
  }
}
</script>

<style scoped>

</style>
