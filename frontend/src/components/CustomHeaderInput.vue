<template>
  <v-row>
    <v-col>
      <v-text-field
        label="Header Name"
        v-model="name"
      />
    </v-col>
    <v-col>
      <v-text-field
        label="Header Value"
        v-model="value"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'CustomHeaderInput',
  props: {},
  data() {
    return {
      name: '',
      value: '',
    };
  },
  methods: {
    getHeader() {},
  },
};
</script>
