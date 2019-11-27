<template>
  <v-row>
    <v-col class="pb-0">
      <v-select
        v-model="value.type"
        label="Type"
        :items="types"
      />
    </v-col>
    <v-col class="pb-0">
      <v-text-field
        v-model="value.name"
        label="Property name"
      />
    </v-col>
    <v-col
      cols="1"
      class="pb-0"
    >
      <v-btn
        text
        icon
        color="error"
        @click="removeItem"
      >
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import fieldTypes from '@/util/fieldTypes';

export default {
  name: 'PrimitiveField',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    const types = Object.values(fieldTypes);
    return {
      types,
    };
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.value.id);
    },
  },
};
</script>
