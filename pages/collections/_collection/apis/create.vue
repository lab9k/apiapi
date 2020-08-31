<template>
  <v-container fluid>
    <v-row>
      <v-col lg="6">
        <v-card>
          <v-form
            ref="form"
            v-model="valid">
            <v-card-text>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :label="$t('formLabels.name')"
                required />

              <v-text-field
                v-model="url"
                :rules="urlRules"
                :label="$t('formLabels.url')"
                required />

              <v-select
                v-model="authMethod"
                :items="authMethodItems"
                :rules="authMethodRules"
                :label="$t('formLabels.authMethod')"
                required />

              <v-text-field
                v-model="apiKey"
                v-if="authMethod === 'api_key'"
                :label="$t('formLabels.apiKey')" />
              <v-sheet v-if="authMethod === 'custom_headers'">
                <v-row>
                  <v-btn
                    @click="addHeader"
                    color="success lighten-1"
                    class="mr-4">
                    {{ $t('actions.addHeader') }}
                  </v-btn>
                  <v-btn
                    @click="removeHeader"
                    color="error lighten-1">
                    {{ $t('actions.removeHeader') }}
                  </v-btn>
                </v-row>
                <custom-header-input
                  v-for="n in customHeaders"
                  :key="n" />
              </v-sheet>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="!valid"
                @click="validate"
                color="primary"
                class="mr-4">
                {{ $t('actions.validate') }}
              </v-btn>
              <v-btn
                @click="reset"
                text
                class="mr-4">
                {{ $t('actions.reset') }}
              </v-btn>
              <v-progress-circular
                v-if="loadingData"
                indeterminate
                color="primary" />
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-container
      v-if="validated"
      fluid>
      <v-switch
        v-model="basePathSelectorVisible"
        :label="$t('formLabels.setBasePath')" />
      <v-text-field
        v-if="basePathSelectorVisible"
        @change="setBasePath" />
    </v-container>

    <device-stepper
      v-if="validated"
      :model="collection.model"
      @complete="pathsCompleted" />
    <confirm-creation-dialog
      ref="confirmDialog"
      v-if="dialogVisible"
      :apiData="apiData"
      @submitted="submitted">
      <template v-slot:btn>
        <v-btn
          @click="$refs.confirmDialog.toggle()"
          v-t="'actions.confirm'"
          class="mt-5" />
      </template>
    </confirm-creation-dialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { get as getProp } from 'lodash'
import CustomHeaderInput from '~/components/CustomHeaderInput.vue'
import ConfirmCreationDialog from '~/components/ConfirmCreationDialog.vue'
import DeviceStepper from '~/components/DeviceStepper.vue'
import { mutationTypes, actionTypes, getterTypes as apiGetters } from '~/store/api'
import { getterTypes as collectionGetters, actionTypes as collectionActions } from '~/store/collections'
import page from '~/mixins/page'

export default {
  name: 'ApiCreate',
  components: {
    CustomHeaderInput,
    DeviceStepper,
    ConfirmCreationDialog
  },
  mixins: [page],
  head () {
    return {
      title: this.$t('nav.createApi')
    }
  },
  data () {
    return {
      valid: true,
      nameRules: [v => !!v || 'Name is required'],
      name: 'Donkey Republic bike sharing',
      urlRules: [v => !!v || 'Url is required'],
      url: 'https://data.stad.gent/api/records/1.0/search/?dataset=donkey-republic-deelfietsen-stations-locaties&q=',
      authMethodItems: [
        { text: 'Open', value: 'open' },
        { value: 'api_key', text: 'Api key' },
        { value: 'custom_headers', text: 'Custom headers' }
      ],
      authMethodRules: [v => !!v || 'Auth method is required'],
      authMethod: 'open',
      customHeaders: 1,
      apiKey: '',
      validated: false,
      loadingData: false,
      devicePaths: false,
      dialogVisible: false,
      basePath: '',
      basePathSelectorVisible: false,
      forCollection: this.$route.params.collection
    }
  },
  computed: {
    apiData () {
      const data = {
        paths: this.devicePaths,
        url: this.url,
        name: this.name,
        authMethod: this.authMethod,
        forCollection: this.forCollection
      }
      if (this.basePathSelectorVisible) {
        data.dataPath = this.basePath
      }
      return data
    },
    ...mapGetters('api', { rawData: apiGetters.SELECTED_API_DATA }),
    ...mapGetters('collections', { collectionById: collectionGetters.COLLECTION_BY_ID }),
    collection () {
      return this.collectionById(this.forCollection)
    }
  },
  async fetch ({ store, params }) {
    if (!store.getters['collections/' + collectionGetters.COLLECTION_BY_ID](params.collection)) {
      await store.dispatch('collections/' + collectionActions.FETCH_COLLECTION_BY_ID, params.collection)
    }
  },
  mounted () {
    this.setCrumbs([
      { label: this.$t('nav.home'), route: { name: 'index' } },
      { label: this.collection.name, route: { name: 'collections-collection', params: { collection: this.forCollection } } },
      { label: this.$t('nav.createApi') }])
  },
  methods: {
    ...mapActions({
      create: 'api/' + actionTypes.CREATE_API
    }),
    ...mapMutations({
      update: 'api/' + mutationTypes.UPDATE_SELECTED_API_DATA
    }),
    reset () {
      this.$refs.form.reset()
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.loadingData = true
        fetch(`${process.env.baseUrl}/api/proxy/${btoa(this.url)}`)
          .then(data => data.json())
          .then((json) => {
            this.update(json)
            this.loadingData = false
            this.validated = true
          })
          .catch(err => console.error(err))
      }
    },
    addHeader () {
      this.customHeaders += 1
    },
    removeHeader () {
      this.customHeaders -= 1
      if (this.customHeaders < 0) {
        this.customHeaders = 0
      }
    },
    pathsCompleted (paths) {
      this.devicePaths = paths
      this.dialogVisible = true
    },
    submitted (success) {
      if (!success) {
        this.dialogVisible = false
      } else {
        this.create(this.apiData).then((result) => {
          if (!result) {
            // TODO: handle error
          }
          this.dialogVisible = false
          /* params: { id: this.forCollection } */
          this.$router.push(`/collections/${this.forCollection}`)
        })
      }
    },
    setBasePath (path) {
      if (this.basePath !== path) {
        this.basePath = path
        const currentData = this.rawData
        const newData = getProp(currentData, path)
        this.update(newData)
      }
    }
  }
}
</script>
