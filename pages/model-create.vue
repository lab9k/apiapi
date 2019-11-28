<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <model-builder v-model="list" />
      </v-col>
      <v-col cols="4">
        <raw-display
          :title="'Current data model'"
          :value="list"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModelBuilder from '@/components/models/ModelBuilder.vue'
import RawDisplay from '@/components/models/RawDisplay.vue'

export default {
  name: 'ModelCreate',
  components: { ModelBuilder, RawDisplay },
  data () {
    return {
      list: [
        { id: 1, name: 'Hello World', type: 'Boolean' },
        { id: 2, name: 'Hello World', type: 'Number' }
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>
