<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="name"
        label="Header Name"
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="value"
        label="Header Value"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'CustomHeaderInput',
  props: {},
  data () {
    return {
      name: '',
      value: ''
    }
  },
  methods: {
    getHeader () {}
  }
}
</script>
