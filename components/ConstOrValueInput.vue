<template>
  <v-row>
    <v-col cols="12">
      <div style="width:100%;">
        <v-select
          :items="optionItems"
          v-model="selection"
          :label="$t('formLabels.type')"
          required />
        <v-text-field
          :rules="rules"
          :label="label"
          v-model="value"
          :outlined="selection === 'path'"
          :readonly="selection === 'path'"
          required />
      </div>
    </v-col>
    <v-col
      v-if="selection === 'path'"
      cols="12">
      <j-s-o-n-view
        :data="selected_data"
        @selected="updateValue" />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { JSONView } from 'vue-json-component'
import { getterTypes } from '~/store/api'

export default {
  name: 'ConstOrValueInput',
  components: { JSONView },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      value: '',
      selection: '',
      constant: true,
      optionItems: [{ value: 'constant', text: 'Constant' }, { value: 'path', text: 'Path' }],
      rules: [v => !!v || 'This field cannot be empty']
    }
  },
  computed: {
    ...mapGetters({ selected_data: 'api/' + getterTypes.SELECTED_API_DATA })
  },

  methods: {
    getValue () {
      return {
        type: this.selection,
        value: this.value
      }
    },
    updateValue (ev) {
      this.value = ev.path.substr(5)
    }
  }
}
</script>
