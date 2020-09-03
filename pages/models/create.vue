<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col lg="4">
        <v-text-field :label="'Name'"
                      v-model="modelName" />
      </v-col>
      <v-col lg="8">
        <v-textarea :label="'description'"
                    v-model="modelDescription" />
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col lg="4">
        <v-card>
          <v-toolbar :elevation="0"
                     color="grey lighten-3">
            <v-toolbar-title v-t="'models.datamodel'" />
            <v-spacer />
          </v-toolbar>
          <v-container fluid>
            <json-editor v-model="model" />
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="8">
        <v-card>
          <v-toolbar :elevation="0"
                     color="grey lighten-3">
            <v-toolbar-title v-t="'models.properties'" />
            <v-spacer />
          </v-toolbar>
          <v-container fluid>
            <model-property-selector :model="model"
                                     @update="updateDataPaths" />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col lg="1">
        <v-btn v-t="'actions.save'"
               @click="savePaths"
               color="success lighten-1"
               class="text--primary font-weight-black" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import JsonEditor from '../../components/JsonEditor'
import ModelPropertySelector from '../../components/ModelPropertySelector'
import { actionTypes } from '../../store/models/types'
import page from '~/mixins/page'

export default {
  name: 'ModelCreate',
  components: { ModelPropertySelector, JsonEditor },
  mixins: [page],
  data () {
    return {
      model: {
        'id': '102e6ee90544a3d00943de5fa7b9b3c094e95a12',
        'title': 'Real Time data MUV Monitoring Stations',
        'category': 'Sensor',
        'type': 'Meteo',
        'dataowner': 'Stad Gent - Dienst Data & Informatie',
        'dataprocessing': '',
        'link': '',
        'retention': '2 weken',
        'longitude': 3.704006,
        'latitude': 51.050938
      },
      dataPaths: [],
      modelName: '',
      modelDescription: ''
    }
  },
  mounted () {
    this.setCrumbs([
      { label: this.$t('nav.home'), route: { name: 'index' } },
      { label: this.$t('nav.models'), route: { name: 'models' } },
      { label: this.$t('nav.createModel'), route: { name: 'models-create' } }
    ])
  },
  methods: {
    updateDataPaths (paths) {
      this.dataPaths = paths
    },
    savePaths () {
      this.saveDataPaths({
        paths: this.dataPaths,
        name: this.modelName,
        description: this.modelDescription
      }).then(() => {
        this.$router.push({ name: 'index' })
      })
    },
    ...mapActions('models', { saveDataPaths: actionTypes.SAVE_MODEL })
  }
}
</script>

<style scoped>

</style>
