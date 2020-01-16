<template>
  <v-form ref="form"
          @submit="submitCollection" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p>explain what to do</p>
        </v-col>
        <v-col cols="12">
          <v-text-field :rules="nameRules"
                        :counter="30"
                        v-model="collection_name"
                        required label="Name" />
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="collection_description"
                      outlined label="description" />
        </v-col>
        <v-col cols="2">
          <v-btn :disabled="!valid"
                 color="success"
                 type="submit"
                 block>
            Submit
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="error"
                 type="reset"
                 block>
            Reset
          </v-btn>
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
      title: 'create collection'
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
    this.setCrumbs([{ label: 'home', route: { name: 'index' } }, { label: 'create collection' }])
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
