<template>
  <v-container fluid>
    <v-row>
      <v-textarea v-model="jsonText"
                  :error-messages="errorMessages" @change="validateInput" @input="validateInput" />
    </v-row>
    <v-row justify="end">
      <v-col lg="3">
        <v-btn v-t="'actions.format'"
               @click="formatInput" color="success lighten-1"
               class="text--primary font-weight-black" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'JsonEditor',
  components: { },
  model: {
    prop: 'model',
    event: 'change'
  },
  props: { model: { type: Object, required: true } },
  data () {
    return {
      jsonText: '',
      errorMessages: []
    }
  },
  mounted () {
    this.jsonText = JSON.stringify(this.model, null, 4)
  },
  methods: {
    validateInput () {
      try {
        const model = JSON.parse(this.jsonText)
        this.errorMessages = []
        this.$emit('change', model)
      } catch (e) {
        this.errorMessages = [e.message]
      }
    },
    formatInput () {
      try {
        const parsed = JSON.parse(this.jsonText)
        this.errorMessages = []

        this.jsonText = JSON.stringify(parsed, null, 4)
        this.$emit('change', parsed)
      } catch (e) {
        this.errorMessages = [e.message]
      }
    }
  }
}
</script>

<style scoped>

</style>
