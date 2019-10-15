<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="url"
        :rules="urlRules"
        label="Url"
        required
      ></v-text-field>

      <v-select
        v-model="authMethod"
        :items="authMethodItems"
        label="Authentication method"
        required
        :rules="authMethodRules"
      >
      </v-select>

      <v-text-field
        v-model="apiKey"
        label="Api Key"
        v-if="authMethod === 'api_key'"
      />
      <v-sheet v-if="authMethod === 'custom_headers'">
        <v-row>
          <v-btn
            @click="addHeader"
            color="success lighten-1"
            class="mr-4"
          >add header</v-btn>
          <v-btn
            @click="removeHeader"
            color="error lighten-1"
          >remove header</v-btn>
        </v-row>
        <custom-header-input
          v-for="n in customHeaders"
          :key="n"
        />
      </v-sheet>

      <v-btn
        :disabled="!valid"
        color="success lighten-1"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loadingData"
      ></v-progress-circular>

    </v-form>
    <device-stepper
      v-if="validated"
      @complete="pathsCompleted"
    />
    <confirm-creation-dialog
      v-if="dialogVisible"
      :apiData="apiData"
      ref="confirmDialog"
      @submitted="submitted"
    >
      <template v-slot:btn>
        <v-btn
          @click="$refs.confirmDialog.toggle()"
          class="mt-5"
        >Confirm</v-btn>
      </template>
    </confirm-creation-dialog>
  </v-container>
</template>
<script>
// import ConstOrValueInput from '../components/ConstOrValueInput.vue';
import CustomHeaderInput from '../components/CustomHeaderInput.vue';
import ConfirmCreationDialog from '../components/ConfirmCreationDialog.vue';
import DeviceStepper from '../components/DeviceStepper.vue';
import { mutationTypes } from '../store';
import { actions } from '../store/types';

export default {
  name: 'ApiCreate',
  components: { CustomHeaderInput, DeviceStepper, ConfirmCreationDialog },
  data() {
    return {
      valid: true,
      nameRules: [(v) => !!v || 'Name is required'],
      name: 'luftdaten temp',
      urlRules: [(v) => !!v || 'Url is required'],
      url: 'https://maps.luftdaten.info/data/v2/data.temp.min.json',
      authMethodItems: [
        { text: 'Open', value: 'open' },
        { value: 'api_key', text: 'Api key' },
        { value: 'custom_headers', text: 'Custom headers' },
      ],
      authMethodRules: [(v) => !!v || 'Auth method is required'],
      authMethod: 'open',
      customHeaders: 1,
      apiKey: '',
      validated: false,
      loadingData: false,
      devicePaths: false,
      dialogVisible: false,
    };
  },
  computed: {
    apiData() {
      return {
        paths: this.devicePaths,
        url: this.url,
        name: this.name,
        authMethod: this.authMethod,
      };
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.loadingData = true;
        fetch(this.url)
          .then((data) => data.json())
          .then((json) => {
            this.$store.commit(mutationTypes.UPDATE_SELECTED_API_DATA, json);
            this.loadingData = false;
            this.validated = true;
          })
          .catch((err) => console.error(err));
      }
    },
    addHeader() {
      this.customHeaders += 1;
    },
    removeHeader() {
      this.customHeaders -= 1;
      if (this.customHeaders < 0) {
        this.customHeaders = 0;
      }
    },
    pathsCompleted(paths) {
      this.devicePaths = paths;
      this.dialogVisible = true;
    },
    submitted(success) {
      if (!success) {
        this.dialogVisible = false;
      } else {
        this.$store.dispatch(actions.CREATE_API, this.apiData).then((result) => {
          if (!result) {
            // TODO: handle error
          }
          this.dialogVisible = false;
          this.$router.push({ name: 'api' });
        });
      }
    },
  },
};
</script>
