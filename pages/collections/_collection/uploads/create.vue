<template>
  <v-container>
    <v-stepper v-model="stepper">
      <v-stepper-header>
        <template v-for="(step, i) in steps">
          <v-stepper-step :complete="stepper > 1"
                          :step="i" :key="step.name">
            {{ step.name }}
          </v-stepper-step>
          <v-divider />
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content :step="0">
          <v-card
            :loading="loading"
            class="mb-12"
            color="grey lighten-3" min-height="200px">
            <v-card-text>
              <v-file-input v-model="file"
                            outlined label="File upload" />
              <v-select :items="fileTypeItems"
                        v-model="selectedFileType"
                        label="File type"
                        outlined />
            </v-card-text>
          </v-card>

          <v-btn
            @click="nextStep"
            :disabled="file === null"
            color="primary">
            Continue
          </v-btn>
          <v-btn @click="previousStep"
                 color="secondary" disabled>
            Back
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content :step="1">
          <v-card
            class="mb-12"
            color="grey lighten-3"
            min-height="200px">
            <v-card-text>
              <p>Below are all properties of the datamodel that should be filled.</p>
              <v-expansion-panels>
                <v-expansion-panel v-for="path in pathsToFill"
                                   :key="path._id">
                  <v-expansion-panel-header :color="mapping[path.path] ? 'success lighten-5':'red lighten-5'">
                    {{ path.path }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>Here you can select the column from the csv file which corresponds to the "{{ path.path }}" property on the datamodel.</p>
                    <v-select :items="parseResultHeaders"
                              v-model="mapping[path.path]"
                              label="CSV header" />
                    <v-text-field v-if="mapping[path.path] === 'Use a Constant value'"
                                  v-model="constMappings[path.path]" label="Constant value" />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>

          <v-btn
            @click="submitUpload"
            color="primary">
            Continue
          </v-btn>
          <v-btn @click="previousStep"
                 color="secondary">
            Back
          </v-btn>

          <v-btn @click="resetStepper"
                 text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Papa from 'papaparse'
import { actionTypes as collectionActions, getterTypes as collectionGetters } from '@/store/collections'
import { actionTypes as uploadActions } from '@/store/upload'

export default {
  name: 'CreateUpload',
  data () {
    return {
      stepper: 0,
      steps: [{ name: 'Upload File' }, { name: 'Map File' }],
      fileTypeItems: ['csv'],
      selectedFileType: 'csv',
      file: null,
      loading: false,
      parseResult: [],
      forCollection: this.$route.params.collection,
      mapping: {},
      constMappings: {}
    }
  },
  computed: {
    ...mapGetters('collections', { collectionById: collectionGetters.COLLECTION_BY_ID }),
    model () {
      const collection = this.collectionById(this.forCollection)
      return collection ? collection.model : null
    },
    pathsToFill () {
      return this.model.paths
    },
    parseResultHeaders () {
      if (!this.parseResult || this.parseResult.length === 0) { return [] }
      return [...Object.keys(this.parseResult[0]), 'Use a Constant value']
    },
    finalizedMappings () {
      return { ...this.mapping, ...this.constMappings }
    },
    uploadModel () {
      return {
        name: this.file ? this.file.name : '',
        data: this.parseResult,
        paths: Object.entries(this.finalizedMappings)
          .map(([toPath, fromHeader]) => ({
            toPath,
            fromHeader,
            pathType: this.parseResultHeaders.includes(fromHeader) ? 'path' : 'constant',
            constValue: fromHeader
          }))
      }
    }
  },
  async fetch ({ store, params }) {
    if (!store.getters['collections/' + collectionGetters.COLLECTION_BY_ID](params.collection)) {
      await store.dispatch('collections/' + collectionActions.FETCH_COLLECTION_BY_ID, params.collection)
    }
  },
  methods: {
    ...mapActions('upload', { uploadData: uploadActions.UPLOAD_FILE_DATA }),
    nextStep () {
      if (this.stepper < 1) {
        this.loading = true
        if (this.file !== null) {
          Papa.parse(this.file, {
            header: true,
            complete: (result) => {
              console.log(result)
              console.log(this.file)
              this.parseResult = result.data
              this.loading = false
              this.stepper++
            }
          })
        }
      }
    },
    previousStep () {
      if (this.stepper > 0) {
        this.stepper--
      }
    },
    resetStepper () {
      this.stepper = 0
    },
    submitUpload () {
      if (this.model.paths.length === this.uploadModel.paths.length) {
        this.uploadData({
          uploadModel: this.uploadModel,
          collectionId: this.forCollection })
          .then(res => console.log(res))
      }
    }
  }

}
</script>

<style scoped lang="scss">
.selectioncontainer {
  display: flex;
  flex-direction: row;
  .paths {
    width: 50%;
    margin:0;
    padding: 0;
  }
  .data-headers{
    width: 50%;
    margin:0;
    padding: 0;
  }
}
</style>
