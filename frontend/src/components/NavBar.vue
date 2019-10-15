<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Api</span>
      <span class="font-weight-light">Api</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      :to="{name:'home'}"
      text
      exact
    >home</v-btn>
    <v-btn
      :to="{name:'api'}"
      text
      exact
    >Api's</v-btn>
  </v-app-bar>
</template>
<script>
export default {};
</script>
