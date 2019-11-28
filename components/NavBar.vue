<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Api</span>
      <span class="font-weight-light">Api</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      :to="{name:'index'}"
      text
      exact
      class="mr-3"
    >
      home
    </v-btn>
    <v-btn
      :to="{name:'apis'}"
      text
      exact
      class="mr-3"
    >
      Api's
    </v-btn>
    <v-btn
      :to="{name:'model-create'}"
      text
      exact
      class="mr-3"
    >
      Models
    </v-btn>
    <v-btn
      :to="{name:'manage'}"
      exact
      color="primary"
    >
      Manage server
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {}
</script>
