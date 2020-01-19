<template>
  <v-form ref="form"
          @submit="submitCollection" v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col lg="6">
          <v-card>
            <v-card-text>
              <p>explain what to do</p>
              <v-text-field :rules="nameRules"
                            :counter="30"
                            v-model="collection_name"
                            required label="Name" />
              <v-textarea v-model="collection_description"
                          outlined label="description"
                          class="mt-5" />
            </v-card-text>
            <v-card-actions>
              <v-btn :disabled="!valid"
                     color="primary"
                     class="mr-4"
                     type="submit">
                Submit
              </v-btn>
              <v-btn text
                     class="mr-4"
                     type="reset">
                Reset
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import page from '~/mixins/page'
import { actionTypes } from '~/store/collections'

export default {
  name: 'CreateCollection',
  mixins: [page],
  head () {
    return {
      title: this.$t('nav.createCollection')
    }
  },
  data () {
    return {
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.trim().length > 5 && v.trim().length < 30) || 'Name should be between 5 and 30 characters'
      ],
      collection_name: '',
      collection_description: ''
    }
  },
  computed: {
    collection () {
      return {
        name: this.collection_name,
        description: this.collection_description
      }
    }
  },
  mounted () {
    this.setCrumbs([{ label: this.$t('nav.home'), route: { name: 'index' } }, { label: this.$t('nav.createCollection') }])
  },
  methods: {
    ...mapActions('collections', { create: actionTypes.CREATE }),
    submitCollection (ev) {
      ev.preventDefault()
      if (this.validate()) {
        this.create(this.collection).then((doc) => {
          this.$router.push({ name: 'collections-collection', params: { collection: doc._id } })
        })
      }
      return false
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>
