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
        color="primary"
        @click="addField"
      >
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-col>
    <v-col
      cols="1"
      class="pb-0"
    >
      <v-btn
        icon
        color="error"
        @click="removeItem"
      >
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <abstract-field
        v-for="extra in extraFields"
        :key="extra.id"
        :item="extra"
        class="ml-8"
        @remove="removeExtra"
      />
    </v-col>
  </v-row>
</template>
<script>
import fieldTypes from '@/util/fieldTypes';

export default {
  name: 'ObjectField',
  components: { AbstractField: () => import('@/components/models/AbstractField.vue') },
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
  computed: {
    maxId() {
      return this.extraFields.reduce((acc, { id: currId }) => {
        if (acc < currId) {
          return currId;
        }
        return acc;
      }, 0);
    },
    extraFields: [...this.value.elements],
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.value.id);
    },
    removeExtra(id) {
      this.value.elements = this.value.elements.filter((el) => el.id !== id);
    },
    addField() {
      this.value.elements.push({ id: this.maxId + 1, name: 'test', type: 'String' });
    },
  },
};
</script>
