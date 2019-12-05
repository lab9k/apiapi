<template>
  <div>
    <h3 v-text="title" />
    <pre v-text="valueString" />
  </div>
</template>
<script>
export default {
  name: 'RawDisplayer',
  props: {
    title: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: [Object, Array]
    }
  },
  computed: {
    valueString () {
      return JSON.stringify(this.value, null, 2)
    }
  }
}
</script>
