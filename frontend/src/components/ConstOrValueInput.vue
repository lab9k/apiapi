<template>
  <v-row>
    <v-col cols="12">
      <div style="width:100%;">
        <v-select
          :items="optionItems"
          required
          label="Type"
          v-model="selection"
        />
        <v-text-field
          :rules="rules"
          :label="label"
          required
          v-model="value"
          :outlined="selection === 'path'"
          :readonly="selection === 'path'"
        />
      </div>
    </v-col>
    <v-col
      cols="12"
      v-if="selection === 'path'"
    >
      <j-s-o-n-view
        :data="selected_api_data"
        @selected="updateValue"
      />
    </v-col>
  </v-row>

</template>
<script>
import { mapGetters } from 'vuex';
import { JSONView } from 'vue-json-component';
import { getterTypes } from '../store';

export default {
  name: 'ConstOrValueInput',
  components: { JSONView },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: '',
      selection: '',
      constant: true,
      optionItems: [{ value: 'constant', text: 'Constant' }, { value: 'path', text: 'Path' }],
      rules: [(v) => !!v || 'This field cannot be empty'],
    };
  },
  computed: {
    ...mapGetters([getterTypes.SELECTED_API_DATA]),
  },

  methods: {
    getValue() {
      return {
        type: this.selection,
        value: this.value,
      };
    },
    updateValue(ev) {
      const path = ev.path.substr(5);
      this.value = path;
    },
  },
};
</script>
