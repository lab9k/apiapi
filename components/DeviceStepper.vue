<template>
  <div class="mstepper">
    <v-stepper
      v-model="step"
      class="mt-5"
    >
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          :editable="true"
          step="1"
        >
          Id
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 2"
          :editable="true"
          step="2"
        >
          Organization
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 3"
          :editable="true"
          step="3"
        >
          Reference
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 4"
          :editable="true"
          step="4"
        >
          Application
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 5"
          :editable="true"
          step="5"
        >
          Types
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 6"
          :editable="true"
          step="6"
        >
          Categories
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 7"
          :editable="true"
          step="7"
        >
          Longitude
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 8"
          :editable="true"
          step="8"
        >
          Latitude
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content :step="1">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-1"
              label="Id"
            />
          </v-container>

          <v-btn
            @click="nextStep(1)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="2">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-2"
              :label="`Organization`"
            />
          </v-container>

          <v-btn
            @click="nextStep(2)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="3">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-3"
              :label="`Reference`"
            />
          </v-container>

          <v-btn
            @click="nextStep(3)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="4">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-4"
              :label="`Application`"
            />
          </v-container>

          <v-btn
            @click="nextStep(4)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="5">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-5"
              :label="`Types`"
            />
          </v-container>

          <v-btn
            @click="nextStep(5)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="6">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-6"
              :label="`Categories`"
            />
          </v-container>

          <v-btn
            @click="nextStep(6)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="7">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-7"
              :label="`Longitude`"
            />
          </v-container>

          <v-btn
            @click="nextStep(7)"
            color="primary"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="8">
          <v-container fluid>
            <const-or-value-input
              ref="stepper-8"
              :label="`Latitude`"
            />
          </v-container>

          <v-btn
            @click="completeStepper()"
            color="primary"
          >
            Complete
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '../store/api'
import ConstOrValueInput from './ConstOrValueInput.vue'

export default {
  name: 'DeviceStepper',
  components: { ConstOrValueInput },
  data () {
    return {
      step: 0,
      id: ''
    }
  },
  computed: {
    ...mapGetters({ selected_data: 'api/' + getterTypes.SELECTED_API_DATA })
  },
  methods: {
    nextStep (n) {
      if (n === this.steps) {
        this.step = 1
      } else {
        this.step = n + 1
      }
    },
    completeStepper () {
      const paths = {}
      for (let i = 1; i <= 8; i += 1) {
        const step = this.$refs[`stepper-${i}`]
        paths[step.label.toLowerCase()] = this.$refs[`stepper-${i}`].getValue()
      }
      this.$emit('complete', paths)
    }
  }
}
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
