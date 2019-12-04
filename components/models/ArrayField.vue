<template>
  <v-row>
    <v-col class="pb-0">
      <v-select
        v-model="value.type"
        :items="types"
        :label="$t('formLabels.type')"
      />
    </v-col>
    <v-col class="pb-0">
      <v-text-field
        v-model="value.name"
        :label="$t('formLabels.propertyName')"
      />
    </v-col>
    <v-col
      cols="1"
      class="pb-0"
    >
      <v-btn
        @click="removeItem"
        text
        icon
        color="error"
      >
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import fieldTypes from '@/util/fieldTypes'

export default {
  name: 'ArrayField',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    const types = Object.values(fieldTypes)
    return {
      types
    }
  },
  methods: {
    updateItem (ev) {
      this.$emit('update', ev)
    },
    removeItem () {
      this.$emit('remove', this.value.id)
    }
  }
}
</script>
