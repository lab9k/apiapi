<template>
  <div>
    <primitive-field
      v-if="fieldType === 'Primitive'"
      v-model="item"
      @remove="removeItem"
    />
    <array-field
      v-if="fieldType === 'Array'"
      v-model="item"
      @remove="removeItem"
    />
    <object-field
      v-if="fieldType==='Object'"
      v-model="item"
      @remove="removeItem"
    />
  </div>
</template>
<script>
import ArrayField from './ArrayField.vue';
import ObjectField from './ObjectField.vue';
import PrimitiveField from './PrimitiveField.vue';

export default {
  name: 'AbstractField',
  components: { ArrayField, ObjectField, PrimitiveField },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fieldType() {
      switch (this.item.type) {
        case 'Object':
          return 'Object';
        case 'Array':
          return 'Array';
        case 'Number':
        case 'Boolean':
        case 'String':
          return 'Primitive';
        default:
          throw new Error(`Field type "${this.item.type}" does not exist`);
      }
    },
  },
  methods: {
    removeItem(id) {
      this.$emit('remove', id);
    },
  },
};
</script>
