<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :label="$t('formLabels.name')"
        required
      />

      <v-text-field
        v-model="url"
        :rules="urlRules"
        :label="$t('formLabels.url')"
        required
      />

      <v-select
        v-model="authMethod"
        :items="authMethodItems"
        :rules="authMethodRules"
        :label="$t('formLabels.authMethod')"
        required
      />

      <v-text-field
        v-model="apiKey"
        v-if="authMethod === 'api_key'"
        :label="$t('formLabels.apiKey')"
      />
      <v-sheet v-if="authMethod === 'custom_headers'">
        <v-row>
          <v-btn
            @click="addHeader"
            v-t="'actions.addHeader'"
            color="success lighten-1"
            class="mr-4"
          />
          <v-btn
            @click="removeHeader"
            v-t="'actions.removeHeader'"
            color="error lighten-1"
          />
        </v-row>
        <custom-header-input
          v-for="n in customHeaders"
          :key="n"
        />
      </v-sheet>

      <v-btn
        :disabled="!valid"
        @click="validate"
        v-text="$t('actions.validate')"
        color="success lighten-1"
        class="mr-4"
      />
      <v-btn
        @click="reset"
        v-t="'actions.reset'"
        color="error"
        class="mr-4"
      />
      <v-progress-circular
        v-if="loadingData"
        indeterminate
        color="primary"
      />
    </v-form>
    <v-container
      v-if="validated"
      fluid
    >
      <v-switch
        v-model="basePathSelectorVisible"
        :label="$t('formLabels.setBasePath')"
      />
      <v-text-field
        v-if="basePathSelectorVisible"
        @change="setBasePath"
      />
    </v-container>

    <device-stepper
      v-if="validated"
      @complete="pathsCompleted"
    />
    <confirm-creation-dialog
      ref="confirmDialog"
      v-if="dialogVisible"
      :apiData="apiData"
      @submitted="submitted"
    >
      <template v-slot:btn>
        <v-btn
          @click="$refs.confirmDialog.toggle()"
          v-t="'actions.confirm'"
          class="mt-5"
        />
      </template>
    </confirm-creation-dialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { get as getProp } from 'lodash'
import CustomHeaderInput from '../components/CustomHeaderInput.vue'
import ConfirmCreationDialog from '../components/ConfirmCreationDialog.vue'
import DeviceStepper from '../components/DeviceStepper.vue'
import { mutationTypes, actionTypes, getterTypes } from '~/store/api'

export default {
  name: 'ApiCreate',
  components: {
    CustomHeaderInput,
    DeviceStepper,
    ConfirmCreationDialog
  },
  data () {
    return {
      valid: true,
      nameRules: [v => !!v || 'Name is required'],
      name: 'luftdaten temp',
      urlRules: [v => !!v || 'Url is required'],
      url: 'https://maps.luftdaten.info/data/v2/data.temp.min.json',
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
      basePathSelectorVisible: false
    }
  },
  computed: {
    apiData () {
      const data = {
        paths: this.devicePaths,
        url: this.url,
        name: this.name,
        authMethod: this.authMethod
      }
      if (this.basePathSelectorVisible) {
        data.dataPath = this.basePath
      }
      return data
    },
    ...mapGetters({ rawData: 'api/' + getterTypes.SELECTED_API_DATA })
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
        fetch(this.url)
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
          this.$router.push({ name: 'api' })
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
