<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="name"
        :label="$t('formLabels.headerName')"
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="value"
        :label="$t('formLabels.headerValue')"
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
