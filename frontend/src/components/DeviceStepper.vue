<template>
  <div class="mstepper">
    <v-stepper
      v-model="step"
      class="mt-5"
    >
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          step="1"
          :editable="true"
        >Id</v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 2"
          step="2"
          :editable="true"
        >Organization</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="3"
          :complete="step > 3"
          :editable="true"
        >Reference</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 4"
          step="4"
          :editable="true"
        >Application</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 5"
          step="5"
          :editable="true"
        >Types</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 6"
          step="6"
          :editable="true"
        >Categories</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 7"
          step="7"
          :editable="true"
        >Longitude</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 8"
          step="8"
          :editable="true"
        >Latitude</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content :step="1">
          <v-container fluid>
            <const-or-value-input
              label="Id"
              ref="stepper-1"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(1)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="2">
          <v-container fluid>
            <const-or-value-input
              :label="`Organization`"
              ref="stepper-2"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(2)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="3">
          <v-container fluid>
            <const-or-value-input
              :label="`Reference`"
              ref="stepper-3"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(3)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="4">
          <v-container fluid>
            <const-or-value-input
              :label="`Application`"
              ref="stepper-4"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(4)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="5">
          <v-container fluid>
            <const-or-value-input
              :label="`Types`"
              ref="stepper-5"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(5)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="6">
          <v-container fluid>
            <const-or-value-input
              :label="`Categories`"
              ref="stepper-6"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(6)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="7">
          <v-container fluid>
            <const-or-value-input
              :label="`Longitude`"
              ref="stepper-7"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="nextStep(7)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="8">
          <v-container fluid>
            <const-or-value-input
              :label="`Latitude`"
              ref="stepper-8"
            />
          </v-container>

          <v-btn
            color="primary"
            @click="completeStepper()"
          >
            Complete
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ConstOrValueInput from './ConstOrValueInput.vue';

import { getterTypes } from '../store';

export default {
  name: 'DeviceStepper',
  components: { ConstOrValueInput },
  data() {
    return {
      step: 0,
      id: '',
    };
  },
  computed: {
    ...mapGetters([getterTypes.SELECTED_API_DATA]),
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.step = 1;
      } else {
        this.step = n + 1;
      }
    },
    completeStepper() {
      const paths = {};
      for (let i = 1; i <= 8; i += 1) {
        const step = this.$refs[`stepper-${i}`];
        paths[step.label.toLowerCase()] = this.$refs[`stepper-${i}`].getValue();
      }
      this.$emit('complete', paths);
    },
  },
};
</script>
<style lang="scss">
.mstepper {
  .v-stepper {
    overflow-x: hidden;
    overflow: unset;
    .v-stepper__items {
      overflow: visible;
      .v-stepper__wrapper {
        overflow: visible;
      }
    }
  }
}
</style>
