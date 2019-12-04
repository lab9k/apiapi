<template>
  <v-dialog
    v-model="visible"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <slot
        v-on="on"
        name="btn"
      />
    </template>
    <v-card>
      <v-card-text>
        <p
          v-for="[key, value] in paths"
          :key="key"
        >
          <v-text-field
            :ref="key"
            :value="value.value"
            :label="key"
          />
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="submit"
          v-t="'actions.submit'"
          color="success"
        />
        <v-btn
          @click="reject"
          v-t="'actions.reject'"
          color="error"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'ConfirmCreationDialog',
  props: {
    apiData: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    paths () {
      return Object.entries(this.apiData.paths)
    },
    props () {
      return Object.entries(this.apiData).filter(([key]) => key !== 'paths')
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    submit () {
      // TODO: submit data
      this.$emit('submitted', true)
    },
    reject () {
      this.$emit('submitted', false)
    }
  }
}
</script>
