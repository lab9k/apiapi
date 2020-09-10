<template>
  <v-card>
    <v-toolbar :elevation="0"
               color="grey lighten-3">
      <v-toolbar-title v-t="'apis.name'" />
      <v-spacer />
      <v-btn :to="{ name: 'collections-collection-apis-create', params: { collection: collectionId }}"
             icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col v-for="api in apis"
               :key="api._id" lg="6">
          <api-card :api="api"
                    :collectionId="collectionId" />
        </v-col>
      </v-row>
    </v-container>
    <v-toolbar :elevation="0"
               color="grey lighten-3">
      <v-toolbar-title>Uploads</v-toolbar-title>
      <v-spacer />
      <v-btn :to="{ name: 'collections-collection-uploads-create', params: { collection: collectionId }}"
             icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col v-for="upload in uploads"
               :key="upload._id" lg="6">
          <v-card>
            <v-card-title v-text="upload.name"
                          class="headline" />
            <v-card-text />
            <v-card-actions>
              <v-btn @click="deleteUpload(upload)"
                     color="error" outlined>
                delete upload
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer />
      <v-btn :to="{name:'collections-collection-uploads-create', params: { collection: collectionId }}"
             text>
        <v-icon>mdi-plus</v-icon><span v-t="'uploads.add'" />
      </v-btn>
      <v-btn :to="{name:'collections-collection-apis-create', params: { collection: collectionId }}"
             text>
        <v-icon>mdi-plus</v-icon> <span v-t="'apis.add'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ApiCard from '../ApiCard'
export default {
  name: 'ApiList',
  components: { ApiCard },
  props: {
    apis: {
      required: true,
      type: Array
    },
    collectionId: {
      required: true,
      type: String
    },
    uploads: {
      required: true,
      type: Array
    }
  },
  methods: {
    deleteUpload (upload) {
      this.$axios.$delete(`${process.env.baseUrl}/api/uploads/${upload._id}`).then(() => {
        this.$router.go()
      })
    }
  }
}
</script>
