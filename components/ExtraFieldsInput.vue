<template>
  <v-container fluid>
    <v-row>
      <v-btn @click="addField()">
        +
      </v-btn>
      <v-btn @click="removeField()">
        -
      </v-btn>
    </v-row>

    <v-container fluid>
      <v-row v-for="(field,index) in fields"
             :key="`field-${index}`">
        <v-col cols="3">
          <v-text-field
            v-model="fields[index]"
            :rules="propertyNameRules"
            required
            label="Property name"
            prepend-icon="mdi-help-circle-outline" />
        </v-col>
        <v-col cols="9">
          <const-or-value-input :label="field"
                                :ref="index" />
        </v-col>
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
      fields: [],
      propertyNameRules: [
        v => !!v || 'This field is required',
        v => v.split(' ').length === 1 || 'This field cannot contain spaces. Please use "_"',
        v => v.split('-').length === 1 || 'This field cannot contain hyphens. Please use "_"'
      ]
    }
  },
  methods: {
    getValue () {
      const meta = {}
      this.fields.forEach((fieldName, index) => {
        const [field] = this.$refs[index]
        meta[fieldName] = field.getValue().value
      })
      return meta
    },
    addField () {
      this.fields.push('')
    },
    removeField () {
      this.fields.pop()
    }
  }
}
</script>

<style scoped>

</style>
