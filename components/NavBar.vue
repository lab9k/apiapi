<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>{{ $tc('api', 0) }}</span>
      <span class="font-weight-light">{{ $tc('api', 0) }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      :to="{name:'index'}"
      v-t="'nav.home'"
      text
      exact
      class="mr-3"
    />
    <v-btn
      :to="{name:'apis'}"
      v-t="'nav.apis'"
      text
      exact
      class="mr-3"
    />
    <v-btn
      :to="{name:'manage'}"
      v-t="'nav.server'"
      exact
      color="primary"
    />
  </v-app-bar>
</template>
<script>
export default {}
</script>
