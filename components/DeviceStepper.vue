<template>
  <div class="mstepper">
    <v-stepper
      v-model="step"
      class="mt-5"
    >
      <v-stepper-header>
        <template v-for="(currentStep, index) in steps">
          <v-stepper-step
            :complete="step > index + 1"
            :editable="true"
            :key="'header-' + index"
            :step="index + 1"
          >
            {{ $t('steps.' + currentStep) }}
          </v-stepper-step>
          <v-divider v-if="index < steps.length - 1" />
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="(currentStep, index) in steps" :step="index + 1" :key="'content-' + index">
          <v-container v-if="currentStep === 'meta'" fluid>
            <extra-fields-input
              :ref="'stepper-' + (index + 1)"
              :label="$t('steps.' + currentStep)"
            />
          </v-container>
          <v-container v-else fluid>
            <const-or-value-input
              :ref="'stepper-' + (index + 1)"
              :label="$t('steps.' + currentStep)"
            />
          </v-container>
          <v-btn
            v-if="index < steps.length - 1"
            @click="nextStep(index + 1)"
            v-t="'actions.continue'"
            color="primary"
          />
          <v-btn
            v-else
            @click="completeStepper()"
            v-t="'actions.complete'"
            color="primary"
          />
          <v-btn v-t="'actions.cancel'" text />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '../store/api'
import ConstOrValueInput from './ConstOrValueInput.vue'
import ExtraFieldsInput from './ExtraFieldsInput'

export default {
  name: 'DeviceStepper',
  components: { ExtraFieldsInput, ConstOrValueInput },
  data () {
    return {
      step: 0,
      id: '',
      steps: ['id', 'organization', 'reference', 'application', 'types', 'categories', 'longitude', 'latitude', 'meta']
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
      for (let i = 1; i <= this.steps.length; i += 1) {
        try {
          const step = this.$refs[`stepper-${i}`][0]
          paths[step.label.toLowerCase()] = step.getValue()
        } catch (e) {
          console.error(e)
        }
      }
      console.log(paths)
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
