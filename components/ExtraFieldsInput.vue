<template>
  <v-container fluid>
    <v-row>
      <v-btn @click="fields.push('')">
        +
      </v-btn>
      <v-btn @click="fields.pop()">
        -
      </v-btn>
    </v-row>

    <v-container fluid>
      <v-row v-for="(field,index) in fields" :key="`field-${index}`">
        <v-text-field v-model="fields[index]" required />
        <const-or-value-input :label="field" :ref="index" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import ConstOrValueInput from './ConstOrValueInput'
export default {
  name: 'ExtraFieldsInput',
  components: { ConstOrValueInput },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    getValue () {
      const meta = {}
      this.fields.forEach((fieldName, index) => {
        meta[fieldName] = this.$refs[index][0].getValue().value
      })
      return meta
    }
  }
}
</script>

<style scoped>

</style>
