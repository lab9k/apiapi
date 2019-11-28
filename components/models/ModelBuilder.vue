<template>
  <v-container fluid>
    <v-row>
      <v-btn @click="addField">
        Add
      </v-btn>
    </v-row>
    <v-col>
      <abstract-field
        v-for="prop in value"
        :key="prop.id"
        :item="prop"
        @remove="removeItem"
      />
    </v-col>
  </v-container>
</template>

<script>
import AbstractField from './AbstractField.vue'

export default {
  name: 'ModelBuilder',
  components: { AbstractField },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    maxId () {
      return this.value.reduce((acc, { id: currId }) => {
        if (acc < currId) {
          return currId
        }
        return acc
      }, 0)
    }
  },
  methods: {
    addField () {
      this.$emit('input', [...this.value, { id: this.maxId + 1, name: '', type: 'String' }])
    },
    removeItem (id) {
      const newVal = this.value.filter(el => el.id !== id)
      this.$emit('input', newVal)
    }
  }
}
</script>
